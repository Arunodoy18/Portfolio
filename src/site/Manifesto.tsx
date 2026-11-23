"use client";

import { useMemo, useRef } from "react";
import { clamp, ease, easeOut, lerp, mouse, range, useSectionProgress } from "./scroll";

const LINES = ["Engineering and art", "should be seen through", "the same lens."];
const CAPS = ["ENGINEERING", "AND ART", "SHOULD BE SEEN", "THROUGH", "THE SAME LENS."];

function SerifBlock() {
  return (
    <p className="text-center font-serif text-[clamp(34px,6.4vw,118px)] font-light italic leading-[1.02] tracking-[-0.03em] text-ink">
      {LINES.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

export default function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const serif = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const caps = useRef<HTMLDivElement>(null);
  const thin = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLParagraphElement>(null);
  const sm = useRef({ x: 0.5, y: 0.5 });

  // per-letter scatter seeds for the capitals
  const letters = useMemo(() => {
    let i = 0;
    const total = CAPS.join("").replace(/ /g, "").length;
    return CAPS.map((line) =>
      line.split("").map((ch) => {
        const k = ch === " " ? -1 : i++;
        const a = (k / total) * Math.PI * 3.2 + 0.6;
        return { ch, k, a, r: 0.12 + (k / total) * 0.6, spin: ((k * 73) % 140) - 70 };
      }),
    );
  }, []);
  const total = useMemo(() => CAPS.join("").replace(/ /g, "").length, []);

  useSectionProgress(section, (p) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    sm.current.x += (mouse.x - sm.current.x) * 0.06;
    sm.current.y += (mouse.y - sm.current.y) * 0.06;

    // ---- phase A: we come out of the hole. The dark disc shrinks into a lens. ----
    const cover = Math.hypot(vw, vh) * 1.05;
    const base = Math.min(vw, vh) * 0.34;
    const em = ease(range(p, 0.0, 0.16));
    const wander = range(p, 0.14, 0.4);
    const shrink = ease(range(p, 0.32, 0.42));
    const size = Math.max(1, lerp(cover, base, em) * (1 - shrink));
    const dark = 1 - ease(range(p, 0.07, 0.2));
    const lx = vw * 0.5 + Math.sin(wander * Math.PI * 1.3) * vw * 0.2 * em + (sm.current.x - 0.5) * vw * 0.08 * em;
    const ly = vh * 0.5 + Math.sin(wander * Math.PI * 2.2) * vh * 0.1 * em + (sm.current.y - 0.5) * vh * 0.08 * em;
    const spin = wander * 140;

    // the sentence relaxes into thin capitals once the lens has gone
    const toThin = ease(range(p, 0.42, 0.5));
    if (serif.current) {
      serif.current.style.opacity = `${1 - toThin}`;
      serif.current.style.filter = toThin > 0 ? `blur(${toThin * 6}px)` : "none";
    }
    if (thin.current) {
      const off = ease(range(p, 0.58, 0.68));
      thin.current.style.opacity = `${toThin * (1 - off)}`;
      thin.current.style.filter = toThin < 1 ? `blur(${(1 - toThin) * 6}px)` : off > 0 ? `blur(${off * 6}px)` : "none";
      thin.current.style.letterSpacing = `${lerp(0.02, 0.12, toThin)}em`;
    }
    if (lens.current && inner.current) {
      lens.current.style.width = lens.current.style.height = `${size}px`;
      lens.current.style.transform = `translate(${lx - size / 2}px, ${ly - size / 2}px) rotate(${spin}deg)`;
      lens.current.style.visibility = shrink >= 1 ? "hidden" : "visible";
      lens.current.style.setProperty("--dark", `${dark}`);
      // the clone inside is counter-positioned so it lines up, then magnified around the lens centre
      inner.current.style.transform = `rotate(${-spin}deg)`;
      const clone = inner.current.querySelector<HTMLElement>("[data-clone]")!;
      clone.style.width = `${vw}px`;
      clone.style.height = `${vh}px`;
      clone.style.transformOrigin = `${lx}px ${ly}px`;
      clone.style.transform = `translate(${-(lx - size / 2)}px, ${-(ly - size / 2)}px) scale(1.55)`;
      clone.style.filter = `url(#refract) invert(${dark})`;
      // stay pure black while the section slides in under the dive
      clone.style.opacity = `${range(p, 0.004, 0.05)}`;
    }

    // ---- phase B: the sentence pours out of the lens as capitals ----
    const b = range(p, 0.6, 0.94);
    if (caps.current) {
      caps.current.style.opacity = b > 0 ? "1" : "0";
      const spans = caps.current.querySelectorAll<HTMLSpanElement>("[data-k]");
      spans.forEach((el) => {
        const k = Number(el.dataset.k);
        const ang = Number(el.dataset.a);
        const r = Number(el.dataset.r);
        const spin = Number(el.dataset.spin);
        const t = easeOut(clamp(b * 1.7 - (k / total) * 0.7));
        const sx = (Math.cos(ang) * r * vw) * (1 - t);
        const sy = (Math.sin(ang) * r * vh * 0.7 + vh * 0.05) * (1 - t);
        el.style.transform = `translate(${sx}px, ${sy}px) rotate(${spin * (1 - t)}deg) scale(${lerp(0.4, 1, t)})`;
        el.style.opacity = `${clamp(t * 3)}`;
        el.style.color = t < 0.98 ? "var(--color-steel)" : "";
      });
    }
    if (label.current) label.current.style.opacity = `${easeOut(range(p, 0.85, 0.98))}`;
  });

  return (
    <section ref={section} id="eye" data-plate="03 — THE OTHER SIDE" className="relative h-[480vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div ref={serif} className="absolute inset-0 flex items-center justify-center px-6">
          <SerifBlock />
        </div>

        {/* glass lens */}
        <div
          ref={lens}
          aria-hidden
          className="lens pointer-events-none absolute left-0 top-0 overflow-hidden rounded-full will-change-transform"
        >
          <div ref={inner} className="absolute inset-0">
            <div className="lens-dark absolute inset-0" />
            <div data-clone className="absolute left-0 top-0 flex items-center justify-center px-6" style={{ filter: "url(#refract)" }}>
              <SerifBlock />
            </div>
          </div>
          <div className="lens-glass absolute inset-0 rounded-full" />
        </div>

        {/* thin capitals */}
        <div ref={thin} aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0">
          <p className="text-right font-sans text-[clamp(16px,2.1vw,36px)] font-light uppercase leading-[1.15] text-ink">
            <span className="block">Engineering and art</span>
            <span className="block">should be seen through</span>
            <span className="block">the same lens.</span>
          </p>
        </div>

        {/* capitals */}
        <div ref={caps} className="absolute inset-0 flex flex-col items-center justify-center opacity-0" aria-label={LINES.join(" ")}>
          {letters.map((line, li) => (
            <div
              key={li}
              aria-hidden
              className="cast flex text-[clamp(30px,6.2vw,120px)] leading-[0.92] text-ink"
              style={{ marginLeft: `${[-24, 18, -10, 26, 4][li]}vw` }}
            >
              {line.map((l, i) =>
                l.ch === " " ? (
                  <span key={i} className="inline-block w-[0.3em]" />
                ) : (
                  <span
                    key={i}
                    data-k={l.k}
                    data-a={l.a}
                    data-r={l.r}
                    data-spin={l.spin}
                    className="inline-block will-change-transform"
                  >
                    {l.ch}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>

        <p
          ref={label}
          className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] text-ink/60 opacity-0"
        >
          LIGHT ARRIVES ALREADY BENT
        </p>

        <svg width="0" height="0" className="absolute">
          <filter id="refract">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </div>
    </section>
  );
}
