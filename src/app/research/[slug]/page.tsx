import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/research";
import TableOfContents from "@/components/ui/TableOfContents";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} - Pandemonium Research` },
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ResearchPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    keywords: post.tags,
    publisher: {
      "@type": "Organization",
      name: "Pandemonium Research",
      url: "https://pandemonium-research.vercel.app",
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Back link */}
      <Link
        href="/research"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#707070] hover:text-[#c0c0c0] transition-colors mb-12"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        ← Research
      </Link>

      {/* Two-column layout: TOC left, content right */}
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 items-start">

        {/* Sticky TOC sidebar */}
        <aside className="hidden lg:block sticky top-28">
          <TableOfContents headings={post.headings} />
        </aside>

        {/* Main content */}
        <article className="min-w-0">
          {/* Header */}
          <div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.12em] text-[#707070] border border-[#3a3a3a] px-2 py-0.5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-[#f5f5f5] leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-4">
              <p className="text-sm text-[#a0a0a0]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {post.authors.join(", ")}
              </p>
              <span className="text-[#3a3a3a]">·</span>
              <p className="text-sm text-[#707070]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                {formatDate(post.date)}
              </p>
            </div>

            {/* Summary callout */}
            <p className="mt-6 text-[#a0a0a0] text-base leading-relaxed border-l-2 border-[#2a2a2a] pl-5 italic">
              {post.summary}
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-[#2a2a2a] my-12" />

          {/* Body */}
          <div
            className="prose-research"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
