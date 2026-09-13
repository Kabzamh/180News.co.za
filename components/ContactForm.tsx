"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not send message.");
      }
      setStatus("success");
      setFeedback("Message received. The Johannesburg newsroom will reply.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Could not send message.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Name
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 outline-none ring-[#0b2f8a] focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 outline-none ring-[#0b2f8a] focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm">
        Subject
        <input
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 outline-none ring-[#0b2f8a] focus:ring-2"
        />
      </label>
      <label className="block text-sm">
        Message
        <textarea
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 outline-none ring-[#0b2f8a] focus:ring-2"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-[#8f1520] px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-white hover:bg-[#6d0f18] disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Send to newsroom"}
      </button>
      {feedback ? (
        <p className={`text-sm ${status === "error" ? "text-red-700" : "text-emerald-700"}`}>{feedback}</p>
      ) : null}
    </form>
  );
}
