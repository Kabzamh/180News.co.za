"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SOUTH_AFRICAN_CITIES } from "@/lib/cities";
import { PROVINCE_SHAPES, project } from "@/lib/sa-map";
import type { CityWeather } from "@/lib/weather";

export function SouthAfricaMap({
  weather,
}: {
  weather: CityWeather[];
}) {
  const [active, setActive] = useState("gauteng");
  const weatherByCity = useMemo(
    () => new Map(weather.map((row) => [row.slug, row])),
    [weather],
  );
  const province = PROVINCE_SHAPES.find((item) => item.slug === active) ?? PROVINCE_SHAPES[5];
  const cities = SOUTH_AFRICAN_CITIES.filter((city) => city.province === province.name);
  const office = project(-26.1076, 28.0567);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="border border-slate-200 bg-white p-3">
        <svg viewBox="0 0 1000 900" className="h-auto w-full" role="img" aria-label="Map of South Africa">
          <rect width="1000" height="900" fill="#eef3f8" />
          {PROVINCE_SHAPES.map((shape) => (
            <path
              key={shape.slug}
              d={shape.path}
              fill={active === shape.slug ? shape.color : `${shape.color}cc`}
              stroke="#fff"
              strokeWidth={active === shape.slug ? 8 : 4}
              className="cursor-pointer transition"
              onClick={() => setActive(shape.slug)}
              onMouseEnter={() => setActive(shape.slug)}
            >
              <title>{shape.name}</title>
            </path>
          ))}
          {SOUTH_AFRICAN_CITIES.map((city) => {
            const point = project(city.latitude, city.longitude);
            const forecast = weatherByCity.get(city.slug);
            const selected = city.province === province.name;
            return (
              <g key={city.slug} transform={`translate(${point.x} ${point.y})`}>
                <circle r={selected ? 7 : 4} fill={selected ? "#081226" : "#334155"} />
                {forecast ? (
                  <text y={-10} textAnchor="middle" fontSize="14" fill="#081226" fontWeight="700">
                    {forecast.currentTemp}°
                  </text>
                ) : null}
              </g>
            );
          })}
          <g transform={`translate(${office.x} ${office.y})`}>
            <circle r="11" fill="#8f1520" />
            <text y="4" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">
              HQ
            </text>
          </g>
        </svg>
        <p className="px-2 pb-2 text-xs text-slate-500">Tap a province. Dots are forecast cities. Red HQ is the Sandton newsroom.</p>
      </div>

      <aside className="border border-slate-200 bg-white p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Selected</p>
        <h2 className="mt-1 font-serif text-3xl">{province.name}</h2>
        <Link
          href={`/province/${province.slug}`}
          className="mt-3 inline-block bg-[#0b2f8a] px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white"
        >
          Provincial desk
        </Link>
        <div className="mt-5 space-y-2">
          {cities.map((city) => {
            const forecast = weatherByCity.get(city.slug);
            return (
              <Link
                key={city.slug}
                href={`/weather/${city.slug}`}
                className="flex items-center justify-between border-b border-slate-100 py-2 text-sm"
              >
                <span>{city.name}</span>
                <span className="font-semibold">
                  {forecast ? `${forecast.currentIcon} ${forecast.currentTemp}°` : "Forecast"}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8f1520]">Newsroom</p>
          <p className="mt-1 text-sm">Sandton Gate, 11 Alice Lane, Johannesburg</p>
          <iframe
            title="180 Degrees News office map"
            className="mt-3 h-48 w-full border-0"
            loading="lazy"
            src="https://www.openstreetmap.org/export/embed.html?bbox=28.03,-26.13,28.09,-26.08&layer=mapnik&marker=-26.1076,28.0567"
          />
        </div>
      </aside>
    </div>
  );
}
