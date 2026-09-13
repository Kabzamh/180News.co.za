import { getAllArticles } from "@/lib/queries";
import { SITE } from "@/lib/constants";
import { buildRss, rssResponse } from "@/lib/rss";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = (await getAllArticles()).slice(0, 40);
  return rssResponse(
    buildRss({
      title: `${SITE.name} — latest`,
      description: SITE.description,
      path: "/rss.xml",
      items,
    }),
  );
}
