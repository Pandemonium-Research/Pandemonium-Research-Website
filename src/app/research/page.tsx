import type { Metadata } from "next";
import { getAllPosts } from "@/lib/research";
import ResearchCard from "@/components/ui/ResearchCard";

export const metadata: Metadata = {
  title: { absolute: "Research - Pandemonium Research" },
  description:
    "Technical writeups and research from Pandemonium Research on AI systems, distributed computing, cybersecurity, and developer infrastructure.",
};

export default function ResearchPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      {/* Header */}
      <div className="mb-16 max-w-2xl">
        <p
          className="text-xs uppercase tracking-[0.2em] text-[#a0a0a0] mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Research
        </p>
        <h1
          className="text-4xl sm:text-5xl font-bold uppercase text-[#f5f5f5] leading-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          The Work.
        </h1>
        <p className="mt-6 text-[#a0a0a0] leading-relaxed text-base">
          Papers, writeups, and experiments from independent research at Pandemonium.
        </p>
      </div>

      {/* Post list */}
      {posts.length === 0 ? (
        <p className="text-[#505050] text-sm border-t border-[#2a2a2a] pt-8">
          No writeups yet.
        </p>
      ) : (
        <div>
          {posts.map((post) => (
            <ResearchCard key={post.slug} post={post} />
          ))}
          <div className="border-t border-[#2a2a2a]" />
        </div>
      )}
    </div>
  );
}
