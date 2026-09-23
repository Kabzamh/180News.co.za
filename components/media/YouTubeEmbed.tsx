"use client";

import { useState } from "react";
import { youtubeThumb } from "@/lib/media-sources";

/** Click-to-load YouTube embed (privacy-friendly, keeps pages fast). */
export default function YouTubeEmbed({
  id,
  title,
  large = false,
}: {
  id: string;
  title?: string;
  large?: boolean;
}) {
  const [active, setActive] = useState(false);

  if (active) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-black ${
          large ? "aspect-video" : "aspect-video"
        }`}
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title ?? "YouTube video"}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      className="group relative block w-full overflow-hidden bg-black text-left"
      aria-label={`Play video: ${title ?? id}`}
    >
      <span className="block aspect-video w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={youtubeThumb(id)}
          alt={title ?? ""}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
          }}
        />
      </span>
      <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/95 shadow-2xl transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      {title && (
        <span className="absolute bottom-0 left-0 right-0 p-4">
          <span className="font-headline line-clamp-2 text-base font-bold text-white sm:text-lg">
            {title}
          </span>
        </span>
      )}
    </button>
  );
}
