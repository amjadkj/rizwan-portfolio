import ProjectIntro from "./ProjectIntro";
import ProjectAssessment from "./ProjectAssessment";
import ProjectStakeholders from "./ProjectStakeholders";
import ProjectComparison from "./ProjectComparison";
import ProjectEvaluation from "./ProjectEvaluation";
import ProjectValidation from "./ProjectValidation";

import type { Project } from "@/types/project";

export default function ProjectTemplate({ project }: { project: Project }) {
  return (
    <main className="flex-1 flex flex-col w-full overflow-hidden">
      <ProjectIntro {...project.intro} />
      {project.assessment && (project.assessment.description?.length || project.assessment.image?.src) ? (
        <ProjectAssessment {...project.assessment} />
      ) : null}
      {project.stakeholders?.points?.length ? (
        <ProjectStakeholders {...project.stakeholders} />
      ) : null}
      {project.comparison ? (
        <ProjectComparison {...project.comparison} />
      ) : null}
      {project.evaluation?.points?.length ? (
        <ProjectEvaluation {...project.evaluation} />
      ) : null}
      {project.validation && (project.validation.points?.length || project.validation.images?.length) ? (
        <ProjectValidation {...project.validation} />
      ) : null}
    </main>
  );
}

