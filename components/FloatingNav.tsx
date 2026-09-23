"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES, PROVINCES } from "@/lib/constants";
import SocialIcons from "@/components/SocialIcons";
import { cn } from "@/lib/utils";

type IconProps = { filled?: boolean; className?: string };

function HomeIcon({ filled, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" fill={filled ? "currentColor" : "none"} stroke={filled ? "none" : "currentColor"} />
      {filled ? <path d="M5 10v11h4.5v-6h5v6H19V10l-7-6-7 6Z" fill="currentColor" stroke="none" /> : (
        <>
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </>
      )}
    </svg>
  );
}

function GridIcon({ filled, className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" fill={filled ? "currentColor" : "none"} />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" fill={filled ? "currentColor" : "none"} />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" fill={filled ? "currentColor" : "none"} />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" fill={filled ? "currentColor" : "none"} />
    </svg>
  );
}

function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.3-3.3" />
    </svg>
  );
}

function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

type SheetKind = "sections" | "more" | null;

function BottomSheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="animate-sheet-fade absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="animate-sheet-up absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto rounded-t-2xl bg-white pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        <div className="sticky top-0 z-10 rounded-t-2xl bg-white/95 px-5 pb-2 pt-3 backdrop-blur">
          <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300" />
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-lg font-black uppercase tracking-wide text-brand-navy">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <CloseIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
        <div className="px-5 pb-4">{children}</div>
      </div>
    </div>
  );
}

