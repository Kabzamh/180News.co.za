import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { articleMedia, articles, comments } from "@/db/schema";
import { getAdmin, slugify } from "@/lib/admin";

export const dynamic = "force-dynamic";

function parseArticle(form: FormData) {
  const title = String(form.get("title") ?? "").trim();
  const excerpt = String(form.get("excerpt") ?? "").trim();
  const content = String(form.get("content") ?? "").trim();
  const imageUrl = String(form.get("imageUrl") ?? "").trim();
  const imageAlt = String(form.get("imageAlt") ?? "").trim() || title;
  const slugInput = String(form.get("slug") ?? "").trim();
  const provinceRaw = String(form.get("provinceId") ?? "");
  return {
    title,
    slug: slugify(slugInput || title),
    excerpt,
    content,
    imageUrl:
      imageUrl ||
      "https://images.pexels.com/photos/33622126/pexels-photo-33622126.jpeg?auto=compress&cs=tinysrgb&w=1600",
    imageAlt,
    categoryId: Number(form.get("categoryId")),
    authorId: Number(form.get("authorId")),
    provinceId: provinceRaw ? Number(provinceRaw) : null,
    scope: String(form.get("scope") ?? "national"),
    isBreaking: form.get("isBreaking") === "on",
    isFeatured: form.get("isFeatured") === "on",
    readingMinutes: Number(form.get("readingMinutes") || 4),
  };
}

export async function POST(request: Request) {
  if (!(await getAdmin())) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const form = await request.formData();
  const method = String(form.get("_method") || "POST").toUpperCase();
  const origin = new URL(request.url);

  if (method === "DELETE") {
    const id = Number(form.get("id"));
    await db.delete(articleMedia).where(eq(articleMedia.articleId, id));
    await db.delete(comments).where(eq(comments.articleId, id));
    await db.delete(articles).where(eq(articles.id, id));
    return NextResponse.redirect(new URL("/admin/articles", origin));
  }

  const data = parseArticle(form);
  if (data.title.length < 4 || data.content.length < 20) {
    return NextResponse.redirect(new URL("/admin/articles/new?error=1", origin));
  }

  if (method === "PATCH") {
    const id = Number(form.get("id"));
    await db.update(articles).set(data).where(eq(articles.id, id));
    return NextResponse.redirect(new URL("/admin/articles", origin));
  }

  await db.insert(articles).values({ ...data, publishedAt: new Date(), views: 0 });
  return NextResponse.redirect(new URL("/admin/articles", origin));
}
