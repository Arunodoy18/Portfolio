"use client";

/**
 * 06 — NOTES · A PLANE
 * A large board you travel across: four framed words, a continuous outline, and notes between them.
 * Scrolling flies the camera along a path; dragging moves the board; the end shows the whole plane.
 */
import { useEffect, useRef } from "react";
import { notes } from "./data";
import { clamp, ease, lerp, useSectionProgress } from "./scroll";

const W = 3000;
const H = 2300;

// words and the boxes their frame runs around (board units)
const WORDS = [
  { w: "WHERE", x: 1560, y: 40 },
  { w: "ARE", x: 620, y: 545 },
  { w: "YOU", x: 1960, y: 1105 },
  { w: "GOING?", x: 1040, y: 1665 },
];

// one continuous outline that snakes around the words
const OUTLINE =
  "M 1460 -600 L 1460 300 L 1520 360 L 2720 360 L 2780 420 L 2780 470 L 2720 530 L 600 530 L 540 590 L 540 800 L 600 860 " +
  "L 1250 860 L 1480 1090 L 2720 1090 L 2780 1150 L 2780 1360 L 2720 1420 L 1000 1420 L 940 1480 L 940 1920 L 1000 1980 " +
  "L 2340 1980 L 2400 1920 L 2400 1710 L 2340 1650 L 1500 1650";

// the camera's itinerary: progress, centre x, centre y, zoom
const PATH: [number, number, number, number][] = [
  [0.0, 2080, -260, 1],
  [0.1, 2080, 200, 1],
  [0.2, 780, 330, 0.92],
  [0.31, 900, 700, 1],
  [0.42, 2050, 820, 0.9],
  [0.53, 2250, 1260, 1],
  [0.63, 760, 1200, 0.92],
  [0.74, 1650, 1820, 1],
  [0.84, 1700, 2120, 0.92],
  [0.94, 1500, 1150, -1], // -1: fit the whole plane
  [1.0, 1500, 1150, -1],
];

