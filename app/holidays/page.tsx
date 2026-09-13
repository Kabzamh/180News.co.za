import type { Metadata } from "next";
import { HOLIDAYS_2026 } from "@/lib/markets";

export const metadata: Metadata = {
  title: "South Africa public holidays 2026",
  description: "The official public holiday calendar for South Africa.",
};

export default function HolidaysPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Calendar</p>
      <h1 className="mt-2 font-serif text-5xl">Public holidays 2026</h1>
      <div className="mt-8 divide-y divide-slate-200 border border-slate-200 bg-white">
        {HOLIDAYS_2026.map((day) => (
          <div key={day.date} className="flex justify-between px-4 py-3">
            <span className="font-semibold">{day.name}</span>
            <span className="text-slate-500">
              {new Date(`${day.date}T12:00:00`).toLocaleDateString("en-ZA", {
                weekday: "short",
                day: "numeric",
                month: "long",
              })}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
