import { projects } from "@/data/projects";
import { ProjectBlock } from "./ProjectBlock";

export function ProjectList() {
  return (
    <div className="space-y-14">
      {projects.map((p) => (
        <ProjectBlock key={p.href} p={p as any} />
      ))}
    </div>
  );
}
