import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  as: Tag = href ? "a" : "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-medium transition-colors cursor-pointer";

  const variants = {
    primary: "bg-[#f5f5f5] text-[#111111] hover:bg-[#d4d4d4]",
    outline:
      "border border-[#2a2a2a] text-[#f5f5f5] hover:bg-[#1a1a1a] hover:border-[#505050]",
    ghost:
      "text-[#a0a0a0] hover:text-[#f5f5f5] underline-offset-4 hover:underline",
  };

  const sizes = {
    sm: "text-xs px-3 py-2",
    md: "text-sm px-5 py-3",
    lg: "text-base px-8 py-4",
  };

  const props = href ? { href } : { onClick };

  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}
