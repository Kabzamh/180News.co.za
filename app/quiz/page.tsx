import type { Metadata } from "next";
import { QuizDesk } from "@/components/QuizDesk";
import { topQuizScores } from "@/lib/engagement";

export const metadata: Metadata = {
  title: "Daily news quiz",
  description: "Five questions. WhatsApp your score. The 180 Degrees News quiz.",
};

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const scores = await topQuizScores();
  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1.2fr_0.8fr]">
      <section>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#8f1520]">Play the bulletin</p>
        <h1 className="mt-2 font-serif text-5xl">How well do you know the news?</h1>
        <p className="mt-3 text-lg text-slate-600">
          Five questions. One minute. Then send it to the family WhatsApp group.
        </p>
        <div className="mt-8">
          <QuizDesk />
        </div>
      </section>
      <aside>
        <h2 className="font-serif text-3xl">Leaderboard</h2>
        <div className="mt-4 divide-y divide-slate-200 border border-slate-200 bg-white">
          {scores.length === 0 ? <p className="p-4 text-sm">Be the first on the board.</p> : null}
          {scores.map((row, index) => (
            <div key={row.id} className="flex justify-between px-4 py-3 text-sm">
              <span>
                {index + 1}. {row.name}
              </span>
              <span className="font-semibold">
                {row.score}/{row.total}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </main>
  );
}
