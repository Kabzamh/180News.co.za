/**
 * The 180 Degrees News newsroom — editors, reporters, correspondents and the
 * production desks behind the bylines. Names here match the `author` column
 * on desk articles so bylines link through to profile pages.
 */

export type TeamGroup = "leadership" | "editors" | "reporters" | "production";

export type TeamMember = {
  slug: string;
  /** Must match the article `author` string for bylined journalists/desks. */
  name: string;
  role: string;
  group: TeamGroup;
  beat: string;
  location: string;
  bio: string[];
  email: string;
  twitter?: string;
  linkedin?: string;
  /** Sections this member mostly covers (slugs from CATEGORIES). */
  sections: string[];
  /** Display-only roles (production) don't carry an article archive. */
  archive: boolean;
  accent: string;
};

const EMAIL_DOMAIN = "180degreesnews.co.za";

export const TEAM: TeamMember[] = [
  /* ------------------------------- Leadership ------------------------------ */
  {
    slug: "thandiwe-maseko",
    name: "Thandiwe Maseko",
    role: "Editor-in-Chief",
    group: "leadership",
    beat: "Editorial strategy & standards",
    location: "Johannesburg, Gauteng",
    bio: [
      "Thandiwe Maseko is the founding Editor-in-Chief of 180 Degrees News, with more than two decades across print, broadcast and digital newsrooms in South Africa.",
      "She sets the editorial agenda, chairs the daily news conference and owns the publication's standards, corrections and independence policy.",
    ],
    email: "editor@" + EMAIL_DOMAIN,
    twitter: "thandiwe_ed",
    sections: ["national", "politics"],
    archive: true,
    accent: "#8c0e0e",
  },
  {
    slug: "daniel-naidoo",
    name: "Daniel Naidoo",
    role: "Managing Editor",
    group: "leadership",
    beat: "Newsroom operations & wires",
    location: "Johannesburg, Gauteng",
    bio: [
      "Daniel Naidoo runs the day-to-day newsroom — the diary, the wire desk, rosters and publishing — and coordinates correspondents across all nine provinces.",
      "He previously led digital desks at two major national titles and is the guardian of the 180° publishing speed-and-accuracy standard.",
    ],
    email: "managingeditor@" + EMAIL_DOMAIN,
    sections: ["national"],
    archive: true,
    accent: "#8c0e0e",
  },
  {
    slug: "zanele-khumalo",
    name: "Zanele Khumalo",
    role: "Head of Digital & Audience",
    group: "leadership",
    beat: "Product, newsletters, social & data",
    location: "Cape Town, Western Cape",
    bio: [
      "Zanele Khumalo leads digital product, the morning briefing newsletter, audience growth and the platforms that carry 180° reporting to readers.",
    ],
    email: "digital@" + EMAIL_DOMAIN,
    sections: ["technology"],
    archive: false,
    accent: "#8c0e0e",
  },

  /* -------------------------------- Editors -------------------------------- */
  {
    slug: "lerato-mokoena",
    name: "Lerato Mokoena",
    role: "Politics Editor",
    group: "editors",
    beat: "The Presidency, Parliament, GNU & Gauteng",
    location: "Johannesburg, Gauteng",
    bio: [
      "Lerato Mokoena leads political coverage at 180 Degrees News, from the Union Buildings and Parliament to coalition governments in the metros.",
      "She has covered two administrations, multiple State of the Nation addresses and the making of the Government of National Unity.",
    ],
    email: "lerato@" + EMAIL_DOMAIN,
    twitter: "lerato_politics",
    sections: ["politics", "national"],
    archive: true,
    accent: "#0c1870",
  },
  {
    slug: "ahmed-patel",
    name: "Ahmed Patel",
    role: "Business & Markets Editor",
    group: "editors",
    beat: "Economy, JSE, the rand, energy & mining",
    location: "Sandton, Gauteng",
    bio: [
      "Ahmed Patel edits the business desk and the daily markets update, tracking the rand, the JSE, Eskom, Transnet and the mining and retail sectors.",
      "He is a former financial markets reporter who still gets excited about repo-rate days and quarterly GDP prints.",
    ],
    email: "ahmed@" + EMAIL_DOMAIN,
    twitter: "ahmed_markets",
    sections: ["business", "technology"],
    archive: true,
    accent: "#047857",
  },
  {
    slug: "naledi-dlamini",
    name: "Naledi Dlamini",
    role: "National News Editor",
    group: "editors",
    beat: "Government, health, disasters & KwaZulu-Natal",
    location: "Durban, KwaZulu-Natal",
    bio: [
      "Naledi Dlamini coordinates national reporters and provincial correspondents, with a focus on service delivery, health policy and disaster response.",
      "Based in Durban, she has led coverage of KwaZulu-Natal's flood disasters and the rollout of the National Health Insurance.",
    ],
    email: "naledi@" + EMAIL_DOMAIN,
    twitter: "naledi_national",
    sections: ["national", "politics", "world"],
    archive: true,
    accent: "#b45309",
  },
  {
    slug: "sipho-nkosi",
    name: "Sipho Nkosi",
    role: "Crime & Courts Editor",
    group: "editors",
    beat: "Policing, justice, labour & Eastern Cape",
    location: "Gqeberha, Eastern Cape",
    bio: [
      "Sipho Nkosi oversees crime, courts and labour coverage, holding power to account from magistrates' courts to commission hearings.",
      "He reports nationwide on safety operations, industrial action and the slow work of rebuilding municipal services in the Eastern Cape.",
    ],
    email: "sipho@" + EMAIL_DOMAIN,
    twitter: "sipho_courts",
    sections: ["national", "business"],
    archive: true,
    accent: "#1f2937",
  },
  {
    slug: "juanre-van-wyk",
    name: "Juanre van Wyk",
    role: "Sport & Entertainment Editor",
    group: "editors",
    beat: "Springboks, Bafana, Proteas, PSL & culture",
    location: "Cape Town, Western Cape",
    bio: [
      "Juanre van Wyk edits sport and entertainment, following the Springboks, Bafana Bafana, the Proteas, the Soweto derby and Mzansi's festival circuit.",
      "From trophy parades to transfer deadline day, he believes South African sport is where the nation tells its best stories.",
    ],
    email: "juanre@" + EMAIL_DOMAIN,
    twitter: "juanre_sport",
    sections: ["sport", "entertainment", "lifestyle"],
    archive: true,
    accent: "#15803d",
  },

  /* ------------------------------ Reporters -------------------------------- */
  {
    slug: "tshepo-malema",
    name: "Tshepo Malema",
    role: "Transport & Municipal Reporter",
    group: "reporters",
    beat: "Taxis, commuter rail, metros & the Free State",
    location: "Bloemfontein, Free State",
    bio: [
      "Tshepo Malema covers public transport and municipal turnaround — taxi industry negotiations, commuter rail, pothole programmes and struggling metros.",
      "He files from the Free State and the country's busiest commuter corridors.",
    ],
    email: "tshepo@" + EMAIL_DOMAIN,
    twitter: "tshepo_transit",
    sections: ["national", "politics", "sport"],
    archive: true,
    accent: "#0e7490",
  },
  {
    slug: "chantel-felix",
    name: "Chantel Felix",
    role: "Education & Western Cape Correspondent",
    group: "reporters",
    beat: "Schools, metros, tech startups & the Western Cape",
    location: "Cape Town, Western Cape",
    bio: [
      "Chantel Felix reports on education, city government and innovation from the Western Cape — from the school calendar to Cape Town's transport expansion and startup scene.",
    ],
    email: "chantel@" + EMAIL_DOMAIN,
    twitter: "chantel_cape",
    sections: ["national", "technology", "lifestyle"],
    archive: true,
    accent: "#1d4ed8",
  },
  {
    slug: "pieter-van-der-merwe",
    name: "Pieter van der Merwe",
    role: "Environment & Northern Cape Correspondent",
    group: "reporters",
    beat: "Water, conservation, agriculture & energy transition",
    location: "Kimberley, Northern Cape",
    bio: [
      "Pieter van der Merwe covers the environment, water security, farming and the just transition — from rhino conservation in the Kruger to solar corridors in the Northern Cape.",
    ],
    email: "pieter@" + EMAIL_DOMAIN,
    twitter: "pieter_env",
    sections: ["national", "business", "lifestyle"],
    archive: true,
    accent: "#0f766e",
  },

  /* ------------------------------ Production ------------------------------- */
  {
    slug: "news-desk",
    name: "News Desk",
    role: "Digital News Desk — 24/7",
    group: "production",
    beat: "Breaking news, wire curation & live blog",
    location: "Johannesburg, Gauteng",
    bio: [
      "The News Desk is the 24/7 heartbeat of 180 Degrees News — curating trusted South African wire feeds, verifying breaking stories and running the Live Wire.",
      "Stories credited to the News Desk are produced collaboratively by the editorial team.",
    ],
    email: "newsroom@" + EMAIL_DOMAIN,
    sections: ["national"],
    archive: true,
    accent: "#475569",
  },
  {
    slug: "lotto-desk",
    name: "Lotto Desk",
    role: "Results & Data Desk",
    group: "production",
    beat: "National Lottery results & market data",
    location: "Johannesburg, Gauteng",
    bio: [
      "The Lotto & Data Desk publishes every Lotto, Lotto Plus, PowerBall, PowerBall Plus and Daily Lotto result, and maintains the markets data pipelines.",
    ],
    email: "data@" + EMAIL_DOMAIN,
    sections: ["lifestyle", "business"],
    archive: true,
    accent: "#7c3aed",
  },
  {
    slug: "kgothatso-modise",
    name: "Kgothatso Modise",
    role: "Multimedia & Photo Editor",
    group: "production",
    beat: "Photography, video & graphics",
    location: "Johannesburg, Gauteng",
    bio: [
      "Kgothatso Modise directs photography, video explainers and data graphics across the site.",
    ],
    email: "multimedia@" + EMAIL_DOMAIN,
    sections: ["entertainment", "sport"],
    archive: false,
    accent: "#be185d",
  },
  {
    slug: "fatima-ismail",
    name: "Fatima Ismail",
    role: "Chief Sub-editor & Standards",
    group: "production",
    beat: "Headlines, copy & corrections",
    location: "Cape Town, Western Cape",
    bio: [
      "Fatima Ismail runs the sub-editing desk — headlines, accuracy, style and the corrections process.",
    ],
    email: "corrections@" + EMAIL_DOMAIN,
    sections: ["national"],
    archive: false,
    accent: "#9333ea",
  },
  {
    slug: "lebogang-sithole",
    name: "Lebogang Sithole",
    role: "Social Media & Trends Producer",
    group: "production",
    beat: "Distribution, alerts & community",
    location: "Durban, KwaZulu-Natal",
    bio: [
      "Lebogang Sithole produces breaking alerts and distributes 180° reporting across social platforms and the morning briefing.",
    ],
    email: "audience@" + EMAIL_DOMAIN,
    sections: ["entertainment", "technology"],
    archive: false,
    accent: "#ea580c",
  },
  {
    slug: "celeste-abrahams",
    name: "Celeste Abrahams",
    role: "Horoscopes & Lifestyle Columnist",
    group: "production",
    beat: "The daily stars, numerology & the zodiac",
    location: "Cape Town, Western Cape",
    bio: [
      "Celeste Abrahams writes the 180° daily horoscopes, blending traditional astrology with a practical, South African take on love, work and wellbeing.",
      "She also compiles the weekly outlook and the lucky-number feature that readers compare with the Daily Lotto draw.",
    ],
    email: "stars@" + EMAIL_DOMAIN,
    twitter: "celeste_stars",
    sections: ["lifestyle", "entertainment"],
    archive: false,
    accent: "#7c3aed",
  },
];

export const TEAM_MAP: Record<string, TeamMember> = Object.fromEntries(
  TEAM.map((m) => [m.slug, m]),
);

/** Map an article `author` string to a team member (byline linking). */
export const TEAM_BY_NAME: Record<string, TeamMember> = Object.fromEntries(
  TEAM.map((m) => [m.name, m]),
);

export const TEAM_GROUPS: {
  slug: TeamGroup;
  title: string;
  blurb: string;
}[] = [
  {
    slug: "leadership",
    title: "Leadership",
    blurb: "The editors responsible for the whole newsroom and its standards.",
  },
  {
    slug: "editors",
    title: "Desk Editors",
    blurb: "Journalists who own each section and set the daily agenda.",
  },
  {
    slug: "reporters",
    title: "Reporters & Correspondents",
    blurb: "On the ground in every province, from metros to municipalities.",
  },
  {
    slug: "production",
    title: "Digital & Production Desk",
    blurb: "Breaking news, results, data, pictures, sub-editing and distribution.",
  },
];
