import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { iecSnapshots, iecUpdates, type IecUpdate } from "@/db/schema";

export type PartyResult = {
  abbr: string;
  name: string;
  percent: number;
  votes: number;
  wards: number;
  color: string;
};

export type ByElectionWard = {
  wardId: number;
  municipality: string;
  province: string;
  winner?: string;
  winnerParty?: string;
  candidates: Array<{ name: string; party: string; partyName: string }>;
};

export type LiveElection = {
  eventName: string;
  eventId: number | null;
  registeredVoters: number;
  votesCast: number;
  validVotes: number;
  spoiltVotes: number;
  turnout: number;
  parties: PartyResult[];
  wards: ByElectionWard[];
  timetable: Array<{ entry: string; date: string }>;
  sourceUrl: string;
  fetchedAt: string;
  live: boolean;
};

export type CertifiedParty = {
  abbr: string;
  name: string;
  percent: number;
  votes: number;
  seats: number;
  color: string;
};

export type ElectionDesk = {
  live: LiveElection;
  certified2024: {
    title: string;
    date: string;
    registeredVoters: number;
    turnout: number;
    votesCast: number;
    parties: CertifiedParty[];
    provinces: Array<{ name: string; leader: string; percent: number }>;
    sourceUrl: string;
  };
  updates: Array<{
    id: number;
    headline: string;
    detail: string;
    eventName: string;
    createdAt: string;
  }>;
  lastUpdated: string;
};

const PARTY_COLORS: Record<string, string> = {
  ANC: "#006600",
  DA: "#005BA6",
  EFF: "#BB0000",
  MK: "#111111",
  IFP: "#CC0000",
  PA: "#E36C09",
  "VF PLUS": "#FF6600",
  "VF+": "#FF6600",
  ACTIONSA: "#00AEEF",
  ACDP: "#1B4F72",
  UDM: "#F4D03F",
  ATM: "#7D3C98",
};

const CERTIFIED_2024: ElectionDesk["certified2024"] = {
  title: "National and Provincial Elections 2024",
  date: "29 May 2024 · Results certified 2 June 2024",
  registeredVoters: 27782081,
  turnout: 58.64,
  votesCast: 16416664,
  sourceUrl: "https://results.elections.org.za/dashboards/npe/",
  parties: [
    { abbr: "ANC", name: "African National Congress", percent: 40.18, votes: 6459683, seats: 159, color: "#006600" },
    { abbr: "DA", name: "Democratic Alliance", percent: 21.81, votes: 3505805, seats: 87, color: "#005BA6" },
    { abbr: "MK", name: "uMkhonto weSizwe Party", percent: 14.58, votes: 2344309, seats: 58, color: "#111111" },
    { abbr: "EFF", name: "Economic Freedom Fighters", percent: 9.52, votes: 1529961, seats: 39, color: "#BB0000" },
    { abbr: "IFP", name: "Inkatha Freedom Party", percent: 3.85, votes: 618207, seats: 17, color: "#CC0000" },
    { abbr: "PA", name: "Patriotic Alliance", percent: 2.06, votes: 330425, seats: 9, color: "#E36C09" },
    { abbr: "VF+", name: "Freedom Front Plus", percent: 1.36, votes: 218850, seats: 6, color: "#FF6600" },
    { abbr: "ActionSA", name: "ActionSA", percent: 1.2, votes: 192373, seats: 6, color: "#00AEEF" },
    { abbr: "ACDP", name: "African Christian Democratic Party", percent: 0.6, votes: 96575, seats: 3, color: "#1B4F72" },
    { abbr: "UDM", name: "United Democratic Movement", percent: 0.49, votes: 78448, seats: 3, color: "#C9A227" },
  ],
  provinces: [
    { name: "Western Cape", leader: "DA", percent: 55.38 },
    { name: "KwaZulu-Natal", leader: "MK", percent: 45.35 },
    { name: "Gauteng", leader: "ANC", percent: 34.76 },
    { name: "Eastern Cape", leader: "ANC", percent: 62.16 },
    { name: "Free State", leader: "ANC", percent: 51.87 },
    { name: "Limpopo", leader: "ANC", percent: 73.3 },
    { name: "Mpumalanga", leader: "ANC", percent: 51.15 },
    { name: "North West", leader: "ANC", percent: 57.73 },
    { name: "Northern Cape", leader: "ANC", percent: 49.34 },
  ],
};

let memoryCache: { at: number; desk: ElectionDesk } | null = null;
const LIVE_CACHE_MS = 45 * 1000;

function partyColor(abbr: string) {
  return PARTY_COLORS[abbr.toUpperCase()] ?? "#0b2f8a";
}

