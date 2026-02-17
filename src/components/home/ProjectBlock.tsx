import { Link } from "../ui/Link";
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
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <p className="t-title ty-title">
          {p.title}
        </p>

        <p className="t-accent ty-body">{p.meta}</p>
      </div>

      {/* описание */}
      <TextBlock>{p.description}</TextBlock>

      {/* роль/вклад + ссылка "Описание →" */}
      <TextBlock>
        {p.note}{" "}
        <Link href={p.href} variant="right">
          Описание
        </Link>
      </TextBlock>

      {/* figma */}
      {p.figmaHref ? (

        <Link href={p.figmaHref} variant="up-right">
          Figma
        </Link>
      ) : null}

      {/* media */}
      {p.media?.length ? (
        <div className="mt-[-24]">
          <MediaBlock items={p.media as any} fullWidth />
        </div>
      ) : null}
    </section>
  );
}
