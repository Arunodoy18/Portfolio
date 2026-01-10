"use client";

import Container from "../ui/Container";

export default function ProjectsOverlay() {
  const projects = [
    { title: "Nexus DB", tech: "Rust / Distributed Systems", desc: "A high-performance distributed key-value store." },
    { title: "Quantum CLI", tech: "Go / DevOps", desc: "A modern CLI for managing cloud-native infrastructure." },
    { title: "Aether Engine", tech: "C++ / Graphics", desc: "Experimental real-time path tracing engine." }
  ];

  return (
    <section className="h-screen w-full flex items-center">
      <Container>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-12">Core Systems</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer backdrop-blur-sm">
              <p className="text-blue-400 text-sm font-mono mb-4">{project.tech}</p>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-slate-400 mb-6">{project.desc}</p>
              <div className="flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
                Explore Code <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
