"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { ExternalLink, Github, Terminal } from "lucide-react";

const projects = [
  { 
    title: "Smart Waste Management AI", 
    tech: "React / Python / AI / IoT", 
    desc: "Production-grade waste classification system using computer vision. Real-time monitoring and scalable backend architecture.",
    live: "https://frontend.jollysea-c5c0b121.centralus.azurecontainerapps.io",
    github: "https://github.com/Arunodoy18"
  },
  { 
    title: "Code Review Platform", 
    tech: "Next.js / Node.js / PostgreSQL", 
    desc: "High-performance platform for contributors. Automated review workflows and seamless integration for open-source teams.",
    live: "https://yours-code-assitant.netlify.app/login",
    github: "https://github.com/Arunodoy18"
  }
];

export default function ProjectsOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section id="projects" className="h-screen w-full flex items-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Production <span className="text-blue-500 italic">Deployments</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: "rgba(37,99,235,0.4)" }}
              className="group p-8 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Terminal className="w-24 h-24" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                    {project.tech}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 mb-8 leading-relaxed text-lg max-w-md">
                  {project.desc}
                </p>
                
                <div className="flex items-center gap-6">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-white font-semibold text-sm hover:text-blue-400 transition-colors"
                  >
                    Live Demo <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-slate-400 font-semibold text-sm hover:text-white transition-colors"
                  >
                    Source <Github className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
