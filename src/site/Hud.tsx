"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { profile } from "./data";
import { isInk, mouse, onTick, prefersReducedMotion, setTheme, themeForNow } from "./scroll";

const NAV = [
  { id: "lens", label: "LENS" },
  { id: "about", label: "ABOUT" },
  { id: "work", label: "WORK" },
  { id: "notes", label: "NOTES" },
];

export default function Hud() {
  const [plate, setPlate] = useState("01 — THE LENS");
  const [active, setActive] = useState("lens");
  const marker = useRef<HTMLSpanElement>(null);

  // smooth scrolling driven by the shared frame loop
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.085, wheelMultiplier: 0.9 });
    const off = onTick((t) => lenis.raf(t));
    return () => {
      off();
      lenis.destroy();
    };
  }, []);

  // which plate is under the middle of the screen
  useEffect(() => {
    let last = "";
    return onTick(() => {
      const mid = window.innerHeight / 2;
      const els = document.querySelectorAll<HTMLElement>("[data-plate]");
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          const label = el.dataset.plate!;
          if (label !== last) {
            last = label;
            setPlate(label);
            const navId = el.id === "practice" ? "work" : el.id === "eye" || el.id === "other-side" ? "lens" : el.id === "contact" ? "notes" : el.id;
            setActive(navId);
          }
          break;
        }
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (marker.current) marker.current.style.left = `${(window.scrollY / Math.max(1, max)) * 100}%`;
    });
  }, []);

  return (
    <>
      <a
        href="#work"
        className="fixed left-3 top-3 z-[80] -translate-y-20 bg-ink px-3 py-2 font-mono text-[11px] text-paper focus:translate-y-0"
      >
        Skip past the black hole
      </a>

      <header className="hud focus-in pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-[3.2vw] pt-5">
        <a href="#lens" data-cursor="hover" className="pointer-events-auto flex items-center gap-2">
          <span className="cast text-[13px] tracking-[0.02em]">
            {profile.first} {profile.last}
          </span>
          <span className="relative inline-block h-3 w-3 rounded-full border border-current">
            <span className="absolute inset-[3px] rounded-full bg-current" />
          </span>
        </a>
        <nav aria-label="Sections" className="pointer-events-auto hidden gap-6 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} data-cursor="hover" className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.22em]">
              <span className={`inline-block h-[7px] w-[7px] rounded-full border border-current ${active === n.id ? "bg-current" : ""}`} />
              {n.label}
            </a>
          ))}
        </nav>
        <span className="pointer-events-auto flex items-center gap-5 font-mono text-[9.5px] tracking-[0.22em]">
          <ThemeToggle />
          <span className="hidden sm:inline">PLATE {plate.slice(0, 2)} / 06</span>
        </span>
      </header>

      <footer className="hud focus-in pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-between gap-6 px-[3.2vw] pb-5">
        <span className="whitespace-nowrap font-mono text-[9.5px] tracking-[0.22em] md:min-w-[18ch]">{plate}</span>
        <span className="relative hidden h-2 flex-1 max-w-[340px] md:block" aria-hidden>
          <span className="absolute inset-x-0 bottom-0 flex justify-between">
            {Array.from({ length: 41 }, (_, i) => (
              <span key={i} className="w-px bg-current opacity-60" style={{ height: i % 10 === 0 ? 8 : 3 }} />
            ))}
          </span>
          <span ref={marker} className="absolute -bottom-1 h-[11px] w-[2px] -translate-x-1/2 bg-current" />
        </span>
        <span className="pointer-events-auto flex gap-3 whitespace-nowrap font-mono text-[9.5px] tracking-[0.18em] md:gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="hover" className="link-u">
            GitHub ↗
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="hover" className="link-u">
            LinkedIn ↗
          </a>
          <a href={`mailto:${profile.email}`} data-cursor="hover" className="link-u">
            Email ↗
          </a>
        </span>
      </footer>

      <Cursor />
      {/* page arrives out of focus, tinted, and resolves */}
      <div aria-hidden className="focus-tint pointer-events-none fixed inset-0 z-[95]" />
    </>
  );
}

function subscribeTheme(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  // follow the clock until the visitor has chosen: dusk turns the page to night on its own
  const follow = () => {
    try {
      if (sessionStorage.getItem("theme")) return;
    } catch {}
    const t = themeForNow();
    if (document.documentElement.dataset.theme !== t) document.documentElement.dataset.theme = t;
  };
  const id = window.setInterval(follow, 30000);
  return () => {
    mo.disconnect();
    clearInterval(id);
  };
}

function ThemeToggle() {
  const ink = useSyncExternalStore(subscribeTheme, isInk, () => false);
  return (
    <button
      type="button"
      data-cursor="hover"
      aria-label={ink ? "Switch to day" : "Switch to night"}
      onClick={() => setTheme(isInk() ? "paper" : "ink")}
      className="flex items-center gap-1.5 tracking-[0.22em]"
    >
      <span className="relative inline-block h-[9px] w-[9px] overflow-hidden rounded-full border border-current">
        <span className={`absolute inset-y-0 left-0 bg-current transition-all duration-500 ${ink ? "w-full" : "w-1/2"}`} />
      </span>
      {ink ? "NIGHT" : "DAY"}
    </button>
  );
}

function Cursor() {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const pos = { x: -100, y: -100 };
    let hover = 0;
    let seen = false;
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      hover = t.closest("a,button,[data-cursor=hover]") ? 1 : 0;
    };
    window.addEventListener("pointerover", over);
    let h = 0;
    const off = onTick(() => {
      if (!seen) {
        if (!mouse.px && !mouse.py) return;
        seen = true;
        pos.x = mouse.px;
        pos.y = mouse.py;
      }
      pos.x += (mouse.px - pos.x) * 0.25;
      pos.y += (mouse.py - pos.y) * 0.25;
      h += (hover - h) * 0.2;
      if (el.current) {
        el.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${1 + h * 0.8}) rotate(${h * 45}deg)`;
      }
    });
    return () => {
      off();
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);
  return (
    <div ref={el} aria-hidden className="cursor pointer-events-none fixed left-0 top-0 z-[90] -ml-[14px] -mt-[14px] h-7 w-7" style={{ transform: "translate(-100px,-100px)" }}>
      <span className="absolute inset-0 rounded-full border border-white" />
      <span className="absolute left-1/2 top-[6px] h-[16px] w-px -translate-x-1/2 bg-white" />
      <span className="absolute left-[6px] top-1/2 h-px w-[16px] -translate-y-1/2 bg-white" />
    </div>
  );
}
