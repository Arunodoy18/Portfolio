"use client";

import { Stars as StarsDrei, Float } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Environment() {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <>
      <StarsDrei radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      
      {/* Ambient floating particles throughout the scene */}
      <group ref={particlesRef}>
        {/* Hero area particles */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[6, 2, -8]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
          </mesh>
        </Float>
        
        <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
          <mesh position={[-5, -3, -6]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
          </mesh>
        </Float>

        {/* About area particles */}
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh position={[-8, -12, -5]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={2} />
          </mesh>
        </Float>

        {/* Skills area particles */}
        <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1}>
          <mesh position={[7, -22, -4]}>
            <tetrahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
          </mesh>
        </Float>

        {/* Projects area particles */}
        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.9}>
          <mesh position={[-6, -32, -6]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
          </mesh>
        </Float>

        {/* Open Source area particles */}
        <Float speed={2.2} rotationIntensity={0.5} floatIntensity={1.1}>
          <mesh position={[5, -42, -5]}>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.5} />
          </mesh>
        </Float>

        {/* Contact area particles */}
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh position={[-4, -52, -4]}>
            <icosahedronGeometry args={[0.14, 0]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={2} />
          </mesh>
        </Float>
      </group>
    </>
  );
}
