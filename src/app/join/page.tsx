import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Join - Pandemonium Research" },
  description:
    "Find ways to get involved with Pandemonium Research through open collaboration.",
};

export default function JoinPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      {/* Header */}
      <div className="max-w-2xl mb-20">
        <p
          className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Join Us
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Become a Troublemaker.
        </h1>
        <p className="mt-8 text-[#a0a0a0] max-w-lg leading-relaxed">
          Pandemonium Research is where engineers and researchers come to
          construct things that do not exist yet. If that sounds like you, we
          want to hear from you.
        </p>
      </div>

      {/* Opportunity cards */}
      <div className="grid grid-cols-1 gap-px border border-[#2a2a2a]">
        {/* General inquiry */}
        <Link
          href="/contact"
          className="group flex flex-col justify-between bg-[#111111] p-5 sm:p-8 hover:bg-[#161616] transition-colors"
        >
          <div>
            <p
              className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              General
            </p>
            <h2
              className="text-2xl font-bold uppercase text-[#f5f5f5] mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Get In Touch
            </h2>
            <p className="text-sm text-[#a0a0a0] leading-relaxed">
              Partnerships, press, research collaborations, or just something
              you think we should know about.
            </p>
          </div>
          <span
            className="mt-8 text-xs uppercase tracking-widest text-[#505050] group-hover:text-[#a0a0a0] transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Contact us &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
