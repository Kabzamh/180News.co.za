import Link from "next/link";
import type { CityWeather } from "@/lib/weather";

export function WeatherStrip({ cities }: { cities: CityWeather[] }) {
  if (cities.length === 0) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-4 py-3">
        <Link
          href="/weather"
          className="shrink-0 text-[11px] font-bold uppercase tracking-[0.16em] text-[#0b2f8a]"
        >
          SA forecast
        </Link>
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/weather/${city.slug}`}
            className="flex shrink-0 items-center gap-2 border-l border-slate-200 pl-4 text-sm"
          >
            <span className="font-semibold">{city.name}</span>
            <span>
              {city.currentIcon} {city.currentTemp}°
            </span>
            <span className="text-xs text-slate-500">
              {city.days[0] ? `${city.days[0].min}°/${city.days[0].max}°` : city.currentLabel}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
