import { ReactNode } from "react";

interface FoldedCardProps {
  children: ReactNode;
  className?: string;
}

export default function FoldedCard({ children, className = "" }: FoldedCardProps) {
  return (
    <div
      className={`card-folded relative bg-[#1a1a1a] border border-[#2a2a2a] ${className}`}
    >
      {/* Diagonal fold line in the top-right notch */}
      <div
        className="card-fold-line"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom-left, #2a2a2a 0%, #2a2a2a 50%, transparent 50%)",
        }}
      />
      {children}
    </div>
  );
}
