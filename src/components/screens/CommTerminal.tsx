"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Phone, ArrowUpRight, Radio, Wifi, Signal } from "lucide-react";

const contactOptions = [
  {
    label: "Email",
    value: "barun4927@gmail.com",
    href: "mailto:barun4927@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    color: "#ff4655",
    channel: "CH-01",
  },
  {
    label: "LinkedIn",
    value: "arunodoy-banerjee",
    href: "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
    icon: <Linkedin className="w-5 h-5" />,
    color: "#00e5ff",
    channel: "CH-02",
  },
  {
    label: "GitHub",
    value: "@Arunodoy18",
    href: "https://github.com/Arunodoy18",
    icon: <Github className="w-5 h-5" />,
    color: "#e8e6e3",
    channel: "CH-03",
  },
  {
    label: "Phone",
    value: "+91 9864446805",
    href: "tel:+919864446805",
    icon: <Phone className="w-5 h-5" />,
    color: "#22c55e",
    channel: "CH-04",
  },
];

function TerminalText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return (
    <span>
      {displayed}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export default function CommTerminal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0f] pt-20 pb-12 flex items-center justify-center relative">
      {/* HUD corner */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f] z-20">
        <span className="text-[#ff4655]">05</span> // COMM TERMINAL
      </div>

      {/* Radar background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <div className="relative w-[600px] h-[600px]">
          {[1, 0.75, 0.5, 0.25].map((scale, i) => (
            <div
              key={i}
              className="absolute inset-0 border border-[#00e5ff] rounded-full"
              style={{ transform: "scale(" + scale + ")" }}
            />
          ))}
          <div className="absolute inset-0 animate-radar">
            <div className="absolute top-1/2 left-1/2 w-1/2 h-[1px] bg-gradient-to-r from-[#00e5ff] to-transparent origin-left" />
          </div>
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00e5ff]" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#00e5ff]" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <Radio className="w-5 h-5 text-[#00e5ff] animate-pulse" />
              <span className="font-mono-game text-[10px] text-[#00e5ff] tracking-[0.3em]">COMMUNICATION TERMINAL</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-tactical text-white mb-4 tracking-wider">
              TRANSMIT <br />
              <span className="text-[#ff4655]">MESSAGE</span>
            </h2>

            <p className="text-base md:text-lg text-[#8b8d98] mb-12 max-w-2xl mx-auto">
              Looking for <span className="text-white font-medium">high-impact</span> projects and
              <span className="text-white font-medium ml-1">meaningful</span> collaborations.
            </p>

            {/* Terminal window */}
            <div className="mx-auto max-w-xl mb-8">
              <div className="bg-[#0a0a0f] border border-[rgba(0,229,255,0.15)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2 bg-[#111118] border-b border-[rgba(0,229,255,0.1)]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#ff4655]" />
                    <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
                    <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  </div>
                  <span className="font-mono-game text-[9px] text-[#53545f]">SECURE_CHANNEL://ARUNODOY</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-3 h-3 text-[#00e5ff]" />
                    <Wifi className="w-3 h-3 text-green-400" />
                  </div>
                </div>
                <div className="p-4 text-left font-mono-game text-xs text-[#8b8d98] space-y-1">
                  <div>
                    <span className="text-[#00e5ff]">&gt;</span> <TerminalText text="Establishing secure connection..." delay={300} />
                  </div>
                  <div>
                    <span className="text-green-400">&gt;</span> <TerminalText text="Connection established. Agent online." delay={1800} />
                  </div>
                  <div>
                    <span className="text-[#ff4655]">&gt;</span> <TerminalText text="Select communication channel below." delay={3200} />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="group relative px-10 py-4 clip-diagonal overflow-hidden font-tactical text-lg tracking-[0.15em] cursor-pointer"
                style={{
                  background: isOpen ? "#111118" : "#ff4655",
                  border: isOpen ? "1px solid rgba(255,70,85,0.3)" : "none",
                  color: isOpen ? "#ff4655" : "white",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Radio className={"w-5 h-5 transition-transform " + (isOpen ? "rotate-90" : "")} />
                  {isOpen ? "CLOSE CHANNELS" : "OPEN CHANNELS"}
                </span>
              </motion.button>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-items-center w-full max-w-3xl">
                <AnimatePresence>
                  {isOpen &&
                    contactOptions.map((option, i) => (
                      <motion.a
                        key={option.label}
                        href={option.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.1,
                          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                        }}
                        whileHover={{ y: -4, scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className="group w-full p-5 bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md hover:border-[rgba(255,70,85,0.25)] transition-all flex flex-col items-center justify-center gap-3"
                      >
                        <span className="font-mono-game text-[8px] tracking-[0.2em]" style={{ color: option.color + "80" }}>
                          {option.channel}
                        </span>
                        <div
                          className="p-3 clip-diagonal transition-shadow"
                          style={{
                            background: option.color + "15",
                            border: "1px solid " + option.color + "25",
                            color: option.color,
                          }}
                        >
                          {option.icon}
                        </div>
                        <div className="text-center">
                          <span className="block text-white font-tactical text-sm tracking-[0.15em] mb-0.5">{option.label}</span>
                          <span className="text-[#53545f] text-[10px] font-mono-game truncate max-w-[140px] block">{option.value}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#53545f] group-hover:text-[#ff4655] transition-colors" />
                      </motion.a>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 pt-8 border-t border-[rgba(255,70,85,0.08)]"
          >
            <p className="text-[#53545f] text-xs font-mono-game tracking-wide">
              // DESIGNED &amp; ENGINEERED BY ARUNODOY BANERJEE // ALL RIGHTS RESERVED
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
