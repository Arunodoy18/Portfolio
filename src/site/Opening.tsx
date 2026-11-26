"use client";

import { useEffect, useRef } from "react";
import BlackHole, { type HoleState } from "./BlackHole";
import { profile } from "./data";
import { clamp, ease, easeOut, lerp, range, useSectionProgress } from "./scroll";

type Rest = { x: number; y: number }[];

/** Letters spiral into the hole: radius collapses, angle winds, the orbit flattens into the disk plane. */
function swallow(spans: HTMLElement[], rest: Rest, hx: number, hy: number, t: number, swirl: number) {
  if (!rest.length) return;
  const maxR = Math.max(...rest.map((r) => Math.hypot(r.x - hx, r.y - hy)), 1);
  spans.forEach((el, i) => {
    const r0 = rest[i];
    if (!r0) return;
    if (t <= 0) {
      el.style.transform = "";
      el.style.opacity = "";
      el.style.color = "";
      return;
    }
    const dx = r0.x - hx, dy = r0.y - hy;
    const R = Math.hypot(dx, dy);
    const th0 = Math.atan2(dy, dx);
    // nearer letters fall first
    const k = clamp(t * 1.45 - (R / maxR) * 0.45);
    const e = k * k;
    const R1 = R * (1 - e);
    const th = th0 + swirl * e * 2.4;
    const x = hx + Math.cos(th) * R1;
    const y = hy + Math.sin(th) * R1 * lerp(1, 0.42, e);
    el.style.transform = `translate(${x - r0.x}px, ${y - r0.y}px) rotate(${swirl * e * 140}deg) scale(${1 - 0.75 * e})`;
    el.style.opacity = `${1 - range(e, 0.72, 1)}`;
    // light reddens as it is stretched into the well
    const red = Math.sin(Math.min(1, e * 1.4) * Math.PI);
    el.style.color = `rgb(${lerp(11, 139, red)}, ${lerp(12, 30, red)}, ${lerp(15, 63, red)})`;
  });
}

function measure(stage: HTMLElement, spans: HTMLElement[], clear: HTMLElement[]): Rest {
  const prev = clear.map((el) => el.style.transform);
  clear.forEach((el) => (el.style.transform = "none"));
  spans.forEach((el) => (el.style.transform = "none"));
  const o = stage.getBoundingClientRect();
  const rest = spans.map((el) => {
    const r = el.getBoundingClientRect();
    return { x: r.left - o.left + r.width / 2, y: r.top - o.top + r.height / 2 };
  });
  clear.forEach((el, i) => (el.style.transform = prev[i]));
  return rest;
}

const Letters = ({ text }: { text: string }) => (
  <>
    {text.split("").map((c, i) =>
      c === " " ? (
        <span key={i}>&nbsp;</span>
      ) : (
        <span key={i} data-c className="inline-block will-change-transform">
          {c}
        </span>
      ),
    )}
  </>
);

