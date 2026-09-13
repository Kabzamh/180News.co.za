"use client";

import { useState } from "react";
import { QUIZ } from "@/lib/quiz-data";

export function QuizDesk() {
  const [answers, setAnswers] = useState<number[]>(Array(QUIZ.length).fill(-1));
  const [name, setName] = useState("");
  const [result, setResult] = useState<{ score: number; total: number; percentile: number } | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true);
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, answers }),
    });
    const data = (await response.json()) as {
      ok?: boolean;
      score?: number;
      total?: number;
      percentile?: number;
    };
    if (data.ok && data.score != null) {
      setResult({ score: data.score, total: data.total ?? 5, percentile: data.percentile ?? 0 });
    }
    setBusy(false);
  }

  const share =
    result
      ? `I scored ${result.score}/${result.total} on the 180° News quiz — better than ${result.percentile}% of readers. Beat me: https://180news.co.za/quiz`
      : "";

  return (
    <div className="space-y-6">
      {QUIZ.map((question, index) => (
        <fieldset key={question.question} className="border border-slate-200 bg-white p-5">
          <legend className="px-2 text-sm font-semibold">
            {index + 1}. {question.question}
          </legend>
          <div className="mt-3 grid gap-2">
            {question.options.map((option, optionIndex) => (
              <label key={option} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name={`q-${index}`}
                  checked={answers[index] === optionIndex}
                  onChange={() =>
                    setAnswers((current) => current.map((value, i) => (i === index ? optionIndex : value)))
                  }
                />
                {option}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <div className="flex flex-wrap items-end gap-3">
        <label className="text-sm">
          Your name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-1 block border border-slate-300 px-3 py-2"
            placeholder="Optional"
          />
        </label>
        <button
          type="button"
          disabled={busy || answers.some((value) => value < 0)}
          onClick={submit}
          className="bg-[#8f1520] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white disabled:opacity-50"
        >
          {busy ? "Marking..." : "See my score"}
        </button>
      </div>
      {result ? (
        <div className="border border-[#8f1520]/20 bg-[#f8e9ea] p-5">
          <p className="font-serif text-4xl">
            {result.score}/{result.total}
          </p>
          <p className="mt-2 text-sm">
            You beat {result.percentile}% of 180° readers. Send it to the group chat.
          </p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(share)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block bg-[#128C7E] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            WhatsApp my score
          </a>
        </div>
      ) : null}
    </div>
  );
}
