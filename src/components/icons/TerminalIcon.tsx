interface TerminalIconProps {
  className?: string;
}

export default function TerminalIcon({ className = "" }: TerminalIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Terminal window frame */}
      <rect x="4" y="8" width="40" height="32" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Title bar */}
      <line x1="4" y1="16" x2="44" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      {/* Window dots */}
      <circle cx="10" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="22" cy="12" r="1.5" fill="currentColor" opacity="0.5" />
      {/* Prompt */}
      <polyline
        points="10,25 15,28 10,31"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Cursor line */}
      <line x1="18" y1="28" x2="28" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
