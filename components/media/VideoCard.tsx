import type { MediaItem } from "@/db/schema";
import { formatDuration } from "@/lib/media-sources";
import { timeAgo } from "@/lib/utils";

export function VideoCard({ item }: { item: MediaItem }) {
  return (
    <article className="card-hover group flex flex-col bg-white shadow-sm">
      {/* Clicking opens the dedicated watch view (server page handles embed). */}
      <a
        href={`/watch?v=${item.youtubeId}`}
        className="relative block aspect-video w-full overflow-hidden bg-slate-900"
      >
        {item.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-navy to-brand-navy-dark" />
        )}
        <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/30" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/95 shadow-lg">
            <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 fill-white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        {item.durationSec ? (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[0.62rem] font-bold tabular-nums text-white">
            {formatDuration(item.durationSec)}
          </span>
        ) : null}
      </a>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="card-title line-clamp-2 font-headline text-sm font-bold leading-snug text-ink">
          <a href={`/watch?v=${item.youtubeId}`}>{item.title}</a>
        </h3>
        {item.summary && (
          <p className="mt-1 line-clamp-2 text-[0.74rem] leading-relaxed text-slate-500">
            {item.summary}
          </p>
        )}
        <div className="mt-auto pt-2 text-[0.66rem] font-semibold uppercase tracking-wide text-slate-400">
          <span className="text-brand-red">{item.source}</span> ·{" "}
          {timeAgo(item.publishedAt)}
          {item.views > 0 && ` · ${formatViews(item.views)} views`}
        </div>
      </div>
    </article>
  );
}

function formatViews(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "m";
  if (n >= 1_000) return Math.round(n / 1_000) + "k";
  return String(n);
}

/** Horizontal scrolling rail of videos for the homepage. */
export function VideoRail({ items }: { items: MediaItem[] }) {
  if (!items.length) return null;
  return (
    <div className="rail flex gap-4 overflow-x-auto pb-3">
      {items.map((item) => (
        <div key={item.id} className="w-72 shrink-0">
          <VideoCard item={item} />
        </div>
      ))}
    </div>
  );
}
