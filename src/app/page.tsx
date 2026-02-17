import { HomeHero } from "@/components/home/HomeHero";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { ProjectList } from "@/components/home/ProjectList";

export default function Page() {
  return (
    <div className="space-y-32 mt-16">
      <HomeHero />
      <WaveDivider />
      <ProjectList />
    </div>
  );
}
