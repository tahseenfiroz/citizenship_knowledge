"use client";

import { useMemo, useState } from "react";
import type { Question } from "@/lib/questions";
import { getOptions } from "@/lib/quiz";
import { Button, SecondaryButton, Card } from "./ui";
import { saveLastResult } from "@/lib/storage";
import { useRouter } from "next/navigation";

export default function QuizRunner({
  mode,
  chapter,
  questions,
  timedSeconds,
}: {
  mode: "chapter" | "mock";
  chapter?: string;
  questions: Question[];
  timedSeconds?: number;
}) {
  const router = useRouter();
  const total = questions.length;

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [startedAt] = useState<number>(() => Date.now());
  const [tick, setTick] = useState(0);

  const q = questions[idx];
  const options = getOptions(q);

  const remaining = useMemo(() => {
    if (!timedSeconds) return null;
    const elapsed = Math.floor((Date.now() - startedAt) / 1000);
    return Math.max(0, timedSeconds - elapsed);
  }, [timedSeconds, startedAt, tick]);

  useMemo(() => {
    if (!timedSeconds) return;
    const t = setInterval(() => setTick((x) => x + 1), 1000);
    return () => clearInterval(t);
  }, [timedSeconds]);

  function submit() {
    let correctCount = 0;
    const answers = questions.map((qq) => {
      const sel = selected[qq.id];
      const isCorrect = sel && sel.toUpperCase() === qq.correct.toUpperCase();
      if (isCorrect) correctCount += 1;
      return { id: qq.id, selected: sel, correct: qq.correct };
    });

    saveLastResult({
      mode,
      chapter,
      total,
      correct: correctCount,
      answers,
      questions: questions.map((qq) => ({
        id: qq.id,
        chapter: qq.chapter,
        type: qq.type,
        question: qq.question,
        a: qq.a,
        b: qq.b,
        c: qq.c,
        d: qq.d,
        correct: qq.correct,
        explanation: qq.explanation,
      })),
    });

    router.push("/results");
  }

  if (timedSeconds && remaining === 0) {
    if (!(window as any).__submittedOnce) {
      (window as any).__submittedOnce = true;
      submit();
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            Question <b>{idx + 1}</b> of <b>{total}</b>
            {chapter ? <> · Chapter: <b>{chapter}</b></> : null}
          </div>

          {timedSeconds ? (
            <div className="text-sm font-semibold">
              ⏳ {String(Math.floor((remaining ?? 0) / 60)).padStart(2, "0")}:
              {String((remaining ?? 0) % 60).padStart(2, "0")}
            </div>
          ) : null}
        </div>

        <div className="mt-3 text-lg font-semibold">{q.question}</div>

        <div className="mt-4 space-y-2">
          {options.map((opt) => {
            const isPicked = selected[q.id] === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => setSelected((s) => ({ ...s, [q.id]: opt.key }))}
                className={
                  "w-full rounded-xl border px-3 py-3 text-left " +
                  (isPicked ? "border-gray-900 bg-gray-50" : "border-gray-200 hover:bg-gray-50")
                }
              >
                <div className="text-xs text-gray-500">{opt.key}</div>
                <div className="font-medium">{opt.label}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Answered: {Object.keys(selected).length}/{total}
        </div>
      </Card>

      <div className="flex items-center justify-between gap-3">
        <SecondaryButton onClick={() => setIdx((v) => Math.max(0, v - 1))} disabled={idx === 0}>
          ← Previous
        </SecondaryButton>

        <div className="flex gap-2">
          {idx < total - 1 ? (
            <Button onClick={() => setIdx((v) => Math.min(total - 1, v + 1))}>Next →</Button>
          ) : (
            <Button onClick={submit}>Submit</Button>
          )}
        </div>
      </div>
    </div>
  );
}
