"use client";

import { useEffect, useRef, useState } from "react";
import { images, profile } from "./data";
import { ease, easeOut, lerp, range, useSectionProgress } from "./scroll";

const WORDS = [
  { w: "WHERE", x: 10, y: -20, img: 0 },
  { w: "ARE", x: -14, y: -8, img: 1 },
  { w: "YOU", x: 12, y: 3, img: 2 },
  { w: "GOING?", x: -1, y: 15, img: 3 },
];

const INK_FILTER = "var(--imgtext)";

const SHARDS = [
  { x: -30, y: -26, w: 7, h: 9 },
  { x: -18, y: -22, w: 5, h: 5 },
  { x: 26, y: -12, w: 6, h: 4 },
  { x: -28, y: 6, w: 5, h: 8 },
  { x: -7, y: -1, w: 5, h: 5 },
  { x: 30, y: 12, w: 8, h: 5 },
  { x: -20, y: 22, w: 6, h: 6 },
  { x: 20, y: 26, w: 5, h: 4 },
  { x: 4, y: -30, w: 4, h: 6 },
  { x: -4, y: 30, w: 7, h: 4 },
];

export default function Notes() {
  const section = useRef<HTMLElement>(null);
  const words = useRef<HTMLDivElement>(null);
  const shards = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);

  useSectionProgress(section, (p) => {
    const vw = window.innerWidth / 100;
    const vh = window.innerHeight / 100;
    words.current?.querySelectorAll<HTMLElement>("[data-w]").forEach((el, i) => {
      const w = WORDS[i];
      const inT = easeOut(range(p, 0.04 + i * 0.1, 0.14 + i * 0.1)); // arrives from depth
      const settle = ease(range(p, 0.48, 0.7));
      const big = lerp(0.2, 1, inT);
      const scale = lerp(big, 0.3, settle);
      const x = lerp(0, w.x * vw, settle);
      const y = lerp(0, w.y * vh, settle);
      // while a newer word is arriving, the previous big one drifts past the camera
      const pushed = i < 3 ? easeOut(range(p, 0.06 + (i + 1) * 0.1, 0.14 + (i + 1) * 0.1)) * (1 - settle) : 0;
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale * (1 + pushed * 0.9)})`;
      el.style.opacity = `${Math.min(inT, 1 - Math.min(1, pushed * 1.6))}`;
      el.style.filter = `${INK_FILTER} blur(${pushed * 6}px)`;
    });
    const s = range(p, 0.5, 0.85);
    shards.current?.querySelectorAll<HTMLElement>("[data-s]").forEach((el, i) => {
      const t = easeOut(range(s, i * 0.05, i * 0.05 + 0.5));
      const d = SHARDS[i];
      el.style.transform = `translate(-50%, -50%) translate(${d.x * vw * t}px, ${d.y * vh * t}px) scale(${lerp(0.1, 1, t)})`;
      el.style.opacity = `${t}`;
    });
    if (line.current) line.current.style.strokeDashoffset = `${1 - ease(range(p, 0.1, 0.6))}`;
  });

  return (
    <>
      <Contact />
      <section ref={section} id="notes" data-plate="06 — NOTES" className="relative h-[340vh] bg-paper">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <svg className="absolute inset-0 h-full w-full text-ink" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <path
              ref={line}
              d="M -2 18 L 14 40 L 22 64 L 70 66"
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
            />
          </svg>

          <div ref={shards} aria-hidden>
            {SHARDS.map((d, i) => (
              <div
                key={i}
                data-s
                className="absolute left-1/2 top-1/2 bg-cover opacity-0"
                style={{
                  width: `${d.w}vw`,
                  height: `${d.h}vw`,
                  backgroundImage: `url(${images[i % images.length]})`,
                  backgroundPosition: `${(i * 31) % 100}% ${(i * 17) % 100}%`,
                  backgroundSize: "500%",
                  filter: i === 4 ? undefined : "grayscale(1) contrast(1.2)",
                }}
              />
            ))}
          </div>

          <h2 ref={words} className="absolute inset-0" aria-label="Where are you going?">
            {WORDS.map((w) => (
              <span
                key={w.w}
                data-w
                aria-hidden
                className="cast image-text absolute left-1/2 top-1/2 whitespace-nowrap text-[clamp(120px,22vw,420px)] leading-[0.85] opacity-0 will-change-transform"
                style={{ backgroundImage: `url(${images[w.img]})`, filter: INK_FILTER }}
              >
                {w.w}
                <svg
                  aria-hidden
                  className="pointer-events-none absolute -inset-x-[0.14em] -inset-y-[0.06em] h-[calc(100%+0.12em)] w-[calc(100%+0.28em)] overflow-visible"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 6 0 L 100 0 L 100 72 L 93 100 L 0 100 L 0 28 Z M 0 100 L -60 100"
                    fill="none"
                    stroke="var(--color-ink)"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            ))}
          </h2>
        </div>
      </section>
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
    { label: "LeetCode", href: profile.leetcode, note: "Arunodoy45" },
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
        <ul className="grid grid-cols-3 gap-[1.2vw] pt-[6vh] md:col-span-7">
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

/** a grid pulled into a well, with the well's rings: drawn once */
export function Wormhole({ className = "" }: { className?: string }) {
  const lines: string[] = [];
  const cx = 50, cy = 62;
  const warp = (x: number, y: number) => {
    const dx = x - cx, dy = y - cy;
    const r = Math.hypot(dx, dy) + 0.001;
    const pull = 260 / (r * r + 60);
    return [x - dx * pull * 0.9, y - dy * pull * 0.9 + pull * 6];
  };
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
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke">
        {lines.map((pts, i) => (
          <polyline key={i} points={pts} vectorEffect="non-scaling-stroke" strokeDasharray={i % 4 === 0 ? "0" : "1.5 2.5"} />
        ))}
        {[2, 4, 7, 11].map((r, i) => (
          <ellipse key={r} cx={cx} cy={cy + 3} rx={r} ry={r * 0.55} vectorEffect="non-scaling-stroke" opacity={1 - i * 0.18} />
        ))}
      </g>
    </svg>
  );
}
