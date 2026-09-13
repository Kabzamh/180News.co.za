import Link from "next/link";
import type { ElectionDesk } from "@/lib/iec";

export function ElectionsWidget({ desk }: { desk: ElectionDesk }) {
  const live = desk.live;
  return (
    <aside className="border border-[#8f1520]/20 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">IEC live desk</p>
        <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8f1520]">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
          Live
        </span>
      </div>
      <h2 className="mt-2 font-serif text-2xl">{live.eventName}</h2>
      <p className="mt-1 text-xs text-slate-500">
        {live.votesCast.toLocaleString("en-ZA")} votes counted · {live.turnout || 0}% poll
      </p>
      <div className="mt-4 space-y-3">
        {live.parties.slice(0, 3).map((party) => (
          <div key={party.abbr}>
            <div className="flex justify-between text-sm">
              <span className="font-semibold">{party.abbr}</span>
              <span>{party.percent.toFixed(2)}%</span>
            </div>
            <div className="mt-1 h-2 bg-slate-100">
              <div className="h-2" style={{ width: `${Math.min(100, party.percent)}%`, background: party.color }} />
            </div>
          </div>
        ))}
      </div>
      {desk.updates[0] ? (
        <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600">{desk.updates[0].headline}</p>
      ) : null}
      <Link href="/elections" className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">
        Full results desk →
      </Link>
    </aside>
  );
}
