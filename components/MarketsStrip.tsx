import Link from "next/link";
import { FUEL } from "@/lib/markets";
import type { MarketsSnap } from "@/lib/markets";

export function MarketsStrip({ markets }: { markets: MarketsSnap }) {
  const items = [
    { label: "USD/ZAR", value: markets.usdZar.toFixed(2) },
    { label: "GBP/ZAR", value: markets.gbpZar.toFixed(2) },
    { label: "EUR/ZAR", value: markets.eurZar.toFixed(2) },
    { label: "Gold", value: `$${markets.goldUsd.toFixed(0)}` },
    { label: "95 inland", value: `R${FUEL.inland.petrol95.toFixed(2)}` },
    { label: "95 coast", value: `R${FUEL.coastal.petrol95.toFixed(2)}` },
  ];
  const loop = [...items, ...items];
  return (
    <div className="border-y border-slate-200 bg-[#081226] text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <Link
          href="/fuel"
          className="flex shrink-0 items-center bg-[#0b2f8a] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em]"
        >
          Markets
        </Link>
        <div className="relative flex-1 overflow-hidden">
          <div className="ticker-track flex w-max items-center gap-8 py-2 pr-8">
            {loop.map((item, index) => (
              <span key={`${item.label}-${index}`} className="whitespace-nowrap text-sm">
                <span className="text-white/50">{item.label}</span> {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
