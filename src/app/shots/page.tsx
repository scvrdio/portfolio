import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WaveDivider } from "@/components/ui/WaveDivider";

export default function Page() {
  return (
    <main className="py-6">
      <Container>
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          ← <span className="text-blue-600 font-semibold">Артефакты</span>
        </Link>

        <p className="mt-4 text-neutral-600">
          Собрание шотов, концептов, идей и работ из других дисциплин,
          сформированное за 4 года моей любви к дизайну.
        </p>

        <WaveDivider />

        {/* дальше будет сетка/галерея */}
        <div className="grid gap-6">
          <div className="h-40 rounded-2xl bg-neutral-100" />
          <div className="h-40 rounded-2xl bg-neutral-100" />
        </div>
      </Container>
    </main>
  );
}
