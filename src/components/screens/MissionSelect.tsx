"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Crosshair, Target, Zap, ChevronRight, FileText } from "lucide-react";

const missions = [
  {
    title: "Smart Waste Management AI",
    codeName: "OPERATION WASTIFI",
    tech: "React / Python / AI / IoT",
    difficulty: "HARD",
    objective: "Manual waste sorting is inefficient and error-prone at scale.",
    briefing: "Production-grade waste classification system using computer vision. Real-time monitoring with scalable backend architecture handling 10K+ classifications/day.",
    result: "Reduced misclassification by 85% in pilot deployment.",
    status: "COMPLETED",
    live: "https://wastifi.netlify.app/",
    github: "https://github.com/Arunodoy18",
  },
  {
    title: "Code Review Platform",
    codeName: "OPERATION CODEX",
    tech: "Next.js / Node.js / PostgreSQL",
    difficulty: "EXPERT",
    objective: "Open-source teams struggle with consistent, efficient code review workflows.",
    briefing: "High-performance platform for contributors. Automated review workflows with intelligent suggestions and seamless integration for open-source teams.",
    result: "Streamlined review process for 50+ contributors.",
    status: "COMPLETED",
    live: "https://yours-code-assitant.netlify.app/login",
    github: "https://github.com/Arunodoy18",
  },
  {
    title: "Nakung AI Assistant",
    codeName: "OPERATION NAKUNG",
    tech: "AI / NLP / VS Code Extension",
    difficulty: "EXPERT",
    objective: "Developers need an intelligent coding assistant integrated directly into their workflow.",
    briefing: "AI-powered VS Code extension that acts as your personal coding companion. Context-aware code suggestions, intelligent debugging assistance, and seamless developer experience built from the ground up.",
    result: "Published extension enhancing developer productivity.",
    status: "ACTIVE",
    live: "",
    github: "https://github.com/Arunodoy18/Nakung",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function MissionSelect() {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0f] pt-20 pb-12">
      {/* HUD corner */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f] z-20">
        <span className="text-[#ff4655]">02</span> // MISSION SELECT
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-[#ff4655]" />
            <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">TACTICAL OPERATIONS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-tactical text-white mb-4 tracking-wider">
            MISSION <span className="text-[#ff4655]">SELECT</span>
          </h2>
          <p className="text-[#8b8d98] text-base font-mono-game">Real deployments. Real impact at scale.</p>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[2px] w-32 bg-gradient-to-r from-[#ff4655] to-transparent" />
            <a
              href="/ARUNODOY.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 clip-diagonal bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-xs font-tactical tracking-[0.1em] hover:bg-[#00e5ff]/20 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> VIEW RESUME
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {missions.map((mission, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, borderColor: "rgba(255,70,85,0.4)" }}
              className="group relative bg-[#111118]/80 border border-[rgba(255,70,85,0.1)] backdrop-blur-md transition-all overflow-hidden"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-3 bg-[#0a0a0f]/60 border-b border-[rgba(255,70,85,0.1)]">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-3.5 h-3.5 text-[#ff4655]" />
                  <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.2em]">{mission.codeName}</span>
                </div>
                <span className={"font-mono-game text-[9px] px-2 py-0.5 tracking-wider " + (
                  mission.difficulty === "EXPERT"
                    ? "bg-[#ff4655]/10 text-[#ff4655] border border-[#ff4655]/20"
                    : "bg-[#00e5ff]/10 text-[#00e5ff] border border-[#00e5ff]/20"
                )}>{mission.difficulty}</span>
              </div>

              <div className="p-6 relative z-10">
                {/* Tech */}
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-3 h-3 text-[#00e5ff]" />
                  <span className="font-mono-game text-[10px] text-[#00e5ff] tracking-wide">WEAPONS: {mission.tech}</span>
                </div>

                {/* Mission Name */}
                <h3 className="text-2xl md:text-3xl font-tactical text-white mb-4 tracking-wide group-hover:text-[#ff4655] transition-colors">
                  {mission.title}
                </h3>

                {/* Objective */}
                <div className="mb-4">
                  <p className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.15em] mb-1">MISSION OBJECTIVE</p>
                  <p className="text-[#8b8d98] text-sm">{mission.objective}</p>
                </div>

                {/* Briefing */}
                <div className="mb-4">
                  <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.15em] mb-1">MISSION BRIEF</p>
                  <p className="text-[#8b8d98] text-sm leading-relaxed">{mission.briefing}</p>
                </div>

                {/* Result */}
                <div className="mb-6 p-3 bg-green-500/5 border border-green-500/15 clip-diagonal">
                  <p className="text-green-400 text-sm font-mono-game flex items-center gap-2">
                    <span className="text-[9px] tracking-[0.2em]">RESULT:</span> {mission.result}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6">
                  {mission.live && (
                    <a
                      href={mission.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 clip-diagonal bg-[#ff4655]/10 border border-[#ff4655]/20 text-[#ff4655] text-xs font-tactical tracking-[0.1em] hover:bg-[#ff4655]/20 transition-colors"
                    >
                      LAUNCH MISSION <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={mission.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#8b8d98] text-xs font-mono-game hover:text-white transition-colors"
                  >
                    SOURCE <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Status badge */}
              <div className="absolute top-16 right-4 font-mono-game text-[9px] text-green-400 tracking-[0.2em] opacity-30 group-hover:opacity-60 transition-opacity">
                {mission.status}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
