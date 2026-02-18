import { CasePage } from "@/components/case/CasePage";
import { PopolamCaseContent } from "@/components/case/PopolamCaseContent";

export default function Page() {
  return (
    <CasePage
      title="Popolam"
      figmaHref="https://www.figma.com/design/YSb8QXs053NIUCRF9qtqTV/%D0%9F%D0%BE%D0%BF%D0%BE%D0%BB%D0%B0%D0%BC?node-id=0-1&t=ie10ciZHeCxHMfsz-1"
      heroSrc="/projects/popolam-hero.png"
      heroWidth={2016}
      heroHeight={1310}
    >
      <PopolamCaseContent />
    </CasePage>
  );
}
