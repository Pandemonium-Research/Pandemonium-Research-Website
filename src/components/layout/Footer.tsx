import Link from "next/link";
import BuildingIcon from "@/components/icons/BuildingIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a]">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 border-b border-[#2a2a2a]">
        <h2
          className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#f5f5f5] leading-none"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Join the
          <br />
          Troublemakers.
        </h2>
        <Link
          href="/join"
          className="flex items-center gap-4 border border-[#2a2a2a] hover:border-[#505050] px-8 py-4 text-sm font-medium text-[#f5f5f5] transition-colors hover:bg-[#1a1a1a] group"
        >
          <span style={{ fontFamily: "var(--font-space-grotesk)" }}>Get Involved</span>
          <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Footer bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Logo + name */}
        <div className="flex items-center gap-3">
          <BuildingIcon size={24} className="text-[#a0a0a0]" />
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest text-[#f5f5f5]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pandemonium Research.
            </p>
            <p
              className="text-xs uppercase tracking-widest text-[#a0a0a0]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Independent Lab.
            </p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {[
            { label: "Contact", href: "/contact" },
            { label: "Press", href: "/press" },
            { label: "Join Us", href: "/join" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
