import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { MediaBadges } from "@/components/MediaIcons";
import { ElectionsWidget } from "@/components/ElectionsWidget";
import { LottoStrip } from "@/components/LottoStrip";
import { LottoWidget } from "@/components/LottoWidget";
import { LoadsheddingBanner } from "@/components/LoadsheddingBanner";
import { NewsletterForm } from "@/components/NewsletterForm";
import { PollBox } from "@/components/PollBox";
import { MarketsStrip } from "@/components/MarketsStrip";
import { WeatherStrip } from "@/components/WeatherStrip";
import { getMarkets } from "@/lib/markets";
import { getActivePolls } from "@/lib/engagement";
import { getElectionDesk } from "@/lib/iec";
import { getLottoDesk } from "@/lib/lotto";
import { getHomeData, getNavigationData } from "@/lib/queries";
import { timeAgo } from "@/lib/utils";
import { getNationalWeather } from "@/lib/weather";

export default async function HomePage() {
  const [data, nav, weather, elections, lotto, polls, markets] = await Promise.all([
    getHomeData(),
    getNavigationData(),
    getNationalWeather(),
    getElectionDesk(),
    getLottoDesk(),
    getActivePolls(),
    getMarkets(),
  ]);
  const hero = data.featured;

  return (
    <main className="paper-grid">
      <LoadsheddingBanner />
      <MarketsStrip markets={markets} />
      <WeatherStrip cities={weather} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.4fr_0.8fr]">
        {hero ? (
          <article className="relative overflow-hidden bg-[#081226] text-white">
            <img src={hero.imageUrl} alt={hero.imageAlt} className="h-[460px] w-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f0c7cb]">
                {hero.isBreaking ? "Breaking · " : "Lead story · "}
                {hero.category.name}
              </p>
              <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
                <Link href={`/article/${hero.slug}`} className="hover:underline">
                  {hero.title}
                </Link>
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">{hero.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                  {hero.author.name} · {timeAgo(hero.publishedAt)} · {hero.readingMinutes} min read
                </p>
                <MediaBadges media={hero.media} size="sm" />
              </div>
            </div>
          </article>
        ) : null}

        <aside className="space-y-5">
          <AdSlot slot="home-sidebar" />
          <div className="border border-slate-200 bg-white p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Most read</p>
            <div className="mt-4 divide-y divide-slate-200">
              {data.mostRead.map((article, index) => (
                <div key={article.id} className="flex gap-3 py-3">
                  <span className="font-serif text-2xl text-slate-300">{index + 1}</span>
                  <div>
                    <Link href={`/article/${article.slug}`} className="font-serif text-lg leading-snug hover:text-[#0b2f8a]">
                      {article.title}
                    </Link>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      {article.category.name} · {article.views.toLocaleString("en-ZA")} reads
                      <MediaBadges media={article.media} size="sm" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8">
        <AdSlot slot="home-native" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 lg:grid-cols-4">
        {data.latest.slice(0, 4).map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-6">
        <AdSlot slot="mid-leaderboard" compact />
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[1.6fr_0.8fr]">
          <div>
            <SectionHead title="National" href="/category/national" />
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              {data.national.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
          <div>
            <SectionHead title="Politics" href="/category/politics" />
            <div className="mt-2">
              {data.politics.map((article) => (
                <ArticleCard key={article.id} article={article} variant="text" />
              ))}
            </div>
            <div className="mt-8 space-y-5">
              <PollBox polls={polls} />
              <ElectionsWidget desk={elections} />
              <LottoWidget desk={lotto} />
              <Link href="/quiz" className="block border border-[#8f1520]/20 bg-[#f8e9ea] p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Daily quiz</p>
                <p className="mt-1 font-serif text-2xl">Beat the newsroom in 5 questions.</p>
                <p className="mt-1 text-sm text-slate-600">Then WhatsApp your score.</p>
              </Link>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Link href="/horoscope" className="border border-slate-200 bg-white p-3">
                  Daily stars →
                </Link>
                <Link href="/holidays" className="border border-slate-200 bg-white p-3">
                  2026 holidays →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <SectionHead title="Provincial" href="/category/provincial" />
        <div className="mt-4 flex flex-wrap gap-2">
          {nav.provinces.map((province) => (
            <Link
              key={province.slug}
              href={`/province/${province.slug}`}
              className="border border-slate-300 bg-white px-3 py-1 text-xs uppercase tracking-[0.12em] hover:border-[#0b2f8a] hover:text-[#0b2f8a]"
            >
              {province.name}
            </Link>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.provincial.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-[#081226] text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f0c7cb]">International</p>
            <h2 className="mt-3 font-serif text-4xl">Africa and the world, reported from Johannesburg.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">
              Diplomacy, trade, conflict and climate — the stories that turn beyond our borders, and the ones that
              come home.
            </p>
            <Link
              href="/category/international"
              className="mt-5 inline-block border border-white/30 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em]"
            >
              All international
            </Link>
          </div>
          <div className="space-y-4 bg-white p-4 text-slate-900">
            {data.international.map((article) => (
              <ArticleCard key={article.id} article={article} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <SectionHead title="Business" href="/category/business" />
          {data.business.map((article) => (
            <ArticleCard key={article.id} article={article} variant="text" />
          ))}
        </div>
        <div>
          <SectionHead title="Sport" href="/category/sport" />
          {data.sport.map((article) => (
            <ArticleCard key={article.id} article={article} variant="text" />
          ))}
        </div>
        <div>
          <SectionHead title="Opinion" href="/category/opinion" />
          {data.opinion.map((article) => (
            <ArticleCard key={article.id} article={article} variant="text" />
          ))}
        </div>
      </section>

      <section id="bulletin" className="mx-auto max-w-7xl px-4 pb-16">
        <div className="grid gap-8 border border-slate-200 bg-white p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">The 180° bulletin</p>
            <h2 className="mt-2 font-serif text-4xl">Teasers for everyone. Full stories for paying subscribers.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Register for a 7-day free trial, then R99 a month, to unlock every report — plus video and MP3 — from
              the Johannesburg newsroom.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </main>
  );
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-end justify-between border-b-2 border-[#8f1520] pb-2">
      <h2 className="font-serif text-3xl">{title}</h2>
      <Link href={href} className="text-xs font-bold uppercase tracking-[0.16em] text-[#0b2f8a]">
        View all
      </Link>
    </div>
  );
}
