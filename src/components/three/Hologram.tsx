"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function Hologram() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <planeGeometry args={[3, 4, 32, 32]} />
          <MeshDistortMaterial
            color="#3b82f6"
            speed={2}
            distort={0.2}
            radius={1}
            opacity={0.6}
            transparent
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
      
      {/* Decorative frame/glow */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[3.2, 4.2]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
