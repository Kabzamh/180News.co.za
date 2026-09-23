/**
 * Markets data service — delayed quotes via the public Yahoo Finance chart
 * endpoint, cached in-process for 5 minutes. Data is for information only.
 */

export type MarketGroup =
  | "jse"
  | "currencies"
  | "commodities"
  | "global"
  | "crypto";

export type Instrument = {
  symbol: string;
  name: string;
  short: string;
  group: MarketGroup;
  /** ZAc quotes (JSE equities) arrive in cents; divide to get rands. */
  divide?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type Quote = {
  symbol: string;
  name: string;
  short: string;
  group: MarketGroup;
  price: number;
  change: number;
  changePct: number;
  spark: number[];
  updatedAt: number;
  prefix: string;
  suffix: string;
  decimals: number;
};

const JSE_PREFIX = "R ";
const USD_PREFIX = "$";

export const INSTRUMENTS: Instrument[] = [
  // --- JSE / South African equities & index trackers (quotes in cents) ---
  {
    symbol: "STX40.JO",
    name: "Satrix 40 (JSE Top 40 tracker)",
    short: "Top 40 (STX40)",
    group: "jse",
    divide: 100,
    prefix: JSE_PREFIX,
    decimals: 2,
  },
  { symbol: "NPN.JO", name: "Naspers", short: "Naspers", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },
  { symbol: "AGL.JO", name: "Anglo American", short: "Anglo", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },
  { symbol: "BTI.JO", name: "British American Tobacco", short: "BAT", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },
  { symbol: "SOL.JO", name: "Sasol", short: "Sasol", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },
  { symbol: "FSR.JO", name: "FirstRand", short: "FirstRand", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },
  { symbol: "MTN.JO", name: "MTN Group", short: "MTN", group: "jse", divide: 100, prefix: JSE_PREFIX, decimals: 2 },

  // --- Rand cross rates ---
  {
    symbol: "ZAR=X",
    name: "US Dollar / Rand",
    short: "USD/ZAR",
    group: "currencies",
    prefix: "R ",
    decimals: 4,
  },
  {
    symbol: "EURZAR=X",
    name: "Euro / Rand",
    short: "EUR/ZAR",
    group: "currencies",
    prefix: "R ",
    decimals: 4,
  },
  {
    symbol: "GBPZAR=X",
    name: "British Pound / Rand",
    short: "GBP/ZAR",
    group: "currencies",
    prefix: "R ",
    decimals: 4,
  },

  // --- Commodities ---
  { symbol: "GC=F", name: "Gold futures", short: "Gold", group: "commodities", prefix: USD_PREFIX, suffix: "/oz", decimals: 0 },
  { symbol: "PL=F", name: "Platinum futures", short: "Platinum", group: "commodities", prefix: USD_PREFIX, suffix: "/oz", decimals: 0 },
  { symbol: "SI=F", name: "Silver futures", short: "Silver", group: "commodities", prefix: USD_PREFIX, suffix: "/oz", decimals: 2 },
  { symbol: "BZ=F", name: "Brent crude oil", short: "Brent oil", group: "commodities", prefix: USD_PREFIX, suffix: "/bbl", decimals: 2 },

  // --- Global indices ---
  { symbol: "^GSPC", name: "S&P 500", short: "S&P 500", group: "global", decimals: 2 },
  { symbol: "^IXIC", name: "Nasdaq Composite", short: "Nasdaq", group: "global", decimals: 2 },
  { symbol: "^FTSE", name: "FTSE 100 (London)", short: "FTSE 100", group: "global", decimals: 2 },

  // --- Crypto ---
  { symbol: "BTC-USD", name: "Bitcoin / US Dollar", short: "Bitcoin", group: "crypto", prefix: USD_PREFIX, decimals: 0 },
  { symbol: "ETH-USD", name: "Ethereum / US Dollar", short: "Ethereum", group: "crypto", prefix: USD_PREFIX, decimals: 0 },
];

export const GROUP_META: Record<
  MarketGroup,
  { title: string; blurb: string }
> = {
  jse: {
    title: "JSE & SA equities",
    blurb: "Johannesburg Stock Exchange tracker and heavyweight movers.",
  },
  currencies: {
    title: "The rand",
    blurb: "Rand cross rates against the dollar, euro and pound.",
  },
  commodities: {
    title: "Commodities",
    blurb: "Gold, platinum, silver and Brent crude — SA's key exports.",
  },
  global: {
    title: "Global markets",
    blurb: "The major international indices setting overnight sentiment.",
  },
  crypto: {
    title: "Cryptocurrency",
    blurb: "Digital asset prices against the US dollar.",
  },
};

type CacheEntry = { at: number; quotes: Quote[] };
let cache: CacheEntry | null = null;
const TTL_MS = 5 * 60_000;

type YahooChart = {
  chart: {
    result?: {
      meta: {
        regularMarketPrice?: number;
        regularMarketTime?: number;
        chartPreviousClose?: number;
        previousClose?: number;
      };
      indicators: { quote: { close: (number | null)[] }[] };
    }[];
    error?: unknown;
  };
};

async function fetchQuote(inst: Instrument): Promise<Quote | null> {
  const url =
    "https://query1.finance.yahoo.com/v8/finance/chart/" +
    encodeURIComponent(inst.symbol) +
    "?range=1mo&interval=1d";
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      Accept: "application/json",
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`${inst.symbol}: HTTP ${res.status}`);
  const data = (await res.json()) as YahooChart;
  const result = data.chart.result?.[0];
  if (!result) throw new Error(`${inst.symbol}: no data`);

  const rawCloses = result.indicators.quote[0]?.close ?? [];
  const closes = rawCloses.filter((c): c is number => typeof c === "number");
  if (closes.length < 2) throw new Error(`${inst.symbol}: thin series`);

  const latest = closes[closes.length - 1];
  const prev = closes[closes.length - 2];
  const divisor = inst.divide ?? 1;
  const price = latest / divisor;
  const change = (latest - prev) / divisor;
  const changePct = prev ? ((latest - prev) / prev) * 100 : 0;
  const spark = closes.map((c) => c / divisor);

  return {
    symbol: inst.symbol,
    name: inst.name,
    short: inst.short,
    group: inst.group,
    price,
    change,
    changePct,
    spark,
    updatedAt: (result.meta.regularMarketTime ?? Date.now() / 1000) * 1000,
    prefix: inst.prefix ?? "",
    suffix: inst.suffix ?? "",
    decimals: inst.decimals ?? 2,
  };
}

