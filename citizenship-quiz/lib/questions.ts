import questionsData from "@/data/questions.json";

export type QuestionType = "MCQ" | "TF";

export type Question = {
  id: string;
  chapter: string;
  type: QuestionType;
  question: string;
  a?: string;
  b?: string;
  c?: string;
  d?: string;
  correct: string;
  explanation?: string;
};

export async function getAllQuestions(): Promise<Question[]> {
  return questionsData as Question[];
}

export function listChapters(questions: Question[]): string[] {
  const set = new Set<string>();
  for (const q of questions) set.add(q.chapter);
  return Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export function filterByChapter(questions: Question[], chapter: string): Question[] {
  return questions.filter((q) => q.chapter === chapter);
}
