interface MoonIconProps {
  className?: string;
}

export default function MoonIcon({ className = "" }: MoonIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M30 8C22 8 16 14 16 22C16 30 22 36 30 36C26 36 20 32 20 24C20 16 26 10 34 10C32.7 8.7 31.4 8 30 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
