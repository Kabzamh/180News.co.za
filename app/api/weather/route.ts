import { getCityWeather, getNationalWeather } from "@/lib/weather";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  if (city) {
    const forecast = await getCityWeather(city);
    if (!forecast) {
      return Response.json({ ok: false, error: "City not found." }, { status: 404 });
    }
    return Response.json({ ok: true, city: forecast });
  }
  const cities = await getNationalWeather();
  return Response.json({ ok: true, cities });
}