function decode(value: string) {
  return value
    .replace(/&#160;/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function parseSaNumber(value: string) {
  const cleaned = decode(value).replace(/[^\d,.-]/g, "").trim();
  if (!cleaned) return 0;
  if (cleaned.includes(",") && !cleaned.includes(".")) {
    return Number(cleaned.replace(/\s/g, "").replace(",", "."));
  }
  return Number(cleaned.replace(/\s/g, "").replace(/,/g, ""));
}

function extractBetween(html: string, startId: string) {
  const start = html.indexOf(startId);
  if (start < 0) return "";
  return html.slice(start, start + 700);
}

function parseHomeResults(html: string): LiveElection {
  const eventMatch = html.match(/(\d{1,2}\s+\w+\s+\d{4}\s+By-Election)/i);
  const eventName = eventMatch?.[1] ?? "Current IEC by-election";

  const h3s = [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map((match) =>
    decode(match[1]).replace(/<[^>]+>/g, "").trim(),
  );

  const parties: PartyResult[] = [];
  for (let index = 0; index < h3s.length; index += 1) {
    const abbr = h3s[index];
    if (!/^[A-Z+]{2,10}$/.test(abbr) && !["VF+", "PA", "MK"].includes(abbr)) continue;
    const percentText = h3s[index + 1] ?? "";
    if (!percentText.includes("%")) continue;
    parties.push({
      abbr,
      name: abbr,
      percent: parseSaNumber(percentText),
      votes: parseSaNumber(h3s[index + 2] ?? "0"),
      wards: parseSaNumber(h3s[index + 3] ?? "0"),
      color: partyColor(abbr),
    });
  }

  const uniqueParties = parties.filter(
    (party, index, list) => list.findIndex((row) => row.abbr === party.abbr) === index,
  );

  const registered = parseSaNumber(extractBetween(html, "Registered population").match(/>([\d&#;\s]+)</)?.[1] ?? "0");
  const votesCast = parseSaNumber(extractBetween(html, "Total votes cast").match(/>([\d&#;\s]+)</)?.[1] ?? "0");
  const validVotes = parseSaNumber(extractBetween(html, "Total valid votes").match(/>([\d&#;\s]+)</)?.[1] ?? "0");
  const spoiltVotes = parseSaNumber(extractBetween(html, "Spoilt votes").match(/>([\d&#;\s]+)</)?.[1] ?? "0");
  const numericH3s = h3s.filter((value) => /^[\d\s\u00a0.,]+$/.test(value));

  return {
    eventName,
    eventId: 1935,
    registeredVoters: registered || parseSaNumber(numericH3s.at(-4) ?? "0"),
    votesCast: votesCast || parseSaNumber(numericH3s.at(-3) ?? "0"),
    validVotes: validVotes || parseSaNumber(numericH3s.at(-2) ?? "0"),
    spoiltVotes: spoiltVotes || parseSaNumber(numericH3s.at(-1) ?? "0"),
    turnout: 0,
    parties: uniqueParties,
    wards: [],
    timetable: [],
    sourceUrl: "https://results.elections.org.za/home/",
    fetchedAt: new Date().toISOString(),
    live: true,
  };
}

function readHiddenJson<T>(html: string, id: string): T | null {
  const match = html.match(new RegExp(`id="${id}"[^>]*value="([^"]*)"`));
  if (!match) return null;
  try {
    return JSON.parse(decode(match[1])) as T;
  } catch {
    return null;
  }
}

function parseByElection(html: string, live: LiveElection): LiveElection {
  const candidates =
    readHiddenJson<
      Array<{
        WardId: number;
        MunicipalityId: number;
        CandidateName: string;
        PartyAbbr: string;
        PartyName: string;
        ProvinceId: number;
      }>
    >(html, "MainContent_hCandidateList") ?? [];

  const councillors =
    readHiddenJson<
      Array<{
        Name: string;
        Province: string;
        Municipality: string;
        WardID: number;
        PartyAbbreviation: string;
      }>
    >(html, "MainContent_hCouncillors") ?? [];

  const stations =
    readHiddenJson<
      Array<{
        Province: string;
        Municipality: string;
        WardID: number;
      }>
    >(html, "MainContent_hVotingStations") ?? [];

  const timetable =
    readHiddenJson<Array<{ sTTEntry: string; dtDateValue: string }>>(html, "MainContent_hTimeTable") ?? [];

  const stationByWard = new Map(stations.map((station) => [station.WardID, station]));
  const winnerByWard = new Map(councillors.map((row) => [row.WardID, row]));
  const wardIds = [...new Set([...candidates.map((row) => row.WardId), ...councillors.map((row) => row.WardID)])];

  const provinceNames: Record<number, string> = {
    1: "Western Cape",
    2: "Eastern Cape",
    3: "Northern Cape",
    4: "Free State",
    5: "KwaZulu-Natal",
    6: "North West",
    7: "Gauteng",
    8: "Mpumalanga",
    9: "Limpopo",
  };

  const wards: ByElectionWard[] = wardIds.map((wardId) => {
    const station = stationByWard.get(wardId);
    const winner = winnerByWard.get(wardId);
    const people = candidates.filter((row) => row.WardId === wardId);
    return {
      wardId,
      municipality: winner?.Municipality || station?.Municipality || "Municipality",
      province: winner?.Province || station?.Province || provinceNames[people[0]?.ProvinceId] || "Province",
      winner: winner?.Name,
      winnerParty: winner?.PartyAbbreviation,
      candidates: people.map((row) => ({
        name: row.CandidateName,
        party: row.PartyAbbr,
        partyName: row.PartyName,
      })),
    };
  });

  const turnout =
    live.registeredVoters > 0 ? Number(((live.votesCast / live.registeredVoters) * 100).toFixed(2)) : 0;

  return {
    ...live,
    turnout,
    wards,
    timetable: timetable.map((row) => ({ entry: row.sTTEntry, date: row.dtDateValue })),
    sourceUrl: "https://results.elections.org.za/dashboards/byelection/",
  };
}

async function fetchHtml(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "User-Agent": "180DegreesNews/1.0 (+https://180news.co.za)",
        Accept: "text/html",
      },
    });
    if (!response.ok) throw new Error(`IEC request failed (${response.status})`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function snapshotKey(live: LiveElection) {
  return JSON.stringify({
    eventName: live.eventName,
    votesCast: live.votesCast,
    validVotes: live.validVotes,
    parties: live.parties.map((party) => [party.abbr, party.percent, party.votes, party.wards]),
    winners: live.wards.map((ward) => [ward.wardId, ward.winnerParty]),
  });
}

async function recordSnapshot(live: LiveElection) {
  const [previous] = await db
    .select()
    .from(iecSnapshots)
    .where(eq(iecSnapshots.source, "live"))
    .orderBy(desc(iecSnapshots.fetchedAt))
    .limit(1);

  await db.insert(iecSnapshots).values({
    source: "live",
    eventName: live.eventName,
    payload: JSON.stringify(live),
    fetchedAt: new Date(),
  });

  if (!previous) {
    await db.insert(iecUpdates).values({
      headline: `${live.eventName}: IEC results desk is live`,
      detail: `${live.parties
        .slice(0, 3)
        .map((party) => `${party.abbr} ${party.percent.toFixed(2)}%`)
        .join(" · ")}. ${live.votesCast.toLocaleString("en-ZA")} votes counted.`,
      eventName: live.eventName,
    });
    return;
  }

  try {
    const prevLive = JSON.parse(previous.payload) as LiveElection;
    if (snapshotKey(prevLive) === snapshotKey(live)) return;

    const prevMap = new Map(prevLive.parties.map((party) => [party.abbr, party]));
    const movers = live.parties
      .map((party) => {
        const before = prevMap.get(party.abbr);
        return {
          abbr: party.abbr,
          delta: before ? party.votes - before.votes : party.votes,
          percent: party.percent,
        };
      })
      .filter((row) => row.delta !== 0);

    const headline =
      movers.length > 0
        ? `IEC update: ${movers
            .slice(0, 3)
            .map((row) => `${row.abbr} ${row.percent.toFixed(2)}%`)
            .join(", ")}`
        : `IEC update on ${live.eventName}`;

    await db.insert(iecUpdates).values({
      headline,
      detail: `${live.votesCast.toLocaleString("en-ZA")} votes counted from ${live.registeredVoters.toLocaleString("en-ZA")} registered voters (${live.turnout}% poll).`,
      eventName: live.eventName,
    });
  } catch {
    // ignore compare failures
  }
}

async function latestStoredLive(): Promise<LiveElection | null> {
  const [row] = await db
    .select()
    .from(iecSnapshots)
    .where(eq(iecSnapshots.source, "live"))
    .orderBy(desc(iecSnapshots.fetchedAt))
    .limit(1);
  if (!row) return null;
  try {
    return JSON.parse(row.payload) as LiveElection;
  } catch {
    return null;
  }
}

async function loadUpdates(): Promise<IecUpdate[]> {
  return db.select().from(iecUpdates).orderBy(desc(iecUpdates.createdAt)).limit(12);
}

export async function getElectionDesk(force = false): Promise<ElectionDesk> {
  if (!force && memoryCache && Date.now() - memoryCache.at < LIVE_CACHE_MS) {
    return memoryCache.desk;
  }

  let live = await latestStoredLive();
  try {
    const [homeHtml, byeHtml] = await Promise.all([
      fetchHtml("https://results.elections.org.za/home/"),
      fetchHtml("https://results.elections.org.za/dashboards/byelection/"),
    ]);
    live = parseHomeResults(homeHtml);
    live = parseByElection(byeHtml, live);
    if (live.parties.length > 0 || live.wards.length > 0) {
      await recordSnapshot(live);
    }
  } catch {
    // keep stored snapshot
  }

  if (!live) {
    live = {
      eventName: "IEC results desk",
      eventId: null,
      registeredVoters: 0,
      votesCast: 0,
      validVotes: 0,
      spoiltVotes: 0,
      turnout: 0,
      parties: [],
      wards: [],
      timetable: [],
      sourceUrl: "https://results.elections.org.za/home/",
      fetchedAt: new Date().toISOString(),
      live: false,
    };
  }

  const updates = await loadUpdates();
  const desk: ElectionDesk = {
    live,
    certified2024: CERTIFIED_2024,
    updates: updates.map((row) => ({
      id: row.id,
      headline: row.headline,
      detail: row.detail,
      eventName: row.eventName,
      createdAt: row.createdAt.toISOString(),
    })),
    lastUpdated: live.fetchedAt,
  };
  memoryCache = { at: Date.now(), desk };
  return desk;
}
