import Link from "next/link";
import FoldedCard from "./FoldedCard";
import BuildingIcon from "@/components/icons/BuildingIcon";
import { Project } from "@/lib/types";

export default function ProjectCard({ title, description, href }: Project) {
  return (
    <FoldedCard className="flex flex-col h-full">
      {/* Image area */}
      <div className="w-full aspect-[16/9] bg-[#151515] border-b border-[#2a2a2a] flex items-center justify-center">
        <BuildingIcon size={64} className="text-[#3a3a3a]" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3
          className="text-sm font-bold text-[#f5f5f5]"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {title}
        </h3>
        <p className="text-xs text-[#a0a0a0] leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>
        <Link
          href={href}
          className="inline-flex items-center text-xs font-medium text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors border border-[#2a2a2a] hover:border-[#505050] px-4 py-2 w-fit"
        >
          Read More
        </Link>
      </div>
    </FoldedCard>
  );
}
