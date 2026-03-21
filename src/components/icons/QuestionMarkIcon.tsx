interface QuestionMarkIconProps {
  className?: string;
}

export default function QuestionMarkIcon({ className = "" }: QuestionMarkIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Abstract horizon/landscape suggesting "unknown frontier" */}
      <rect x="5" y="5" width="70" height="70" stroke="currentColor" strokeWidth="1.5" rx="1" />

      {/* Horizon line */}
      <line x1="5" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="1" opacity="0.4" />

      {/* Mountain/terrain silhouette */}
      <polyline
        points="5,50 18,30 30,42 42,20 54,38 62,28 75,50"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Bold question mark */}
      <text
        x="40"
        y="72"
        textAnchor="middle"
        fontSize="18"
        fontWeight="700"
        fill="currentColor"
        fontFamily="monospace"
        opacity="0.9"
      >
        ?
      </text>

      {/* Dotted pattern in sky */}
      <circle cx="15" cy="20" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="28" cy="14" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="55" cy="16" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="68" cy="22" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="42" cy="10" r="1" fill="currentColor" opacity="0.2" />
    </svg>
  );
}
