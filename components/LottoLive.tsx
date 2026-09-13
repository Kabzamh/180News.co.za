"use client";

import { useEffect, useMemo, useState } from "react";
import { LottoBalls } from "@/components/LottoBalls";
import type { LottoDesk, LottoGame } from "@/lib/lotto";
import { formatDateTime, timeAgo } from "@/lib/utils";

function countdown(iso: string | null) {
  if (!iso) return "Draw time TBC";
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "Draw window open / updating";
  const hours = Math.floor(diff / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  if (hours > 48) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  return `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
}

export function LottoLive({ initial }: { initial: LottoDesk }) {
  const [desk, setDesk] = useState(initial);
  const [now, setNow] = useState(0);
  const [picked, setPicked] = useState<number[]>([]);
  const [gameSlug, setGameSlug] = useState(initial.games[0]?.slug ?? "lotto");

  useEffect(() => {
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    const poll = window.setInterval(() => {
      fetch("/api/lotto")
        .then((response) => response.json())
        .then((data: { ok?: boolean; desk?: LottoDesk }) => {
          if (data.ok && data.desk) setDesk(data.desk);
        })
        .catch(() => undefined);
    }, 60000);
    return () => {
      window.clearInterval(tick);
      window.clearInterval(poll);
    };
  }, []);

  const active = desk.games.find((game) => game.slug === gameSlug) ?? desk.games[0];
  const maxBall = active?.slug.includes("powerball") || active?.slug === "dailylotto" ? 50 : 52;

  const match = useMemo(() => {
    if (!active) return null;
    const hits = picked.filter((number) => active.numbers.includes(number));
    const bonusHit = active.bonus != null && picked.includes(active.bonus);
    return { hits, bonusHit };
  }, [active, picked]);

  function toggle(number: number) {
    setPicked((current) => {
      if (current.includes(number)) return current.filter((value) => value !== number);
      const limit = active?.slug === "dailylotto" ? 5 : active?.slug.includes("powerball") ? 6 : 7;
      if (current.length >= limit) return current;
      return [...current, number].sort((a, b) => a - b);
    });
  }

  return (
    <div className="space-y-8">
      <section className="border border-[#0b2f8a]/20 bg-[#081226] p-6 text-white md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
              Live lotto results
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">National Lottery desk</h1>
            <p className="mt-2 text-sm text-white/70">
              Latest official numbers for Daily Lotto, Lotto and PowerBall. Updated {formatDateTime(desk.fetchedAt)}.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.14em] text-white/50">18+ · Play responsibly</p>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {desk.games.map((game) => (
          <GameCard key={game.slug} game={game} now={now} />
        ))}
      </section>

      {active ? (
        <section className="border border-slate-200 bg-white p-5">
          <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Check your numbers</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {desk.games.map((game) => (
              <button
                key={game.slug}
                type="button"
                onClick={() => {
                  setGameSlug(game.slug);
                  setPicked([]);
                }}
                className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                  game.slug === active.slug ? "bg-[#0b2f8a] text-white" : "border border-slate-300"
                }`}
              >
                {game.name}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-8 gap-1 sm:grid-cols-10 lg:grid-cols-12">
            {Array.from({ length: maxBall }, (_, index) => index + 1).map((number) => {
              const selected = picked.includes(number);
              const drawn = active.numbers.includes(number);
              const isBonus = active.bonus === number;
              return (
                <button
                  key={number}
                  type="button"
                  onClick={() => toggle(number)}
                  className={`h-9 text-xs font-semibold ${
                    selected
                      ? "bg-[#0b2f8a] text-white"
                      : drawn || isBonus
                        ? "border border-[#8f1520] text-[#8f1520]"
                        : "border border-slate-200"
                  }`}
                >
                  {String(number).padStart(2, "0")}
                </button>
              );
            })}
          </div>
          {match ? (
            <p className="mt-4 text-sm text-slate-600">
              You matched {match.hits.length} number{match.hits.length === 1 ? "" : "s"}
              {match.bonusHit ? ` and the ${active.bonusLabel || "bonus"}` : ""}.
              {picked.length === 0 ? " Tap your ticket numbers to check the latest draw." : ""}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="border border-slate-200 bg-white p-5">
        <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Results wire</h2>
        <div className="mt-4 space-y-3">
          {desk.updates.length === 0 ? (
            <p className="text-sm text-slate-600">New draws will post here as they land.</p>
          ) : (
            desk.updates.map((update) => (
              <article key={update.id} className="border-b border-slate-100 pb-3 last:border-0">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#8f1520]">{timeAgo(update.createdAt)}</p>
                <h3 className="font-serif text-xl">{update.headline}</h3>
                <p className="text-sm text-slate-600">{update.detail}</p>
              </article>
            ))
          )}
        </div>
        <p className="mt-6 text-xs text-slate-500">
          Informational results desk only. Confirm winning tickets with the official National Lottery / Ithuba. The
          National Lottery is for persons 18 years and older.
        </p>
      </section>
    </div>
  );
}

function GameCard({ game, now }: { game: LottoGame; now: number }) {
  return (
    <article className="border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">{game.schedule}</p>
          <h2 className="mt-1 font-serif text-3xl">{game.name}</h2>
        </div>
        <p className="text-right text-xs text-slate-500">
          Draw {game.drawNumber ? `#${game.drawNumber}` : ""}
          <br />
          {game.drawDate}
        </p>
      </div>
      <div className="mt-4">
        <LottoBalls numbers={game.numbers} bonus={game.bonus} bonusLabel={game.bonusLabel} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="bg-[#f4f0e8] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Next draw</p>
          <p className="font-semibold">{countdown(game.nextDrawAt)}</p>
        </div>
        <div className="bg-[#f4f0e8] p-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-500">Jackpot / paid</p>
          <p className="font-semibold">{game.jackpot || game.totalPaid || "See official board"}</p>
        </div>
      </div>
      {game.winners != null ? (
        <p className="mt-3 text-xs text-slate-500">{game.winners.toLocaleString("en-ZA")} winners last draw</p>
      ) : null}
      <a href={game.sourceUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-xs text-[#0b2f8a]">
        Source draw board →
      </a>
      <span className="hidden">{now}</span>
    </article>
  );
}
