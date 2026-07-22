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
  affiliations?: {
    current?: string[];
    incoming?: string;
    prev?: string[];
  };
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
  npmPackage?: string;
  npmDownloads?: number;
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

export type NewsSource = "linkedin" | "x" | "instagram" | "other";

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  source: NewsSource;
  url: string;
  tags?: string[];
}

