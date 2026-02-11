"use client";

import { motion } from "framer-motion";
import { CheckCircle, Users, Zap, Target, Code, Rocket, Hexagon, Shield } from "lucide-react";

const abilities = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Production-First Mindset",
    description: "I don't just write code that works—I build systems designed for real-world scale, reliability, and maintainability from day one.",
    tier: "ULTIMATE",
    level: 5,
    maxLevel: 5,
    color: "#ff4655",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team-Ready Engineer",
    description: "Experienced in async collaboration, code reviews, and contributing to large codebases with multiple stakeholders. I communicate clearly and ship consistently.",
    tier: "SIGNATURE",
    level: 5,
    maxLevel: 5,
    color: "#00e5ff",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Fast Learner, Deep Diver",
    description: "I rapidly adapt to new technologies while building deep expertise. My open-source work demonstrates ability to understand complex systems quickly.",
    tier: "ABILITY",
    level: 4,
    maxLevel: 5,
    color: "#1fb6ff",
  },
  {
    icon: <Code className="w-5 h-5" />,
    title: "Open Source Track Record",
    description: "Active contributor to Apache Airflow and CNCF OpenTelemetry. I understand enterprise-grade codebases and community-driven development.",
    tier: "WEAPON",
    level: 5,
    maxLevel: 5,
    color: "#ff4655",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "End-to-End Ownership",
    description: "From architecture design to deployment and monitoring—I take full ownership of features and see them through to production.",
    tier: "ABILITY",
    level: 4,
    maxLevel: 5,
    color: "#00e5ff",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Results Over Resume",
    description: "Every project I build solves a real problem. I measure success by impact delivered, not technologies listed.",
    tier: "PASSIVE",
    level: 5,
    maxLevel: 5,
    color: "#1fb6ff",
  }
];

export default function WhyMeOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    },
  };

  return (
    <section id="why-me" className="min-h-screen w-full flex items-center py-20 relative scanlines">
      {/* HUD corner */}
      <div className="absolute top-6 left-6 font-mono-game text-[10px] text-[#53545f]">
        <span className="text-[#ff4655]">03</span> // SKILL TREE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#ff4655]" />
            <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">ABILITY TREE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-tactical text-white mb-4 tracking-wider">
            SKILL <span className="text-[#ff4655]">TREE</span>
          </h2>
          <p className="text-base text-[#8b8d98] max-w-2xl mx-auto">
            Beyond technical skills—here&apos;s what makes me effective in real engineering teams.
          </p>
          <div className="h-[2px] w-32 bg-gradient-to-r from-[#ff4655] to-transparent mx-auto mt-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
        >
          {abilities.map((ability, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -6, 
                borderColor: ability.color + "55",
                transition: { duration: 0.2 }
              }}
              className="group relative bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all overflow-hidden"
            >
              {/* Tier badge */}
              <div className="flex items-center justify-between px-5 py-2 bg-[#0a0a0f]/60 border-b border-[rgba(255,70,85,0.08)]">
                <span className="font-mono-game text-[9px] tracking-[0.2em]" style={{ color: ability.color }}>
                  {ability.tier}
                </span>
                {/* Hexagon indicator */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: ability.maxLevel }).map((_, lvl) => {
                    const filled = lvl < ability.level;
                    return (
                      <div
                        key={lvl}
                        className={filled ? "w-2 h-2 rotate-45" : "w-2 h-2 rotate-45 opacity-20"}
                        style={{ background: filled ? ability.color : "#53545f" }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="p-5 relative z-10">
                {/* Subtle hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at center, " + ability.color + "08 0%, transparent 70%)" }} />
                
                <div className="relative z-10">
                  <div 
                    className="flex items-center justify-center w-10 h-10 mb-4 clip-diagonal transition-all"
                    style={{ 
                      background: ability.color + "15",
                      border: "1px solid " + ability.color + "30",
                      color: ability.color 
                    }}
                  >
                    {ability.icon}
                  </div>
                  
                  <h3 className="text-lg font-tactical text-white mb-2 tracking-wide group-hover:text-[#ff4655] transition-colors">
                    {ability.title}
                  </h3>
                  
                  <p className="text-[#8b8d98] leading-relaxed text-sm">
                    {ability.description}
                  </p>

                  {/* XP Bar */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono-game text-[9px] text-[#53545f]">LVL {ability.level}</span>
                    <div className="flex-1 h-[2px] bg-[#1a1a24] overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: ability.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: ((ability.level / ability.maxLevel) * 100) + "%" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                      />
                    </div>
                    <span className="font-mono-game text-[9px] text-[#53545f]">MAX</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-14"
        >
          <p className="text-[#53545f] text-sm font-mono-game italic">
            // &quot;I ship, I learn, I iterate. Let&apos;s build something impactful together.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
