"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";
import { CheckCircle, Users, Zap, Target, Code, Rocket } from "lucide-react";

const strengths = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Production-First Mindset",
    description: "I don't just write code that works—I build systems designed for real-world scale, reliability, and maintainability from day one."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team-Ready Engineer",
    description: "Experienced in async collaboration, code reviews, and contributing to large codebases with multiple stakeholders. I communicate clearly and ship consistently."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast Learner, Deep Diver",
    description: "I rapidly adapt to new technologies while building deep expertise. My open-source work demonstrates ability to understand complex systems quickly."
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Open Source Track Record",
    description: "Active contributor to Apache Airflow and CNCF OpenTelemetry. I understand enterprise-grade codebases and community-driven development."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "End-to-End Ownership",
    description: "From architecture design to deployment and monitoring—I take full ownership of features and see them through to production."
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Results Over Resume",
    description: "Every project I build solves a real problem. I measure success by impact delivered, not technologies listed."
  }
];

export default function WhyMeOverlay() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    },
  };

  return (
    <section id="why-me" className="min-h-screen w-full flex items-center py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Why I'm a <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400 italic">Strong Candidate</span>
          </h2>
          <p className="text-xl text-[#9d8ba6] max-w-2xl mx-auto leading-relaxed">
            Beyond technical skills—here's what makes me effective in real engineering teams.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-transparent rounded-full mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {strengths.map((strength, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "rgba(236, 72, 153, 0.4)",
                transition: { duration: 0.2 }
              }}
              className="group p-8 rounded-2xl bg-[#1a1520]/60 border border-pink-500/10 backdrop-blur-md transition-all relative overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-12 h-12 mb-6 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 transition-all">
                  {strength.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-pink-300 transition-colors">
                  {strength.title}
                </h3>
                
                <p className="text-[#9d8ba6] leading-relaxed text-sm">
                  {strength.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-[#6b5a75] text-lg italic">
            "I ship, I learn, I iterate. Let's build something impactful together."
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
