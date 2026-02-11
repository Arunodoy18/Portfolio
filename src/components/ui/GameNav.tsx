"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crosshair, User, Swords, Trophy, Radio, Shield, ArrowLeft } from "lucide-react";
import { useGame, GameState } from "../GameShell";

interface NavItem {
  label: string;
  state: GameState;
  icon: React.ReactNode;
  gameLabel: string;
}

const navItems: NavItem[] = [
  { label: "Profile", state: "PROFILE", icon: <User className="w-4 h-4" />, gameLabel: "PLAYER PROFILE" },
  { label: "Missions", state: "MISSIONS", icon: <Swords className="w-4 h-4" />, gameLabel: "MISSIONS" },
  { label: "Skills", state: "SKILLS", icon: <Shield className="w-4 h-4" />, gameLabel: "SKILL TREE" },
  { label: "Achievements", state: "ACHIEVEMENTS", icon: <Trophy className="w-4 h-4" />, gameLabel: "ACHIEVEMENTS" },
  { label: "Comms", state: "COMMS", icon: <Radio className="w-4 h-4" />, gameLabel: "COMM TERMINAL" },
];

export default function GameNav() {
  const { state, navigate } = useGame();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#ff4655]/10 shadow-[0_2px_20px_rgba(255,70,85,0.08)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo / Back to Menu */}
            <div className="flex items-center gap-3">
              {state !== "MENU" && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => navigate("MENU")}
                  className="flex items-center gap-1 text-[#8b8d98] hover:text-white transition-colors mr-2 cursor-pointer"
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="font-mono-game text-[10px] tracking-wider hidden sm:inline">MENU</span>
                </motion.button>
              )}
              <motion.button
                onClick={() => navigate("LOBBY")}
                className="flex items-center gap-2 group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 clip-diagonal bg-[#ff4655] flex items-center justify-center">
                  <Crosshair className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-tactical text-sm text-white leading-none tracking-[0.15em]">ARUNODOY</span>
                  <span className="font-mono-game text-[9px] text-[#53545f] leading-none">LVL.99 // RADIANT</span>
                </div>
              </motion.button>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.state}
                  onClick={() => navigate(item.state)}
                  className={"relative flex items-center gap-2 px-3 py-2 text-xs font-tactical tracking-[0.1em] transition-all rounded cursor-pointer " + (
                    state === item.state ? "text-[#ff4655]" : "text-[#8b8d98] hover:text-white"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                  {state === item.state && (
                    <motion.div
                      layoutId="activeHud"
                      className="absolute inset-0 bg-[#ff4655]/10 border border-[#ff4655]/30 rounded -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Status + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden md:block font-mono-game text-[9px] text-[#00e5ff] text-right">
                ● CONNECTED
              </div>
              <motion.button
                className="md:hidden p-2 text-[#8b8d98] hover:text-white focus:outline-none rounded cursor-pointer"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-14 z-[99] md:hidden"
          >
            <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#ff4655]/10 shadow-xl">
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => { navigate("MENU"); setIsMobileOpen(false); }}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-tactical tracking-[0.1em] rounded transition-colors text-[#00e5ff] hover:bg-white/5 w-full text-left cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <span className="block">Main Menu</span>
                    <span className="block text-[9px] font-mono-game text-[#53545f]">COMMAND CENTER</span>
                  </div>
                </motion.button>
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.state}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.06 }}
                    onClick={() => { navigate(item.state); setIsMobileOpen(false); }}
                    className={"flex items-center gap-3 px-4 py-3 text-sm font-tactical tracking-[0.1em] rounded transition-colors w-full text-left cursor-pointer " + (
                      state === item.state
                        ? "text-[#ff4655] bg-[#ff4655]/10 border-l-2 border-[#ff4655]"
                        : "text-[#8b8d98] hover:text-white hover:bg-white/5"
                    )}
                  >
                    {item.icon}
                    <div>
                      <span className="block">{item.label}</span>
                      <span className="block text-[9px] font-mono-game text-[#53545f]">{item.gameLabel}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
