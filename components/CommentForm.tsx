"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CommentForm({ articleId }: { articleId: number }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ articleId, name, email, body }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not post comment.");
      }
      setName("");
      setEmail("");
      setBody("");
      setStatus("idle");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not post comment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 border border-slate-200 bg-white p-5">
      <h3 className="font-serif text-2xl">Join the discussion</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b2f8a] focus:ring-2"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b2f8a] focus:ring-2"
        />
      </div>
      <textarea
        required
        rows={4}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Your comment"
        className="w-full border border-slate-300 px-3 py-2 text-sm outline-none ring-[#0b2f8a] focus:ring-2"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#0b2f8a] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#081f5c] disabled:opacity-60"
      >
        {status === "loading" ? "Posting..." : "Publish comment"}
      </button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
