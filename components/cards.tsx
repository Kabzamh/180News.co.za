import Link from "next/link";
import type { Article } from "@/db/schema";
import { CATEGORY_MAP, PROVINCE_MAP } from "@/lib/constants";
import PremiumBadge from "@/components/subscription/PremiumBadge";
import { cn, readingTime, timeAgo } from "@/lib/utils";

export function Badge({
  category,
  province,
  className,
}: {
  category?: string;
  province?: string | null;
  className?: string;
}) {
  const cat = category ? CATEGORY_MAP[category] : undefined;
  const prov = province ? PROVINCE_MAP[province] : undefined;
  const label = prov ? prov.name : cat?.short ?? "News";
  const color = cat?.color ?? "#0c1870";
  return (
    <span
      className={cn(
        "inline-block px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white",
        className,
      )}
      style={{ backgroundColor: prov ? "#0c1870" : color }}
    >
      {label}
    </span>
  );
}

export function BreakingBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 bg-brand-red px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-wider text-white",
        className,
      )}
    >
      <span className="animate-live h-1.5 w-1.5 rounded-full bg-white" />
      Breaking
    </span>
  );
}

function Meta({ article }: { article: Article }) {
  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-2 text-[0.7rem] text-slate-500">
      <span className="font-semibold text-brand-red">{article.source}</span>
      <span aria-hidden>•</span>
      <span>{timeAgo(article.publishedAt)}</span>
      <span aria-hidden>•</span>
      <span>{readingTime(article.content, article.summary)} min read</span>
      {article.views > 200 && (
        <>
          <span aria-hidden>•</span>
          <span>{article.views.toLocaleString("en-ZA")} reads</span>
        </>
      )}
    </div>
  );
}

/** Big lead story with image and overlaid headline. */
export function LeadStory({ article }: { article: Article }) {
  return (
    <article className="card-hover group relative overflow-hidden bg-black shadow-lg">
      <Link href={`/article/${article.slug}`}>
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
          {article.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-navy to-brand-navy-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
          <div className="absolute left-0 top-0 flex gap-1.5 p-3">
            {article.isBreaking && <BreakingBadge />}
            <Badge category={article.category} province={article.province} />
          </div>
          <div className="absolute bottom-0 p-4 sm:p-6">
            <h2 className="font-headline text-xl font-black leading-tight text-white sm:text-3xl">
              {article.title}
            </h2>
            {article.summary && (
              <p className="mt-2 hidden max-w-3xl text-sm leading-relaxed text-white/85 sm:block">
                {article.summary}
              </p>
            )}
            <div className="mt-2 text-xs font-semibold text-white/70">
              {article.source} · {timeAgo(article.publishedAt)}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

/** Standard vertical card. */
export function ArticleCard({
  article,
  className,
  imageClassName,
}: {
  article: Article;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <article className={cn("card-hover group flex flex-col bg-white shadow-sm", className)}>
      <Link href={`/article/${article.slug}`} className="block">
        <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-slate-200", imageClassName)}>
          {article.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.imageUrl}
              alt={article.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-navy/90 to-brand-navy-dark p-4">
              <span className="font-headline text-center text-lg font-bold text-white/90">
                {article.title.slice(0, 70)}
              </span>
            </div>
          )}
          <div className="absolute left-0 top-0">
            {article.isBreaking ? (
              <BreakingBadge />
            ) : (
              <Badge category={article.category} province={article.province} />
            )}
          </div>
          {article.isPremium && (
            <div className="absolute right-0 top-0 p-1.5">
              <PremiumBadge size="xs" />
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="card-title font-headline text-base font-bold leading-snug text-ink">
          <Link href={`/article/${article.slug}`}>{article.title}</Link>
        </h3>
        {article.summary && (
          <p className="mt-1.5 line-clamp-2 text-[0.82rem] leading-relaxed text-slate-600">
            {article.summary}
          </p>
        )}
        <Meta article={article} />
      </div>
    </article>
  );
}

/** Compact horizontal row: small thumb and headline (used in lists). */
export function ArticleRow({
  article,
  index,
  showImage = true,
}: {
  article: Article;
  index?: number;
  showImage?: boolean;
}) {
  return (
    <article className="group flex gap-3 py-3">
      {showImage && (
        <Link
          href={`/article/${article.slug}`}
          className="relative h-16 w-24 shrink-0 overflow-hidden bg-slate-200 sm:h-[72px] sm:w-28"
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
      )}
      {!showImage && typeof index === "number" && (
        <span className="font-headline w-7 shrink-0 text-2xl font-black text-slate-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0">
        <h4 className="card-title text-sm font-bold leading-snug text-ink">
          <Link href={`/article/${article.slug}`} className="line-clamp-3">
            {article.title}
          </Link>
        </h4>
        <div className="mt-1 flex items-center gap-2 text-[0.68rem] text-slate-500">
          {article.isBreaking && <BreakingBadge />}
          <span className="font-semibold text-brand-red">{article.source}</span>
          <span>·</span>
          <span>{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
}

/** Large numbered headline-only list item ("most read"). */
export function NumberedHeadline({
  article,
  index,
}: {
  article: Article;
  index: number;
}) {
  return (
    <article className="group flex gap-3 border-b border-slate-100 py-3 last:border-0">
      <span className="font-headline text-3xl font-black leading-none text-brand-red/80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-sm font-bold leading-snug text-ink">
        <Link href={`/article/${article.slug}`} className="card-title line-clamp-3">
          {article.title}
        </Link>
      </h4>
    </article>
  );
}

export function SectionHeading({
  title,
  href,
  accent = "#8c0e0e",
  subtitle,
}: {
  title: string;
  href?: string;
  accent?: string;
  subtitle?: string;
}) {
  const inner = (
    <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-slate-200 pb-2">
      <div className="flex items-center gap-2.5">
        <span className="h-6 w-1.5 rounded-sm" style={{ backgroundColor: accent }} />
        <h2 className="font-headline text-xl font-black uppercase tracking-wide text-ink sm:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <span className="hidden text-xs font-medium italic text-slate-500 sm:inline">
            {subtitle}
          </span>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs font-bold uppercase tracking-wide text-brand-red hover:underline"
        >
          More +
        </Link>
      )}
    </div>
  );
  return inner;
}
