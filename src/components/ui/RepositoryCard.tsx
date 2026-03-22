import Link from "next/link";
import FoldedCard from "./FoldedCard";
import BuildingIcon from "@/components/icons/BuildingIcon";
import { RepositoryProject } from "@/lib/types";

function buildGithubPreview(repositoryFullName: string) {
  return `https://opengraph.githubassets.com/1/${repositoryFullName}`;
}

export default function RepositoryCard({
  name,
  description,
  repositoryUrl,
  repositoryFullName,
  liveUrl,
  thumbnailUrl,
}: RepositoryProject) {
  const previewImage = thumbnailUrl ?? buildGithubPreview(repositoryFullName);

  return (
    <FoldedCard className="flex flex-col h-full overflow-hidden">
      <div className="relative w-full aspect-video border-b border-border bg-surface-elevated">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${name} preview thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <BuildingIcon size={56} className="text-border" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
      </div>

      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3
          className="text-sm font-bold text-text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {name}
        </h3>

        <p className="text-xs text-text-secondary leading-relaxed flex-1 line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-[#505050] px-4 py-2"
          >
            Repository
          </Link>

          {liveUrl ? (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center text-xs font-medium text-text-secondary hover:text-text-primary transition-colors border border-border hover:border-[#505050] px-4 py-2"
            >
              Live Site
            </Link>
          ) : null}
        </div>
      </div>
    </FoldedCard>
  );
}
