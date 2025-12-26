import Link from "next/link";
import { Card, Button, SecondaryButton } from "@/components/ui";

export default function HomePage() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <h1 className="text-2xl font-bold">Practice for the Canadian Citizenship Test</h1>
        <p className="mt-2 text-sm text-gray-700">
          Unofficial practice questions (MCQ / True-False). No login. No email. No tracking.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/chapters"><Button>Practice by chapter</Button></Link>
          <Link href="/mock"><SecondaryButton>Full mock test</SecondaryButton></Link>
          <Link href="/disclaimer"><SecondaryButton>Disclaimer</SecondaryButton></Link>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">How to add your questions</h2>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-700">
          <li>Open <code className="rounded bg-gray-100 px-1">data/questions.xlsx</code></li>
          <li>Fill the <b>questions</b> sheet using the headers (row 1)</li>
          <li>Run <code className="rounded bg-gray-100 px-1">npm install</code> then <code className="rounded bg-gray-100 px-1">npm run dev</code></li>
          <li>The app auto-converts Excel → JSON before dev/build</li>
        </ol>
      </Card>
    </div>
  );
}
