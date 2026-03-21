interface BuildingIllustrationProps {
  className?: string;
}

export default function BuildingIllustration({ className = "" }: BuildingIllustrationProps) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Background grid lines — isometric perspective */}
      <line x1="240" y1="480" x2="0" y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line x1="240" y1="480" x2="480" y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line x1="240" y1="480" x2="240" y2="20" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.5" />

      {/* Radiating ground lines */}
      <line x1="240" y1="400" x2="60" y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line x1="240" y1="400" x2="420" y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line x1="240" y1="400" x2="120" y2="260" stroke="#222222" strokeWidth="0.5" />
      <line x1="240" y1="400" x2="360" y2="260" stroke="#222222" strokeWidth="0.5" />

      {/* === MAIN CENTRAL TOWER === */}
      {/* Top face (diamond/rhombus) */}
      <polygon
        points="240,60 310,100 240,140 170,100"
        fill="#3a3a3a"
        stroke="#606060"
        strokeWidth="1"
      />
      {/* Wireframe grid on top face */}
      <line x1="240" y1="60" x2="240" y2="140" stroke="#505050" strokeWidth="0.5" />
      <line x1="170" y1="100" x2="310" y2="100" stroke="#505050" strokeWidth="0.5" />

      {/* Left face */}
      <polygon
        points="170,100 240,140 240,330 170,290"
        fill="#2a2a2a"
        stroke="#505050"
        strokeWidth="1"
      />
      {/* Grid lines on left face */}
      <line x1="170" y1="143" x2="240" y2="183" stroke="#383838" strokeWidth="0.5" />
      <line x1="170" y1="186" x2="240" y2="226" stroke="#383838" strokeWidth="0.5" />
      <line x1="170" y1="229" x2="240" y2="269" stroke="#383838" strokeWidth="0.5" />
      <line x1="191" y1="107" x2="191" y2="297" stroke="#383838" strokeWidth="0.5" opacity="0.6" />
      <line x1="213" y1="117" x2="213" y2="320" stroke="#383838" strokeWidth="0.5" opacity="0.6" />

      {/* Right face */}
      <polygon
        points="240,140 310,100 310,290 240,330"
        fill="#222222"
        stroke="#505050"
        strokeWidth="1"
      />
      {/* Grid lines on right face */}
      <line x1="240" y1="183" x2="310" y2="143" stroke="#383838" strokeWidth="0.5" />
      <line x1="240" y1="226" x2="310" y2="186" stroke="#383838" strokeWidth="0.5" />
      <line x1="240" y1="269" x2="310" y2="229" stroke="#383838" strokeWidth="0.5" />
      <line x1="267" y1="320" x2="267" y2="107" stroke="#383838" strokeWidth="0.5" opacity="0.6" />
      <line x1="288" y1="297" x2="288" y2="117" stroke="#383838" strokeWidth="0.5" opacity="0.6" />

      {/* === LEFT SMALLER TOWER === */}
      {/* Top face */}
      <polygon
        points="170,200 220,228 170,256 120,228"
        fill="#333333"
        stroke="#505050"
        strokeWidth="1"
      />
      {/* Left face */}
      <polygon
        points="120,228 170,256 170,360 120,332"
        fill="#252525"
        stroke="#454545"
        strokeWidth="1"
      />
      <line x1="120" y1="275" x2="170" y2="303" stroke="#333333" strokeWidth="0.5" />
      <line x1="120" y1="307" x2="170" y2="335" stroke="#333333" strokeWidth="0.5" />
      {/* Right face */}
      <polygon
        points="170,256 220,228 220,332 170,360"
        fill="#1e1e1e"
        stroke="#454545"
        strokeWidth="1"
      />
      <line x1="170" y1="303" x2="220" y2="275" stroke="#333333" strokeWidth="0.5" />
      <line x1="170" y1="335" x2="220" y2="307" stroke="#333333" strokeWidth="0.5" />

      {/* === RIGHT SMALLER TOWER === */}
      {/* Top face */}
      <polygon
        points="310,200 360,228 310,256 260,228"
        fill="#333333"
        stroke="#505050"
        strokeWidth="1"
      />
      {/* Left face */}
      <polygon
        points="260,228 310,256 310,360 260,332"
        fill="#252525"
        stroke="#454545"
        strokeWidth="1"
      />
      <line x1="260" y1="275" x2="310" y2="303" stroke="#333333" strokeWidth="0.5" />
      <line x1="260" y1="307" x2="310" y2="335" stroke="#333333" strokeWidth="0.5" />
      {/* Right face */}
      <polygon
        points="310,256 360,228 360,332 310,360"
        fill="#1e1e1e"
        stroke="#454545"
        strokeWidth="1"
      />
      <line x1="310" y1="303" x2="360" y2="275" stroke="#333333" strokeWidth="0.5" />
      <line x1="310" y1="335" x2="360" y2="307" stroke="#333333" strokeWidth="0.5" />

      {/* === BASE PLATFORM === */}
      {/* Top surface */}
      <polygon
        points="120,332 240,390 360,332 360,360 240,418 120,360"
        fill="#1a1a1a"
        stroke="#505050"
        strokeWidth="1"
      />
      {/* Left side of platform */}
      <polygon
        points="120,360 240,418 240,430 120,372"
        fill="#151515"
        stroke="#404040"
        strokeWidth="1"
      />
      {/* Right side of platform */}
      <polygon
        points="240,418 360,360 360,372 240,430"
        fill="#111111"
        stroke="#404040"
        strokeWidth="1"
      />

      {/* Highlight edges */}
      <line x1="240" y1="60" x2="310" y2="100" stroke="#888888" strokeWidth="1.5" />
      <line x1="240" y1="60" x2="170" y2="100" stroke="#888888" strokeWidth="1.5" />
      <line x1="310" y1="100" x2="310" y2="290" stroke="#666666" strokeWidth="1" />
      <line x1="170" y1="100" x2="170" y2="290" stroke="#777777" strokeWidth="1" />

      {/* Moon in upper right */}
      <path
        d="M 400 80 A 30 30 0 1 1 400 140 A 20 20 0 1 0 400 80"
        fill="#2a2a2a"
        stroke="#505050"
        strokeWidth="1"
      />

      {/* Stars */}
      <circle cx="80" cy="60" r="1.5" fill="#606060" />
      <circle cx="150" cy="40" r="1" fill="#505050" />
      <circle cx="380" cy="50" r="1.5" fill="#606060" />
      <circle cx="420" cy="140" r="1" fill="#505050" />
      <circle cx="50" cy="150" r="1" fill="#404040" />
      <circle cx="430" cy="200" r="1.5" fill="#505050" />
      <circle cx="60" cy="220" r="1" fill="#404040" />
    </svg>
  );
}
