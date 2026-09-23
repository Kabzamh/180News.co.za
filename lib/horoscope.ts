/**
 * In-house daily horoscope engine.
 * Readings are generated deterministically from the (sign, SA date) pair, so
 * every reader sees the same forecast for a given day and content changes
 * automatically each morning — without depending on a third-party API.
 */

export type ZodiacSign = {
  slug: string;
  name: string;
  glyph: string;
  dateRange: string;
  /** Inclusive zodiac boundaries as [month(1-12), day]. */
  start: [number, number];
  end: [number, number];
  element: "Fire" | "Earth" | "Air" | "Water";
  modality: "Cardinal" | "Fixed" | "Mutable";
  ruler: string;
  color: string;
  keyword: string;
  traits: [string, string, string];
};

export const SIGNS: ZodiacSign[] = [
  {
    slug: "aries", name: "Aries", glyph: "♈",
    dateRange: "21 Mar – 19 Apr", start: [3, 21], end: [4, 19],
    element: "Fire", modality: "Cardinal", ruler: "Mars",
    color: "#dc2626", keyword: "Initiative",
    traits: ["Bold", "Driven", "Fearless"],
  },
  {
    slug: "taurus", name: "Taurus", glyph: "♉",
    dateRange: "20 Apr – 20 May", start: [4, 20], end: [5, 20],
    element: "Earth", modality: "Fixed", ruler: "Venus",
    color: "#16a34a", keyword: "Steadfastness",
    traits: ["Loyal", "Patient", "Sensual"],
  },
  {
    slug: "gemini", name: "Gemini", glyph: "♊",
    dateRange: "21 May – 20 Jun", start: [5, 21], end: [6, 20],
    element: "Air", modality: "Mutable", ruler: "Mercury",
    color: "#ca8a04", keyword: "Curiosity",
    traits: ["Quick-witted", "Social", "Adaptable"],
  },
  {
    slug: "cancer", name: "Cancer", glyph: "♋",
    dateRange: "21 Jun – 22 Jul", start: [6, 21], end: [7, 22],
    element: "Water", modality: "Cardinal", ruler: "Moon",
    color: "#0891b2", keyword: "Devotion",
    traits: ["Nurturing", "Intuitive", "Protective"],
  },
  {
    slug: "leo", name: "Leo", glyph: "♌",
    dateRange: "23 Jul – 22 Aug", start: [7, 23], end: [8, 22],
    element: "Fire", modality: "Fixed", ruler: "Sun",
    color: "#ea580c", keyword: "Warmth",
    traits: ["Confident", "Generous", "Magnetic"],
  },
  {
    slug: "virgo", name: "Virgo", glyph: "♍",
    dateRange: "23 Aug – 22 Sep", start: [8, 23], end: [9, 22],
    element: "Earth", modality: "Mutable", ruler: "Mercury",
    color: "#65a30d", keyword: "Precision",
    traits: ["Analytical", "Reliable", "Helpful"],
  },
  {
    slug: "libra", name: "Libra", glyph: "♎",
    dateRange: "23 Sep – 22 Oct", start: [9, 23], end: [10, 22],
    element: "Air", modality: "Cardinal", ruler: "Venus",
    color: "#d97706", keyword: "Balance",
    traits: ["Charming", "Fair", "Diplomatic"],
  },
  {
    slug: "scorpio", name: "Scorpio", glyph: "♏",
    dateRange: "23 Oct – 21 Nov", start: [10, 23], end: [11, 21],
    element: "Water", modality: "Fixed", ruler: "Pluto",
    color: "#7c3aed", keyword: "Depth",
    traits: ["Intense", "Perceptive", "Resilient"],
  },
  {
    slug: "sagittarius", name: "Sagittarius", glyph: "♐",
    dateRange: "22 Nov – 21 Dec", start: [11, 22], end: [12, 21],
    element: "Fire", modality: "Mutable", ruler: "Jupiter",
    color: "#b91c1c", keyword: "Adventure",
    traits: ["Optimistic", "Honest", "Free-spirited"],
  },
  {
    slug: "capricorn", name: "Capricorn", glyph: "♑",
    dateRange: "22 Dec – 19 Jan", start: [12, 22], end: [1, 19],
    element: "Earth", modality: "Cardinal", ruler: "Saturn",
    color: "#334155", keyword: "Ambition",
    traits: ["Disciplined", "Practical", "Enduring"],
  },
  {
    slug: "aquarius", name: "Aquarius", glyph: "♒",
    dateRange: "20 Jan – 18 Feb", start: [1, 20], end: [2, 18],
    element: "Air", modality: "Fixed", ruler: "Uranus",
    color: "#2563eb", keyword: "Originality",
    traits: ["Independent", "Inventive", "Humanitarian"],
  },
  {
    slug: "pisces", name: "Pisces", glyph: "♓",
    dateRange: "19 Feb – 20 Mar", start: [2, 19], end: [3, 20],
    element: "Water", modality: "Mutable", ruler: "Neptune",
    color: "#0d9488", keyword: "Imagination",
    traits: ["Compassionate", "Dreamy", "Artistic"],
  },
];

