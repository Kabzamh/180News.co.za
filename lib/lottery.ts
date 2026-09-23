/** South African National Lottery game metadata. */

export type LottoGame = {
  slug: string;
  name: string;
  short: string;
  /** Path segment on the source results site. */
  sourcePath: string;
  /** Ball-group id emitted by the source markup. */
  groupId: string;
  mainCount: number;
  mainMax: number;
  /** Label for the extra ball (Bonus Ball / PowerBall), or null (Daily Lotto). */
  specialLabel: string | null;
  specialMax: number;
  /** Tailwind-ish hex colours for main and special balls. */
  ball: string;
  specialBall: string;
  drawDays: string;
  drawTime: string;
  ticketCost: string;
  blurb: string;
};

export const LOTTO_GAMES: LottoGame[] = [
  {
    slug: "lotto",
    name: "Lotto",
    short: "Lotto",
    sourcePath: "lotto",
    groupId: "ZA_lotto",
    mainCount: 6,
    mainMax: 52,
    specialLabel: "Bonus Ball",
    specialMax: 52,
    ball: "#d7263d",
    specialBall: "#f0b429",
    drawDays: "Wednesdays & Saturdays",
    drawTime: "20:56 SAST",
    ticketCost: "R5 per board (+R5 each for Plus 1 & Plus 2)",
    blurb:
      "South Africa's flagship draw: match six numbers from 1 to 52, with a Bonus Ball boosting the lower divisions.",
  },
  {
    slug: "lotto-plus-1",
    name: "Lotto Plus 1",
    short: "Plus 1",
    sourcePath: "lotto-plus",
    groupId: "ZA_lottoplus",
    mainCount: 6,
    mainMax: 52,
    specialLabel: "Bonus Ball",
    specialMax: 52,
    ball: "#1d4ed8",
    specialBall: "#f0b429",
    drawDays: "Wednesdays & Saturdays",
    drawTime: "20:56 SAST",
    ticketCost: "Adds R5 per Lotto board",
    blurb: "The first supplementary Lotto draw, using the same 1–52 matrix.",
  },
  {
    slug: "lotto-plus-2",
    name: "Lotto Plus 2",
    short: "Plus 2",
    sourcePath: "lotto-plus",
    groupId: "ZA_lottoplus2",
    mainCount: 6,
    mainMax: 52,
    specialLabel: "Bonus Ball",
    specialMax: 52,
    ball: "#7c3aed",
    specialBall: "#f0b429",
    drawDays: "Wednesdays & Saturdays",
    drawTime: "20:56 SAST",
    ticketCost: "Adds another R5 per Lotto board",
    blurb: "A second chance at millions on the same numbers, every Lotto night.",
  },
  {
    slug: "powerball",
    name: "PowerBall",
    short: "PowerBall",
    sourcePath: "powerball",
    groupId: "ZA_powerball",
    mainCount: 5,
    mainMax: 50,
    specialLabel: "PowerBall",
    specialMax: 20,
    ball: "#0ea5e9",
    specialBall: "#dc2626",
    drawDays: "Tuesdays & Fridays",
    drawTime: "21:00 SAST",
    ticketCost: "R5 per board (+R2.50 for PowerBall Plus)",
    blurb:
      "Five numbers from 1 to 50 plus one PowerBall from 1 to 20 — home to SA's biggest jackpots.",
  },
  {
    slug: "powerball-plus",
    name: "PowerBall Plus",
    short: "PB Plus",
    sourcePath: "powerball-plus",
    groupId: "ZA_powerballplus",
    mainCount: 5,
    mainMax: 50,
    specialLabel: "PowerBall",
    specialMax: 20,
    ball: "#0f766e",
    specialBall: "#ea580c",
    drawDays: "Tuesdays & Fridays",
    drawTime: "21:00 SAST",
    ticketCost: "Adds R2.50 per PowerBall board",
    blurb: "The PowerBall supplementary draw with its own growing jackpot.",
  },
  {
    slug: "daily-lotto",
    name: "Daily Lotto",
    short: "Daily",
    sourcePath: "daily-lotto",
    groupId: "ZA_dailylotto",
    mainCount: 5,
    mainMax: 36,
    specialLabel: null,
    specialMax: 0,
    ball: "#16a34a",
    specialBall: "#16a34a",
    drawDays: "Every day",
    drawTime: "21:00 SAST",
    ticketCost: "R3 per board",
    blurb:
      "A guaranteed winner every single night — five numbers from 1 to 36, with the pool rolling down if nobody matches all five.",
  },
];

export const LOTTO_GAME_MAP: Record<string, LottoGame> = Object.fromEntries(
  LOTTO_GAMES.map((g) => [g.slug, g]),
);

/** Source paths that host more than one game group on a single page. */
export const MULTI_GROUP_PATHS = new Set(["lotto-plus"]);
