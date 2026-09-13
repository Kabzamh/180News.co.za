import { desc } from "drizzle-orm";
import { db } from "@/db";
import { advertisements, articles, pageViews, payments, webVitals } from "@/db/schema";
import { ensureAds } from "@/lib/ads";

const SKIP = [/^\/admin/, /^\/api\//, /^\/icon/];

export function shouldTrack(path: string) {
  return !SKIP.some((pattern) => pattern.test(path));
}

export function deviceFromUa(ua: string) {
  if (/Mobile|Android|iPhone/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

export function cpmRevenueCents(impressions: number, cpmCents: number) {
  return Math.round((impressions * cpmCents) / 1000);
}

let seeded = false;

async function seedSampleTraffic() {
  const existing = await db.select({ id: pageViews.id }).from(pageViews).limit(1);
  if (existing.length > 0) {
    seeded = true;
    return;
  }
  const articleRows = await db.select({ slug: articles.slug }).from(articles);
  const paths = [
    "/",
    "/weather",
    "/elections",
    "/lotto",
    "/map",
    "/subscribe",
    "/bulletin",
    "/category/national",
    "/category/provincial",
    ...articleRows.slice(0, 12).map((row) => `/article/${row.slug}`),
  ];
  const rows: Array<{
    path: string;
    referrer: string;
    device: string;
    session: string;
    createdAt: Date;
  }> = [];
  for (let day = 13; day >= 0; day -= 1) {
    const count = 40 + ((13 - day) * 7 + day * 3) % 55;
    for (let i = 0; i < count; i += 1) {
      const path = paths[(day + i * 3) % paths.length];
      rows.push({
        path,
        referrer: i % 5 === 0 ? "https://www.google.com/" : "",
        device: i % 3 === 0 ? "mobile" : i % 7 === 0 ? "tablet" : "desktop",
        session: `seed-${day}-${Math.floor(i / 3)}`,
        createdAt: new Date(Date.now() - day * 86400000 - i * 130000),
      });
    }
  }
  for (let i = 0; i < rows.length; i += 400) {
    await db.insert(pageViews).values(rows.slice(i, i + 400));
  }
  const vitals = ["LCP", "INP", "CLS", "TTFB"].flatMap((name, index) =>
    Array.from({ length: 20 }, (_, i) => ({
      name,
      value:
        name === "LCP"
          ? 1800 + i * 40
          : name === "INP"
            ? 120 + i * 6
            : name === "CLS"
              ? 4 + (i % 8)
              : 280 + i * 12,
      path: paths[(index + i) % paths.length],
      device: i % 2 === 0 ? "mobile" : "desktop",
      createdAt: new Date(Date.now() - i * 3600000),
    })),
  );
  await db.insert(webVitals).values(vitals);
  seeded = true;
}

export async function recordPageView(input: {
  path: string;
  referrer?: string;
  device?: string;
  session: string;
}) {
  if (!shouldTrack(input.path)) return;
  await db.insert(pageViews).values({
    path: input.path.slice(0, 320),
    referrer: (input.referrer ?? "").slice(0, 320),
    device: input.device ?? "desktop",
    session: input.session.slice(0, 64),
  });
}

export async function recordVital(input: {
  name: string;
  value: number;
  path: string;
  device?: string;
}) {
  if (!shouldTrack(input.path)) return;
  await db.insert(webVitals).values({
    name: input.name.slice(0, 16),
    value: Math.round(input.value),
    path: input.path.slice(0, 320),
    device: input.device ?? "desktop",
  });
}

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export async function getAnalyticsReport() {
  await ensureAds();
  if (!seeded) await seedSampleTraffic();

  const [views, ads, articleRows, paymentRows, vitals] = await Promise.all([
    db.select().from(pageViews).orderBy(desc(pageViews.createdAt)).limit(8000),
    db.select().from(advertisements),
    db.select().from(articles).orderBy(desc(articles.views)).limit(12),
    db.select().from(payments),
    db.select().from(webVitals).orderBy(desc(webVitals.createdAt)).limit(800),
  ]);

  const since7 = Date.now() - 7 * 86400000;
  const last7 = views.filter((row) => row.createdAt.getTime() >= since7);
  const byDay = new Map<string, number>();
  for (let i = 13; i >= 0; i -= 1) {
    byDay.set(dayKey(new Date(Date.now() - i * 86400000)), 0);
  }
  for (const row of views) {
    const key = dayKey(row.createdAt);
    if (byDay.has(key)) byDay.set(key, (byDay.get(key) ?? 0) + 1);
  }

  const pathCounts = new Map<string, number>();
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  const sessions = new Set<string>();
  for (const row of last7) {
    pathCounts.set(row.path, (pathCounts.get(row.path) ?? 0) + 1);
    if (row.device === "mobile") deviceCounts.mobile += 1;
    else if (row.device === "tablet") deviceCounts.tablet += 1;
    else deviceCounts.desktop += 1;
    sessions.add(row.session);
  }

  const topPages = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([path, hits]) => ({ path, hits }));

  const adRows = ads.map((ad) => {
    const revenueCents = cpmRevenueCents(ad.impressions, ad.cpmCents);
    const ctr = ad.impressions > 0 ? (ad.clicks / ad.impressions) * 100 : 0;
    const ecpm = ad.impressions > 0 ? (revenueCents / ad.impressions) * 1000 : ad.cpmCents;
    return {
      id: ad.id,
      advertiser: ad.advertiser,
      slot: ad.slot,
      format: ad.format,
      impressions: ad.impressions,
      clicks: ad.clicks,
      ctr,
      cpmCents: ad.cpmCents,
      revenueCents,
      ecpm,
    };
  });

  const adImpressions = adRows.reduce((sum, row) => sum + row.impressions, 0);
  const adClicks = adRows.reduce((sum, row) => sum + row.clicks, 0);
  const adRevenue = adRows.reduce((sum, row) => sum + row.revenueCents, 0);
  const avgCpm = adImpressions > 0 ? Math.round((adRevenue / adImpressions) * 1000) : 0;
  const subRevenue = paymentRows
    .filter((row) => row.status === "paid")
    .reduce((sum, row) => sum + row.amountCents, 0);

  const vitalSummary = ["LCP", "INP", "CLS", "TTFB"].map((name) => {
    const values = vitals.filter((row) => row.name === name).map((row) => row.value);
    const avg = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;
    const good =
      name === "LCP" ? avg <= 2500 : name === "INP" ? avg <= 200 : name === "CLS" ? avg <= 10 : avg <= 800;
    return { name, avg, samples: values.length, unit: name === "CLS" ? "score" : "ms", good };
  });

  return {
    pageViews7: last7.length,
    pageViews14: views.length,
    sessions7: sessions.size,
    pagesPerSession: sessions.size ? last7.length / sessions.size : 0,
    byDay: [...byDay.entries()].map(([day, hits]) => ({ day, hits })),
    topPages,
    deviceCounts,
    articles: articleRows.map((row) => ({
      title: row.title,
      slug: row.slug,
      views: row.views,
    })),
    ads: adRows.sort((a, b) => b.revenueCents - a.revenueCents),
    adImpressions,
    adClicks,
    adCtr: adImpressions > 0 ? (adClicks / adImpressions) * 100 : 0,
    adRevenue,
    avgCpm,
    subRevenue,
    totalRevenue: adRevenue + subRevenue,
    vitals: vitalSummary,
  };
}
