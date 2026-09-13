import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  bio: text("bio").notNull(),
  avatarInitials: varchar("avatar_initials", { length: 4 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  description: text("description").notNull(),
  scope: varchar("scope", { length: 32 }).notNull(),
});

export const provinces = pgTable("provinces", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  capital: varchar("capital", { length: 80 }).notNull(),
  blurb: text("blurb").notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 280 }).notNull(),
  slug: varchar("slug", { length: 320 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id),
  provinceId: integer("province_id").references(() => provinces.id),
  scope: varchar("scope", { length: 32 }).notNull(),
  isBreaking: boolean("is_breaking").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  views: integer("views").notNull().default(0),
  readingMinutes: integer("reading_minutes").notNull().default(4),
});

export const articleMedia = pgTable("article_media", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id),
  kind: varchar("kind", { length: 16 }).notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  url: text("url").notNull(),
  caption: text("caption").notNull().default(""),
  mimeType: varchar("mime_type", { length: 80 }).notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  name: varchar("name", { length: 120 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  city: varchar("city", { length: 80 }).notNull().default("Johannesburg"),
  province: varchar("province", { length: 80 }).notNull().default("Gauteng"),
  bio: text("bio").notNull().default(""),
  avatarInitials: varchar("avatar_initials", { length: 4 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pins = pgTable("pins", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id")
    .notNull()
    .references(() => subscribers.id),
  articleId: integer("article_id")
    .notNull()
    .references(() => articles.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscriberSessions = pgTable("subscriber_sessions", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id")
    .notNull()
    .references(() => subscribers.id),
  token: varchar("token", { length: 80 }).notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id")
    .notNull()
    .references(() => subscribers.id),
  plan: varchar("plan", { length: 40 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 8 }).notNull().default("ZAR"),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }).notNull(),
  autoRenew: boolean("auto_renew").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: varchar("role", { length: 40 }).notNull().default("editor"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id")
    .notNull()
    .references(() => admins.id),
  token: varchar("token", { length: 80 }).notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  subscriberId: integer("subscriber_id")
    .notNull()
    .references(() => subscribers.id),
  reference: varchar("reference", { length: 40 }).notNull().unique(),
  amountCents: integer("amount_cents").notNull(),
  method: varchar("method", { length: 32 }).notNull(),
  status: varchar("status", { length: 20 }).notNull(),
  cardBrand: varchar("card_brand", { length: 20 }),
  cardLast4: varchar("card_last4", { length: 4 }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 200 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const iecSnapshots = pgTable("iec_snapshots", {
  id: serial("id").primaryKey(),
  source: varchar("source", { length: 40 }).notNull(),
  eventName: varchar("event_name", { length: 200 }).notNull(),
  payload: text("payload").notNull(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
});

export const iecUpdates = pgTable("iec_updates", {
  id: serial("id").primaryKey(),
  headline: varchar("headline", { length: 280 }).notNull(),
  detail: text("detail").notNull(),
  eventName: varchar("event_name", { length: 200 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const weatherForecasts = pgTable("weather_forecasts", {
  id: serial("id").primaryKey(),
  citySlug: varchar("city_slug", { length: 80 }).notNull().unique(),
  city: varchar("city", { length: 120 }).notNull(),
  province: varchar("province", { length: 80 }).notNull(),
  payload: text("payload").notNull(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
});

export const lottoSnapshots = pgTable("lotto_snapshots", {
  id: serial("id").primaryKey(),
  payload: text("payload").notNull(),
  fingerprint: varchar("fingerprint", { length: 240 }).notNull(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).notNull().defaultNow(),
});

export const lottoUpdates = pgTable("lotto_updates", {
  id: serial("id").primaryKey(),
  headline: varchar("headline", { length: 280 }).notNull(),
  detail: text("detail").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  advertiser: varchar("advertiser", { length: 160 }).notNull(),
  headline: varchar("headline", { length: 180 }).notNull(),
  tagline: text("tagline").notNull(),
  cta: varchar("cta", { length: 80 }).notNull(),
  href: varchar("href", { length: 240 }).notNull(),
  slot: varchar("slot", { length: 60 }).notNull(),
  format: varchar("format", { length: 40 }).notNull(),
  theme: varchar("theme", { length: 40 }).notNull(),
  active: boolean("active").notNull().default(true),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  cpmCents: integer("cpm_cents").notNull().default(8500),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: varchar("path", { length: 320 }).notNull(),
  referrer: varchar("referrer", { length: 320 }).notNull().default(""),
  device: varchar("device", { length: 20 }).notNull().default("desktop"),
  session: varchar("session", { length: 64 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const polls = pgTable("polls", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 280 }).notNull(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const pollOptions = pgTable("poll_options", {
  id: serial("id").primaryKey(),
  pollId: integer("poll_id")
    .notNull()
    .references(() => polls.id),
  label: varchar("label", { length: 160 }).notNull(),
  votes: integer("votes").notNull().default(0),
});

export const quizScores = pgTable("quiz_scores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 80 }).notNull().default("Reader"),
  score: integer("score").notNull(),
  total: integer("total").notNull().default(5),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const webVitals = pgTable("web_vitals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 16 }).notNull(),
  value: integer("value").notNull(),
  path: varchar("path", { length: 320 }).notNull(),
  device: varchar("device", { length: 20 }).notNull().default("desktop"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const authorsRelations = relations(authors, ({ many }) => ({
  articles: many(articles),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  articles: many(articles),
}));

export const provincesRelations = relations(provinces, ({ many }) => ({
  articles: many(articles),
}));

export const articlesRelations = relations(articles, ({ one, many }) => ({
  author: one(authors, {
    fields: [articles.authorId],
    references: [authors.id],
  }),
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  province: one(provinces, {
    fields: [articles.provinceId],
    references: [provinces.id],
  }),
  comments: many(comments),
  media: many(articleMedia),
}));

export const articleMediaRelations = relations(articleMedia, ({ one }) => ({
  article: one(articles, {
    fields: [articleMedia.articleId],
    references: [articles.id],
  }),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  article: one(articles, {
    fields: [comments.articleId],
    references: [articles.id],
  }),
}));

export type Author = typeof authors.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Province = typeof provinces.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type ArticleMedia = typeof articleMedia.$inferSelect;
export type IecUpdate = typeof iecUpdates.$inferSelect;
export type Advertisement = typeof advertisements.$inferSelect;
export type LottoUpdate = typeof lottoUpdates.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Payment = typeof payments.$inferSelect;
export type Admin = typeof admins.$inferSelect;
