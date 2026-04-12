import type { Metadata } from "next";
import RepositoryCard from "@/components/ui/RepositoryCard";
import { repositories } from "@/data/repositories";

export const metadata: Metadata = {
  title: { absolute: "Projects - Pandemonium Research" },
  description:
    "Open-source projects built by Pandemonium Research across AI systems, developer tooling, and infrastructure.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-32">
      <p
        className="text-xs uppercase tracking-widest text-text-secondary mb-6"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Projects
      </p>
      <h1
        className="text-5xl font-bold uppercase text-text-primary leading-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Active Projects.
      </h1>
      <p className="mt-8 text-text-secondary max-w-lg leading-relaxed">
        Ongoing builds, prototypes, and applied research efforts from
        Pandemonium Research.
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repositories.map((repository) => (
          <RepositoryCard key={repository.id} {...repository} />
        ))}
      </div>
    </div>
  );
}
