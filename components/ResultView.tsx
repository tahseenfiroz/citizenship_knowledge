"use client";

import { useMemo } from "react";
import { loadLastResult, clearLastResult } from "@/lib/storage";
import { Button, SecondaryButton, Card } from "./ui";
import Link from "next/link";

export default function ResultView() {
  const result = useMemo(() => loadLastResult(), []);

  if (!result) {
    return (
      <Card>
        <div className="text-lg font-semibold">No recent result found</div>
        <p className="mt-2 text-sm text-gray-600">Take a quiz first, then come back here.</p>
        <div className="mt-4">
          <Link href="/chapters">
            <Button>Go to Chapters</Button>
          </Link>
        </div>
      </Card>
    );
  }

  const pct = Math.round((result.correct / result.total) * 100);
  const byId = new Map(result.answers.map((a) => [a.id, a]));

  const incorrect = result.questions.filter((q) => {
    const a = byId.get(q.id);
    return !a?.selected || a.selected.toUpperCase() !== q.correct.toUpperCase();
  });

  function optionLabel(q: any, key: string) {
    const k = (key ?? "").toUpperCase();
    if (q.type === "TF") return k === "TRUE" ? "True" : "False";
    if (k === "A") return q.a ?? "";
    if (k === "B") return q.b ?? "";
    if (k === "C") return q.c ?? "";
    if (k === "D") return q.d ?? "";
    return "";
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="text-2xl font-bold">
          Score: {result.correct}/{result.total} ({pct}%)
        </div>
        <div className="mt-1 text-sm text-gray-600">
          Mode: <b>{result.mode}</b>
          {result.chapter ? <> · Chapter: <b>{result.chapter}</b></> : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/chapters"><SecondaryButton>Practice chapters</SecondaryButton></Link>
          <Link href="/mock"><SecondaryButton>Full mock test</SecondaryButton></Link>
          <Button onClick={() => { clearLastResult(); location.reload(); }}>Clear result</Button>
        </div>
      </Card>

      <Card>
        <div className="text-lg font-semibold">Review (incorrect first)</div>
        <div className="mt-3 space-y-4">
          {incorrect.length === 0 ? (
            <div className="text-sm text-gray-700">All correct 🎉</div>
          ) : (
            incorrect.map((q) => {
              const a = byId.get(q.id);
              const your = a?.selected ?? "—";
              const correct = q.correct;

              return (
                <div key={q.id} className="rounded-xl border border-gray-200 p-3">
                  <div className="text-xs text-gray-500">
                    {q.chapter} · {q.type}
                  </div>
                  <div className="mt-1 font-semibold">{q.question}</div>

                  <div className="mt-2 text-sm">
                    Your answer: <b>{your}</b>
                    {your !== "—" ? <> — {optionLabel(q, your)}</> : null}
                    <br />
                    Correct: <b>{correct}</b> — {optionLabel(q, correct)}
                  </div>

                  {q.explanation ? (
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="font-semibold">Explanation:</span> {q.explanation}
                    </div>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
