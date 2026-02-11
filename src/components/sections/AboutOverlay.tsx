"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Rocket, Users, Shield, Target } from "lucide-react";

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
    <section id="about" className="h-screen w-full flex items-center justify-end relative scanlines">
      {/* HUD corner marker */}
      <div className="absolute top-6 left-6 font-mono-game text-[10px] text-[#53545f]">
        <span className="text-[#ff4655]">01</span> // PLAYER PROFILE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl ml-auto"
        >
          {/* Section header - Game style */}
          <motion.div variants={itemVariants} className="text-right mb-10">
            <div className="flex items-center justify-end gap-2 mb-3">
              <div className="h-[1px] w-12 bg-[#ff4655]" />
              <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">AGENT DOSSIER</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-tactical text-white mb-4 tracking-wider">
              PLAYER <span className="text-[#ff4655]">PROFILE</span>
            </h2>
          </motion.div>

          {/* Agent Backstory */}
          <motion.div variants={itemVariants} className="text-right mb-8 p-6 bg-[#111118]/80 border border-[rgba(255,70,85,0.1)] backdrop-blur-md hud-border">
            <p className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.2em] mb-3">AGENT BACKSTORY</p>
            <p className="text-base text-[#8b8d98] leading-relaxed">
              I am a <span className="text-white font-semibold">Builder</span> and 
              <span className="gradient-text font-bold ml-1"> Open Source</span> contributor 
              dedicated to crafting <span className="text-[#00e5ff] font-medium">Production-Ready Systems</span>.
            </p>
          </motion.div>

          {/* Training Record */}
          <motion.div variants={itemVariants} className="text-right mb-8 p-5 bg-[#111118]/60 border border-[rgba(0,229,255,0.1)] backdrop-blur-md">
            <p className="font-mono-game text-[10px] text-[#00e5ff] tracking-[0.2em] mb-3">TRAINING RECORD</p>
            <p className="text-sm text-[#8b8d98] leading-relaxed">
              Currently <span className="text-green-400 font-tactical text-xs tracking-[0.15em] border-b border-green-400/30 pb-0.5">OPEN TO DEPLOY</span>. 
              I specialize in building real-world, scalable products end-to-end, from high-performance backends to fluid 3D interfaces. 
              Actively seeking <span className="text-white font-medium">Internships</span>, 
              <span className="text-white font-medium ml-1">Freelance</span>, and 
              <span className="text-white font-medium ml-1">Full-time</span> roles where I can solve complex architectural challenges.
            </p>
          </motion.div>

          {/* Agent Traits / Stats Grid */}
          <motion.div variants={itemVariants}>
            <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.2em] mb-3 text-right">AGENT TRAITS</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Users className="w-4 h-4" />, label: "SPECIALTY", value: "Open Source", stat: 95 },
                { icon: <Code2 className="w-4 h-4" />, label: "WEAPON", value: "Problem Solving", stat: 92 },
                { icon: <Cpu className="w-4 h-4" />, label: "CLASS", value: "Backend Dev", stat: 88 },
                { icon: <Rocket className="w-4 h-4" />, label: "ABILITY", value: "3D Creator", stat: 90 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4, borderColor: "rgba(255,70,85,0.3)" }}
                  className="p-4 clip-diagonal bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all text-right group"
                >
                  <div className="flex justify-end text-[#ff4655] mb-2 group-hover:text-[#00e5ff] transition-colors">{stat.icon}</div>
                  <h3 className="text-white font-tactical text-lg tracking-wide mb-0.5">{stat.value}</h3>
                  <p className="font-mono-game text-[9px] text-[#53545f] tracking-[0.2em] mb-2">{stat.label}</p>
                  {/* Stat bar */}
                  <div className="h-[2px] w-full bg-[#1a1a24] overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-[#ff4655] to-[#00e5ff]"
                      initial={{ width: 0 }}
                      whileInView={{ width: stat.stat + "%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
