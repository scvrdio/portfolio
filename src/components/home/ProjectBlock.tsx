import { Link } from "../ui/Link";
import { TextBlock } from "@/components/ui/TextBlock";
import { MediaBlock } from "@/components/ui/MediaBlock";
import NextLink from "next/link";

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
        {p.figmaHref ? (
          <Link href={p.figmaHref} variant="up-right">
            <span className="t-title ty-title">{p.title}</span>
          </Link>
        ) : (
          <p className="t-title ty-title">{p.title}</p>
        )}

        <p className="t-accent ty-body">{p.meta}</p>
      </div>

      {/* описание */}
      <TextBlock>{p.description}</TextBlock>

      {/* роль/вклад + ссылка "Описание →" */}

      <TextBlock>
        {p.note}{" "}

      </TextBlock>

      {/* media */}
      {p.media?.length ? (
        <NextLink
          href={p.href}
          target="_blank"
          className="group relative block mt-[-24px]"
          aria-label={`Открыть кейс: ${p.title}`}
        >
          <span className="pointer-events-none absolute right-4 top-10 z-10 text-[#0033ff] text-[24px] transition-transform duration-200 group-hover:scale-80 group-hover:rotate-45">
            ↗
          </span>

          <MediaBlock items={p.media as any} fullWidth />
        </NextLink>
      ) : null}
    </section>
  );
}
