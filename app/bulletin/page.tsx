import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { MediaBadges } from "@/components/MediaIcons";
import { getBulletinData } from "@/lib/queries";
import { formatDateTime, timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Live bulletin",
  description: "The running 180 Degrees News bulletin from the Johannesburg newsroom.",
};

export const dynamic = "force-dynamic";

export default async function BulletinPage() {
  const { latest, breaking } = await getBulletinData();

  return (
    <main className="bg-[#081226] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/15 pb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f0c7cb]">Live bulletin</p>
            <h1 className="mt-2 font-serif text-5xl">180° News Bulletin</h1>
            <p className="mt-2 text-sm text-white/70">Johannesburg newsroom · Updated {formatDateTime(new Date())}</p>
          </div>
          <div className="border border-[#8f1520] bg-[#8f1520] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
            On air
          </div>
        </div>
        <div className="mt-6">
          <AdSlot slot="mid-leaderboard" compact />
        </div>

        {breaking.length > 0 ? (
          <section className="mt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">Breaking wires</p>
            <div className="mt-4 grid gap-3">
              {breaking.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="flex flex-wrap items-center justify-between gap-3 border-l-4 border-[#8f1520] bg-white/5 px-4 py-3 hover:bg-white/10"
                >
                  <span className="font-serif text-xl">{article.title}</span>
                  <span className="text-xs uppercase tracking-wide text-white/50">{timeAgo(article.publishedAt)}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-12">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">Running order</p>
          <div className="mt-5 divide-y divide-white/10">
            {latest.map((article, index) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="grid gap-4 py-5 hover:bg-white/5 md:grid-cols-[70px_160px_1fr]"
              >
                <span className="font-serif text-3xl text-white/30">{String(index + 1).padStart(2, "0")}</span>
                <img src={article.imageUrl} alt={article.imageAlt} className="h-24 w-full object-cover" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#f0c7cb]">
                    {article.category.name}
                    {article.province ? ` · ${article.province.name}` : ""}
                    {" · "}
                    {timeAgo(article.publishedAt)}
                  </p>
                  <h2 className="mt-1 font-serif text-2xl">{article.title}</h2>
                  <div className="mt-2">
                    <MediaBadges media={article.media} size="sm" />
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-white/65">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
