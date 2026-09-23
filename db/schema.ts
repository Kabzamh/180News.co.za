import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

/**
 * 180 Degrees News — database schema
 * Articles are either produced by the 180 Degrees news desk or ingested
 * from South African RSS feeds (see rss_sources).
 */
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  // Stable unique identifier used for de-duplication (RSS guid / link).
  guid: text("guid").notNull().unique(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary"),
  // Plain-text body; paragraphs separated by "\n\n".
  content: text("content"),
  imageUrl: text("image_url"),
  imageCredit: text("image_credit"),
  source: text("source").notNull().default("180 Degrees News"),
  sourceUrl: text("source_url"),
  author: text("author"),
  // Section slug, e.g. national | politics | business | sport ...
  category: text("category").notNull().default("national"),
  // Province slug, e.g. gauteng | western-cape ... (null for non-local news).
  province: text("province"),
  // Human-readable region / city / metro, e.g. "City of Cape Town".
  region: text("region"),
  tags: text("tags")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  isBreaking: boolean("is_breaking").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  // Premium (All Access) long-reads show only a teaser to non-subscribers.
  isPremium: boolean("is_premium").notNull().default(false),
  // investigation | column | explainer | guide | briefing
  premiumKind: text("premium_kind"),
  // Optional lead media attached to the story (YouTube, audio or video).
  mediaKind: text("media_kind"), // 'youtube' | 'audio' | 'video'
  mediaId: text("media_id"), // YouTube video id or uploaded file URL
  views: integer("views").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const rssSources = pgTable("rss_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  category: text("category").notNull().default("national"),
  province: text("province"),
  enabled: boolean("enabled").notNull().default(true),
  lastFetchedAt: timestamp("last_fetched_at", { withTimezone: true }),
  lastStatus: text("last_status"),
  itemCount: integer("item_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/** Paid All Access memberships (checkout is simulated; wire a PSP here). */
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name"),
  plan: text("plan").notNull().default("all-access"),
  // trialing | active | cancelled
  status: text("status").notNull().default("trialing"),
  // card | eft | debit
  paymentMethod: text("payment_method").notNull(),
  paymentLabel: text("payment_label"),
  last4: text("last4"),
  trialEndsAt: timestamp("trial_ends_at", { withTimezone: true }).notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
  cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  accessToken: text("access_token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* ------------------------------- Advertising ------------------------------ */

export type AdPlacement =
  | "header-leaderboard"
  | "in-article"
  | "sidebar-rectangle"
  | "sidebar-skyscraper"
  | "footer-banner"
  | "mobile-sticky"
  | "section-rail";

export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  placement: text("placement").$type<AdPlacement>().notNull(),
  // 'image' banner with optional destination, or 'html' house ad.
  type: text("type").notNull().default("image"),
  imageUrl: text("image_url"),
  html: text("html"),
  linkUrl: text("link_url"),
  sponsor: text("sponsor"),
  // Rotation weight (higher = shown more often). 0 pauses the banner.
  weight: integer("weight").notNull().default(1),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  // Optional scheduling window.
  startsAt: timestamp("starts_at", { withTimezone: true }),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

/* ---------------------------------- Media --------------------------------- */

export const mediaItems = pgTable("media_items", {
  id: serial("id").primaryKey(),
  // Stable id: `yt:VIDEOID` for YouTube, podcast GUID/url for audio.
  guid: text("guid").notNull().unique(),
  // video = YouTube, audio = podcast / clip
  kind: text("kind").notNull(), // 'video' | 'audio'
  title: text("title").notNull(),
  summary: text("summary"),
  youtubeId: text("youtube_id"),
  audioUrl: text("audio_url"),
  durationSec: integer("duration_sec"),
  thumbnail: text("thumbnail"),
  // Channel or podcast show name
  source: text("source").notNull(),
  sourceUrl: text("source_url"),
  // Section slug the item belongs to (national, business, world…)
  category: text("category").notNull().default("national"),
  views: integer("views").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type LottoDivision = {
  match: string;
  winners: number;
  prize: number;
};

export const lottoDraws = pgTable("lotto_draws", {
  id: serial("id").primaryKey(),
  // lotto | lotto-plus-1 | lotto-plus-2 | powerball | powerball-plus | daily-lotto
  game: text("game").notNull(),
  drawNumber: integer("draw_number").notNull(),
  drawDate: timestamp("draw_date", { withTimezone: true }).notNull(),
  mainNumbers: integer("main_numbers")
    .array()
    .notNull()
    .default(sql`'{}'::integer[]`),
  // Bonus ball (Lotto family) or PowerBall (PowerBall family)
  bonusNumber: integer("bonus_number"),
  // Next-draw estimated jackpot, in rands
  jackpot: numeric("jackpot", { precision: 18, scale: 2 }),
  // Total prize pool of this draw, in rands
  prizePool: numeric("prize_pool", { precision: 18, scale: 2 }),
  totalWinners: integer("total_winners"),
  divisions: jsonb("divisions")
    .$type<LottoDivision[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  drawMachine: text("draw_machine"),
  source: text("source").notNull().default("lotteryresults.co.za"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
}, (table) => [
  unique("lotto_game_draw_uq").on(table.game, table.drawNumber),
]);

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type RssSource = typeof rssSources.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type LottoDraw = typeof lottoDraws.$inferSelect;
export type NewLottoDraw = typeof lottoDraws.$inferInsert;
export type MediaItem = typeof mediaItems.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Ad = typeof ads.$inferSelect;
