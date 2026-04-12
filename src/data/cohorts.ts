import { Cohort } from "@/lib/types";

export const cohorts: Cohort[] = [
  {
    id: "summer-2026",
    name: "Summer Research Cohort",
    year: 2026,
    status: "open",
    tagline: "Ten weeks. Real problems. No handholding.",
    description: [
      "The Pandemonium Summer Cohort is a ten-week research and build program for students and early-career engineers who want to work on problems that actually matter.",
      "You won't be maintaining dashboards or writing internal tooling. You'll be embedded in active research threads, working alongside the core team on the same problems we're obsessing over.",
      "We're small by design. Every cohort member gets real ownership, real feedback, and the freedom to go deep.",
    ],
    duration: "10 weeks",
    format: "Remote-first",
    applicationDeadline: "2026-05-01",
    startDate: "2026-06-09",
    endDate: "2026-08-14",
    lookingFor: [
      "You've built something real and can talk honestly about where it broke",
      "You're comfortable sitting with a problem you don't fully understand yet",
      "You read papers, even when nobody asked you to",
      "You have a specific thing you want to go deep on, not a general interest in 'AI'",
      "You're an undergraduate, graduate student, or recent graduate -- or none of those, and you have the work to show for it",
    ],
    timeline: [
      { label: "Applications open", date: "April 10, 2026" },
      { label: "Application deadline", date: "May 1, 2026" },
      { label: "Decisions sent", date: "May 15, 2026" },
      { label: "Cohort begins", date: "June 9, 2026" },
      { label: "Cohort ends", date: "August 14, 2026" },
    ],
  },
];

export function getLatestCohort(): Cohort | undefined {
  return cohorts[0];
}
