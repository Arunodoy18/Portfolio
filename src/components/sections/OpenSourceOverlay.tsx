"use client";

import Container from "../ui/Container";

export default function OpenSourceOverlay() {
  const contributions = [
    { name: "Kubernetes", role: "Contributor", impact: "Optimized scheduler performance" },
    { name: "Apache Arrow", role: "Maintainer", impact: "Implemented SIMD-accelerated kernels" },
    { name: "PyTorch", role: "Contributor", impact: "Enhanced distributed training backend" }
  ];

  return (
    <section className="h-screen w-full flex items-center justify-end">
      <Container>
        <div className="max-w-2xl ml-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 text-right">Open Source Impact</h2>
          <div className="space-y-6">
            {contributions.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 transition-all group">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{item.name}</h3>
                  <p className="text-slate-400">{item.role}</p>
                </div>
                <p className="text-slate-500 font-mono text-sm max-w-[200px] text-right">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
