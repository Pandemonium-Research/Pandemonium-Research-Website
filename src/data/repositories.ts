import { RepositoryProject } from "@/lib/types";

export const repositories: RepositoryProject[] = [
  {
    id: "stacked",
    name: "Stacked",
    description:
      "A collaborative task management and outreach tracking application designed for academic and professional networking",
    liveUrl: "https://stacked-cm.vercel.app",
    thumbnailUrl: "/thumbnails/stacked.png",
  },
  {
    id: "skilldex",
    name: "Skilldex",
    description:
      "Skilldex is a package manager and registry for Claude .skill packages and reusable skillsets, handling installation at the right scope, compiler-style validation, quality scoring, and AI-powered skill suggestions while integrating natively with Claude Code via MCP",
    repositoryUrl: "https://github.com/Pandemonium-Research/Skilldex",
    repositoryFullName: "Pandemonium-Research/Skilldex",
    liveUrl: "https://skilldex-web.vercel.app",
  },
  {
    id: "opendesign",
    name: "OpenDesign",
    description:
      "An open-source design tool that converts prompts into HTML/CSS/JS prototypes. It extracts design tokens from websites, supports multiple AI providers, and exports to HTML, PDF, and MP4 formats. Self-hostable via Docker Compose.",
    repositoryUrl: "https://github.com/Pandemonium-Research/OpenDesign",
    repositoryFullName: "Pandemonium-Research/OpenDesign",
  },
  {
    id: "kosmos",
    name: "KosmOS",
    description:
      "A bootable Ubuntu server image pre-loaded with LLMs, agent frameworks, and curated tooling. Boot it, SSH in, run an agent. No setup required.",
    repositoryUrl: "https://github.com/Pandemonium-Research/KosmOS",
    repositoryFullName: "Pandemonium-Research/KosmOS",
  },
  {
    id: "craig",
    name: "CRAiG",
    description:
      "An OpenEnv-compliant reinforcement learning environment for evaluating autonomous code refactoring agents. CRAiG enables agents to iteratively apply AST-based transformations on real Python codebases, optimizing code quality metrics like cyclomatic complexity, duplication, coverage, and dead code, while ensuring correctness through continuous test validation with rollback guarantees.",
    repositoryUrl: "https://github.com/Pandemonium-Research/CRAiG",
    repositoryFullName: "Pandemonium-Research/CRAiG",
  },
  {
    id: "devmonitor",
    name: "DevMonitor",
    description:
      "DevMonitor is a real-time developer dashboard that aggregates AI research, LLM leaderboards, and tech updates into a customizable drag-and-drop interface.",
    repositoryUrl: "https://github.com/Pandemonium-Research/DevMonitor",
    repositoryFullName: "Pandemonium-Research/DevMonitor",
    liveUrl: "https://devmonitor.vercel.app",
  },
  {
    id: "hailstorm",
    name: "Hailstorm",
    description:
      "Hailstorm is a lightweight internship outreach manager that automates personalized cold emails, schedules sends across time zones, and tracks each contact through todo-like states.",
    repositoryUrl: "https://github.com/Pandemonium-Research/Hailstorm",
    repositoryFullName: "Pandemonium-Research/Hailstorm",
    liveUrl: "https://hailstorm-one.vercel.app",
  },
];
