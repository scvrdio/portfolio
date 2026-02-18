import { LookCaseContent } from "@/components/case/LookCaseContent";
import { PopolamCaseContent } from "@/components/case/PopolamCaseContent";
import { TerminalCaseContent } from "@/components/case/TerminalCaseContent";
import type { ReactNode } from "react";

type CaseDefinition = {
  title: string;
  figmaHref?: string;
  linkLabel?: string;
  heroSrc: string;
  render: () => ReactNode;
};

export const caseDefinitions = {
  look: {
    title: "Look",
    figmaHref: "https://t.me/wellook_bot",
    linkLabel: "Telegram App",
    heroSrc: "/projects/look-hero.png",
    render: () => <LookCaseContent />,
  },
  popolam: {
    title: "Popolam",
    figmaHref:
      "https://www.figma.com/design/YSb8QXs053NIUCRF9qtqTV/%D0%9F%D0%BE%D0%BF%D0%BE%D0%BB%D0%B0%D0%BC?node-id=0-1&t=ie10ciZHeCxHMfsz-1",
    heroSrc: "/projects/popolam-hero.png",
    render: () => <PopolamCaseContent />,
  },
  terminal: {
    title: "Terminal",
    figmaHref: "#",
    heroSrc: "/projects/terminal-hero.png",
    render: () => <TerminalCaseContent />,
  },
} satisfies Record<string, CaseDefinition>;

export type CaseSlug = keyof typeof caseDefinitions;

export function getCaseDefinition(slug: string): CaseDefinition | null {
  return caseDefinitions[slug as CaseSlug] ?? null;
}
