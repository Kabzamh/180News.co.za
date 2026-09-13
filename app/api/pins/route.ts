import { NextResponse } from "next/server";
import { togglePin } from "@/lib/pins";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { articleId?: number };
  const articleId = Number(body.articleId);
  if (!Number.isInteger(articleId) || articleId < 1) {
    return NextResponse.json({ ok: false, error: "Invalid story." }, { status: 400 });
  }
  const result = await togglePin(articleId);
  return NextResponse.json(result, { status: result.ok ? 200 : 403 });
}
