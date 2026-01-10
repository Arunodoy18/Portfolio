import Container from "@/components/ui/Container";

export default function About() {
  return (
    <section id="about" className="py-24 bg-slate-950 text-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Engineering with <span className="text-blue-500">Purpose</span>.
            </h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I am a software engineer dedicated to building high-impact, scalable software. 
                With a strong foundation in computer science and a passion for backend engineering, 
                I focus on creating systems that are not only functional but also performant and maintainable.
              </p>
              <p>
                My journey in tech is driven by curiosity and a commitment to open-source. 
                I believe that the best software is built collaboratively, and I actively 
                seek opportunities to contribute to projects that push the boundaries of 
                what's possible in web infrastructure.
              </p>
              <p>
                Currently, I'm honing my skills in distributed systems, cloud-native 
                technologies, and low-level optimizations, always looking for the 
                next challenge that will help me grow as an engineer.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Architecture", value: "Distributed Systems" },
              { label: "Backend", value: "Go, Rust, Node.js" },
              { label: "Cloud", value: "AWS, Kubernetes" },
              { label: "Database", value: "PostgreSQL, Redis" },
            ].map((skill, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-colors">
                <p className="text-sm text-slate-500 mb-1">{skill.label}</p>
                <p className="font-semibold text-slate-200">{skill.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
