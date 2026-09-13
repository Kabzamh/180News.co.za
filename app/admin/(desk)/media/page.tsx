import Link from "next/link";
import { NewsroomMediaForm } from "@/components/NewsroomMediaForm";
import { getAllArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const articles = await getAllArticles();
  return (
    <div>
      <h1 className="font-serif text-4xl">Newsroom media</h1>
      <p className="mt-2 text-sm text-white/60">
        Attach MP4, MP3 or YouTube files to stories. Playback stays behind a paid subscription.
      </p>
      <div className="mt-8 bg-[#f4f0e8] p-6 text-slate-900">
        <NewsroomMediaForm articles={articles.map((article) => ({ id: article.id, title: article.title }))} />
      </div>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">Stories with files</h2>
        <div className="mt-4 divide-y divide-white/10 border border-white/10">
          {articles
            .filter((article) => article.media.length > 0)
            .map((article) => (
              <div key={article.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                <div>
                  <Link href={`/admin/articles/${article.id}`} className="font-semibold hover:text-[#f0c7cb]">
                    {article.title}
                  </Link>
                  <p className="text-xs uppercase tracking-[0.12em] text-white/50">
                    {article.media.map((item) => item.kind).join(" · ")}
                  </p>
                </div>
                <Link href={`/article/${article.slug}`} className="text-xs uppercase tracking-[0.12em] text-white/50">
                  Public page
                </Link>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
