"use client";

import { createContext, useContext, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const BUILD_DURATION = 4.5;
const SPIN_DURATION  = 5.5;
const SEAL_DURATION  = 1.4;
// Final angle: full 360° + 45° to land at SVG isometric corner view
const FINAL_ANGLE    = Math.PI * 2 + Math.PI * 0.25;

// Geometry dims
const BASE_H       = 0.28;
const BASE_GAP     = 0.022;
const BASE_TOP_Y   = BASE_H + BASE_GAP;
const SIDE_H       = 2.0;
const MAIN_H       = 3.6;

// Edge line colour
const EDGE_COLOR   = new THREE.Color(0x909090);

/* ─────────────────────────────────────────────
   Scene context
───────────────────────────────────────────── */
interface SceneRefs {
  elapsed:      { current: number };
  sealProgress: { current: number };
}
const SceneCtx = createContext<SceneRefs>({
  elapsed:      { current: 0 },
  sealProgress: { current: 0 },
});

/* ─────────────────────────────────────────────
   Flat base + thin horizontal / vertical seams.
───────────────────────────────────────────── */
function makePanelTexture(baseHex: number, hSeams: number, vSeams: number) {
  const W = 256, H = 512;
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d")!;
  const b = (baseHex >> 16) & 0xff;

  ctx.fillStyle = `rgb(${b},${b},${b})`;
  ctx.fillRect(0, 0, W, H);

  // Horizontal floor seams
  const dark = Math.max(0, b - 20);
  ctx.strokeStyle = `rgb(${dark},${dark},${dark})`;
  ctx.lineWidth = 1.2;
  for (let r = 1; r < hSeams; r++) {
    const y = (r / hSeams) * H;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Vertical panel seams
  const darker = Math.max(0, b - 12);
  ctx.strokeStyle = `rgb(${darker},${darker},${darker})`;
  ctx.lineWidth = 0.8;
  for (let c = 1; c < vSeams; c++) {
    const x = (c / vSeams) * W;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  return new THREE.CanvasTexture(cv);
}

/* ─────────────────────────────────────────────
   Tower — grows upward via Y scale.
   Bottom stays fixed at cy, top rises.
───────────────────────────────────────────── */
interface TowerProps {
  cx: number; cy: number; cz: number;
  width: number; depth: number; height: number;
  faceColor: number;
  hSeams: number; vSeams: number;
  dStart: number;
  dEnd: number;
}

function Tower({ cx, cy, cz, width, depth, height, faceColor, hSeams, vSeams, dStart, dEnd }: TowerProps) {
  const bodyRef  = useRef<THREE.Mesh>(null);
  const matRef   = useRef<THREE.MeshStandardMaterial>(null);
  const edgeRef  = useRef<THREE.LineBasicMaterial>(null);
  const stripRef = useRef<THREE.Mesh>(null);
  const { elapsed, sealProgress } = useContext(SceneCtx);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const panelMap = useMemo(() => makePanelTexture(faceColor, hSeams, vSeams), []);

  useFrame(() => {
    const e     = elapsed.current;
    const start = dStart * BUILD_DURATION;
    const end   = dEnd   * BUILD_DURATION;
    const rawP  = e < start ? 0 : Math.min((e - start) / (end - start), 1);
    // Ease out cubic
    const ease  = 1 - Math.pow(1 - rawP, 3);

    const body = bodyRef.current;
    if (body) {
      // Scale Y from 0→1 keeping bottom pinned at cy
      body.scale.y = Math.max(ease, 0.001);
      body.position.y = cy + ease * height * 0.5;
    }

    // Glow strip at top of current growth
    const strip = stripRef.current;
    if (strip) {
      strip.position.y = cy + ease * height;
      const sm = strip.material as THREE.MeshStandardMaterial;
      sm.opacity = rawP > 0 && rawP < 0.98
        ? Math.sin(rawP * Math.PI) * 0.7
        : 0;
    }

    // Fade in edges during seal
    if (sealProgress.current > 0) {
      const sp    = sealProgress.current;
      const sEase = sp < 0.5 ? 2 * sp * sp : 1 - Math.pow(-2 * sp + 2, 2) / 2;
      if (edgeRef.current) edgeRef.current.opacity = sEase * 0.55;
    }
  });

  return (
    <group>
      {/* Main body */}
      <mesh ref={bodyRef} position={[cx, cy, cz]}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          ref={matRef}
          color={0xffffff}
          map={panelMap}
          roughness={0.82}
          metalness={0.05}
        />
      </mesh>

      {/* Edge outline — fades in when seal completes */}
      <lineSegments position={[cx, cy + height * 0.5, cz]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
        <lineBasicMaterial ref={edgeRef} color={EDGE_COLOR} transparent opacity={0} />
      </lineSegments>

      {/* Rising glow strip */}
      <mesh ref={stripRef} position={[cx, cy, cz]}>
        <boxGeometry args={[width + 0.06, 0.06, depth + 0.06]} />
        <meshStandardMaterial
          color={0xffffff}
          emissive={0xffffff}
          emissiveIntensity={1.8}
          transparent
          opacity={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Camera
───────────────────────────────────────────── */
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 7.5, 8.5);
    camera.lookAt(-0.475, 2.2, 0.475);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

/* ─────────────────────────────────────────────
   Scene
───────────────────────────────────────────── */
function Scene() {
  const groupRef   = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const sealRef    = useRef(0);
  const ctxValue   = useMemo(() => ({ elapsed: elapsedRef, sealProgress: sealRef }), []);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    const g = groupRef.current;
    if (!g) return;
    const e = elapsedRef.current;

    if (e < SPIN_DURATION) {
      const p     = e / SPIN_DURATION;
      const eased = p - Math.sin(p * Math.PI * 2) / (Math.PI * 2);
      g.rotation.y = eased * FINAL_ANGLE;
    } else {
      g.rotation.y = FINAL_ANGLE;
      const afterSpin = e - SPIN_DURATION;
      sealRef.current = Math.min(afterSpin / SEAL_DURATION, 1);
      if (afterSpin > SEAL_DURATION) {
        g.position.y = Math.sin((afterSpin - SEAL_DURATION) * 0.75) * 0.08;
      }
    }
  });

  return (
    <SceneCtx.Provider value={ctxValue}>
      <group ref={groupRef}>
        {/* Base platform — centered over full footprint x[-1.55,0.6] z[-0.6,1.55] */}
        <Tower
          cx={-0.475} cy={0} cz={0.475}
          width={2.25} depth={2.25} height={BASE_H}
          faceColor={0x4a4a4a} hSeams={1} vSeams={4}
          dStart={0.00} dEnd={0.08}
        />
        <Tower
          cx={-1.075} cy={BASE_TOP_Y} cz={0}
          width={0.95} depth={0.95} height={SIDE_H}
          faceColor={0x555555} hSeams={8} vSeams={2}
          dStart={0.06} dEnd={0.44}
        />
        <Tower
          cx={0} cy={BASE_TOP_Y} cz={1.075}
          width={0.95} depth={0.95} height={SIDE_H}
          faceColor={0x505050} hSeams={8} vSeams={2}
          dStart={0.10} dEnd={0.48}
        />
        <Tower
          cx={0} cy={BASE_TOP_Y} cz={0}
          width={1.2} depth={1.2} height={MAIN_H}
          faceColor={0x626262} hSeams={14} vSeams={3}
          dStart={0.36} dEnd={1.00}
        />
      </group>
    </SceneCtx.Provider>
  );
}

/* ─────────────────────────────────────────────
   Stars
───────────────────────────────────────────── */
function Stars() {
  const matRef = useRef<THREE.PointsMaterial>(null);

  // Two layers: many small + a few bright large ones
  const [smallPos, largePos] = useMemo(() => {
    const small = new Float32Array(120 * 3);
    const large = new Float32Array(18 * 3);
    for (let i = 0; i < 120; i++) {
      small[i * 3]     = (Math.random() - 0.5) * 18;
      small[i * 3 + 1] = 1 + Math.random() * 10;
      small[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    for (let i = 0; i < 18; i++) {
      large[i * 3]     = (Math.random() - 0.5) * 16;
      large[i * 3 + 1] = 2 + Math.random() * 8;
      large[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return [small, large];
  }, []);

  const largeMat = useRef<THREE.PointsMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current)
      matRef.current.opacity = 0.7 + Math.sin(t * 0.6) * 0.2;
    if (largeMat.current)
      largeMat.current.opacity = 0.85 + Math.sin(t * 0.4 + 1.2) * 0.15;
  });

  return (
    <>
      {/* Small stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[smallPos, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={matRef} size={0.07} color="#cccccc" transparent opacity={0.75} sizeAttenuation />
      </points>
      {/* Larger bright stars */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[largePos, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={largeMat} size={0.16} color="#eeeeee" transparent opacity={0.9} sizeAttenuation />
      </points>
    </>
  );
}

/* ─────────────────────────────────────────────
   Exported component
───────────────────────────────────────────── */
export default function BuildingScene({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className} style={{ aspectRatio: "1" }} />;
  }

  return (
    <div className={className} style={{ aspectRatio: "1", position: "relative" }}>
      {/* Crescent moon */}
      <svg
        viewBox="0 0 100 100"
        style={{ position: "absolute", top: "8%", right: "8%", width: "13%", pointerEvents: "none", zIndex: 1 }}
        aria-hidden="true"
      >
        <path
          d="M 50 10 A 30 30 0 1 1 50 70 A 20 20 0 1 0 50 10"
          fill="#2a2a2a"
          stroke="#505050"
          strokeWidth="1.5"
        />
      </svg>

      <Canvas
        camera={{ position: [0, 7.5, 8.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <CameraSetup />
        <ambientLight intensity={1.6} />
        <directionalLight position={[-5, 8, 4]}  intensity={1.8} color="#ffffff" />
        <directionalLight position={[4, 3, -2]}   intensity={0.5} color="#999999" />
        <pointLight        position={[-3, 6, 3]}  intensity={0.6} color="#bbbbbb" />
des        <Scene />
        <Stars />
      </Canvas>
    </div>
  );
}
