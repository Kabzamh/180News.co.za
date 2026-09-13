import { getElectionDesk } from "@/lib/iec";

export const dynamic = "force-dynamic";

export async function GET() {
  const desk = await getElectionDesk();
  return Response.json({ ok: true, desk });
}
