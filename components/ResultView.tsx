"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { loadLastResult, clearLastResult } from "@/lib/storage";
import { Button, SecondaryButton, Card } from "./ui";

type AnyResult = any;

export default function ResultView() {
  const [result, setResult] = useState<AnyResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Only runs in the browser
    setResult(loadLastResult());
    setLoaded(true);
  }, []);

  const computed = useMemo(() => {
    if (!result) return null;

    const pct = Math.round((result.correct / result.total) * 100);
    const byId = new Map(result.answers.map((a: any) => [a.id, a]));

    const incorrect = result.questions.filter((q: any) => {
      const a = byId.get(q.id);
      return !a?.selected || String(a.selected).toUpperCase() !== String(q.correct).toUpperCase();
    });

    return { pct, byId, incorrect };
  }, [result]);

  function optionLabel(q: any, key: string) {
    const k = String(key ?? "").toUpperCase();
    if (q.type === "TF") return k === "TRUE" ? "True" : "False";
    if (k === "A") return q.a ?? "";
    if (k === "B") return q.b ?? "";
    if (k === "C") return q.c ?? "";
    if (k === "D") return q.d ?? "";
    return "";
  }

  if (!loaded) {
    return (
      <Card>
        <div className="text-lg font-semibold">Loading…</div>
        <p className="mt-2 text-sm text-gray-600">
          Preparing your results.
        </p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card>
        <div className="text-lg font-semibold">No recent result found</div>
        <p className="mt-2 text-sm text-gray-600">
          Take a quiz first, then come back here to review your answers.
        </p>
        <div className="mt-4 flex gap-2">
          <Link href="/chapters">
            <Button>Go to Chapters</Button>
          </Link>
          <Link href="/mock">
            <SecondaryButton>Full mock test</SecondaryButton>
          </Link>
        </div>
      </Card>
    );
  }

  const { pct, byId, incorrect } = computed!;

  return (
    <div className="space-y-4">
      <Card>
        <div className="text-2xl font-bold">
          Score: {result.correct}/{result.total} ({pct}%)
        </div>

        <div className="mt-1 text-sm text-gray-600">
          Mode: <b>{result.mode}</b>
          {result.chapter ? (
            <>
              {" "}
              · Chapter: <b>{result.chapter}</b>
            </>
          ) : null}
        </div>

        <div className="mt-4 flex f
