import type { Article } from "@/db/schema";
import { ArticleCard, ArticleRow, SectionHeading } from "@/components/cards";

export default function SectionBlock({
  title,
  href,
  accent,
  articles,
  subtitle,
}: {
  title: string;
  href: string;
  accent: string;
  articles: Article[];
  subtitle?: string;
}) {
  if (!articles.length) return null;
  const [lead, ...rest] = articles;
  return (
    <section>
      <SectionHeading title={title} href={href} accent={accent} subtitle={subtitle} />
      <div className="grid gap-5 sm:grid-cols-2">
        <ArticleCard article={lead} />
        <div className="divide-y divide-slate-100">
          {rest.slice(0, 4).map((a, i) => (
            <ArticleRow key={a.id} article={a} showImage={false} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
