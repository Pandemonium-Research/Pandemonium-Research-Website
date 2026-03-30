"use client";

import dynamic from "next/dynamic";

const BuildingScene = dynamic(
  () => import("@/components/icons/BuildingScene"),
  { ssr: false },
);

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[90vh]">
      {/* Left: Text content */}
      <div className="flex flex-col gap-8">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="w-0.5 h-6 bg-[#a0a0a0]" />
          <span
            className="text-xs font-medium uppercase tracking-[0.2em] text-[#a0a0a0]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Why We Exist
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-bold uppercase text-[#f5f5f5] leading-[0.95] tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          We Build What
          <br />
          Should
          <br />
          Exist.
        </h1>

        {/* Description paragraphs */}
        <div className="flex flex-col gap-5 max-w-lg">
          <p className="text-[#a0a0a0] leading-relaxed text-base">
            In Milton's imagination, Pandemonium was the capital built by fallen
            angels in a single night, raised from nothing by those who refused
            to stop building. We took the name seriously.
          </p>
          <p className="text-[#a0a0a0] leading-relaxed text-base">
            Pandemonium Research is where engineers and researchers come to
            construct things that don't exist yet.
          </p>
        </div>
      </div>

      {/* Right: 3D Building */}
      <div className="flex items-center justify-center lg:justify-end">
        <BuildingScene className="w-full max-w-md lg:max-w-lg" />
      </div>
    </section>
  );
}
