import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { CommentForm } from "@/components/CommentForm";
import { MediaBadges, MediaFileList } from "@/components/MediaIcons";
import { ShareBar } from "@/components/ShareBar";
import { ArticleMediaPlayer } from "@/components/ArticleMediaPlayer";
import { SubscribeGate } from "@/components/SubscribeGate";
import { SubscriberStoryTools } from "@/components/SubscriberStoryTools";
import { hasFullAccess } from "@/lib/access";
import { getCurrentUser } from "@/lib/auth";
import { isPinned } from "@/lib/pins";
import { getArticleBySlug } from "@/lib/queries";
import { speechScript, summarizeArticle } from "@/lib/summary";
import { formatDateTime, splitParagraphs } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  if (!data) return { title: "Story not found" };
  return {
    title: data.article.title,
    description: data.article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [data, unlocked, user] = await Promise.all([
    getArticleBySlug(slug, { incrementViews: true }),
    hasFullAccess(),
    getCurrentUser(),
  ]);
  if (!data) notFound();

  const { article, related } = data;
  const paragraphs = splitParagraphs(article.content);
  const summary = unlocked ? summarizeArticle(article.title, article.content) : [];
  const script = unlocked
    ? speechScript(article.title, article.author.name, paragraphs)
    : "";
  const pinned = user?.paid ? await isPinned(user.id, article.id) : false;
  const teaser = paragraphs.slice(0, 1);
  const remainder = paragraphs.slice(1);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">
          <Link href={`/category/${article.category.slug}`}>{article.category.name}</Link>
          {article.province ? (
            <>
              {" · "}
              <Link href={`/province/${article.province.slug}`}>{article.province.name}</Link>
            </>
          ) : null}
          {article.isBreaking ? " · Breaking" : ""}
          {!unlocked ? " · Subscriber story" : ""}
        </p>
        <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{article.title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{article.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-slate-200 py-4 text-sm text-slate-600">
          <Link href={`/author/${article.author.slug}`} className="font-semibold text-[#0b2f8a]">
            {article.author.name}
          </Link>
          <span>{article.author.title}</span>
          <span>·</span>
          <span>{formatDateTime(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readingMinutes} min read</span>
          <span>·</span>
          <span>{article.views.toLocaleString("en-ZA")} views</span>
          {article.media.length > 0 ? (
            <span className="flex items-center gap-2">
              <MediaBadges media={article.media} size="sm" />
            </span>
          ) : null}
        </div>
        <div className="mt-4">
          <ShareBar title={article.title} path={`/article/${article.slug}`} />
        </div>
        <SubscriberStoryTools
          articleId={article.id}
          slug={article.slug}
          script={script}
          summary={summary}
          pinned={pinned}
          unlocked={unlocked}
        />
        {article.media.length > 0 ? <MediaFileList media={article.media.map((item) => ({ ...item, url: unlocked ? item.url : "" }))} /> : null}
        <img src={article.imageUrl} alt={article.imageAlt} className="mt-6 aspect-[16/8] w-full object-cover" />
        <p className="mt-2 text-xs uppercase tracking-wide text-slate-500">{article.imageAlt}</p>
        <ArticleMediaPlayer
          items={
            unlocked
              ? article.media
              : article.media.map((item) => ({ ...item, url: "" }))
          }
          unlocked={unlocked}
        />
        <div className="mt-8 max-w-3xl space-y-5 text-[1.05rem] leading-8 text-slate-800">
          {teaser.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          {unlocked ? (
            <>
              <div className="py-2">
                <AdSlot slot="article-inline" />
              </div>
              {remainder.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </>
          ) : (
            <SubscribeGate />
          )}
        </div>

        {unlocked ? (
          <section className="mt-12">
            <h2 className="border-b-2 border-[#8f1520] pb-2 font-serif text-3xl">Comments</h2>
            <div className="mt-5 space-y-4">
              {article.comments.length === 0 ? (
                <p className="text-sm text-slate-600">Be the first to comment on this story.</p>
              ) : (
                article.comments.map((comment) => (
                  <div key={comment.id} className="border border-slate-200 bg-white p-4">
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p className="text-xs text-slate-500">{formatDateTime(comment.createdAt)}</p>
                    <p className="mt-2 text-sm leading-relaxed">{comment.body}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
              <CommentForm articleId={article.id} />
            </div>
          </section>
        ) : (
          <p className="mt-8 text-sm text-slate-500">Comments open once you subscribe.</p>
        )}
      </article>

      <aside className="space-y-8">
        <AdSlot slot="article-sidebar" />
        <div className="border border-slate-200 bg-white p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">The journalist</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center bg-[#0b2f8a] font-serif text-white">
              {article.author.avatarInitials}
            </div>
            <div>
              <Link href={`/author/${article.author.slug}`} className="font-semibold">
                {article.author.name}
              </Link>
              <p className="text-xs text-slate-500">{article.author.title}</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">{article.author.bio}</p>
        </div>
        <div>
          <p className="border-b-2 border-[#8f1520] pb-2 font-serif text-2xl">Related</p>
          <div className="mt-4 space-y-4">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} variant="compact" />
            ))}
          </div>
        </div>
      </aside>
    </main>
  );
}
