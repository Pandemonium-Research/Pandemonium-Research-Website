interface ShieldIconProps {
  className?: string;
}
export default function ShieldIcon({ className = "" }: ShieldIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M40 8 L68 20 L68 42 C68 57 55 68 40 74 C25 68 12 57 12 42 L12 20 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Inner shield layer */}
      <path
        d="M40 16 L60 25 L60 42 C60 53 51 62 40 67 C29 62 20 53 20 42 L20 25 Z"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
        fill="none"
      />
      {/* Lock body */}
      <rect
        x="33"
        y="38"
        width="14"
        height="11"
        stroke="currentColor"
        strokeWidth="1.5"
        rx="1"
      />
      {/* Lock shackle */}
      <path
        d="M34 38 L34 33 C34 29.5 46 29.5 46 33 L46 38"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Keyhole */}
      <circle cx="40" cy="43" r="2" stroke="currentColor" strokeWidth="1" />
      <line
        x1="40"
        y1="45"
        x2="40"
        y2="48"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Corner circuit dots */}
      <circle cx="18" cy="18" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="62" cy="18" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="38" r="1" fill="currentColor" opacity="0.2" />
      <circle cx="66" cy="38" r="1" fill="currentColor" opacity="0.2" />
      {/* Scan lines */}
      <line
        x1="12"
        y1="32"
        x2="20"
        y2="32"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
      />
      <line
        x1="60"
        y1="32"
        x2="68"
        y2="32"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.4"
      />
    </svg>
  );
}
