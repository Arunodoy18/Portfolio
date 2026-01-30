"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowDown, ChevronDown } from "lucide-react";
import { useScroll } from "@react-three/drei";

export default function HeroOverlay() {
  const scroll = useScroll();

  const handleNavigate = (section: string) => {
    console.log('Navigate called:', section, 'scroll.el:', scroll.el);
    
    // Try drei scroll first
    if (scroll.el) {
      const positions: Record<string, number> = {
        about: 1 / 8,
        projects: 3 / 8,
      };
      const position = positions[section];
      if (position !== undefined) {
        console.log('Using drei scroll to:', scroll.el.scrollHeight * position);
        scroll.el.scrollTo({ top: scroll.el.scrollHeight * position, behavior: 'smooth' });
        return;
      }
    }
    
    // Fallback: find scroll container manually
    const container = document.querySelector('[data-scroll-container]') as HTMLElement;
    if (container) {
      const positions: Record<string, number> = {
        about: 1 / 8,
        projects: 3 / 8,
      };
      const position = positions[section];
      if (position !== undefined) {
        console.log('Using fallback scroll to:', container.scrollHeight * position);
        container.scrollTo({ top: container.scrollHeight * position, behavior: 'smooth' });
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }
    },
  };

  return (
    <section className="h-screen w-full flex items-center justify-center relative">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Name - Primary focus */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-6 text-white"
          >
            Arunodoy Banerjee
          </motion.h1>

          {/* Identity line - Clear and confident */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-[#9d8ba6] mb-4 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Software Engineer
          </motion.p>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-[#6b5a75] mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Building <span className="text-pink-400 font-medium">production-ready systems</span> with precision.
            <br className="hidden sm:block" />
            <span className="text-violet-400">Open source</span> contributor. <span className="text-pink-300">Systems thinker</span>.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="primary" 
              className="group px-10 py-5 text-lg"
              onClick={() => handleNavigate('projects')}
            >
              View My Work
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button 
              variant="secondary" 
              className="group px-8 py-5 text-lg"
              onClick={() => handleNavigate('about')}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex justify-center w-full"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-[#6b5a75] cursor-pointer hover:text-pink-400 transition-colors"
          onClick={() => handleNavigate('about')}
        >
          <span className="text-xs font-medium tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
