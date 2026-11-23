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

const INK_FILTER = "grayscale(1) contrast(1.6) brightness(0.42)";

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
              </span>
            ))}
          </h2>
        </div>
      </section>
      <Contact />
    </>
  );
}

function Contact() {
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

  const links = [
    { label: "Email", href: `mailto:${profile.email}`, note: profile.email },
    { label: "GitHub", href: profile.github, note: "Arunodoy18" },
    { label: "LinkedIn", href: profile.linkedin, note: "arunodoy-banerjee" },
    { label: "LeetCode", href: profile.leetcode, note: "Arunodoy45" },
  ];

  return (
    <section id="contact" data-plate="06 — NOTES" className="relative bg-ink px-[3.2vw] pb-8 pt-[16vh] text-paper">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-mono text-[10px] tracking-[0.25em] text-paper/50">06 — NOTES</p>
          <p className="mt-6 max-w-[22ch] font-serif text-[clamp(32px,4.6vw,84px)] font-light italic leading-[1.02] tracking-[-0.02em]">
            If it has to work when everything else doesn&rsquo;t, write to me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="cast link-u mt-10 inline-block break-all text-[clamp(26px,4.4vw,84px)] leading-none"
          >
            {profile.email.toUpperCase()}
          </a>
        </div>
        <ul className="self-end md:col-span-4 md:col-start-9">
          {links.map((l) => (
            <li key={l.label} className="border-t border-paper/15">
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="hover"
                className="group flex items-baseline justify-between py-3"
              >
                <span className="cast text-[clamp(22px,2.2vw,36px)] leading-none transition-transform duration-500 group-hover:translate-x-2">
                  {l.label.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-paper/50">{l.note} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-[14vh] flex flex-col gap-3 border-t border-paper/15 pt-4 font-mono text-[10px] tracking-[0.18em] text-paper/55 md:flex-row md:items-center md:justify-between">
        <span>
          <span className="tabular-nums text-paper">{time}</span> · LOCAL TIME IN {profile.place.toUpperCase()}
        </span>
        <span>SET IN ARCHIVO, NEWSREADER &amp; GEIST</span>
        <span>© {new Date().getFullYear()} {profile.first} {profile.last}</span>
        <a href="#lens" data-cursor="hover" className="link-u text-paper">
          ↑ BACK TO THE LENS
        </a>
      </div>
    </section>
  );
}
