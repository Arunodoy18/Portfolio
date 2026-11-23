import type { Glyph as G } from "./data";

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.1, vectorEffect: "non-scaling-stroke" as const };

export default function Glyph({ kind, className = "" }: { kind: G; className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" className={className} aria-hidden>
      {kind === "rings" && (
        <g {...S}>
          {[8, 16, 24, 32, 40].map((r, i) => (
            <circle key={r} r={r} strokeDasharray={i % 2 ? "2 3" : undefined} opacity={1 - i * 0.15} />
          ))}
          <circle r="3" fill="currentColor" />
          <circle cx="28" cy="-22" r="2.2" className="text-accent" fill="currentColor" stroke="none" />
          <path d="M 0 0 L 28 -22" strokeDasharray="1 2" />
        </g>
      )}
      {kind === "wave" && (
        <g {...S}>
          {Array.from({ length: 9 }, (_, i) => {
            const y = -32 + i * 8;
            const a = 4 + Math.sin(i * 0.9) * 9;
            return <path key={i} d={`M -44 ${y} C -22 ${y - a} -10 ${y + a} 0 ${y} S 22 ${y - a} 44 ${y}`} opacity={0.35 + (i % 3) * 0.25} />;
          })}
        </g>
      )}
      {kind === "planet" && (
        <g {...S}>
          <circle r="17" fill="currentColor" />
          <ellipse rx="42" ry="9" transform="rotate(-18)" />
          <ellipse rx="34" ry="6" transform="rotate(-18)" strokeDasharray="2 2" />
          <path d="M -15 -6 A 17 17 0 0 1 15 -6" stroke="var(--color-paper)" />
        </g>
      )}
      {kind === "compass" && (
        <g {...S}>
          <circle r="30" />
          <circle r="22" strokeDasharray="1 2" />
          <path d="M 0 -44 L 6 0 L 0 44 L -6 0 Z" fill="currentColor" />
          <path d="M -44 0 L 0 -5 L 44 0 L 0 5 Z" />
          <path d="M 0 -44 L 6 0 L 0 0 Z" className="text-accent" fill="currentColor" stroke="none" />
        </g>
      )}
      {kind === "cube" && (
        <g {...S}>
          <path d="M 0 -40 L 34 -20 L 34 20 L 0 40 L -34 20 L -34 -20 Z" />
          <path d="M 0 -40 L 0 0 M 0 0 L 34 20 M 0 0 L -34 20" opacity="0.5" />
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M ${-30 + i * 3.6} ${-16 + i * 2} L ${-30 + i * 3.6} ${22 + i * 2}`} className={i > 5 ? "text-accent" : ""} />
          ))}
        </g>
      )}
      {kind === "diamond" && (
        <g {...S}>
          <path d="M -44 0 L -22 -20 L 0 0 L -22 20 Z" fill="currentColor" />
          <path d="M 0 0 L 22 -20 L 44 0 L 22 20 Z" fill="currentColor" />
          <path d="M -22 -20 L 0 -38 L 22 -20 L 0 0 Z" className="text-accent" fill="currentColor" stroke="none" opacity="0.8" />
          <path d="M -22 20 L 0 38 L 22 20 L 0 0 Z" />
        </g>
      )}
      {kind === "eye" && (
        <g {...S}>
          <path d="M -44 0 Q 0 -34 44 0 Q 0 34 -44 0 Z" />
          <circle r="14" fill="currentColor" />
          <circle r="5" cx="-4" cy="-4" fill="var(--color-paper)" stroke="none" />
          {[-30, -15, 0, 15, 30].map((x) => (
            <path key={x} d={`M ${x} -22 L ${x * 1.2} -32`} />
          ))}
        </g>
      )}
      {kind === "grid" && (
        <g {...S}>
          {Array.from({ length: 7 }, (_, y) =>
            Array.from({ length: 7 }, (_, x) => {
              const on = (x * 3 + y * 5) % 7 < 3;
              const red = x + y > 8 && on;
              return (
                <rect
                  key={`${x}-${y}`}
                  x={-38 + x * 11}
                  y={-38 + y * 11}
                  width="9"
                  height="9"
                  fill={on ? "currentColor" : "none"}
                  className={red ? "text-accent" : ""}
                  stroke={on ? "none" : "currentColor"}
                />
              );
            }),
          )}
        </g>
      )}
    </svg>
  );
}
