import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import CoreIntersections from "@/components/sections/CoreIntersections";
import WorkingInTheDark from "@/components/sections/WorkingInTheDark";

export const metadata: Metadata = {
  title: { absolute: "Pandemonium Research" },
  description:
    "Pandemonium Research is an independent research group building open-source tools and publishing work across AI systems, distributed computing, cybersecurity, and developer infrastructure.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pandemonium Research",
  url: "https://pandemonium-research.vercel.app",
  logo: "https://pandemonium-research.vercel.app/pandemonium_research_logo.png",
  description:
    "Pandemonium Research is an independent research group building open-source tools and publishing work across AI systems, distributed computing, cybersecurity, and developer infrastructure.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <CoreIntersections />
      <WorkingInTheDark />
    </>
  );
}
