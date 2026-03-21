import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { ResearchPost, ResearchHeading } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "research");

marked.setOptions({
  gfm: true,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(markdown: string): ResearchHeading[] {
  const headings: ResearchHeading[] = [];
  for (const line of markdown.split("\n")) {
    const m2 = line.match(/^## (.+)$/);
    const m3 = line.match(/^### (.+)$/);
    if (m2) headings.push({ id: slugify(m2[1]), text: m2[1], level: 2 });
    else if (m3) headings.push({ id: slugify(m3[1]), text: m3[1], level: 3 });
  }
  return headings;
}

/** Inject id attributes into rendered h2/h3 tags. */
function injectHeadingIds(html: string): string {
  return html.replace(/<(h[23])>([\s\S]*?)<\/h[23]>/g, (_, tag, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    const id = slugify(text);
    return `<${tag} id="${id}">${inner}</${tag}>`;
  });
}

function parsePost(filename: string): ResearchPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = data.slug ?? filename.replace(/\.md$/, "");
  const headings = extractHeadings(content);
  const rendered = injectHeadingIds(marked(content) as string);
  return {
    slug,
    title: data.title ?? "",
    authors: data.authors ?? [],
    date: data.date ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    content: rendered,
    headings,
  };
}

export function getAllPosts(): ResearchPost[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): ResearchPost | null {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const filename = files.find((f) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
    const { data } = matter(raw);
    return (data.slug ?? f.replace(/\.md$/, "")) === slug;
  });
  if (!filename) return null;
  return parsePost(filename);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
