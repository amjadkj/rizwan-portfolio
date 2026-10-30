import fs from "fs";
import path from "path";
import type { Project } from "@/types/project";

const PROJECTS_DIRECTORY = path.join(process.cwd(), "data", "projects");

export function getAllProjects(): Project[] {
  try {
    if (!fs.existsSync(PROJECTS_DIRECTORY)) {
      return [];
    }

    const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
    const projects: Project[] = [];

    for (const fileName of fileNames) {
      if (fileName.endsWith(".json")) {
        const filePath = path.join(PROJECTS_DIRECTORY, fileName);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const project = JSON.parse(fileContents) as Project;
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return [];
  }
}

export function getProject(slug: string): Project | null {
  try {
    const filePath = path.join(PROJECTS_DIRECTORY, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      // Also try searching in all projects if slug is inside the JSON
      const all = getAllProjects();
      const found = all.find((p) => p.slug === slug);
      return found ?? null;
    }

    const fileContents = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileContents) as Project;
  } catch (error) {
    console.error(`Error loading project with slug ${slug}:`, error);
    return null;
  }
}

