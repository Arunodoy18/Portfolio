import Container from "@/components/ui/Container";

export default function Projects() {
  return (
    <section className="py-20" id="projects">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder for projects */}
          <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-2">System Architecture</h3>
            <p className="text-slate-600">Scaling backend services using Go and Kubernetes.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
