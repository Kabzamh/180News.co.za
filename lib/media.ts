import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articleMedia, articles, type ArticleMedia } from "@/db/schema";
import { ensureSeeded } from "@/lib/seed";

export type MediaKind = "video" | "audio";

export type ParsedMedia = {
  player: "youtube" | "vimeo" | "video" | "audio";
  src: string;
};

const MEDIA_SEED: Array<{
  slug: string;
  kind: MediaKind;
  title: string;
  url: string;
  caption: string;
  mimeType: string;
}> = [
  {
    slug: "gnu-leaders-meet-pretoria-budget-talks",
    kind: "video",
    title: "Newsroom video: Pretoria briefing",
    url: "https://videos.pexels.com/video-files/19070096/19070096-uhd_3840_2160_30fps.mp4",
    caption: "Cameras roll as principals arrive for the GNU budget talks.",
    mimeType: "video/mp4",
  },
  {
    slug: "gnu-leaders-meet-pretoria-budget-talks",
    kind: "audio",
    title: "Audio briefing: budget week",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    caption: "Listen to the 180° political desk on the week’s fiscal talks.",
    mimeType: "audio/mpeg",
  },
  {
    slug: "saps-high-density-operation-hijacking-spike",
    kind: "video",
    title: "Video: corridor operation",
    url: "https://videos.pexels.com/video-files/10464562/10464562-uhd_4096_2160_25fps.mp4",
    caption: "Footage from a high-density policing corridor in Gauteng.",
    mimeType: "video/mp4",
  },
  {
    slug: "bafana-bafana-camp-world-cup-qualifying",
    kind: "video",
    title: "Video: Bafana camp",
    url: "https://videos.pexels.com/video-files/6878734/6878734-uhd_4096_2160_25fps.mp4",
    caption: "The squad assembles in Johannesburg ahead of qualifying.",
    mimeType: "video/mp4",
  },
  {
    slug: "opinion-180-degree-look-local-government",
    kind: "audio",
    title: "Listen: editor’s note",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    caption: "Thandiwe Mokoena reads the local-government column.",
    mimeType: "audio/mpeg",
  },
];

let mediaReady = false;
let mediaPromise: Promise<void> | null = null;

async function seedMedia() {
  await ensureSeeded();
  const existing = await db.select({ id: articleMedia.id }).from(articleMedia).limit(1);
  if (existing.length > 0) {
    mediaReady = true;
    return;
  }

  const articleRows = await db.select({ id: articles.id, slug: articles.slug }).from(articles);
  const bySlug = new Map(articleRows.map((row) => [row.slug, row.id]));
  const rows = MEDIA_SEED.flatMap((item, index) => {
    const articleId = bySlug.get(item.slug);
    if (!articleId) return [];
    return [
      {
        articleId,
        kind: item.kind,
        title: item.title,
        url: item.url,
        caption: item.caption,
        mimeType: item.mimeType,
        sortOrder: index,
      },
    ];
  });
  if (rows.length > 0) {
    await db.insert(articleMedia).values(rows);
  }
  mediaReady = true;
}

export async function ensureArticleMedia() {
  if (mediaReady) return;
  if (!mediaPromise) {
    mediaPromise = seedMedia().catch((error) => {
      mediaPromise = null;
      throw error;
    });
  }
  await mediaPromise;
}

export function parseMediaUrl(url: string, kind: string): ParsedMedia {
  const youtube = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/i);
  if (youtube) {
    return { player: "youtube", src: `https://www.youtube.com/embed/${youtube[1]}` };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) {
    return { player: "vimeo", src: `https://player.vimeo.com/video/${vimeo[1]}` };
  }
  return { player: kind === "audio" ? "audio" : "video", src: url };
}

export async function getMediaForArticles(articleIds: number[]) {
  await ensureArticleMedia();
  if (articleIds.length === 0) return new Map<number, ArticleMedia[]>();
  const rows = await db.select().from(articleMedia);
  const map = new Map<number, ArticleMedia[]>();
  for (const row of rows) {
    if (!articleIds.includes(row.articleId)) continue;
    const list = map.get(row.articleId) ?? [];
    list.push(row);
    map.set(row.articleId, list);
  }
  return map;
}

export async function getArticleMedia(articleId: number) {
  await ensureArticleMedia();
  return db.select().from(articleMedia).where(eq(articleMedia.articleId, articleId));
}

export async function addArticleMedia(input: {
  articleId: number;
  kind: MediaKind;
  title: string;
  url: string;
  caption?: string;
  mimeType?: string;
}) {
  await ensureArticleMedia();
  const [row] = await db
    .insert(articleMedia)
    .values({
      articleId: input.articleId,
      kind: input.kind,
      title: input.title,
      url: input.url,
      caption: input.caption ?? "",
      mimeType: input.mimeType ?? "",
    })
    .returning();
  return row;
}

export async function removeArticleMedia(id: number) {
  await db.delete(articleMedia).where(eq(articleMedia.id, id));
}
