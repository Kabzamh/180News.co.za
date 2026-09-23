import LottoBalls from "@/components/lotto/LottoBalls";
import type { LottoGame } from "@/lib/lottery";
import type { LottoDraw } from "@/db/schema";
import { formatDate, rand } from "@/lib/utils";

export default function HistoryTable({
  game,
  draws,
}: {
  game: LottoGame;
  draws: LottoDraw[];
}) {
  if (!draws.length) return null;
  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
      <div
        className="px-4 py-2.5 text-white"
        style={{ background: game.ball }}
      >
        <h3 className="font-headline text-sm font-black uppercase tracking-widest">
          {game.name} — recent results
        </h3>
      </div>
      <div className="divide-y divide-slate-100">
        {draws.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center gap-3 px-4 py-3">
            <div className="w-36 shrink-0">
              <p className="text-xs font-bold text-ink">
                {formatDate(d.drawDate)}
              </p>
              <p className="text-[0.65rem] text-slate-400">
                Draw {d.drawNumber}
              </p>
            </div>
            <LottoBalls
              numbers={d.mainNumbers}
              bonus={d.bonusNumber}
              ballColor={game.ball}
              bonusColor={game.specialBall}
              bonusLabel=""
              size="sm"
            />
            <span className="ml-auto text-[0.7rem] font-bold text-emerald-700">
              {Number(d.jackpot ?? d.prizePool ?? 0) > 0
                ? rand(d.jackpot ?? d.prizePool, { compact: true })
                : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
