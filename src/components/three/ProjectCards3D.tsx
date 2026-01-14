"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const projects = [
  {
    title: "Open Source Contributor",
    tech: "Apache / CNCF",
    desc: "I am a consistent open-source contributor with hands-on experience in large, production-grade projects, primarily within the Apache and CNCF ecosystems. Since November, I have been actively contributing to Apache Airflow and the OpenTelemetry Collector, focusing on understanding system internals, design trade-offs, and long-term maintainability rather than one-off fixes. I enjoy working on infrastructure-level problems involving observability, scheduling, and security boundaries.",
    live: "https://github.com/apache/airflow",
    source: "https://github.com/Arunodoy18",
    color: "#3b82f6"
  },
  {
    title: "Systems Thinker",
    tech: "Problem Solving / Design",
    desc: "I enjoy understanding how complex systems work beneath the surface and how small design decisions can have large real-world impact. I'm particularly interested in problem-solving, system behavior, and building reliable software rather than just writing code that \"works.\" Computer science gives me the tools to think logically, break down complexity, and continuously learn as technology evolves.",
    live: "https://github.com/Arunodoy18",
    source: "https://github.com/Arunodoy18",
    color: "#8b5cf6"
  }
];

export function ProjectCards3D() {
  return (
    <group>
      <Html center position={[0, 3, 0]} className="pointer-events-none">
        <h2 className="text-4xl font-bold text-white text-center whitespace-nowrap">Featured Projects</h2>
      </Html>

      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </group>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const xPos = index === 0 ? -2.5 : 2.5;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() + index) * 0.1;
      meshRef.current.position.z = hovered ? 0.5 : 0;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={[xPos, 0, 0]}>
        <RoundedBox
          ref={meshRef}
          args={[3.5, 2.5, 0.1]}
          radius={0.1}
          smoothness={4}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial 
            color={hovered ? project.color : "#1e293b"} 
            metalness={0.5} 
            roughness={0.5}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.3 : 0.05}
          />
        </RoundedBox>
        
        <Html 
          center 
          position={[0, 0, 0.2]} 
          className="pointer-events-auto"
          zIndexRange={[100, 0]}
          occlude={false}
        >
          <div 
            className="w-[280px] max-h-[220px] overflow-y-auto p-4 cursor-pointer bg-slate-900/95 rounded-xl backdrop-blur-sm opacity-100 visible"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <p className="text-blue-400 text-xs font-mono mb-2">{project.tech}</p>
            <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{project.desc}</p>
            <div className="flex gap-2">
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-all"
              >
                Live Demo
              </a>
              <a 
                href={project.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded transition-all"
              >
                Source
              </a>
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}
