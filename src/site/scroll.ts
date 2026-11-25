"use client";

import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";

type Tick = (time: number) => void;

const ticks = new Set<Tick>();
let raf = 0;

function loop(t: number) {
  ticks.forEach((fn) => fn(t));
  raf = requestAnimationFrame(loop);
}

export function onTick(fn: Tick) {
  ticks.add(fn);
  if (!raf && typeof window !== "undefined") raf = requestAnimationFrame(loop);
  return () => {
    ticks.delete(fn);
  };
}

export const mouse = { x: 0.5, y: 0.5, px: 0, py: 0 };

if (typeof window !== "undefined") {
  window.addEventListener(
    "pointermove",
    (e) => {
      mouse.px = e.clientX;
      mouse.py = e.clientY;
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    },
    { passive: true },
  );
}

export const isInk = () => typeof document !== "undefined" && document.documentElement.dataset.theme === "ink";

/** night from 19:00 until 05:59, by the visitor's own clock */
export const themeForNow = (d = new Date()): "ink" | "paper" => (d.getHours() >= 19 || d.getHours() < 6 ? "ink" : "paper");

export function setTheme(t: "ink" | "paper") {
  document.documentElement.dataset.theme = t;
  try {
    sessionStorage.setItem("theme", t);
  } catch {}
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
/** maps v from [a,b] to [0,1], clamped */
export const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Progress of a tall (sticky) section: 0 when its top hits the viewport top,
 * 1 when its bottom hits the viewport bottom.
 */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  cb: (p: number, time: number) => void,
) {
  const cbRef = useRef(cb);
  useLayoutEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    return onTick((time) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -vh || r.top > vh * 2) return;
      const total = r.height - vh;
      const p = total > 0 ? clamp(-r.top / total) : clamp(1 - r.top / vh);
      cbRef.current(p, time);
    });
  }, [ref]);
}

/** Progress of an element passing through the viewport: 0 entering at bottom, 1 leaving at top. */
export function useViewProgress(ref: RefObject<HTMLElement | null>, cb: (p: number) => void) {
  const cbRef = useRef(cb);
  useLayoutEffect(() => {
    cbRef.current = cb;
  });
  useEffect(() => {
    return onTick(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -100 || r.top > vh + 100) return;
      cbRef.current(clamp((vh - r.top) / (vh + r.height)));
    });
  }, [ref]);
}
