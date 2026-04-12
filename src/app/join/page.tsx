import type { Metadata } from "next";
import Link from "next/link";
import { getLatestCohort } from "@/data/cohorts";
import { CohortStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: { absolute: "Join - Pandemonium Research" },
  description:
    "Find ways to get involved with Pandemonium Research, from cohort programs to open collaboration.",
};

const statusLabel: Record<CohortStatus, string> = {
  open: "Applications Open",
  closed: "Applications Closed",
  "coming-soon": "Coming Soon",
};

const statusColor: Record<CohortStatus, string> = {
  open: "text-green-400 border-green-400/30",
  closed: "text-[#505050] border-[#2a2a2a]",
  "coming-soon": "text-yellow-400 border-yellow-400/30",
};

export default function JoinPage() {
  const cohort = getLatestCohort();

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[#2a2a2a]">
        {/* Summer cohort */}
        {cohort && (
          <Link
            href="/join/cohort"
            className="group flex flex-col justify-between bg-[#111111] p-5 sm:p-8 hover:bg-[#161616] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <p
                  className="text-xs uppercase tracking-widest text-[#a0a0a0]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Summer Cohort
                </p>
                <span
                  className={`text-xs uppercase tracking-widest border px-2.5 py-1 ${statusColor[cohort.status]}`}
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {statusLabel[cohort.status]}
                </span>
              </div>
              <h2
                className="text-2xl font-bold uppercase text-[#f5f5f5] mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {cohort.name} {cohort.year}
              </h2>
              <p className="text-sm text-[#a0a0a0] leading-relaxed">
                {cohort.tagline}
              </p>
            </div>
            <span
              className="mt-8 text-xs uppercase tracking-widest text-[#505050] group-hover:text-[#a0a0a0] transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              View program + apply &rarr;
            </span>
          </Link>
        )}

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
