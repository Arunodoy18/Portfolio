import Container from "@/ui/Container";

export default function Hero() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Welcome to My Portfolio
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              I'm a full-stack developer passionate about building amazing web experiences.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium">
                View Projects
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium">
                Contact Me
              </button>
            </div>
          </div>
          <div className="relative h-64 md:h-96 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              [Hero Image]
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
