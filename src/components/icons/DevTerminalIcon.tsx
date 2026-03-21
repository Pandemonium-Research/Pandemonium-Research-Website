interface DevTerminalIconProps {
  className?: string;
}
export default function DevTerminalIcon({
  className = "",
}: DevTerminalIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer frame */}
      <rect
        x="6"
        y="10"
        width="68"
        height="60"
        stroke="currentColor"
        strokeWidth="1.5"
        rx="1"
      />
      {/* Title bar */}
      <line
        x1="6"
        y1="22"
        x2="74"
        y2="22"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* Window dots */}
      <circle cx="15" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="24" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="33" cy="16" r="2.5" stroke="currentColor" strokeWidth="1" />
      {/* Prompt chevron */}
      <polyline
        points="14,34 22,40 14,46"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinejoin="round"
      />
      {/* First command line */}
      <line
        x1="26"
        y1="40"
        x2="50"
        y2="40"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Second line (dimmer) */}
      <line
        x1="14"
        y1="54"
        x2="42"
        y2="54"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.4"
      />
      {/* Cursor block */}
      <rect
        x="44"
        y="49"
        width="7"
        height="10"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Subtle scan lines */}
      <line
        x1="6"
        y1="62"
        x2="74"
        y2="62"
        stroke="currentColor"
        strokeWidth="0.75"
        opacity="0.1"
      />
    </svg>
  );
}
