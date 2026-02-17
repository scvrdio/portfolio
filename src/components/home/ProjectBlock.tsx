import Link from "next/link";
import { TextBlock } from "@/components/ui/TextBlock";
import { MediaBlock } from "@/components/ui/MediaBlock";

type Project = {
  href: string;
  title: string;
  meta: string;
  description: string;
  note: string;
  figmaHref?: string;
  media?: any[]; // массив MediaItem, как в MediaBlock
};

export function ProjectBlock({ p }: { p: Project }) {
  return (
    <section className="space-y-4">
      {/* title + meta */}
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
        <Link href={p.href} className="t-title hover:underline">
          {p.title}
        </Link>

        <p className="t-accent">{p.meta}</p>
      </div>

      {/* описание */}
      <TextBlock>{p.description}</TextBlock>

      {/* роль/вклад + ссылка "Описание →" */}
      <TextBlock>
        {p.note}{" "}
        <Link href={p.href} className="t-accent hover:underline">
          Описание →
        </Link>
      </TextBlock>

      {/* figma */}
      {p.figmaHref ? (
        <a
          href={p.figmaHref}
          target="_blank"
          rel="noreferrer"
          className="t-accent inline-block hover:underline"
        >
          Figma ↗
        </a>
      ) : null}

      {/* media */}
      {p.media?.length ? <MediaBlock items={p.media as any} fullWidth /> : null}
    </section>
  );
}
