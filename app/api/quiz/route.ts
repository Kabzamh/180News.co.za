import { NextResponse } from "next/server";
import { saveQuizScore } from "@/lib/engagement";
import { QUIZ } from "@/lib/quiz-data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string; answers?: number[] };
  const answers = Array.isArray(body.answers) ? body.answers : [];
  if (answers.length !== QUIZ.length) {
    return NextResponse.json({ ok: false, error: "Answer all five." }, { status: 400 });
  }
  const score = QUIZ.reduce((sum, question, index) => sum + (answers[index] === question.answer ? 1 : 0), 0);
  const stats = await saveQuizScore(body.name?.trim() || "Reader", score);
  return NextResponse.json({ ok: true, score, total: QUIZ.length, ...stats });
}
