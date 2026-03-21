interface ServerIconProps {
  className?: string;
}

export default function ServerIcon({ className = "" }: ServerIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Server rack 1 */}
      <rect x="10" y="8" width="60" height="16" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <line x1="10" y1="16" x2="70" y2="16" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <circle cx="62" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="54" cy="12" r="2.5" stroke="currentColor" strokeWidth="1" />
      <rect x="15" y="10.5" width="24" height="5" stroke="currentColor" strokeWidth="0.75" rx="0.5" />

      {/* Server rack 2 */}
      <rect x="10" y="28" width="60" height="16" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <line x1="10" y1="36" x2="70" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <circle cx="62" cy="32" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="54" cy="32" r="2.5" stroke="currentColor" strokeWidth="1" />
      <rect x="15" y="30.5" width="24" height="5" stroke="currentColor" strokeWidth="0.75" rx="0.5" />

      {/* Server rack 3 */}
      <rect x="10" y="48" width="60" height="16" stroke="currentColor" strokeWidth="1.5" rx="1" />
      <line x1="10" y1="56" x2="70" y2="56" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <circle cx="62" cy="52" r="2.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="54" cy="52" r="2.5" stroke="currentColor" strokeWidth="1" />
      <rect x="15" y="50.5" width="24" height="5" stroke="currentColor" strokeWidth="0.75" rx="0.5" />

      {/* Connection lines below */}
      <line x1="25" y1="64" x2="25" y2="72" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="64" x2="40" y2="72" stroke="currentColor" strokeWidth="1" />
      <line x1="55" y1="64" x2="55" y2="72" stroke="currentColor" strokeWidth="1" />
      <line x1="25" y1="72" x2="55" y2="72" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
