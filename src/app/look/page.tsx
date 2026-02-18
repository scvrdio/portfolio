import { CasePage } from "@/components/case/CasePage";
import { LookCaseContent } from "@/components/case/LookCaseContent";

export default function Page() {
  return (
    <CasePage
      title="Look"
      figmaHref="https://t.me/wellook_bot"
      linkLabel="Telegram App"
      heroSrc="/projects/look-hero.png"
    >
      <LookCaseContent />
    </CasePage>
  );
}