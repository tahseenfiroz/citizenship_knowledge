import QuizRunner from "@/components/QuizRunner";
import { getAllQuestions, filterByChapter } from "@/lib/questions";
import { pickQuestions } from "@/lib/quiz";
import { Card } from "@/components/ui";

export default async function ChapterQuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string }>;
  searchParams: Promise<{ n?: string }>;
}) {
  const { chapter } = await params;
  const sp = await searchParams;
  const n = Math.max(5, Math.min(40, Number(sp.n ?? "20")));

  const all = await getAllQuestions();
  const decoded = decodeURIComponent(chapter);
  const pool = filterByChapter(all, decoded);
  const questions = pickQuestions(pool, n);

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Chapter Quiz</h1>
      <Card>
        <div className="text-sm text-gray-700">
          Chapter: <b>{decoded}</b> · Questions: <b>{questions.length}</b>
        </div>
      </Card>

      {questions.length === 0 ? (
        <Card>
          <div className="font-semibold">No questions available</div>
          <p className="mt-1 text-sm text-gray-700">
            Add questions for chapter <b>{decoded}</b> in <code className="rounded bg-gray-100 px-1">data/questions.xlsx</code>.
          </p>
        </Card>
      ) : (
        <QuizRunner mode="chapter" chapter={decoded} questions={questions} />
      )}
    </div>
  );
}
