"use client";

import { useMemo, useState } from "react";

type Poll = {
  id: number;
  question: string;
  slug: string;
  total: number;
  options: Array<{ id: number; label: string; votes: number }>;
};

export function PollBox({ polls }: { polls: Poll[] }) {
  const [items, setItems] = useState(polls);
  const [picked, setPicked] = useState<Record<number, number>>({});

  const active = items[0];
  const voted = active ? picked[active.id] : undefined;
  const total = useMemo(() => active?.options.reduce((sum, option) => sum + option.votes, 0) ?? 0, [active]);

  async function vote(optionId: number) {
    if (!active || voted) return;
    setPicked((current) => ({ ...current, [active.id]: optionId }));
    const response = await fetch("/api/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    });
    const data = (await response.json()) as { ok?: boolean; poll?: Poll };
    if (data.poll) {
      setItems((current) => current.map((poll) => (poll.id === data.poll?.id ? data.poll : poll)));
    }
  }

  if (!active) return null;

  return (
    <aside className="border border-[#8f1520]/20 bg-white p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">Reader poll</p>
      <h2 className="mt-2 font-serif text-2xl">{active.question}</h2>
      <div className="mt-4 space-y-2">
        {active.options.map((option) => {
          const percent = total ? Math.round((option.votes / total) * 100) : 0;
          const mine = voted === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => vote(option.id)}
              className={`relative block w-full overflow-hidden border px-3 py-2 text-left text-sm ${
                mine ? "border-[#8f1520]" : "border-slate-200"
              }`}
            >
              <span
                className="absolute inset-y-0 left-0 bg-[#f8e9ea]"
                style={{ width: voted != null ? `${percent}%` : "0%" }}
              />
              <span className="relative z-10 flex justify-between">
                <span>{option.label}</span>
                {voted != null ? <span className="font-semibold">{percent}%</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-slate-500">{total.toLocaleString("en-ZA")} votes · tap to have your say</p>
    </aside>
  );
}
