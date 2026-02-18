"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import { Link } from "../ui/Link";
import { MetricPills } from "@/components/ui/MetricPills";
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

function renderMeta(meta: string) {
  const [lead, ...tailParts] = meta.split("·");
  if (!tailParts.length) return meta;

  const tail = tailParts.join("·").trim();
  return (
    <>
      {lead.trim()} · <span className="inline-block whitespace-nowrap">{tail}</span>
    </>
  );
}

export function ProjectBlock({ p }: { p: Project }) {
  const router = useRouter();
  const metricsScrollRef = useRef<HTMLDivElement | null>(null);
  const slug = getCaseSlug(p.href);
  const hero = p.media?.[0];
  const hasSimpleStaticHero = p.media?.length === 1 && hero?.type === "image" && hero.mode === "static";

  useEffect(() => {
    if (!metricsScrollRef.current) return;
    const node = metricsScrollRef.current;
    node.scrollLeft = 0;

    const rafId = window.requestAnimationFrame(() => {
      node.scrollLeft = 0;
    });

    const timeoutId = window.setTimeout(() => {
      node.scrollLeft = 0;
    }, 120);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
    };
  }, [p.href]);

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

        <p className="t-accent ty-body">{renderMeta(p.meta)}</p>
      </div>

      <TextBlock>{p.description}</TextBlock>

      {p.metrics?.length ? (
        <div
          ref={metricsScrollRef}
          className="-mx-4 overflow-x-auto px-4 touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          <MetricPills items={p.metrics} noWrap />
        </div>
      ) : null}

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

      {/* <TextBlock>{p.note}</TextBlock> */}
    </section>
  );
}
