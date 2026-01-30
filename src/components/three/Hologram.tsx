"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export function Hologram() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.15;
    
    if (hovered) {
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0.5, 0.1);
    } else {
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1);
    }
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <group 
          ref={groupRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Photo frame - pink theme */}
          <RoundedBox args={[2.5, 3, 0.1]} radius={0.05} smoothness={4}>
            <meshStandardMaterial 
              color={hovered ? "#ec4899" : "#1a1520"}
              metalness={0.7}
              roughness={0.3}
              emissive="#ec4899"
              emissiveIntensity={hovered ? 0.4 : 0.1}
            />
          </RoundedBox>

          {/* Hologram effect layers */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.3, 2.8]} />
            <meshStandardMaterial 
              color="#0d0a0f"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>

          {/* Scan lines effect - pink */}
          {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[0, -1.2 + i * 0.35, 0.08]}>
              <planeGeometry args={[2.2, 0.02]} />
              <meshBasicMaterial color="#ec4899" transparent opacity={0.3} />
            </mesh>
          ))}

          {/* Corner accents - violet */}
          {[[-1, 1.2], [1, 1.2], [-1, -1.2], [1, -1.2]].map(([x, y], i) => (
            <mesh key={i} position={[x, y, 0.07]}>
              <planeGeometry args={[0.15, 0.15]} />
              <meshBasicMaterial color="#a78bfa" transparent opacity={0.8} />
            </mesh>
          ))}

          {/* Glow ring - pink */}
          <mesh position={[0, 0, -0.1]}>
            <ringGeometry args={[1.8, 2, 64]} />
            <meshBasicMaterial color="#ec4899" transparent opacity={hovered ? 0.3 : 0.1} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}
