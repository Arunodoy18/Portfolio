import Container from "@/ui/Container";

export default function Projects() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="h-40 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                Project {i} Image
              </div>
              <h3 className="text-xl font-bold mb-2">Project {i}</h3>
              <p className="text-gray-600 mb-4">
                A brief description of this project and what it does.
              </p>
              <button className="text-blue-600 font-medium">View Details →</button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
