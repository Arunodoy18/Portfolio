import Container from "@/components/ui/Container";

const contributions = [
  {
    org: "Kubernetes",
    project: "kube-proxy",
    description: "Improved performance of iptables rule synchronization in large clusters.",
    role: "Contributor",
  },
  {
    org: "Apache Software Foundation",
    project: "Apache Arrow",
    description: "Implemented C++ to Rust bindings for the memory-efficient data format.",
    role: "Core Contributor",
  },
  {
    org: "The Linux Foundation",
    project: "eBPF",
    description: "Contributed to the development of observability tools using eBPF probes.",
    role: "GSoC 2025 Participant",
  },
];

export default function OpenSource() {
  return (
    <section id="opensource" className="py-24 bg-slate-950 text-white">
      <Container>
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Source Impact</h2>
          <p className="text-slate-400 text-lg">Building the foundations of the modern web.</p>
        </div>

        <div className="space-y-6">
          {contributions.map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/30 transition-all">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xl font-bold text-slate-100">{item.org}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-xl font-medium text-purple-400">{item.project}</span>
                </div>
                <p className="text-slate-400 max-w-2xl">{item.description}</p>
              </div>
              <div className="inline-flex px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-semibold">
                {item.role}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
