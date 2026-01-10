"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float } from "@react-three/drei";
import * as THREE from "three";

const skills = {
  backend: ["Java", "Spring Boot", "Python", "FastAPI", "MongoDB", "PostgreSQL"],
  frontend: ["JavaScript", "TypeScript", "HTML", "CSS"]
};

export function SkillsOrbit() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  const backendPositions = useMemo(() => {
    return skills.backend.map((_, i) => {
      const angle = (i / skills.backend.length) * Math.PI * 2;
      const radius = 3;
      return [Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius] as [number, number, number];
    });
  }, []);

  const frontendPositions = useMemo(() => {
    return skills.frontend.map((_, i) => {
      const angle = (i / skills.frontend.length) * Math.PI * 2 + Math.PI / 4;
      const radius = 1.8;
      return [Math.cos(angle) * radius, Math.sin(i * 0.3) * 0.3 + 1, Math.sin(angle) * radius] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Html center position={[0, 3, 0]} className="pointer-events-none">
        <h2 className="text-4xl font-bold text-white text-center whitespace-nowrap">Technical Skills</h2>
      </Html>

      {/* Central core */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.5} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Backend skills - outer orbit */}
      {skills.backend.map((skill, i) => (
        <Float key={skill} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={backendPositions[i]}>
            <mesh>
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.5, 0]} className="pointer-events-none">
              <span className="text-blue-400 text-sm font-mono whitespace-nowrap bg-slate-900/80 px-2 py-1 rounded">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Frontend skills - inner orbit */}
      {skills.frontend.map((skill, i) => (
        <Float key={skill} speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
          <group position={frontendPositions[i]}>
            <mesh>
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.4, 0]} className="pointer-events-none">
              <span className="text-cyan-400 text-sm font-mono whitespace-nowrap bg-slate-900/80 px-2 py-1 rounded">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Orbit rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
