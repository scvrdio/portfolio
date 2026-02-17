import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function CaseLayout(props: {
  title: string;
  backHref?: string;
  rightLink?: { label: string; href: string };
  heroSrc?: string;
  children: React.ReactNode;
}) {
  const backHref = props.backHref ?? "/";

  return (
    <main className="py-6">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link href={backHref} className="text-sm text-blue-600 hover:underline">
            ← {props.title}
          </Link>

          {props.rightLink ? (
            <Link
              href={props.rightLink.href}
              className="text-sm text-neutral-500 hover:text-neutral-900 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {props.rightLink.label} ↗
            </Link>
          ) : null}
        </div>

        {props.heroSrc ? (
          <div className="mt-4 overflow-hidden rounded-2xl bg-neutral-50">
            <Image
              src={props.heroSrc}
              alt=""
              width={1400}
              height={800}
              className="h-auto w-full"
              priority
            />
          </div>
        ) : null}

        <article className="prose prose-neutral mt-6 max-w-none prose-h2:text-blue-600 prose-h2:font-semibold prose-h3:text-blue-600 prose-h3:font-semibold prose-a:text-blue-600">
          {props.children}
        </article>
      </Container>
    </main>
  );
}
