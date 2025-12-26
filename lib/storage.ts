export type QuizResult = {
  mode: "chapter" | "mock";
  chapter?: string;
  total: number;
  correct: number;
  answers: Array<{
    id: string;
    selected?: string;
    correct: string;
  }>;
  questions: Array<{
    id: string;
    chapter: string;
    type: "MCQ" | "TF";
    question: string;
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    correct: string;
    explanation?: string;
  }>;
};

const KEY = "citizenship_quiz_last_result_v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

export function saveLastResult(result: QuizResult) {
  if (!isBrowser()) return;
  sessionStorage.setItem(KEY, JSON.stringify(result));
}

export function loadLastResult(): QuizResult | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as QuizResult;
  } catch {
    return null;
  }
}

export function clearLastResult() {
  if (!isBrowser()) return;
  sessionStorage.removeItem(KEY);
}
