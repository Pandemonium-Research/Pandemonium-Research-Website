"use client";

import { createContext, useContext, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const BUILD_DURATION = 5.5;  // seconds to lay all bricks
const SPIN_DURATION  = 6.5;  // seconds for full 360° Y-axis rotation
const SEAL_DURATION  = 1.8;  // seconds to merge bricks into solid walls
// Final resting angle after spin: 2π + π/4 = full rotation + 45°
// This lands at the SVG's isometric corner-facing-camera view
const FINAL_ANGLE    = Math.PI * 2 - Math.PI * 0.25 + Math.PI *0.1;
// How much to scale brick X/Z to close the mortar gap
const GAP_FILL_SCALE = 1.055;
// Uniform target gray once sealed (mid-tone matching SVG face colors)
const SEAL_COLOR     = new THREE.Color(0x464646);

/* ─────────────────────────────────────────────
   Shared scene context (refs, no re-renders)
───────────────────────────────────────────── */
interface SceneRefs {
  elapsed:      { current: number };
  sealProgress: { current: number }; // 0..1 after spin ends
}
const SceneCtx = createContext<SceneRefs>({
  elapsed:      { current: 0 },
  sealProgress: { current: 0 },
});

/* ─────────────────────────────────────────────
   Vary a gray hex color by ±amount on all
   channels equally, keeping it monochrome.
───────────────────────────────────────────── */
function varyGray(hexColor: number, amount = 10): number {
  const base = (hexColor >> 16) & 0xff;
  const v = Math.max(0, Math.min(255, base + Math.floor((Math.random() - 0.5) * 2 * amount)));
  return (v << 16) | (v << 8) | v;
}

/* ─────────────────────────────────────────────
   Brick definitions
───────────────────────────────────────────── */
interface BrickDef {
  position: [number, number, number];
  size:     [number, number, number];
  colorHex: number;
  delay:    number; // 0..1 normalised across BUILD_DURATION
}

function buildBricks(): BrickDef[] {
  const bricks: BrickDef[] = [];
  const BRICK_H = 0.20;
  const GAP     = 0.022;
  const STEP    = BRICK_H + GAP;

  /* ── BASE PLATFORM ── */
  const baseW = 3.8, baseD = 2.2, baseH = 0.28;
  const baseCX = 6, baseCZ = 4;
  const bwBase = (baseW - GAP * baseCX) / baseCX;
  const bdBase = (baseD - GAP * baseCZ) / baseCZ;
  const total_base = baseCX * baseCZ;
  for (let row = 0; row < baseCZ; row++) {
    for (let col = 0; col < baseCX; col++) {
      bricks.push({
        position: [
          -baseW / 2 + (bwBase + GAP) * col + bwBase / 2,
          baseH / 2,
          -baseD / 2 + (bdBase + GAP) * row + bdBase / 2,
        ],
        size:     [bwBase, baseH, bdBase],
        colorHex: varyGray(0x333333, 6),
        delay:    ((row * baseCX + col) / total_base) * 0.06,
      });
    }
  }

  const BASE_TOP_Y = baseH + GAP;

  function tower(
    cx: number, cz: number,
    width: number, depth: number,
    floors: number,
    colsX: number, colsZ: number,
    grayHex: number,
    dStart: number, dEnd: number,
  ) {
    const bw    = (width  - GAP * colsX) / colsX;
    const bd    = (depth  - GAP * colsZ) / colsZ;
    const total = floors * colsX * colsZ;
    let idx = 0;
    for (let f = 0; f < floors; f++) {
      for (let xi = 0; xi < colsX; xi++) {
        for (let zi = 0; zi < colsZ; zi++) {
          bricks.push({
            position: [
              cx - width / 2 + (bw + GAP) * xi + bw / 2,
              BASE_TOP_Y + STEP * f + BRICK_H / 2,
              cz - depth / 2 + (bd + GAP) * zi + bd / 2,
            ],
            size:     [bw, BRICK_H, bd],
            colorHex: varyGray(grayHex, 10),
            delay:    dStart + (idx++ / total) * (dEnd - dStart),
          });
        }
      }
    }
  }

  tower(-1.1, 0,  0.95, 0.85,  9, 3, 2, 0x484848, 0.06, 0.34);
  tower( 1.1, 0,  0.95, 0.85,  9, 3, 2, 0x444444, 0.08, 0.36);
  tower( 0.0, 0,  1.35, 1.00, 16, 3, 3, 0x505050, 0.34, 0.93);

  return bricks;
}

/* ─────────────────────────────────────────────
   Single brick
───────────────────────────────────────────── */
function Brick({ position, size, colorHex, delay }: BrickDef) {
  const meshRef     = useRef<THREE.Mesh>(null);
  const matRef      = useRef<THREE.MeshStandardMaterial>(null);
  const { elapsed, sealProgress } = useContext(SceneCtx);
  const appearAt  = delay * BUILD_DURATION;
  const animLen   = 0.28;
  const origColor = useMemo(() => new THREE.Color(colorHex), [colorHex]);

  useFrame(() => {
    const mesh = meshRef.current;
    const mat  = matRef.current;
    if (!mesh || !mat) return;

    const t = elapsed.current - appearAt;

    if (t < 0) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;

    /* ── Construction pop-in ── */
    const progress = Math.min(t / animLen, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    mesh.scale.setScalar(0.15 + ease * 0.85);
    mesh.position.y = position[1] - (1 - ease) * 0.22;
    mat.emissiveIntensity = progress < 0.45 ? (0.45 - progress) * 0.9 : 0;

    /* ── Seal: close mortar gaps + converge to uniform color ── */
    if (progress >= 1 && sealProgress.current > 0) {
      const sp = sealProgress.current;

      // Ease in-out for the seal
      const sEase = sp < 0.5
        ? 2 * sp * sp
        : 1 - Math.pow(-2 * sp + 2, 2) / 2;

      // Converge X/Z scale to close mortar gaps
      const targetScale = 1 + (GAP_FILL_SCALE - 1) * sEase;
      mesh.scale.x = targetScale;
      mesh.scale.z = targetScale;
      mesh.scale.y = 1;

      // Lerp color toward uniform gray
      mat.color.lerpColors(origColor, SEAL_COLOR, sEase);

      // Subtle emissive pulse as seal completes
      mat.emissiveIntensity = sEase * (1 - sEase) * 0.25;
    }
  });

  return (
    <mesh ref={meshRef} position={position} visible={false}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={matRef}
        color={colorHex}
        emissive={colorHex}
        emissiveIntensity={0}
        roughness={0.88}
        metalness={0.08}
      />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   Camera aimed at building centre
───────────────────────────────────────────── */
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0, 2.8, 8.5);
    camera.lookAt(0, 2.2, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

/* ─────────────────────────────────────────────
   Main scene
───────────────────────────────────────────── */
function Scene() {
  const groupRef    = useRef<THREE.Group>(null);
  const elapsedRef  = useRef(0);
  const sealRef     = useRef(0);
  const bricks      = useMemo(buildBricks, []);
  const ctxValue    = useMemo(() => ({ elapsed: elapsedRef, sealProgress: sealRef }), []);

  useFrame((_, delta) => {
    elapsedRef.current += delta;
    const g = groupRef.current;
    if (!g) return;
    const e = elapsedRef.current;

    if (e < SPIN_DURATION) {
      // 360° Y-axis spin with sinusoidal ease, landing at FINAL_ANGLE
      const p     = e / SPIN_DURATION;
      const eased = p - Math.sin(p * Math.PI * 2) / (Math.PI * 2);
      g.rotation.y = eased * FINAL_ANGLE;
    } else {
      // Hold final angle, start seal animation, then gentle float
      g.rotation.y = FINAL_ANGLE;

      const afterSpin = e - SPIN_DURATION;

      // Seal progresses 0→1 over SEAL_DURATION seconds
      sealRef.current = Math.min(afterSpin / SEAL_DURATION, 1);

      // Gentle float begins after seal is done
      if (afterSpin > SEAL_DURATION) {
        const ft = afterSpin - SEAL_DURATION;
        g.position.y = Math.sin(ft * 0.75) * 0.08;
      }
    }
  });

  return (
    <SceneCtx.Provider value={ctxValue}>
      <group ref={groupRef}>
        {bricks.map((b, i) => (
          <Brick key={i} {...b} />
        ))}
      </group>
    </SceneCtx.Provider>
  );
}

/* ─────────────────────────────────────────────
   Ambient star particles
───────────────────────────────────────────── */
function Stars() {
  const positions = useMemo(() => {
    const count = 70;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#606060" transparent opacity={0.55} sizeAttenuation />
    </points>
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
      {/* Crescent moon — top right, matching the SVG */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          width: "13%",
          pointerEvents: "none",
          zIndex: 1,
        }}
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
        camera={{ position: [0, 2.8, 8.5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <CameraSetup />
        <ambientLight intensity={0.9} />
        {/* Key light from the left */}
        <directionalLight position={[-6, 8, 4]}  intensity={1.6} color="#ffffff" />
        {/* Soft fill from the right and back */}
        <directionalLight position={[4, 4, -3]}  intensity={0.35} color="#888888" />
        <pointLight        position={[-3, 5, 3]} intensity={0.5} color="#aaaaaa" />
        <Scene />
        <Stars />
      </Canvas>
    </div>
  );
}
