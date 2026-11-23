"use client";

import { useRef } from "react";
import { images } from "./data";
import { ease, lerp, range, useSectionProgress } from "./scroll";

const WORD = "ENGINEER";

export default function OtherSide() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const blocks = useRef<HTMLDivElement>(null);
  const kicker = useRef<HTMLParagraphElement>(null);

  useSectionProgress(section, (p) => {
    const move = ease(range(p, 0, 0.72));
    if (track.current) {
      const x = lerp(55, -175, move);
      const ry = lerp(-38, 22, move);
      track.current.style.transform = `translate3d(${x}vw, -50%, 0) rotateY(${ry}deg) rotateX(${lerp(8, -6, move)}deg)`;
      // each letter slides its picture a little: windows onto the other side
      track.current.querySelectorAll<HTMLElement>("[data-i]").forEach((el, i) => {
        el.style.backgroundPosition = `${50 + (move - 0.5) * 60 + i * 3}% ${30 + i * 7}%`;
      });
    }
    if (kicker.current) kicker.current.style.opacity = `${1 - range(p, 0.55, 0.7)}`;

    // collapse into a handful of pixels that become the portrait in the next plate
    if (blocks.current) {
      const b = range(p, 0.7, 1);
      blocks.current.style.opacity = `${b > 0 ? 1 : 0}`;
      blocks.current.querySelectorAll<HTMLElement>("[data-b]").forEach((el, i) => {
        const t = ease(range(b, i * 0.06, i * 0.06 + 0.4));
        el.style.transform = `scale(${t})`;
      });
    }
  });

  return (
    <section ref={section} id="other-side" data-plate="03 — THE OTHER SIDE" className="relative h-[300vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: "1100px" }}>
        <p
          ref={kicker}
          className="absolute left-[3.2vw] top-[11vh] max-w-[22ch] font-serif text-[clamp(16px,1.6vw,24px)] italic leading-snug text-ink/75"
        >
          Every word is a window. Look through the letters and you see what they were used to build.
        </p>

        <div
          ref={track}
          className="absolute left-0 top-1/2 flex whitespace-nowrap will-change-transform"
          style={{ transformStyle: "preserve-3d", transformOrigin: "0% 50%" }}
          aria-hidden
        >
          {WORD.split("").map((ch, i) => (
            <span
              key={i}
              data-i={i}
              className="cast image-text text-[clamp(220px,48vh,620px)] leading-[0.82]"
              style={{ backgroundImage: `url(${images[i % images.length]})` }}
            >
              {ch}
            </span>
          ))}
        </div>
        <h2 className="sr-only">Engineer — the other side</h2>

        <div ref={blocks} aria-hidden className="absolute left-1/2 top-1/2 h-[18vh] w-[14vh] -translate-x-1/2 -translate-y-1/2 opacity-0">
          {[
            [0, 0, 1, 1, "#111"],
            [0, 1, 1, 1, "#111"],
            [0, 2, 2, 1, "#111"],
            [2, 2, 1, 1, "#6b7280"],
            [1, 3, 1, 1, "#111"],
            [-1, 3, 1, 1, "#c7ccd6"],
            [2, 3, 1, 1, "#9aa3b2"],
          ].map(([x, y, w, h, c], i) => (
            <span
              key={i}
              data-b
              className="absolute origin-center"
              style={{
                left: `${(x as number) * 33}%`,
                top: `${(y as number) * 25}%`,
                width: `${(w as number) * 33}%`,
                height: `${(h as number) * 25}%`,
                background: c as string,
                transform: "scale(0)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
