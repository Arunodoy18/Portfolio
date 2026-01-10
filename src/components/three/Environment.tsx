"use client";

import { Stars as StarsDrei, Float } from "@react-three/drei";

export function Environment() {
  return (
    <>
      <StarsDrei radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Floating abstract particles */}
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[10, 5, -10]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-15, -5, -20]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
        </mesh>
      </Float>
    </>
  );
}
