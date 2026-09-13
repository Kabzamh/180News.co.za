import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { getCurrentUser } from "@/lib/auth";
import { getPinnedArticles } from "@/lib/pins";

export const metadata: Metadata = {
  title: "Pinned stories",
  description: "Stories you pinned on 180 Degrees News.",
};

export const dynamic = "force-dynamic";

export default async function PinsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/signin");
  if (!user.paid) redirect("/subscribe");
  const articles = await getPinnedArticles();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Subscriber tools</p>
      <h1 className="mt-2 font-serif text-5xl">Pinned stories</h1>
      <p className="mt-3 text-slate-600">Your saved briefing. Unpin from the story page.</p>
      <div className="mt-8">
        {articles.length === 0 ? (
          <p>
            Nothing pinned yet. Open a full story and tap <strong>Pin story</strong>.
          </p>
        ) : (
          articles.map((article) => <ArticleCard key={article.id} article={article} variant="horizontal" />)
        )}
      </div>
      <p className="mt-8 text-sm">
        <Link href="/" className="font-semibold text-[#0b2f8a]">
          Back to the bulletin →
        </Link>
      </p>
    </main>
  );
}
