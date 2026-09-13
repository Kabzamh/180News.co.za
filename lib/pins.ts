import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { articles, pins } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth";
import { withRelations } from "@/lib/queries";

export async function isPinned(subscriberId: number, articleId: number) {
  const [row] = await db
    .select({ id: pins.id })
    .from(pins)
    .where(and(eq(pins.subscriberId, subscriberId), eq(pins.articleId, articleId)))
    .limit(1);
  return Boolean(row);
}

export async function togglePin(articleId: number) {
  const user = await getCurrentUser();
  if (!user?.paid) return { ok: false as const, error: "Paid subscribers only.", pinned: false };
  const already = await isPinned(user.id, articleId);
  if (already) {
    await db.delete(pins).where(and(eq(pins.subscriberId, user.id), eq(pins.articleId, articleId)));
    return { ok: true as const, pinned: false };
  }
  await db.insert(pins).values({ subscriberId: user.id, articleId });
  return { ok: true as const, pinned: true };
}

export async function getPinnedArticles() {
  const user = await getCurrentUser();
  if (!user?.paid) return [];
  const rows = await db.select().from(pins).where(eq(pins.subscriberId, user.id)).orderBy(desc(pins.createdAt));
  if (rows.length === 0) return [];
  const articleRows = await db.select().from(articles);
  const selected = rows
    .map((pin) => articleRows.find((article) => article.id === pin.articleId))
    .filter((row): row is NonNullable<typeof row> => Boolean(row));
  return withRelations(selected);
}
