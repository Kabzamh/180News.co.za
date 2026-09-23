"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ClientQuote } from "./format";
import { fmtPct, fmtPrice } from "./format";

type Bundle = {
  ok: boolean;
  updatedAt: number;
  quotes: ClientQuote[];
};

function TickerContent({ quotes }: { quotes: ClientQuote[] }) {
  const items = [...quotes, ...quotes];
  return (
    <div className="relative flex-1 overflow-hidden">
      <div className="animate-marquee flex w-max items-center whitespace-nowrap py-[7px]">
        {items.map((q, i) => (
          <Link
            key={`${q.symbol}-${i}`}
            href="/markets"
            className="mx-5 flex items-center gap-1.5 text-[0.78rem] hover:opacity-80"
          >
            <span className="font-bold text-slate-700">{q.short}</span>
            <span className="font-semibold tabular-nums text-slate-800">
              {fmtPrice(q)}
            </span>
            <span
              className={`flex items-center gap-0.5 font-bold tabular-nums ${
                q.changePct >= 0 ? "text-emerald-700" : "text-red-700"
              }`}
            >
              {q.changePct >= 0 ? "▲" : "▼"}
              {fmtPct(q).replace(/^[+−]/, "")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function MarketsTicker() {
  const [quotes, setQuotes] = useState<ClientQuote[] | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/markets")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error("markets"))))
        .then((d: Bundle) => alive && setQuotes(d.quotes))
        .catch(() => {});
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="marquee-wrap flex border-b border-slate-200 bg-slate-100">
      <div className="flex shrink-0 items-center gap-1.5 bg-brand-navy px-3 py-1 text-[0.68rem] font-black uppercase tracking-widest text-white">
        <span className="text-brand-gold">📈</span> Markets
      </div>
      {quotes && quotes.length > 0 ? (
        <TickerContent quotes={quotes} />
      ) : (
        <div className="flex flex-1 items-center px-4">
          <span className="h-3 w-3/4 animate-pulse rounded bg-slate-300" />
        </div>
      )}
    </div>
  );
}
