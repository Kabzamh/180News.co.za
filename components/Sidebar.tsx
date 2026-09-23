import Link from "next/link";
import type { Article } from "@/db/schema";
import { PROVINCES } from "@/lib/constants";
import { NumberedHeadline } from "@/components/cards";
import Weather from "@/components/Weather";
import NewsletterForm from "@/components/NewsletterForm";
import LottoWidget from "@/components/lotto/LottoWidget";
import MarketsWidget from "@/components/markets/MarketsWidget";
import HoroscopeWidget from "@/components/horoscope/HoroscopeWidget";
import PremiumWidget from "@/components/subscription/PremiumWidget";
import AdSlot from "@/components/ads/AdSlot";
import { getLatestDraws } from "@/lib/lotto-service";

export default async function Sidebar({
  trending,
}: {
  trending: Article[];
}) {
  const latestDraws = await getLatestDraws().catch(() => ({}));
  return (
    <aside className="space-y-6">
      <PremiumWidget />

      {/* Most read */}
      <section className="bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center gap-2 border-b-2 border-brand-red pb-2">
          <span className="h-5 w-1.5 rounded-sm bg-brand-red" />
          <h3 className="font-headline text-lg font-black uppercase tracking-wide">
            Most Read
          </h3>
        </div>
        {trending.length ? (
          trending.slice(0, 8).map((a, i) => (
            <NumberedHeadline key={a.id} article={a} index={i} />
          ))
        ) : (
          <p className="py-4 text-sm text-slate-500">Trending stories appear here.</p>
        )}
      </section>

      {Object.keys(latestDraws).length > 0 && (
        <LottoWidget latest={latestDraws} />
      )}

      <Weather />

      <AdSlot placement="sidebar-rectangle" />

      <HoroscopeWidget />

      <MarketsWidget />

      {/* Provinces */}
      <section className="bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 border-b-2 border-brand-navy pb-2">
          <span className="h-5 w-1.5 rounded-sm bg-brand-navy" />
          <h3 className="font-headline text-lg font-black uppercase tracking-wide">
            By Province
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {PROVINCES.map((p) => (
            <Link
              key={p.slug}
              href={`/province/${p.slug}`}
              className="rounded border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand-navy hover:bg-brand-navy hover:text-white"
            >
              {p.name}
            </Link>
          ))}
        </div>
        <Link
          href="/local"
          className="mt-3 block rounded bg-brand-navy/5 py-2 text-center text-xs font-bold uppercase tracking-wide text-brand-navy hover:bg-brand-navy/10"
        >
          All regional &amp; local news →
        </Link>
      </section>

      {/* Newsletter */}
      <section className="bg-brand-red p-4 text-white shadow-sm">
        <h3 className="font-headline text-lg font-black uppercase tracking-wide">
          The Morning Briefing
        </h3>
        <p className="mt-1 text-xs text-white/85">
          South Africa&apos;s essential news, delivered to your inbox before 7am.
        </p>
        <div className="mt-3">
          <NewsletterForm variant="dark" />
        </div>
      </section>

      <AdSlot placement="sidebar-skyscraper" />

      {/* Sources promo */}
      <section className="border-2 border-dashed border-brand-navy/30 bg-brand-navy/5 p-4">
        <h3 className="font-headline text-base font-black uppercase tracking-wide text-brand-navy">
          Trusted News Sources
        </h3>
        <p className="mt-1 text-xs text-slate-600">
          Every story is curated from South Africa&apos;s leading newsrooms and
          verified by the 180° digital desk.
        </p>
        <Link
          href="/sources"
          className="mt-3 inline-flex items-center gap-2 rounded-sm bg-brand-navy px-3 py-2 text-xs font-bold uppercase tracking-wide text-white hover:bg-brand-navy-dark"
        >
          See all South African sources
        </Link>
      </section>
    </aside>
  );
}
