import { desc } from "drizzle-orm";
import { db } from "@/db";
import { lottoSnapshots, lottoUpdates, type LottoUpdate } from "@/db/schema";

export type LottoGame = {
  slug: string;
  name: string;
  drawNumber: number | null;
  drawDate: string;
  numbers: number[];
  bonus: number | null;
  bonusLabel: string;
  nextDrawAt: string | null;
  schedule: string;
  jackpot: string | null;
  winners: number | null;
  totalPaid: string | null;
  sourceUrl: string;
};

export type LottoDesk = {
  games: LottoGame[];
  fetchedAt: string;
  live: boolean;
  source: string;
  updates: Array<{
    id: number;
    headline: string;
    detail: string;
    createdAt: string;
  }>;
};

const GAME_META: Record<
  string,
  { name: string; bonusLabel: string; schedule: string; path: string }
> = {
  dailylotto: {
    name: "Daily Lotto",
    bonusLabel: "",
    schedule: "Every night at 21:00 SAST",
    path: "/south-african-daily-lotto-results",
  },
  lotto: {
    name: "Lotto",
    bonusLabel: "Bonus",
    schedule: "Wednesday and Saturday at 21:00 SAST",
    path: "/south-african-lotto-results",
  },
  lottoplus1: {
    name: "Lotto Plus 1",
    bonusLabel: "Bonus",
    schedule: "Wednesday and Saturday at 21:00 SAST",
    path: "/south-african-lotto-plus-1-results",
  },
  lotto5max: {
    name: "Lotto 5 Max",
    bonusLabel: "Bonus",
    schedule: "Wednesday and Saturday at 21:00 SAST",
    path: "/south-african-lotto-5-max-results",
  },
  powerball: {
    name: "PowerBall",
    bonusLabel: "PowerBall",
    schedule: "Tuesday and Friday at 21:00 SAST",
    path: "/south-african-powerball-results",
  },
  powerballxtra: {
    name: "PowerBall XTRA",
    bonusLabel: "PowerBall",
    schedule: "Tuesday and Friday at 21:00 SAST",
    path: "/south-african-powerball-xtra-results",
  },
};

const HOME_URL = "https://resultsza.co.za/";
const CACHE_MS = 60 * 1000;
let memoryCache: { at: number; desk: LottoDesk } | null = null;

function decode(value: string) {
  return value
    .replace(/&middot;/g, "·")
    .replace(/&nbsp;/g, " ")
    .replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCharCode(Number(n)));
}

