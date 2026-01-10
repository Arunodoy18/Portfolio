"use client";

import Container from "../ui/Container";

export default function HeroOverlay() {
  return (
    <section className="h-screen w-full flex items-center">
      <Container>
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>Open for GSoC 2026 & Summer Internships</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
            Architecting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Scalable Systems
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Software engineer specializing in high-performance backend systems and distributed architectures.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
              Explore Universe
            </button>
            <button className="px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all">
              View Specs
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
