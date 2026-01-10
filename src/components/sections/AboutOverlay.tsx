"use client";

import Container from "../ui/Container";

export default function AboutOverlay() {
  return (
    <section className="h-screen w-full flex items-center justify-end">
      <Container>
        <div className="max-w-xl ml-auto text-right">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">The Engineering Mindset</h2>
          <p className="text-xl text-slate-400 leading-relaxed mb-6">
            Focused on building systems that don't just work, but scale. My approach combines mathematical precision with creative problem-solving.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-8">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-blue-400 font-bold text-2xl mb-1">99.9%</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider">Uptime Focus</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-purple-400 font-bold text-2xl mb-1">50+</h3>
              <p className="text-slate-500 text-sm uppercase tracking-wider">OS Contributions</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
