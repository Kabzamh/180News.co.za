/**
 * Site taxonomy: sections, provinces/regions and the curated list of
 * South African RSS feeds ingested by the platform.
 */

export const SITE = {
  name: "180 Degrees News",
  shortName: "180° News",
  tagline: "South Africa's complete view of the news",
  description:
    "180 Degrees News brings you national, provincial, regional and local South African news — politics, business, sport, technology and more, 24/7.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  adminKey: process.env.CRON_SECRET || "180news-desk-key",
  twitterHandle: "@180degnews",
  email: "newsroom@180degreesnews.co.za",
  social: {
    facebook: "https://www.facebook.com/180DegreesNewsSA",
    x: "https://x.com/180degnews",
    instagram: "https://www.instagram.com/180degreesnews",
    youtube: "https://www.youtube.com/@180DegreesNews",
    linkedin: "https://www.linkedin.com/company/180-degrees-news",
    tiktok: "https://www.tiktok.com/@180degreesnews",
    whatsapp: "https://whatsapp.com/channel/180degreesnews",
  } as const,
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  color: string; // tailwind-ish hex used for badges
  blurb: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "national",
    name: "South Africa",
    short: "SA News",
    color: "#8c0e0e",
    blurb:
      "Breaking national news from across South Africa — government, the economy, society and the stories shaping Mzansi.",
  },
  {
    slug: "politics",
    name: "Politics",
    short: "Politics",
    color: "#0c1870",
    blurb:
      "Parliament, the Presidency, political parties, elections and policy from across South Africa.",
  },
  {
    slug: "business",
    name: "Business",
    short: "Business",
    color: "#047857",
    blurb:
      "Markets, the rand, JSE, energy, mining, retail and the business stories moving South Africa.",
  },
  {
    slug: "sport",
    name: "Sport",
    short: "Sport",
    color: "#15803d",
    blurb:
      "Springboks, Bafana Bafana, Proteas, the Soweto derby, boxing, athletics and all South African sport.",
  },
  {
    slug: "technology",
    name: "Technology",
    short: "Tech",
    color: "#1d4ed8",
    blurb:
      "Telecoms, gadgets, AI, startups, data and the technology transforming South Africa.",
  },
  {
    slug: "entertainment",
    name: "Entertainment",
    short: "Ent & Lifestyle",
    color: "#be185d",
    blurb:
      "Local music, film, celebrities, festivals, culture and the South African entertainment scene.",
  },
  {
    slug: "lifestyle",
    name: "Lifestyle",
    short: "Lifestyle",
    color: "#0e7490",
    blurb: "Travel, food, motoring, property, health and everyday living in SA.",
  },
  {
    slug: "world",
    name: "World & Africa",
    short: "World",
    color: "#b45309",
    blurb:
      "Southern Africa, the continent and global news with a South African perspective.",
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export type Province = {
  slug: string;
  name: string;
  capital: string;
  blurb: string;
  centres: string[];
};

export const PROVINCES: Province[] = [
  {
    slug: "gauteng",
    name: "Gauteng",
    capital: "Johannesburg",
    blurb:
      "Johannesburg, Pretoria/Tshwane, Ekurhuleni and the Vaal — the economic heartbeat of South Africa.",
    centres: [
      "City of Johannesburg",
      "City of Tshwane (Pretoria)",
      "Ekurhuleni",
      "Sedibeng",
      "West Rand",
    ],
  },
  {
    slug: "western-cape",
    name: "Western Cape",
    capital: "Cape Town",
    blurb:
      "Cape Town, the Cape Winelands, Garden Route and West Coast news.",
    centres: [
      "City of Cape Town",
      "Cape Winelands",
      "Garden Route",
      "Overberg",
      "West Coast",
      "Central Karoo",
    ],
  },
  {
    slug: "kwazulu-natal",
    name: "KwaZulu-Natal",
    capital: "Pietermaritzburg",
    blurb: "Durban, Pietermaritzburg, the North and South Coast and Zululand.",
    centres: [
      "eThekwini (Durban)",
      "Msunduzi (Pietermaritzburg)",
      "uMgungundlovu",
      "King Cetshwayo",
      "Amajuba",
    ],
  },
  {
    slug: "eastern-cape",
    name: "Eastern Cape",
    capital: "Bhisho",
    blurb: "Gqeberha, East London, Mthatha, Makhanda and the Wild Coast.",
    centres: [
      "Nelson Mandela Bay (Gqeberha)",
      "Buffalo City (East London)",
      "OR Tambo (Mthatha)",
      "Sarah Baartman (Makhanda)",
      "Chris Hani",
    ],
  },
  {
    slug: "free-state",
    name: "Free State",
    capital: "Bloemfontein",
    blurb: "Mangaung, Lejweleputswa, Thabo Mofutsanyana and the goldfields.",
    centres: [
      "Mangaung (Bloemfontein)",
      "Lejweleputswa (Welkom)",
      "Fezile Dabi",
      "Thabo Mofutsanyana",
    ],
  },
  {
    slug: "limpopo",
    name: "Limpopo",
    capital: "Polokwane",
    blurb: "Polokwane, Tzaneen, Vhembe, Waterberg and the Kruger frontier.",
    centres: [
      "Capricorn (Polokwane)",
      "Vhembe (Thohoyandou)",
      "Mopani (Tzaneen)",
      "Waterberg (Lephalale)",
      "Sekhukhune",
    ],
  },
  {
    slug: "mpumalanga",
    name: "Mpumalanga",
    capital: "Mbombela",
    blurb: "Mbombela, eMalahleni, the Highveld, Escarpment and Kruger Park.",
    centres: [
      "City of Mbombela",
      "Nkangala (eMalahleni)",
      "Gert Sibande (Ermelo)",
      "Ehlanzeni",
    ],
  },
  {
    slug: "north-west",
    name: "North West",
    capital: "Mahikeng",
    blurb: "Rustenburg, Mahikeng, Potchefstroom and the platinum belt.",
    centres: [
      "Bojanala (Rustenburg)",
      "Ngaka Modiri Molema (Mahikeng)",
      "Dr Kenneth Kaunda (Potchefstroom)",
      "Dr Ruth Segomotsi Mompati",
    ],
  },
  {
    slug: "northern-cape",
    name: "Northern Cape",
    capital: "Kimberley",
    blurb: "Kimberley, Upington, the Kalahari, Namaqualand and the Karoo.",
    centres: [
      "Sol Plaatje (Kimberley)",
      "ZF Mgcawu (Upington)",
      "Namakwa (Springbok)",
      "John Taolo Gaetsewe (Kuruman)",
      "Pixley ka Seme (De Aar)",
    ],
  },
];

export const PROVINCE_MAP: Record<string, Province> = Object.fromEntries(
  PROVINCES.map((p) => [p.slug, p]),
);

/**
 * Keyword index used to geotag ingested RSS items to a province/region by
 * scanning their headline and summary.
 */
export const PROVINCE_KEYWORDS: {
  slug: string;
  region?: string;
  words: string[];
}[] = [
  {
    slug: "gauteng",
    region: "City of Johannesburg",
    words: [
      "johannesburg",
      "joburg",
      "jozi",
      "sandton",
      "soweto",
      "alexandra",
      "midrand",
      "randburg",
      "roodepoort",
    ],
  },
  {
    slug: "gauteng",
    region: "City of Tshwane (Pretoria)",
    words: ["pretoria", "tshwane", "centurion", "mamelodi", "atteridgeville"],
  },
  {
    slug: "gauteng",
    region: "Ekurhuleni",
    words: [
      "ekurhuleni",
      "germiston",
      "benoni",
      "boksburg",
      "kempton park",
      "daveyton",
      "tembisa",
      "thokoza",
      "vanderbijlpark",
      "vereeniging",
      "vaal",
    ],
  },
  {
    slug: "western-cape",
    region: "City of Cape Town",
    words: [
      "cape town",
      "capetown",
      "kaapstad",
      "khayelitsha",
      "mitchells plain",
      "kraaifontein",
      "table mountain",
      "muizenberg",
      "hout bay",
      "bellville",
    ],
  },
  {
    slug: "western-cape",
    region: "Cape Winelands",
    words: ["stellenbosch", "paarl", "franschhoek", "breede valley"],
  },
  {
    slug: "western-cape",
    region: "Garden Route",
    words: ["mossel bay", "knysna", "oudtshoorn", "garden route", "plettenberg", "george airport"],
  },
  {
    slug: "kwazulu-natal",
    region: "eThekwini (Durban)",
    words: [
      "durban",
      "ethekwini",
      "umhlanga",
      "chatsworth",
      "phoenix",
      "kwa mashu",
      "umlazi",
      "ballito",
      "north coast",
      "south coast",
    ],
  },
  {
    slug: "kwazulu-natal",
    region: "Msunduzi (Pietermaritzburg)",
    words: ["pietermaritzburg", "msunduzi", "edendale", "midlands"],
  },
  {
    slug: "kwazulu-natal",
    region: "King Cetshwayo",
    words: ["richards bay", "empangeni", "ulundi", "zululand", "amajuba", "dannhauser"],
  },
  {
    slug: "eastern-cape",
    region: "Nelson Mandela Bay (Gqeberha)",
    words: ["gqeberha", "port elizabeth", "nelson mandela bay", "uytenhage", "kariega"],
  },
  {
    slug: "eastern-cape",
    region: "Buffalo City (East London)",
    words: ["east london", "buffalo city", "mdantsane", "gonubie"],
  },
  {
    slug: "eastern-cape",
    region: "OR Tambo (Mthatha)",
    words: ["mthatha", "umtata", "or tambo", "wild coast", "libode", "ngcobo"],
  },
  {
    slug: "eastern-cape",
    region: "Sarah Baartman (Makhanda)",
    words: ["makhanda", "grahamstown", "sarah baartman", "queenstown", "lokotwa"],
  },
  {
    slug: "free-state",
    region: "Mangaung (Bloemfontein)",
    words: ["bloemfontein", "mangaung", "botshabelo", "thaba nchu"],
  },
  {
    slug: "free-state",
    region: "Lejweleputswa (Welkom)",
    words: ["welkom", "kroonstad", "goldfields", "matjhabeng", "sasolburg", "reitz"],
  },
  {
    slug: "limpopo",
    region: "Capricorn (Polokwane)",
    words: ["polokwane", "pietersburg", "seshego", "mankweng"],
  },
  {
    slug: "limpopo",
    region: "Vhembe (Thohoyandou)",
    words: ["thohoyandou", "vhembe", "sibasa", "musina", "tshisumbu"],
  },
  {
    slug: "limpopo",
    region: "Mopani (Tzaneen)",
    words: ["tzaneen", "mopani", "giyani", "phalaborwa", "letaba"],
  },
  {
    slug: "limpopo",
    region: "Waterberg (Lephalale)",
    words: ["lephalale", "ellisras", "waterberg", "modimolle", "mokopane", "potgietersrus"],
  },
  {
    slug: "mpumalanga",
    region: "City of Mbombela",
    words: ["mbombela", "nelspruit", "white river", "hlazyane", "ehlanzeni"],
  },
  {
    slug: "mpumalanga",
    region: "Nkangala (eMalahleni)",
    words: [
      "emalahleni",
      "witbank",
      "middelburg",
      "nkangala",
      "secunda",
      "ermelo",
      "phola",
    ],
  },
  {
    slug: "north-west",
    region: "Bojanala (Rustenburg)",
    words: ["rustenburg", "bojanala", "marikana", "brits", "mooinooi"],
  },
  {
    slug: "north-west",
    region: "Ngaka Modiri Molema (Mahikeng)",
    words: ["mahikeng", "mafikeng", "ngaka modiri molema", "lichtenburg"],
  },
  {
    slug: "north-west",
    region: "Dr Kenneth Kaunda (Potchefstroom)",
    words: ["potchefstroom", "klerksdorp", "ventersdorp", "coligny"],
  },
  {
    slug: "northern-cape",
    region: "Sol Plaatje (Kimberley)",
    words: ["kimberley", "sol plaatje", "galeshewe"],
  },
  {
    slug: "northern-cape",
    region: "ZF Mgcawu (Upington)",
    words: ["upington", "zf mgcawu", "namaqualand", "kathu", "de aar", "kuruman", "calvinia"],
  },
];

/** Keyword index for section categorisation of national wire stories. */
export const CATEGORY_KEYWORDS: { slug: string; words: string[] }[] = [
  {
    slug: "sport",
    words: [
      "rugby",
      "springbok",
      "bafana",
      "cricket",
      "proteas",
      "soccer",
      "football",
      "kaizer chiefs",
      "orlando pirates",
      "sundowns",
      "boxing",
      "golf",
      "tennis",
      "athletics",
      "olympic",
      "supersport",
      "psl",
      "test match",
      "t20",
      "world cup",
      "coach",
      "captain",
      "goal",
      "match",
    ],
  },
  {
    slug: "business",
    words: [
      "rand",
      "jse",
      "market",
      "economy",
      "economic",
      "interest rate",
      "repo rate",
      "reserve bank",
      "inflation",
      "fuel price",
      "petrol price",
      "eskom",
      "load shedding",
      "loadshedding",
      "load-shedding",
      "transnet",
      "mine",
      "mining",
      "platinum",
      "gold",
      "coal",
      "business",
      "investors",
      "shares",
      "trade",
      "gdp",
      "treasury",
      "tax",
      "sars",
      "bank",
      "retail",
      "consumer",
      "unemployment",
    ],
  },
  {
    slug: "politics",
    words: [
      "anc",
      "da ",
      "eff",
      "mk party",
      "ifp",
      "actionsa",
      "cope",
      "parliament",
      "president",
      "deputy president",
      "minister",
      "cabinet",
      "election",
      "coalition",
      "gnu",
      "speaker",
      "mps",
      "premier",
      "mayor",
      "municipal",
      "state of the nation",
      "songa",
      "national assembly",
      "opposition",
      "secretary-general",
    ],
  },
  {
    slug: "technology",
    words: [
      "technology",
      "tech",
      "artificial intelligence",
      " ai ",
      "app",
      "software",
      "internet",
      "data",
      "fibre",
      "fiber",
      "telecom",
      "vodacom",
      "mtn",
      "telkom",
      "cell c",
      "microsoft",
      "google",
      "apple",
      "iphone",
      "samsung",
      "startup",
      "cyber",
      "hack",
      "broadband",
      "network",
      "semiconductor",
    ],
  },
  {
    slug: "entertainment",
    words: [
      "music",
      "song",
      "album",
      "film",
      "movie",
      "netflix",
      "celebrity",
      "idols",
      "big brother",
      "grammy",
      "sama",
      "festival",
      "actor",
      "actress",
      "singer",
      "rapper",
      "dj ",
      "concert",
      "showmax",
      "theatre",
    ],
  },
  {
    slug: "world",
    words: [
      "united states",
      "america",
      "trump",
      "china",
      "russia",
      "ukraine",
      "europe",
      "britain",
      "united kingdom",
      "israel",
      "gaza",
      "india",
      "brazil",
      "nigeria",
      "kenya",
      "zimbabwe",
      "mozambique",
      "botswana",
      "namibia",
      "zambia",
      "malawi",
      "lesotho",
      "eswatini",
      "african union",
      "sadc",
      "un ",
      "nato",
      "global",
      "abroad",
    ],
  },
];

/** Curated South African RSS feeds. */
export type RssSourceDef = {
  name: string;
  url: string;
  category: string;
  province?: string;
};

export const RSS_SOURCES: RssSourceDef[] = [
  {
    name: "News24 — Top Stories",
    url: "http://feeds.news24.com/articles/news24/TopStories/rss",
    category: "national",
  },
  {
    name: "News24 — South Africa",
    url: "http://feeds.news24.com/articles/news24/SouthAfrica/rss",
    category: "national",
  },
  {
    name: "Eyewitness News",
    url: "https://ewn.co.za/RSS%20Feeds/Latest%20News",
    category: "national",
  },
  {
    name: "SABC News",
    url: "https://www.sabcnews.com/sabcnews/feed/",
    category: "national",
  },
  {
    name: "The Citizen",
    url: "https://citizen.co.za/feed/",
    category: "national",
  },
  {
    name: "Daily Maverick",
    url: "https://www.dailymaverick.co.za/dmrss/",
    category: "national",
  },
  {
    name: "IOL",
    url: "https://rss.iol.io/iol/news",
    category: "national",
  },
  {
    name: "TimesLIVE",
    url: "https://www.timeslive.co.za/rss/",
    category: "national",
  },
  {
    name: "SowetanLIVE",
    url: "https://www.sowetanlive.co.za/rss/?publication=sowetan-live",
    category: "national",
  },
  {
    name: "The South African",
    url: "https://www.thesouthafrican.com/feed/",
    category: "national",
  },
  {
    name: "BusinessTech",
    url: "https://businesstech.co.za/news/feed/",
    category: "business",
  },
  {
    name: "Moneyweb",
    url: "https://www.moneyweb.co.za/feed/",
    category: "business",
  },
  {
    name: "BusinessLIVE",
    url: "https://www.businesslive.co.za/rss/",
    category: "business",
  },
  {
    name: "TechCentral",
    url: "https://techcentral.co.za/feed",
    category: "technology",
  },
  {
    name: "MyBroadband",
    url: "https://mybroadband.co.za/news/feed",
    category: "technology",
  },
  {
    name: "News24 — Sport",
    url: "http://feeds.news24.com/articles/sport/sport/rss",
    category: "sport",
  },
  {
    name: "Channel24",
    url: "http://feeds.news24.com/articles/channel/topstories/rss",
    category: "entertainment",
  },
  {
    name: "Africanews",
    url: "https://www.africanews.com/feed/rss/en",
    category: "world",
  },
];
