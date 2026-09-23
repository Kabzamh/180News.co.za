import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  isNotNull,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { db } from "@/db";
import { articles, rssSources, subscribers } from "@/db/schema";
import type { Article, NewArticle, RssSource } from "@/db/schema";

export type ArticleFilter = {
  category?: string;
  province?: string;
  region?: string;
  q?: string;
  breaking?: boolean;
  featured?: boolean;
  source?: string;
  author?: string;
};

function buildWhere(filter: ArticleFilter = {}) {
  const conditions: SQL[] = [];
  if (filter.category) conditions.push(eq(articles.category, filter.category));
  if (filter.province) conditions.push(eq(articles.province, filter.province));
  if (filter.region) conditions.push(eq(articles.region, filter.region));
  if (filter.source) conditions.push(eq(articles.source, filter.source));
  if (filter.author) conditions.push(eq(articles.author, filter.author));
  if (filter.breaking !== undefined)
    conditions.push(eq(articles.isBreaking, filter.breaking));
  if (filter.featured !== undefined)
    conditions.push(eq(articles.featured, filter.featured));
  if (filter.q && filter.q.trim().length > 1) {
    const term = `%${filter.q.trim()}%`;
    conditions.push(
      or(
        ilike(articles.title, term),
        ilike(articles.summary, term),
        ilike(articles.content, term),
        sql`${articles.tags}::text ILIKE ${term}`,
      )!,
    );
  }
  return conditions.length ? and(...conditions) : undefined;
}

export async function listArticles(
  filter: ArticleFilter = {},
  opts: { limit?: number; offset?: number } = {},
): Promise<Article[]> {
  const { limit = 20, offset = 0 } = opts;
  const where = buildWhere(filter);
  return db
    .select()
    .from(articles)
    .where(where)
    .orderBy(desc(articles.publishedAt), desc(articles.id))
    .limit(limit)
    .offset(offset);
}

export async function countArticles(filter: ArticleFilter = {}): Promise<number> {
  const where = buildWhere(filter);
  const rows = await db
    .select({ value: count() })
    .from(articles)
    .where(where);
  return rows[0]?.value ?? 0;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const rows = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  return rows[0] ?? null;
}

export async function getTrending(limit = 8): Promise<Article[]> {
  const since = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
  return db
    .select()
    .from(articles)
    .where(sql`${articles.publishedAt} > ${since}`)
    .orderBy(desc(articles.views), desc(articles.publishedAt))
    .limit(limit);
}

export async function getBreaking(limit = 10): Promise<Article[]> {
  const since = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  return db
    .select()
    .from(articles)
    .where(
      and(
        eq(articles.isBreaking, true),
        sql`${articles.publishedAt} > ${since}`,
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getFeatured(limit = 6): Promise<Article[]> {
  return listArticles({ featured: true }, { limit });
}

export async function getRelated(article: Article, limit = 5): Promise<Article[]> {
  const rows = await db
    .select()
    .from(articles)
    .where(
      and(
        sql`${articles.id} != ${article.id}`,
        or(
          eq(articles.category, article.category),
          article.province
            ? eq(articles.province, article.province)
            : sql`false`,
        )!,
      ),
    )
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
  return rows;
}

export async function incrementViews(slug: string): Promise<void> {
  await db
    .update(articles)
    .set({ views: sql`${articles.views} + 1` })
    .where(eq(articles.slug, slug));
}

export async function getLatestPerCategory(
  categorySlugs: string[],
  perCategory = 5,
): Promise<Record<string, Article[]>> {
  const out: Record<string, Article[]> = {};
  await Promise.all(
    categorySlugs.map(async (slug) => {
      out[slug] = await listArticles({ category: slug }, { limit: perCategory });
    }),
  );
  return out;
}

export async function getProvinceCounts(): Promise<
  Record<string, number>
> {
  const rows = await db
    .select({
      province: articles.province,
      value: sql<number>`count(*)::int`,
    })
    .from(articles)
    .where(isNotNull(articles.province))
    .groupBy(articles.province);
  const out: Record<string, number> = {};
  for (const row of rows) if (row.province) out[row.province] = row.value;
  return out;
}

export async function getLocalArticles(limit = 30): Promise<Article[]> {
  return db
    .select()
    .from(articles)
    .where(isNotNull(articles.province))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getSources(): Promise<RssSource[]> {
  return db.select().from(rssSources).orderBy(asc(rssSources.name));
}

export async function getSourceArticleCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({ source: articles.source, value: sql<number>`count(*)::int` })
    .from(articles)
    .groupBy(articles.source);
  const out: Record<string, number> = {};
  for (const row of rows) out[row.source] = row.value;
  return out;
}

export async function totalArticles(): Promise<number> {
  const rows = await db.select({ value: count() }).from(articles);
  return rows[0]?.value ?? 0;
}

export async function listPremium(
  kind?: string,
  limit = 60,
): Promise<Article[]> {
  const conditions = [eq(articles.isPremium, true)];
  if (kind) conditions.push(eq(articles.premiumKind, kind));
  return db
    .select()
    .from(articles)
    .where(and(...conditions))
    .orderBy(desc(articles.publishedAt))
    .limit(limit);
}

export async function getPremiumCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({
      kind: articles.premiumKind,
      value: sql<number>`count(*)::int`,
    })
    .from(articles)
    .where(eq(articles.isPremium, true))
    .groupBy(articles.premiumKind);
  const out: Record<string, number> = {};
  for (const r of rows) {
    if (r.kind) out[r.kind] = r.value;
  }
  return out;
}

export async function getAuthorCounts(): Promise<Record<string, number>> {
  const rows = await db
    .select({ author: articles.author, value: sql<number>`count(*)::int` })
    .from(articles)
    .groupBy(articles.author);
  const out: Record<string, number> = {};
  for (const row of rows) {
    if (row.author) out[row.author] = row.value;
  }
  return out;
}

export async function insertArticle(
  data: NewArticle,
): Promise<"inserted" | "exists"> {
  const inserted = await db
    .insert(articles)
    .values(data)
    .onConflictDoNothing({ target: articles.guid })
    .returning({ id: articles.id });
  // Slug collisions should also be tolerated.
  if (inserted.length === 0) return "exists";
  return "inserted";
}

export async function addSubscriber(email: string): Promise<"added" | "exists"> {
  const inserted = await db
    .insert(subscribers)
    .values({ email: email.toLowerCase().trim() })
    .onConflictDoNothing({ target: subscribers.email })
    .returning({ id: subscribers.id });
  return inserted.length ? "added" : "exists";
}

export async function listSubscribers(): Promise<number> {
  const rows = await db.select({ value: count() }).from(subscribers);
  return rows[0]?.value ?? 0;
}
