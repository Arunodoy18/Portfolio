"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { GitBranch, GitMerge, GitPullRequest, Globe } from "lucide-react";

const contributions = [
  { name: "Core Infrastructure", role: "Contributor", impact: "Optimizing memory allocation in distributed runtimes", icon: <GitBranch className="w-5 h-5" /> },
  { name: "Cloud Native Tools", role: "Maintainer", impact: "Standardizing API responses for high-load services", icon: <GitMerge className="w-5 h-5" /> },
  { name: "DevOps Ecosystem", role: "GSoC Ready", impact: "Improving observability in containerized environments", icon: <GitPullRequest className="w-5 h-5" /> }
];

export default function OpenSourceOverlay() {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="h-screen w-full flex items-center justify-end">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl ml-auto text-right"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex justify-end mb-4 text-purple-500">
              <Globe className="w-12 h-12" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Community <span className="text-purple-500 italic">Impact</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              Deeply committed to the <span className="text-white font-medium">Open Source</span> philosophy. 
              My contributions focus on <span className="text-purple-400">system-level optimizations</span> and 
              building tools that empower developers worldwide.
            </p>
          </motion.div>

          <div className="space-y-4">
            {contributions.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: -10, backgroundColor: "rgba(147, 51, 234, 0.1)" }}
                className="flex items-center justify-between p-6 rounded-2xl bg-slate-900/40 border border-slate-800/50 backdrop-blur-md transition-all group"
              >
                <div className="flex items-center gap-4 text-purple-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 px-8">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">{item.role}</p>
                </div>
                <p className="text-slate-400 font-mono text-sm max-w-[250px] leading-relaxed">
                  {item.impact}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="mt-12 text-slate-500 italic text-sm">
            Actively preparing for <span className="text-white">GSoC 2026</span> with a focus on cloud-native computing.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
