"use client";

import Container from "../ui/Container";

export default function ContactOverlay() {
  return (
    <section className="h-screen w-full flex items-center justify-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">Let's Build the Future</h2>
          <p className="text-xl text-slate-400 mb-12">
            Currently seeking ambitious opportunities in distributed systems and cloud infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="mailto:hello@example.com" className="px-10 py-5 rounded-full bg-white text-black font-bold hover:bg-blue-400 transition-all">
              Initiate Contact
            </a>
            <a href="#" className="px-10 py-5 rounded-full bg-slate-900 text-white font-bold border border-slate-700 hover:border-white transition-all">
              GitHub Profile
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
