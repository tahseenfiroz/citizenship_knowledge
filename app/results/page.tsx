import dynamic from "next/dynamic";

const ResultView = dynamic(() => import("@/components/ResultView"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Results</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="text-lg font-semibold">Loading…</div>
        <p className="mt-2 text-sm text-gray-600">Preparing your results.</p>
      </div>
    </div>
  ),
});

export default function ResultsPage() {
  return (
    <div className="space-y-4 py-4">
      <h1 className="text-2xl font-bold">Results</h1>
      <ResultView />
    </div>
  );
}
