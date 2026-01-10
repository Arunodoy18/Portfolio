import Container from "@/components/ui/Container";

const projects = [
  {
    title: "Distributed Task Scheduler",
    description: "A high-performance, fault-tolerant task scheduler built in Go with Redis and gRPC.",
    tech: ["Go", "Redis", "gRPC", "Docker"],
    link: "https://github.com",
  },
  {
    title: "Rust Query Engine",
    description: "A columnar storage query engine optimized for large-scale analytical workloads.",
    tech: ["Rust", "Arrow", "Parquet"],
    link: "https://github.com",
  },
  {
    title: "Cloud Infrastructure Monitor",
    description: "Real-time monitoring and alerting system for Kubernetes clusters.",
    tech: ["TypeScript", "Next.js", "Prometheus", "Grafana"],
    link: "https://github.com",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-950 text-white">
      <Container>
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-slate-400 text-lg">A selection of my recent engineering work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="group relative p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((t, j) => (
                  <span key={j} className="px-2 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="inline-flex items-center text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source Code →
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
