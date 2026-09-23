import RssParser from "rss-parser";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { rssSources } from "@/db/schema";
import {
  CATEGORY_KEYWORDS,
  CATEGORY_MAP,
  PROVINCE_KEYWORDS,
  RSS_SOURCES,
  type RssSourceDef,
} from "@/lib/constants";
import { excerpt, shortHash, slugify, stripHtml } from "@/lib/utils";
import { insertArticle } from "@/lib/queries";

type FeedItem = RssParser.Item & Record<string, unknown>;

const parser = new RssParser({
  timeout: 15000,
  headers: {
    "User-Agent":
      "180DegreesNews/1.0 (+https://180degreesnews.example; RSS aggregator)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

/** Make sure every curated feed exists in the database. */
export async function ensureSources(): Promise<void> {
  for (const def of RSS_SOURCES) {
    await db
      .insert(rssSources)
      .values({
        name: def.name,
        url: def.url,
        category: def.category,
        province: def.province ?? null,
        enabled: true,
      })
      .onConflictDoNothing({ target: rssSources.url });
  }
}

function extractImage(item: FeedItem): string | null {
  // 1. media:content / media:thumbnail (News24, WordPress, many others)
  const mediaContent = item["media:content"] as
    | { $?: { url?: string }; url?: string }
    | { $?: { url?: string }; url?: string }[]
    | undefined;
  if (mediaContent) {
    const arr = Array.isArray(mediaContent) ? mediaContent : [mediaContent];
    for (const m of arr) {
      const url = m?.$?.url ?? m?.url;
      if (url) return url;
    }
  }
  const mediaThumb = item["media:thumbnail"] as
    | { $?: { url?: string }; url?: string }
    | undefined;
  if (mediaThumb?.$?.url) return mediaThumb.$.url;
  if (mediaThumb?.url) return mediaThumb.url;

  // 2. enclosure with image mime
  const enc = item.enclosure as { url?: string; type?: string } | undefined;
  if (enc?.url && (enc.type?.startsWith("image") || /\.(jpe?g|png|webp)(\?|$)/i.test(enc.url))) {
    return enc.url;
  }

  // 3. itunes:image / og:image style fields
  const itunes = (item["itunes:image"] as { $?: { href?: string }; href?: string } | undefined);
  if (itunes?.$?.href) return itunes.$.href;
  if (itunes?.href) return itunes.href;

  // 4. first <img> inside content:encoded / content / description
  const raw =
    (item["content:encoded"] as string | undefined) ||
    (item.content as string | undefined) ||
    (item.description as string | undefined) ||
    "";
  const img = raw.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (img?.[1]) return img[1];

  return null;
}

export function classifyCategory(text: string, fallback: string): string {
  const hay = ` ${text.toLowerCase()} `;
  let best: { slug: string; score: number } | null = null;
  for (const { slug, words } of CATEGORY_KEYWORDS) {
    let score = 0;
    for (const w of words) if (hay.includes(w)) score += w.length > 4 ? 2 : 1;
    if (score > 0 && (!best || score > best.score)) best = { slug, score };
  }
  // Only override the source default on a reasonably strong signal.
  if (best && best.score >= 2) return best.slug;
  return CATEGORY_MAP[fallback] ? fallback : "national";
}

export function classifyProvince(
  text: string,
): { province: string; region: string } | null {
  const hay = text.toLowerCase();
  for (const entry of PROVINCE_KEYWORDS) {
    for (const w of entry.words) {
      if (hay.includes(w)) {
        return { province: entry.slug, region: entry.region ?? "" };
      }
    }
  }
  return null;
}

const BREAKING_RE = /\b(breaking|just in|watch live|developing|alert)\b/i;

function toArticleInput(item: FeedItem, def: RssSourceDef) {
  const link =
    (item.link as string | undefined) ||
    (item.guid as string | undefined) ||
    "";
  const guid = (item.guid as string) || link;
  const title = stripHtml(item.title).replace(/\s+/g, " ").trim();
  if (!title || !link || !guid) return null;

  const rawBody =
    (item["content:encoded"] as string | undefined) ||
    (item.content as string | undefined) ||
    (item.description as string | undefined) ||
    (item.contentSnippet as string | undefined) ||
    "";
  const body = stripHtml(rawBody)
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .slice(0, 8000);
  const summary =
    excerpt(item.contentSnippet || body || item.title || "", 220) || title;

  const combined = `${title} ${summary} ${body.slice(0, 400)}`;
  const category = classifyCategory(combined, def.category);
  const geo = classifyProvince(combined);
  const imageUrl = extractImage(item);
  const pubDate = item.isoDate
    ? new Date(item.isoDate)
    : item.pubDate
      ? new Date(item.pubDate)
      : new Date();
  const author = stripHtml(
    (item.creator as string | undefined) ||
      (item.author as string | undefined) ||
      "",
  ).slice(0, 120);

  const slug = `${slugify(title)}-${shortHash(guid)}`;

  return {
    guid,
    title,
    slug,
    summary,
    content: body || summary,
    imageUrl,
    source: def.name,
    sourceUrl: link,
    author: author || null,
    category,
    province: geo?.province ?? def.province ?? null,
    region: geo?.region ?? null,
    tags: [category],
    isBreaking: BREAKING_RE.test(title) && Date.now() - pubDate.getTime() < 2 * 864e5,
    featured: false,
    publishedAt: pubDate,
  };
}

export type SyncResult = {
  sources: { name: string; status: string; added: number }[];
  added: number;
  skipped: number;
  failed: number;
};

export async function syncAllFeeds(): Promise<SyncResult> {
  await ensureSources();
  const sources = await db
    .select()
    .from(rssSources)
    .where(eq(rssSources.enabled, true));

  const result: SyncResult = { sources: [], added: 0, skipped: 0, failed: 0 };

  for (const source of sources) {
    const def: RssSourceDef = {
      name: source.name,
      url: source.url,
      category: source.category,
      province: source.province ?? undefined,
    };
    let added = 0;
    let status = "ok";
    try {
      const feed = await parser.parseURL(source.url);
      const items = (feed.items as FeedItem[]).slice(0, 40);
      for (const item of items) {
        const input = toArticleInput(item, def);
        if (!input) {
          result.skipped++;
          continue;
        }
        const outcome = await insertArticle(input);
        if (outcome === "inserted") added++;
        else result.skipped++;
      }
      await db
        .update(rssSources)
        .set({
          lastFetchedAt: new Date(),
          lastStatus: `OK (${items.length} items)`,
          itemCount: items.length,
        })
        .where(eq(rssSources.id, source.id));
      result.added += added;
    } catch (err) {
      status = "error";
      result.failed++;
      const message = err instanceof Error ? err.message : "Unknown error";
      await db
        .update(rssSources)
        .set({
          lastFetchedAt: new Date(),
          lastStatus: `ERROR: ${message}`.slice(0, 180),
        })
        .where(eq(rssSources.id, source.id));
    }
    result.sources.push({ name: source.name, status, added });
  }

  return result;
}