export default function Plane() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);
  const outline = useRef<SVGPathElement>(null);
  const drag = useRef({ on: false, x: 0, y: 0, ox: 0, oy: 0 });
  const cam = useRef({ x: PATH[0][1], y: PATH[0][2], z: 1 });

  useSectionProgress(section, (p) => {
    const el = stage.current;
    const b = board.current;
    if (!el || !b) return;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    const base = vw / (vw < 768 ? 820 : 1600);
    const fit = Math.min(vw / (W + 160), vh / (H + 200)) / base;

    // where the path says the camera should be
    let i = 0;
    while (i < PATH.length - 2 && p > PATH[i + 1][0]) i++;
    const [p0, x0, y0, z0] = PATH[i];
    const [p1, x1, y1, z1] = PATH[i + 1];
    const t = ease(clamp((p - p0) / Math.max(1e-6, p1 - p0)));
    const za = z0 < 0 ? fit : z0;
    const zb = z1 < 0 ? fit : z1;
    const tx = lerp(x0, x1, t);
    const ty = lerp(y0, y1, t);
    const tz = lerp(za, zb, t);

    // follow it softly; the drag offset relaxes back once you let go
    const c = cam.current;
    c.x += (tx - c.x) * 0.12;
    c.y += (ty - c.y) * 0.12;
    c.z += (tz - c.z) * 0.12;
    const d = drag.current;
    if (!d.on) {
      d.ox *= 0.94;
      d.oy *= 0.94;
    }
    const S = base * c.z;
    const left = vw / 2 - c.x * S + d.ox;
    const top = vh / 2 - c.y * S + d.oy;
    b.style.transform = `translate3d(${left}px, ${top}px, 0) scale(${S})`;

    // the outline draws itself as you travel
    if (outline.current) outline.current.style.strokeDashoffset = `${1 - clamp(p * 1.15)}`;

    if (readout.current) {
      const cx = (vw / 2 - left) / S / 100;
      const cy = (vh / 2 - top) / S / 100;
      const sc = 1 / c.z;
      readout.current.textContent = `X ${cx.toFixed(1).padStart(5)}  Y ${cy.toFixed(1).padStart(5)}  SCALE 1 : ${sc < 1.05 ? "1" : sc.toFixed(1)}  ${
        d.on ? "MOVING" : Math.abs(tx - c.x) + Math.abs(ty - c.y) > 4 ? "TRAVELLING" : "GOING STILL"
      }`;
    }
  });

  // drag the plane
  useEffect(() => {
    const el = stage.current!;
    const d = drag.current;
    let px = 0, py = 0;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "touch") return; // touch keeps scrolling the page
      if ((e.target as HTMLElement).closest("a,button")) return;
      d.on = true;
      px = e.clientX;
      py = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (!d.on) return;
      d.ox += e.clientX - px;
      d.oy += e.clientY - py;
      px = e.clientX;
      py = e.clientY;
    };
    const up = () => {
      d.on = false;
      el.style.cursor = "";
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, []);

  const toEnd = () => {
    const s = section.current!;
    window.scrollTo({ top: s.offsetTop + (s.offsetHeight - window.innerHeight) * 0.97, behavior: "smooth" });
  };

  return (
    <section ref={section} id="notes" data-plate="06 — NOTES" className="relative h-[1500vh] bg-paper">
      <div ref={stage} className="sticky top-0 h-[100svh] cursor-grab overflow-hidden select-none">
        <div ref={board} className="absolute left-0 top-0 origin-top-left will-change-transform" style={{ width: W, height: H }}>
          <svg className="absolute inset-0 overflow-visible text-ink" width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden>
            <path
              ref={outline}
              d={OUTLINE}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={5}
              strokeLinejoin="miter"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>

          <h2 className="sr-only">Where are you going? Notes on the work.</h2>
          {WORDS.map((w) => (
            <span
              key={w.w}
              aria-hidden
              className="cast absolute whitespace-nowrap leading-none text-ink"
              style={{ left: w.x, top: w.y, fontSize: 400 }}
            >
              {w.w}
            </span>
          ))}

          {notes.map((n) => (
            <article key={n.id} className="absolute flex gap-6 text-ink" style={{ left: n.x, top: n.y, width: n.image ? (n.w ?? 360) + 340 : 360 }}>
              {n.image && (
                <div
                  className="shrink-0 bg-cover bg-center grayscale-[0.35]"
                  style={{ width: n.w ?? 300, height: (n.w ?? 300) * (n.kind === "Photographs" ? 1.25 : 0.78), backgroundImage: `url(${n.image})` }}
                  role="img"
                  aria-label={n.title}
                />
              )}
              <div className="flex w-[340px] shrink-0 flex-col justify-end">
                <p className="flex justify-between font-mono text-[13px] tracking-[0.2em] text-ink/50">
                  <span>{n.id}</span>
                  <span>{n.kind.toUpperCase()}</span>
                </p>
                <h3 className="mt-4 text-[34px] font-medium leading-[1.05] tracking-[-0.01em]">{n.title}</h3>
                <p className="mt-3 text-[19px] leading-snug text-ink/65">{n.body}</p>
                <p className="mt-5 flex items-center justify-between border-t border-ink/25 pt-3 font-mono text-[13px] tracking-[0.18em] text-ink/70">
                  {n.href ? (
                    <a href={n.href} target="_blank" rel="noreferrer" data-cursor="hover" className="link-u text-ink">
                      {(n.link ?? "Read").toUpperCase()} →
                    </a>
                  ) : (
                    <span>FROM THE ROAD</span>
                  )}
                  <span>{n.year}</span>
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* instruments */}
        <div className="pointer-events-none absolute inset-x-[3.2vw] bottom-[6.5vh] flex items-end justify-between gap-4 font-mono text-[9.5px] tracking-[0.2em] text-ink/65">
          <span className="hidden whitespace-pre md:inline">
            DRAG — OR SCROLL&nbsp;&nbsp;·&nbsp;&nbsp;<span ref={readout} />
          </span>
          <span className="pointer-events-auto flex gap-2">
            <button type="button" onClick={toEnd} data-cursor="hover" className="border border-ink/40 px-2.5 py-1 transition-colors hover:bg-ink hover:text-paper">
              THE WHOLE PLANE
            </button>
            <a href="#lens" data-cursor="hover" className="border border-ink/40 px-2.5 py-1 transition-colors hover:bg-ink hover:text-paper">
              ↑ BACK UP THE PAGE
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
