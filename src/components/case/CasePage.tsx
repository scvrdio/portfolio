import { CaseTopBar } from "@/components/case/CaseTopBar";
import { CaseHero } from "@/components/case/CaseHero";
import { DeferredCaseContent } from "@/components/case/DeferredCaseContent";

export function CasePage({
  title,
  figmaHref,
  linkLabel,
  slug,
  heroSrc,
  heroWidth,
  heroHeight,
  isModal,
  children,
}: {
  title: string;
  figmaHref?: string;
  linkLabel?: string;
  slug?: string;
  heroSrc: string;
  heroWidth: number;
  heroHeight: number;
  isModal?: boolean;
  children: React.ReactNode;
}) {
  if (isModal) {
    return (
      <div className="space-y-10">
        <div className="sticky top-0 z-20 -mx-4 border-b border-black/10 bg-white px-4 py-3 md:-mx-4 md:px-4">
          <CaseTopBar title={title} figmaHref={figmaHref} linkLabel={linkLabel} isModal />
        </div>
        <CaseHero src={heroSrc} slug={slug} width={heroWidth} height={heroHeight} animateFromCard />
        <DeferredCaseContent>
          <article className="space-y-12">{children}</article>
        </DeferredCaseContent>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <CaseTopBar title={title} figmaHref={figmaHref} linkLabel={linkLabel} />
      <CaseHero src={heroSrc} slug={slug} width={heroWidth} height={heroHeight} />
      <article className="space-y-12">{children}</article>
    </div>
  );
}
