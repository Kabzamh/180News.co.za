import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { weatherForecasts } from "@/db/schema";
import { SOUTH_AFRICAN_CITIES, getCity, weatherIcon, weatherLabel, type City } from "@/lib/cities";

export type DayForecast = {
  date: string;
  code: number;
  label: string;
  icon: string;
  max: number;
  min: number;
  rainChance: number;
};

export type CityWeather = {
  slug: string;
  name: string;
  province: string;
  currentTemp: number;
  currentCode: number;
  currentLabel: string;
  currentIcon: string;
  windKmh: number;
  humidity: number;
  days: DayForecast[];
  updatedAt: string;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    weather_code?: number;
    wind_speed_10m?: number;
    relative_humidity_2m?: number;
    time?: string;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    precipitation_probability_max?: number[];
  };
};

const CACHE_MS = 15 * 60 * 1000;
let memoryCache: { at: number; cities: CityWeather[] } | null = null;

function mapForecast(city: City, payload: OpenMeteoResponse, updatedAt = new Date().toISOString()): CityWeather {
  const current = payload.current ?? {};
  const daily = payload.daily ?? {};
  const code = Number(current.weather_code ?? daily.weather_code?.[0] ?? 2);
  const days: DayForecast[] = (daily.time ?? []).slice(0, 5).map((date, index) => {
    const dayCode = Number(daily.weather_code?.[index] ?? code);
    return {
      date,
      code: dayCode,
      label: weatherLabel(dayCode),
      icon: weatherIcon(dayCode),
      max: Math.round(Number(daily.temperature_2m_max?.[index] ?? current.temperature_2m ?? 0)),
      min: Math.round(Number(daily.temperature_2m_min?.[index] ?? current.temperature_2m ?? 0)),
      rainChance: Math.round(Number(daily.precipitation_probability_max?.[index] ?? 0)),
    };
  });

  return {
    slug: city.slug,
    name: city.name,
    province: city.province,
    currentTemp: Math.round(Number(current.temperature_2m ?? days[0]?.max ?? 0)),
    currentCode: code,
    currentLabel: weatherLabel(code),
    currentIcon: weatherIcon(code),
    windKmh: Math.round(Number(current.wind_speed_10m ?? 0)),
    humidity: Math.round(Number(current.relative_humidity_2m ?? 0)),
    days,
    updatedAt: current.time ? `${current.time}:00+02:00` : updatedAt,
  };
}

async function fetchBatch(cities: City[]) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", cities.map((city) => city.latitude).join(","));
  url.searchParams.set("longitude", cities.map((city) => city.longitude).join(","));
  url.searchParams.set(
    "current",
    "temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m",
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
  );
  url.searchParams.set("timezone", "Africa/Johannesburg");
  url.searchParams.set("forecast_days", "5");

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(url.toString(), {
      signal: controller.signal,
      cache: "no-store",
      headers: { "User-Agent": "180DegreesNews/1.0 (newsroom@180news.co.za)" },
    });
    if (!response.ok) {
      throw new Error(`Weather request failed (${response.status})`);
    }
    const json = (await response.json()) as OpenMeteoResponse | OpenMeteoResponse[];
    const rows = Array.isArray(json) ? json : [json];
    return cities.map((city, index) => mapForecast(city, rows[index] ?? {}));
  } finally {
    clearTimeout(timer);
  }
}

async function persist(cities: CityWeather[]) {
  for (const city of cities) {
    const existing = await db
      .select({ id: weatherForecasts.id })
      .from(weatherForecasts)
      .where(eq(weatherForecasts.citySlug, city.slug))
      .limit(1);
    if (existing[0]) {
      await db
        .update(weatherForecasts)
        .set({
          payload: JSON.stringify(city),
          fetchedAt: new Date(),
        })
        .where(eq(weatherForecasts.citySlug, city.slug));
    } else {
      await db.insert(weatherForecasts).values({
        citySlug: city.slug,
        city: city.name,
        province: city.province,
        payload: JSON.stringify(city),
        fetchedAt: new Date(),
      });
    }
  }
}

async function readCached(): Promise<CityWeather[]> {
  const rows = await db.select().from(weatherForecasts).orderBy(desc(weatherForecasts.fetchedAt));
  return rows
    .map((row) => {
      try {
        return JSON.parse(row.payload) as CityWeather;
      } catch {
        return null;
      }
    })
    .filter((row): row is CityWeather => Boolean(row));
}

export async function getNationalWeather(force = false): Promise<CityWeather[]> {
  if (!force && memoryCache && Date.now() - memoryCache.at < CACHE_MS) {
    return memoryCache.cities;
  }

  try {
    const batches = [SOUTH_AFRICAN_CITIES.slice(0, 17), SOUTH_AFRICAN_CITIES.slice(17)];
    const fetched = (await Promise.all(batches.map(fetchBatch))).flat();
    if (fetched.length > 0) {
      memoryCache = { at: Date.now(), cities: fetched };
      void persist(fetched).catch(() => undefined);
      return fetched;
    }
  } catch {
    // fall through to cache
  }

  const cached = await readCached();
  if (cached.length > 0) {
    memoryCache = { at: Date.now(), cities: cached };
    return cached;
  }
  return [];
}

export async function getCityWeather(slug: string) {
  const cities = await getNationalWeather();
  return cities.find((city) => city.slug === slug) ?? null;
}

export async function getJohannesburgWeather() {
  const cities = await getNationalWeather();
  return cities.find((city) => city.slug === "johannesburg") ?? null;
}

export function cityExists(slug: string) {
  return Boolean(getCity(slug));
}
