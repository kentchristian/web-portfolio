import type { projectsType } from "../../types/dashboard-types";
import { v4 as uuidv4} from "uuid"

export const projects: projectsType[] = [
  {
    key: uuidv4(),
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Task Management App",
    description:
      "A productivity-focused task management app that helps users organize projects, set deadlines, and collaborate with teams in real time.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Firebase"],
  },
  {
    key: uuidv4(),
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, shopping cart, secure checkout, and admin dashboard.",
    techStack: ["Next.js", "Node.js", "Express", "MongoDB"],
  },
  {
    key: uuidv4(),
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Developer Portfolio",
    description:
      "A personal portfolio website showcasing projects, skills, and experience with a clean and responsive design.",
    techStack: ["React", "Vite", "CSS Modules", "Framer Motion"],
  },
  {
    key: uuidv4(),
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    title: "Real-Time Chat Application",
    description:
      "A real-time chat app supporting private rooms, typing indicators, and online presence using WebSockets.",
    techStack: ["React", "Socket.IO", "Node.js", "Redis"],
  },
];
