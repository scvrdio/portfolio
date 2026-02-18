import { CaseTopBar } from "@/components/case/CaseTopBar";
import { CaseHero } from "@/components/case/CaseHero";

export function CasePage({
  title,
  figmaHref,
  linkLabel,
  heroSrc,
  isModal,
  children,
}: {
  title: string;
  figmaHref?: string;
  linkLabel?: string;
  heroSrc: string;
  isModal?: boolean;
  children: React.ReactNode;
}) {
  if (isModal) {
    return (
      <div className="space-y-10">
        <div className="sticky top-0 z-20 -mx-4 border-b border-black/10 bg-white px-4 py-3 md:-mx-6 md:px-6">
          <CaseTopBar title={title} figmaHref={figmaHref} linkLabel={linkLabel} isModal />
        </div>
        <CaseHero src={heroSrc} />
        <article className="space-y-12">{children}</article>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <CaseTopBar title={title} figmaHref={figmaHref} linkLabel={linkLabel} />
      <CaseHero src={heroSrc} />
      <article className="space-y-12">{children}</article>
    </div>
  );
}
