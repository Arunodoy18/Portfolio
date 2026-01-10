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
          <h2 className="text-4xl font-bold text-white whitespace-nowrap">Open Source Mindset</h2>
          <p className="text-slate-400 mt-2">Building in public. Contributing to the ecosystem.</p>
        </div>
      </Html>

      {/* Connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </lineSegments>

      {/* Nodes */}
      {contributions.map((item, i) => (
        <Float key={item.name} speed={2 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.2}>
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
                color={item.type === "core" ? "#8b5cf6" : item.type === "badge" ? "#06b6d4" : "#3b82f6"}
                emissive={item.type === "core" ? "#8b5cf6" : item.type === "badge" ? "#06b6d4" : "#3b82f6"}
                emissiveIntensity={item.type === "core" ? 0.5 : 0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <Html center position={[0, item.type === "core" ? 0.7 : 0.5, 0]} className="pointer-events-none">
              <span className={`text-xs font-mono whitespace-nowrap px-2 py-1 rounded ${
                item.type === "core" ? "text-purple-400 bg-purple-900/50" : 
                item.type === "badge" ? "text-cyan-400 bg-cyan-900/50" : 
                "text-blue-400 bg-slate-900/80"
              }`}>
                {item.name}
              </span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
