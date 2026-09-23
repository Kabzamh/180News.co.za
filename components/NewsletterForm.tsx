"use client";

import { useState } from "react";

export default function NewsletterForm({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setState("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        setState("done");
        setMessage(
          data.status === "exists"
            ? "You're already subscribed — thank you!"
            : "Welcome to the 180° family! Check your inbox.",
        );
        setEmail("");
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  const inputCls =
    variant === "dark"
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/60"
      : "border-slate-300 bg-white text-ink placeholder:text-slate-400";

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.co.za"
          className={`w-full flex-1 rounded-sm border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-gold ${inputCls}`}
          aria-label="Email address"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="shrink-0 rounded-sm bg-brand-gold px-5 py-2.5 text-sm font-black uppercase tracking-wide text-brand-navy-dark transition hover:brightness-105 disabled:opacity-60"
        >
          {state === "loading" ? "Signing up…" : "Sign up — free"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-2 text-xs font-medium ${
            state === "error" ? "text-red-300" : "text-emerald-300"
          }`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
