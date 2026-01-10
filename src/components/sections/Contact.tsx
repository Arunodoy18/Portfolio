import Container from "@/components/ui/Container";

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-slate-950 text-white">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">extraordinary</span>.</h2>
          <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities and collaborations. 
            Whether you have a question or just want to say hi, my inbox is always open.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-slate-900 text-white font-bold border border-slate-800 hover:bg-slate-800 transition-all"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl bg-slate-900 text-white font-bold border border-slate-800 hover:bg-slate-800 transition-all"
            >
              GitHub
            </a>
          </div>

          <div className="mt-24 pt-12 border-t border-slate-900 text-slate-500 text-sm">
            © 2026 • Designed & Built by a top 1% engineer candidate
          </div>
        </div>
      </Container>
    </section>
  );
}
