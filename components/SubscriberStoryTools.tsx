"use client";

import { useState } from "react";
import Link from "next/link";

export function SubscriberStoryTools({
  articleId,
  slug,
  script,
  summary,
  pinned: initialPinned,
  unlocked,
}: {
  articleId: number;
  slug: string;
  script: string;
  summary: string[];
  pinned: boolean;
  unlocked: boolean;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [pinned, setPinned] = useState(initialPinned);
  const [status, setStatus] = useState("");

  function listen() {
    if (!unlocked) {
      setStatus("Paid subscribers only.");
      return;
    }
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setStatus("This browser has no speech engine.");
      return;
    }
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = "en-ZA";
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  async function pin() {
    if (!unlocked) {
      setStatus("Paid subscribers only.");
      return;
    }
    const response = await fetch("/api/pins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    });
    const data = (await response.json()) as { ok?: boolean; pinned?: boolean; error?: string };
    if (!response.ok || !data.ok) {
      setStatus(data.error || "Could not pin.");
      return;
    }
    setPinned(Boolean(data.pinned));
    setStatus(data.pinned ? "Pinned to your briefing." : "Unpinned.");
  }

  if (!unlocked) {
    return (
      <div className="mt-4 border border-slate-200 bg-[#f8e9ea] p-4 text-sm">
        <p className="font-semibold">Listen, pin and summary</p>
        <p className="mt-1 text-slate-600">
          Paying subscribers can hear the story (TTS), pin it for later, and open a four-point briefing.
        </p>
        <Link href="/subscribe" className="mt-2 inline-block text-xs font-bold uppercase tracking-[0.14em] text-[#8f1520]">
          Unlock tools
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={listen}
          className="border border-slate-300 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]"
        >
          {speaking ? "Stop TTS" : "Listen (TTS)"}
        </button>
        <button
          type="button"
          onClick={pin}
          className={`px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] ${
            pinned ? "bg-[#0b2f8a] text-white" : "border border-slate-300"
          }`}
        >
          {pinned ? "Pinned" : "Pin story"}
        </button>
        <Link href="/pins" className="px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">
          My pins
        </Link>
      </div>
      <section className="border border-[#0b2f8a]/20 bg-white p-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">Subscriber summary</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
          {summary.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
      {status ? <p className="text-xs text-slate-500">{status}</p> : null}
      <p className="hidden">{slug}</p>
    </div>
  );
}
