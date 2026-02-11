"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  href?: string;
  ariaLabel?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = "primary", 
  className = "",
  href,
  ariaLabel
}: ButtonProps) {
  const baseStyles = "relative px-8 py-4 font-semibold transition-all overflow-hidden flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#ff4655] focus:ring-offset-2 focus:ring-offset-[#0a0a0f] clip-diagonal font-tactical uppercase tracking-wider";
  
  const variants = {
    primary: "bg-[#ff4655] text-white hover:bg-[#ff5a67] shadow-[0_0_20px_rgba(255,70,85,0.3)] hover:shadow-[0_0_30px_rgba(255,70,85,0.5)]",
    secondary: "bg-[#00e5ff] text-[#0a0a0f] hover:bg-[#33ecff] shadow-lg hover:shadow-xl",
    outline: "bg-transparent text-white border border-[#ff4655]/30 hover:border-[#ff4655] hover:bg-[#ff4655]/10"
  };

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block"
        aria-label={ariaLabel || `Navigate to ${href}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      className="block w-full sm:w-auto"
      aria-label={ariaLabel}
      type="button"
    >
      {content}
    </button>
  );
}
