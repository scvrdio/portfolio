import { notFound } from "next/navigation";
import { CaseBySlug } from "@/components/case/CaseBySlug";
import { getCaseDefinition } from "@/components/case/caseDefinitions";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!getCaseDefinition(slug)) {
    notFound();
  }

  return <CaseBySlug slug={slug} />;
}
