"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const PRIMARY = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/category/national", label: "News", icon: NewsIcon },
  { href: "/bulletin", label: "Live", icon: LiveIcon },
  { href: "/search", label: "Search", icon: SearchIcon },
];

const MORE_LINKS = [
  { href: "/category/provincial", label: "Provincial" },
  { href: "/category/international", label: "International" },
  { href: "/category/politics", label: "Politics" },
  { href: "/elections", label: "IEC results" },
  { href: "/weather", label: "Weather" },
  { href: "/map", label: "Map" },
  { href: "/lotto", label: "Lotto" },
  { href: "/loadshedding", label: "Loadshedding" },
  { href: "/quiz", label: "Quiz" },
  { href: "/fuel", label: "Fuel" },
  { href: "/horoscope", label: "Stars" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/contact", label: "Contact" },
];

export function MobileDock({
  auth,
}: {
  auth: { name: string; paid: boolean } | null;
}) {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const accountHref = auth ? "/account" : "/signin";

  return (
    <div className="md:hidden">
      {more ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setMore(false)}
        />
      ) : null}

      {more ? (
        <div className="fixed inset-x-3 bottom-[5.4rem] z-50 rounded-2xl border border-white/10 bg-[#081226] p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">More from 180°</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {MORE_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMore(false)}
                className="border border-white/10 px-3 py-3 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      <nav
        aria-label="Mobile menu"
        className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-[#081226]/95 text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur"
      >
        <ul className="grid grid-cols-5">
          {PRIMARY.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMore(false)}
                  className={`flex flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                    active ? "text-white" : "text-white/55"
                  }`}
                >
                  <Icon active={active} />
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setMore((value) => !value)}
                className={`flex w-full flex-col items-center gap-1 px-1 py-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${
                  more ? "text-white" : "text-white/55"
                }`}
              >
                <MoreIcon active={more} />
                More
              </button>
            </div>
          </li>
        </ul>
        <Link
          href={accountHref}
          className="block border-t border-white/10 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[#f0c7cb]"
        >
          {auth ? `${auth.name.split(" ")[0]}${auth.paid ? " · Member" : " · Pay"}` : "Sign in"}
        </Link>
      </nav>
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-8.5Z"
        stroke={active ? "#f0c7cb" : "currentColor"}
        strokeWidth="1.7"
      />
    </svg>
  );
}

function NewsIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h14v14H5V5Zm3 4h8M8 13h8M8 17h5"
        stroke={active ? "#f0c7cb" : "currentColor"}
        strokeWidth="1.7"
      />
    </svg>
  );
}

function LiveIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3" fill={active ? "#8f1520" : "currentColor"} />
      <circle cx="12" cy="12" r="7" stroke={active ? "#f0c7cb" : "currentColor"} strokeWidth="1.7" />
    </svg>
  );
}

function SearchIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6" stroke={active ? "#f0c7cb" : "currentColor"} strokeWidth="1.7" />
      <path d="M16 16l4 4" stroke={active ? "#f0c7cb" : "currentColor"} strokeWidth="1.7" />
    </svg>
  );
}

function MoreIcon({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="1.6" fill={active ? "#f0c7cb" : "currentColor"} />
      <circle cx="12" cy="12" r="1.6" fill={active ? "#f0c7cb" : "currentColor"} />
      <circle cx="18" cy="12" r="1.6" fill={active ? "#f0c7cb" : "currentColor"} />
    </svg>
  );
}
