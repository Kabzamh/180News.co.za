import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { getArticlesByProvince } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getArticlesByProvince(slug);
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">
        Provincial desk · Capital: {data.province.capital}
      </p>
      <h1 className="mt-2 font-serif text-5xl">{data.province.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-slate-600">{data.province.blurb}</p>
      <div className="mt-6">
        <AdSlot slot="category-leaderboard" compact />
      </div>
      <div className="mt-8">
        {data.articles.length === 0 ? (
          <p>No provincial stories filed yet. Check back in the next bulletin.</p>
        ) : (
          data.articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))
        )}
      </div>
    </main>
  );
}
