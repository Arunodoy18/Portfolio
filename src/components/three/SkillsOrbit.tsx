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
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4655] to-[#00e5ff] text-center whitespace-nowrap drop-shadow-lg font-tactical uppercase tracking-widest">Technical Skills</h2>
      </Html>

      {/* Central core - Valorant red */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#ff4655" emissive="#ff4655" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Backend skills - outer orbit - red accent */}
      {skills.backend.map((skill, i) => (
        <Float key={skill} speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
          <group position={backendPositions[i]}>
            <mesh>
              <boxGeometry args={[0.4, 0.4, 0.4]} />
              <meshStandardMaterial color="#ff4655" emissive="#ff4655" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.5, 0]} className="pointer-events-none">
              <span className="text-[#ff4655] text-base font-bold font-mono whitespace-nowrap bg-[#111118]/95 px-3 py-2 rounded border border-[#ff4655]/40 shadow-lg shadow-[#ff4655]/20">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Frontend skills - inner orbit - cyan accent */}
      {skills.frontend.map((skill, i) => (
        <Float key={skill} speed={3} rotationIntensity={0.3} floatIntensity={0.4}>
          <group position={frontendPositions[i]}>
            <mesh>
              <octahedronGeometry args={[0.25, 0]} />
              <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
            </mesh>
            <Html center position={[0, 0.4, 0]} className="pointer-events-none">
              <span className="text-[#00e5ff] text-base font-bold font-mono whitespace-nowrap bg-[#111118]/95 px-3 py-2 rounded border border-[#00e5ff]/40 shadow-lg shadow-[#00e5ff]/20">{skill}</span>
            </Html>
          </group>
        </Float>
      ))}

      {/* Orbit rings - Valorant theme */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ff4655" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
