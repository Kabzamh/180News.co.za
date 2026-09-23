import type { Metadata } from "next";
import Link from "next/link";
import PodcastList from "@/components/media/PodcastList";
import AudioPlayer from "@/components/media/AudioPlayer";
import { getLatestMedia, countMedia } from "@/lib/media-service";
import { PODCASTS } from "@/lib/media-sources";
import type { MediaItem } from "@/db/schema";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Listen — South African podcasts & audio",
  description:
    "Listen to South African news podcasts and audio: BizNews Radio, Business Day Spotlight, Daily Friend, Central News, party-leader interviews and African analysis.",
};

export default async function ListenPage() {
  const [episodes, counts] = await Promise.all([
    getLatestMedia("audio", 80),
    countMedia(),
  ]);

  const groups = PODCASTS.map((show) => ({
    name: show.name,
    category: show.category,
    items: episodes.filter((e) => e.source === show.name).slice(0, 5),
  })).filter((g) => g.items.length > 0);

  const newest: MediaItem[] = [...episodes]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, 1);
  const featured = newest[0] ?? null;

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-navy-dark via-brand-navy to-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
                180° News · Audio
              </p>
              <h1 className="font-headline mt-1 text-3xl font-black uppercase tracking-wide sm:text-4xl">
                Listen
              </h1>
              <p className="mt-1 text-sm text-white/75">
                South African news podcasts, interviews and analysis — press play
                in the browser. {counts.audio} episodes from {groups.length}{" "}
                shows.
              </p>
            </div>
            <Link
              href="/watch"
              className="rounded-sm bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide hover:bg-white/20"
            >
              ▶ Watch video
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 py-7 sm:px-5">
        {groups.length === 0 ? (
          <div className="rounded-sm border border-amber-200 bg-amber-50 p-8 text-center text-sm text-amber-900">
            Podcasts are being loaded — please check back shortly.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Featured latest */}
            {featured && featured.audioUrl && (
              <section className="lg:col-span-3">
                <div className="mb-3 flex items-center gap-2.5 border-b-2 border-brand-red pb-2">
                  <span className="h-6 w-1.5 rounded-sm bg-brand-red" />
                  <h2 className="font-headline text-xl font-black uppercase">
                    Latest episode
                  </h2>
                </div>
                <div className="max-w-3xl">
                  <AudioPlayer
                    src={featured.audioUrl!}
                    title={featured.title}
                    show={featured.source}
                    thumbnail={featured.thumbnail}
                    duration={featured.durationSec}
                  />
                </div>
              </section>
            )}

            {groups.map((group) => (
              <div key={group.name} className="lg:col-span-1">
                <PodcastList show={group.name} items={group.items} />
              </div>
            ))}
          </div>
        )}

        <p className="mt-8 rounded-sm bg-slate-100 p-4 text-xs leading-relaxed text-slate-500">
          Podcasts are aggregated from the public RSS feeds of their respective
          producers, who retain all rights. Subscribe in Apple Podcasts,
          Spotify or your favourite app via the show&apos;s own feed.
        </p>
      </div>
    </div>
  );
}
