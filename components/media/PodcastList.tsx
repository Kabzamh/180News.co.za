import type { MediaItem } from "@/db/schema";
import AudioPlayer from "@/components/media/AudioPlayer";
import { timeAgo } from "@/lib/utils";

export default function PodcastList({
  show,
  items,
}: {
  show: string;
  items: MediaItem[];
}) {
  const [first, ...rest] = items;
  if (!first) return null;
  return (
    <section className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-lg text-white">
          🎙️
        </span>
        <div>
          <h2 className="font-headline text-base font-black uppercase leading-tight text-brand-navy">
            {show}
          </h2>
          <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-slate-400">
            {items.length} recent episodes
          </p>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <AudioPlayer
          src={first.audioUrl!}
          title={first.title}
          show={first.source}
          thumbnail={first.thumbnail}
          duration={first.durationSec}
          publishedLabel={timeAgo(first.publishedAt)}
        />
        {rest.map((ep) => (
          <AudioPlayer
            key={ep.id}
            src={ep.audioUrl!}
            title={ep.title}
            show={ep.source}
            thumbnail={ep.thumbnail}
            duration={ep.durationSec}
            publishedLabel={timeAgo(ep.publishedAt)}
          />
        ))}
      </div>
    </section>
  );
}
