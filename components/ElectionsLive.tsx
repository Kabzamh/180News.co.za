"use client";

import { useEffect, useState } from "react";
import type { ElectionDesk } from "@/lib/iec";
import { formatDateTime, timeAgo } from "@/lib/utils";

export function ElectionsLive({ initial }: { initial: ElectionDesk }) {
  const [desk, setDesk] = useState(initial);

  useEffect(() => {
    const timer = window.setInterval(() => {
      fetch("/api/elections")
        .then((response) => response.json())
        .then((data: { ok?: boolean; desk?: ElectionDesk }) => {
          if (data.ok && data.desk) setDesk(data.desk);
        })
        .catch(() => undefined);
    }, 45000);
    return () => window.clearInterval(timer);
  }, []);

  const live = desk.live;
  const leading = live.parties[0];

  return (
    <div className="space-y-8">
      <section className="border border-[#8f1520]/30 bg-[#081226] p-6 text-white md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[#ef4444]" />
              Live IEC results
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">{live.eventName}</h1>
            <p className="mt-2 text-sm text-white/70">
              Source: Electoral Commission of South Africa · Updated {formatDateTime(live.fetchedAt)}
            </p>
          </div>
          <a
            href={live.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
          >
            Official IEC dashboard
          </a>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Registered voters" value={live.registeredVoters} />
          <Stat label="Votes counted" value={live.votesCast} />
          <Stat label="Valid votes" value={live.validVotes} />
          <Stat label="Turnout" value={`${live.turnout || 0}%`} raw />
        </div>

        {leading ? (
          <p className="mt-5 text-sm text-white/80">
            Leading: <span className="font-semibold">{leading.abbr}</span> on {leading.percent.toFixed(2)}% ·{" "}
            {leading.votes.toLocaleString("en-ZA")} votes · {leading.wards} ward
            {leading.wards === 1 ? "" : "s"}
          </p>
        ) : (
          <p className="mt-5 text-sm text-white/70">Waiting for the next IEC results drop.</p>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="border border-slate-200 bg-white p-5">
          <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Leading parties</h2>
          <div className="mt-5 space-y-4">
            {live.parties.map((party) => (
              <div key={party.abbr}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">
                    {party.abbr} · {party.percent.toFixed(2)}%
                  </span>
                  <span className="text-slate-500">
                    {party.votes.toLocaleString("en-ZA")} votes · {party.wards} wards
                  </span>
                </div>
                <div className="mt-1 h-3 bg-slate-100">
                  <div
                    className="h-3"
                    style={{ width: `${Math.min(100, party.percent)}%`, background: party.color }}
                  />
                </div>
              </div>
            ))}
            {live.parties.length === 0 ? (
              <p className="text-sm text-slate-600">No live party board is published yet.</p>
            ) : null}
          </div>
        </div>

        <aside className="border border-slate-200 bg-white p-5">
          <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Live wire</h2>
          <div className="mt-4 space-y-4">
            {desk.updates.length === 0 ? (
              <p className="text-sm text-slate-600">Updates will appear here as IEC figures move.</p>
            ) : (
              desk.updates.map((update) => (
                <article key={update.id} className="border-b border-slate-100 pb-3 last:border-0">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#8f1520]">
                    {timeAgo(update.createdAt)}
                  </p>
                  <h3 className="mt-1 font-serif text-xl leading-snug">{update.headline}</h3>
                  <p className="mt-1 text-sm text-slate-600">{update.detail}</p>
                </article>
              ))
            )}
          </div>
        </aside>
      </section>

      {live.wards.length > 0 ? (
        <section className="border border-slate-200 bg-white p-5">
          <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Wards and councillors</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {live.wards.map((ward) => (
              <article key={ward.wardId} className="border border-slate-200 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0b2f8a]">
                  {ward.province} · Ward {ward.wardId}
                </p>
                <h3 className="mt-1 font-serif text-2xl">{ward.municipality}</h3>
                {ward.winner ? (
                  <p className="mt-2 text-sm">
                    Declared: <span className="font-semibold">{ward.winner}</span> ({ward.winnerParty})
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-slate-600">Awaiting declaration.</p>
                )}
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  {ward.candidates.map((candidate) => (
                    <li key={`${ward.wardId}-${candidate.name}`}>
                      {candidate.name} · {candidate.party}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {live.timetable.length > 0 ? (
        <section className="border border-slate-200 bg-white p-5">
          <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">IEC timetable</h2>
          <div className="mt-4 divide-y divide-slate-100">
            {live.timetable.map((row) => (
              <div key={`${row.entry}-${row.date}`} className="flex flex-wrap justify-between gap-3 py-2 text-sm">
                <span>{row.entry}</span>
                <span className="text-slate-500">{row.date.replace(" 00:00:00", "")}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-[#0b2f8a] pb-2">
          <h2 className="font-serif text-3xl">Certified NPE 2024</h2>
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{desk.certified2024.date}</p>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          National Assembly result as certified by the IEC. This board stays on the desk between general elections
          while live by-elections update above.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Stat light label="Registered" value={desk.certified2024.registeredVoters} />
          <Stat light label="Votes cast" value={desk.certified2024.votesCast} />
          <Stat light label="Turnout" value={`${desk.certified2024.turnout}%`} raw />
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {desk.certified2024.parties.map((party) => (
            <div key={party.abbr} className="flex items-center justify-between border-b border-slate-100 py-2 text-sm">
              <span>
                <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: party.color }} />
                {party.abbr} · {party.percent.toFixed(2)}%
              </span>
              <span className="text-slate-500">
                {party.votes.toLocaleString("en-ZA")} · {party.seats} seats
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-3">
          {desk.certified2024.provinces.map((province) => (
            <div key={province.name} className="border border-slate-200 px-3 py-2 text-sm">
              <p className="font-semibold">{province.name}</p>
              <p className="text-slate-500">
                {province.leader} leading · {province.percent}%
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  raw = false,
  light = false,
}: {
  label: string;
  value: number | string;
  raw?: boolean;
  light?: boolean;
}) {
  return (
    <div className={light ? "border border-slate-200 bg-[#f4f0e8] p-4" : "bg-white/5 p-4"}>
      <p className={`text-[11px] uppercase tracking-[0.14em] ${light ? "text-slate-500" : "text-white/50"}`}>{label}</p>
      <p className={`mt-1 font-serif text-3xl ${light ? "text-slate-900" : "text-white"}`}>
        {raw || typeof value === "string" ? value : value.toLocaleString("en-ZA")}
      </p>
    </div>
  );
}
