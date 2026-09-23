import RssParser from "rss-parser";
import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { mediaItems, type MediaItem } from "@/db/schema";
import {
  PODCASTS,
  YOUTUBE_CHANNELS,
  parseDurationToSeconds,
  youtubeThumb,
  type PodcastShow,
  type YoutubeChannel,
} from "@/lib/media-sources";
import { excerpt } from "@/lib/utils";

/* ------------------------------- YouTube RSS ------------------------------- */

type YtEntry = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  views: number | null;
  url: string;
};

function parseYoutubeFeed(xml: string): YtEntry[] {
  const entries = xml.split("<entry>").slice(1);
  const out: YtEntry[] = [];
  for (const raw of entries) {
    const entry = raw.split("</entry>")[0] ?? raw;
    const id = entry.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/)?.[1];
    const title = entry
      .match(/<media:title[^>]*>([\s\S]*?)<\/media:title>/)?.[1]
      ?.replace(/<!\[CDATA\[|\]\]>/g, "")
      .trim();
    const published =
      entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? new Date().toISOString();
    const thumbnail =
      entry.match(/<media:thumbnail[^>]+url="([^"]+)"/)?.[1] ??
      (id ? youtubeThumb(id) : "");
    const description =
      entry
        .match(/<media:description[^>]*>([\s\S]*?)<\/media:description>/)?.[1]
        ?.replace(/<!\[CDATA\[|\]\]>/g, "")
        .trim() ?? "";
    const viewsTxt = entry.match(/<media:statistics[^>]+views="(\d+)"/)?.[1];
    const url =
      entry.match(/<link[^>]+rel="alternate"[^>]+href="([^"]+)"/)?.[1] ??
      (id ? `https://www.youtube.com/watch?v=${id}` : "");
    if (id && title) {
      out.push({
        id,
        title,
        published,
        thumbnail,
        description,
        views: viewsTxt ? Number(viewsTxt) : null,
        url,
      });
    }
  }
  return out;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
    next: { revalidate: 1800 },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

async function syncChannel(channel: YoutubeChannel): Promise<number> {
  const xml = await fetchText(
    `https://www.youtube.com/feeds/videos.xml?channel_id=${channel.id}`,
  );
  const entries = parseYoutubeFeed(xml).slice(0, 15);
  let n = 0;
  for (const e of entries) {
    await db
      .insert(mediaItems)
      .values({
        guid: `yt:${e.id}`,
        kind: "video",
        title: e.title,
        summary: excerpt(e.description, 220),
        youtubeId: e.id,
        audioUrl: null,
        durationSec: null,
        thumbnail: e.thumbnail,
        source: channel.name,
        sourceUrl: e.url,
        category: channel.category,
        views: e.views ?? 0,
        featured: false,
        publishedAt: new Date(e.published),
      })
      .onConflictDoUpdate({
        target: mediaItems.guid,
        set: {
          title: e.title,
          summary: excerpt(e.description, 220),
          thumbnail: e.thumbnail,
          views: e.views ?? 0,
        },
      });
    n++;
  }
  return n;
}

/* -------------------------------- Podcasts --------------------------------- */

const podcastParser = new RssParser({
  timeout: 15000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    Accept: "application/rss+xml, application/xml, */*",
  },
});

function itunesImage(item: RssParser.Item & Record<string, unknown>): string | null {
  const it = item.itunes as
    | { image?: string | { $?: { href?: string }; href?: string } }
    | undefined;
  if (!it?.image) return null;
  if (typeof it.image === "string") return it.image;
  return it.image.$?.href ?? it.image.href ?? null;
}

async function syncPodcast(show: PodcastShow): Promise<number> {
  const feed = await podcastParser.parseURL(show.url);
  const items = feed.items.slice(0, 6);
  let n = 0;
  for (const item of items) {
    const audioUrl =
      item.enclosure?.url ??
      ((item as unknown as { link?: string }).link?.match(/\.(mp3|m4a|ogg)(\?|$)/i)
        ? (item as unknown as { link: string }).link
        : null);
    if (!audioUrl) continue;
    const durationRaw = (
      item as RssParser.Item & Record<string, unknown>
    ).itunes as { duration?: string | number } | undefined;
    const duration =
      typeof durationRaw?.duration === "number"
        ? durationRaw.duration
        : parseDurationToSeconds(String(durationRaw?.duration ?? ""));
    const guid = `audio:${item.guid ?? audioUrl}`;
    const title = item.title?.replace(/\s+/g, " ").trim() ?? "Episode";
    const summary = excerpt(
      item.contentSnippet ?? item.content ?? item.summary ?? "",
      240,
    );
    const image = itunesImage(item) ?? feed.image?.url ?? null;
    await db
      .insert(mediaItems)
      .values({
        guid,
        kind: "audio",
        title,
        summary: summary || title,
        youtubeId: null,
        audioUrl,
        durationSec: duration,
        thumbnail: image,
        source: show.name,
        sourceUrl: item.link ?? show.url,
        category: show.category,
        views: 0,
        featured: false,
        publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
      })
      .onConflictDoUpdate({
        target: mediaItems.guid,
        set: { title, summary: summary || title, durationSec: duration },
      });
    n++;
  }
  return n;
}

/* --------------------------------- Runner ---------------------------------- */

export type MediaSyncResult = {
  videos: number;
  audio: number;
  errors: string[];
  sources: { name: string; kind: "video" | "audio"; count: number }[];
};

export async function syncMedia(): Promise<MediaSyncResult> {
  const result: MediaSyncResult = { videos: 0, audio: 0, errors: [], sources: [] };

  await Promise.all(
    YOUTUBE_CHANNELS.map(async (channel) => {
      try {
        const count = await syncChannel(channel);
        result.videos += count;
        result.sources.push({ name: channel.name, kind: "video", count });
      } catch (err) {
        result.errors.push(`${channel.name}: ${(err as Error).message}`);
      }
    }),
  );

  for (const show of PODCASTS) {
    try {
      const count = await syncPodcast(show);
      result.audio += count;
      result.sources.push({ name: show.name, kind: "audio", count });
    } catch (err) {
      result.errors.push(`${show.name}: ${(err as Error).message}`);
    }
  }

  return result;
}

/* --------------------------------- Queries --------------------------------- */

export async function getLatestMedia(
  kind: "video" | "audio",
  limit = 24,
  category?: string,
): Promise<MediaItem[]> {
  const conditions = [eq(mediaItems.kind, kind)];
  if (category) conditions.push(eq(mediaItems.category, category));
  return db
    .select()
    .from(mediaItems)
    .where(and(...conditions))
    .orderBy(desc(mediaItems.publishedAt))
    .limit(limit);
}

export async function getMediaBySource(
  kind: "video" | "audio",
  limit = 50,
): Promise<MediaItem[]> {
  return db
    .select()
    .from(mediaItems)
    .where(eq(mediaItems.kind, kind))
    .orderBy(desc(mediaItems.publishedAt))
    .limit(limit);
}

export async function countMedia(): Promise<{ videos: number; audio: number }> {
  const [v, a] = await Promise.all([
    db
      .select({ value: sql<number>`count(*)::int` })
      .from(mediaItems)
      .where(eq(mediaItems.kind, "video")),
    db
      .select({ value: sql<number>`count(*)::int` })
      .from(mediaItems)
      .where(eq(mediaItems.kind, "audio")),
  ]);
  return { videos: v[0]?.value ?? 0, audio: a[0]?.value ?? 0 };
}
