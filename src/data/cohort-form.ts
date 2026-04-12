import { FormField } from "@/lib/types";

/**
 * Summer cohort application form fields.
 *
 * To add, remove, or reorder questions, edit this array.
 * The form renders each entry in order based on its `type`.
 *
 * Supported types:
 *  - "text"           Single-line text input
 *  - "email"          Email input (validated by browser)
 *  - "url"            URL input (validated by browser)
 *  - "textarea"       Multi-line text
 *  - "checkbox-group" One or more checkboxes from an `options` array
 */
export const cohortFormFields: FormField[] = [
  {
    id: "name",
    label: "Full Name",
    type: "text",
    placeholder: "Your name",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
    required: true,
  },
  {
    id: "affiliation",
    label: "University or Affiliation",
    type: "text",
    placeholder: "Where you study or work",
    helperText: "If none, write 'Independent'.",
  },
  {
    id: "graduation_year",
    label: "Expected Graduation Year",
    type: "text",
    placeholder: "e.g. 2027",
    helperText: "Leave blank if not applicable.",
  },
  {
    id: "focus_areas",
    label: "Areas of Interest",
    type: "checkbox-group",
    required: true,
    helperText: "Pick the ones you actually want to work on.",
    options: [
      "Advanced AI Systems",
      "Distributed Systems & Languages",
      "Cybersecurity",
      "Fintech & Financial Systems",
      "Developer Tools",
      "Something else entirely",
    ],
  },
  {
    id: "links",
    label: "GitHub, Portfolio, or Personal Site",
    type: "url",
    placeholder: "https://",
    helperText: "One link. Pick the one that shows your work best.",
  },
  {
    id: "prior_work",
    label: "Link to a Project, Paper, or Writeup",
    type: "url",
    placeholder: "https://",
    helperText:
      "Optional. Something you built or wrote that you're proud of.",
  },
  {
    id: "obsession",
    label: "What problem have you been obsessed with lately?",
    type: "textarea",
    placeholder:
      "Not looking for polish here. Just tell us what's been keeping you up.",
    required: true,
    helperText: "Aim for 150-300 words.",
  },
  {
    id: "build",
    label: "What do you want to build at Pandemonium this summer?",
    type: "textarea",
    placeholder:
      "Be specific. A vague answer here will hurt your application more than anything else.",
    required: true,
    helperText: "Aim for 150-300 words.",
  },
];
