import { Cohort } from "@/lib/types";

export const cohorts: Cohort[] = [
  {
    id: "summer-2026",
    name: "Summer Research Cohort",
    year: 2026,
    status: "closed",
    tagline: "Four weeks. Real problems. No handholding.",
    description: [
      "The Pandemonium Summer Cohort is a four-week research and build program for students and early-career engineers who want to work on problems that actually matter.",
      "You won't be maintaining dashboards or writing internal tooling. You'll be embedded in active research threads, working alongside the core team on the same problems we're obsessing over.",
      "We're small by design. Every cohort member gets real ownership, real feedback, and the freedom to go deep.",
    ],
    duration: "4 weeks",
    format: "Remote-first",
    applicationDeadline: "2026-06-01",
    startDate: "2026-06-29",
    endDate: "2026-07-26",
    lookingFor: [
      "You've built something real and can talk honestly about where it broke",
      "You're comfortable sitting with a problem you don't fully understand yet",
      "You read papers, even when nobody asked you to",
      "You have a specific thing you want to go deep on, not a general interest in 'AI'",
      "You're an undergraduate, graduate student, or recent graduate -- or none of those, and you have the work to show for it",
    ],
    timeline: [
      { label: "Applications open", date: "April 10, 2026" },
      { label: "Application deadline", date: "June 1, 2026" },
      { label: "Decisions sent", date: "June 15, 2026" },
      { label: "Cohort begins", date: "June 29, 2026" },
      { label: "Cohort ends", date: "July 26, 2026" },
    ],
    contactEmail: "pandemoniumresearch@gmail.com",
  },
];

export function getLatestCohort(): Cohort | undefined {
  return cohorts[0];
}
