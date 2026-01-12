"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { Code2, Cpu, Rocket, Users } from "lucide-react";

export default function AboutOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <section className="h-screen w-full flex items-center justify-end">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl ml-auto"
        >
          <motion.div variants={itemVariants} className="text-right mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              The Engineering <span className="text-blue-500 italic">Core</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light">
              I am a <span className="text-white font-semibold">Builder</span> and 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-bold ml-1">Open Source</span> contributor 
              dedicated to crafting <span className="text-blue-400 font-medium underline decoration-blue-500/30 underline-offset-8">Production-Ready Systems</span>.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-right mb-12">
            <p className="text-lg text-slate-500 leading-relaxed">
              Currently <span className="text-green-400 font-bold uppercase tracking-widest text-sm border-b border-green-400/30 pb-1">Open to Work</span>. 
              I specialize in building real-world, scalable products end-to-end, from high-performance backends to fluid 3D interfaces. 
              Actively seeking <span className="text-white font-medium">Internships</span>, 
              <span className="text-white font-medium ml-1">Freelance</span>, and 
              <span className="text-white font-medium ml-1">Full-time</span> roles where I can solve complex architectural challenges.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            {[
              { icon: <Cpu className="w-5 h-5" />, label: "Systems Architecture", value: "Distributed" },
              { icon: <Users className="w-5 h-5" />, label: "Community Impact", value: "50+ PRs" },
              { icon: <Code2 className="w-5 h-5" />, label: "Core Competency", value: "Java / TS" },
              { icon: <Rocket className="w-5 h-5" />, label: "Focus", value: "Scalability" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: "rgba(255,255,255,0.2)" }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-colors text-right"
              >
                <div className="flex justify-end text-blue-500 mb-3">{stat.icon}</div>
                <h3 className="text-white font-bold text-xl mb-1">{stat.value}</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
