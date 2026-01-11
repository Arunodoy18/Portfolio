"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  href 
}: ButtonProps) {
  const baseStyles = "relative px-8 py-4 rounded-lg font-semibold transition-all overflow-hidden flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]",
    secondary: "bg-white text-black hover:bg-slate-100",
    outline: "bg-transparent text-white border border-slate-700 hover:border-white hover:bg-white/5"
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="block w-full sm:w-auto">
      {content}
    </button>
  );
}
