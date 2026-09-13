import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getAuthorBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getAuthorBySlug(slug);
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-start gap-5 border-b border-slate-200 pb-8">
        <div className="flex h-20 w-20 items-center justify-center bg-[#0b2f8a] font-serif text-2xl text-white">
          {data.author.avatarInitials}
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8f1520]">
            {data.author.title}
          </p>
          <h1 className="mt-1 font-serif text-5xl">{data.author.name}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{data.author.bio}</p>
          <p className="mt-2 text-sm text-[#0b2f8a]">{data.author.email}</p>
        </div>
      </div>
      <div className="mt-8">
        {data.articles.map((article) => (
          <ArticleCard key={article.id} article={article} variant="horizontal" />
        ))}
      </div>
    </main>
  );
}
