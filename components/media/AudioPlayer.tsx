"use client";

import { useState } from "react";
import { formatDuration } from "@/lib/media-sources";

/** Compact branded HTML5 podcast player. */
export default function AudioPlayer({
  src,
  title,
  show,
  thumbnail,
  duration,
  publishedLabel,
}: {
  src: string;
  title: string;
  show?: string;
  thumbnail?: string | null;
  duration?: number | null;
  publishedLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 p-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Pause episode" : "Play episode"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-navy text-white transition hover:bg-brand-navy-dark"
        >
          {open ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumbnail} alt="" loading="lazy" className="h-12 w-12 shrink-0 rounded-sm object-cover" />
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-brand-navy/10 text-lg">
            🎧
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-bold leading-snug text-ink">
            {title}
          </p>
          <p className="mt-0.5 truncate text-[0.68rem] font-semibold uppercase tracking-wide text-brand-red">
            {show}
            {duration ? ` · ${formatDuration(duration)}` : ""}
            {publishedLabel ? ` · ${publishedLabel}` : ""}
          </p>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-slate-50 px-3 py-2.5">
          <audio
            controls
            autoPlay
            src={src}
            className="h-10 w-full"
            preload="none"
          >
            Your browser does not support the audio player.
          </audio>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block text-[0.65rem] font-semibold text-slate-400 hover:text-brand-red"
          >
            Open audio file ↗
          </a>
        </div>
      )}
    </div>
  );
}
