"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export function Torus() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.15;
    meshRef.current.rotation.y = time * 0.2;

    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.3;
      innerRef.current.rotation.z = time * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        {/* Main torus knot */}
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            metalness={0.9} 
            roughness={0.1} 
            emissive="#6d28d9"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Inner rotating icosahedron */}
        <mesh ref={innerRef} scale={0.4}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#1d4ed8"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>

        {/* Outer ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            emissive="#06b6d4" 
            emissiveIntensity={0.8}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}
