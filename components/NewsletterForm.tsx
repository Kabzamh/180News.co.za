"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function NewsletterForm({
  variant = "light",
  unlockCopy = false,
  onUnlocked,
}: {
  variant?: "light" | "dark";
  unlockCopy?: boolean;
  onUnlocked?: () => void;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not subscribe.");
      }
      setStatus("success");
      setMessage("You are on the 180° email list. Register for a 7-day trial to unlock full stories.");
      setEmail("");
      setName("");
      onUnlocked?.();
      router.refresh();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Could not subscribe.");
    }
  }

  const dark = variant === "dark";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className={`border px-3 py-2 text-sm outline-none ${
            dark
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/50"
              : "border-slate-300 bg-white"
          }`}
        />
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className={`border px-3 py-2 text-sm outline-none ${
            dark
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/50"
              : "border-slate-300 bg-white"
          }`}
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#8f1520] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#6d0f18] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : unlockCopy ? "Subscribe and read on" : "Subscribe"}
      </button>
      {message ? (
        <p className={`text-sm ${status === "error" ? "text-red-300" : dark ? "text-emerald-200" : "text-emerald-700"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
