"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ClientQuote } from "./format";
import { fmtPct, fmtPrice, fmtTime } from "./format";
import Sparkline from "./Sparkline";

const FEATURED = ["ZAR=X", "STX40.JO", "GC=F", "PL=F", "BZ=F", "BTC-USD"];

export default function MarketsWidget() {
  const [quotes, setQuotes] = useState<ClientQuote[] | null>(null);
  const [updatedAt, setUpdatedAt] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/markets")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
        .then((d: { quotes: ClientQuote[]; updatedAt: number }) => {
          if (!alive) return;
          setQuotes(d.quotes);
          setUpdatedAt(d.updatedAt);
        })
        .catch(() => {});
    load();
    const id = setInterval(load, 5 * 60_000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const rows = (quotes ?? []).filter((q) => FEATURED.includes(q.symbol));
  const ordered = FEATURED.map((s) => rows.find((q) => q.symbol === s)).filter(
    (q): q is ClientQuote => Boolean(q),
  );

  return (
    <section className="bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b-2 border-emerald-700 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1.5 rounded-sm bg-emerald-700" />
          <h3 className="font-headline text-lg font-black uppercase tracking-wide">
            Markets
          </h3>
        </div>
        <Link
          href="/markets"
          className="text-[0.7rem] font-bold uppercase text-emerald-700 hover:underline"
        >
          Update +
        </Link>
      </div>

      {!ordered.length ? (
        <div className="space-y-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-9 animate-pulse rounded bg-slate-100" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {ordered.map((q) => {
            const up = q.changePct >= 0;
            return (
              <li key={q.symbol} className="flex items-center gap-2 py-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-ink">{q.short}</p>
                  <p className="text-[0.68rem] tabular-nums text-slate-500">
                    {fmtPrice(q)}
                  </p>
                </div>
                <Sparkline points={q.spark} positive={up} width={52} height={22} />
                <span
                  className={`w-16 shrink-0 rounded-sm px-1.5 py-0.5 text-right text-[0.65rem] font-black tabular-nums ${
                    up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {up ? "▲" : "▼"} {fmtPct(q).replace(/^[+−]/, "")}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-2 text-[0.6rem] text-slate-400">
        Delayed quotes{updatedAt ? ` · ${fmtTime(updatedAt)} SAST` : ""} · Yahoo
      </p>
    </section>
  );
}
