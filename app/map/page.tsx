import type { Metadata } from "next";
import { AdSlot } from "@/components/AdSlot";
import { SouthAfricaMap } from "@/components/SouthAfricaMap";
import { getNationalWeather } from "@/lib/weather";

export const metadata: Metadata = {
  title: "South Africa map",
  description: "Interactive map of South Africa’s nine provinces, city weather and the Johannesburg newsroom.",
};

export const dynamic = "force-dynamic";

export default async function MapPage() {
  const weather = await getNationalWeather();
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Mapping desk</p>
      <h1 className="mt-2 font-serif text-5xl">South Africa, mapped</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-600">
        Nine provinces, city forecasts and the Sandton office. Click a province for the provincial bulletin, or a
        city for its weather.
      </p>
      <div className="mt-6">
        <AdSlot slot="category-leaderboard" compact />
      </div>
      <div className="mt-8">
        <SouthAfricaMap weather={weather} />
      </div>
    </main>
  );
}
