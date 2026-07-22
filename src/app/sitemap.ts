import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/research";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://pandemonium-research.vercel.app";

const staticRoutes = [
  { url: "/", priority: 1.0 },
  { url: "/research", priority: 0.9 },
  { url: "/blog", priority: 0.9 },
  { url: "/people", priority: 0.8 },
  { url: "/projects", priority: 0.8 },
  { url: "/join", priority: 0.8 },
  { url: "/contact", priority: 0.5 },
  { url: "/lab", priority: 0.5 },
  { url: "/press", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const researchPosts = getAllPosts();
  const blogPosts = getAllBlogPosts();

  const researchEntries: MetadataRoute.Sitemap = researchPosts.map((post) => ({
    url: `${BASE_URL}/research/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ url, priority }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: new Date(),
    changeFrequency: url === "/" ? "weekly" : "monthly",
    priority,
  }));

  return [...staticEntries, ...researchEntries, ...blogEntries];
}
