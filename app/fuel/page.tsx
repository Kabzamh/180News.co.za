import type { Metadata } from "next";
import { ShareBar } from "@/components/ShareBar";
import { FUEL, getMarkets } from "@/lib/markets";

export const metadata: Metadata = {
  title: "Fuel prices and the rand",
  description: "Inland and coastal petrol and diesel prices, plus the live rand.",
};

export const dynamic = "force-dynamic";

export default async function FuelPage() {
  const markets = await getMarkets();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Pumps & rand</p>
      <h1 className="mt-2 font-serif text-5xl">Fuel prices</h1>
      <p className="mt-3 text-lg text-slate-600">
        Effective {FUEL.effective}. Inland Gauteng vs coastal KZN/Western Cape. {FUEL.note}
      </p>
      <div className="mt-4">
        <ShareBar title="SA fuel prices — 180 Degrees News" path="/fuel" />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { title: "Inland", rows: FUEL.inland },
          { title: "Coastal", rows: FUEL.coastal },
        ].map((block) => (
          <section key={block.title} className="border border-slate-200 bg-white p-6">
            <h2 className="font-serif text-3xl">{block.title}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between border-b py-2">
                <dt>Petrol 95</dt>
                <dd className="font-semibold">R{block.rows.petrol95.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-b py-2">
                <dt>Petrol 93</dt>
                <dd className="font-semibold">R{block.rows.petrol93.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between border-b py-2">
                <dt>Diesel 0.005%</dt>
                <dd className="font-semibold">R{block.rows.diesel005.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between py-2">
                <dt>Diesel 0.05%</dt>
                <dd className="font-semibold">R{block.rows.diesel05.toFixed(2)}</dd>
              </div>
            </dl>
          </section>
        ))}
      </div>
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">USD/ZAR</p>
          <p className="font-serif text-3xl">{markets.usdZar.toFixed(2)}</p>
        </div>
        <div className="border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">GBP/ZAR</p>
          <p className="font-serif text-3xl">{markets.gbpZar.toFixed(2)}</p>
        </div>
        <div className="border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Gold / oz</p>
          <p className="font-serif text-3xl">${markets.goldUsd.toFixed(0)}</p>
        </div>
      </section>
    </main>
  );
}
