interface BuildingIconProps {
  className?: string;
  size?: number;
}

export default function BuildingIcon({ className = "", size = 32 }: BuildingIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main tall center building */}
      <polygon points="35,10 50,2 65,10 65,60 50,68 35,60" />
      {/* Left face of center building */}
      <polygon points="20,20 35,12 35,60 20,68" opacity="0.7" />
      {/* Right face of center building */}
      <polygon points="65,12 80,20 80,68 65,60" opacity="0.5" />
      {/* Left smaller building */}
      <polygon points="8,38 20,30 20,68 8,76" opacity="0.6" />
      <polygon points="20,30 30,36 30,70 20,68" opacity="0.4" />
      {/* Right smaller building */}
      <polygon points="70,36 80,30 92,38 92,76 80,68 70,70" opacity="0.45" />
      {/* Base platform */}
      <polygon points="8,76 50,90 92,76 92,82 50,96 8,82" opacity="0.55" />
    </svg>
  );
}
