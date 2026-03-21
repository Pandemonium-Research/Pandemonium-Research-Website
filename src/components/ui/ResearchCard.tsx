import Link from "next/link";
import type { ResearchPost } from "@/lib/types";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ResearchCard({ post }: { post: ResearchPost }) {
  return (
    <article className="border-t border-[#2a2a2a] py-8 group">
      <Link href={`/research/${post.slug}`} className="block">
        <div className="flex flex-col md:flex-row md:items-start md:gap-12">
          {/* Date + tags column */}
          <div className="flex-shrink-0 mb-3 md:mb-0 md:w-40">
            <p
              className="text-xs text-[#707070] tabular-nums"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {formatDate(post.date)}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.12em] text-[#707070] border border-[#3a3a3a] px-1.5 py-0.5"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content column */}
          <div className="flex-1">
            <h2
              className="text-lg font-bold text-[#f5f5f5] leading-snug group-hover:text-[#a0a0a0] transition-colors duration-150"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title}
            </h2>
            <p className="text-xs text-[#a0a0a0] mt-1" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              {post.authors.join(", ")}
            </p>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mt-3 max-w-2xl">
              {post.summary}
            </p>
            <span
              className="inline-block mt-4 text-xs uppercase tracking-[0.15em] text-[#707070] group-hover:text-[#c0c0c0] transition-colors duration-150"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Read writeup →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
