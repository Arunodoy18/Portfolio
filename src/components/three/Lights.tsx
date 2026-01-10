"use client";

import { Environment } from "@react-three/drei";

export function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} color="#4c1d95" intensity={2} />
      <Environment preset="city" />
    </>
  );
}
