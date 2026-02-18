import { CasePage } from "@/components/case/CasePage";
import { TerminalCaseContent } from "@/components/case/TerminalCaseContent";

export default function Page() {
  return (
    <CasePage title="Terminal" figmaHref="#" heroSrc="/projects/terminal-hero.png">
      <TerminalCaseContent />
    </CasePage>
  );
}