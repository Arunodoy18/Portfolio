"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "./data";
import Plane from "./Plane";

export default function Notes() {
  return (
    <>
      <Contact />
      <Plane />
      <Footer />
    </>
  );
}

function useLocalTime() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const tiles = [
    { label: "GitHub", href: profile.github, note: "Arunodoy18" },
    { label: "LinkedIn", href: profile.linkedin, note: "arunodoy-banerjee" },
    { label: "LeetCode", href: profile.leetcode, note: "Arunodoy_45" },
    { label: "Resume", href: profile.resume, note: "PDF · download" },
  ];
  return (
    <section id="contact" data-plate="05 — RESOLUTION" className="relative overflow-hidden bg-paper px-[3.2vw] pb-[12vh] pt-[14vh] text-ink">
      <Wormhole className="pointer-events-none absolute bottom-[-12vh] left-[18%] h-[70vh] w-[70vw] text-ink/35" />

      <div className="relative grid gap-[1.2vw] md:grid-cols-12">
        {/* the banner */}
        <div className="relative flex flex-col justify-center bg-ink px-[2.4vw] py-[4vh] text-paper md:col-span-9">
          <h2 className="cast text-[clamp(40px,7.4vw,150px)] leading-[0.86]">
            <span className="block">Full resolution</span>
            <span className="block text-paper/45">is a conversation</span>
          </h2>
          <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-paper/55">05 — RESOLUTION · OPEN TO INTERNSHIPS, COLLABORATIONS &amp; HARD PROBLEMS</p>
        </div>
        <figure className="relative min-h-[30vh] overflow-hidden bg-ink md:col-span-3">
          <div
            className="absolute inset-0 bg-cover bg-top grayscale contrast-125 transition duration-700 hover:grayscale-0"
            style={{ backgroundImage: "url(/work/contact.jpg)" }}
            role="img"
            aria-label={`${profile.first} ${profile.last} in the hills of Sikkim`}
          />
        </figure>

        {/* the address */}
        <div className="pt-[6vh] md:col-span-5">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="link-u font-serif text-[clamp(26px,3.2vw,56px)] font-light italic leading-none tracking-[-0.02em]"
          >
            {profile.email}
          </a>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              data-cursor="hover"
              onClick={() => {
                navigator.clipboard?.writeText(profile.email).then(() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                });
              }}
              className="border border-ink px-2.5 py-1 font-mono text-[9.5px] tracking-[0.2em] transition-colors hover:bg-ink hover:text-paper"
            >
              {copied ? "COPIED" : "COPY ADDRESS"}
            </button>
            <span className="self-center font-mono text-[9.5px] tracking-[0.18em] text-ink/50">REPLIES WITHIN A DAY</span>
          </div>
          <p className="mt-8 max-w-[34ch] font-serif text-[clamp(15px,1.25vw,19px)] italic leading-snug text-ink/70">
            If it has to work when everything else doesn&rsquo;t, write to me. I read every message.
          </p>
        </div>

        {/* the tiles */}
        <ul className="grid grid-cols-2 gap-[1.2vw] pt-[6vh] sm:grid-cols-4 md:col-span-7">
          {tiles.map((t) => (
            <li key={t.label}>
              <a href={t.href} target="_blank" rel="noreferrer" data-cursor="hover" className="group block">
                <span className="cast block text-[clamp(18px,2.4vw,42px)] leading-none">{t.label.toUpperCase()}</span>
                <span className="mt-3 flex aspect-[4/3] items-end justify-between border border-ink bg-ink p-3 font-mono text-[9.5px] tracking-[0.15em] text-paper transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
                  <span>{t.note}</span>
                  <span>↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Footer() {
  const time = useLocalTime();
  return (
    <footer className="relative bg-paper px-[3.2vw] pb-8 pt-6 text-ink">
      <div className="flex flex-col gap-3 border-t border-ink/15 pt-4 font-mono text-[10px] tracking-[0.18em] text-ink/55 md:flex-row md:items-center md:justify-between">
        <span>
          <span className="tabular-nums text-ink">{time}</span> · LOCAL TIME IN {profile.place.toUpperCase()}
        </span>
        <span>SET IN ARCHIVO, NEWSREADER &amp; GEIST</span>
        <span>
          © {new Date().getFullYear()} {profile.first} {profile.last}
        </span>
        <a href="#lens" data-cursor="hover" className="link-u text-ink">
          ↑ BACK TO THE LENS
        </a>
      </div>
    </footer>
  );
}

/** a grid pulled into a well; the well drifts toward the cursor when it is over the drawing */
export function Wormhole({ className = "" }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);
  const restX = 50, restY = 62;

  const build = (cx: number, cy: number) => {
    const warp = (x: number, y: number) => {
      const dx = x - cx, dy = y - cy;
      const r = Math.hypot(dx, dy) + 0.001;
      const pull = 260 / (r * r + 60);
      return [x - dx * pull * 0.9, y - dy * pull * 0.9 + pull * 6];
    };
    const lines: string[] = [];
    for (let i = 0; i <= 20; i++) {
      const v = i * 5;
      const h: string[] = [], w: string[] = [];
      for (let j = 0; j <= 40; j++) {
        const t = j * 2.5;
        const [x1, y1] = warp(t, v);
        const [x2, y2] = warp(v, t);
        h.push(`${x1.toFixed(2)},${y1.toFixed(2)}`);
        w.push(`${x2.toFixed(2)},${y2.toFixed(2)}`);
      }
      lines.push(h.join(" "), w.join(" "));
    }
    return lines;
  };
  const initial = build(restX, restY);

  useEffect(() => {
    const el = svg.current!;
    const lines = Array.from(el.querySelectorAll("polyline"));
    const rings = Array.from(el.querySelectorAll("ellipse"));
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const c = { x: restX, y: restY };
    const target = { x: restX, y: restY };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      target.x = inside ? ((e.clientX - r.left) / r.width) * 100 : restX;
      target.y = inside ? ((e.clientY - r.top) / r.height) * 100 : restY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      const nx = c.x + (target.x - c.x) * 0.08, ny = c.y + (target.y - c.y) * 0.08;
      if (Math.abs(nx - c.x) + Math.abs(ny - c.y) < 0.02) return;
      c.x = nx;
      c.y = ny;
      build(c.x, c.y).forEach((pts, i) => lines[i]?.setAttribute("points", pts));
      rings.forEach((r) => {
        r.setAttribute("cx", c.x.toFixed(2));
        r.setAttribute("cy", (c.y + 3).toFixed(2));
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <svg ref={svg} viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {initial.map((pts, i) => (
          <polyline key={i} points={pts} vectorEffect="non-scaling-stroke" strokeDasharray={i % 4 === 0 ? "0" : "1.5 2.5"} />
        ))}
        {[2, 4, 7, 11].map((r, i) => (
          <ellipse key={r} cx={restX} cy={restY + 3} rx={r} ry={r * 0.55} vectorEffect="non-scaling-stroke" opacity={1 - i * 0.18} />
        ))}
      </g>
    </svg>
  );
}
