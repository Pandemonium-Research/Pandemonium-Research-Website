import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getLatestCohort } from "@/data/cohorts";
import { cohortFormFields } from "@/data/cohort-form";
import ApplicationForm from "@/components/ui/ApplicationForm";
import { CohortStatus } from "@/lib/types";

export const metadata: Metadata = {
  title: { absolute: "Cohort Program - Pandemonium Research" },
  description:
    "Apply to the Pandemonium Research cohort program for builders working on ambitious technical projects.",
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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function CohortPage() {
  const cohort = getLatestCohort();
  if (!cohort) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      {/* Back link */}
      <Link
        href="/join"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#707070] hover:text-[#c0c0c0] transition-colors mb-6"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        ← Join
      </Link>

      {/* ----------------------------------------------------------------- */}
      {/* Header                                                             */}
      {/* ----------------------------------------------------------------- */}
      <div className="max-w-2xl mb-20">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 mb-6">
          <h1
            className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {cohort.name} {cohort.year}
          </h1>
          <span
            className={`shrink-0 self-start sm:mt-2 text-xs uppercase tracking-widest border px-2.5 py-1 ${statusColor[cohort.status]}`}
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {statusLabel[cohort.status]}
          </span>
        </div>

        <p className="text-[#a0a0a0] text-lg leading-relaxed">
          {cohort.tagline}
        </p>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Quick stats                                                        */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-px border border-[#2a2a2a] mb-20">
        {[
          { label: "Duration", value: cohort.duration },
          { label: "Format", value: cohort.format },
          ...(cohort.applicationDeadline
            ? [{ label: "Deadline", value: formatDate(cohort.applicationDeadline) }]
            : []),
        ].map(({ label, value }) => (
          <div key={label} className="bg-[#111111] px-6 py-5">
            <p
              className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {label}
            </p>
            <p className="text-[#f5f5f5] text-sm">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-20">
        {/* --------------------------------------------------------------- */}
        {/* Left column: program info                                        */}
        {/* --------------------------------------------------------------- */}
        <div className="flex flex-col gap-16">
          {/* About */}
          <section>
            <h2
              className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              About the Program
            </h2>
            <div className="flex flex-col gap-4">
              {cohort.description.map((para, i) => (
                <p key={i} className="text-[#a0a0a0] leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </section>

          {/* Who we're looking for */}
          <section>
            <h2
              className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Who We're Looking For
            </h2>
            <ul className="flex flex-col gap-3">
              {cohort.lookingFor.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[#a0a0a0]">
                  <span className="text-[#505050] mt-0.5 shrink-0">--</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section>
            <h2
              className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-6"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Timeline
            </h2>
            <div className="flex flex-col">
              {cohort.timeline.map(({ label, date }, i) => (
                <div
                  key={i}
                  className="flex justify-between items-baseline border-t border-[#2a2a2a] py-4 last:border-b"
                >
                  <span className="text-sm text-[#a0a0a0]">{label}</span>
                  <span
                    className="text-sm text-[#f5f5f5]"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* Right column: application form                                   */}
        {/* --------------------------------------------------------------- */}
        <div>
          <h2
            className="text-xs uppercase tracking-widest text-[#a0a0a0] mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {cohort.status === "open" ? "Apply" : "Applications are currently closed"}
          </h2>

          {cohort.status === "open" ? (
            <ApplicationForm fields={cohortFormFields} />
          ) : (
            <p className="text-sm text-[#505050]">
              Check back when applications reopen, or reach out at{" "}
              <a
                href="mailto:hello@pandemoniumresearch.com"
                className="text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors underline underline-offset-4"
              >
                hello@pandemoniumresearch.com
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
