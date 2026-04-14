import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import katex from "katex";
import type { BlogPost, ResearchHeading } from "@/lib/types";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

marked.setOptions({ gfm: true });

// ---------------------------------------------------------------------------
// Math pre-processing
//
// marked's GFM italic parser processes underscores before any extension
// tokenizer runs in marked v17, breaking inline math like $Z_N$.
// Fix: extract all math regions before marked sees them, render with KaTeX
// directly, then restore after marked is done.
// ---------------------------------------------------------------------------

function renderWithMath(markdown: string): string {
  const store: string[] = [];

  function stash(html: string): string {
    store.push(html);
    return `\x02MATH${store.length - 1}\x03`;
  }

  // Block math $$...$$ — must come before inline to avoid mis-matching
  let src = markdown.replace(/\$\$([\s\S]*?)\$\$/g, (_, tex) =>
    stash(katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false, output: "html" }))
  );

  // Inline math $...$ — don't match $$, don't cross newlines
  src = src.replace(/(?<!\$)\$(?!\$)((?:[^\n$\\]|\\[\s\S])+?)(?<!\$)\$(?!\$)/g, (_, tex) =>
    stash(katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false, output: "html" }))
  );

  // Run marked — math tokens (\x02MATH0\x03) are opaque to GFM
  let html = marked(src) as string;

  // Restore — block math placeholder may be wrapped in <p> by marked
  html = html.replace(/<p>\x02MATH(\d+)\x03<\/p>/g, (_, i) =>
    `<div class="math-display">${store[+i]}</div>`
  );
  html = html.replace(/\x02MATH(\d+)\x03/g, (_, i) => store[+i]);

  return html;
}

// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(markdown: string): ResearchHeading[] {
  const headings: ResearchHeading[] = [];
  for (const line of markdown.split("\n")) {
    const trimmed = line.trimEnd();
    const m2 = trimmed.match(/^## (.+)$/);
    const m3 = trimmed.match(/^### (.+)$/);
    if (m2) headings.push({ id: slugify(m2[1]), text: m2[1], level: 2 });
    else if (m3) headings.push({ id: slugify(m3[1]), text: m3[1], level: 3 });
  }
  return headings;
}

function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])(?:[^>]*)>([\s\S]*?)<\/h[23]>/g, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugify(text);
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
}

function wrapTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="prose-table-wrapper"><table>')
    .replace(/<\/table>/g, "</table></div>");
}

function parsePost(filename: string): BlogPost {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const slug = data.slug ?? filename.replace(/\.md$/, "");
  const headings = extractHeadings(content);
  const rendered = wrapTables(injectHeadingIds(renderWithMath(content)));
  return {
    slug,
    title: data.title ?? "",
    authors: data.authors ?? [],
    date: data.date ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    content: rendered,
    headings,
    coverImage: data.coverImage,
  };
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map(parsePost)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const filename = files.find((f) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), "utf-8");
    const { data } = matter(raw);
    return (data.slug ?? f.replace(/\.md$/, "")) === slug;
  });
  if (!filename) return null;
  return parsePost(filename);
}

export function getAllBlogSlugs(): string[] {
  return getAllBlogPosts().map((p) => p.slug);
}
