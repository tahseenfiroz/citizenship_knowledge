import Link from "next/link";
import { Card } from "@/components/ui";
import { getAllQuestions, listChapters } from "@/lib/questions";

export default async function ChaptersPage() {
  const questions = await getAllQuestions();
  const chapters = listChapters(questions);

  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Chapters</h1>

      {chapters.length === 0 ? (
        <Card>
          <div className="font-semibold">No questions found</div>
          <p className="mt-1 text-sm text-gray-700">
            Please fill <code className="rounded bg-gray-100 px-1">data/questions.xlsx</code> and restart the dev server.
          </p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {chapters.map((ch) => (
            <Card key={ch}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold">{ch}</div>
                  <div className="text-sm text-gray-600">Practice questions for this chapter</div>
                </div>
                <Link
                  className="rounded-xl border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
                  href={`/quiz/${encodeURIComponent(ch)}?n=20`}
                >
                  Start →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
