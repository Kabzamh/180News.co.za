import Link from "next/link";
import { LottoBalls } from "@/components/LottoBalls";
import type { LottoDesk } from "@/lib/lotto";

export function LottoWidget({ desk }: { desk: LottoDesk }) {
  const featured = desk.games.slice(0, 3);
  return (
    <aside className="border border-[#0b2f8a]/20 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b2f8a]">Live lotto</p>
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8f1520]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
          Results
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {featured.map((game) => (
          <div key={game.slug}>
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold">{game.name}</p>
              <p className="text-[11px] text-slate-500">{game.drawDate}</p>
            </div>
            <LottoBalls numbers={game.numbers} bonus={game.bonus} bonusLabel={game.bonusLabel} size="sm" />
          </div>
        ))}
        {featured.length === 0 ? <p className="text-sm text-slate-600">Waiting for the next official draw.</p> : null}
      </div>
      <Link href="/lotto" className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">
        Full lotto desk →
      </Link>
    </aside>
  );
}
