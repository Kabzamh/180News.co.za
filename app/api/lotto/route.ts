import { getLottoDesk } from "@/lib/lotto";

export const dynamic = "force-dynamic";

export async function GET() {
  const desk = await getLottoDesk();
  return Response.json({ ok: true, desk });
}
