"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SearchBox({
  initialQuery = "",
  compact = false,
}: {
  initialQuery?: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex" : "flex w-full max-w-xl"}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the bulletin"
        className="w-full border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-[#0b2f8a] focus:ring-2"
        aria-label="Search articles"
      />
      <button
        type="submit"
        className="bg-[#0b2f8a] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white hover:bg-[#081f5c]"
      >
        Search
      </button>
    </form>
  );
}
