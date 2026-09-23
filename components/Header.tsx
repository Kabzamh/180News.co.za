"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import { CATEGORIES, PROVINCES } from "@/lib/constants";
import { cn, todayLong } from "@/lib/utils";

const NAV = [
  { slug: "national", label: "South Africa" },
  { slug: "politics", label: "Politics" },
  { slug: "business", label: "Business" },
  { slug: "sport", label: "Sport" },
  { slug: "technology", label: "Tech" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "world", label: "World & Africa" },
];

function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      className={cn("flex items-center", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search news, topics, places…"
        className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-brand-red focus:bg-white focus:ring-2 focus:ring-brand-red/20"
        aria-label="Search 180 Degrees News"
      />
      <button
        type="submit"
        className="-ml-9 flex h-8 w-8 items-center justify-center rounded-full text-brand-navy hover:text-brand-red"
        aria-label="Search"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.2-3.2" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [provincesOpen, setProvincesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Utility bar */}
      <div className="bg-brand-navy-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-1.5 text-[0.7rem] sm:px-5 sm:text-xs">
          <p className="truncate font-medium tracking-wide text-white/80">
            {todayLong()} <span className="mx-2 text-white/30">|</span>
            National · Provincial · Regional · Local
          </p>
          <div className="hidden items-center gap-4 text-white/80 sm:flex">
            <div className="hidden lg:block">
              <SocialIcons variant="dark" size="xs" className="gap-1.5" />
            </div>
            <span className="hidden h-4 w-px bg-white/20 lg:block" />
            <Link href="/sources" className="hover:text-white">
              Sources
            </Link>
            <Link href="/watch" className="hover:text-white">
              Watch
            </Link>
            <Link href="/listen" className="hover:text-white">
              Listen
            </Link>
            <Link href="/horoscopes" className="hover:text-white">
              Horoscopes
            </Link>
            <Link href="/team" className="hover:text-white">
              Team
            </Link>
            <Link href="/lotto" className="font-bold text-brand-gold hover:text-white">
              🎱 Lotto
            </Link>
            <Link
              href="/live"
              className="flex items-center gap-1.5 rounded-sm bg-brand-red px-2 py-0.5 font-bold text-white"
            >
              <span className="animate-live h-1.5 w-1.5 rounded-full bg-white" /> LIVE
            </Link>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-3 py-3 sm:px-5">
          <Logo />
          <SearchBox className="ml-auto hidden w-full max-w-sm md:block" />
          <button
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-brand-navy md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Primary navigation (desktop) */}
      <nav className="hidden bg-brand-red text-white md:block">
        <div className="mx-auto flex max-w-7xl items-stretch px-3 sm:px-5">
          <Link
            href="/subscribe"
            className="mr-1.5 my-1 flex items-center gap-1.5 rounded-sm bg-white px-3 py-1.5 self-center text-[0.78rem] font-black uppercase tracking-wide text-brand-red shadow hover:bg-brand-gold hover:text-brand-navy-dark"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M3 17h18l2-10-6 4-5-7-5 7-6-4 2 10Zm0 2h18v2H3v-2Z" />
            </svg>
            Subscribe
          </Link>
          <Link
            href="/"
            className="flex items-center px-3.5 py-2.5 text-sm font-bold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            Home
          </Link>
          {NAV.map((item) => (
            <Fragment key={item.slug}>
              <Link
                href={`/section/${item.slug}`}
                className="flex items-center px-3 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide hover:bg-brand-red-dark"
              >
                {item.label}
              </Link>
              {item.slug === "business" && (
                <Link
                  href="/markets"
                  className="flex items-center gap-1 px-3 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide text-brand-gold hover:bg-brand-red-dark"
                >
                  📈 Markets
                </Link>
              )}
            </Fragment>
          ))}

          {/* Provinces mega menu */}
          <div className="group relative flex">
            <button className="flex items-center gap-1 px-3 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide hover:bg-brand-red-dark">
              Provinces
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-1 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid gap-0.5 bg-white p-2 text-slate-800 ring-1 ring-black/10">
                {PROVINCES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/province/${p.slug}`}
                    className="flex items-center justify-between rounded px-3 py-2 text-sm font-medium hover:bg-red-50 hover:text-brand-red"
                  >
                    {p.name}
                    <span className="text-[0.65rem] uppercase tracking-wide text-slate-400">
                      {p.capital}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/local"
            className="flex items-center px-3 py-2.5 text-[0.82rem] font-semibold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            Local
          </Link>
          <Link
            href="/watch"
            className="flex items-center gap-1.5 px-3 py-2.5 text-[0.82rem] font-bold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            ▶ Watch
          </Link>
          <Link
            href="/listen"
            className="flex items-center gap-1.5 px-3 py-2.5 text-[0.82rem] font-bold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            🎧 Listen
          </Link>
          <Link
            href="/horoscopes"
            className="flex items-center gap-1.5 px-3 py-2.5 text-[0.82rem] font-bold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            ✦ Stars
          </Link>
          <Link
            href="/lotto"
            className="flex items-center gap-1.5 bg-brand-gold px-3 py-2.5 text-[0.82rem] font-black uppercase tracking-wide text-brand-navy-dark hover:brightness-105"
          >
            🎱 Lotto
          </Link>
          <Link
            href="/live"
            className="flex items-center gap-1.5 px-3 py-2.5 text-[0.82rem] font-bold uppercase tracking-wide hover:bg-brand-red-dark"
          >
            <span className="animate-live h-2 w-2 rounded-full bg-brand-gold" />
            Live Wire
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-brand-navy-dark text-white md:hidden">
          <div className="px-4 py-3">
            <SearchBox />
          </div>
          <div className="px-2 pb-2">
            <Link
              href="/subscribe"
              onClick={() => setOpen(false)}
              className="mb-1 flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-amber-500 to-yellow-400 px-3 py-2.5 text-sm font-black uppercase tracking-wide text-indigo-950"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M3 17h18l2-10-6 4-5-7-5 7-6-4 2 10Zm0 2h18v2H3v-2Z" />
              </svg>
              7 days free · R99/month
            </Link>
          </div>
          <div className="grid px-2 pb-4 text-sm font-semibold">
            <Link href="/" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              Home
            </Link>
            <Link href="/premium" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 text-brand-gold hover:bg-white/10">
              ✦ Premium stories
            </Link>
            {CATEGORIES.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/section/${c.slug}`}
                onClick={() => setOpen(false)}
                className="rounded px-3 py-2.5 hover:bg-white/10"
              >
                {c.name}
              </Link>
            ))}
            <button
              onClick={() => setProvincesOpen((v) => !v)}
              className="flex items-center justify-between rounded px-3 py-2.5 text-left hover:bg-white/10"
            >
              Provinces
              <span>{provincesOpen ? "−" : "+"}</span>
            </button>
            {provincesOpen && (
              <div className="pb-2 pl-4 text-[0.82rem] font-normal text-white/85">
                {PROVINCES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/province/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className="block rounded px-3 py-2 hover:bg-white/10"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
            <Link href="/watch" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              ▶ Watch video
            </Link>
            <Link href="/listen" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              🎧 Podcasts &amp; audio
            </Link>
            <Link href="/horoscopes" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              ✦ Horoscopes
            </Link>
            <Link
              href="/markets"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2.5 font-bold text-brand-gold hover:bg-white/10"
            >
              📈 Markets Update
            </Link>
            <Link href="/local" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              Local News
            </Link>
            <Link href="/live" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              Live Wire
            </Link>
            <Link
              href="/lotto"
              onClick={() => setOpen(false)}
              className="rounded px-3 py-2.5 font-black text-brand-gold hover:bg-white/10"
            >
              🎱 Lotto Results
            </Link>
            <Link href="/sources" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              News Sources
            </Link>
            <Link href="/team" onClick={() => setOpen(false)} className="rounded px-3 py-2.5 hover:bg-white/10">
              Newsroom Team
            </Link>
          </div>
          <div className="mt-2 border-t border-white/10 px-3 pt-4">
            <p className="mb-2 px-1 text-[0.65rem] font-black uppercase tracking-widest text-white/50">
              Follow 180° News
            </p>
            <SocialIcons variant="dark" />
          </div>
        </div>
      )}
    </header>
  );
}
