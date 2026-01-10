"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export function Torus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Subtle mouse interaction could be added here if needed, 
    // but keeping it simple for now as per "smoothly rotating"
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial 
        color="#8b5cf6" 
        metalness={0.7} 
        roughness={0.2} 
        emissive="#4c1d95"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
