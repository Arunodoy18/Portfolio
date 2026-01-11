"use client";

import { useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Torus } from "./Torus";
import { Lights } from "./Lights";
import { CameraRig } from "./CameraRig";
import { Hologram } from "./Hologram";
import { Environment } from "./Environment";
import { SkillsOrbit } from "./SkillsOrbit";
import { ProjectCards3D } from "./ProjectCards3D";
import { OpenSourceNodes } from "./OpenSourceNodes";

// Import overlays
import HeroOverlay from "../sections/HeroOverlay";
import AboutOverlay from "../sections/AboutOverlay";
import ProjectsOverlay from "../sections/ProjectsOverlay";
import OpenSourceOverlay from "../sections/OpenSourceOverlay";
import ContactOverlay from "../sections/ContactOverlay";

export default function Experience() {
  return (
    <div className="h-screen w-full bg-[#020617] fixed inset-0">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#020617"]} />
        <fog attach="fog" args={["#020617", 5, 30]} />
        
        <ScrollControls pages={6} damping={0.15}>
            <Scroll html>
              <main className="w-full">
                <HeroOverlay />
                <AboutOverlay />
                <div className="h-screen" /> {/* Skills Section Spacer */}
                <ProjectsOverlay />
                <OpenSourceOverlay />
                <ContactOverlay />
              </main>
            </Scroll>

            <Scroll>
              <Suspense fallback={null}>
                <Lights />
                <Environment />
                <CameraRig />
                
                <group position={[0, 0, 0]}>
                  <Torus />
                </group>

                <group position={[2, -10, -2]}>
                  <Hologram />
                </group>
                
                <group position={[-1, -20, 0]}>
                  <SkillsOrbit />
                </group>

                <group position={[0, -30, 0]}>
                  <ProjectCards3D />
                </group>

                <group position={[0, -40, 0]}>
                  <OpenSourceNodes />
                </group>

                <group position={[0, -50, 0]}>
                  <mesh>
                    <torusGeometry args={[2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
                  </mesh>
                </group>
              </Suspense>
            </Scroll>
        </ScrollControls>
      </Canvas>
      
      {/* Fixed Branding */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <p className="text-white font-bold text-lg tracking-tighter">AB<span className="text-blue-500">.</span></p>
      </div>
      
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 pointer-events-auto">
        <a href="https://github.com/Arunodoy18" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  );
}
