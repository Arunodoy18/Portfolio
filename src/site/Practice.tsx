"use client";

import { useMemo, useRef } from "react";
import { images, practice } from "./data";
import { Wormhole } from "./Notes";
import { clamp, range, useSectionProgress } from "./scroll";

// a cross-shaped mosaic, 12 x 7. 1 = skill tile, 2 = image fragment, 0 = empty
const MASK = [
  "001100110011",
  "011112211110",
  "112111111211",
  "001111111100",
  "011211121110",
  "000110011000",
  "000020002000",
];

export default function Practice() {
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  const tiles = useMemo(() => {
    const skills = practice.groups.flatMap((g) => g.items.map((s) => ({ s, g: g.label })));
    let si = 0, ii = 0;
    const out: { x: number; y: number; type: number; label?: string; group?: string; img?: string; pos?: string; seed: number }[] = [];
    MASK.forEach((row, y) =>
      row.split("").forEach((c, x) => {
        const type = Number(c);
        if (!type) return;
        const seed = ((x * 37 + y * 91) % 100) / 100;
        if (type === 1) {
          out.push({ x, y, type, seed });
        } else {
          out.push({ x, y, type, img: images[ii % images.length], pos: `${(ii * 23) % 100}% ${(ii * 41) % 100}%`, seed });
          ii++;
        }
      }),
    );
    // spread every skill once over a shuffled set of ink tiles; the rest stay plain
    out
      .filter((t) => t.type === 1)
      .sort((a, b) => ((a.x * 7 + a.y * 11) % 13) - ((b.x * 7 + b.y * 11) % 13) || a.x - b.x)
      .slice(0, skills.length)
      .forEach((t) => {
        const sk = skills[si++];
        t.label = sk.s;
        t.group = sk.g;
      });
    return out;
  }, []);

  useSectionProgress(section, (p) => {
    const t = range(p, 0.1, 0.55);
    grid.current?.querySelectorAll<HTMLElement>("[data-seed]").forEach((el) => {
      const s = Number(el.dataset.seed);
      const v = clamp((t - s * 0.6) / 0.25);
      // pixel flicker while arriving
      const flick = v > 0 && v < 1 ? (Math.floor(performance.now() / 70 + s * 10) % 2 ? 0.35 : 1) : v;
      el.style.opacity = `${flick}`;
      el.style.transform = `scale(${0.6 + 0.4 * v})`;
    });
  });

  return (
    <section ref={section} id="practice" data-plate="04 — PRACTICE" className="relative h-[200vh] bg-paper">
      <div className="sticky top-0 grid h-[100svh] grid-cols-1 content-center gap-6 overflow-hidden px-[3.2vw] md:grid-cols-12 md:items-center md:gap-8">
        <Wormhole className="pointer-events-none absolute bottom-[-10vh] right-[-4vw] h-[80vh] w-[70vw] text-ink/20" />
        <div className="md:col-span-4">
          <h2 className="cast text-[clamp(56px,7.5vw,150px)] leading-[0.8] text-ink">PRACTICE</h2>
          <div className="mt-6 bg-ink p-4 text-paper">
            <p className="cast text-[clamp(20px,2vw,34px)] leading-[0.9]">{practice.title}</p>
            <ul className="mt-4 hidden space-y-1 font-mono md:block text-[10px] leading-relaxed tracking-[0.12em] text-paper/70">
              {practice.groups.map((g) => (
                <li key={g.label}>
                  <span className="text-paper/65">{g.label.toUpperCase()} ·</span> {g.items.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={grid}
          className="relative grid aspect-[12/7] w-full gap-[3px] md:col-span-8"
          style={{ gridTemplateColumns: "repeat(12, 1fr)", gridTemplateRows: "repeat(7, 1fr)" }}
          role="group" aria-label="Skills"
        >
          {tiles.map((t, i) =>
            t.type === 1 ? (
              <div
                key={i}
                data-seed={t.seed}
                className="flex flex-col justify-between bg-ink p-[0.4vw] text-paper opacity-0"
                style={{ gridColumn: t.x + 1, gridRow: t.y + 1 }}
              >
                <span className="font-mono text-[clamp(5px,0.45vw,8px)] tracking-[0.15em] text-paper/65">{t.group?.toUpperCase()}</span>
                <span className="font-mono text-[clamp(6px,0.62vw,11px)] leading-tight tracking-[0.06em]">{t.label}</span>
              </div>
            ) : (
              <div
                key={i}
                data-seed={t.seed}
                aria-hidden
                className="bg-cover opacity-0 grayscale"
                data-bg={t.img}
                style={{ gridColumn: t.x + 1, gridRow: t.y + 1, backgroundPosition: t.pos, backgroundSize: "600%" }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
