import Link from "next/link";
import type { ArticleMedia } from "@/db/schema";
import { AudioIcon, MediaFileList, PlayIcon, VideoIcon, fileLabel, fileName } from "@/components/MediaIcons";
import { parseMediaUrl } from "@/lib/media";

export function ArticleMediaPlayer({
  items,
  unlocked,
}: {
  items: ArticleMedia[];
  unlocked: boolean;
}) {
  if (items.length === 0) return null;

  const hasVideo = items.some((item) => item.kind === "video");
  const hasAudio = items.some((item) => item.kind === "audio");

  if (!unlocked) {
    return (
      <div className="mt-6 border border-[#8f1520]/20 bg-[#081226] p-5 text-white">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#f0c7cb]">
          {hasVideo ? <VideoIcon className="h-4 w-4" /> : null}
          {hasAudio ? <AudioIcon className="h-4 w-4" /> : null}
          Paid media files
        </p>
        <h2 className="mt-2 font-serif text-2xl">
          {hasVideo && hasAudio
            ? "Video and audio files are for paying subscribers only."
            : hasVideo
              ? "This video file is for paying subscribers only."
              : "This audio file is for paying subscribers only."}
        </h2>
        <div className="mt-3 rounded-sm bg-white/5 p-3">
          <MediaFileList media={items} />
        </div>
        <p className="mt-3 text-sm text-white/70">
          Start a 7-day free trial or pay R99 a month to play these files. They do not run on teasers.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/subscribe" className="bg-[#8f1520] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            Pay to play
          </Link>
          <Link href="/signin" className="border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {items.map((item) => {
        const parsed = parseMediaUrl(item.url, item.kind);
        const fileSrc = `/api/media/stream/${item.id}`;
        return (
          <figure key={item.id} className="border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-2">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">
                {item.kind === "audio" ? <AudioIcon className="h-4 w-4" /> : <VideoIcon className="h-4 w-4" />}
                {fileLabel(item)} file · Subscribers
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold">
                <PlayIcon className="h-3.5 w-3.5 text-[#8f1520]" />
                {item.title}
              </p>
            </div>
            {parsed.player === "youtube" || parsed.player === "vimeo" ? (
              <div className="aspect-video bg-black">
                <iframe
                  src={parsed.src}
                  title={item.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : parsed.player === "audio" ? (
              <div className="bg-[#081226] px-4 py-6">
                <p className="mb-3 flex items-center gap-2 text-xs text-white/70">
                  <AudioIcon className="h-4 w-4 text-[#f0c7cb]" />
                  {fileName(item)}
                </p>
                <audio controls preload="none" className="w-full" src={fileSrc}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            ) : (
              <div className="bg-black">
                <video controls preload="none" className="aspect-video w-full bg-black" src={fileSrc} poster="">
                  Your browser does not support the video element.
                </video>
              </div>
            )}
            <figcaption className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm text-slate-600">
              <span>{item.caption || item.title}</span>
              <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                {item.kind === "audio" ? <AudioIcon className="h-3.5 w-3.5" /> : <VideoIcon className="h-3.5 w-3.5" />}
                {fileLabel(item)} · {fileName(item)}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
