"use client";

import { useEffect, useRef, useState } from "react";
import type { AdPlacement } from "@/db/schema";

type Props = {
  id: number;
  name: string;
  type: string;
  imageUrl: string | null;
  html: string | null;
  linkUrl: string | null;
  sponsor: string | null;
  placement: AdPlacement;
  width?: number;
  height?: number;
  className?: string;
};

export default function AdClient({
  id,
  name,
  type,
  imageUrl,
  html,
  linkUrl,
  sponsor,
  placement,
  width,
  height,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [blocked, setBlocked] = useState(false);

  // One impression when the banner scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let counted = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted) {
          counted = true;
          fetch("/api/ads/impression", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify([id]),
            keepalive: true,
          }).catch(() => undefined);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  // Detect aggressive ad-blockers that hide the frame.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      const cs = window.getComputedStyle(el);
      if (
        cs.display === "none" ||
        cs.visibility === "hidden" ||
        el.offsetParent === null
      ) {
        setBlocked(true);
      }
    }, 700);
    return () => clearTimeout(t);
  }, []);

  if (dismissed) return null;

  const isSticky = placement === "mobile-sticky";

  const frame = (
    <div
      ref={ref}
      data-ad={placement}
      className={`relative overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm ${
        isSticky ? "flex h-[50px] items-center" : ""
      } ${className}`}
      style={{ width: "100%" }}
    >
      {type === "html" ? (
        <div
          className="h-full w-full"
          dangerouslySetInnerHTML={{ __html: html ?? "" }}
        />
      ) : imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={sponsor ? `${sponsor} advertisement` : "Advertisement"}
          className={
            isSticky
              ? "h-full w-full object-cover"
              : "block h-auto w-full object-contain"
          }
          width={width}
          height={height}
        />
      ) : (
        <a
          href={linkUrl ?? "#"}
          className="flex h-full min-h-[90px] w-full items-center justify-center bg-gradient-to-br from-brand-navy to-brand-red p-4 text-center text-white"
        >
          <span>
            <span className="block text-sm font-black uppercase">
              {sponsor ?? "Your brand here"}
            </span>
            <span className="block text-[0.65rem] opacity-80">{name}</span>
          </span>
        </a>
      )}

      {linkUrl && type === "image" && imageUrl && (
        <a href={linkUrl} target="_blank" rel="noreferrer sponsored" className="absolute inset-0" aria-label={`${sponsor ?? name} advert`} />
      )}

      {!isSticky && (
        <span className="pointer-events-none absolute right-1 top-1 rounded bg-black/55 px-1 py-0.5 text-[0.5rem] font-bold uppercase tracking-widest text-white">
          Ad
        </span>
      )}
      {isSticky && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="absolute -right-0 -top-0 z-10 flex h-4 w-4 items-center justify-center bg-black/60 text-[0.6rem] text-white"
        >
          ✕
        </button>
      )}
    </div>
  );

  return (
    <div
      className={`ad-slot ${
        isSticky
          ? "fixed inset-x-0 bottom-[68px] z-40 mx-auto max-w-md px-2 md:hidden"
          : "my-5"
      }`}
      aria-label="Advertisement"
    >
      {blocked ? (
        <div className="rounded-sm border border-dashed border-slate-300 bg-slate-50 p-2 text-center text-[0.62rem] text-slate-400">
          Advertising helps keep 180° News free.
        </div>
      ) : (
        frame
      )}
    </div>
  );
}
