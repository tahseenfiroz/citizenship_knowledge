import type { Question } from "./questions";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(pool: Question[], count: number): Question[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

export function getOptions(q: Question): Array<{ key: string; label: string }> {
  if (q.type === "TF") {
    return [
      { key: "TRUE", label: "True" },
      { key: "FALSE", label: "False" },
    ];
  }
  const opts: Array<{ key: string; label: string }> = [];
  if (q.a) opts.push({ key: "A", label: q.a });
  if (q.b) opts.push({ key: "B", label: q.b });
  if (q.c) opts.push({ key: "C", label: q.c });
  if (q.d) opts.push({ key: "D", label: q.d });
  return opts;
}
