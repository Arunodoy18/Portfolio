"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroOverlay() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="h-screen w-full flex items-center">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Welcome to Arunodoy's Space</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl md:text-9xl font-bold tracking-tight mb-8 leading-[0.95] text-white"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Future Systems
            </span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-light"
          >
            Building <span className="text-white font-medium italic">production-ready</span> systems with 
            mathematical precision and a focus on high-performance distributed architectures.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            <a href="#projects" className="inline-block">
              <Button variant="primary" className="group">
                Explore Universe
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="#about" className="inline-block">
              <Button variant="outline">
                Technical Specs
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
