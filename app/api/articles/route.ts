import { getHomeData } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getHomeData();
  return Response.json({
    ok: true,
    latest: data.latest,
    breaking: data.breaking,
  });
}
