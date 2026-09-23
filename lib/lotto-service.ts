import { asc, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { lottoDraws, type LottoDivision, type LottoDraw } from "@/db/schema";
import { LOTTO_GAMES, LOTTO_GAME_MAP, type LottoGame } from "@/lib/lottery";
import { rand, stripHtml } from "@/lib/utils";

const BASE = "https://www.lotteryresults.co.za";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const MONEY_IMAGE =
  "https://images.pexels.com/photos/6310123/pexels-photo-6310123.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

type ParsedDraw = {
  game: LottoGame;
  drawNumber: number;
  drawDate: Date;
  mainNumbers: number[];
  bonusNumber: number | null;
  jackpot: number | null;
  prizePool: number | null;
  totalWinners: number | null;
  divisions: LottoDivision[];
  drawMachine: string | null;
};

async function fetchHtml(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-ZA,en;q=0.9",
      },
      signal: controller.signal,
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

function parseRand(text: string | null | undefined): number | null {
  if (!text) return null;
  const m = text.replace(/\s|\\u00a0|&nbsp;|R|,/g, "").match(/[\d.]+/);
  if (!m) return null;
  const n = Number.parseFloat(m[0]);
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : null;
}

function parseDateSlug(slug: string): Date {
  // 14-sep-2026
  const months: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
  };
  const m = slug.match(/(\d{1,2})-([a-z]{3})-(\d{4})/i);
  if (!m) return new Date();
  const d = Number(m[1]);
  const mon = months[m[2].toLowerCase()] ?? 0;
  const y = Number(m[3]);
  // Draws take place ~21:00 SAST (UTC+2)
  return new Date(Date.UTC(y, mon, d, 19, 5, 0));
}

function parseDivisions(segment: string): LottoDivision[] {
  const out: LottoDivision[] = [];
  const rows = segment.match(/<tr[\s\S]*?<\/tr>/g) ?? [];
  for (const row of rows) {
    const cells = (row.match(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/g) ?? [])
      .map((c) => stripHtml(c).replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim())
      .filter(Boolean);
    if (cells.length < 3) continue;
    const match = cells[0];
    if (!/\d|bonus|jackpot/i.test(match)) continue;
    const winners = Number((cells[1] ?? "0").replace(/[^\d]/g, "")) || 0;
    const prize = parseRand(cells[cells.length - 1]);
    if (prize === null && winners === 0 && !/jackpot/i.test(match)) continue;
    out.push({ match, winners, prize: prize ?? 0 });
  }
  return out;
}

function parseResultPage(html: string, path: string, dateSlug: string): ParsedDraw[] {
  // Split into segments, one per ball-group marker.
  const marker = /c-ball-group js-ball-group c-ball-group--(ZA_[a-z0-9]+)/g;
  const markers: { group: string; index: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = marker.exec(html))) {
    markers.push({ group: m[1], index: m.index });
  }
  if (!markers.length) return [];

  const draws: ParsedDraw[] = [];
  markers.forEach((mk, i) => {
    const game = LOTTO_GAMES.find(
      (g) => g.sourcePath === path && g.groupId === mk.group,
    );
    if (!game) return;
    const end = i + 1 < markers.length ? markers[i + 1].index : html.length;
    const segment = html.slice(mk.index, end);

    const ballRe =
      /class="(c-ball js-ball[^"]*)"[\s\S]{0,700}?js-ball__text">\s*(\d{1,2})/g;
    const mainNumbers: number[] = [];
    let bonusNumber: number | null = null;
    let bm: RegExpExecArray | null;
    while ((bm = ballRe.exec(segment))) {
      const n = Number(bm[2]);
      if (/bonus/.test(bm[1])) bonusNumber = n;
      else if (mainNumbers.length < game.mainCount) mainNumbers.push(n);
    }
    if (mainNumbers.length === 0) return;

    const text = stripHtml(segment).replace(/\u00a0/g, " ");
    const drawNumber = Number(text.match(/Draw Number\s*(\d+)/)?.[1] ?? 0);
    const totalWinnersTxt = text.match(/Total Winners\s+([\d,]+)/)?.[1];
    const totalWinners = totalWinnersTxt
      ? Number(totalWinnersTxt.replace(/,/g, ""))
      : null;
    const prizePool = parseRand(
      text.match(/Total Prize Pool\s+R\s*([\d,.]+)/)?.[1],
    );
    const drawMachine = text.match(/Draw Machine\s+([A-Za-z0-9-]+)/)?.[1] ?? null;

    // Next-draw jackpot estimate lives in the embedded structured JSON.
    const jackpotRaw = segment
      .match(/Jackpot Estimate[\s\S]{0,420}?R(?:&nbsp;|\\u00a0|\s)+([\d,]+(?:\.\d+)?)/)
      ?.at(1);
    const jackpot = parseRand(jackpotRaw);

    draws.push({
      game,
      drawNumber,
      drawDate: parseDateSlug(dateSlug),
      mainNumbers: mainNumbers.sort((a, b) => a - b),
      bonusNumber,
      jackpot: jackpot ?? prizePool,
      prizePool,
      totalWinners,
      divisions: parseDivisions(segment),
      drawMachine,
    });
  });

  // Multi-game pages (lotto-plus) sometimes serve stale fallback numbers for
  // secondary groups on archived dates; all groups on one date share a draw
  // number, so discard any secondary group whose number doesn't line up.
  if (draws.length > 1 && draws[0].drawNumber) {
    const anchor = draws[0].drawNumber;
    for (let i = draws.length - 1; i > 0; i--) {
      if (draws[i].drawNumber !== anchor) draws.splice(i, 1);
    }
  }
  return draws;
}

