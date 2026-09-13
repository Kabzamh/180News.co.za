import type { Metadata } from "next";
import { ShareBar } from "@/components/ShareBar";
import { getLoadsheddingStage, scheduleForStage, stageCopy } from "@/lib/loadshedding";

export const metadata: Metadata = {
  title: "Load shedding schedule",
  description: "Live Eskom stage and area times for Johannesburg, Cape Town, Durban, Tshwane and Gqeberha.",
};

export const dynamic = "force-dynamic";

export default async function LoadsheddingPage() {
  const stage = await getLoadsheddingStage();
  const copy = stageCopy(stage);
  const areas = scheduleForStage(stage);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">National grid</p>
      <div className={`mt-3 p-6 text-white ${stage > 0 ? "bg-[#8f1520]" : "bg-[#1d5c32]"}`}>
        <p className="text-xs uppercase tracking-[0.16em] text-white/70">Eskom now</p>
        <h1 className="mt-2 font-serif text-5xl">{copy.headline}</h1>
        <p className="mt-2 max-w-2xl text-white/85">{copy.detail}</p>
        <div className="mt-4">
          <ShareBar title={`Load shedding: ${copy.headline}`} path="/loadshedding" />
        </div>
      </div>
      <p className="mt-6 text-sm text-slate-600">
        Stage is live from Eskom. Area windows are a newsroom guide for major metros — always confirm with your
        municipality or EskomSePush.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {areas.map((area) => (
          <article key={area.name} className="border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">{area.metro}</p>
            <h2 className="mt-1 font-serif text-2xl">{area.name}</h2>
            {area.slots.length === 0 ? (
              <p className="mt-3 text-sm text-emerald-700">No slots on the current stage.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {area.slots.map((slot) => (
                  <li key={`${slot.day}-${slot.start}`} className="flex justify-between border-b border-slate-100 py-1">
                    <span>{slot.day}</span>
                    <span className="font-semibold">
                      {slot.start} – {slot.end}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
