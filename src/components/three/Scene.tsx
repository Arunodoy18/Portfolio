"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Torus } from "./Torus";
import { Lights } from "./Lights";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export function Scene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <Torus />
          <Lights />
          {/* Subtle auto-rotation and mouse interaction handled by Torus and OrbitControls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.5} 
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