async function listRecentDateSlugs(path: string, count: number): Promise<string[]> {
  const html = await fetchHtml(`${BASE}/${path}/`);
  const slugs: string[] = [];
  const re = new RegExp(`/${path}/results-([0-9]{1,2}-[a-z]{3}-\\d{4})`, "gi");
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (!slugs.includes(m[1])) slugs.push(m[1]);
    if (slugs.length >= count) break;
  }
  return slugs;
}

export type LottoSyncResult = {
  paths: { path: string; status: string; draws: number }[];
  upserted: number;
  articles: number;
  errors: string[];
};

async function upsertDraws(draws: ParsedDraw[]): Promise<number> {
  let n = 0;
  for (const d of draws) {
    if (!d.drawNumber) continue;
    await db
      .insert(lottoDraws)
      .values({
        game: d.game.slug,
        drawNumber: d.drawNumber,
        drawDate: d.drawDate,
        mainNumbers: d.mainNumbers,
        bonusNumber: d.bonusNumber,
        jackpot: d.jackpot?.toFixed(2) ?? null,
        prizePool: d.prizePool?.toFixed(2) ?? null,
        totalWinners: d.totalWinners,
        divisions: d.divisions,
        drawMachine: d.drawMachine,
      })
      .onConflictDoUpdate({
        target: [lottoDraws.game, lottoDraws.drawNumber],
        set: {
          drawDate: d.drawDate,
          mainNumbers: d.mainNumbers,
          bonusNumber: d.bonusNumber,
          jackpot: d.jackpot?.toFixed(2) ?? null,
          prizePool: d.prizePool?.toFixed(2) ?? null,
          totalWinners: d.totalWinners,
          divisions: d.divisions,
          drawMachine: d.drawMachine,
          updatedAt: new Date(),
        },
      });
    n++;
  }
  return n;
}

function drawArticleContent(d: ParsedDraw): {
  title: string;
  summary: string;
  body: string;
  tags: string[];
} {
  const dateLabel = d.drawDate.toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const nums = d.mainNumbers.join(", ");
  const special =
    d.bonusNumber != null
      ? ` ${d.game.specialLabel}: ${d.bonusNumber}.`
      : ".";
  const topDiv = d.divisions[0];
  const jackpotLine =
    d.jackpot != null
      ? d.game.slug === "daily-lotto"
        ? `The total prize pool for the draw was ${rand(d.prizePool ?? d.jackpot)}.`
        : topDiv?.winners === 0
          ? `The jackpot was not won and rolls over; the next ${d.game.name} jackpot is estimated at ${rand(d.jackpot)}.`
          : `The estimated jackpot for the next draw is ${rand(d.jackpot)}.`
      : "";
  const title = `${d.game.name} results for ${dateLabel}: ${
    d.game.specialLabel ? `${d.game.mainCount}+1 winning numbers` : "winning numbers"
  }`;
  const summary = `${d.game.name} results, draw ${d.drawNumber} (${dateLabel}): winning numbers ${nums}${
    d.bonusNumber != null ? ` and ${d.game.specialLabel} ${d.bonusNumber}` : ""
  }. ${jackpotLine}`.trim();
  const divLines = d.divisions
    .slice(0, 5)
    .map(
      (div) =>
        `- ${div.match}: ${div.winners.toLocaleString("en-US")} winner(s) × ${rand(div.prize)}`,
    )
    .join("\n");
  const body = `SOUTH AFRICA – The ${d.game.name} results are in for ${dateLabel} (draw ${d.drawNumber}).

The winning numbers are ${nums}${special}

${jackpotLine}

Prize breakdown:
${divLines}

Players have 365 days from the draw date to claim prizes at any National Lottery retailer or regional office, depending on the prize value. Results are published for information only — always confirm tickets against the official National Lottery record.`;
  return {
    title,
    summary,
    body,
    tags: [d.game.name, "Lotto results", "winning numbers", "National Lottery"],
  };
}

