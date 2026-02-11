"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   GOJO-STYLE 3D HERO AGENT
   Procedural futuristic silhouette with:
   - Head + body + limbs (geometric)
   - Electric blue energy aura
   - Floating particles
   - Idle breathing animation
   ────────────────────────────────────────────── */

function EnergyRing({ radius, speed, color, opacity = 0.4 }: { radius: number; speed: number; color: string; opacity?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * speed;
    ref.current.rotation.z = state.clock.getElapsedTime() * speed * 0.3;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.015, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function AuraParticles({ count = 40, radius = 2.5 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = radius * (0.5 + Math.random() * 0.5);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.3) * 4;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
      sz[i] = Math.random() * 3 + 1;
    }
    return [pos, sz];
  }, [count, radius]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    const posAttr = ref.current.geometry.getAttribute("position");
    for (let i = 0; i < count; i++) {
      const y = posAttr.getY(i);
      posAttr.setY(i, y + Math.sin(state.clock.getElapsedTime() * 2 + i) * 0.003);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00e5ff"
        size={0.06}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function HeroAgent() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current || !bodyRef.current) return;
    const t = state.clock.getElapsedTime();

    // Idle breathing
    bodyRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    bodyRef.current.rotation.y = Math.sin(t * 0.4) * 0.05;

    // Subtle mouse follow
    const mx = state.mouse.x * 0.15;
    const my = state.mouse.y * 0.1;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mx, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -my * 0.3, 0.05);

    // Aura pulse
    if (auraRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.08;
      auraRef.current.scale.set(scale, scale, scale);
      (auraRef.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + Math.sin(t * 3) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
        <group ref={bodyRef}>
          {/* ── HEAD ── */}
          <mesh position={[0, 1.9, 0]}>
            <sphereGeometry args={[0.32, 32, 32]} />
            <meshStandardMaterial color="#1a1a24" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Eyes - cyan glow */}
          <mesh position={[-0.1, 1.95, 0.28]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
          <mesh position={[0.1, 1.95, 0.28]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#00e5ff" />
          </mesh>
          {/* Hair spikes (white/silver - Gojo style) */}
          {[[-0.15, 2.25, -0.05], [0, 2.3, -0.02], [0.15, 2.25, -0.05], [-0.08, 2.28, 0.08], [0.08, 2.28, 0.08]].map((pos, i) => (
            <mesh key={`hair-${i}`} position={pos as [number, number, number]} rotation={[Math.random() * 0.3 - 0.15, 0, Math.random() * 0.4 - 0.2]}>
              <coneGeometry args={[0.06, 0.25, 4]} />
              <meshStandardMaterial color="#e0e0e0" metalness={0.4} roughness={0.6} emissive="#c0c0c0" emissiveIntensity={0.2} />
            </mesh>
          ))}

          {/* Blindfold (Gojo signature) */}
          <mesh position={[0, 1.95, 0.12]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.45, 0.08, 0.35]} />
            <meshStandardMaterial color="#111118" metalness={0.5} roughness={0.4} emissive="#00e5ff" emissiveIntensity={0.15} />
          </mesh>

          {/* ── TORSO ── */}
          <mesh position={[0, 1.15, 0]}>
            <boxGeometry args={[0.7, 0.9, 0.35]} />
            <meshStandardMaterial color="#111118" metalness={0.7} roughness={0.25} emissive="#00e5ff" emissiveIntensity={0.05} />
          </mesh>
          {/* Collar piece */}
          <mesh position={[0, 1.55, 0.05]}>
            <boxGeometry args={[0.55, 0.15, 0.3]} />
            <meshStandardMaterial color="#1a1a28" metalness={0.8} roughness={0.2} emissive="#00b8d4" emissiveIntensity={0.1} />
          </mesh>
          {/* Chest emblem / energy core */}
          <mesh position={[0, 1.2, 0.19]}>
            <octahedronGeometry args={[0.08, 0]} />
            <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={2} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* Tactical vest lines */}
          {[-0.2, 0, 0.2].map((x, i) => (
            <mesh key={`vest-${i}`} position={[x, 1.15, 0.185]}>
              <boxGeometry args={[0.02, 0.7, 0.01]} />
              <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
            </mesh>
          ))}

          {/* ── ARMS ── */}
          {/* Left arm */}
          <mesh position={[-0.52, 1.1, 0]} rotation={[0, 0, 0.15]}>
            <boxGeometry args={[0.18, 0.75, 0.22]} />
            <meshStandardMaterial color="#111118" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[-0.55, 0.6, 0]} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.16, 0.6, 0.2]} />
            <meshStandardMaterial color="#1a1a28" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Left arm energy band */}
          <mesh position={[-0.53, 0.85, 0]}>
            <torusGeometry args={[0.14, 0.015, 8, 24]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
          </mesh>

          {/* Right arm */}
          <mesh position={[0.52, 1.1, 0]} rotation={[0, 0, -0.15]}>
            <boxGeometry args={[0.18, 0.75, 0.22]} />
            <meshStandardMaterial color="#111118" metalness={0.7} roughness={0.25} />
          </mesh>
          <mesh position={[0.55, 0.6, 0]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.16, 0.6, 0.2]} />
            <meshStandardMaterial color="#1a1a28" metalness={0.6} roughness={0.3} />
          </mesh>
          {/* Right arm energy band */}
          <mesh position={[0.53, 0.85, 0]}>
            <torusGeometry args={[0.14, 0.015, 8, 24]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.6} />
          </mesh>

          {/* ── LEGS ── */}
          <mesh position={[-0.18, 0.25, 0]}>
            <boxGeometry args={[0.22, 0.8, 0.25]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.3} />
          </mesh>
          <mesh position={[0.18, 0.25, 0]}>
            <boxGeometry args={[0.22, 0.8, 0.25]} />
            <meshStandardMaterial color="#0d0d14" metalness={0.6} roughness={0.3} />
          </mesh>

          {/* ── ENERGY AURA (Gojo style) ── */}
          <mesh ref={auraRef} position={[0, 1.1, 0]}>
            <sphereGeometry args={[1.3, 32, 32]} />
            <meshBasicMaterial color="#00e5ff" transparent opacity={0.06} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>

          {/* Energy rings orbiting */}
          <group position={[0, 1.1, 0]}>
            <EnergyRing radius={1.0} speed={0.8} color="#00e5ff" opacity={0.3} />
            <EnergyRing radius={1.3} speed={-0.5} color="#1fb6ff" opacity={0.2} />
            <EnergyRing radius={1.6} speed={0.3} color="#00e5ff" opacity={0.15} />
          </group>
        </group>
      </Float>

      {/* Floating particles around agent */}
      <AuraParticles count={50} radius={2.2} />

      {/* Ground glow */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.5, 64]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}
