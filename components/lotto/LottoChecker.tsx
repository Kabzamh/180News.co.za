"use client";

import { useMemo, useState } from "react";
import { LOTTO_GAMES } from "@/lib/lottery";
import type { LottoDraw } from "@/db/schema";
import { cn, rand } from "@/lib/utils";

export default function LottoChecker({
  latest,
}: {
  latest: Record<string, LottoDraw>;
}) {
  const [gameSlug, setGameSlug] = useState("daily-lotto");
  const [picked, setPicked] = useState<number[]>([]);
  const [special, setSpecial] = useState<number | null>(null);

  const game = LOTTO_GAMES.find((g) => g.slug === gameSlug)!;
  const draw = latest[gameSlug];

  function selectGame(slug: string) {
    setGameSlug(slug);
    setPicked([]);
    setSpecial(null);
  }
  function toggle(n: number) {
    setPicked((prev) => {
      if (prev.includes(n)) return prev.filter((x) => x !== n);
      if (prev.length >= game.mainCount) return prev;
      return [...prev, n].sort((a, b) => a - b);
    });
  }

  const result = useMemo(() => {
    if (!draw || picked.length < game.mainCount) return null;
    const mainHits = picked.filter((n) => draw.mainNumbers.includes(n));
    const specialHit =
      special != null && draw.bonusNumber != null && special === draw.bonusNumber;

    // Best-effort division lookup from the source prize table labels.
    const leading = (m: string) => Number((m.match(/^\d+/) ?? ["0"])[0]);
    const powerballFamily = game.slug.startsWith("powerball");
    const division = draw.divisions?.find((d) => {
      if (leading(d.match) !== mainHits.length) return false;
      const isJackpot = /jackpot/i.test(d.match);
      const needsSpecial = /bonus|powerball/i.test(d.match) && !isJackpot;
      if (isJackpot) return powerballFamily ? specialHit : true;
      if (needsSpecial) return Boolean(specialHit);
      return game.specialLabel === null || !specialHit;
    });
    return { mainHits, specialHit, division };
  }, [draw, picked, special, game]);

  const quickPick = () => {
    const pool = Array.from({ length: game.mainMax }, (_, i) => i + 1);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setPicked(pool.slice(0, game.mainCount).sort((a, b) => a - b));
    if (game.specialMax > 0) {
      setSpecial(1 + Math.floor(Math.random() * game.specialMax));
    }
  };

  return (
    <section className="rounded-sm bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-brand-red pb-3">
        <h2 className="font-headline text-xl font-black uppercase">
          Check your numbers
        </h2>
        <button
          onClick={quickPick}
          className="rounded-sm bg-brand-navy px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white hover:bg-brand-navy-dark"
        >
          Quick pick
        </button>
      </div>

      {/* Game tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {LOTTO_GAMES.map((g) => (
          <button
            key={g.slug}
            onClick={() => selectGame(g.slug)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition",
              g.slug === gameSlug
                ? "text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200",
            )}
            style={g.slug === gameSlug ? { backgroundColor: g.ball } : undefined}
          >
            {g.short}
          </button>
        ))}
      </div>

      {!draw ? (
        <p className="rounded bg-slate-50 p-4 text-center text-sm text-slate-500">
          No recent {game.name} draw stored yet — try again after the next wire
          sync.
        </p>
      ) : (
        <>
          <p className="mb-2 text-xs font-semibold text-slate-500">
            Pick {game.mainCount} numbers from 1–{game.mainMax}
            <span className="ml-1 text-brand-red">
              ({picked.length}/{game.mainCount})
            </span>
          </p>
          <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-10">
            {Array.from({ length: game.mainMax }, (_, i) => i + 1).map((n) => {
              const active = picked.includes(n);
              const hit = result?.mainHits.includes(n);
              return (
                <button
                  key={n}
                  onClick={() => toggle(n)}
                  className={cn(
                    "aspect-square rounded-full text-xs font-black transition",
                    hit
                      ? "bg-emerald-500 text-white ring-2 ring-emerald-200"
                      : active
                        ? "text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                  )}
                  style={active && !hit ? { backgroundColor: game.ball } : undefined}
                >
                  {n}
                </button>
              );
            })}
          </div>

          {game.specialMax > 0 && (
            <>
              <p className="mb-2 mt-4 text-xs font-semibold text-slate-500">
                Pick your {game.specialLabel} (1–{game.specialMax})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.from({ length: game.specialMax }, (_, i) => i + 1).map(
                  (n) => {
                    const active = special === n;
                    const hit = result?.specialHit && active;
                    return (
                      <button
                        key={n}
                        onClick={() =>
                          setSpecial((prev) => (prev === n ? null : n))
                        }
                        className={cn(
                          "h-9 w-9 rounded-full text-xs font-black transition",
                          hit
                            ? "bg-emerald-500 text-white ring-2 ring-emerald-200"
                            : active
                              ? "text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                        )}
                        style={active && !hit ? { backgroundColor: game.specialBall } : undefined}
                      >
                        {n}
                      </button>
                    );
                  },
                )}
              </div>
            </>
          )}

          <div className="mt-4">
            <button
              onClick={() => {
                setPicked([]);
                setSpecial(null);
              }}
              className="text-xs font-bold uppercase tracking-wide text-slate-400 hover:text-brand-red"
            >
              Clear slip
            </button>
          </div>

          {result && (
            <div
              className={cn(
                "mt-4 rounded-sm p-4 text-sm",
                result.division && result.division.prize > 0
                  ? "bg-emerald-50 text-emerald-900"
                  : "bg-slate-50 text-slate-700",
              )}
            >
              <p className="font-black">
                You matched {result.mainHits.length} of {game.mainCount} numbers
                {game.specialLabel
                  ? `, ${result.specialHit ? "including" : "but not"} the ${game.specialLabel}`
                  : ""}
                .
              </p>
              {result.division && result.division.prize > 0 ? (
                <p className="mt-1 font-bold">
                  Division “{result.division.match}” — {rand(result.division.prize)}{" "}
                  per winner ({result.division.winners.toLocaleString("en-ZA")}{" "}
                  winners in this draw).
                </p>
              ) : (
                <p className="mt-1">
                  No prize for this combination — good luck in the next draw!
                </p>
              )}
              <p className="mt-2 text-[0.7rem] text-slate-500">
                Winning numbers in draw {draw.drawNumber}:{" "}
                {draw.mainNumbers.join(", ")}
                {draw.bonusNumber != null
                  ? ` · ${game.specialLabel} ${draw.bonusNumber}`
                  : ""}
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
