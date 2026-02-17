import "./globals.css";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Серёжа Ивлев",
  description: "Портфолио",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-neutral-900">
        <main className="py-10">
          <Container>{children}</Container>
        </main>
      </body>
    </html>
  );
}
