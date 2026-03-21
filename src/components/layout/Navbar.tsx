import Link from "next/link";
import BuildingIcon from "@/components/icons/BuildingIcon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "People", href: "/people" },
  { label: "Lab", href: "/lab" },
  { label: "Join", href: "/join" },
];

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-[#2a2a2a]"
      style={{ backgroundColor: "rgba(17,17,17,0.92)", backdropFilter: "blur(8px)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 text-[#f5f5f5] hover:text-white transition-colors">
          <BuildingIcon size={28} className="text-[#f5f5f5]" />
          <span
            className="text-sm font-bold uppercase tracking-widest"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pandemonium Research
          </span>
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu placeholder */}
        <button
          className="md:hidden text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
