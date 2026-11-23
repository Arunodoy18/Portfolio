"use client";

import { useEffect, useRef } from "react";
import BlackHole, { type HoleState } from "./BlackHole";
import { profile } from "./data";
import { ease, easeOut, lerp, range, useSectionProgress } from "./scroll";

export default function Opening() {
  const section = useRef<HTMLElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const flyer = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLHeadingElement>(null);
  const tail = useRef<HTMLSpanElement>(null);
  const art = useRef<HTMLParagraphElement>(null);
  const notes = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const orbit = useRef<SVGCircleElement>(null);

  const hole = useRef<HoleState>({ focus: 0, cx: 0.5, cy: 0.53, scale: 1 });
  const geo = useRef({ dx: 0, dy: 0, s: 1 });

  // measure where the intro word must fly to become the headline
  useEffect(() => {
    const measure = () => {
      if (!word.current || !head.current || !flyer.current) return;
      const a = word.current.getBoundingClientRect();
      const b = head.current.querySelector("[data-root]")!.getBoundingClientRect();
      const s = b.height / a.height;
      geo.current = { dx: b.left - a.left, dy: b.top - a.top, s };
      flyer.current.style.left = `${a.left}px`;
      flyer.current.style.top = `${a.top}px`;
      flyer.current.style.fontSize = getComputedStyle(word.current).fontSize;
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useSectionProgress(section, (p, time) => {
    // 1. intro sentence
    const out = ease(range(p, 0.08, 0.3));
    if (intro.current) {
      intro.current.style.opacity = `${1 - out}`;
      intro.current.style.filter = `blur(${out * 10}px)`;
      intro.current.style.transform = `scale(${1 + out * 0.06})`;
    }

    // 2. the word ENGINEER flies to the headline
    const fly = ease(range(p, 0.1, 0.34));
    const g = geo.current;
    if (flyer.current) {
      flyer.current.style.transform = `translate(${g.dx * fly}px, ${g.dy * fly}px) scale(${lerp(1, g.s, fly)})`;
      flyer.current.style.opacity = fly >= 1 ? "0" : "1";
    }
    if (head.current) head.current.style.opacity = fly >= 1 ? "1" : "0";
    if (tail.current) {
      const t = easeOut(range(p, 0.33, 0.42));
      tail.current.style.clipPath = `inset(0 ${100 - t * 100}% 0 0)`;
    }

    // 3. the hole comes into focus
    const f = ease(range(p, 0.12, 0.48));
    hole.current.focus = f;
    hole.current.scale = lerp(0.78, 0.9, f) + range(p, 0.75, 1) * 0.25;
    if (readout.current) {
      const m = lerp(0.3, 4.2, f);
      readout.current.textContent = f >= 1 ? "IN FOCUS" : `FOCUSING ${m.toFixed(2)} M`;
    }

    // 4. annotations & "as art."
    const a = easeOut(range(p, 0.42, 0.6));
    if (notes.current) {
      notes.current.style.opacity = `${a}`;
      notes.current.style.setProperty("--draw", `${1 - a}`);
    }
    if (art.current) {
      const t = easeOut(range(p, 0.38, 0.55));
      art.current.style.opacity = `${t}`;
      art.current.style.transform = `translateX(${(1 - t) * 6}vw)`;
    }
    if (caption.current) caption.current.style.opacity = `${a}`;

    // 5. a small body still making orbits
    if (orbit.current) {
      const th = time / 2400;
      orbit.current.setAttribute("cx", `${Math.cos(th) * 30}`);
      orbit.current.setAttribute("cy", `${Math.sin(th) * 30 * 0.2 - Math.cos(th) * 30 * 0.16}`);
    }
  });

  return (
    <section ref={section} id="lens" data-plate="01 — THE LENS" className="relative h-[340vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <BlackHole state={hole} className="absolute inset-0 h-full w-full" />

        {/* the intro sentence */}
        <div ref={intro} className="absolute inset-0 flex flex-col items-center justify-center px-6 will-change-transform">
          <p className="max-w-[min(1100px,92vw)] text-[clamp(30px,5.6vw,92px)] leading-[1.05] tracking-[-0.02em] text-ink">
            <span className="font-serif italic font-light">My name is </span>
            <span className="cast align-[0.02em] text-[0.86em]">{profile.first}&nbsp;{profile.last};</span>
            <br />
            <span className="font-serif italic font-light">and I&rsquo;m an </span>
            <span className="relative inline-block">
              <span ref={word} className="cast invisible inline-block text-[0.86em] leading-none">
                {profile.role}
              </span>
              <span className="pointer-events-none absolute -inset-x-3 -inset-y-1 border border-ink/50" />
              <span className="pointer-events-none absolute -bottom-1 -right-3 h-2 w-2 translate-x-1/2 translate-y-1/2 border border-ink/50 bg-paper" />
            </span>
          </p>
          <div className="mt-10 flex items-center gap-4 font-mono text-[10px] tracking-[0.2em] text-ink/60">
            <Ticks n={24} />
            <span ref={readout}>FOCUSING 0.30 M</span>
            <Ticks n={24} />
          </div>
        </div>

        {/* the travelling word */}
        <div
          ref={flyer}
          aria-hidden
          className="cast pointer-events-none absolute origin-top-left whitespace-nowrap text-ink will-change-transform"
          style={{ lineHeight: 1 }}
        >
          {profile.role}
        </div>

        {/* headline */}
        <h1
          ref={head}
          className="cast absolute left-[3.2vw] top-[11vh] text-[clamp(44px,7.4vw,150px)] leading-none text-ink opacity-0"
        >
          <span data-root className="inline-block">
            {profile.role}
          </span>
          <span ref={tail} className="inline-block" style={{ clipPath: "inset(0 100% 0 0)" }}>
            ING,
          </span>
          <span className="sr-only"> as art — {profile.first} {profile.last}</span>
        </h1>

        <p
          ref={art}
          className="absolute bottom-[12vh] right-[4vw] font-serif text-[clamp(44px,7.6vw,150px)] italic font-light leading-none tracking-[-0.03em] text-ink opacity-0"
        >
          as art.
        </p>

        {/* annotations around the hole, in a square measured in vh */}
        <div
          ref={notes}
          className="pointer-events-none absolute left-1/2 top-[47%] aspect-square h-[min(100svh,125vw)] -translate-x-1/2 -translate-y-1/2 opacity-0"
          style={{ ["--draw" as string]: 1 }}
        >
          <svg viewBox="-50 -50 100 100" className="absolute inset-0 h-full w-full overflow-visible">
            <g stroke="currentColor" strokeWidth="0.08" fill="none" className="text-ink/70">
              <path d="M -20 -21 L -12 -21 L -7 -8" pathLength={1} className="draw" />
              <path d="M 4 10 L 9 19 L 15 19" pathLength={1} className="draw" />
              <path d="M 12 -16 L 22 -26 L 27 -26" pathLength={1} className="draw" />
              <circle cx="-7" cy="-8" r="0.55" />
              <circle cx="4" cy="10" r="0.55" />
            </g>
            <g className="text-ink/80">
              <circle ref={orbit} cx="30" cy="0" r="0.9" fill="none" stroke="currentColor" strokeWidth="0.12" />
            </g>
          </svg>
          <Note x={-38} y={-24} align="right">
            Light arrives
            <br />
            already bent.
          </Note>
          <Note x={16} y={20}>
            Nothing leaves
            <br />
            the horizon.
          </Note>
          <Note x={28} y={-28}>
            A small body
            <br />
            still making orbits.
          </Note>
        </div>

        <div ref={caption} className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 text-center opacity-0">
          <p className="font-serif text-[13px] italic text-ink/70">The black hole</p>
          <Ticks n={40} className="mt-2" />
        </div>
      </div>
    </section>
  );
}

function Note({
  x,
  y,
  align = "left",
  children,
}: {
  x: number;
  y: number;
  align?: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <p
      className="absolute w-[18%] font-serif text-[clamp(10px,1.45vh,15px)] italic leading-[1.15] text-ink/75"
      style={{ left: `${x + 50}%`, top: `${y + 50}%`, textAlign: align }}
    >
      {children}
    </p>
  );
}

export function Ticks({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="w-px bg-ink/50" style={{ height: i % 5 === 0 ? 7 : 3 }} />
      ))}
    </span>
  );
}
