import { eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { advertisements, type Advertisement } from "@/db/schema";

const AD_SEED = [
  {
    slug: "sandton-gate-leaderboard",
    advertiser: "Sandton Gate",
    headline: "Offices that face both ways",
    tagline: "Premium suites on Alice Lane, a short walk from the 180° newsroom.",
    cta: "Book a viewing",
    href: "/advertise",
    slot: "top-leaderboard",
    format: "leaderboard",
    theme: "navy",
    cpmCents: 12500,
  },
  {
    slug: "gautrain-mid",
    advertiser: "Gautrain",
    headline: "Sandton to Pretoria before the first briefing",
    tagline: "Peak trains are filling. Plan the working day on the rail spine.",
    cta: "Check times",
    href: "/article/gautrain-ridership-sandton-rosebank",
    slot: "mid-leaderboard",
    format: "leaderboard",
    theme: "gold",
    cpmCents: 11000,
  },
  {
    slug: "bulletin-house-home",
    advertiser: "180° Bulletin",
    headline: "The newsroom in your inbox",
    tagline: "National, provincial and international headlines, compiled in Johannesburg.",
    cta: "Subscribe free",
    href: "/#bulletin",
    slot: "home-sidebar",
    format: "rectangle",
    theme: "red",
    cpmCents: 7800,
  },
  {
    slug: "kruger-article-sidebar",
    advertiser: "Mpumalanga Tourism",
    headline: "Kruger this weekend",
    tagline: "Camps are filling. A 180° turn from the M1 to the bushveld.",
    cta: "See the story",
    href: "/article/kruger-tourism-rebound-mpumalanga",
    slot: "article-sidebar",
    format: "rectangle",
    theme: "green",
    cpmCents: 8200,
  },
  {
    slug: "solar-article-inline",
    advertiser: "Northern Cape Solar",
    headline: "Power the corridor",
    tagline: "Independent producers are reaching financial close in the Northern Cape.",
    cta: "Read the file",
    href: "/article/northern-cape-solar-corridor-producers",
    slot: "article-inline",
    format: "billboard",
    theme: "sand",
    cpmCents: 14000,
  },
  {
    slug: "advertise-footer",
    advertiser: "180 Degrees News",
    headline: "Put your brand on the bulletin",
    tagline: "Leaderboards, sidebars and election-night takeovers. Johannesburg rates, national reach.",
    cta: "Advertise with us",
    href: "/advertise",
    slot: "footer-billboard",
    format: "billboard",
    theme: "navy",
    cpmCents: 9800,
  },
  {
    slug: "weather-umbrella",
    advertiser: "SA Weather Desk",
    headline: "Don't get caught on the Highveld",
    tagline: "City forecasts for 34 centres, updated through the day.",
    cta: "Open weather",
    href: "/weather",
    slot: "weather-leaderboard",
    format: "leaderboard",
    theme: "blue",
    cpmCents: 7200,
  },
  {
    slug: "elections-roc",
    advertiser: "Results Operations",
    headline: "Sponsored: stay on the IEC desk",
    tagline: "Live by-election figures, certified 2024 results and the running wire.",
    cta: "Watch live",
    href: "/elections",
    slot: "elections-sidebar",
    format: "rectangle",
    theme: "red",
    cpmCents: 9500,
  },
  {
    slug: "category-leaderboard",
    advertiser: "JSE Markets Brief",
    headline: "The rand, explained before open",
    tagline: "A daily markets note for readers who start in Sandton.",
    cta: "Business desk",
    href: "/category/business",
    slot: "category-leaderboard",
    format: "leaderboard",
    theme: "gold",
    cpmCents: 10500,
  },
  {
    slug: "sticky-house",
    advertiser: "180 Degrees News",
    headline: "Advertise on 180news.co.za",
    tagline: "Reach readers in every province.",
    cta: "Get rates",
    href: "/advertise",
    slot: "sticky-mobile",
    format: "leaderboard",
    theme: "navy",
    cpmCents: 15000,
  },
  {
    slug: "search-promo",
    advertiser: "180° Archive",
    headline: "Find every angle",
    tagline: "Search national, provincial and international copy from the Joburg desk.",
    cta: "Search the bulletin",
    href: "/search",
    slot: "search-leaderboard",
    format: "leaderboard",
    theme: "blue",
    cpmCents: 6800,
  },
  {
    slug: "home-native",
    advertiser: "City of Johannesburg",
    headline: "Report a pothole. Track the 90-day blitz.",
    tagline: "A public-service notice from the metro our newsroom covers every day.",
    cta: "Read the plan",
    href: "/article/city-of-johannesburg-water-pothole-plan",
    slot: "home-native",
    format: "native",
    theme: "sand",
    cpmCents: 6400,
  },
];

let adsReady = false;
let adsPromise: Promise<void> | null = null;

async function seedAds() {
  const existing = await db
    .select({ id: advertisements.id, slug: advertisements.slug, cpmCents: advertisements.cpmCents })
    .from(advertisements);
  if (existing.length === 0) {
    await db.insert(advertisements).values(AD_SEED);
    adsReady = true;
    return;
  }
  for (const seed of AD_SEED) {
    const row = existing.find((item) => item.slug === seed.slug);
    if (row && row.cpmCents === 8500 && seed.cpmCents !== 8500) {
      await db.update(advertisements).set({ cpmCents: seed.cpmCents }).where(eq(advertisements.slug, seed.slug));
    }
  }
  adsReady = true;
}

export async function ensureAds() {
  if (adsReady) return;
  if (!adsPromise) {
    adsPromise = seedAds().catch((error) => {
      adsPromise = null;
      throw error;
    });
  }
  await adsPromise;
}

export async function getAdForSlot(slot: string) {
  await ensureAds();
  const rows = await db
    .select()
    .from(advertisements)
    .where(eq(advertisements.slot, slot));
  const active = rows.filter((row) => row.active);
  if (active.length === 0) return null;
  const ad = active.reduce((lowest, row) => (row.impressions <= lowest.impressions ? row : lowest));
  await db
    .update(advertisements)
    .set({ impressions: sql`${advertisements.impressions} + 1` })
    .where(eq(advertisements.id, ad.id));
  return { ...ad, impressions: ad.impressions + 1 };
}

export async function getAllAds() {
  await ensureAds();
  return db.select().from(advertisements);
}

export async function recordAdClick(id: number): Promise<Advertisement | null> {
  await ensureAds();
  const [ad] = await db.select().from(advertisements).where(eq(advertisements.id, id)).limit(1);
  if (!ad) return null;
  await db
    .update(advertisements)
    .set({ clicks: sql`${advertisements.clicks} + 1` })
    .where(eq(advertisements.id, id));
  return ad;
}