export default function FloatingNav() {
  const pathname = usePathname();
  const [sheet, setSheet] = useState<SheetKind>(null);

  // Close sheets whenever the route changes.
  useEffect(() => {
    setSheet(null);
  }, [pathname]);

  const tabCls = (active: boolean) =>
    cn(
      "relative flex h-full flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.6rem] font-bold transition-colors",
      active ? "text-brand-red" : "text-slate-500 hover:text-brand-navy",
    );

  return (
    <>
      {/* Full-width News24-style bottom tab bar */}
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 bottom-0 z-[60] border-t border-slate-200 bg-white/95 shadow-[0_-6px_24px_-12px_rgba(7,14,68,0.35)] backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto grid h-16 max-w-xl grid-cols-5">
          {/* Home */}
          <Link
            href="/"
            aria-label="Home"
            aria-current={pathname === "/" ? "page" : undefined}
            className={tabCls(pathname === "/")}
          >
            {pathname === "/" && <TabIndicator />}
            <HomeIcon filled={pathname === "/"} className="h-[22px] w-[22px]" />
            Home
          </Link>

          {/* Sections */}
          <button
            type="button"
            aria-label="Sections"
            aria-expanded={sheet === "sections"}
            onClick={() => setSheet("sections")}
            className={tabCls(sheet === "sections")}
          >
            {sheet === "sections" && <TabIndicator />}
            <GridIcon filled={sheet === "sections"} className="h-[22px] w-[22px]" />
            Sections
          </button>

          {/* Center: raised LIVE action */}
          <div className="relative flex flex-1 items-start justify-center">
            <Link
              href="/live"
              aria-label="Live news wire"
              aria-current={pathname.startsWith("/live") ? "page" : undefined}
              className="group -mt-6 flex flex-col items-center"
            >
              <span
                className={cn(
                  "animate-fab-glow flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-red-light to-brand-red-dark text-white transition-transform duration-200 group-hover:scale-105 group-active:scale-95",
                  pathname.startsWith("/live") && "ring-4 ring-brand-red/20",
                )}
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                  <path d="M9 7.5v9l8-4.5-8-4.5Z" />
                </svg>
              </span>
              <span
                className={cn(
                  "mt-1 flex items-center gap-1 text-[0.6rem] font-black uppercase tracking-wider",
                  pathname.startsWith("/live") ? "text-brand-red" : "text-slate-500",
                )}
              >
                <span className="animate-live h-1.5 w-1.5 rounded-full bg-brand-red" />
                Live
              </span>
            </Link>
          </div>

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search"
            aria-current={pathname.startsWith("/search") ? "page" : undefined}
            className={tabCls(pathname.startsWith("/search"))}
          >
            {pathname.startsWith("/search") && <TabIndicator />}
            <SearchIcon className="h-[22px] w-[22px]" />
            Search
          </Link>

          {/* More */}
          <button
            type="button"
            aria-label="More menu"
            aria-expanded={sheet === "more"}
            onClick={() => setSheet("more")}
            className={tabCls(sheet === "more")}
          >
            {sheet === "more" && <TabIndicator />}
            <MenuIcon className="h-[22px] w-[22px]" />
            More
          </button>
        </div>
      </nav>

      {/* Sections sheet */}
      {sheet === "sections" && (
        <BottomSheet title="News Sections" onClose={() => setSheet(null)}>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/section/${c.slug}`}
                className="flex items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-3 text-sm font-bold text-ink transition hover:border-transparent hover:text-white"
                style={{ ["--c" as string]: c.color }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = c.color)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />
                {c.name}
              </Link>
            ))}
          </div>
          <Link
            href="/lotto"
            className="mt-2 flex items-center justify-between rounded-lg bg-brand-navy px-4 py-3.5 text-sm font-black uppercase tracking-wide text-white"
          >
            🎱 Lotto Results
            <span className="text-brand-gold">›</span>
          </Link>
        </BottomSheet>
      )}

      {/* More sheet */}
      {sheet === "more" && (
        <BottomSheet title="Provinces & More" onClose={() => setSheet(null)}>
          <p className="mb-2 text-[0.65rem] font-black uppercase tracking-widest text-slate-400">
            Provincial &amp; local
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {PROVINCES.map((p) => (
              <Link
                key={p.slug}
                href={`/province/${p.slug}`}
                className="rounded-lg bg-slate-100 px-2 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-brand-navy hover:text-white"
              >
                {p.name}
              </Link>
            ))}
            <Link
              href="/local"
              className="rounded-lg bg-brand-navy px-2 py-2.5 text-center text-xs font-bold text-white"
            >
              All local news
            </Link>
          </div>

          <p className="mb-2 mt-5 text-[0.65rem] font-black uppercase tracking-widest text-slate-400">
            More from 180°
          </p>
          <Link
            href="/subscribe"
            className="mb-2 flex items-center justify-between rounded-lg bg-gradient-to-r from-amber-500 to-yellow-400 px-4 py-3 text-sm font-black uppercase tracking-wide text-indigo-950"
          >
            👑 Go Premium — 7 days free
            <span>R99/mo</span>
          </Link>
          <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
            <SheetRow href="/premium" label="✦ Premium stories" />
            <SheetRow href="/account" label="👤 My Account" />
            <SheetRow href="/watch" label="▶ Watch video" />
            <SheetRow href="/listen" label="🎧 Podcasts & audio" />
            <SheetRow href="/horoscopes" label="✦ Horoscopes" />
            <SheetRow href="/team" label="👥 The Newsroom Team" />
            <SheetRow href="/markets" label="📈 Markets Update" />
            <SheetRow href="/lotto" label="🎱 Lotto Results" />
            <SheetRow href="/live" label="⚡ Live Wire" />
            <SheetRow href="/sources" label="☰ News Sources" />
          </div>

          <p className="mb-2 mt-5 text-[0.65rem] font-black uppercase tracking-widest text-slate-400">
            Follow 180° News
          </p>
          <SocialIcons variant="light" size="sm" />
        </BottomSheet>
      )}
    </>
  );
}

function TabIndicator() {
  return (
    <span className="absolute top-0 h-[3px] w-9 rounded-b-full bg-brand-red" />
  );
}

function SheetRow({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-ink hover:bg-slate-50"
    >
      {label}
      <span className="text-slate-400">›</span>
    </Link>
  );
}
