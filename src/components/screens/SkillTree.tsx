"use client";

import { motion } from "framer-motion";
import { Shield, Target, Users, Zap, Code, Rocket, CheckCircle } from "lucide-react";

/* ── STABLE SKILL TREE ──
   Clean, structured layout. No random floating animations.
   Fixed nodes, professional layout, minimal animations. */

const technicalSkills = {
  backend: [
    { name: "Java", level: 90 },
    { name: "Spring Boot", level: 85 },
    { name: "Python", level: 88 },
    { name: "FastAPI", level: 82 },
    { name: "MongoDB", level: 80 },
    { name: "PostgreSQL", level: 85 },
  ],
  frontend: [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 88 },
    { name: "React / Next.js", level: 92 },
    { name: "Three.js / R3F", level: 78 },
    { name: "HTML / CSS", level: 95 },
    { name: "Tailwind CSS", level: 90 },
  ],
};

const abilities = [
  {
    icon: <Target className="w-5 h-5" />,
    title: "Production-First Mindset",
    description: "I don't just write code that works\u2014I build systems designed for real-world scale, reliability, and maintainability from day one.",
    tier: "ULTIMATE",
    level: 5,
    maxLevel: 5,
    color: "#ff4655",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Team-Ready Engineer",
    description: "Experienced in async collaboration, code reviews, and contributing to large codebases with multiple stakeholders.",
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
    description: "Active contributor to Apache Airflow and CNCF OpenTelemetry. Enterprise-grade codebases and community-driven development.",
    tier: "WEAPON",
    level: 5,
    maxLevel: 5,
    color: "#ff4655",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "End-to-End Ownership",
    description: "From architecture design to deployment and monitoring\u2014I take full ownership of features and see them through to production.",
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
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

function SkillBar({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-3">
      <span className="font-mono-game text-[11px] text-[#8b8d98] w-32 shrink-0">{name}</span>
      <div className="flex-1 h-[6px] bg-[#1a1a24] overflow-hidden relative">
        <motion.div
          className="h-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: level + "%" }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="font-mono-game text-[10px] text-[#53545f] w-8 text-right">{level}</span>
    </motion.div>
  );
}

export default function SkillTree() {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0f] pt-20 pb-12">
      {/* HUD corner */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f] z-20">
        <span className="text-[#ff4655]">03</span> // SKILL TREE
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#ff4655]" />
            <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">ABILITY TREE</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-tactical text-white mb-2 tracking-wider">
            SKILL <span className="text-[#ff4655]">TREE</span>
          </h2>
          <p className="text-base text-[#8b8d98] max-w-2xl">
            Technical proficiency and engineering capabilities.
          </p>
          <div className="h-[2px] w-32 bg-gradient-to-r from-[#ff4655] to-transparent mt-4" />
        </motion.div>

        {/* Technical Skills - Structured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Backend */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 bg-[#111118]/80 border border-[rgba(255,70,85,0.1)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 bg-[#ff4655]" />
              <span className="font-tactical text-sm text-white tracking-[0.15em]">BACKEND ARSENAL</span>
            </div>
            <div className="space-y-3">
              {technicalSkills.backend.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.2 + i * 0.08} color="#ff4655" />
              ))}
            </div>
          </motion.div>

          {/* Frontend */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 bg-[#111118]/80 border border-[rgba(0,229,255,0.1)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 bg-[#00e5ff]" />
              <span className="font-tactical text-sm text-white tracking-[0.15em]">FRONTEND ARSENAL</span>
            </div>
            <div className="space-y-3">
              {technicalSkills.frontend.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={0.3 + i * 0.08} color="#00e5ff" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Core Abilities */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-3 h-3 bg-[#1fb6ff]" />
            <span className="font-tactical text-sm text-white tracking-[0.15em]">CORE ABILITIES</span>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {abilities.map((ability, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{
                y: -4,
                borderColor: ability.color + "55",
                transition: { duration: 0.2 },
              }}
              className="group relative bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all overflow-hidden"
            >
              {/* Tier badge */}
              <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0f]/60 border-b border-[rgba(255,70,85,0.08)]">
                <span className="font-mono-game text-[9px] tracking-[0.2em]" style={{ color: ability.color }}>
                  {ability.tier}
                </span>
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

              <div className="p-4 relative z-10">
                <div
                  className="flex items-center justify-center w-9 h-9 mb-3 clip-diagonal transition-all"
                  style={{
                    background: ability.color + "15",
                    border: "1px solid " + ability.color + "30",
                    color: ability.color,
                  }}
                >
                  {ability.icon}
                </div>

                <h3 className="text-base font-tactical text-white mb-1.5 tracking-wide group-hover:text-[#ff4655] transition-colors">
                  {ability.title}
                </h3>

                <p className="text-[#8b8d98] text-sm leading-relaxed">{ability.description}</p>

                {/* XP Bar */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="font-mono-game text-[9px] text-[#53545f]">LVL {ability.level}</span>
                  <div className="flex-1 h-[2px] bg-[#1a1a24] overflow-hidden">
                    <motion.div
                      className="h-full"
                      style={{ background: ability.color }}
                      initial={{ width: 0 }}
                      animate={{ width: ((ability.level / ability.maxLevel) * 100) + "%" }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.8 }}
                    />
                  </div>
                  <span className="font-mono-game text-[9px] text-[#53545f]">MAX</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <p className="text-[#53545f] text-sm font-mono-game italic">
            // &quot;I ship, I learn, I iterate. Let&apos;s build something impactful together.&quot;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
