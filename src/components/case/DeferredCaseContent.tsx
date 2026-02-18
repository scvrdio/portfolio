"use client";

import { useEffect, useState } from "react";

function getTextNodes(element: HTMLElement): Text[] {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const result: Text[] = [];

  let current = walker.nextNode();
  while (current) {
    result.push(current as Text);
    current = walker.nextNode();
  }

  return result;
}

function wordifyElement(element: HTMLElement, startWordIndex: number): number {
  if (element.dataset.wordified === "true") {
    return startWordIndex;
  }

  const textNodes = getTextNodes(element);
  let wordIndex = startWordIndex;

  textNodes.forEach((textNode) => {
    const value = textNode.nodeValue ?? "";
    if (!value.trim()) return;

    const parts = value.split(/(\s+)/);
    const fragment = document.createDocumentFragment();

    parts.forEach((part) => {
      if (!part) return;

      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part));
        return;
      }

      const span = document.createElement("span");
      span.className = "case-word";
      span.style.setProperty("--word-delay", `${wordIndex * 25}ms`);
      span.textContent = part;
      fragment.appendChild(span);
      wordIndex += 1;
    });

    textNode.parentNode?.replaceChild(fragment, textNode);
  });

  element.classList.add("case-first-word");
  element.dataset.wordified = "true";
  return wordIndex;
}

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

    const firstSection = root.querySelector("section");
    const firstSectionText = firstSection?.querySelectorAll<HTMLElement>(
      ".t-title, .t-accent, .t-body, .t-list li",
    );

    let wordIndex = 0;
    firstSectionText?.forEach((node) => {
      wordIndex = wordifyElement(node, wordIndex);
    });

    const textNodes = root.querySelectorAll<HTMLElement>(
      ".t-title, .t-accent, .t-body, .t-list li",
    );

    textNodes.forEach((node) => {
      if (firstSection?.contains(node)) return;
      node.classList.add("case-instant");
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
