import { recordAdClick } from "@/lib/ads";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!Number.isInteger(id) || id < 1) {
    return Response.redirect(new URL("/advertise", request.url));
  }
  const ad = await recordAdClick(id);
  const target = ad?.href || "/advertise";
  return Response.redirect(new URL(target, request.url));
}
