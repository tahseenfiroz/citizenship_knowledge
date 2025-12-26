import QuizRunner from "@/components/QuizRunner";
import { getAllQuestions } from "@/lib/questions";
import { pickQuestions } from "@/lib/quiz";
import { Card } from "@/components/ui";

export default async function MockPage() {
  const all = await getAllQuestions();
  const questions = pickQuestions(all, 20);

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Full Mock Test</h1>
      <Card>
        <div className="text-sm text-gray-700">
          20 questions · Timed (30 minutes). If you don’t want a timer, remove <code className="rounded bg-gray-100 px-1">timedSeconds</code> in <code className="rounded bg-gray-100 px-1">app/mock/page.tsx</code>.
        </div>
      </Card>

      {questions.length === 0 ? (
        <Card>
          <div className="font-semibold">No questions found</div>
          <p className="mt-1 text-sm text-gray-700">
            Fill <code className="rounded bg-gray-100 px-1">data/questions.xlsx</code> and restart the dev server.
          </p>
        </Card>
      ) : (
        <QuizRunner mode="mock" questions={questions} timedSeconds={30 * 60} />
      )}
    </div>
  );
}
