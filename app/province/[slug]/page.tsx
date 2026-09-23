import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROVINCE_MAP, PROVINCES } from "@/lib/constants";
import {
  countArticles,
  getLocalArticles,
  getTrending,
  listArticles,
} from "@/lib/queries";
import { ArticleCard, ArticleRow } from "@/components/cards";
import { LargeTeaser } from "@/components/teasers";
import { Pagination } from "@/app/section/[slug]/page";

export const dynamic = "force-dynamic";
const PER_PAGE = 10;

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const province = PROVINCE_MAP[slug];
  if (!province) return { title: "Province not found" };
  return {
    title: `${province.name} news — regional & local`,
    description: province.blurb,
  };
}

export default async function ProvincePage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const province = PROVINCE_MAP[slug];
  if (!province) notFound();

  const page = Math.max(1, Number(pageParam ?? 1) || 1);
  const offset = (page - 1) * PER_PAGE;

  const [articleList, total, local, trending] = await Promise.all([
    listArticles({ province: slug }, { limit: PER_PAGE, offset }),
    countArticles({ province: slug }),
    getLocalArticles(6),
    getTrending(6),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const [lead, ...rest] = articleList;

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-navy to-brand-navy-dark text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            Provincial · Regional · Local
          </p>
          <h1 className="font-headline mt-1 text-3xl font-black uppercase tracking-wide sm:text-4xl">
            {province.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-white/85">{province.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold">
              Capital: {province.capital}
            </span>
            {province.centres.map((c) => (
              <Link
                key={c}
                href={`/search?q=${encodeURIComponent(c.split(" ")[0])}`}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
              >
                📍 {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-3 py-7 sm:px-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {total === 0 ? (
            <div className="bg-white p-10 text-center shadow-sm">
              <p className="text-4xl">🗺️</p>
              <h2 className="mt-3 font-headline text-xl font-black">
                No local stories for {province.name} yet
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Wire stories mentioning cities and towns in {province.name} will
                appear here automatically.
              </p>
              <Link
                href="/live"
                className="mt-4 inline-block rounded-sm bg-brand-red px-4 py-2 text-sm font-bold text-white"
              >
                Read the Live Wire
              </Link>
            </div>
          ) : (
            <>
              {lead && (
                <div className="mb-6">
                  <LargeTeaser article={lead} />
                </div>
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {rest.slice(0, 4).map((a) => (
                  <ArticleCard key={a.id} article={a} />
                ))}
              </div>
              <div className="mt-6 divide-y divide-slate-100 bg-white px-4 shadow-sm">
                {rest.slice(4).map((a) => (
                  <ArticleRow key={a.id} article={a} />
                ))}
              </div>
              <Pagination
                page={page}
                totalPages={totalPages}
                basePath={`/province/${slug}`}
              />
            </>
          )}
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-4 shadow-sm">
            <h3 className="mb-3 border-b-2 border-brand-navy pb-2 font-headline text-lg font-black uppercase">
              Other provinces
            </h3>
            <div className="grid grid-cols-2 gap-1.5">
              {PROVINCES.filter((p) => p.slug !== slug).map((p) => (
                <Link
                  key={p.slug}
                  href={`/province/${p.slug}`}
                  className="rounded border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-brand-navy hover:bg-brand-navy hover:text-white"
                >
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 shadow-sm">
            <h3 className="mb-2 border-b-2 border-brand-red pb-2 font-headline text-lg font-black uppercase">
              Most Read
            </h3>
            {trending.map((a, i) => (
              <div key={a.id}>
                <div className="flex items-baseline gap-3 py-2.5">
                  <span className="font-headline text-2xl font-black text-brand-red/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href={`/article/${a.slug}`}
                    className="card-title line-clamp-2 text-sm font-bold text-ink"
                  >
                    {a.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 shadow-sm">
            <h3 className="mb-3 border-b-2 border-slate-200 pb-2 font-headline text-lg font-black uppercase">
              Elsewhere locally
            </h3>
            <div className="divide-y divide-slate-100">
              {local
                .filter((a) => a.province !== slug)
                .slice(0, 5)
                .map((a) => (
                  <ArticleRow key={a.id} article={a} showImage={false} />
                ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
