import Link from "next/link";
import { getAllReadings } from "@/lib/horoscope";
import { MiniSignButton } from "@/components/horoscope/Horoscope";

/** Sidebar widget — all twelve signs with today's mood. */
export default function HoroscopeWidget() {
  const readings = getAllReadings(0);
  return (
    <section className="bg-gradient-to-br from-indigo-950 to-indigo-800 p-4 text-white shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-brand-gold">✦</span>
          <h3 className="font-headline text-base font-black uppercase tracking-wide">
            Daily Stars
          </h3>
        </div>
        <Link
          href="/horoscopes"
          className="text-[0.68rem] font-bold uppercase tracking-wide text-brand-gold hover:underline"
        >
          All +
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-0.5 rounded bg-white/5 p-1.5">
        {readings.map((r) => (
          <MiniSignButton key={r.sign.slug} sign={r.sign} tone="dark" />
        ))}
      </div>
      <p className="mt-2.5 text-center text-[0.66rem] italic text-white/60">
        {readings[0].longDate}
      </p>
    </section>
  );
}
