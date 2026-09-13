export type MarketsSnap = {
  usdZar: number;
  gbpZar: number;
  eurZar: number;
  goldUsd: number;
  updatedAt: string;
};

let cache: { at: number; data: MarketsSnap } | null = null;

export async function getMarkets(): Promise<MarketsSnap> {
  if (cache && Date.now() - cache.at < 30 * 60 * 1000) return cache.data;
  const fallback: MarketsSnap = {
    usdZar: 18.42,
    gbpZar: 24.1,
    eurZar: 19.85,
    goldUsd: 2650,
    updatedAt: new Date().toISOString(),
  };
  try {
    const [fxRes, goldRes] = await Promise.all([
      fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" }),
      fetch("https://api.gold-api.com/price/XAU", { cache: "no-store" }),
    ]);
    const fx = (await fxRes.json()) as { rates?: { ZAR?: number; GBP?: number; EUR?: number } };
    let goldUsd = fallback.goldUsd;
    if (goldRes.ok) {
      const gold = (await goldRes.json()) as { price?: number };
      if (gold.price) goldUsd = gold.price;
    }
    const data: MarketsSnap = {
      usdZar: fx.rates?.ZAR ?? fallback.usdZar,
      gbpZar: fx.rates?.ZAR && fx.rates.GBP ? fx.rates.ZAR / fx.rates.GBP : fallback.gbpZar,
      eurZar: fx.rates?.ZAR && fx.rates.EUR ? fx.rates.ZAR / fx.rates.EUR : fallback.eurZar,
      goldUsd,
      updatedAt: new Date().toISOString(),
    };
    cache = { at: Date.now(), data };
    return data;
  } catch {
    return fallback;
  }
}

export const FUEL = {
  effective: "4 September 2026",
  inland: { petrol95: 22.47, petrol93: 22.15, diesel005: 20.84, diesel05: 20.76 },
  coastal: { petrol95: 21.72, petrol93: 21.4, diesel005: 20.11, diesel05: 20.03 },
  note: "Inland vs coastal pump prices, cents rounded to rand. Confirm the monthly DoE gazette.",
};

export const HOLIDAYS_2026 = [
  { date: "2026-01-01", name: "New Year's Day" },
  { date: "2026-03-21", name: "Human Rights Day" },
  { date: "2026-04-03", name: "Good Friday" },
  { date: "2026-04-06", name: "Family Day" },
  { date: "2026-04-27", name: "Freedom Day" },
  { date: "2026-05-01", name: "Workers' Day" },
  { date: "2026-06-16", name: "Youth Day" },
  { date: "2026-08-09", name: "National Women's Day" },
  { date: "2026-08-10", name: "Public holiday (Women's Day observed)" },
  { date: "2026-09-24", name: "Heritage Day" },
  { date: "2026-12-16", name: "Day of Reconciliation" },
  { date: "2026-12-25", name: "Christmas Day" },
  { date: "2026-12-26", name: "Day of Goodwill" },
];
