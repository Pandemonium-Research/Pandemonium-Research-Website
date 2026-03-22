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
    </div>
  );
}
