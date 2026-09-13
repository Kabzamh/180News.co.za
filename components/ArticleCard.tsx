import Link from "next/link";
import { MediaBadges, PlayIcon } from "@/components/MediaIcons";
import type { ArticleCardData } from "@/lib/queries";
import { timeAgo } from "@/lib/utils";

function ThumbOverlay({ article }: { article: ArticleCardData }) {
  const hasMedia = article.media.length > 0;
  return (
    <>
      {hasMedia ? (
        <span className="absolute inset-0 grid place-items-center bg-black/25">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#8f1520] text-white shadow">
            <PlayIcon className="h-5 w-5" />
          </span>
        </span>
      ) : null}
      <span className="absolute left-2 top-2 flex flex-wrap gap-1">
        {article.isBreaking ? (
          <span className="bg-[#8f1520] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Breaking
          </span>
        ) : null}
        <MediaBadges media={article.media} size="sm" />
      </span>
    </>
  );
}

export function ArticleCard({
  article,
  variant = "standard",
}: {
  article: ArticleCardData;
  variant?: "standard" | "compact" | "horizontal" | "text";
}) {
  if (variant === "text") {
    return (
      <article className="border-b border-slate-200 py-3 last:border-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f1520]">
          {article.category.name}
          <span className="text-slate-400"> · {timeAgo(article.publishedAt)}</span>
        </p>
        <h3 className="mt-1 font-serif text-lg leading-snug">
          <Link href={`/article/${article.slug}`} className="hover:text-[#0b2f8a]">
            {article.title}
          </Link>
        </h3>
        <div className="mt-1">
          <MediaBadges media={article.media} size="sm" />
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="flex gap-3">
        <Link href={`/article/${article.slug}`} className="relative h-20 w-28 shrink-0 overflow-hidden bg-slate-200">
          <img src={article.imageUrl} alt={article.imageAlt} className="h-full w-full object-cover" />
          <ThumbOverlay article={article} />
        </Link>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f1520]">
            {article.category.name}
          </p>
          <h3 className="mt-1 font-serif text-base leading-snug">
            <Link href={`/article/${article.slug}`} className="hover:text-[#0b2f8a]">
              {article.title}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-slate-500">{timeAgo(article.publishedAt)}</p>
        </div>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className="grid gap-4 border-b border-slate-200 py-5 last:border-0 md:grid-cols-[220px_1fr]">
        <Link href={`/article/${article.slug}`} className="relative overflow-hidden bg-slate-200">
          <img src={article.imageUrl} alt={article.imageAlt} className="h-44 w-full object-cover md:h-full" />
          <ThumbOverlay article={article} />
        </Link>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f1520]">
            {article.category.name}
            {article.province ? ` · ${article.province.name}` : ""}
          </p>
          <h3 className="mt-2 font-serif text-2xl leading-tight">
            <Link href={`/article/${article.slug}`} className="hover:text-[#0b2f8a]">
              {article.title}
            </Link>
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
          <div className="mt-3">
            <MediaBadges media={article.media} />
          </div>
          <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">
            {article.author.name} · {timeAgo(article.publishedAt)} · Subscribe for the full {article.readingMinutes} min read
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/article/${article.slug}`} className="relative overflow-hidden bg-slate-200">
        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <ThumbOverlay article={article} />
      </Link>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8f1520]">
        {article.category.name}
        {article.province ? ` · ${article.province.name}` : ""}
      </p>
      <h3 className="mt-2 font-serif text-xl leading-snug">
        <Link href={`/article/${article.slug}`} className="hover:text-[#0b2f8a]">
          {article.title}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
      <div className="mt-2">
        <MediaBadges media={article.media} size="sm" />
      </div>
      <p className="mt-auto pt-3 text-xs uppercase tracking-wide text-slate-500">
        {article.author.name} · {timeAgo(article.publishedAt)}
      </p>
    </article>
  );
}
