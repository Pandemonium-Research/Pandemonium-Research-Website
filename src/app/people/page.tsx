import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { people } from "@/data/people";
import { Person } from "@/lib/types";
import GitHubIcon from "@/components/icons/GitHubIcon";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GlobeIcon from "@/components/icons/GlobeIcon";

export const metadata: Metadata = {
  title: { absolute: "People - Pandemonium Research" },
  description:
    "Meet the researchers, engineers, and builders behind Pandemonium Research.",
};

function PersonCard({ name, role, bio, imageUrl, affiliations, links }: Person) {
  return (
    <div className="flex flex-col gap-4 border border-border bg-surface-elevated p-6">
      {/* Portrait */}
      <div className="relative w-full aspect-square bg-surface overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name} portrait`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-4xl select-none text-text-secondary">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <h2
          className="text-sm font-bold uppercase text-text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {name}
        </h2>
        <p className="text-xs text-text-secondary tracking-wide uppercase">
          {role}
        </p>
        {affiliations && (
          <p className="text-xs text-text-secondary tracking-wide mt-0.5">
            {affiliations.incoming && (
              <span className="text-text-primary">→ {affiliations.incoming}</span>
            )}
            {affiliations.prev && affiliations.prev.length > 0 && (
              <span>
                {affiliations.incoming && " · "}
                {affiliations.prev.join(" · ")}
              </span>
            )}
          </p>
        )}
      </div>

      {bio && (
        <p className="text-xs text-text-secondary leading-relaxed">{bio}</p>
      )}

      {/* Links */}
      {links && (
        <div className="flex items-center gap-4 mt-auto pt-2">
          {links.github && (
            <Link
              href={links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <GitHubIcon className="w-4 h-4" />
            </Link>
          )}
          {links.linkedin && (
            <Link
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <LinkedInIcon className="w-4 h-4" />
            </Link>
          )}
          {links.website && (
            <Link
              href={links.website}
              target="_blank"
              rel="noreferrer"
              aria-label="Website"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <GlobeIcon className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default function PeoplePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
      <p
        className="text-xs uppercase tracking-widest text-text-secondary mb-6"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        People
      </p>
      <h1
        className="text-4xl sm:text-5xl font-bold uppercase text-text-primary leading-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        The Builders.
      </h1>
      <p className="mt-8 text-text-secondary max-w-lg leading-relaxed">
        Engineers, researchers, and occasional troublemakers.
      </p>

      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person) => (
          <PersonCard key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
}
