"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

const KEY = "180news_popia";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function snapshot() {
  return window.localStorage.getItem(KEY) === "1";
}

function serverSnapshot() {
  return true;
}

export function CookieNotice() {
  const accepted = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  if (accepted) return null;

  return (
    <div className="fixed inset-x-3 bottom-[7.4rem] z-40 border border-slate-300 bg-white p-4 text-sm shadow-lg md:bottom-4 md:left-4 md:right-auto md:max-w-md">
      <p className="font-semibold">Cookies and POPIA</p>
      <p className="mt-1 text-slate-600">
        We use essential cookies to sign you in and measure readership. See our{" "}
        <Link href="/privacy" className="text-[#0b2f8a]">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/popia" className="text-[#0b2f8a]">
          POPIA notice
        </Link>
        .
      </p>
      <button
        type="button"
        className="mt-3 bg-[#0b2f8a] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white"
        onClick={() => {
          window.localStorage.setItem(KEY, "1");
          window.dispatchEvent(new Event("storage"));
        }}
      >
        Accept
      </button>
    </div>
  );
}
