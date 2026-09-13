import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles, authors, categories, provinces } from "@/db/schema";
import { AdminArticleForm } from "@/components/AdminArticleForm";

export const dynamic = "force-dynamic";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  const [article] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!article) notFound();
  const [authorRows, categoryRows, provinceRows] = await Promise.all([
    db.select().from(authors),
    db.select().from(categories),
    db.select().from(provinces),
  ]);
  return (
    <div>
      <h1 className="font-serif text-4xl">Edit story</h1>
      <p className="mt-2 text-sm text-white/50">
        <a href={`/article/${article.slug}`} className="text-[#f0c7cb]">
          View public page
        </a>
      </p>
      <div className="mt-6 border border-white/10 bg-white/5 p-6">
        <AdminArticleForm
          article={article}
          authors={authorRows}
          categories={categoryRows}
          provinces={provinceRows}
        />
      </div>
    </div>
  );
}
