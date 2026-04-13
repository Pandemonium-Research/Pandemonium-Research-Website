import { RepositoryProject } from "@/lib/types";

export const repositories: RepositoryProject[] = [
  {
    id: "stacked",
    name: "Stacked",
    description:
      "A modern tool for managing and visualizing stacked pull requests, making code review workflows faster and clearer.",
    liveUrl: "https://stacked-cm.vercel.app",
  },
  {
    id: "skilldex",
    name: "Skilldex",
    description:
      "A structured index for tracking and organizing skills, built for developers and researchers who want to map their technical knowledge systematically.",
    repositoryUrl: "https://github.com/Pandemonium-Research/Skilldex",
    repositoryFullName: "Pandemonium-Research/Skilldex",
    liveUrl: "https://skilldex-web.vercel.app",
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
