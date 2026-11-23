"use client";

import { useEffect, useRef, useState } from "react";
import Glyph from "./Glyph";
import { projects, type Project } from "./data";

const KINDS = ["All", "App", "Extension", "Platform", "System", "Agent"] as const;

export default function Works() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const list = projects.filter((p) => kind === "All" || p.kind === kind);

  return (
    <section id="work" data-plate="05 — WORKS" className="relative bg-paper px-[3.2vw] pb-[14vh] pt-[18vh]">
      <MapBackdrop />
      <div className="relative grid grid-cols-1 gap-y-12 md:grid-cols-12 md:gap-x-[1.2vw]">
        <aside className="md:sticky md:top-[12vh] md:col-span-4 md:h-fit">
          <p className="font-mono text-[10px] tracking-[0.25em] text-ink/50">05 — WORKS</p>
          <h2 className="cast mt-3 text-[clamp(64px,9vw,180px)] leading-[0.8] text-ink">WORKS</h2>
          <p className="mt-6 max-w-[34ch] font-serif text-[clamp(15px,1.3vw,20px)] italic leading-snug text-ink/75">
            Things built to be used: apps that work with no network, extensions that sit beside you while you learn, and the
            systems underneath them.
          </p>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter works">
            {KINDS.map((k) => {
              const n = k === "All" ? projects.length : projects.filter((p) => p.kind === k).length;
              const on = kind === k;
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setKind(k)}
                  data-cursor="hover"
                  className={`border px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] transition-colors ${
                    on ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink/70 hover:border-ink"
                  }`}
                >
                  {k.toUpperCase()}
                  {k === "All" ? "" : "S"} <span className="opacity-60">{String(n).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </aside>

        <ol className="md:col-span-8">
          {list.map((p, i) => (
            <Entry key={p.slug} p={p} i={i} index={projects.indexOf(p)} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Entry({ p, i, index }: { p: Project; i: number; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setIn(true), { rootMargin: "0px 0px -12% 0px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const flip = i % 2 === 1;
  return (
    <li
      ref={ref}
      className={`work-entry grid grid-cols-8 items-center gap-[1.2vw] py-[5vh] ${inView ? "in" : ""}`}
      style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}
    >
      <article
        className={`group relative col-span-8 overflow-hidden bg-ink text-paper sm:col-span-5 ${flip ? "sm:col-start-4" : "sm:col-start-1"}`}
      >
        {p.image && (
          <div
            className="absolute inset-0 bg-cover bg-top opacity-0 grayscale transition duration-700 group-hover:opacity-30 group-hover:grayscale-0"
            style={{ backgroundImage: `url(${p.image})` }}
          />
        )}
        <div className="relative p-5 sm:p-6">
          <div className="flex items-center justify-between font-mono text-[9px] tracking-[0.2em] text-paper/55">
            <span>
              {String(index + 1).padStart(2, "0")} · {p.kind.toUpperCase()} · {p.year}
            </span>
            <span>{p.live ? "LIVE" : "SOURCE"}</span>
          </div>
          <h3 className="mt-5 font-serif text-[clamp(34px,3.6vw,60px)] italic font-light leading-none tracking-[-0.02em]">{p.name}</h3>
          <p className="mt-3 max-w-[44ch] font-serif text-[15px] leading-snug text-paper/90">{p.line}</p>
          <p className="mt-4 max-w-[60ch] text-[12.5px] leading-relaxed text-paper/60">{p.body}</p>
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] tracking-[0.15em] text-paper/50">
            {p.stack.map((s) => (
              <span key={s}>{s.toUpperCase()}</span>
            ))}
          </div>
          <div className="mt-5 flex gap-5 border-t border-paper/15 pt-3 font-mono text-[10px] tracking-[0.2em]">
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer" data-cursor="hover" className="link-u">
                VISIT ↗
              </a>
            )}
            {p.code && (
              <a href={p.code} target="_blank" rel="noreferrer" data-cursor="hover" className="link-u">
                SOURCE ↗
              </a>
            )}
          </div>
        </div>
      </article>
      <div className={`col-span-3 hidden justify-center sm:flex ${flip ? "sm:col-start-1 sm:row-start-1" : "sm:col-start-6"}`}>
        <Glyph kind={p.glyph} className="glyph h-[clamp(80px,9vw,150px)] w-[clamp(80px,9vw,150px)] text-ink" />
      </div>
    </li>
  );
}

function MapBackdrop() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full text-ink/[0.07]" aria-hidden>
      <defs>
        <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.9" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M -20 300 C 300 180 520 460 820 300 S 1400 120 1900 260" />
        <path d="M -20 900 C 400 760 600 1100 1000 920 S 1500 700 1900 880" />
        <path d="M 300 -20 L 420 2000" strokeDasharray="4 6" />
        <path d="M 1200 -20 L 1060 2400" strokeDasharray="4 6" />
      </g>
    </svg>
  );
}
