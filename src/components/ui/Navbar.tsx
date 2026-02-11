"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crosshair, User, Swords, Trophy, Radio, GitBranch, Shield } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
  scrollPosition: number;
  icon: React.ReactNode;
  gameLabel: string;
}

const navItems: NavItem[] = [
  { label: "Profile", href: "#about", sectionId: "about", scrollPosition: 1 / 8, icon: <User className="w-4 h-4" />, gameLabel: "PLAYER PROFILE" },
  { label: "Missions", href: "#projects", sectionId: "projects", scrollPosition: 3 / 8, icon: <Swords className="w-4 h-4" />, gameLabel: "MISSIONS" },
  { label: "Skills", href: "#why-me", sectionId: "why-me", scrollPosition: 4 / 8, icon: <Shield className="w-4 h-4" />, gameLabel: "SKILL TREE" },
  { label: "Achievements", href: "#open-source", sectionId: "open-source", scrollPosition: 5 / 8, icon: <Trophy className="w-4 h-4" />, gameLabel: "ACHIEVEMENTS" },
  { label: "Comms", href: "#contact", sectionId: "contact", scrollPosition: 6 / 8, icon: <Radio className="w-4 h-4" />, gameLabel: "COMM TERMINAL" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const findScrollContainer = () => {
      let container = document.querySelector('[data-scroll-container]') as HTMLElement | null;
      if (!container) {
        const divs = document.querySelectorAll('div');
        for (const div of divs) {
          const style = window.getComputedStyle(div);
          if (style.overflowY === 'scroll' && style.position === 'absolute' && 
              div.scrollHeight > window.innerHeight * 2) {
            container = div as HTMLElement;
            container.setAttribute('data-scroll-container', 'true');
            break;
          }
        }
      }
      return container;
    };

    let container = findScrollContainer();
    if (container) {
      setScrollContainer(container);
    } else {
      const retryInterval = setInterval(() => {
        container = findScrollContainer();
        if (container) {
          setScrollContainer(container);
          clearInterval(retryInterval);
        }
      }, 200);
      setTimeout(() => clearInterval(retryInterval), 5000);
    }
  }, []);

  useEffect(() => {
    if (!scrollContainer) return;
    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 50);
      const scrollFraction = scrollContainer.scrollTop / scrollContainer.scrollHeight;
      for (let i = navItems.length - 1; i >= 0; i--) {
        if (scrollFraction >= navItems[i].scrollPosition - 0.05) {
          setActiveSection(navItems[i].sectionId);
          break;
        }
      }
      if (scrollFraction < 0.1) setActiveSection("");
    };
    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    setActiveSection(item.sectionId);
    setIsMobileMenuOpen(false);
    const sectionElement = document.getElementById(item.sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const sectionByData = document.querySelector(`[data-section="${item.sectionId}"]`);
    if (sectionByData) {
      sectionByData.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("");
    let container = scrollContainer || document.querySelector('[data-scroll-container]') as HTMLElement;
    if (!container) {
      const divs = document.querySelectorAll('div');
      for (const div of divs) {
        const style = window.getComputedStyle(div);
        if (style.overflowY === 'scroll' && style.position === 'absolute' && 
            div.scrollHeight > window.innerHeight * 2) {
          container = div as HTMLElement;
          break;
        }
      }
    }
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollContainer]);

  return (
    <>
      {/* ── GAME HUD NAV BAR ── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#ff4655]/10 shadow-[0_2px_20px_rgba(255,70,85,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo / Agent Tag */}
            <motion.a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center gap-2 group"
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
            </motion.a>

            {/* Desktop Game Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative flex items-center gap-2 px-3 py-2 text-xs font-tactical tracking-[0.1em] transition-all rounded ${
                    activeSection === item.sectionId
                      ? "text-[#ff4655]"
                      : "text-[#8b8d98] hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon}
                  {item.label}
                  {activeSection === item.sectionId && (
                    <motion.div
                      layoutId="activeHud"
                      className="absolute inset-0 bg-[#ff4655]/10 border border-[#ff4655]/30 rounded -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Resume / Dossier Button */}
            <div className="hidden md:flex items-center gap-3">
              <div className="font-mono-game text-[9px] text-[#53545f] text-right">
                <div className="text-[#00e5ff]">●  CONNECTED</div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              className="md:hidden p-2 text-[#8b8d98] hover:text-white focus:outline-none rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Game Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-14 z-[99] md:hidden"
          >
            <div className="bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#ff4655]/10 shadow-xl">
              <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.sectionId}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-tactical tracking-[0.1em] rounded transition-colors ${
                      activeSection === item.sectionId
                        ? "text-[#ff4655] bg-[#ff4655]/10 border-l-2 border-[#ff4655]"
                        : "text-[#8b8d98] hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <div>
                      <span className="block">{item.label}</span>
                      <span className="block text-[9px] font-mono-game text-[#53545f]">{item.gameLabel}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
