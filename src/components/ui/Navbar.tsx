"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  sectionId: string;
  scrollPosition: number; // Position as fraction of total scroll (0-1)
}

const navItems: NavItem[] = [
  { label: "About", href: "#about", sectionId: "about", scrollPosition: 1 / 8 },
  { label: "Projects", href: "#projects", sectionId: "projects", scrollPosition: 3 / 8 },
  { label: "Why Me", href: "#why-me", sectionId: "why-me", scrollPosition: 4 / 8 },
  { label: "Contact", href: "#contact", sectionId: "contact", scrollPosition: 6 / 8 },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  // Find scroll container on mount with retry
  useEffect(() => {
    const findScrollContainer = () => {
      // Look for the tagged container first
      let container = document.querySelector('[data-scroll-container]') as HTMLElement | null;
      
      // If not found, try to find drei's scroll container by its characteristics
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

    // Try immediately, then retry a few times
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
      
      // Clean up after 5 seconds
      setTimeout(() => clearInterval(retryInterval), 5000);
    }
  }, []);

  // Handle scroll events
  useEffect(() => {
    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsScrolled(scrollContainer.scrollTop > 50);
      
      // Update active section based on scroll position
      const scrollFraction = scrollContainer.scrollTop / scrollContainer.scrollHeight;
      for (let i = navItems.length - 1; i >= 0; i--) {
        if (scrollFraction >= navItems[i].scrollPosition - 0.05) {
          setActiveSection(navItems[i].sectionId);
          break;
        }
      }
      if (scrollFraction < 0.1) {
        setActiveSection("");
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    e.preventDefault();
    console.log('Navbar click:', item.sectionId, 'scrollContainer:', scrollContainer);
    setActiveSection(item.sectionId);
    setIsMobileMenuOpen(false);
    
    // Use the state container or find it again
    const container = scrollContainer || document.querySelector('[data-scroll-container]') as HTMLElement;
    console.log('Found container:', container);
    if (container) {
      const scrollTop = container.scrollHeight * item.scrollPosition;
      console.log('Scrolling to:', scrollTop, 'of', container.scrollHeight);
      container.scrollTo({ 
        top: scrollTop, 
        behavior: 'smooth' 
      });
    }
  }, [scrollContainer]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection("");
    const container = scrollContainer || document.querySelector('[data-scroll-container]') as HTMLElement;
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollContainer]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-[#0d0a0f]/80 backdrop-blur-xl border-b border-pink-500/10 shadow-lg shadow-pink-500/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={handleLogoClick}
              className="flex items-center space-x-1 text-white font-bold text-xl tracking-tight"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>AB</span>
              <span className="text-pink-500">.</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                    activeSection === item.sectionId
                      ? "text-pink-400"
                      : "text-gray-300 hover:text-white"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.sectionId && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-pink-500/10 border border-pink-500/20 rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-16 z-[99] md:hidden"
          >
            <div className="bg-[#0d0a0f]/95 backdrop-blur-xl border-b border-pink-500/10 shadow-xl">
              <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.sectionId}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      activeSection === item.sectionId
                        ? "text-pink-400 bg-pink-500/10"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
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
