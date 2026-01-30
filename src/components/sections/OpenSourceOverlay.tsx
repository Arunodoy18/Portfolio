"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { GitBranch, GitMerge, GitPullRequest, Globe } from "lucide-react";

const contributions = [
  { name: "Apache Airflow", role: "Contributor", link: "https://github.com/apache/airflow", icon: <GitBranch className="w-5 h-5" /> },
  { name: "CNCF – OpenTelemetry", role: "Contributor", link: "https://github.com/open-telemetry/opentelemetry-collector", icon: <GitMerge className="w-5 h-5" /> },
  { name: "Apache TOC", role: "Contributor and Maintainer", link: null, icon: <GitPullRequest className="w-5 h-5" /> }
];

export default function OpenSourceOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    },
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
            <div className="flex justify-end mb-4 text-violet-400">
              <Globe className="w-12 h-12" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              Community <span className="text-violet-400 italic">Impact</span>
            </h2>
            <p className="text-xl text-[#9d8ba6] leading-relaxed font-light">
              Deeply committed to the <span className="text-white font-medium">Open Source</span> philosophy. 
              My contributions focus on <span className="text-pink-400">system-level optimizations</span> and 
              building tools that empower developers worldwide.
            </p>
          </motion.div>

          <div className="space-y-4">
            {contributions.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ x: -10, backgroundColor: "rgba(236, 72, 153, 0.1)" }}
                className="flex items-center justify-between p-6 rounded-2xl bg-[#1a1520]/60 border border-pink-500/10 backdrop-blur-md transition-all group"
              >
                <div className="flex items-center gap-4 text-pink-400 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 px-8">
                  {item.link ? (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors hover:underline">
                      {item.name}
                    </a>
                  ) : (
                    <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">
                      {item.name}
                    </h3>
                  )}
                  <p className="text-[#6b5a75] text-sm font-medium uppercase tracking-widest">{item.role}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={itemVariants} className="mt-12 text-[#6b5a75] italic text-sm">
            Actively contributing to open-source projects and collaborating with open communities.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
