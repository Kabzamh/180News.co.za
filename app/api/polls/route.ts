import { NextResponse } from "next/server";
import { getActivePolls, votePoll } from "@/lib/engagement";

export const dynamic = "force-dynamic";

export async function GET() {
  const polls = await getActivePolls();
  return NextResponse.json({ ok: true, polls });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { optionId?: number };
  const optionId = Number(body.optionId);
  if (!Number.isInteger(optionId) || optionId < 1) {
    return NextResponse.json({ ok: false, error: "Pick an option." }, { status: 400 });
  }
  const poll = await votePoll(optionId);
  if (!poll) return NextResponse.json({ ok: false, error: "Poll not found." }, { status: 404 });
  return NextResponse.json({ ok: true, poll });
}
