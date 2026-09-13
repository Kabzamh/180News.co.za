"use client";

import { useCallback, useSyncExternalStore } from "react";

const KEY = "180-ad-dismissed";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

function getSnapshot() {
  return window.sessionStorage.getItem(KEY) === "1";
}

function getServerSnapshot() {
  return true;
}

export function StickyAd({
  id,
  advertiser,
  headline,
  cta,
}: {
  id: number;
  advertiser: string;
  headline: string;
  cta: string;
}) {
  const hidden = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const dismiss = useCallback(() => {
    window.sessionStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-3 bottom-[6.6rem] z-30 rounded-xl border border-black/20 bg-[#081226] text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)] md:hidden">
      <div className="flex items-center justify-between gap-3 px-3 py-3">
        <a href={`/api/ads/click?id=${id}`} className="min-w-0 flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/50">Advertisement · {advertiser}</p>
          <p className="truncate font-serif text-lg">{headline}</p>
        </a>
        <a
          href={`/api/ads/click?id=${id}`}
          className="shrink-0 border border-white/30 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
        >
          {cta}
        </a>
        <button type="button" onClick={dismiss} className="shrink-0 px-2 text-xs text-white/60" aria-label="Dismiss advertisement">
          ✕
        </button>
      </div>
    </div>
  );
}
