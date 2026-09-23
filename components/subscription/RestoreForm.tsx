"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RestoreForm({ dark = false }: { dark?: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscription/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.ok) {
        router.refresh();
      } else {
        setState("error");
        setMessage(data.error || "No active membership found.");
      }
    } catch {
      setState("error");
      setMessage("Something went wrong.");
    }
  }

  const inputCls = dark
    ? "w-full rounded-sm border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
    : "w-full rounded-sm border border-slate-300 bg-white px-3 py-2 text-sm";

  return (
    <form onSubmit={submit} className="mt-2">
      <div className="flex max-w-sm gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.co.za"
          className={inputCls}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`shrink-0 rounded-sm px-4 py-2 text-xs font-black uppercase tracking-wide disabled:opacity-60 ${
            dark ? "bg-white/15 text-white hover:bg-white/25" : "bg-indigo-900 text-white hover:bg-indigo-800"
          }`}
        >
          {state === "loading" ? "…" : "Restore"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs font-semibold text-red-400">{message}</p>}
    </form>
  );
}
