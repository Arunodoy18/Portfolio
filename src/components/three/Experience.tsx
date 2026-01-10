"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Suspense } from "react";
import { Torus } from "./Torus";
import { Lights } from "./Lights";
import { CameraRig } from "./CameraRig";
import { Hologram } from "./Hologram";
import { Environment } from "./Environment";
import HeroOverlay from "../sections/HeroOverlay";
import AboutOverlay from "../sections/AboutOverlay";
import ProjectsOverlay from "../sections/ProjectsOverlay";
import OpenSourceOverlay from "../sections/OpenSourceOverlay";
import ContactOverlay from "../sections/ContactOverlay";

export default function Experience() {
  return (
    <div className="h-screen w-full bg-[#020617] fixed inset-0">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 35 }}>
        <Suspense fallback={null}>
          <ScrollControls pages={5} damping={0.3}>
            {/* 3D Elements */}
            <Scroll>
              <Lights />
              <Environment />
              <CameraRig />
              
              <group position={[0, 0, 0]}>
                <Torus />
              </group>

              <group position={[0, -20, -2]}>
                <Hologram />
              </group>
              
              {/* Add more 3D spatial elements at different Y positions to match scroll */}
              <group position={[5, -40, -5]}>
                <mesh>
                  <boxGeometry args={[2, 2, 2]} />
                  <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.1} />
                </mesh>
              </group>

              <group position={[-5, -60, -5]}>
                <mesh rotation={[0, Math.PI / 4, 0]}>
                  <octahedronGeometry args={[2, 0]} />
                  <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.1} />
                </mesh>
              </group>
            </Scroll>

            {/* HTML Overlay Content */}
            <Scroll html className="w-full">
              <HeroOverlay />
              <AboutOverlay />
              <ProjectsOverlay />
              <OpenSourceOverlay />
              <ContactOverlay />
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
