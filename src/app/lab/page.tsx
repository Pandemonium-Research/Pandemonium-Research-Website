import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Lab - Pandemonium Research" },
  description: "Tools and experiments from Pandemonium Research.",
};

export default function LabPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      <p className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        Lab
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight" style={{ fontFamily: "var(--font-space-grotesk)" }}>
        The Lab.
      </h1>
      <p className="mt-8 text-[#a0a0a0] max-w-lg leading-relaxed">
        Tools, infrastructure, and experiments from the workshop floor. Coming soon.
      </p>
    </div>
  );
}
