import { RepositoryProject } from "@/lib/types";

export const repositories: RepositoryProject[] = [
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
    id: "project-scribe",
    name: "Project Scribe",
    description:
      "Structured generation tooling for reliable multi-stage LLM output pipelines.",
    repositoryUrl: "https://github.com/Pandemonium-Research/project-scribe",
    repositoryFullName: "Pandemonium-Research/project-scribe",
  },
  {
    id: "aetheros",
    name: "AetherOS",
    description:
      "Systems research around deterministic scheduling for AI-heavy workloads.",
    repositoryUrl: "https://github.com/Pandemonium-Research/aetheros",
    repositoryFullName: "Pandemonium-Research/aetheros",
  },
];
