"use client";

import { motion } from "framer-motion";
import { GitBranch, GitMerge, GitPullRequest, Trophy, Medal, Star, Award } from "lucide-react";

const achievements = [
  {
    name: "Apache Airflow",
    role: "Contributor",
    link: "https://github.com/apache/airflow",
    icon: <GitBranch className="w-5 h-5" />,
    badge: <Medal className="w-6 h-6" />,
    tier: "GOLD",
    tierColor: "#fbbf24",
  },
  {
    name: "CNCF \u2013 OpenTelemetry",
    role: "Contributor",
    link: "https://github.com/open-telemetry/opentelemetry-collector",
    icon: <GitMerge className="w-5 h-5" />,
    badge: <Award className="w-6 h-6" />,
    tier: "PLATINUM",
    tierColor: "#00e5ff",
  },
  {
    name: "Apache TOC",
    role: "Contributor and Maintainer",
    link: null,
    icon: <GitPullRequest className="w-5 h-5" />,
    badge: <Star className="w-6 h-6" />,
    tier: "DIAMOND",
    tierColor: "#ff4655",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Achievements() {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-[#0a0a0f] pt-20 pb-12">
      {/* HUD corner */}
      <div className="absolute top-20 left-6 font-mono-game text-[10px] text-[#53545f] z-20">
        <span className="text-[#ff4655]">04</span> // ACHIEVEMENTS
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-[#ff4655]" />
              <span className="font-mono-game text-[10px] text-[#ff4655] tracking-[0.3em]">TROPHY ROOM</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-tactical text-white mb-4 tracking-wider">
              ACHIEVEMENTS <span className="text-[#00e5ff]">UNLOCKED</span>
            </h2>
            <p className="text-base text-[#8b8d98] leading-relaxed max-w-2xl">
              Deeply committed to the <span className="text-white font-medium">Open Source</span> philosophy.
              My contributions focus on <span className="text-[#ff4655]">system-level optimizations</span> and
              building tools that empower developers worldwide.
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-[#ff4655]/40 to-transparent mt-6" />
          </motion.div>

          {/* Achievement Cards */}
          <div className="space-y-4">
            {achievements.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: 8, borderColor: item.tierColor + "55" }}
                className="flex items-center justify-between p-5 bg-[#111118]/80 border border-[rgba(255,70,85,0.08)] backdrop-blur-md transition-all group overflow-hidden relative"
              >
                {/* Trophy badge */}
                <div className="flex items-center gap-3 z-10">
                  <div
                    className="w-12 h-12 flex items-center justify-center clip-diagonal"
                    style={{
                      background: item.tierColor + "15",
                      border: "1px solid " + item.tierColor + "30",
                      color: item.tierColor,
                    }}
                  >
                    {item.badge}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: item.tierColor }}>
                    {item.icon}
                  </div>
                </div>

                <div className="flex-1 px-6 z-10">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-tactical text-white group-hover:text-[#ff4655] transition-colors hover:underline decoration-[#ff4655]/30 tracking-wide"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <h3 className="text-lg font-tactical text-white group-hover:text-[#ff4655] transition-colors tracking-wide">
                      {item.name}
                    </h3>
                  )}
                  <p className="font-mono-game text-[10px] text-[#53545f] tracking-[0.15em]">{item.role}</p>
                </div>

                {/* Tier badge */}
                <div
                  className="font-mono-game text-[9px] px-3 py-1 tracking-[0.2em] z-10"
                  style={{
                    background: item.tierColor + "10",
                    border: "1px solid " + item.tierColor + "25",
                    color: item.tierColor,
                  }}
                >
                  {item.tier}
                </div>

                {/* Glow overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(90deg, transparent, " + item.tierColor + "05)" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Stats Summary */}
          <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "CONTRIBUTIONS", value: "Active", color: "#ff4655" },
              { label: "ORGANIZATIONS", value: "3 Major Orgs", color: "#00e5ff" },
              { label: "IMPACT", value: "Global Scale", color: "#fbbf24" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-[#111118]/60 border border-[rgba(255,70,85,0.06)] text-center">
                <span className="font-mono-game text-[9px] tracking-[0.2em]" style={{ color: stat.color }}>{stat.label}</span>
                <p className="text-lg font-tactical text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.p variants={itemVariants} className="mt-10 text-[#53545f] text-xs font-mono-game text-center">
            // ACTIVELY CONTRIBUTING TO OPEN-SOURCE PROJECTS AND COLLABORATING WITH OPEN COMMUNITIES
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
