"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Torus } from "./Torus";
import { Lights } from "./Lights";
import { CameraRig } from "./CameraRig";
import { Hologram } from "./Hologram";
import { Environment } from "./Environment";
import { SkillsOrbit } from "./SkillsOrbit";
import { OpenSourceNodes } from "./OpenSourceNodes";

// Import overlays
import HeroOverlay from "../sections/HeroOverlay";
import AboutOverlay from "../sections/AboutOverlay";
import ProjectsOverlay from "../sections/ProjectsOverlay";
import WhyMeOverlay from "../sections/WhyMeOverlay";
import OpenSourceOverlay from "../sections/OpenSourceOverlay";
import ContactOverlay from "../sections/ContactOverlay";
import Navbar from "../ui/Navbar";

export default function Experience() {
  // Tag drei scroll container for external navigation (Navbar)
  useEffect(() => {
    const tagScrollContainer = () => {
      const containers = document.querySelectorAll('div');
      for (const div of containers) {
        const style = window.getComputedStyle(div);
        if (style.overflowY === 'scroll' && style.position === 'absolute' && div.scrollHeight > window.innerHeight * 2) {
          div.setAttribute('data-scroll-container', 'true');
          return true;
        }
      }
      return false;
    };

    // Try immediately, then retry
    if (!tagScrollContainer()) {
      const timer = setTimeout(tagScrollContainer, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="h-screen w-full bg-[#0d0a0f] fixed inset-0">
      <Navbar />
      
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={["#0d0a0f"]} />
        <fog attach="fog" args={["#0d0a0f", 5, 30]} />
        
        <ScrollControls pages={8} damping={0.3}>
            <Scroll html>
              <main className="w-full">
                <HeroOverlay />
                <AboutOverlay />
                <div className="h-screen" /> {/* Skills Section Spacer */}
                <ProjectsOverlay />
                <WhyMeOverlay />
                <OpenSourceOverlay />
                <ContactOverlay />
              </main>
            </Scroll>

            <Scroll>
              <Suspense fallback={null}>
                <Lights />
                <Environment />
                <CameraRig />
                
                {/* Hero - Torus */}
                <group position={[0, 0, 0]}>
                  <Torus />
                </group>

                {/* About - Hologram */}
                <group position={[2, -10, -2]}>
                  <Hologram />
                </group>
                
                {/* Skills - Orbit */}
                <group position={[4, -20, 0]}>
                  <SkillsOrbit />
                </group>

                {/* Decorative element for Projects section */}
                <group position={[0, -35, -5]}>
                  <mesh>
                    <torusGeometry args={[3, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.3} transparent opacity={0.4} />
                  </mesh>
                </group>

                {/* Open Source - Nodes */}
                <group position={[0, -55, 0]}>
                  <OpenSourceNodes />
                </group>

                {/* Contact - Ring */}
                <group position={[0, -75, 0]}>
                  <mesh>
                    <torusGeometry args={[2, 0.02, 16, 100]} />
                    <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
                  </mesh>
                </group>
              </Suspense>
            </Scroll>
        </ScrollControls>
      </Canvas>
      
      {/* Fixed Branding - moved to navbar */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-4 pointer-events-auto">
        <a 
          href="https://github.com/Arunodoy18" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-[#6b5a75] hover:text-pink-400 transition-colors"
          aria-label="Visit GitHub profile"
          title="GitHub Profile"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
      </div>
    </div>
  );
}
