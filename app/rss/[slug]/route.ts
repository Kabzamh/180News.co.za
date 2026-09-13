import { notFound } from "next/navigation";
import { SITE } from "@/lib/constants";
import { getArticlesByCategory } from "@/lib/queries";
import { buildRss, rssResponse } from "@/lib/rss";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const data = await getArticlesByCategory(slug);
  if (!data) notFound();
  return rssResponse(
    buildRss({
      title: `${SITE.name} — ${data.category.name}`,
      description: data.category.description,
      path: `/rss/${slug}`,
      items: data.articles.slice(0, 40),
    }),
  );
}
