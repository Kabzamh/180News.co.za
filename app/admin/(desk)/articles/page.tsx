import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { formatDateTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const rows = await db.select().from(articles).orderBy(desc(articles.publishedAt));
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl">Articles</h1>
        <Link href="/admin/articles/new" className="bg-[#8f1520] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]">
          New story
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto border border-white/10">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.12em] text-white/50">
            <tr>
              <th className="px-3 py-2">Headline</th>
              <th className="px-3 py-2">Flags</th>
              <th className="px-3 py-2">Views</th>
              <th className="px-3 py-2">Filed</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((article) => (
              <tr key={article.id} className="border-t border-white/10">
                <td className="px-3 py-3">
                  <Link href={`/admin/articles/${article.id}`} className="font-semibold hover:text-[#f0c7cb]">
                    {article.title}
                  </Link>
                </td>
                <td className="px-3 py-3 text-xs uppercase text-white/50">
                  {article.isBreaking ? "Breaking " : ""}
                  {article.isFeatured ? "Featured" : ""}
                </td>
                <td className="px-3 py-3">{article.views.toLocaleString("en-ZA")}</td>
                <td className="px-3 py-3 text-white/60">{formatDateTime(article.publishedAt)}</td>
                <td className="px-3 py-3">
                  <form action="/api/admin/articles" method="post">
                    <input type="hidden" name="_method" value="DELETE" />
                    <input type="hidden" name="id" value={article.id} />
                    <button type="submit" className="text-xs uppercase tracking-[0.12em] text-red-300">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
