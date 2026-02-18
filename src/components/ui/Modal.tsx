"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MODAL_ANIMATION_MS = 420;
const ModalCloseContext = createContext<(() => void) | null>(null);

export function useModalClose() {
  return useContext(ModalCloseContext);
}

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const requestClose = () => {
    if (!isOpen) return;
    setIsOpen(false);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      router.back();
    }, MODAL_ANIMATION_MS);
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
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-black/60 p-0 transition-opacity duration-[200ms] ease-out md:p-6 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="mx-auto h-full w-full max-w-none px-0 md:max-w-[720px] md:px-4" onClick={(event) => event.stopPropagation()}>
        <div
          className={`flex h-full w-full flex-col overflow-hidden rounded-none bg-white transition-all duration-[200ms] ease-out md:rounded-2xl ${
            isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
          }`}
        >
          <ModalCloseContext.Provider value={requestClose}>
            <div className="modal-scroll-hidden flex-1 overflow-y-auto px-4 pb-6 pt-0 md:px-6 md:pb-8 md:pt-0">{children}</div>
          </ModalCloseContext.Provider>
        </div>
      </div>
    </div>
  );
}
