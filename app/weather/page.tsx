import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { SOUTH_AFRICAN_CITIES } from "@/lib/cities";
import { getNationalWeather } from "@/lib/weather";

export const metadata: Metadata = {
  title: "South Africa weather forecast",
  description: "Five-day forecasts for cities across all nine provinces, from the 180 Degrees News weather desk.",
};

export const dynamic = "force-dynamic";

export default async function WeatherPage() {
  const forecasts = await getNationalWeather();
  const byProvince = SOUTH_AFRICAN_CITIES.reduce<Record<string, typeof forecasts>>((acc, city) => {
    const forecast = forecasts.find((row) => row.slug === city.slug);
    if (!forecast) return acc;
    acc[city.province] = [...(acc[city.province] ?? []), forecast];
    return acc;
  }, {});

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Weather desk</p>
      <h1 className="mt-2 font-serif text-5xl">Forecasts for cities across South Africa</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-600">
        Current conditions and a five-day outlook for metros, capitals and regional centres in every province.
        Johannesburg remains the home desk.
      </p>
      <div className="mt-6">
        <AdSlot slot="weather-leaderboard" compact />
      </div>

      <div className="mt-8 space-y-10">
        {Object.entries(byProvince).map(([province, cities]) => (
          <section key={province}>
            <h2 className="border-b-2 border-[#0b2f8a] pb-2 font-serif text-3xl">{province}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/weather/${city.slug}`}
                  className="border border-slate-200 bg-white p-4 hover:border-[#0b2f8a]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl">{city.name}</h3>
                      <p className="text-sm text-slate-500">{city.currentLabel}</p>
                    </div>
                    <p className="font-serif text-4xl">
                      {city.currentIcon} {city.currentTemp}°
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-5 gap-1 text-center text-[11px]">
                    {city.days.map((day) => (
                      <div key={day.date} className="bg-[#f4f0e8] px-1 py-2">
                        <p className="uppercase text-slate-500">
                          {new Date(`${day.date}T12:00:00`).toLocaleDateString("en-ZA", { weekday: "short" })}
                        </p>
                        <p className="mt-1 text-base">{day.icon}</p>
                        <p>
                          {day.max}°/{day.min}°
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Wind {city.windKmh} km/h · Rain today {city.days[0]?.rainChance ?? 0}%
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="mt-10 text-xs text-slate-500">Forecast source: Open-Meteo · Times in SAST.</p>
    </main>
  );
}
