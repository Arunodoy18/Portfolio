"use client";

import { useEffect, useRef } from "react";
import { profile } from "./data";
import { Wormhole } from "./Notes";
import { easeOut, range, useSectionProgress } from "./scroll";

const STEPS = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 160];

export default function Bio() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sampled = useRef<HTMLSpanElement>(null);
  const img = useRef<HTMLImageElement | null>(null);
  const lastN = useRef(0);
  const reveal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = new Image();
    i.src = "/work/portrait.jpg";
    i.onload = () => {
      img.current = i;
      lastN.current = 0;
    };
  }, []);

  const draw = (n: number) => {
    const c = canvas.current;
    const i = img.current;
    if (!c || !i) return;
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== Math.round(w * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      lastN.current = 0;
    }
    if (n === lastN.current) return;
    lastN.current = n;
    const ctx = c.getContext("2d")!;
    // sample an n x m grid of the photo (cover-fit, centred on the figure)
    const m = Math.max(1, Math.round((n * h) / w));
    const off = document.createElement("canvas");
    off.width = n;
    off.height = m;
    const o = off.getContext("2d")!;
    // cover-fit the (already portrait-cropped) photo into the frame
    const ar = w / h, iar = i.width / i.height;
    const sw = iar > ar ? i.height * ar : i.width;
    const sh = iar > ar ? i.height : i.width / ar;
    const sx = (i.width - sw) / 2, sy = (i.height - sh) * 0.25;
    o.filter = "grayscale(1) contrast(1.15)";
    o.drawImage(i, sx, sy, sw, sh, 0, 0, n, m);
    ctx.imageSmoothingEnabled = n >= 160;
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(off, 0, 0, n, m, 0, 0, c.width, c.height);
  };

  useSectionProgress(section, (p) => {
    const s = range(p, 0.0, 0.55);
    const n = STEPS[Math.min(STEPS.length - 1, Math.floor(s * STEPS.length))];
    draw(n);
    if (sampled.current) sampled.current.textContent = n >= 160 ? "FULL" : `${n} × ${n}`;
    reveal.current?.querySelectorAll<HTMLElement>("[data-r]").forEach((el) => {
      const d = Number(el.dataset.r);
      const t = easeOut(range(p, -0.02 + d * 0.06, 0.18 + d * 0.06));
      el.style.opacity = `${t}`;
      el.style.transform = `translateY(${(1 - t) * 40}px)`;
      el.style.clipPath = `inset(0 0 ${(1 - t) * 100}% 0)`;
    });
  });

  return (
    <section ref={section} id="about" data-plate={`04 — ${profile.first}`} className="relative bg-paper md:h-[260vh]">
      <div ref={reveal} className="grid grid-cols-12 gap-x-3 gap-y-6 px-[3.2vw] pb-[10vh] pt-[12vh] md:sticky md:top-0 md:h-[100svh] md:grid-rows-[auto_1fr_auto] md:gap-x-[1.2vw] md:gap-y-[2vh] md:overflow-hidden md:pb-[8vh] md:pt-[9vh]">
        <h2 data-r="0" className="cast col-span-12 text-[clamp(56px,11.5vw,230px)] leading-[0.8] text-ink md:col-span-7">
          {profile.first}
        </h2>

        {/* dotted field */}
        <div data-r="2" className="relative col-span-5 hidden border border-ink/10 md:block">
          <Wormhole className="absolute inset-0 h-full w-full text-ink/45" />
          <div className="absolute right-3 top-3 text-right font-mono text-[9px] leading-relaxed tracking-[0.18em] text-ink/60">
            {profile.place.toUpperCase()}
            <br />
            {profile.coords}
          </div>
          <p className="absolute bottom-3 left-3 max-w-[34ch] font-mono text-[9px] leading-relaxed text-ink/60">
            Sampled where the mountains meet the river. Built for the places the network forgets.
          </p>
        </div>

        {/* portrait */}
        <figure data-r="1" className="relative col-span-6 aspect-[3/4] md:col-span-3 md:aspect-auto">
          <canvas ref={canvas} className="h-full w-full bg-ink/5" aria-label={`Portrait of ${profile.first} ${profile.last}`} />
          <figcaption className="absolute -bottom-6 left-0 font-mono text-[9px] tracking-[0.2em] text-ink/60">
            SAMPLED AT <span ref={sampled}>1 × 1</span>
          </figcaption>
        </figure>

        {/* field notes */}
        <div data-r="3" className="col-span-6 flex flex-col justify-between font-mono text-[10px] leading-relaxed text-ink/75 md:col-span-3">
          <div>
            <p className="mb-3 tracking-[0.2em] text-ink/50">FIELD NOTES</p>
            <p>Backend-first. Java, Python and distributed systems by trade; Android, extensions and agents when the problem calls for it.</p>
            <p className="mt-3">I build software for the moments it is needed most: when the network is gone, when the page is confusing, when the habit needs to become a skill.</p>
          </div>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[9px] tracking-[0.12em]">
            <dt className="text-ink/45">STUDY</dt>
            <dd>B.TECH CSE · AI &amp; ML</dd>
            <dt className="text-ink/45">AT</dt>
            <dd>SMIT, {profile.placeShort}</dd>
            <dt className="text-ink/45">YEARS</dt>
            <dd>{profile.years}</dd>
            <dt className="text-ink/45">NOW</dt>
            <dd>SHIPPING &amp; OPEN SOURCE</dd>
          </dl>
        </div>

        {/* dark panel */}
        <div data-r="4" className="relative col-span-12 min-h-[34vh] overflow-hidden bg-ink text-paper md:col-span-6 md:min-h-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-25 blur-[2px] grayscale" style={{ backgroundImage: "url(/work/zone.jpg)" }} />
          <div className="absolute left-4 top-4 font-mono text-[9px] leading-relaxed tracking-[0.18em] text-paper/80">
            <p>ROLE · {profile.role}</p>
            <p>FOCUS · BACKEND · SYSTEMS · AI</p>
            <p>THE WORK OF {profile.first} — IN SOFTWARE, A RETROSPECTIVE</p>
          </div>
          <p className="cast absolute bottom-2 right-4 text-[clamp(48px,9.5vw,190px)] leading-[0.8]">{profile.last}</p>
        </div>

        <div data-r="5" className="col-span-12 flex items-end gap-6">
          <span className="cast text-[clamp(40px,5vw,90px)] leading-none text-ink/80">04</span>
          <p className="max-w-[60ch] pb-1 font-serif text-[clamp(14px,1.25vw,19px)] italic leading-snug text-ink/75">
            {profile.first.charAt(0) + profile.first.slice(1).toLowerCase()} {profile.last.charAt(0) + profile.last.slice(1).toLowerCase()}, introduced at increasing resolution. An engineer
            who treats a system the way an artist treats a frame: what you leave out matters as much as what you put in.
          </p>
        </div>
      </div>
    </section>
  );
}
