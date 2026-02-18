import { CaseTopBar } from "@/components/case/CaseTopBar";
import { CaseHero } from "@/components/case/CaseHero";

export function CasePage({
  title,
  figmaHref,
  linkLabel,
  heroSrc,
  children,
}: {
  title: string;
  figmaHref?: string;
  linkLabel?: string;
  heroSrc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-10">
      <CaseTopBar title={title} figmaHref={figmaHref} linkLabel={linkLabel} />
      <CaseHero src={heroSrc} />
      <article className="space-y-12">{children}</article>
    </div>
  );
}
