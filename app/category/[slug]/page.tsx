import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByCategory } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getArticlesByCategory(slug);
  if (!data) notFound();

  const [lead, ...rest] = data.articles;

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Section</p>
      <h1 className="mt-2 font-serif text-5xl">{data.category.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">{data.category.description}</p>
      <div className="mt-6">
        <AdSlot slot="category-leaderboard" compact />
      </div>

      {lead ? (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <ArticleCard article={lead} />
          <div>
            {rest.slice(0, 4).map((article) => (
              <ArticleCard key={article.id} article={article} variant="text" />
            ))}
          </div>
        </div>
      ) : (
        <p className="mt-10 text-slate-600">No stories in this section yet.</p>
      )}

      <div className="mt-10">
        {rest.slice(4).map((article) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" />
        ))}
      </div>
    </main>
  );
}
