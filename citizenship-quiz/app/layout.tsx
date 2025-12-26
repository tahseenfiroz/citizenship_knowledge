import "./globals.css";
import Link from "next/link";
import { Container } from "@/components/ui";

export const metadata = {
  title: "Citizenship Practice",
  description: "Unofficial Canadian citizenship test practice questions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="border-b bg-white">
          <Container>
            <div className="flex items-center justify-between gap-4 py-3">
              <Link href="/" className="font-bold">
                🇨🇦 Citizenship Practice
              </Link>
              <div className="flex gap-4 text-sm">
                <Link href="/chapters" className="text-gray-700 hover:underline">Chapters</Link>
                <Link href="/mock" className="text-gray-700 hover:underline">Mock</Link>
                <Link href="/disclaimer" className="text-gray-700 hover:underline">Disclaimer</Link>
              </div>
            </div>
          </Container>
        </div>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