export type MarketsBundle = {
  quotes: Quote[];
  byGroup: Record<MarketGroup, Quote[]>;
  updatedAt: number;
  stale: boolean;
  errors: string[];
};

export async function getMarkets(force = false): Promise<MarketsBundle> {
  if (!force && cache && Date.now() - cache.at < TTL_MS) {
    return finalize(cache.quotes, cache.at, false);
  }

  const settled = await Promise.allSettled(INSTRUMENTS.map(fetchQuote));
  const quotes: Quote[] = [];
  const errors: string[] = [];
  for (let i = 0; i < settled.length; i++) {
    const s = settled[i];
    if (s.status === "fulfilled" && s.value) quotes.push(s.value);
    else if (s.status === "rejected") errors.push(String(s.reason?.message ?? s.reason));
  }

  // Keep serving the last good bundle if the upstream has a bad moment.
  if (quotes.length === 0 && cache) {
    return finalize(cache.quotes, cache.at, true);
  }
  if (quotes.length > 0) {
    cache = { at: Date.now(), quotes };
  }
  return finalize(quotes, cache?.at ?? Date.now(), errors.length > 0);
}

function finalize(
  quotes: Quote[],
  updatedAt: number,
  stale: boolean,
): MarketsBundle {
  const byGroup = {
    jse: [],
    currencies: [],
    commodities: [],
    global: [],
    crypto: [],
  } as Record<MarketGroup, Quote[]>;
  for (const q of quotes) byGroup[q.group].push(q);
  return { quotes, byGroup, updatedAt, stale, errors: stale ? ["partial"] : [] };
}

export function formatQuote(q: Quote): string {
  const num = q.price.toLocaleString("en-US", {
    minimumFractionDigits: q.decimals,
    maximumFractionDigits: q.decimals,
  });
  return `${q.prefix}${num}${q.suffix ? ` ${q.suffix}` : ""}`;
}

export function formatChange(q: Quote): string {
  const sign = q.change >= 0 ? "+" : "−";
  const abs = Math.abs(q.change).toLocaleString("en-US", {
    minimumFractionDigits: q.decimals,
    maximumFractionDigits: q.decimals,
  });
  return `${sign}${q.prefix}${abs}`;
}
