import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { pollOptions, polls, quizScores } from "@/db/schema";
import { QUIZ } from "@/lib/quiz-data";

export { QUIZ };

const POLL_SEED = [
  {
    question: "Will the GNU hold together through the next budget?",
    slug: "gnu-budget",
    options: ["Yes, they will compromise", "It splits before year-end", "Too close to call"],
  },
  {
    question: "What should Joburg fix first?",
    slug: "joburg-first",
    options: ["Water", "Potholes", "Power cables", "Billing"],
  },
  {
    question: "Who goes furthest in World Cup qualifying?",
    slug: "bafana-run",
    options: ["Bafana Bafana", "Group runners-up only", "They fall short"],
  },
];

let ready = false;

async function seedPolls() {
  const existing = await db.select({ id: polls.id }).from(polls).limit(1);
  if (existing.length === 0) {
    for (const poll of POLL_SEED) {
      const [row] = await db.insert(polls).values({ question: poll.question, slug: poll.slug }).returning();
      await db.insert(pollOptions).values(
        poll.options.map((label) => ({ pollId: row.id, label, votes: 8 + Math.floor(Math.random() * 40) })),
      );
    }
  }
  ready = true;
}

export async function ensurePolls() {
  if (ready) return;
  await seedPolls();
}

export async function getActivePolls() {
  await ensurePolls();
  const pollRows = await db.select().from(polls).where(eq(polls.active, true));
  const optionRows = await db.select().from(pollOptions);
  return pollRows.map((poll) => ({
    ...poll,
    options: optionRows.filter((option) => option.pollId === poll.id),
    total: optionRows.filter((option) => option.pollId === poll.id).reduce((sum, option) => sum + option.votes, 0),
  }));
}

export async function votePoll(optionId: number) {
  await ensurePolls();
  await db.update(pollOptions).set({ votes: sql`${pollOptions.votes} + 1` }).where(eq(pollOptions.id, optionId));
  const [option] = await db.select().from(pollOptions).where(eq(pollOptions.id, optionId)).limit(1);
  if (!option) return null;
  const pollRows = await getActivePolls();
  return pollRows.find((poll) => poll.id === option.pollId) ?? null;
}

export async function saveQuizScore(name: string, score: number) {
  await db.insert(quizScores).values({ name: name.slice(0, 80) || "Reader", score, total: QUIZ.length });
  const rows = await db.select().from(quizScores);
  const better = rows.filter((row) => row.score < score).length;
  const percentile = rows.length ? Math.round((better / rows.length) * 100) : 100;
  return { percentile, attempts: rows.length };
}

export async function topQuizScores() {
  return db.select().from(quizScores).orderBy(desc(quizScores.score), desc(quizScores.createdAt)).limit(8);
}
