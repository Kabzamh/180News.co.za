import { and, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import {
  articles,
  authors,
  categories,
  comments,
  provinces,
  type Article,
  type ArticleMedia,
  type Author,
  type Category,
  type Comment,
  type Province,
} from "@/db/schema";
import { getMediaForArticles } from "@/lib/media";
import { ensureSeeded } from "@/lib/seed";

export type ArticleCardData = Article & {
  author: Author;
  category: Category;
  province: Province | null;
  media: ArticleMedia[];
};

export type ArticleDetail = ArticleCardData & {
  comments: Comment[];
};

export async function withRelations(rows: Article[]): Promise<ArticleCardData[]> {
  if (rows.length === 0) return [];

  const provinceIds = [
    ...new Set(rows.map((row) => row.provinceId).filter((id): id is number => id !== null)),
  ];

  const [authorRows, categoryRows, provinceRows, mediaMap] = await Promise.all([
    db.select().from(authors),
    db.select().from(categories),
    provinceIds.length
      ? db.select().from(provinces)
      : Promise.resolve([] as Province[]),
    getMediaForArticles(rows.map((row) => row.id)),
  ]);

  const authorMap = new Map(authorRows.map((row) => [row.id, row]));
  const categoryMap = new Map(categoryRows.map((row) => [row.id, row]));
  const provinceMap = new Map(provinceRows.map((row) => [row.id, row]));

  return rows.map((row) => {
    const author = authorMap.get(row.authorId);
    const category = categoryMap.get(row.categoryId);
    if (!author || !category) {
      throw new Error(`Missing relation for article ${row.slug}`);
    }
    return {
      ...row,
      author,
      category,
      province: row.provinceId ? provinceMap.get(row.provinceId) ?? null : null,
      media: mediaMap.get(row.id) ?? [],
    };
  });
}

export async function getNavigationData() {
  await ensureSeeded();
  const [categoryRows, provinceRows] = await Promise.all([
    db.select().from(categories),
    db.select().from(provinces),
  ]);
  return { categories: categoryRows, provinces: provinceRows };
}

export async function getHomeData() {
  await ensureSeeded();

  const [featuredRows, breakingRows, latestRows, allRows] = await Promise.all([
    db.select().from(articles).where(eq(articles.isFeatured, true)).orderBy(desc(articles.publishedAt)).limit(2),
    db.select().from(articles).where(eq(articles.isBreaking, true)).orderBy(desc(articles.publishedAt)).limit(6),
    db.select().from(articles).orderBy(desc(articles.publishedAt)).limit(8),
    db.select().from(articles).orderBy(desc(articles.publishedAt)),
  ]);

  const [featured, breaking, latest, all] = await Promise.all([
    withRelations(featuredRows),
    withRelations(breakingRows),
    withRelations(latestRows),
    withRelations(allRows),
  ]);

  const byScope = (scope: string) => all.filter((article) => article.scope === scope).slice(0, 4);
  const byCategory = (slug: string) =>
    all.filter((article) => article.category.slug === slug).slice(0, 3);

  return {
    featured: featured[0] ?? latest[0],
    secondaryFeatured: featured[1] ?? latest[1],
    breaking,
    latest,
    national: byScope("national"),
    provincial: byScope("provincial"),
    international: byScope("international"),
    politics: byCategory("politics"),
    business: byCategory("business"),
    sport: byCategory("sport"),
    opinion: byCategory("opinion"),
    mostRead: [...all].sort((a, b) => b.views - a.views).slice(0, 6),
  };
}

export async function getArticlesByCategory(slug: string) {
  await ensureSeeded();
  const [category] = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  if (!category) return null;

  const rows =
    category.scope === "national" ||
    category.scope === "provincial" ||
    category.scope === "international"
      ? await db
          .select()
          .from(articles)
          .where(or(eq(articles.scope, category.scope), eq(articles.categoryId, category.id)))
          .orderBy(desc(articles.publishedAt))
      : await db
          .select()
          .from(articles)
          .where(eq(articles.categoryId, category.id))
          .orderBy(desc(articles.publishedAt));

  return {
    category,
    articles: await withRelations(rows),
  };
}

export async function getArticlesByProvince(slug: string) {
  await ensureSeeded();
  const [province] = await db.select().from(provinces).where(eq(provinces.slug, slug)).limit(1);
  if (!province) return null;

  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.provinceId, province.id))
    .orderBy(desc(articles.publishedAt));

  return {
    province,
    articles: await withRelations(rows),
  };
}

export async function getArticleBySlug(slug: string, options?: { incrementViews?: boolean }) {
  await ensureSeeded();
  const [row] = await db.select().from(articles).where(eq(articles.slug, slug)).limit(1);
  if (!row) return null;

  const incrementViews = options?.incrementViews ?? false;
  if (incrementViews) {
    await db
      .update(articles)
      .set({ views: sql`${articles.views} + 1` })
      .where(eq(articles.id, row.id));
  }

  const views = incrementViews ? row.views + 1 : row.views;
  const [enriched] = await withRelations([{ ...row, views }]);
  const commentRows = await db
    .select()
    .from(comments)
    .where(eq(comments.articleId, row.id))
    .orderBy(desc(comments.createdAt));

  const relatedRows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.categoryId, row.categoryId), sql`${articles.id} <> ${row.id}`))
    .orderBy(desc(articles.publishedAt))
    .limit(3);

  return {
    article: { ...enriched, comments: commentRows } satisfies ArticleDetail,
    related: await withRelations(relatedRows),
  };
}

export async function getAuthors() {
  await ensureSeeded();
  return db.select().from(authors);
}

export async function getAuthorBySlug(slug: string) {
  await ensureSeeded();
  const [author] = await db.select().from(authors).where(eq(authors.slug, slug)).limit(1);
  if (!author) return null;
  const rows = await db
    .select()
    .from(articles)
    .where(eq(articles.authorId, author.id))
    .orderBy(desc(articles.publishedAt));
  return {
    author,
    articles: await withRelations(rows),
  };
}

export async function searchArticles(query: string) {
  await ensureSeeded();
  const term = query.trim();
  if (!term) return [];
  const pattern = `%${term}%`;
  const rows = await db
    .select()
    .from(articles)
    .where(
      or(
        ilike(articles.title, pattern),
        ilike(articles.excerpt, pattern),
        ilike(articles.content, pattern),
      ),
    )
    .orderBy(desc(articles.publishedAt));
  return withRelations(rows);
}

export async function getBulletinData() {
  await ensureSeeded();
  const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt)).limit(16);
  const breakingRows = await db
    .select()
    .from(articles)
    .where(eq(articles.isBreaking, true))
    .orderBy(desc(articles.publishedAt));
  return {
    latest: await withRelations(rows),
    breaking: await withRelations(breakingRows),
  };
}

export async function getAllArticles() {
  await ensureSeeded();
  const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt));
  return withRelations(rows);
}

export async function getBreakingHeadlines() {
  await ensureSeeded();
  return db
    .select({
      title: articles.title,
      slug: articles.slug,
    })
    .from(articles)
    .where(eq(articles.isBreaking, true))
    .orderBy(desc(articles.publishedAt))
    .limit(8);
}
