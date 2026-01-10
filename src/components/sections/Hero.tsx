import Container from "@/components/ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Content */}
          <div className="flex flex-col space-y-8 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Building scalable systems through{" "}
              <span className="text-blue-600">open-source</span> and real-world engineering.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Software engineer focused on architecting robust backend systems, 
              contributing to high-impact open-source projects, and developing 
              production-ready applications that solve complex technical challenges.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#opensource"
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                View Open Source
              </a>
              <a
                href="#contact"
                className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 text-base font-semibold rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors duration-200"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Right Column: Spline Integration Placeholder */}
          <div className="hidden lg:block relative h-[500px] w-full bg-slate-50 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* 
              TODO: Integrate Spline 3D Scene here.
              Ensure the Spline component is lazy-loaded to maintain performance.
            */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center space-y-2 text-slate-400">
                <svg
                  className="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <span className="text-sm font-medium">3D Scene Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
