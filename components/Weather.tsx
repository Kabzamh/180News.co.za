"use client";

import { useEffect, useState } from "react";

type CityWeather = {
  city: string;
  temp: number;
  windspeed: number;
  weatherCode: number;
  label: string;
  emoji: string;
};

function weatherDescription(code: number): { label: string; emoji: string } {
  if (code === 0) return { label: "Clear skies", emoji: "☀️" };
  if (code <= 2) return { label: "Partly cloudy", emoji: "⛅" };
  if (code === 3) return { label: "Overcast", emoji: "☁️" };
  if (code >= 45 && code <= 48) return { label: "Foggy", emoji: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", emoji: "🌦️" };
  if (code >= 61 && code <= 67) return { label: "Rain", emoji: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Cold", emoji: "🥶" };
  if (code >= 80 && code <= 82) return { label: "Showers", emoji: "🌦️" };
  if (code >= 85 && code <= 86) return { label: "Snow showers", emoji: "🌨️" };
  if (code >= 95) return { label: "Thunderstorm", emoji: "⛈️" };
  return { label: "Fair", emoji: "🌤️" };
}

export default function Weather() {
  const [data, setData] = useState<CityWeather[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/weather", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("weather"))))
      .then((d: { cities: CityWeather[] }) => setData(d.cities))
      .catch(() => setFailed(true));
    return () => ctrl.abort();
  }, []);

  return (
    <div className="bg-gradient-to-br from-brand-navy to-brand-navy-dark p-4 text-white shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-headline text-sm font-black uppercase tracking-widest">
          SA Weather
        </h3>
        <span className="text-lg">🌡️</span>
      </div>
      {failed ? (
        <p className="text-xs text-white/70">
          Live weather is temporarily unavailable.
        </p>
      ) : !data ? (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-8 animate-pulse rounded bg-white/15" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-white/10">
          {data.map((c) => (
            <li key={c.city} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-bold">{c.city}</p>
                <p className="text-[0.68rem] text-white/70">
                  {c.label} · {Math.round(c.windspeed)} km/h
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-base">{c.emoji}</span>
                <span className="font-headline text-lg font-black">
                  {Math.round(c.temp)}°
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-2 text-[0.62rem] text-white/50">
        Live data · Open-Meteo · SAST
      </p>
    </div>
  );
}
