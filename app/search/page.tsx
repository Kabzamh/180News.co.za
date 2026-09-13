import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { SearchBox } from "@/components/SearchBox";
import { searchArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = q ? await searchArticles(q) : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Search</p>
      <h1 className="mt-2 font-serif text-5xl">Search the bulletin</h1>
      <div className="mt-6">
        <SearchBox initialQuery={q} />
      </div>
      <div className="mt-6">
        <AdSlot slot="search-leaderboard" compact />
      </div>
      {q ? (
        <p className="mt-6 text-sm text-slate-600">
          {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
        </p>
      ) : (
        <p className="mt-6 text-sm text-slate-600">
          Search national, provincial and international stories from the Johannesburg newsroom.
        </p>
      )}
      <div className="mt-6">
        {results.map((article) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" />
        ))}
      </div>
    </main>
  );
}
