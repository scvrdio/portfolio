import { CasePage } from "@/components/case/CasePage";
import { getCaseDefinition } from "@/components/case/caseDefinitions";

export function CaseBySlug({ slug, isModal }: { slug: string; isModal?: boolean }) {
  const definition = getCaseDefinition(slug);

  if (!definition) {
    return null;
  }

  return (
    <CasePage
      title={definition.title}
      figmaHref={definition.figmaHref}
      linkLabel={definition.linkLabel}
      heroSrc={definition.heroSrc}
      isModal={isModal}
    >
      {definition.render()}
    </CasePage>
  );
}
