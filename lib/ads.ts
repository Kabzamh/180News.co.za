import { and, asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { ads, type Ad, type AdPlacement } from "@/db/schema";

export const PLACEMENTS: {
  id: AdPlacement;
  name: string;
  width: number;
  height: number;
  description: string;
}[] = [
  {
    id: "header-leaderboard",
    name: "Header leaderboard",
    width: 728,
    height: 90,
    description: "Top of every page (320×50 on mobile).",
  },
  {
    id: "in-article",
    name: "In-article banner",
    width: 728,
    height: 90,
    description: "Inside long reads after the opening paragraphs.",
  },
  {
    id: "sidebar-rectangle",
    name: "Sidebar rectangle",
    width: 300,
    height: 250,
    description: "Right rail, mixed between widgets.",
  },
  {
    id: "sidebar-skyscraper",
    name: "Sidebar skyscraper",
    width: 300,
    height: 600,
    description: "Tall right-rail banner.",
  },
  {
    id: "footer-banner",
    name: "Footer banner",
    width: 728,
    height: 90,
    description: "Above the site footer.",
  },
  {
    id: "mobile-sticky",
    name: "Mobile sticky",
    width: 320,
    height: 50,
    description: "Fixed to the bottom on phones.",
  },
  {
    id: "section-rail",
    name: "Section rail",
    width: 300,
    height: 250,
    description: "At the end of section/province grids.",
  },
];

export function placementMeta(id: AdPlacement) {
  return PLACEMENTS.find((p) => p.id === id);
}

function isLiveNow(a: Ad): boolean {
  const now = Date.now();
  if (!a.active) return false;
  if (a.startsAt && new Date(a.startsAt).getTime() > now) return false;
  if (a.endsAt && new Date(a.endsAt).getTime() < now) return false;
  return true;
}

/**
 * Weighted-random pick of one live banner for the placement (deterministic per
 * request seed so SSR and hydration agree). Returns null when there are none.
 */
export async function getAdForPlacement(
  placement: AdPlacement,
  seed = Math.random(),
): Promise<Ad | null> {
  const rows = await db
    .select()
    .from(ads)
    .where(
      and(
        eq(ads.placement, placement),
        eq(ads.active, true),
        sql`(${ads.startsAt} IS NULL OR ${ads.startsAt} <= now())`,
        sql`(${ads.endsAt} IS NULL OR ${ads.endsAt} >= now())`,
      ),
    );

  const live = rows.filter(isLiveNow);
  if (live.length === 0) return null;

  const totalWeight = live.reduce((acc, a) => acc + Math.max(0, a.weight), 0);
  if (totalWeight <= 0) return null;
  let r = seed * totalWeight;
  for (const ad of live) {
    r -= Math.max(0, ad.weight);
    if (r <= 0) return ad;
  }
  return live[live.length - 1];
}

export async function getAllAds(): Promise<Ad[]> {
  return db.select().from(ads).orderBy(desc(ads.createdAt));
}

export async function getActiveAdsByPlacement(): Promise<
  Record<string, Ad[]>
> {
  const rows = await getAllAds();
  return rows.reduce<Record<string, Ad[]>>((acc, a) => {
    (acc[a.placement] ??= []).push(a);
    return acc;
  }, {});
}

export async function recordImpression(id: number): Promise<void> {
  await db
    .update(ads)
    .set({ impressions: sql`${ads.impressions} + 1` })
    .where(eq(ads.id, id));
}

export async function recordClick(id: number): Promise<void> {
  await db
    .update(ads)
    .set({ clicks: sql`${ads.clicks} + 1` })
    .where(eq(ads.id, id));
}

export async function listAdminAds(): Promise<Ad[]> {
  return db.select().from(ads).orderBy(asc(ads.placement));
}
