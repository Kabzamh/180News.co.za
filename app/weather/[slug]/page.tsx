import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { getCity } from "@/lib/cities";
import { getCityWeather, getNationalWeather } from "@/lib/weather";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCity(slug);
  return {
    title: city ? `${city.name} weather forecast` : "City weather",
    description: city
      ? `Current conditions and five-day forecast for ${city.name}, ${city.province}.`
      : "South African city weather.",
  };
}

export default async function CityWeatherPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  const forecast = await getCityWeather(slug);
  if (!forecast) notFound();
  const nearby = (await getNationalWeather())
    .filter((row) => row.province === forecast.province && row.slug !== forecast.slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">
        {forecast.province} weather
      </p>
      <h1 className="mt-2 font-serif text-5xl">{forecast.name}</h1>
      <p className="mt-3 text-lg text-slate-600">
        {forecast.currentLabel} · Wind {forecast.windKmh} km/h · Humidity {forecast.humidity}%
      </p>
      <div className="mt-6">
        <AdSlot slot="weather-leaderboard" compact />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
        <section className="border border-slate-200 bg-white p-6">
          <p className="text-sm uppercase tracking-[0.14em] text-slate-500">Now</p>
          <p className="mt-2 font-serif text-7xl">
            {forecast.currentIcon} {forecast.currentTemp}°
          </p>
          <p className="mt-2 text-slate-600">{forecast.currentLabel}</p>
        </section>
        <section className="grid grid-cols-2 gap-3">
          {forecast.days.map((day) => (
            <div key={day.date} className="border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                {new Date(`${day.date}T12:00:00`).toLocaleDateString("en-ZA", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                })}
              </p>
              <p className="mt-2 font-serif text-3xl">
                {day.icon} {day.max}°
              </p>
              <p className="text-sm text-slate-600">
                Low {day.min}° · Rain {day.rainChance}%
              </p>
              <p className="mt-1 text-sm">{day.label}</p>
            </div>
          ))}
        </section>
      </div>
      {nearby.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-serif text-3xl">Elsewhere in {forecast.province}</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {nearby.map((row) => (
              <Link key={row.slug} href={`/weather/${row.slug}`} className="border border-slate-300 px-3 py-2 text-sm">
                {row.name} {row.currentTemp}°
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <p className="mt-8 text-sm">
        <Link href="/weather" className="font-semibold text-[#0b2f8a]">
          ← All city forecasts
        </Link>
      </p>
    </main>
  );
}
