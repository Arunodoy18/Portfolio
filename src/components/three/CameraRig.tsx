"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function CameraRig() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);
  const targetPosition = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const offset = scroll.offset;
    
    // Calculate target camera position based on scroll
    // 6 pages: Hero(0), About(1), Skills(2), Projects(3), OpenSource(4), Contact(5)
    const yOffset = -offset * 50;
    
    // Cinematic camera path with subtle X/Z movements
    targetPosition.current.set(
      Math.sin(offset * Math.PI * 2) * 1.5,
      yOffset,
      8 + Math.cos(offset * Math.PI) * 2
    );
    
    targetLookAt.current.set(0, yOffset, 0);

    // Smooth interpolation for camera position
    state.camera.position.lerp(targetPosition.current, 0.05);
    
    // Smooth lookAt with temporary vector
    const currentLookAt = new THREE.Vector3();
    state.camera.getWorldDirection(currentLookAt);
    currentLookAt.add(state.camera.position);
    currentLookAt.lerp(targetLookAt.current, 0.05);
    state.camera.lookAt(targetLookAt.current);

    // Subtle mouse parallax effect
    const mouseX = state.mouse.x * 0.5;
    const mouseY = state.mouse.y * 0.3;
    state.camera.position.x += mouseX * 0.1;
    state.camera.position.y += mouseY * 0.1;
  });

  return <group ref={group} />;
}
