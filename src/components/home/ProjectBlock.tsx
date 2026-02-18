"use client";

import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "../ui/Link";
import { TextBlock } from "@/components/ui/TextBlock";
import { MediaBlock } from "@/components/ui/MediaBlock";
import type { Project } from "@/types/project";

type CaseHeroTransition = {
  slug: string;
  rect: { top: number; left: number; width: number; height: number };
};

declare global {
  interface Window {
    __caseHeroTransition?: CaseHeroTransition;
  }
}

function getCaseSlug(href: string) {
  const match = href.match(/^\/case\/([^/?#]+)/);
  return match?.[1] ?? null;
}

function shouldHandleClick(event: React.MouseEvent<HTMLAnchorElement>) {
  return !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

export function ProjectBlock({ p }: { p: Project }) {
  const router = useRouter();
  const slug = getCaseSlug(p.href);
  const hero = p.media?.[0];
  const hasSimpleStaticHero = p.media?.length === 1 && hero?.type === "image" && hero.mode === "static";

  const handleOpenCase = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!slug || !shouldHandleClick(event)) {
      return;
    }

    event.preventDefault();

    const source = event.currentTarget.querySelector(`[data-case-hero-source="${slug}"]`) as HTMLElement | null;
    if (source) {
      const sourceImage = source.querySelector("img") as HTMLElement | null;
      const rect = (sourceImage ?? source).getBoundingClientRect();
      window.__caseHeroTransition = {
        slug,
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
      };
    }

    router.push(p.href, { scroll: false });
  };

  return (
    <section className="space-y-4">
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

      <TextBlock>{p.description}</TextBlock>
      <TextBlock>{p.note}</TextBlock>

      {p.media?.length ? (
        <NextLink href={p.href} className="group relative block" aria-label={`Открыть кейс: ${p.title}`} onClick={handleOpenCase}>
          <span className="pointer-events-none absolute right-4 top-2 z-10 text-[#0033ff] text-[24px] transition-transform duration-200 group-hover:scale-80 group-hover:rotate-45">
            ↗
          </span>
          <div data-case-hero-source={slug ?? undefined}>
            {hasSimpleStaticHero && hero ? (
              <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-100">
                <Image
                  src={hero.src}
                  alt={hero.alt ?? ""}
                  width={hero.width ?? 2000}
                  height={hero.height ?? 1200}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority={hero.priority ?? false}
                />
              </div>
            ) : (
              <MediaBlock items={p.media} fullWidth />
            )}
          </div>
        </NextLink>
      ) : null}
    </section>
  );
}
