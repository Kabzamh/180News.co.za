"use client";

import { useState } from "react";

export default function ShareButtons({
  title,
  slug,
}: {
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/article/${slug}`
      : `/article/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  const btn =
    "flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:scale-110";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-bold uppercase tracking-widest text-slate-500">
        Share:
      </span>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-[#25D366]`}
        aria-label="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" width="18" height="18">
          <path d="M12 2a10 10 0 0 0-8.6 15.06L2 22l5.08-1.33A10 10 0 1 0 12 2Zm5.2 14.13c-.22.62-1.28 1.18-1.76 1.23-.45.05-1.02.22-3.46-.74-2.93-1.15-4.78-4.13-4.93-4.32-.14-.2-1.17-1.56-1.17-2.97 0-1.41.74-2.1 1-2.39.26-.29.56-.36.75-.36.19 0 .37 0 .54.01.17.01.41-.07.64.49.22.57.76 1.97.83 2.11.07.14.11.31.02.5-.09.2-.14.31-.27.48-.14.17-.29.39-.41.52-.14.14-.28.29-.12.56.16.27.7 1.16 1.51 1.88 1.04.93 1.92 1.22 2.19 1.36.27.14.43.12.59-.07.16-.2.68-.79.86-1.06.18-.27.36-.23.61-.14.25.1 1.59.75 1.86.89.27.13.45.2.52.31.07.1.07.6-.15 1.21Z" />
        </svg>
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-[#1877F2]`}
        aria-label="Share on Facebook"
      >
        <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
          <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2a1 1 0 0 1 1-1Z" />
        </svg>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${btn} bg-black`}
        aria-label="Share on X"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.5 22H3.3l7.3-8.3L1.5 2h6.5l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.4 3.8H5.6L17.8 20Z" />
        </svg>
      </a>
      <button
        onClick={copyLink}
        className={`${btn} bg-brand-navy`}
        aria-label="Copy link"
      >
        {copied ? (
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1" strokeLinecap="round" />
            <path d="M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {copied && (
        <span className="text-xs font-semibold text-emerald-700">Link copied!</span>
      )}
    </div>
  );
}
