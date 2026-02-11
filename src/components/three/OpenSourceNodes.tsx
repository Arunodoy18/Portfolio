"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

const contributions = [
  { name: "Open Source Contributions", type: "core" },
  { name: "GSoC Ready", type: "badge" },
  { name: "Backend Systems", type: "node" },
  { name: "Distributed Architecture", type: "node" },
  { name: "Cloud Native", type: "node" },
  { name: "API Design", type: "node" },
];

export function OpenSourceNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodePositions = useMemo(() => {
    return contributions.map((_, i) => {
      if (i === 0) return [0, 0, 0] as [number, number, number];
      const angle = ((i - 1) / (contributions.length - 1)) * Math.PI * 2;
      const radius = i === 1 ? 1.5 : 2.5;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, Math.sin(angle) * 0.5] as [number, number, number];
    });
  }, []);

  const lineGeometry = useMemo(() => {
    const points: number[] = [];
    for (let i = 1; i < nodePositions.length; i++) {
      points.push(...nodePositions[0], ...nodePositions[i]);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    return geometry;
  }, [nodePositions]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Html center position={[0, 3.5, 0]} className="pointer-events-none">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white whitespace-nowrap font-tactical uppercase tracking-widest">Open Source Mindset</h2>
          <p className="text-[#8a8a9a] mt-2 font-mono">Building in public. Contributing to the ecosystem.</p>
        </div>
      </Html>

      {/* Connection lines - Valorant red */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#ff4655" transparent opacity={0.3} />
      </lineSegments>

      {/* Nodes - Valorant red/cyan theme */}
      {contributions.map((item, i) => (
        <Float key={item.name} speed={0.8 + i * 0.1} rotationIntensity={0.05} floatIntensity={0.15}>
          <group position={nodePositions[i]}>
            <mesh>
              {item.type === "core" ? (
                <icosahedronGeometry args={[0.4, 1]} />
              ) : item.type === "badge" ? (
                <octahedronGeometry args={[0.3, 0]} />
              ) : (
                <sphereGeometry args={[0.2, 16, 16]} />
              )}
              <meshStandardMaterial
                color={item.type === "core" ? "#ff4655" : item.type === "badge" ? "#00e5ff" : "#1fb6ff"}
                emissive={item.type === "core" ? "#ff4655" : item.type === "badge" ? "#00e5ff" : "#1fb6ff"}
                emissiveIntensity={item.type === "core" ? 0.5 : 0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <Html center position={[0, item.type === "core" ? 0.7 : 0.5, 0]} className="pointer-events-none">
              <span className={`text-xs font-mono whitespace-nowrap px-2 py-1 rounded border ${
                item.type === "core" ? "text-[#ff4655] bg-[#ff4655]/10 border-[#ff4655]/30" : 
                item.type === "badge" ? "text-[#00e5ff] bg-[#00e5ff]/10 border-[#00e5ff]/30" : 
                "text-[#1fb6ff] bg-[#111118]/80 border-[#1fb6ff]/20"
              }`}>
                {item.name}
              </span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Outer ring - Valorant red */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ff4655" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
