import { Card } from "@/components/ui";

export default function DisclaimerPage() {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <h1 className="text-xl font-bold">Disclaimer</h1>
        <p className="mt-2 text-sm text-gray-700">
          This website is <b>not affiliated</b> with the Government of Canada or IRCC.
          It provides unofficial practice questions and explanations created independently.
          Always refer to the official “Discover Canada” study guide on the Government of Canada website.
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Copyright & content</h2>
        <p className="mt-2 text-sm text-gray-700">
          Do not copy/paste text from the study guide into this app. Keep questions and explanations in your own words.
          Linking to official sources is recommended.
        </p>
      </Card>
    </div>
  );
}
