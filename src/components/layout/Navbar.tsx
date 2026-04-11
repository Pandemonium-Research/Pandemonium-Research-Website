"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BuildingIcon from "@/components/icons/BuildingIcon";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "People", href: "/people" },
  { label: "Lab", href: "/lab" },
  { label: "Join", href: "/join" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-[#2a2a2a]"
        style={{
          backgroundColor: "rgba(17,17,17,0.92)",
          backdropFilter: "blur(8px)",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 text-[#f5f5f5] hover:text-white transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            <BuildingIcon size={28} className="text-[#f5f5f5]" />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Pandemonium Research
            </span>
          </Link>

          {/* Nav links — desktop */}
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

          {/* Hamburger / close button — mobile */}
          <button
            className="md:hidden text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </nav>
      </header>

      {/* Mobile menu — rendered outside <header> so backdrop-filter doesn't trap fixed positioning */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col px-6 py-10"
          style={{ backgroundColor: "#111111" }}
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 border-b border-[#2a2a2a] text-base font-bold uppercase tracking-widest text-[#a0a0a0] hover:text-[#f5f5f5] transition-colors"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
