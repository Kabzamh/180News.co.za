import Link from "next/link";
import type { Article } from "@/db/schema";
import { CATEGORY_MAP, PROVINCE_MAP } from "@/lib/constants";
import { cn, readingTime, timeAgo } from "@/lib/utils";
import { BreakingBadge } from "@/components/cards";
import PremiumBadge from "@/components/subscription/PremiumBadge";

/* ---------------------------------- Kicker --------------------------------- */

export function Kicker({
  article,
  className,
}: {
  article: Article;
  className?: string;
}) {
  const cat = CATEGORY_MAP[article.category];
  const prov = article.province ? PROVINCE_MAP[article.province] : null;
  return (
    <span
      className={cn(
        "text-[0.66rem] font-black uppercase tracking-[0.18em]",
        className,
      )}
      style={{ color: cat?.color ?? "#8c0e0e" }}
    >
      {prov ? prov.name : cat?.short ?? "News"}
    </span>
  );
}

export function TeaserMeta({
  article,
  className,
  light = false,
}: {
  article: Article;
  className?: string;
  light?: boolean;
}) {
  const mins = readingTime(article.content, article.summary);
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 text-[0.7rem]",
        light ? "text-white/70" : "text-slate-500",
        className,
      )}
    >
      <span className={light ? "font-semibold text-white/85" : "font-semibold text-brand-red"}>
        {article.source}
      </span>
      <span aria-hidden>•</span>
      <span>{timeAgo(article.publishedAt)}</span>
      <span aria-hidden>•</span>
      <span className="inline-flex items-center gap-1">
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" strokeLinecap="round" />
        </svg>
        {mins} min read
      </span>
    </div>
  );
}

function ReadMore({
  light = false,
  label = "Read article",
}: {
  light?: boolean;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "mt-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest transition-all group-hover:gap-2.5",
        light ? "text-brand-gold" : "text-brand-red",
      )}
    >
      {label}
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ------------------------------ Large split teaser ------------------------- */

export function LargeTeaser({ article }: { article: Article }) {
  return (
    <article className="card-hover group flex h-full flex-col overflow-hidden bg-white shadow-sm">
      <Link href={`/article/${article.slug}`} className="flex flex-1 flex-col sm:flex-row">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200 sm:w-1/2 sm:aspect-auto">
          {article.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy to-brand-navy-dark" />
          )}
          <div className="absolute left-0 top-0 flex">
            {article.isBreaking ? (
              <BreakingBadge />
            ) : (
              <span
                className="px-2.5 py-1 text-[0.62rem] font-black uppercase tracking-widest text-white"
                style={{ backgroundColor: CATEGORY_MAP[article.category]?.color ?? "#8c0e0e" }}
              >
                {CATEGORY_MAP[article.category]?.short ?? "News"}
              </span>
            )}
          </div>
          {article.isPremium && (
            <div className="absolute right-0 top-0 p-1.5">
              <PremiumBadge size="xs" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <Kicker article={article} />
          <h2 className="font-headline mt-1.5 text-xl font-black leading-tight text-ink sm:text-2xl">
            {article.title}
          </h2>
          {article.summary && (
            <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-600">
              {article.summary}
            </p>
          )}
          <div className="mt-auto pt-4">
            <TeaserMeta article={article} />
            <ReadMore />
          </div>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------------ Stacked teaser ----------------------------- */

export function StackedTeaser({ article }: { article: Article }) {
  return (
    <article className="card-hover group flex gap-4 bg-white p-3.5 shadow-sm">
      <Link href={`/article/${article.slug}`} className="relative h-20 w-24 shrink-0 overflow-hidden bg-slate-200 sm:h-24 sm:w-32">
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-brand-navy/80 to-brand-navy-dark" />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <Kicker article={article} />
        <h3 className="card-title mt-0.5 line-clamp-2 font-headline text-base font-bold leading-snug text-ink">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.summary && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">
            {article.summary}
          </p>
        )}
        <TeaserMeta article={article} className="mt-auto pt-1.5" />
      </div>
    </article>
  );
}

/* ------------------------------- List teaser ------------------------------- */

export function ListTeaser({ article, index }: { article: Article; index?: number }) {
  return (
    <article className="group flex gap-3.5 py-4 first:pt-0 last:pb-0">
      {typeof index === "number" && (
        <span className="font-headline w-7 shrink-0 text-2xl font-black leading-none text-brand-red/70">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <Link
        href={`/article/${article.slug}`}
        className="relative h-[74px] w-24 shrink-0 overflow-hidden bg-slate-200 sm:h-20 sm:w-28"
      >
        {article.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.imageUrl}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-brand-navy/15" />
        )}
      </Link>
      <div className="min-w-0 flex-1">
        <Kicker article={article} />
        <h3 className="card-title mt-0.5 line-clamp-2 text-sm font-bold leading-snug text-ink">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.summary && (
          <p className="mt-1 line-clamp-2 text-[0.74rem] leading-relaxed text-slate-500">
            {article.summary}
          </p>
        )}
        <TeaserMeta article={article} className="mt-1.5" />
      </div>
    </article>
  );
}

/* ---------------------------- Headline-only teaser -------------------------- */

export function HeadlineTeaser({ article }: { article: Article }) {
  return (
    <article className="group border-b border-slate-100 py-3.5 last:border-0">
      <Kicker article={article} />
      <h3 className="card-title mt-1 line-clamp-3 text-sm font-bold leading-snug text-ink">
        <Link href={`/article/${article.slug}`}>{article.title}</Link>
      </h3>
      {article.summary && (
        <p className="mt-1 line-clamp-2 text-[0.74rem] leading-relaxed text-slate-500">
          {article.summary}
        </p>
      )}
      <p className="mt-1 text-[0.68rem] font-semibold text-brand-red">
        {article.source} · {timeAgo(article.publishedAt)}
      </p>
    </article>
  );
}

/* --------------------------- Photo rail (in pictures) ---------------------- */

export function PhotoRailItem({ article }: { article: Article }) {
  return (
    <article className="card-hover group relative w-56 shrink-0 overflow-hidden bg-black shadow-sm sm:w-64">
      <Link href={`/article/${article.slug}`}>
        <div className="relative aspect-[3/4] w-full overflow-hidden">
          {article.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-navy to-brand-navy-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <span
            className="absolute left-0 top-0 px-2 py-0.5 text-[0.6rem] font-black uppercase tracking-widest text-white"
            style={{ backgroundColor: CATEGORY_MAP[article.category]?.color ?? "#8c0e0e" }}
          >
            {CATEGORY_MAP[article.category]?.short ?? "News"}
          </span>
          <div className="absolute bottom-0 p-3">
            <h3 className="font-headline line-clamp-3 text-sm font-bold leading-snug text-white">
              {article.title}
            </h3>
            <p className="mt-1 text-[0.65rem] font-semibold text-white/70">
              {timeAgo(article.publishedAt)} · {article.source}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function PhotoRail({ articles, title = "In pictures" }: { articles: Article[]; title?: string }) {
  if (!articles.length) return null;
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-slate-800 pb-2">
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1.5 rounded-sm bg-slate-900" />
          <h2 className="font-headline text-xl font-black uppercase tracking-wide text-ink sm:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      <div className="rail flex gap-4 overflow-x-auto pb-3">
        {articles.map((a) => (
          <PhotoRailItem key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}
