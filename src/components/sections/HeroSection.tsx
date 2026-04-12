import BuildingIllustrationAnimated from "@/components/icons/BuildingIllustrationAnimated";

export default function HeroSection() {
  return (
    <section className="
      max-w-7xl mx-auto px-6 md:px-12
      pt-4 pb-6 lg:py-32
      grid grid-cols-1 lg:grid-cols-2
      gap-4 lg:gap-24
      items-center
      h-[calc(100dvh-4rem)] lg:h-auto lg:min-h-[90vh]
      [grid-template-rows:minmax(0,55%)_auto] lg:[grid-template-rows:none]
    ">
      {/* Left: Text — below illustration on mobile, left on desktop */}
      <div className="flex flex-col gap-3 lg:gap-8 order-2 lg:order-1">
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
            fontSize: "clamp(1.9rem, 6vw, 5rem)",
          }}
        >
          We Build What
          <br />
          Should
          <br />
          Exist.
        </h1>

        {/* Description paragraphs */}
        <div className="flex flex-col gap-3 lg:gap-5 max-w-lg">
          <p className="text-[#a0a0a0] leading-relaxed text-sm lg:text-base">
            In Milton's imagination, Pandemonium was the capital built by fallen
            angels in a single night, raised from nothing by those who refused
            to stop building. We took the name seriously.
          </p>
          <p className="text-[#a0a0a0] leading-relaxed text-sm lg:text-base">
            Pandemonium Research is where engineers and researchers come to
            construct things that don't exist yet.
          </p>
        </div>
      </div>

      {/* Right: Illustration — on top on mobile, right on desktop */}
      <div className="min-h-0 flex items-center justify-center lg:justify-end order-1 lg:order-2">
        <BuildingIllustrationAnimated className="h-full w-auto lg:h-auto lg:w-full lg:max-w-lg" />
      </div>
    </section>
  );
}