function normaliseSlug(raw: string) {
  return raw.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

async function fetchHtml(url: string, ms = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent": "180DegreesNews/1.0 (+https://180news.co.za)",
        Accept: "text/html",
      },
    });
    if (!response.ok) throw new Error(`Lotto request failed (${response.status})`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function parseHome(html: string): LottoGame[] {
  const cards = html.split('class="result-card ').slice(1);
  const games: LottoGame[] = [];

  for (const card of cards) {
    const classMatch = card.match(/^([a-z0-9-]+)/i);
    if (!classMatch) continue;
    const slug = normaliseSlug(classMatch[1].replace(/^card-/, ""));
    const meta = GAME_META[slug];
    if (!meta) continue;

    const drawMatch = card.match(/Draw\s*#\s*(\d+)/i);
    const dateMatch = card.match(/draw-date">([^<]+)/i);
    const nextMatch = card.match(/data-draw-time="([^"]+)"/i);
    const balls = [...card.matchAll(/class="ball(?![^"]*bonus)[^"]*">\s*(\d+)/gi)].map((m) => Number(m[1]));
    const bonusMatch = card.match(/class="ball bonus">\s*(\d+)/i);
    const dateText = decode(dateMatch?.[1] ?? "").replace(/\s+/g, " ").trim();
    const isoDate = dateText.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? dateText;

    games.push({
      slug,
      name: meta.name,
      drawNumber: drawMatch ? Number(drawMatch[1]) : null,
      drawDate: isoDate,
      numbers: balls,
      bonus: bonusMatch ? Number(bonusMatch[1]) : null,
      bonusLabel: meta.bonusLabel,
      nextDrawAt: nextMatch?.[1] ?? null,
      schedule: meta.schedule,
      jackpot: null,
      winners: null,
      totalPaid: null,
      sourceUrl: `https://resultsza.co.za${meta.path}`,
    });
  }

  return games;
}

function parseDetailStats(html: string) {
  const winnersMatch = html.match(/([\d][\d,]*)\s*Total Winners/i);
  const paidMatch = html.match(/R\s*([\d][\d,\.]*)\s*Total Paid Out/i);
  const jackpotMatch =
    html.match(/R\s*([\d][\d,\.]*)\s*Next Jackpot/i) ||
    html.match(/Next Jackpot[^R]{0,40}R\s*([\d][\d,\.]*)/i);
  return {
    winners: winnersMatch ? Number(winnersMatch[1].replace(/,/g, "")) : null,
    totalPaid: paidMatch ? `R${paidMatch[1]}` : null,
    jackpot: jackpotMatch ? `R${jackpotMatch[1]}` : null,
  };
}

function fingerprint(games: LottoGame[]) {
  return games
    .map((game) => `${game.slug}:${game.drawNumber}:${game.numbers.join("-")}:${game.bonus ?? ""}`)
    .join("|");
}

async function recordSnapshot(games: LottoGame[]) {
  const mark = fingerprint(games);
  const [previous] = await db.select().from(lottoSnapshots).orderBy(desc(lottoSnapshots.fetchedAt)).limit(1);

  if (previous?.fingerprint === mark) return;

  await db.insert(lottoSnapshots).values({
    payload: JSON.stringify(games),
    fingerprint: mark,
    fetchedAt: new Date(),
  });

  if (!previous) {
    const headline = games
      .slice(0, 3)
      .map((game) => `${game.name} ${game.numbers.join(" ")}`)
      .join(" · ");
    await db.insert(lottoUpdates).values({
      headline: "Lotto desk is live",
      detail: headline || "Latest National Lottery numbers are on the board.",
    });
    return;
  }

  const prevGames = JSON.parse(previous.payload) as LottoGame[];
  const prevMap = new Map(prevGames.map((game) => [game.slug, game]));
  const changed = games.filter((game) => {
    const before = prevMap.get(game.slug);
    return !before || before.drawNumber !== game.drawNumber || before.numbers.join(",") !== game.numbers.join(",");
  });

  await db.insert(lottoUpdates).values({
    headline:
      changed.length > 0
        ? `New ${changed.map((game) => game.name).join(", ")} results`
        : "National Lottery results updated",
    detail: changed
      .map((game) => `${game.name}: ${game.numbers.join(" ")}${game.bonus != null ? ` + ${game.bonus}` : ""}`)
      .join(" · "),
  });
}

async function latestStored(): Promise<LottoGame[] | null> {
  const [row] = await db.select().from(lottoSnapshots).orderBy(desc(lottoSnapshots.fetchedAt)).limit(1);
  if (!row) return null;
  try {
    return JSON.parse(row.payload) as LottoGame[];
  } catch {
    return null;
  }
}

async function loadUpdates(): Promise<LottoUpdate[]> {
  return db.select().from(lottoUpdates).orderBy(desc(lottoUpdates.createdAt)).limit(10);
}

export async function getLottoDesk(force = false): Promise<LottoDesk> {
  if (!force && memoryCache && Date.now() - memoryCache.at < CACHE_MS) {
    return memoryCache.desk;
  }

  let games = await latestStored();
  let live = Boolean(games?.length);

  try {
    const home = await fetchHtml(HOME_URL);
    const parsed = parseHome(home);
    if (parsed.length > 0) {
      const detailTargets = parsed.filter((game) => ["lotto", "powerball", "dailylotto"].includes(game.slug));
      const details = await Promise.allSettled(detailTargets.map((game) => fetchHtml(game.sourceUrl, 8000)));
      details.forEach((result, index) => {
        if (result.status !== "fulfilled") return;
        const stats = parseDetailStats(result.value);
        const target = parsed.find((game) => game.slug === detailTargets[index].slug);
        if (!target) return;
        target.jackpot = stats.jackpot;
        target.winners = stats.winners;
        target.totalPaid = stats.totalPaid;
      });
      games = parsed;
      live = true;
      await recordSnapshot(parsed);
    }
  } catch {
    // keep stored snapshot
  }

  if (!games) games = [];

  const updates = await loadUpdates();
  const desk: LottoDesk = {
    games,
    fetchedAt: new Date().toISOString(),
    live,
    source: "National Lottery results via public draw boards",
    updates: updates.map((row) => ({
      id: row.id,
      headline: row.headline,
      detail: row.detail,
      createdAt: row.createdAt.toISOString(),
    })),
  };
  memoryCache = { at: Date.now(), desk };
  return desk;
}
