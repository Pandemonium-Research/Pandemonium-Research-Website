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
  icon: "neural-net" | "server" | "question-mark";
}
