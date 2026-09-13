import type { ArticleMedia } from "@/db/schema";

export function VideoIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h7A2.5 2.5 0 0 1 16 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 17.5v-11Z" />
      <path d="M17 9.2 21 7v10l-4-2.2V9.2Z" />
    </svg>
  );
}

export function AudioIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9 16.5a3 3 0 1 1-2-2.83V6.5l10-2v8.17a3 3 0 1 1-2 2.83V7.38L9 8.7v7.8Z" />
    </svg>
  );
}

export function PlayIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5v13l11-6.5L8 5.5Z" />
    </svg>
  );
}

export function fileLabel(item: Pick<ArticleMedia, "kind" | "url" | "mimeType" | "title">) {
  const url = item.url.toLowerCase();
  if (url.includes("youtube") || url.includes("youtu.be")) return "YouTube";
  if (url.includes("vimeo")) return "Vimeo";
  if (url.endsWith(".mp4") || item.mimeType.includes("mp4")) return "MP4";
  if (url.endsWith(".webm") || item.mimeType.includes("webm")) return "WEBM";
  if (url.endsWith(".mp3") || item.mimeType.includes("mpeg") || item.mimeType.includes("mp3")) return "MP3";
  if (url.endsWith(".wav") || item.mimeType.includes("wav")) return "WAV";
  return item.kind === "audio" ? "Audio" : "Video";
}

export function fileName(item: Pick<ArticleMedia, "url" | "title">) {
  try {
    const clean = item.url.split("?")[0];
    const name = clean.split("/").pop();
    if (name && name.includes(".")) return decodeURIComponent(name);
  } catch {
    // ignore
  }
  return item.title;
}

export function MediaBadges({
  media,
  size = "md",
}: {
  media: ArticleMedia[];
  size?: "sm" | "md";
}) {
  if (!media?.length) return null;
  const hasVideo = media.some((item) => item.kind === "video");
  const hasAudio = media.some((item) => item.kind === "audio");
  const pad = size === "sm" ? "px-1.5 py-0.5 text-[9px]" : "px-2 py-1 text-[10px]";
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {hasVideo ? (
        <span className={`inline-flex items-center gap-1 bg-[#081226] font-bold uppercase tracking-[0.12em] text-white ${pad}`}>
          <VideoIcon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
          Video
        </span>
      ) : null}
      {hasAudio ? (
        <span className={`inline-flex items-center gap-1 bg-[#0b2f8a] font-bold uppercase tracking-[0.12em] text-white ${pad}`}>
          <AudioIcon className={size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5"} />
          Audio
        </span>
      ) : null}
    </span>
  );
}

export function MediaFileList({ media }: { media: ArticleMedia[] }) {
  if (!media?.length) return null;
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {media.map((item) => (
        <li
          key={item.id}
          className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600"
        >
          {item.kind === "audio" ? <AudioIcon className="h-3.5 w-3.5 text-[#0b2f8a]" /> : <VideoIcon className="h-3.5 w-3.5 text-[#081226]" />}
          <span className="font-semibold uppercase tracking-[0.1em] text-[#8f1520]">{fileLabel(item)}</span>
          <span className="max-w-[180px] truncate">{fileName(item)}</span>
        </li>
      ))}
    </ul>
  );
}
