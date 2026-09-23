import Link from "next/link";
import LottoBalls from "@/components/lotto/LottoBalls";
import { LOTTO_GAMES } from "@/lib/lottery";
import type { LottoDraw } from "@/db/schema";
import { rand, timeAgo } from "@/lib/utils";

/** Compact sidebar widget with the headline games. */
export default function LottoWidget({
  latest,
  slugs = ["daily-lotto", "powerball", "lotto"],
}: {
  latest: Record<string, LottoDraw>;
  slugs?: string[];
}) {
  const games = LOTTO_GAMES.filter((g) => slugs.includes(g.slug));
  return (
    <section className="bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between border-b-2 border-brand-red pb-2">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1.5 rounded-sm bg-brand-red" />
          <h3 className="font-headline text-lg font-black uppercase tracking-wide">
            Lotto Results
          </h3>
        </div>
        <Link
          href="/lotto"
          className="text-[0.7rem] font-bold uppercase text-brand-red hover:underline"
        >
          All games +
        </Link>
      </div>
      <div className="space-y-4">
        {games.map((game) => {
          const draw = latest[game.slug];
          if (!draw) return null;
          return (
            <Link
              key={game.slug}
              href="/lotto"
              className="block rounded-sm border border-slate-100 p-2.5 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span
                  className="rounded-sm px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-wider text-white"
                  style={{ backgroundColor: game.ball }}
                >
                  {game.short}
                </span>
                <span className="text-[0.65rem] text-slate-400">
                  Draw {draw.drawNumber} · {timeAgo(draw.drawDate)}
                </span>
              </div>
              <LottoBalls
                numbers={draw.mainNumbers}
                bonus={draw.bonusNumber}
                ballColor={game.ball}
                bonusColor={game.specialBall}
                bonusLabel={game.specialLabel ?? ""}
                size="sm"
              />
              <p className="mt-1.5 text-[0.7rem] font-bold text-emerald-700">
                Jackpot: {rand(draw.jackpot, { compact: true })}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
