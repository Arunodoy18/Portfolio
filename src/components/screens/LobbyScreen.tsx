"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Crosshair, Zap, Palette, Sparkles, ChevronRight } from "lucide-react";
import { HeroAgent } from "../three/HeroAgent";
import { Lights } from "../three/Lights";
import { Environment } from "../three/Environment";
import { useGame } from "../GameShell";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1, staggerChildren: 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function LobbyScreen() {
  const { navigate } = useGame();

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <color attach="background" args={["#0a0a0f"]} />
          <fog attach="fog" args={["#0a0a0f", 5, 30]} />
          <Suspense fallback={null}>
            <Lights />
            <Environment />
            <group position={[2.5, -0.5, 0]}>
              <HeroAgent />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* HUD Corner Elements */}
      <div className="absolute top-6 left-6 z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-mono-game text-[10px] text-[#53545f] space-y-1"
        >
          <div>SYS://PORTFOLIO_v2.6</div>
          <div className="text-[#00e5ff]">STATUS: ONLINE</div>
          <div>PING: 12ms</div>
        </motion.div>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-mono-game text-[10px] text-right text-[#53545f] space-y-1"
        >
          <div>AGENT SELECT</div>
          <div className="text-[#ff4655]">RANK: RADIANT</div>
          <div>REGION: IN-1</div>
        </motion.div>
      </div>

      {/* Main Agent Select Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            {/* LEFT: Agent Info Panel */}
            <div className="flex-1 max-w-xl order-2 lg:order-1">
              {/* Agent class tag */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
                <div className="w-8 h-[2px] bg-[#ff4655]" />
                <span className="font-mono-game text-xs text-[#ff4655] tracking-[0.3em] uppercase animate-flicker">
                  Agent Selected
                </span>
              </motion.div>

              {/* Agent Name */}
              <motion.h1
                variants={itemVariants}
                className="text-5xl sm:text-6xl md:text-8xl font-tactical text-white mb-2 leading-none tracking-wider"
              >
                ARUNODOY
              </motion.h1>

              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#ff4655] to-transparent" />
                <span className="font-mono-game text-sm text-[#8b8d98]">BANERJEE</span>
              </motion.div>

              {/* Role & Class */}
              <motion.div variants={itemVariants} className="mb-8 space-y-2">
                <div className="flex items-center gap-4">
                  <span className="font-mono-game text-xs text-[#53545f] w-16">ROLE</span>
                  <span className="font-tactical text-lg text-[#00e5ff]">FULL STACK DEVELOPER</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono-game text-xs text-[#53545f] w-16">CLASS</span>
                  <span className="font-tactical text-lg text-[#e8e6e3]">OPEN SOURCE CONTRIBUTOR</span>
                </div>
              </motion.div>

              {/* Agent Bio */}
              <motion.p variants={itemVariants} className="text-base text-[#8b8d98] mb-6 leading-relaxed">
                Building <span className="text-[#ff4655] font-semibold">production-ready systems</span> with precision.
                <br />
                <span className="text-[#00e5ff]">Open source</span> contributor. <span className="text-[#e8e6e3]">Systems thinker</span>.
              </motion.p>

              {/* Special Abilities */}
              <motion.div variants={itemVariants} className="mb-8">
                <p className="font-mono-game text-xs text-[#53545f] mb-3 tracking-[0.2em]">SPECIAL ABILITIES</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <Sparkles className="w-3.5 h-3.5" />, label: "FRONTEND ENGINEERING" },
                    { icon: <Zap className="w-3.5 h-3.5" />, label: "BACKEND SYSTEMS" },
                    { icon: <Palette className="w-3.5 h-3.5" />, label: "3D WEB" },
                  ].map((ability) => (
                    <div key={ability.label} className="flex items-center gap-2 px-3 py-1.5 clip-diagonal bg-[#111118] border border-[rgba(0,229,255,0.2)] text-[#00e5ff] text-xs font-mono-game">
                      {ability.icon}
                      {ability.label}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Status bar */}
              <motion.div variants={itemVariants} className="mb-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono-game text-[#53545f]">OPEN FOR</span>
                  <span className="text-[10px] font-mono-game text-green-400 animate-pulse">GSoC 2026 &amp; SUMMER INTERNSHIPS</span>
                </div>
                <div className="h-1 w-full bg-[#111118] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#ff4655] to-[#00e5ff]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* ENTER ARENA CTA */}
              <motion.div variants={itemVariants}>
                <motion.button
                  onClick={() => navigate("MENU")}
                  className="group relative px-10 py-4 clip-diagonal bg-[#ff4655] text-white font-tactical text-lg tracking-[0.15em] overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="relative z-10 flex items-center gap-3">
                    <Crosshair className="w-5 h-5" />
                    ENTER ARENA
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT: 3D Character space (character rendered in Canvas behind) */}
            <div className="flex-1 max-w-lg order-1 lg:order-2 relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute -right-4 top-1/4 space-y-3 z-10 hidden lg:block"
              >
                {[
                  { label: "PWR", value: 95, color: "#ff4655" },
                  { label: "SPD", value: 88, color: "#00e5ff" },
                  { label: "INT", value: 97, color: "#1fb6ff" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-2">
                    <span className="font-mono-game text-[10px] text-[#53545f] w-8">{stat.label}</span>
                    <div className="w-20 h-1 bg-[#111118] overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: stat.color }}
                        initial={{ width: 0 }}
                        animate={{ width: stat.value + "%" }}
                        transition={{ delay: 2, duration: 1, ease: "easeOut" }}
                      />
                    </div>
                    <span className="font-mono-game text-[10px] text-[#8b8d98]">{stat.value}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-6 left-0 right-0 flex justify-between items-end px-8 z-10"
      >
        <div className="font-mono-game text-[10px] text-[#53545f] hidden sm:block">
          <div>MAP: PORTFOLIO_ARENA</div>
          <div>MODE: COMPETITIVE</div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-[#53545f] cursor-pointer hover:text-[#ff4655] transition-colors"
          onClick={() => navigate("MENU")}
        >
          <span className="text-[10px] font-mono-game tracking-[0.3em] uppercase mb-2">ENTER GAME</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </motion.div>

        <div className="font-mono-game text-[10px] text-[#53545f] text-right hidden sm:block">
          <div>FPS: 144</div>
          <div>ROUND: 1/&infin;</div>
        </div>
      </motion.div>
    </div>
  );
}
