import projectsCardData from "../../data/projects-card-data.json";
import type { projectsType } from "../../types/dashboard-types";

type ProjectsCardData = {
  id: string;
  image: string;
  title: string;
  description: string;
  techStack: string[];
};

export const projects: projectsType[] = (projectsCardData as ProjectsCardData[]).map((item) => ({
  key: item.id,
  image: item.image,
  title: item.title,
  description: item.description,
  techStack: item.techStack,
}));
