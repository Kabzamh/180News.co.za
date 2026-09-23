/** South African video channels and podcast shows aggregated by 180°. */

export type YoutubeChannel = {
  id: string;
  name: string;
  category: string;
  handle: string;
};

export const YOUTUBE_CHANNELS: YoutubeChannel[] = [
  {
    id: "UC8yH-uI81UUtEMDsowQyx1g",
    name: "SABC News",
    category: "national",
    handle: "@sabcdigitalnews",
  },
  {
    id: "UCI3RT5PGmdi1KVp9FG_CneA",
    name: "eNCA",
    category: "national",
    handle: "@encanews",
  },
  {
    id: "UCQMML3hAsx-Mz9j9ZN0tThQ",
    name: "Newzroom Afrika",
    category: "national",
    handle: "@NewzroomAfrika405",
  },
  {
    id: "UC7CXDA7ZCU9Od6qzQr6phww",
    name: "Eyewitness News",
    category: "national",
    handle: "@EWNupdates",
  },
  {
    id: "UC0CM9l-7mgfD78xkr_0x_-A",
    name: "Daily Maverick",
    category: "politics",
    handle: "@DailyMaverickSA",
  },
  {
    id: "UCsba91UGiQLFOb5DN3Z_AdQ",
    name: "CNBC Africa",
    category: "business",
    handle: "@cnbcafrica",
  },
  {
    id: "UCMeYPU1YfXjxsUa6QXWsfjg",
    name: "CGTN Africa",
    category: "world",
    handle: "@cgtnafrica",
  },
];

export type PodcastShow = {
  name: string;
  url: string;
  category: string;
};

export const PODCASTS: PodcastShow[] = [
  {
    name: "BizNews Radio",
    url: "https://iono.fm/rss/chan/4829",
    category: "business",
  },
  {
    name: "Business Day Spotlight",
    url: "https://rss.iono.fm/rss/chan/3799",
    category: "business",
  },
  {
    name: "The Daily Friend Show",
    url: "https://rss.iono.fm/rss/chan/4377",
    category: "politics",
  },
  {
    name: "Central News South Africa",
    url: "https://feed.podbean.com/Centralnews/feed.xml",
    category: "national",
  },
  {
    name: "Q&A with South Africa's party leaders",
    url: "https://rss.iono.fm/rss/chan/8637",
    category: "politics",
  },
  {
    name: "Pasha — The Conversation Africa",
    url: "https://theconversation.com/africa/podcasts/pasha-theconversation-africa.rss",
    category: "world",
  },
  {
    name: "East Coast Radio Newswatch",
    url: "https://rss.iono.fm/rss/chan/1928",
    category: "national",
  },
];

/** Extract an 11-character YouTube video id from any common URL shape. */
export function parseYouTubeId(input: string): string | null {
  const v = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(v)) return v;
  try {
    const url = new URL(v);
    if (url.hostname.includes("youtu.be")) {
      return url.pathname.slice(1, 12) || null;
    }
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const embed = url.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (embed) return embed[1];
    const shorts = url.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
    if (shorts) return shorts[1];
  } catch {
    return null;
  }
  return null;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function parseDurationToSeconds(text: string | undefined): number | null {
  if (!text) return null;
  const parts = text.trim().split(":").map(Number);
  if (parts.some(Number.isNaN)) return null;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

export function formatDuration(sec: number | null | undefined): string {
  if (!sec || sec <= 0) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
