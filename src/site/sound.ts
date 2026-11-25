"use client";

/**
 * The walkway's sound: one score, three radio stations and the static between them.
 * Nothing loads or plays until the visitor does something on the walkway (browsers require a gesture).
 */
const FILES = ["walkway", "radio-1", "radio-2", "radio-3", "static"] as const;
type Name = (typeof FILES)[number];

class Sound {
  private ctx: AudioContext | null = null;
  private gains = new Map<Name, GainNode>();
  private master: GainNode | null = null;
  private starting: Promise<void> | null = null;
  muted = typeof window !== "undefined" && localStorage.getItem("sound") === "off";
  get started() {
    return !!this.ctx;
  }

  start() {
    if (this.muted || this.starting) return this.starting;
    this.starting = (async () => {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      this.ctx = ctx;
      this.master = ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(ctx.destination);
      await Promise.all(
        FILES.map(async (n) => {
          const buf = await fetch(`/audio/${n}.m4a`)
            .then((r) => r.arrayBuffer())
            .then((b) => ctx.decodeAudioData(b));
          const g = ctx.createGain();
          g.gain.value = 0;
          g.connect(this.master!);
          const src = ctx.createBufferSource();
          src.buffer = buf;
          src.loop = true;
          src.connect(g);
          src.start();
          this.gains.set(n, g);
        }),
      );
    })().catch(() => {
      this.ctx = null;
      this.starting = null;
    });
    return this.starting;
  }

  /** target levels, 0..1, eased over a fraction of a second */
  set(levels: Partial<Record<Name, number>>) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (const [n, v] of Object.entries(levels) as [Name, number][]) {
      const g = this.gains.get(n);
      if (g) g.gain.setTargetAtTime(this.muted ? 0 : v, now, 0.25);
    }
  }

  toggle() {
    this.muted = !this.muted;
    try {
      localStorage.setItem("sound", this.muted ? "off" : "on");
    } catch {}
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, this.ctx.currentTime, 0.1);
    if (!this.muted && !this.ctx) this.start();
    return this.muted;
  }

  silence() {
    this.set({ walkway: 0, "radio-1": 0, "radio-2": 0, "radio-3": 0, static: 0 });
  }
}

export const sound = new Sound();
