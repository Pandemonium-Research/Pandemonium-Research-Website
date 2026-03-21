interface TeamIconProps {
  className?: string;
}

export default function TeamIcon({ className = "" }: TeamIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Primary person */}
      <circle cx="24" cy="14" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 40C10 32.3 16.3 26 24 26C31.7 26 38 32.3 38 40"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
