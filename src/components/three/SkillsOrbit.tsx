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
      const radius = 2.5;
      return [Math.cos(angle) * radius, Math.sin(i * 0.5) * 0.5, Math.sin(angle) * radius * 0.3] as [number, number, number];
    });
  }, []);

  const frontendPositions = useMemo(() => {
    return skills.frontend.map((_, i) => {
      const angle = (i / skills.frontend.length) * Math.PI * 2 + Math.PI / 4;
      const radius = 1.5;
      return [Math.cos(angle) * radius, Math.sin(i * 0.3) * 0.3 + 1, Math.sin(angle) * radius * 0.3] as [number, number, number];
    });
  }, []);

  return (
    <group ref={groupRef}>
      <Html center position={[0, 3, 0]} className="pointer-events-none">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 text-center whitespace-nowrap drop-shadow-lg">Technical Skills</h2>
      </Html>

      {/* Central core - pink theme - larger and brighter */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Backend skills - outer orbit - pink accent */}
      {skills.backend.map((skill, i) => (
        <Float key={skill} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={backendPositions[i]}>
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.5, 0]} className="pointer-events-none">
              <span className="text-pink-300 text-base font-bold font-mono whitespace-nowrap bg-[#1a1520]/95 px-3 py-2 rounded-lg border-2 border-pink-500/40 shadow-lg shadow-pink-500/20">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Frontend skills - inner orbit - violet accent */}
      {skills.frontend.map((skill, i) => (
        <Float key={skill} speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
          <group position={frontendPositions[i]}>
            <mesh>
              <octahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.4, 0]} className="pointer-events-none">
              <span className="text-violet-300 text-base font-bold font-mono whitespace-nowrap bg-[#1a1520]/95 px-3 py-2 rounded-lg border-2 border-violet-500/40 shadow-lg shadow-violet-500/20">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Orbit rings - pink theme */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
