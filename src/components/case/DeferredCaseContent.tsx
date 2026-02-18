"use client";

import { useEffect, useState } from "react";

export function DeferredCaseContent({
  children,
  delayMs = 280,
}: {
  children: React.ReactNode;
  delayMs?: number;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMounted(true);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delayMs]);

  useEffect(() => {
    if (!isMounted) return;

    const frame = window.requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [isMounted]);

  useEffect(() => {
    if (!isVisible || !root) return;

    const textNodes = root.querySelectorAll<HTMLElement>(".t-title, .t-accent, .t-body, .t-list li");
    textNodes.forEach((node, index) => {
      node.style.setProperty("--type-delay", `${index * 130}ms`);
    });
  }, [isVisible, root]);

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={setRoot} className={isVisible ? "case-typewriting case-typewriting--run" : "case-typewriting"}>
      {children}
    </div>
  );
}