async function createDrawArticles(draws: ParsedDraw[]): Promise<number> {
  let n = 0;
  const latestByGame = new Map<string, ParsedDraw>();
  for (const d of draws) {
    const existing = latestByGame.get(d.game.slug);
    if (!existing || d.drawNumber > existing.drawNumber) latestByGame.set(d.game.slug, d);
  }
  for (const d of latestByGame.values()) {
    const article = drawArticleContent(d);
    const dateSlug = d.drawDate.toISOString().slice(0, 10);
    const slug = `lotto-results-${d.game.slug}-${dateSlug}`;
    // Raw INSERT … ON CONFLICT (articles table is managed elsewhere).
    await db.execute(sql`
      INSERT INTO articles
        (guid, title, slug, summary, content, image_url, image_credit,
         source, source_url, author, category, province, region, tags,
         is_breaking, featured, views, published_at, created_at, updated_at)
      VALUES
        (${`lotto:${d.game.slug}:${d.drawNumber}`},
         ${article.title},
         ${slug},
         ${article.summary},
         ${article.body},
         ${MONEY_IMAGE},
         ${'Pexels'},
         ${'180 Degrees News Desk'},
         NULL,
         ${'Lotto Desk'},
         ${'lifestyle'},
         NULL,
         NULL,
         ARRAY[${sql.join(article.tags.map((t) => sql`${t}`), sql`, `)}]::text[],
         false, false, 0,
         ${d.drawDate.toISOString()}, now(), now())
      ON CONFLICT (guid) DO NOTHING
    `);
    n++;
  }
  return n;
}

export async function syncLottoResults(opts: {
  history?: number;
  withArticles?: boolean;
} = {}): Promise<LottoSyncResult> {
  const history = opts.history ?? 6;
  const paths = Array.from(new Set(LOTTO_GAMES.map((g) => g.sourcePath)));
  const result: LottoSyncResult = { paths: [], upserted: 0, articles: 0, errors: [] };

  for (const path of paths) {
    try {
      const slugs = await listRecentDateSlugs(path, history);
      let pathCount = 0;
      const allDraws: ParsedDraw[] = [];
      for (const dateSlug of slugs) {
        try {
          const html = await fetchHtml(`${BASE}/${path}/results-${dateSlug}`);
          const draws = parseResultPage(html, path, dateSlug);
          allDraws.push(...draws);
        } catch (err) {
          result.errors.push(`${path}/${dateSlug}: ${(err as Error).message}`);
        }
      }
      pathCount = await upsertDraws(allDraws);
      if (opts.withArticles !== false && slugs[0]) {
        // Only turn the newest page of each path into news.
        try {
          const newestHtml = await fetchHtml(`${BASE}/${path}/results-${slugs[0]}`);
          const newest = parseResultPage(newestHtml, path, slugs[0]);
          result.articles += await createDrawArticles(newest);
        } catch (err) {
          result.errors.push(`articles(${path}): ${(err as Error).message}`);
        }
      }
      result.upserted += pathCount;
      result.paths.push({ path, status: "ok", draws: pathCount });
    } catch (err) {
      result.paths.push({ path, status: "error", draws: 0 });
      result.errors.push(`${path}: ${(err as Error).message}`);
    }
  }
  return result;
}

/* --------------------------------- queries -------------------------------- */

export type LottoDrawView = LottoDraw;

export async function getLatestDraws(): Promise<Record<string, LottoDrawView>> {
  const rows = await db
    .selectDistinctOn([lottoDraws.game])
    .from(lottoDraws)
    .orderBy(asc(lottoDraws.game), desc(lottoDraws.drawNumber));
  const out: Record<string, LottoDrawView> = {};
  for (const r of rows) out[r.game] = r;
  return out;
}

export async function getDrawHistory(
  game: string,
  limit = 12,
): Promise<LottoDrawView[]> {
  return db
    .select()
    .from(lottoDraws)
    .where(eq(lottoDraws.game, game))
    .orderBy(desc(lottoDraws.drawNumber))
    .limit(limit);
}

export async function getRecentDraws(limit = 18): Promise<LottoDrawView[]> {
  return db
    .select()
    .from(lottoDraws)
    .orderBy(desc(lottoDraws.drawDate), desc(lottoDraws.drawNumber))
    .limit(limit);
}

export async function lottoDataIsStale(): Promise<boolean> {
  const rows = await db
    .select({ newest: sql<Date>`max(${lottoDraws.drawDate})` })
    .from(lottoDraws);
  const newest = rows[0]?.newest;
  if (!newest) return true;
  const ageHours = (Date.now() - new Date(newest).getTime()) / 3600_000;
  return ageHours > 13;
}

export function gameBySlug(slug: string): LottoGame | undefined {
  return LOTTO_GAME_MAP[slug];
}
