import { notFound } from "next/navigation";
import { CaseBySlug } from "@/components/case/CaseBySlug";
import { getCaseDefinition } from "@/components/case/caseDefinitions";
import { Modal } from "@/components/ui/Modal";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!getCaseDefinition(slug)) {
    notFound();
  }

  return (
    <Modal>
      <CaseBySlug slug={slug} isModal />
    </Modal>
  );
}