export default function Opening() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const intro = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLSpanElement>(null);
  const flyer = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLParagraphElement>(null);
  const tail = useRef<HTMLSpanElement>(null);
  const art = useRef<HTMLParagraphElement>(null);
  const welcome = useRef<HTMLDivElement>(null);
  const notes = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const caption = useRef<HTMLDivElement>(null);
  const orbit = useRef<SVGCircleElement>(null);
  const black = useRef<HTMLDivElement>(null);

  const hole = useRef<HoleState>({ focus: 0, cx: 0.5, cy: 0.53, scale: 1, zoom: 0 });
  const geo = useRef({ dx: 0, dy: 0, s: 1 });
  const rest = useRef<{ head: Rest; art: Rest; welcome: Rest }>({ head: [], art: [], welcome: [] });

  const spansOf = (el: HTMLElement | null) => (el ? Array.from(el.querySelectorAll<HTMLElement>("[data-c]")) : []);

  useEffect(() => {
    const run = () => {
      if (!word.current || !head.current || !flyer.current || !stage.current) return;
      // where the intro word must fly to become the headline
      const o = stage.current.getBoundingClientRect();
      const a = word.current.getBoundingClientRect();
      const b = head.current.querySelector("[data-root]")!.getBoundingClientRect();
      geo.current = { dx: b.left - a.left, dy: b.top - a.top, s: b.height / a.height };
      flyer.current.style.left = `${a.left - o.left}px`;
      flyer.current.style.top = `${a.top - o.top}px`;
      flyer.current.style.fontSize = getComputedStyle(word.current).fontSize;
      // resting place of every letter that will be swallowed
      rest.current = {
        head: measure(stage.current, spansOf(head.current), []),
        art: measure(stage.current, spansOf(art.current), [art.current!]),
        welcome: measure(stage.current, spansOf(welcome.current), [welcome.current!]),
      };
    };
    run();
    document.fonts?.ready.then(run);
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  useSectionProgress(section, (p, time) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const h = hole.current;

    // which plate we are on
    const plate = p < 0.47 ? "01 — THE LENS" : p < 0.8 ? "02 — THE EYE" : "03 — THE OTHER SIDE";
    if (section.current && section.current.dataset.plate !== plate) section.current.dataset.plate = plate;

    // 1. intro sentence
    const out = ease(range(p, 0.04, 0.14));
    if (intro.current) {
      intro.current.style.opacity = `${1 - out}`;
      intro.current.style.filter = `blur(${out * 10}px)`;
      intro.current.style.transform = `scale(${1 + out * 0.06})`;
      intro.current.style.visibility = out >= 1 ? "hidden" : "visible";
    }

    // 2. the word ENGINEER flies to the headline
    const fly = ease(range(p, 0.05, 0.16));
    const g = geo.current;
    if (flyer.current) {
      flyer.current.style.transform = `translate(${g.dx * fly}px, ${g.dy * fly}px) scale(${lerp(1, g.s, fly)})`;
      flyer.current.style.opacity = fly >= 1 ? "0" : "1";
    }
    if (head.current) head.current.style.opacity = fly >= 1 ? "1" : "0";
    if (tail.current) {
      const t = easeOut(range(p, 0.155, 0.2));
      tail.current.style.clipPath = t >= 1 ? "none" : `inset(-50% ${100 - t * 100}% -50% 0)`;
    }

    // 3. the hole comes into focus, then the camera falls toward it, then through it
    const f = ease(range(p, 0.06, 0.22));
    const z = ease(range(p, 0.36, 0.54));
    const d = range(p, 0.74, 0.97);
    h.focus = f;
    h.zoom = z;
    h.cy = lerp(lerp(0.53, 0.34, z), 0.5, ease(d));
    h.scale = (lerp(0.78, 0.9, f) + z * 0.6) * Math.exp(Math.pow(d, 1.6) * 3.3);
    if (readout.current) {
      const m = lerp(0.3, 4.2, f);
      readout.current.textContent = f >= 1 ? "IN FOCUS" : `FOCUSING ${m.toFixed(2)} M`;
    }

    // 4. annotations & "as art." arrive...
    const a = easeOut(range(p, 0.2, 0.28)) * (1 - range(p, 0.34, 0.4));
    if (notes.current) {
      notes.current.style.opacity = `${a}`;
      notes.current.style.setProperty("--draw", `${1 - easeOut(range(p, 0.2, 0.28))}`);
    }
    if (caption.current) caption.current.style.opacity = `${a}`;
    if (art.current) {
      const t = easeOut(range(p, 0.18, 0.26));
      art.current.style.opacity = `${t}`;
      art.current.style.transform = `translateX(${(1 - t) * 6}vw)`;
    }

    // 5. ...and are swallowed
    const hx = vw * h.cx, hy = vh * (1 - h.cy);
    const sw = range(p, 0.34, 0.5);
    swallow(spansOf(head.current), rest.current.head, hx, hy, sw, -1);
    swallow(spansOf(art.current), rest.current.art, hx, hy, range(p, 0.36, 0.52), 1);

    // 6. Welcome.
    if (welcome.current) {
      const w = easeOut(range(p, 0.5, 0.57));
      welcome.current.style.opacity = `${w}`;
      welcome.current.style.filter = w < 1 ? `blur(${(1 - w) * 8}px)` : "none";
      welcome.current.style.transform = `translateY(${(1 - w) * 30}px)`;
    }
    swallow(spansOf(welcome.current), rest.current.welcome, hx, hy, range(p, 0.64, 0.75), -1);

    // 7. inside: nothing but dark
    if (black.current) black.current.style.opacity = `${range(p, 0.86, 0.96)}`;

    // a small body still making orbits
    if (orbit.current) {
      const th = time / 2400;
      orbit.current.setAttribute("cx", `${Math.cos(th) * 30}`);
      orbit.current.setAttribute("cy", `${Math.sin(th) * 30 * 0.2 - Math.cos(th) * 30 * 0.16}`);
    }
  });

  return (
    <section ref={section} id="lens" data-plate="01 — THE LENS" className="relative h-[640vh]">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
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
        <p
          ref={head}
          className="cast absolute left-[3.2vw] top-[11vh] whitespace-nowrap text-[clamp(44px,7.4vw,150px)] leading-none text-ink opacity-0"
        >
          <span data-root aria-hidden className="inline-block">
            <Letters text={profile.role} />
          </span>
          <span ref={tail} aria-hidden className="inline-block" style={{ clipPath: "inset(-50% 100% -50% 0)" }}>
            <Letters text="ING," />
          </span>
        </p>

        <p
          ref={art}
          className="absolute bottom-[12vh] right-[4vw] whitespace-nowrap font-serif text-[clamp(44px,7.6vw,150px)] italic font-light leading-none tracking-[-0.03em] text-ink opacity-0"
        >
          <Letters text="as art." />
        </p>

        {/* Welcome. */}
        <div ref={welcome} className="absolute inset-x-0 top-[9vh] text-center opacity-0">
          <p className="font-serif text-[clamp(40px,5.4vw,96px)] italic font-light leading-none tracking-[-0.03em] text-ink">
            <Letters text="Welcome." />
          </p>
          <p className="cast mt-3 text-[clamp(10px,0.8vw,13px)] tracking-[0.12em] text-ink">
            <Letters text={`AN ${profile.first} EXPERIENCE.`} />
          </p>
        </div>

        <div ref={black} aria-hidden className="pointer-events-none absolute inset-0 bg-black opacity-0" />

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
