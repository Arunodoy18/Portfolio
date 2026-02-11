"use client";

import { motion } from "framer-motion";
import { User, Swords, Shield, Trophy, Radio, Target, ChevronRight, Crosshair } from "lucide-react";
import { useGame, GameState } from "../GameShell";

const menuItems: { label: string; subLabel: string; icon: React.ReactNode; state: GameState; color: string; desc: string }[] = [
  {
    label: "PLAYER PROFILE",
    subLabel: "AGENT DOSSIER",
    icon: <User className="w-7 h-7" />,
    state: "PROFILE",
    color: "#ff4655",
    desc: "View agent backstory, training record, and combat traits",
  },
  {
    label: "MISSIONS",
    subLabel: "TACTICAL OPS",
    icon: <Swords className="w-7 h-7" />,
    state: "MISSIONS",
    color: "#00e5ff",
    desc: "Browse deployed operations and mission outcomes",
  },
  {
    label: "SKILL TREE",
    subLabel: "ABILITY MAP",
    icon: <Shield className="w-7 h-7" />,
    state: "SKILLS",
    color: "#1fb6ff",
    desc: "Technical proficiency and engineering capabilities",
  },
  {
    label: "ACHIEVEMENTS",
    subLabel: "TROPHY ROOM",
    icon: <Trophy className="w-7 h-7" />,
    state: "ACHIEVEMENTS",
    color: "#fbbf24",
    desc: "Open source contributions and community impact",
  },
  {
    label: "COMM TERMINAL",
    subLabel: "SECURE CHANNEL",
    icon: <Radio className="w-7 h-7" />,
    state: "COMMS",
    color: "#22c55e",
    desc: "Establish communication for projects and opportunities",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function MainMenu() {
  const { navigate } = useGame();

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#0a0a0f] flex items-center">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(rgba(255,70,85,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,70,85,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* HUD corners */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f]">
        <span className="text-[#ff4655]">00</span> // MAIN MENU
      </div>
      <div className="absolute top-20 right-6 font-mono-game text-[10px] text-[#53545f] text-right">
        <div className="text-[#00e5ff]">AGENT: ARUNODOY</div>
        <div>STATUS: READY</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 clip-diagonal bg-[#ff4655] flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-tactical text-white tracking-wider">
                COMMAND <span className="text-[#ff4655]">CENTER</span>
              </h1>
              <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.2em]">SELECT MODULE TO DEPLOY</p>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-[#ff4655] via-[#ff4655]/20 to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {menuItems.map((item) => (
            <motion.button
              key={item.state}
              variants={itemVariants}
              onClick={() => navigate(item.state)}
              whileHover={{
                y: -6,
                borderColor: item.color + "55",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative text-left p-6 bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all overflow-hidden cursor-pointer"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "radial-gradient(circle at 30% 50%, " + item.color + "08 0%, transparent 70%)" }}
              />

              {/* Top indicator */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div
                  className="w-12 h-12 clip-diagonal flex items-center justify-center transition-all"
                  style={{
                    background: item.color + "15",
                    border: "1px solid " + item.color + "30",
                    color: item.color,
                  }}
                >
                  {item.icon}
                </div>
                <ChevronRight
                  className="w-5 h-5 text-[#53545f] group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>

              {/* Label */}
              <div className="relative z-10">
                <span className="font-mono-game text-[9px] tracking-[0.2em]" style={{ color: item.color }}>
                  {item.subLabel}
                </span>
                <h3 className="text-xl font-tactical text-white tracking-wide mt-1 group-hover:text-[#ff4655] transition-colors">
                  {item.label}
                </h3>
                <p className="text-[#8b8d98] text-sm mt-2 leading-relaxed">{item.desc}</p>
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                style={{ background: item.color }}
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex items-center justify-center gap-2"
        >
          <Crosshair className="w-3.5 h-3.5 text-[#53545f]" />
          <span className="font-mono-game text-[10px] text-[#53545f] tracking-[0.2em]">
            SELECT A MODULE TO BEGIN
          </span>
        </motion.div>
      </div>
    </div>
  );
}
