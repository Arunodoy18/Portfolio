"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { Mail, Linkedin, Github, Phone, ArrowUpRight, MessageSquare } from "lucide-react";

const contactOptions = [
  { 
    label: "Email", 
    value: "barun4927@gmail.com", 
    href: "mailto:barun4927@gmail.com",
    icon: <Mail className="w-5 h-5" />,
    color: "bg-pink-600"
  },
  { 
    label: "LinkedIn", 
    value: "arunodoy-banerjee", 
    href: "https://www.linkedin.com/in/arunodoy-banerjee-214251342/",
    icon: <Linkedin className="w-5 h-5" />,
    color: "bg-violet-600"
  },
  { 
    label: "GitHub", 
    value: "@Arunodoy18", 
    href: "https://github.com/Arunodoy18",
    icon: <Github className="w-5 h-5" />,
    color: "bg-[#1a1520]"
  },
  { 
    label: "Phone", 
    value: "+91 9864446805", 
    href: "tel:+919864446805",
    icon: <Phone className="w-5 h-5" />,
    color: "bg-green-600"
  }
];

export default function ContactOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="contact" className="h-screen w-full flex items-center justify-center">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              Let's Build <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-pink-300 italic">
                Together
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-[#9d8ba6] mb-16 max-w-2xl mx-auto leading-relaxed font-light">
              Looking for <span className="text-white font-medium">high-impact</span> projects and 
              <span className="text-white font-medium ml-1">meaningful</span> collaborations.
            </p>

            <div className="flex flex-col items-center">
              <Button 
                variant="primary" 
                className="px-12 py-6 text-xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                <MessageSquare className={`w-6 h-6 mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                {isOpen ? "Close" : "Get In Touch"}
              </Button>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
                <AnimatePresence>
                  {isOpen && contactOptions.map((option, i) => (
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
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                      }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group p-6 rounded-2xl bg-[#1a1520]/60 border border-pink-500/10 backdrop-blur-md hover:border-pink-500/30 transition-all flex flex-col items-center justify-center gap-4 min-w-[160px]"
                    >
                      <div className={`p-4 rounded-full ${option.color} text-white group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-shadow`}>
                        {option.icon}
                      </div>
                      <div className="text-center">
                        <span className="block text-white font-bold text-sm uppercase tracking-widest mb-1">{option.label}</span>
                        <span className="text-[#6b5a75] text-xs truncate max-w-[140px] block">{option.value}</span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#6b5a75] group-hover:text-pink-400 transition-colors" />
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="mt-24 pt-12 border-t border-pink-500/10"
          >
            <p className="text-[#6b5a75] text-sm font-mono">
              // DESIGNED & ENGINEERED BY ARUNODOY BANERJEE
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
