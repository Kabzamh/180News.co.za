import { db } from "@/db";
import { authors, categories, provinces } from "@/db/schema";
import { AdminArticleForm } from "@/components/AdminArticleForm";

export const dynamic = "force-dynamic";

export default async function NewArticlePage() {
  const [authorRows, categoryRows, provinceRows] = await Promise.all([
    db.select().from(authors),
    db.select().from(categories),
    db.select().from(provinces),
  ]);
  return (
    <div>
      <h1 className="font-serif text-4xl">File a story</h1>
      <div className="mt-6 border border-white/10 bg-white/5 p-6">
        <AdminArticleForm authors={authorRows} categories={categoryRows} provinces={provinceRows} />
      </div>
    </div>
  );
}
