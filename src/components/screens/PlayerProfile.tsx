"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Rocket, Users, GitBranch, Award, Star } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const traits = [
  { icon: <Users className="w-4 h-4" />, label: "SPECIALTY", value: "Open Source", stat: 95 },
  { icon: <Code2 className="w-4 h-4" />, label: "WEAPON", value: "Problem Solving", stat: 92 },
  { icon: <Cpu className="w-4 h-4" />, label: "CLASS", value: "Full Stack Dev", stat: 88 },
  { icon: <Rocket className="w-4 h-4" />, label: "ABILITY", value: "3D Creator", stat: 90 },
];

const badges = [
  { icon: <GitBranch className="w-4 h-4" />, label: "Apache Airflow Contributor", color: "#fbbf24" },
  { icon: <Award className="w-4 h-4" />, label: "CNCF OpenTelemetry Contributor", color: "#00e5ff" },
  { icon: <Star className="w-4 h-4" />, label: "Apache TOC Maintainer", color: "#ff4655" },
];

export default function PlayerProfile() {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0f] pt-20 pb-12">
      {/* HUD corner */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f] z-20">
        <span className="text-[#ff4655]">01</span> // PLAYER PROFILE
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-[1px] w-12 bg-[#ff4655]" />
              <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">AGENT DOSSIER</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-tactical text-white mb-2 tracking-wider">
              PLAYER <span className="text-[#ff4655]">PROFILE</span>
            </h2>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#ff4655]/40 to-transparent mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Agent Backstory */}
              <motion.div variants={itemVariants} className="p-6 bg-[#111118]/80 border border-[rgba(255,70,85,0.1)] backdrop-blur-md hud-border">
                <p className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.2em] mb-3">AGENT BACKSTORY</p>
                <p className="text-base text-[#8b8d98] leading-relaxed">
                  I am a <span className="text-white font-semibold">Builder</span> and
                  <span className="gradient-text font-bold ml-1"> Open Source</span> contributor
                  dedicated to crafting <span className="text-[#00e5ff] font-medium">Production-Ready Systems</span>.
                </p>
              </motion.div>

              {/* Training Record */}
              <motion.div variants={itemVariants} className="p-5 bg-[#111118]/60 border border-[rgba(0,229,255,0.1)] backdrop-blur-md">
                <p className="font-mono-game text-[10px] text-[#00e5ff] tracking-[0.2em] mb-3">TRAINING RECORD</p>
                <p className="text-sm text-[#8b8d98] leading-relaxed">
                  Currently <span className="text-green-400 font-tactical text-xs tracking-[0.15em] border-b border-green-400/30 pb-0.5">OPEN TO DEPLOY</span>.
                  I specialize in building real-world, scalable products end-to-end, from high-performance backends to fluid 3D interfaces.
                  Actively seeking <span className="text-white font-medium">Internships</span>,
                  <span className="text-white font-medium ml-1">Freelance</span>, and
                  <span className="text-white font-medium ml-1">Full-time</span> roles where I can solve complex architectural challenges.
                </p>
              </motion.div>

              {/* Contribution Badges */}
              <motion.div variants={itemVariants}>
                <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.2em] mb-3">CONTRIBUTION BADGES</p>
                <div className="space-y-2">
                  {badges.map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-[#111118]/60 border border-[rgba(255,70,85,0.06)]">
                      <div
                        className="w-8 h-8 clip-diagonal flex items-center justify-center"
                        style={{ background: badge.color + "15", border: "1px solid " + badge.color + "30", color: badge.color }}
                      >
                        {badge.icon}
                      </div>
                      <span className="text-sm text-[#e8e6e3] font-tactical tracking-wide">{badge.label}</span>
                      <div className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{ background: badge.color }} />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Agent Traits */}
            <div>
              <motion.div variants={itemVariants}>
                <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.2em] mb-3">AGENT TRAITS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {traits.map((stat, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{ y: -4, borderColor: "rgba(255,70,85,0.3)" }}
                      className="p-4 clip-diagonal bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="text-[#ff4655] group-hover:text-[#00e5ff] transition-colors">{stat.icon}</div>
                        <span className="font-mono-game text-[9px] text-[#53545f] tracking-[0.2em]">{stat.label}</span>
                      </div>
                      <h3 className="text-white font-tactical text-lg tracking-wide mb-2">{stat.value}</h3>
                      <div className="h-[2px] w-full bg-[#1a1a24] overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#ff4655] to-[#00e5ff]"
                          initial={{ width: 0 }}
                          animate={{ width: stat.stat + "%" }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="font-mono-game text-[9px] text-[#53545f] mt-1 block">{stat.stat}/100</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Agent Stats Summary */}
              <motion.div variants={itemVariants} className="mt-6 p-5 bg-[#111118]/60 border border-[rgba(0,229,255,0.08)]">
                <p className="font-mono-game text-[10px] text-[#00e5ff] tracking-[0.2em] mb-4">AGENT CLASSIFICATION</p>
                <div className="space-y-3">
                  {[
                    { label: "ROLE", value: "FULL STACK DEVELOPER" },
                    { label: "PRIMARY", value: "BACKEND SYSTEMS" },
                    { label: "SECONDARY", value: "FRONTEND & 3D WEB" },
                    { label: "STATUS", value: "ACTIVE // OPEN TO DEPLOY", highlight: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-4">
                      <span className="font-mono-game text-[10px] text-[#53545f] w-20">{row.label}</span>
                      <span className={"font-tactical text-sm tracking-wide " + (row.highlight ? "text-green-400" : "text-[#e8e6e3]")}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
