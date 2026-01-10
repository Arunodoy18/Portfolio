"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, Html } from "@react-three/drei";
import { Suspense } from "react";
import { Torus } from "./Torus";
import { Lights } from "./Lights";
import { CameraRig } from "./CameraRig";
import { Hologram } from "./Hologram";
import { Environment } from "./Environment";
import { SkillsOrbit } from "./SkillsOrbit";
import { ProjectCards3D } from "./ProjectCards3D";
import { OpenSourceNodes } from "./OpenSourceNodes";

export default function Experience() {
  return (
    <div className="h-screen w-full bg-[#020617] fixed inset-0">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 5, 30]} />
          
          <ScrollControls pages={6} damping={0.25}>
            <Scroll>
              <Lights />
              <Environment />
              <CameraRig />
              
              {/* Hero Section - Page 0 */}
              <group position={[0, 0, 0]}>
                <Torus />
                <HeroText />
              </group>

              {/* About Section - Page 1 */}
              <group position={[2, -10, -2]}>
                <Hologram />
                <AboutText />
              </group>
              
              {/* Skills Section - Page 2 */}
              <group position={[-1, -20, 0]}>
                <SkillsOrbit />
              </group>

              {/* Projects Section - Page 3 */}
              <group position={[0, -30, 0]}>
                <ProjectCards3D />
              </group>

              {/* Open Source Section - Page 4 */}
              <group position={[0, -40, 0]}>
                <OpenSourceNodes />
              </group>

              {/* Contact Section - Page 5 */}
              <group position={[0, -50, 0]}>
                <ContactScene />
              </group>
            </Scroll>
          </ScrollControls>
        </Suspense>
      </Canvas>
      
      {/* Fixed UI Overlay */}
      <div className="fixed top-6 left-6 z-50">
        <p className="text-white/60 text-sm font-mono">Arunodoy Banerjee</p>
      </div>
      <div className="fixed bottom-6 right-6 z-50 flex gap-4">
        <a href="https://github.com/Arunodoy18" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">GitHub</a>
        <a href="https://www.linkedin.com/in/arunodoy-banerjee-214251342/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors text-sm">LinkedIn</a>
      </div>
    </div>
  );
}

function HeroText() {
  return (
    <Html center position={[0, -1.5, 0]} className="pointer-events-none select-none">
      <div className="text-center w-[600px]">
        <p className="text-blue-400 text-sm font-mono mb-2 tracking-widest">SOFTWARE ENGINEER</p>
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">Arunodoy Banerjee</h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">Building scalable systems through open source. GSoC ready.</p>
        <div className="mt-6 flex justify-center gap-4">
          <a href="#projects" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all pointer-events-auto">View Projects</a>
          <a href="mailto:barun4927@gmail.com" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium border border-slate-700 transition-all pointer-events-auto">Contact</a>
        </div>
      </div>
    </Html>
  );
}

function AboutText() {
  return (
    <Html center position={[-3, 0, 0]} className="pointer-events-none select-none">
      <div className="w-[400px]">
        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
        <p className="text-slate-400 leading-relaxed">
          I am a software engineer passionate about distributed systems, backend architecture, and open-source contributions.
          My focus is on building high-performance, scalable solutions that make a real impact.
        </p>
      </div>
    </Html>
  );
}

function ContactScene() {
  return (
    <>
      <mesh>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <Html center position={[0, 0, 0]} className="pointer-events-auto">
        <div className="text-center w-[500px]">
          <h2 className="text-5xl font-bold text-white mb-6">Let&apos;s Connect</h2>
          <p className="text-slate-400 mb-8">Open for opportunities in distributed systems and cloud infrastructure.</p>
          <div className="flex flex-col gap-4 items-center">
            <a href="mailto:barun4927@gmail.com" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-blue-400 transition-all">
              barun4927@gmail.com
            </a>
            <div className="flex gap-4 mt-4">
              <a href="https://github.com/Arunodoy18" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-all">GitHub</a>
              <a href="https://www.linkedin.com/in/arunodoy-banerjee-214251342/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-all">LinkedIn</a>
              <a href="https://leetcode.com/u/Arunodoy_45/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-all">LeetCode</a>
            </div>
            <p className="text-slate-500 text-sm mt-4">+91 9864446805</p>
          </div>
        </div>
      </Html>
    </>
  );
}
