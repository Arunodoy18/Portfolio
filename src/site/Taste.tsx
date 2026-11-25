"use client";

import { useEffect, useRef } from "react";
import { taste } from "./data";
import { Wormhole } from "./Notes";

const GROUPS = [
  { kind: "Game", label: "Played" },
  { kind: "Music", label: "Played loud" },
  { kind: "Film", label: "Watched" },
] as const;

export default function Taste() {
  const ref = useRef<HTMLElement>(null);

  // tiles flicker on, one after another, the first time the plate is seen
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.querySelectorAll<HTMLElement>("[data-tile]").forEach((t, i) => {
          window.setTimeout(() => t.classList.add("tile-in"), 90 * i + (i % 3) * 40);
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const order = new Map<string, number>(taste.map((t, i) => [t.title, i]));
  return (
    <section ref={ref} id="taste" data-plate="04 — TASTE" className="relative overflow-hidden bg-paper px-[3.2vw] py-[16vh] text-ink">
      <Wormhole className="pointer-events-none absolute bottom-[-18vh] left-[12%] h-[80vh] w-[76vw] text-ink/20" />

      <div className="relative grid gap-y-10 md:grid-cols-12 md:gap-x-[1.2vw]">
        <div className="md:col-span-3">
          <p className="font-mono text-[10px] tracking-[0.25em] text-ink/50">04 — TASTE</p>
          <h2 className="cast mt-3 text-[clamp(64px,8.4vw,170px)] leading-[0.8]">TASTE</h2>
          <p className="mt-6 max-w-[26ch] font-serif text-[clamp(15px,1.3vw,20px)] italic leading-snug text-ink/75">
            What I play, what I play loud, and what I watch twice. You can tell a lot about an engineer from the second list.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[1.2vw] sm:grid-cols-3 md:col-span-9">
          {GROUPS.map((g, gi) => (
            <div key={g.kind} className="flex flex-col gap-[1.2vw]" style={{ marginTop: `${[0, 7, 3][gi]}vh` }}>
              <p className="font-mono text-[10px] tracking-[0.25em] text-ink/55">{g.label.toUpperCase()}</p>
              {taste
                .filter((t) => t.kind === g.kind)
                .map((t) => {
                  const i = order.get(t.title) ?? 0;
                  const solid = i % 3 !== 1;
                  return (
                    <article
                      key={t.title}
                      data-tile
                      className={`tile flex flex-col justify-between p-4 ${
                        solid ? "bg-ink text-paper" : "border border-ink/40 bg-paper/60 text-ink backdrop-blur-[2px]"
                      }`}
                      style={{ minHeight: `${[150, 118, 170, 132, 158][i % 5]}px` }}
                    >
                      <p className={`flex justify-between font-mono text-[9.5px] tracking-[0.2em] ${solid ? "text-paper/55" : "text-ink/55"}`}>
                        <span>{t.kind.toUpperCase()}</span>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                      </p>
                      <div>
                        <h3 className="font-serif text-[clamp(24px,2.3vw,40px)] font-light italic leading-[1.02] tracking-[-0.02em]">{t.title}</h3>
                        <p className={`mt-2 font-mono text-[9.5px] tracking-[0.16em] ${solid ? "text-paper/55" : "text-ink/55"}`}>{t.meta.toUpperCase()}</p>
                      </div>
                    </article>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
