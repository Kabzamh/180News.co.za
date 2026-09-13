"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { SocialLinks } from "@/components/SocialLinks";
import { SearchBox } from "@/components/SearchBox";
import { HeaderWeather } from "@/components/HeaderWeather";
import type { Category, Province } from "@/db/schema";

function HeaderAuthLinks({
  auth,
  compact = false,
}: {
  auth: { name: string; paid: boolean } | null;
  compact?: boolean;
}) {
  const pad = compact ? "px-2 py-2 text-[10px]" : "px-3 py-2 text-xs";
  if (auth) {
    return (
      <>
        <Link
          href="/account"
          className={`border border-slate-300 font-bold uppercase tracking-[0.12em] ${pad}`}
        >
          {auth.name.split(" ")[0]}
          {auth.paid ? "" : " · Pay"}
        </Link>
        <Link
          href="/subscribe"
          className={`bg-[#8f1520] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#6d0f18] ${pad}`}
        >
          Subscribe
        </Link>
      </>
    );
  }
  return (
    <>
      <Link href="/signin" className={`border border-slate-300 font-bold uppercase tracking-[0.12em] ${pad}`}>
        Sign in
      </Link>
      <Link
        href="/subscribe"
        className={`bg-[#8f1520] font-bold uppercase tracking-[0.12em] text-white hover:bg-[#6d0f18] ${pad}`}
      >
        Subscribe
      </Link>
    </>
  );
}

export function Header({
  dateLabel,
  provinces,
  categories,
  auth,
}: {
  dateLabel: string;
  provinces: Province[];
  categories: Category[];
  auth: { name: string; paid: boolean } | null;
}) {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-[#f4f0e8]">
      <div className="bg-[#081226] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.16em]">
          <p>
            {SITE.city} · {dateLabel} · SAST
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/70">
            <HeaderWeather />
            <SocialLinks variant="dark" iconsOnly />
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <img src="/logo.png" alt="180 Degrees News" className="h-16 w-auto sm:h-20" />
          <div className="hidden min-w-0 sm:block">
            <p className="font-serif text-2xl font-semibold leading-none text-[#8f1520] md:text-3xl">
              180 Degrees News
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#0b2f8a]">
              Current news and affairs
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          <SearchBox compact />
          <HeaderAuthLinks auth={auth} />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-1.5 lg:hidden">
          <HeaderAuthLinks auth={auth} compact />
          <button
            type="button"
            onClick={() => setShowSearch((value) => !value)}
            className="border border-slate-300 px-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="bg-[#081226] px-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {showSearch ? (
        <div className="border-t border-slate-200 px-4 py-3 lg:hidden">
          <SearchBox />
        </div>
      ) : null}

      <nav className="bg-[#0b2f8a] text-white">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-3 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#081f5c]"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center">
            {auth ? (
              <Link
                href="/account"
                className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#081f5c]"
              >
                Account
              </Link>
            ) : (
              <Link
                href="/signin"
                className="whitespace-nowrap px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#081f5c]"
              >
                Sign in
              </Link>
            )}
            <Link
              href="/subscribe"
              className="whitespace-nowrap bg-[#8f1520] px-3 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] hover:bg-[#6d0f18]"
            >
              Subscribe
            </Link>
          </div>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-slate-100 py-2 text-sm font-semibold uppercase tracking-[0.12em]"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/about" onClick={() => setOpen(false)} className="py-2 text-sm font-semibold uppercase">
              About
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="py-2 text-sm font-semibold uppercase">
              Contact
            </Link>
            <Link href={auth ? "/account" : "/signin"} onClick={() => setOpen(false)} className="py-2 text-sm font-semibold uppercase">
              {auth ? "My profile" : "Sign in"}
            </Link>
            <Link href="/subscribe" onClick={() => setOpen(false)} className="py-2 text-sm font-semibold uppercase text-[#8f1520]">
              Subscribe
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Provinces</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {provinces.map((province) => (
                <Link
                  key={province.slug}
                  href={`/province/${province.slug}`}
                  onClick={() => setOpen(false)}
                  className="border border-slate-300 px-2 py-1 text-xs"
                >
                  {province.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Topics</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="border border-slate-300 px-2 py-1 text-xs"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
