"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { profile } from "./data";
import { mouse, onTick, prefersReducedMotion } from "./scroll";

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

      <header className="hud pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-[3.2vw] pt-5">
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
        <span className="font-mono text-[9.5px] tracking-[0.22em]">PLATE {plate.slice(0, 2)} / 06</span>
      </header>

      <footer className="hud pointer-events-none fixed inset-x-0 bottom-0 z-50 flex items-end justify-between gap-6 px-[3.2vw] pb-5">
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
      <Loader />
    </>
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

function Loader() {
  const [mb, setMb] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const target = 1.8;
    const start = performance.now();
    let ready = false;
    const assets = ["/work/zone.jpg", "/work/nura.jpg", "/work/cadence.jpg", "/work/portrait.jpg"].map(
      (src) =>
        new Promise<void>((res) => {
          const i = new Image();
          i.onload = i.onerror = () => res();
          i.src = src;
        }),
    );
    Promise.all([document.fonts?.ready, ...assets]).then(() => (ready = true));
    const off = onTick((now) => {
      const t = Math.min(1, (now - start) / 1400);
      const v = ready ? Math.max(t, 0.92) : Math.min(t, 0.85);
      setMb(+(v * target).toFixed(1));
      if (ready && now - start > 1400) {
        setDone(true);
        off();
        setTimeout(() => setGone(true), 1100);
      }
    });
    return off;
  }, []);
  if (gone) return null;
  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-paper transition-[clip-path] duration-1000 ease-[cubic-bezier(.7,0,.2,1)] ${
        done ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"
      }`}
    >
      <div className="grid grid-cols-2 gap-x-10 font-mono text-[10px] tracking-[0.25em] text-ink/70">
        <span>DOWNLOADING</span>
        <span>RECEIVED</span>
        <span>THE PAGE</span>
        <span className="tabular-nums text-ink">{mb.toFixed(1)} MB</span>
      </div>
    </div>
  );
}
