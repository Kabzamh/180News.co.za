export type PremiumKind =
  | "investigation"
  | "column"
  | "explainer"
  | "guide"
  | "briefing";

export type PremiumStory = {
  title: string;
  summary: string;
  body: string;
  category: string;
  province?: string;
  region?: string;
  author: string;
  tags: string[];
  imageUrl: string;
  kind: PremiumKind;
  /** Optional fixed publication timestamp (briefings override dynamically). */
  publishedAt?: Date;
};

export const PREMIUM_KIND_META: Record<
  PremiumKind,
  { label: string; plural: string; blurb: string; cadence: string; icon: string }
> = {
  investigation: {
    label: "Investigation",
    plural: "Investigations",
    blurb: "Original, sourced and fact-checked investigative reporting.",
    cadence: "2+ per month",
    icon: "🔍",
  },
  briefing: {
    label: "Daily Briefing",
    plural: "Daily Briefings",
    blurb: "The member-only morning note: the day, decoded before 7am.",
    cadence: "Every weekday",
    icon: "📰",
  },
  column: {
    label: "Column",
    plural: "Columns",
    blurb: "Signed opinion and analysis from the 180° newsroom.",
    cadence: "Weekly",
    icon: "✍️",
  },
  explainer: {
    label: "Explainer",
    plural: "Explainers",
    blurb: "The context behind the headlines, without the jargon.",
    cadence: "Weekly",
    icon: "🧭",
  },
  guide: {
    label: "Money & Life Guide",
    plural: "Guides",
    blurb: "Practical, South African guides to your money and your rights.",
    cadence: "Fortnightly",
    icon: "🧰",
  },
};
