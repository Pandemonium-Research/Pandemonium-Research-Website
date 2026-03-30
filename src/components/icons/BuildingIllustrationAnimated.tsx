interface BuildingIllustrationAnimatedProps {
  className?: string;
}

type Pt = [number, number];

function lerp(a: Pt, b: Pt, t: number): Pt {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

function fmt(p: Pt): string {
  return `${Math.round(p[0] * 10) / 10},${Math.round(p[1] * 10) / 10}`;
}

/** Generates brick polygons for a quadrilateral face, laid bottom-to-top. */
function Bricks({
  tl,
  tr,
  bl,
  br,
  fill,
  mortar,
  rows,
  cols,
  startDelay,
  rowDelay = 0.14,
  colDelay = 0.04,
}: {
  tl: Pt;
  tr: Pt;
  bl: Pt;
  br: Pt;
  fill: string;
  mortar: string;
  rows: number;
  cols: number;
  startDelay: number;
  rowDelay?: number;
  colDelay?: number;
}) {
  const bricks = [];

  for (let r = rows - 1; r >= 0; r--) {
    for (let c = 0; c < cols; c++) {
      const rTop = r / rows;
      const rBot = (r + 1) / rows;
      const cL = c / cols;
      const cR = (c + 1) / cols;

      const topEdgeL = lerp(tl, bl, rTop);
      const topEdgeR = lerp(tr, br, rTop);
      const botEdgeL = lerp(tl, bl, rBot);
      const botEdgeR = lerp(tr, br, rBot);

      const p1 = lerp(topEdgeL, topEdgeR, cL);
      const p2 = lerp(topEdgeL, topEdgeR, cR);
      const p3 = lerp(botEdgeL, botEdgeR, cR);
      const p4 = lerp(botEdgeL, botEdgeR, cL);

      const delay = startDelay + (rows - 1 - r) * rowDelay + c * colDelay;

      bricks.push(
        <polygon
          key={`${r}-${c}`}
          points={`${fmt(p1)} ${fmt(p2)} ${fmt(p3)} ${fmt(p4)}`}
          fill={fill}
          stroke={mortar}
          strokeWidth="0.4"
          className="brick"
          style={{ animationDelay: `${delay.toFixed(2)}s` }}
        />
      );
    }
  }

  return <>{bricks}</>;
}

export default function BuildingIllustrationAnimated({
  className = "",
}: BuildingIllustrationAnimatedProps) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ perspective: "1000px" }}
      aria-hidden="true"
    >
      <defs>
        <style>{`
          /* ── Full 360-degree turntable revolve ──
             Compound rotation: tilt forward, spin, un-tilt.
             This keeps the building visible at ALL angles
             (min ~64% face-on at 180deg, never edge-on). */
          @keyframes revolve-360 {
            0%   { transform: rotateX(-25deg) rotateZ(0deg) rotateX(25deg); }
            100% { transform: rotateX(-25deg) rotateZ(360deg) rotateX(25deg); }
          }

          /* ── Gentle float after construction ── */
          @keyframes float {
            0%   { transform: translateY(0px); }
            50%  { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }

          /* ── Each brick pops into place ── */
          @keyframes lay-brick {
            0%   { opacity: 0; transform: scale(0.4) translateY(12px); filter: brightness(1); }
            35%  { opacity: 1; transform: scale(1.04) translateY(-2px); filter: brightness(1.6); }
            70%  { opacity: 1; transform: scale(0.99) translateY(1px); filter: brightness(1.1); }
            100% { opacity: 1; transform: scale(1) translateY(0); filter: brightness(1); }
          }

          /* ── Base platform rises ── */
          @keyframes base-rise {
            from { opacity: 0; transform: translateY(25px) scaleY(0.15); }
            to   { opacity: 1; transform: translateY(0) scaleY(1); }
          }

          /* ── Edges draw in ── */
          @keyframes draw-in {
            from { stroke-dashoffset: 1200; opacity: 0.3; }
            to   { stroke-dashoffset: 0; opacity: 1; }
          }

          /* ── Simple fade ── */
          @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
          }

          /* ── Nodes pulse ── */
          @keyframes node-pulse {
            0%, 100% { r: 3; opacity: 0.6; }
            50%      { r: 5; opacity: 1; }
          }

          /* ── Connection lines breathe ── */
          @keyframes line-breathe {
            0%, 100% { opacity: 0; }
            30%, 70% { opacity: 0.45; }
          }

          /* ── Stars twinkle ── */
          @keyframes twinkle {
            0%, 100% { opacity: 0.15; }
            50%      { opacity: 0.9; }
          }

          /* ── Scan ring ── */
          @keyframes scan-ring {
            0%   { r: 40; opacity: 0.5; stroke-width: 0.5; }
            100% { r: 160; opacity: 0; stroke-width: 0.2; }
          }

          /* ── Grid shimmer ── */
          @keyframes grid-shimmer {
            0%, 100% { opacity: 0.15; }
            50%      { opacity: 0.4; }
          }

          /* ========== GROUP ANIMATIONS ========== */

          .float-group {
            animation: float 6s ease-in-out 7s infinite;
            transform-origin: 240px 300px;
          }

          .revolve-group {
            animation: revolve-360 6s linear forwards;
            transform-origin: 240px 300px;
          }

          .phase-base {
            opacity: 0;
            animation: base-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
            transform-origin: 240px 430px;
          }

          /* ========== BRICK ANIMATION ========== */

          .brick {
            opacity: 0;
            animation: lay-brick 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }

          /* ========== POST-CONSTRUCTION ========== */

          .edge-final {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
            animation: draw-in 1.2s cubic-bezier(0.4, 0, 0.2, 1) 5.0s forwards;
          }

          .edge-final-2 {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
            opacity: 0;
            animation: draw-in 1s cubic-bezier(0.4, 0, 0.2, 1) 5.3s forwards;
          }

          .phase-nodes {
            opacity: 0;
            animation: fade-in 1s ease-out 5.5s forwards;
          }

          .phase-connections {
            opacity: 0;
            animation: fade-in 1s ease-out 5.8s forwards;
          }

          .node { animation: node-pulse 3s ease-in-out infinite; }
          .node-1 { animation-delay: 6.5s; }
          .node-2 { animation-delay: 7.3s; }
          .node-3 { animation-delay: 7.9s; }
          .node-4 { animation-delay: 8.6s; }
          .node-5 { animation-delay: 6.9s; }

          .conn-line { animation: line-breathe 4s ease-in-out infinite; }
          .conn-1 { animation-delay: 6.5s; }
          .conn-2 { animation-delay: 7.7s; }
          .conn-3 { animation-delay: 8.9s; }
          .conn-4 { animation-delay: 7.2s; }

          .scan-ring {
            opacity: 0;
            animation: fade-in 0.5s ease-out 6s forwards,
                       scan-ring 5s ease-out 6.5s infinite;
          }

          .star { animation: twinkle 2s ease-in-out infinite; }
          .star-1 { animation-duration: 2.1s; animation-delay: 0s; }
          .star-2 { animation-duration: 3.4s; animation-delay: 0.7s; }
          .star-3 { animation-duration: 2.7s; animation-delay: 1.4s; }
          .star-4 { animation-duration: 1.9s; animation-delay: 0.3s; }
          .star-5 { animation-duration: 3.1s; animation-delay: 1.8s; }
          .star-6 { animation-duration: 2.5s; animation-delay: 0.9s; }

          .grid-line   { animation: grid-shimmer 6s ease-in-out infinite; }
          .grid-line-2 { animation: grid-shimmer 6s ease-in-out infinite; animation-delay: 1.5s; }
          .grid-line-3 { animation: grid-shimmer 6s ease-in-out infinite; animation-delay: 3s; }
        `}</style>
      </defs>

      {/* ── Background grid lines ── */}
      <line className="grid-line"   x1="240" y1="480" x2="0"   y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-2" x1="240" y1="480" x2="480" y2="280" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-3" x1="240" y1="480" x2="240" y2="20"  stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line"   x1="240" y1="400" x2="60"  y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-2" x1="240" y1="400" x2="420" y2="300" stroke="#2a2a2a" strokeWidth="0.5" />
      <line className="grid-line-3" x1="240" y1="400" x2="120" y2="260" stroke="#1e1e1e" strokeWidth="0.5" />
      <line className="grid-line"   x1="240" y1="400" x2="360" y2="260" stroke="#1e1e1e" strokeWidth="0.5" />

      {/* ── Scan ring ── */}
      <circle className="scan-ring" cx="240" cy="380" r="40" stroke="#404040" fill="none" />

      {/* ══════════════════════════════════════════════════
          BUILDING GROUP - revolves 360deg then floats
          ══════════════════════════════════════════════════ */}
      <g className="float-group">
      <g className="revolve-group">

        {/* ── BASE PLATFORM (rises as one piece) ── */}
        <g className="phase-base">
          <polygon points="120,332 240,390 360,332 360,360 240,418 120,360" fill="#1a1a1a" stroke="#505050" strokeWidth="0.75" />
          <polygon points="120,360 240,418 240,430 120,372" fill="#151515" stroke="#404040" strokeWidth="0.75" />
          <polygon points="240,418 360,360 360,372 240,430" fill="#111111" stroke="#404040" strokeWidth="0.75" />
        </g>

        {/* ── LEFT TOWER ── left face (6 rows x 2 cols) ── */}
        <Bricks
          tl={[120, 228]} tr={[170, 256]}
          bl={[120, 332]} br={[170, 360]}
          fill="#252525" mortar="#353535"
          rows={6} cols={2}
          startDelay={0.7} rowDelay={0.14} colDelay={0.05}
        />
        {/* ── LEFT TOWER ── right face (6 rows x 2 cols) ── */}
        <Bricks
          tl={[170, 256]} tr={[220, 228]}
          bl={[170, 360]} br={[220, 332]}
          fill="#1e1e1e" mortar="#2e2e2e"
          rows={6} cols={2}
          startDelay={0.8} rowDelay={0.14} colDelay={0.05}
        />
        {/* ── LEFT TOWER ── top face (2 rows x 2 cols) ── */}
        <Bricks
          tl={[120, 228]} tr={[170, 200]}
          bl={[170, 256]} br={[220, 228]}
          fill="#333333" mortar="#444444"
          rows={2} cols={2}
          startDelay={2.0} rowDelay={0.08} colDelay={0.05}
        />

        {/* ── RIGHT TOWER ── left face (6 rows x 2 cols) ── */}
        <Bricks
          tl={[260, 228]} tr={[310, 256]}
          bl={[260, 332]} br={[310, 360]}
          fill="#252525" mortar="#353535"
          rows={6} cols={2}
          startDelay={1.1} rowDelay={0.14} colDelay={0.05}
        />
        {/* ── RIGHT TOWER ── right face (6 rows x 2 cols) ── */}
        <Bricks
          tl={[310, 256]} tr={[360, 228]}
          bl={[310, 360]} br={[360, 332]}
          fill="#1e1e1e" mortar="#2e2e2e"
          rows={6} cols={2}
          startDelay={1.2} rowDelay={0.14} colDelay={0.05}
        />
        {/* ── RIGHT TOWER ── top face (2 rows x 2 cols) ── */}
        <Bricks
          tl={[260, 228]} tr={[310, 200]}
          bl={[310, 256]} br={[360, 228]}
          fill="#333333" mortar="#444444"
          rows={2} cols={2}
          startDelay={2.4} rowDelay={0.08} colDelay={0.05}
        />

        {/* ── MAIN TOWER ── left face (10 rows x 3 cols) ── */}
        <Bricks
          tl={[170, 100]} tr={[240, 140]}
          bl={[170, 290]} br={[240, 330]}
          fill="#2a2a2a" mortar="#3a3a3a"
          rows={10} cols={3}
          startDelay={2.0} rowDelay={0.18} colDelay={0.04}
        />
        {/* ── MAIN TOWER ── right face (10 rows x 3 cols) ── */}
        <Bricks
          tl={[240, 140]} tr={[310, 100]}
          bl={[240, 330]} br={[310, 290]}
          fill="#222222" mortar="#323232"
          rows={10} cols={3}
          startDelay={2.15} rowDelay={0.18} colDelay={0.04}
        />
        {/* ── MAIN TOWER ── top face (2 rows x 3 cols) ── */}
        <Bricks
          tl={[170, 100]} tr={[240, 60]}
          bl={[240, 140]} br={[310, 100]}
          fill="#3a3a3a" mortar="#4a4a4a"
          rows={2} cols={3}
          startDelay={4.5} rowDelay={0.1} colDelay={0.05}
        />

        {/* ── HIGHLIGHT EDGES (sketch in after bricks are laid) ── */}
        <line className="edge-final" x1="240" y1="60"  x2="310" y2="100" stroke="#888888" strokeWidth="1.5" />
        <line className="edge-final" x1="240" y1="60"  x2="170" y2="100" stroke="#888888" strokeWidth="1.5" />
        <line className="edge-final" x1="310" y1="100" x2="310" y2="290" stroke="#666666" strokeWidth="1" />
        <line className="edge-final" x1="170" y1="100" x2="170" y2="290" stroke="#777777" strokeWidth="1" />

        <line className="edge-final-2" x1="240" y1="60"  x2="240" y2="140" stroke="#606060" strokeWidth="1" />
        <line className="edge-final-2" x1="170" y1="100" x2="310" y2="100" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-final-2" x1="240" y1="140" x2="240" y2="330" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-final-2" x1="120" y1="228" x2="120" y2="332" stroke="#555555" strokeWidth="0.75" />
        <line className="edge-final-2" x1="360" y1="228" x2="360" y2="332" stroke="#555555" strokeWidth="0.75" />
      </g>
      </g>

      {/* ── Floating nodes (after construction) ── */}
      <g className="phase-nodes">
        <circle className="node node-1" cx="240" cy="58"  r="3" fill="#707070" />
        <circle className="node node-2" cx="145" cy="215" r="3" fill="#606060" />
        <circle className="node node-3" cx="335" cy="215" r="3" fill="#606060" />
        <circle className="node node-4" cx="82"  cy="118" r="3" fill="#505050" />
        <circle className="node node-5" cx="398" cy="118" r="3" fill="#505050" />
      </g>

      {/* ── Connection lines (after construction) ── */}
      <g className="phase-connections">
        <line className="conn-line conn-1" x1="240" y1="58"  x2="145" y2="215" stroke="#505050" strokeWidth="0.75" strokeDasharray="4 4" />
        <line className="conn-line conn-2" x1="240" y1="58"  x2="335" y2="215" stroke="#505050" strokeWidth="0.75" strokeDasharray="4 4" />
        <line className="conn-line conn-3" x1="82"  y1="118" x2="145" y2="215" stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
        <line className="conn-line conn-4" x1="398" y1="118" x2="335" y2="215" stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
        <line className="conn-line conn-1" x1="82"  y1="118" x2="240" y2="58"  stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
        <line className="conn-line conn-3" x1="398" y1="118" x2="240" y2="58"  stroke="#404040" strokeWidth="0.5"  strokeDasharray="3 5" />
      </g>

      {/* ── Moon ── */}
      <path
        d="M 400 80 A 30 30 0 1 1 400 140 A 20 20 0 1 0 400 80"
        fill="#2a2a2a"
        stroke="#505050"
        strokeWidth="1"
      />

      {/* ── Stars ── */}
      <circle className="star star-1" cx="80"  cy="60"  r="1.5" fill="#707070" />
      <circle className="star star-2" cx="150" cy="40"  r="1"   fill="#606060" />
      <circle className="star star-3" cx="380" cy="50"  r="1.5" fill="#707070" />
      <circle className="star star-4" cx="420" cy="140" r="1"   fill="#606060" />
      <circle className="star star-5" cx="50"  cy="150" r="1"   fill="#505050" />
      <circle className="star star-6" cx="430" cy="200" r="1.5" fill="#606060" />
    </svg>
  );
}
