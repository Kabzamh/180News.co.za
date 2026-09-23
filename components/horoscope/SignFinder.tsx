"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SIGNS, signForBirthday } from "@/lib/horoscope";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function SignFinder() {
  const router = useRouter();
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const sign = signForBirthday(month, day);

  const daysInMonth = new Date(2024, month, 0).getDate();

  return (
    <div className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-headline text-lg font-black uppercase text-indigo-900">
        Find your sign
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        Enter your birthday to jump straight to today&apos;s reading.
      </p>
      <div className="mt-3 flex gap-2">
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          aria-label="Birth month"
          className="w-full flex-1 rounded-sm border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm font-semibold"
        >
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          aria-label="Birth day"
          className="w-20 rounded-sm border border-slate-300 bg-slate-50 px-2.5 py-2 text-sm font-semibold"
        >
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => router.push(`/horoscopes/${sign.slug}`)}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-sm bg-indigo-900 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-indigo-800"
      >
        <span className="text-base">{sign.glyph}</span>
        Go to {sign.name}
      </button>
      <div className="mt-3 grid grid-cols-6 gap-1">
        {SIGNS.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => router.push(`/horoscopes/${s.slug}`)}
            title={`${s.name} ${s.dateRange}`}
            aria-label={s.name}
            className="flex h-8 items-center justify-center rounded-full text-base text-slate-500 hover:bg-indigo-50 hover:text-indigo-900"
          >
            {s.glyph}
          </button>
        ))}
      </div>
    </div>
  );
}
