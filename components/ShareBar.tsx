"use client";

import { useState } from "react";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://180news.co.za${path}`;
  const text = `${title} — via 180 Degrees News`;
  const encoded = encodeURIComponent(url);
  const message = encodeURIComponent(`${text} ${url}`);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">Share</span>
      <a
        href={`https://wa.me/?text=${message}`}
        target="_blank"
        rel="noreferrer"
        className="bg-[#128C7E] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
      >
        WhatsApp
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="bg-[#081226] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
        className="bg-[#0b2f8a] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white"
      >
        Facebook
      </a>
      <button
        type="button"
        onClick={copy}
        className="border border-slate-300 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
