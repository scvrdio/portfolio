"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type CaseHeroTransition = {
  slug: string;
  rect: { top: number; left: number; width: number; height: number };
};

declare global {
  interface Window {
    __caseHeroTransition?: CaseHeroTransition;
  }
}

export function CaseHero(props: {
  src: string;
  alt?: string;
  slug?: string;
  width: number;
  height: number;
  animateFromCard?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!props.animateFromCard || !props.slug || !rootRef.current) {
      return;
    }

    const transition = window.__caseHeroTransition;
    if (!transition || transition.slug !== props.slug) {
      return;
    }

    const sourceHero = document.querySelector<HTMLElement>(`[data-case-hero-source="${props.slug}"]`);
    const sourceImage = sourceHero?.querySelector("img") as HTMLImageElement | null;
    const target = rootRef.current;
    const targetImage = target.querySelector("img") as HTMLElement | null;
    const targetRect = (targetImage ?? target).getBoundingClientRect();
    target.style.visibility = "hidden";

    const ghost = document.createElement("div");
    const imageSrc = sourceImage?.currentSrc || sourceImage?.getAttribute("src") || props.src;

    ghost.style.position = "fixed";
    ghost.style.top = `${transition.rect.top}px`;
    ghost.style.left = `${transition.rect.left}px`;
    ghost.style.width = `${transition.rect.width}px`;
    ghost.style.height = `${transition.rect.height}px`;
    ghost.style.backgroundImage = `url("${imageSrc}")`;
    ghost.style.backgroundSize = "cover";
    ghost.style.backgroundPosition = "center";
    ghost.style.backgroundRepeat = "no-repeat";
    ghost.style.borderRadius = "16px";
    ghost.style.zIndex = "130";
    ghost.style.pointerEvents = "none";
    ghost.style.willChange = "top,left,width,height";
    document.body.appendChild(ghost);

    if (sourceHero) {
      sourceHero.style.visibility = "hidden";
      sourceHero.dataset.caseHeroHidden = "true";
    }

    const finish = () => {
      target.style.visibility = "";
      window.__caseHeroTransition = undefined;
      ghost.remove();
    };

    requestAnimationFrame(() => {
      ghost.style.transition = "top 420ms cubic-bezier(0.22, 1, 0.36, 1), left 420ms cubic-bezier(0.22, 1, 0.36, 1), width 420ms cubic-bezier(0.22, 1, 0.36, 1), height 420ms cubic-bezier(0.22, 1, 0.36, 1)";
      ghost.style.top = `${targetRect.top}px`;
      ghost.style.left = `${targetRect.left}px`;
      ghost.style.width = `${targetRect.width}px`;
      ghost.style.height = `${targetRect.height}px`;
    });

    const timeout = window.setTimeout(finish, 450);
    return () => {
      window.clearTimeout(timeout);
      if (ghost.isConnected) {
        ghost.remove();
      }
      if (target) {
        target.style.visibility = "";
      }
    };
  }, [props.alt, props.animateFromCard, props.slug, props.src]);

  return (
    <div
      ref={rootRef}
      className="overflow-hidden rounded-2xl bg-neutral-100"
      data-case-hero-target={props.slug ?? undefined}
      data-case-slug={props.slug ?? undefined}
    >
      <Image src={props.src} alt={props.alt ?? ""} width={props.width} height={props.height} className="h-auto w-full" priority />
    </div>
  );
}
