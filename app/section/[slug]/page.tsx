import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/constants";
import { countArticles, getTrending, listArticles } from "@/lib/queries";
import { ArticleCard, ArticleRow, NumberedHeadline } from "@/components/cards";
import { LargeTeaser } from "@/components/teasers";
import AdSlot from "@/components/ads/AdSlot";

export const dynamic = "force-dynamic";
const PER_PAGE = 12;

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_MAP[slug];
  if (!cat) return { title: "Section not found" };
  return {
    title: `${cat.name} — latest South African news`,
    description: cat.blurb,
  };
}

export default async function SectionPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const cat = CATEGORY_MAP[slug];
  if (!cat) notFound();

  const page = Math.max(1, Number(pageParam ?? 1) || 1);
  const offset = (page - 1) * PER_PAGE;

  const [articleList, total, trending] = await Promise.all([
    listArticles({ category: slug }, { limit: PER_PAGE, offset }),
    countArticles({ category: slug }),
    getTrending(6),
  ]);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const [lead, ...rest] = articleList;

  return (
    <div>
      {/* Section band */}
      <div
        className="text-white"
        style={{
          background: `linear-gradient(120deg, ${cat.color}, #070e44 90%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/70">
            180° News · Section
          </p>
          <h1 className="font-headline mt-1 text-3xl font-black uppercase tracking-wide sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-white/85">{cat.blurb}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-3 py-7 sm:px-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {total === 0 ? (
            <EmptyState />
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
                basePath={`/section/${slug}`}
              />
            </>
          )}

          {/* Other sections */}
          <div className="mt-10">
            <h2 className="mb-3 border-b-2 border-slate-200 pb-2 font-headline text-lg font-black uppercase">
              More sections
            </h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.slug !== slug).map((c) => (
                <Link
                  key={c.slug}
                  href={`/section/${c.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm hover:!bg-[color:var(--chip)] hover:text-white"
                  style={{ ["--chip" as string]: c.color }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="space-y-6 lg:sticky lg:top-[118px]">
            <div className="bg-white p-4 shadow-sm">
              <h3 className="mb-2 border-b-2 border-brand-red pb-2 font-headline text-lg font-black uppercase">
                Most Read
              </h3>
              {trending.map((a, i) => (
                <NumberedHeadline key={a.id} article={a} index={i} />
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-3 sm:px-5">
        <AdSlot placement="section-rail" />
      </div>
    </div>
  );
}

export function EmptyState() {
  return (
    <div className="bg-white p-10 text-center shadow-sm">
      <p className="text-4xl">📰</p>
      <h2 className="mt-3 font-headline text-xl font-black">No stories yet</h2>
      <p className="mt-1 text-sm text-slate-500">
        This section will fill up once the news wires sync again.
      </p>
      <Link
        href="/live"
        className="mt-4 inline-block rounded-sm bg-brand-red px-4 py-2 text-sm font-bold text-white"
      >
        Read the Live Wire
      </Link>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav className="mt-8 flex items-center justify-between">
      {page > 1 ? (
        <Link
          href={`${basePath}?page=${page - 1}`}
          className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-brand-navy hover:bg-slate-50"
        >
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <span className="text-sm font-semibold text-slate-500">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className="rounded-sm bg-brand-navy px-4 py-2 text-sm font-bold text-white hover:bg-brand-navy-dark"
        >
          Next →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
