"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MODAL_ANIMATION_MS = 200;
const HERO_TRANSITION_MS = 420;
const ModalCloseContext = createContext<(() => void) | null>(null);

export function useModalClose() {
  return useContext(ModalCloseContext);
}

function restoreHiddenSourceHeroes() {
  const hiddenSources = document.querySelectorAll<HTMLElement>('[data-case-hero-hidden="true"]');
  hiddenSources.forEach((element) => {
    element.style.visibility = "";
    delete element.dataset.caseHeroHidden;
  });
}

function runReverseHeroTransition() {
  const modalHero = document.querySelector<HTMLElement>("[data-case-hero-target][data-case-slug]");
  if (!modalHero) return 0;

  const slug = modalHero.dataset.caseSlug;
  if (!slug) return 0;

  const sourceHero = document.querySelector<HTMLElement>(`[data-case-hero-source="${slug}"]`);
  if (!sourceHero) return 0;

  const modalImage = modalHero.querySelector("img") as HTMLImageElement | null;
  const sourceImage = sourceHero.querySelector("img") as HTMLImageElement | null;

  const from = (modalImage ?? modalHero).getBoundingClientRect();
  const to = (sourceImage ?? sourceHero).getBoundingClientRect();

  const ghost = document.createElement("div");
  const imageSrc = modalImage?.currentSrc || modalImage?.getAttribute("src");
  if (!imageSrc) return 0;

  ghost.style.position = "fixed";
  ghost.style.top = `${from.top}px`;
  ghost.style.left = `${from.left}px`;
  ghost.style.width = `${from.width}px`;
  ghost.style.height = `${from.height}px`;
  ghost.style.backgroundImage = `url("${imageSrc}")`;
  ghost.style.backgroundSize = "cover";
  ghost.style.backgroundPosition = "center";
  ghost.style.backgroundRepeat = "no-repeat";
  ghost.style.borderRadius = "16px";
  ghost.style.zIndex = "130";
  ghost.style.pointerEvents = "none";
  ghost.style.willChange = "top,left,width,height";
  document.body.appendChild(ghost);

  modalHero.style.visibility = "hidden";
  sourceHero.style.visibility = "hidden";

  requestAnimationFrame(() => {
    ghost.style.transition = `top ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), left ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), width ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), height ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
    ghost.style.top = `${to.top}px`;
    ghost.style.left = `${to.left}px`;
    ghost.style.width = `${to.width}px`;
    ghost.style.height = `${to.height}px`;
  });

  window.setTimeout(() => {
    if (ghost.isConnected) {
      ghost.remove();
    }
    modalHero.style.visibility = "";
    sourceHero.style.visibility = "";
  }, HERO_TRANSITION_MS + 40);

  return HERO_TRANSITION_MS;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClosingRef = useRef(false);

  const requestClose = () => {
    if (!isOpen || isClosingRef.current) return;
    isClosingRef.current = true;

    const heroDuration = runReverseHeroTransition();
    setIsOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      router.back();
    }, Math.max(MODAL_ANIMATION_MS, heroDuration));
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => {
      cancelAnimationFrame(frame);
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
      restoreHiddenSourceHeroes();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] h-dvh overflow-hidden bg-white p-0 transition-opacity duration-[100ms] ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto h-full w-full max-w-none px-0 md:max-w-[720px] md:px-4" onClick={(event) => event.stopPropagation()}>
        <div className={`flex h-full w-full flex-col overflow-hidden rounded-none bg-white transition-all duration-[100ms] ease-in-out md:rounded-2xl ${isOpen ? "opacity-100" : "opacity-0"}`}>
          <ModalCloseContext.Provider value={requestClose}>
            <div className="modal-scroll-hidden flex-1 overflow-y-auto px-4 pb-6 pt-0 md:px-4 md:pb-8 md:pt-0">{children}</div>
          </ModalCloseContext.Provider>
        </div>
      </div>
    </div>
  );
}