export const SIGN_MAP: Record<string, ZodiacSign> = Object.fromEntries(
  SIGNS.map((s) => [s.slug, s]),
);

/** Resolve a zodiac sign from a birthday (month 1–12, day 1–31). */
export function signForBirthday(month: number, day: number): ZodiacSign {
  return (
    SIGNS.find((s) => {
      if (s.start[0] === s.end[0]) {
        return (
          month === s.start[0] && day >= s.start[1] && day <= s.end[1]
        );
      }
      // Wraps the year (Capricorn).
      if (month === s.start[0] && day >= s.start[1]) return true;
      if (month === s.end[0] && day <= s.end[1]) return true;
      return false;
    }) ?? SIGNS[9]
  );
}

/* ------------------------------- Date helpers ------------------------------ */

function saDateKey(offset: number): string {
  // Pin the "day" to South African time (UTC+2).
  const d = new Date(Date.now() + offset * 86_400_000 + 2 * 3_600_000);
  return d.toISOString().slice(0, 10);
}

export function readingDate(offset = 0): Date {
  const [y, m, d] = saDateKey(offset).split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function dayLabel(offset: number): string {
  if (offset === 0) return "Today";
  if (offset === -1) return "Yesterday";
  if (offset === 1) return "Tomorrow";
  return readingDate(offset).toLocaleDateString("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

/* ------------------------------ Content pools ------------------------------ */

const GENERAL = [
  "The Moon lights up your communication sector, so the conversation you have been postponing wants to happen — on your own calm terms.",
  "A burst of planetary energy favours fresh starts, but rushing a decision today is the one trap to avoid.",
  "You are quietly outgrowing a routine that served you last season; notice it without judging it.",
  "An unexpected message early in the day changes the flavour of your next 48 hours, so keep your notifications close.",
  "Your intuition is running hotter than your inbox today — pause before you reply to anything that triggers you.",
  "A small win you did not celebrate is about to compound; give yourself credit before sunset.",
  "The stars reward preparation rather than luck today, and you have already done more groundwork than you realise.",
  "Something you lost interest in three weeks ago resurfaces with a better offer attached.",
  "Your schedule has more give in it than it appears — protect one hour for what only you can do.",
  "A practical favour exchanged today strengthens a connection that pays off before month-end.",
  "Tension you have been absorbing is not yours to carry; naming it out loud dissolves half of it.",
  "The day favours closure over conquest — finishing one open tab beats opening three new ones.",
  "A contrast between two people's reactions tells you exactly where you stand; trust what you observe.",
  "Your patience is being mistaken for permission somewhere — a gentle boundary will fix it.",
  "News arriving sideways still contains a useful clue; read past the headline before you respond.",
  "The cosmos hands you a rare do-over in a conversation that mattered more than you admitted.",
];

const LOVE = [
  "Venus softens a stubborn dynamic at home, and the first kind word spoken wins the whole evening.",
  "If you are attached, a shared plan that stalled gets a new date on the calendar; singles should accept the second invitation, not the first.",
  "Old affection returns in a new wrapper — a familiar name in your messages deserves an open mind.",
  "Honesty delivered gently lands better than the perfectly rehearsed argument you have been polishing.",
  "A relationship that survives your honest no today is one worth keeping; notice who makes space for it.",
  "Domestic chaos is actually a bid for attention; ten minutes of undistracted listening changes the mood.",
  "Romance hides in logistics today — sorting the practical detail together is its own love language.",
  "Someone is reading you more accurately than you assume; let your guard down one careful notch.",
  "A friendship is quietly auditioning for a deeper role; let actions, not pressure, decide the pace.",
  "Forgiveness you extend today is mostly a gift to your own peace — and the stars approve.",
  "Single? A meeting involving food, music or travel carries more spark than your routine haunts.",
  "Misread tone is the only real obstacle today; when in doubt, pick up the phone instead of typing.",
];

const WORK = [
  "A conversation about money or scope goes better than your nerves predict — lead with what you have delivered, not what you hope to.",
  "A colleague's offhand remark contains the shortcut you have been searching for; listen for the detail beneath the complaint.",
  "Your reputation for reliability is quietly opening a door; the formal invitation arrives a beat after the informal one.",
  "Paperwork you have been dodging unlocks a stuck process — clear the smallest admin item first and watch the rest loosen.",
  "A meeting that looks like a detour introduces you to someone who belongs in your next chapter.",
  "Negotiate from evidence rather than emotion today; the numbers you gathered last week do the heavy lifting.",
  "A leadership vacuum is an unadvertised opportunity — volunteer for the problem no one else is touching.",
  "Your best idea arrives while moving, not while staring at the screen. Take the walk.",
  "Deadline pressure is a costume for a prioritisation problem; renegotiate one commitment out loud.",
  "A cross-functional favour creates goodwill in exactly the department you will need next quarter.",
  "Recognition delayed is not recognition denied — the people who matter have already noticed.",
  "Document the win before you chase the next one; future-you is negotiating on this month's evidence.",
];

const WELLBEING = [
  "Water and daylight are the two cheapest upgrades on offer today; stack them into the same short break.",
  "Your nervous system votes for fewer inputs after lunch — give it a quiet window and better decisions follow.",
  "A stretching, sweeping or sorting task doubles as meditation; order outside settles the inside.",
  "The evening rewards an early wind-down rather than a late scroll; tomorrow's sharpness is bought tonight.",
  "Fresh air before the first meeting sets a calmer baseline for the entire day.",
  "Resist the urge to problem-solve at full speed after 6pm; write it down and let the morning edit it.",
  "A body that has been signalling stiffness wants twenty minutes of movement it actually enjoys.",
  "Generosity refuels you today — a small, concrete kindness is the quickest route out of your own head.",
  "Your sleep debt is louder than your ambition this week; one early night steadies every other habit.",
  "A digital sunset improves your dreams more than any productivity hack on your feed.",
];

const ONE_LINERS = [
  "Say the calm thing before the clever thing.",
  "Close one loop before opening another.",
  "Your patience is currency today — spend it wisely.",
  "A delayed yes is better than a rushed no.",
  "Let actions, not anxiety, set the pace.",
  "The second invitation is where the magic hides.",
  "Clear the small thing first; the big thing softens.",
  "Listen for the clue beneath the complaint.",
  "Protect one hour that belongs only to you.",
  "Kindness to your future self is today's assignment.",
  "Move your body before you move your mouth.",
  "Name what you need before you resent being asked.",
  "Finish what Friday started and the weekend opens up.",
  "Trust the plan you wrote on a calmer day.",
];

const LOVE_LINES = [
  "Warmth returns through a message you read twice.",
  "Vulnerability, carefully timed, deepens trust.",
  "A shared practical task sparks unexpected closeness.",
  "Speak the softer version of the harder truth.",
  "Someone loyal is quietly in your corner — acknowledge them.",
  "Singles meet promise near music, travel or a shared table.",
  "Old friction eases when you lead with appreciation.",
  "Presence beats presents tonight; put the phone face-down.",
];

const CAREER_LINES = [
  "Your reliability is being noticed above the noise.",
  "Volunteer for the problem everyone is circling.",
  "An informal opening precedes the formal opportunity.",
  "Negotiate with evidence, and let the numbers speak.",
  "A side conversation holds the main answer.",
  "Document the win before chasing the next one.",
  "The shortcut lives inside a colleague's complaint.",
  "Walk while you brainstorm — the idea is in your feet.",
];

const MONEY_LINES = [
  "A small recurring saving matters more than a big gesture.",
  "Check the subscription list before the statement arrives.",
  "A delayed quote improves if you wait one more day.",
  "Splitting a cost with a trusted person doubles the benefit.",
  "An old invoice or refund deserves a five-minute chase.",
  "Resist the flash purchase; the researched one rewards you.",
  "Money talks best today through a written plan, not a mood.",
  "A practical upgrade outperforms a flashy one this week.",
];

const WELLNESS_LINES = [
  "Stack water and daylight into one short break.",
  "Twenty minutes of movement you enjoy clears the fog.",
  "Wind down early; the morning rewards you.",
  "Sorting a physical space settles a busy mind.",
  "Take the call walking if you can.",
  "A quiet lunch beats a working lunch today.",
  "Breathe slowly before the difficult reply.",
  "One early night steadies every other habit.",
];

const WEEKLY_THEMES = [
  "Consolidation over expansion",
  "Honest conversations",
  "Money in, clutter out",
  "Rebuilding the routine",
  "Visible rewards for invisible work",
  "Home and heart take priority",
  "Networking that actually nourishes",
  "A week to trust your timing",
  "Small repairs, big relief",
  "Brave asks and softer boundaries",
  "Planning, planting and patience",
  "Reclaiming your energy",
];

const MOODS = [
  "Focused", "Upbeat", "Magnetic", "Reflective", "Adventurous", "Grounded",
  "Charismatic", "Serene", "Determined", "Playful", "Intuitive", "Sociable",
  "Centred", "Optimistic",
];

const COLORS: { name: string; hex: string }[] = [
  { name: "Crimson", hex: "#dc2626" },
  { name: "Sunflower gold", hex: "#d4a017" },
  { name: "Ocean teal", hex: "#0f766e" },
  { name: "Royal blue", hex: "#1d4ed8" },
  { name: "Violet", hex: "#7c3aed" },
  { name: "Rose", hex: "#be185d" },
  { name: "Emerald", hex: "#047857" },
  { name: "Amber", hex: "#b45309" },
  { name: "Slate", hex: "#334155" },
  { name: "Coral", hex: "#e0533d" },
  { name: "Lavender", hex: "#8b5cf6" },
  { name: "Forest green", hex: "#166534" },
];

const POWER_TIMES = [
  "just after sunrise",
  "over the mid-morning tea break",
  "between 1pm and 3pm",
  "at golden hour",
  "before your first meeting",
  "in the quiet after supper",
  "over the lunch-hour walk",
  "as the working day winds down",
];

/* ------------------------------- PRNG engine ------------------------------- */

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rng: () => number, pool: T[]): T {
  return pool[Math.floor(rng() * pool.length)];
}

function pickUnique<T>(rng: () => number, pool: T[], n: number): T[] {
  const copy = [...pool];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

/* --------------------------------- Reading --------------------------------- */

export type StarRatings = {
  love: number;
  career: number;
  money: number;
  wellness: number;
};

export type HoroscopeReading = {
  sign: ZodiacSign;
  offset: number;
  dateKey: string;
  dateLabel: string;
  longDate: string;
  oneLiner: string;
  overview: string;
  loveLine: string;
  careerLine: string;
  moneyLine: string;
  wellnessLine: string;
  ratings: StarRatings;
  mood: string;
  luckyColor: { name: string; hex: string };
  powerTime: string;
  compatible: ZodiacSign;
  luckyNumbers: number[];
};

function rating(rng: () => number): number {
  const r = rng();
  if (r < 0.12) return 3;
  if (r < 0.55) return 4;
  return 5;
}

export function getReading(sign: ZodiacSign, offset = 0): HoroscopeReading {
  const dateKey = saDateKey(offset);
  const rng = mulberry32(hashString(`${sign.slug}:${dateKey}`));

  const others = SIGNS.filter((s) => s.slug !== sign.slug);
  const compatible = pick(rng, others);
  const numbers = pickUnique(
    rng,
    Array.from({ length: 36 }, (_, i) => i + 1),
    4,
  ).sort((a, b) => a - b);

  const sentences = [
    pick(rng, GENERAL),
    rng() < 0.5 ? pick(rng, LOVE) : pick(rng, WORK),
    pick(rng, WELLBEING),
  ];

  const date = readingDate(offset);

  return {
    sign,
    offset,
    dateKey,
    dateLabel: dayLabel(offset),
    longDate: date.toLocaleDateString("en-ZA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    oneLiner: pick(rng, ONE_LINERS),
    overview: sentences.join(" "),
    loveLine: pick(rng, LOVE_LINES),
    careerLine: pick(rng, CAREER_LINES),
    moneyLine: pick(rng, MONEY_LINES),
    wellnessLine: pick(rng, WELLNESS_LINES),
    ratings: {
      love: rating(rng),
      career: rating(rng),
      money: rating(rng),
      wellness: rating(rng),
    },
    mood: pick(rng, MOODS),
    luckyColor: pick(rng, COLORS),
    powerTime: pick(rng, POWER_TIMES),
    compatible,
    luckyNumbers: numbers,
  };
}

export function getAllReadings(offset = 0): HoroscopeReading[] {
  return SIGNS.map((s) => getReading(s, offset));
}

export type DayNote = {
  offset: number;
  weekday: string;
  dateLabel: string;
  note: string;
  energy: number;
};

export function getWeekAhead(sign: ZodiacSign): {
  theme: string;
  days: DayNote[];
} {
  const rng = mulberry32(hashString(`week:${sign.slug}:${saDateKey(0)}`));
  const days: DayNote[] = Array.from({ length: 7 }, (_, i) => ({
    offset: i,
    weekday: readingDate(i).toLocaleDateString("en-ZA", { weekday: "short" }),
    dateLabel: readingDate(i).toLocaleDateString("en-ZA", {
      day: "numeric",
      month: "short",
    }),
    note: pick(rng, ONE_LINERS),
    energy: 3 + Math.floor(rng() * 3),
  }));
  return { theme: pick(rng, WEEKLY_THEMES), days };
}
