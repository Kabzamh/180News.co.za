import type { Metadata } from "next";
import { ShareBar } from "@/components/ShareBar";
import { dailyHoroscopes } from "@/lib/horoscope";

export const metadata: Metadata = {
  title: "Daily horoscope",
  description: "Today’s stars from the 180 Degrees News lifestyle desk.",
};

export default function HoroscopePage() {
  const signs = dailyHoroscopes();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Stars</p>
      <h1 className="mt-2 font-serif text-5xl">Daily horoscope</h1>
      <p className="mt-3 text-lg text-slate-600">A Joburg reading for every sign. Share yours.</p>
      <div className="mt-4">
        <ShareBar title="Today’s 180° horoscopes" path="/horoscope" />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {signs.map((sign) => (
          <article key={sign.slug} id={sign.slug} className="border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">{sign.dates}</p>
            <h2 className="mt-1 font-serif text-3xl">{sign.name}</h2>
            <p className="mt-1 text-xs uppercase text-[#8f1520]">{sign.mood}</p>
            <p className="mt-3 text-sm leading-relaxed">{sign.line}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
