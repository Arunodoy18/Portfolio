"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { ExternalLink, Github, Terminal, Layers } from "lucide-react";

const projects = [
  { 
    title: "Smart Waste Management AI", 
    tech: "React / Python / AI / IoT", 
    problem: "Manual waste sorting is inefficient and error-prone at scale.",
    desc: "Production-grade waste classification system using computer vision. Real-time monitoring with scalable backend architecture handling 10K+ classifications/day.",
    impact: "Reduced misclassification by 85% in pilot deployment.",
    live: "https://wastifi.netlify.app/",
    github: "https://github.com/Arunodoy18"
  },
  { 
    title: "Code Review Platform", 
    tech: "Next.js / Node.js / PostgreSQL", 
    problem: "Open-source teams struggle with consistent, efficient code review workflows.",
    desc: "High-performance platform for contributors. Automated review workflows with intelligent suggestions and seamless integration for open-source teams.",
    impact: "Streamlined review process for 50+ contributors.",
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
    <section id="projects" className="min-h-screen w-full flex items-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Production <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 italic">Deployments</span>
          </h2>
          <p className="text-[#9d8ba6] text-lg mb-4">Real projects solving real problems at scale.</p>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-transparent rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -10, borderColor: "rgba(236,72,153,0.4)" }}
              className="group p-8 rounded-2xl bg-[#1a1520]/60 border border-pink-500/10 backdrop-blur-md transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <Terminal className="w-24 h-24 text-pink-400" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-6">
                  <span className="px-3 py-1 rounded-md bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono">
                    {project.tech}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">
                  {project.title}
                </h3>
                
                {/* Problem */}
                <div className="mb-4">
                  <p className="text-violet-400 text-sm font-semibold uppercase tracking-wide mb-1">Problem</p>
                  <p className="text-[#9d8ba6] text-sm">{project.problem}</p>
                </div>
                
                {/* Solution */}
                <p className="text-[#9d8ba6] mb-4 leading-relaxed">
                  {project.desc}
                </p>
                
                {/* Impact */}
                <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    {project.impact}
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-white font-semibold text-sm hover:text-pink-400 transition-colors"
                  >
                    Live Demo <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-[#9d8ba6] font-semibold text-sm hover:text-white transition-colors"
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
