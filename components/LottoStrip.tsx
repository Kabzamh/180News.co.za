import Link from "next/link";
import { LottoBalls } from "@/components/LottoBalls";
import type { LottoDesk } from "@/lib/lotto";

export function LottoStrip({ desk }: { desk: LottoDesk }) {
  if (desk.games.length === 0) return null;
  return (
    <section className="border-b border-slate-200 bg-[#081226] text-white">
      <div className="mx-auto flex max-w-7xl items-center gap-5 overflow-x-auto px-4 py-3">
        <Link href="/lotto" className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#f0c7cb]">
          Live lotto
        </Link>
        {desk.games.map((game) => (
          <Link key={game.slug} href="/lotto" className="flex shrink-0 items-center gap-3 border-l border-white/15 pl-5">
            <span className="text-xs font-semibold uppercase tracking-[0.12em]">{game.name}</span>
            <LottoBalls numbers={game.numbers} bonus={game.bonus} bonusLabel={game.bonusLabel} size="sm" />
          </Link>
        ))}
      </div>
    </section>
  );
}
