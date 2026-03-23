export interface Project {
  id: string;
  title: string;
  description: string;
  href: string;
}

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

export interface RepositoryProject {
  name: string;
  description: string;
  repositoryUrl: string;
  repositoryFullName: string;
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
}
