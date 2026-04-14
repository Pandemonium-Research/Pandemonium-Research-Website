export interface Intersection {
  id: string;
  title: string;
  description: string;
  icon:
  | "neural-net"
  | "server"
  | "question-mark"
  | "shield"
  | "chart-line"
  | "terminal";
}

export interface ResearchHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Person {
  id: string;
  name: string;
  role: string;
  bio?: string;
  quote?: string;
  imageUrl?: string;
  links?: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface RepositoryProject {
  id: string;
  name: string;
  description: string;
  repositoryUrl?: string;
  repositoryFullName?: string;
  liveUrl?: string;
  thumbnailUrl?: string;
}

export interface ResearchPost {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  tags: string[];
  summary: string;
  content: string;
  headings: ResearchHeading[];
  paperUrl?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  authors: string[];
  date: string;
  tags: string[];
  summary: string;
  content: string;
  headings: ResearchHeading[];
  coverImage?: string;
}

export type FormFieldType =
  | "text"
  | "email"
  | "url"
  | "textarea"
  | "checkbox-group"
  | "file";

export interface FormField {
  id: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  /** Only for checkbox-group */
  options?: string[];
}

export type CohortStatus = "open" | "closed" | "coming-soon";

export interface Cohort {
  id: string;
  name: string;
  year: number;
  status: CohortStatus;
  tagline: string;
  description: string[];
  duration: string;
  format: string;
  applicationDeadline?: string;
  startDate?: string;
  endDate?: string;
  lookingFor: string[];
  timeline: { label: string; date: string }[];
}
