"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

export function CameraRig() {
  const scroll = useScroll();
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const offset = scroll.offset;
    
    // Smoothly interpolate camera position based on scroll offset
    // 0 -> Hero
    // 0.25 -> About
    // 0.5 -> Projects
    // 0.75 -> Open Source
    // 1 -> Contact

    // Base camera movement
    state.camera.position.lerp(new THREE.Vector3(
      Math.sin(offset * Math.PI) * 2, 
      -offset * 20, 
      5 + Math.cos(offset * Math.PI) * 2
    ), 0.1);
    
    state.camera.lookAt(0, -offset * 20, 0);

    // Mouse parallax effect
    const x = (state.mouse.x * state.viewport.width) / 10;
    const y = (state.mouse.y * state.viewport.height) / 10;
    state.camera.position.x += (x - state.camera.position.x) * 0.05;
    state.camera.position.y += (-y - state.camera.position.y) * 0.05;
  });

  return <group ref={group} />;
}
