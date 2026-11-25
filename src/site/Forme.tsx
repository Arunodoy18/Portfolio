"use client";

/**
 * 03 — THE OTHER SIDE, in three dimensions.
 * The manifesto's capitals take depth and fold into three beams along X, Y and Z. The camera then
 * falls onto the beams themselves: a small figure stands on the letters and can be walked across
 * them, run, jump, hang on their walls, and turn gravity toward another beam. A radio waits at the
 * far end of each beam; tune all three and the structure wakes.
 */
import { useEffect, useRef } from "react";
import type * as T from "three";
import { clamp, ease, isInk, lerp, range, useSectionProgress } from "./scroll";
import { sound } from "./sound";

const LINES = ["ENGINEERING AND ART", "SHOULD BE SEEN THROUGH", "THE SAME LENS."];
// a loose cluster of cells, the first thing the next plate resolves from
const PIXELS: [number, number][] = [[2, 0], [2, 1], [1, 2], [2, 2], [3, 2], [0, 3], [2, 3], [3, 3], [1, 4], [3, 4], [4, 4], [2, 5], [4, 5], [5, 3]];
const FALLS = [
  "Off the letters, nothing holds. He is recompiled where he stood.",
  "Null beneath his feet. Restored from the last good commit.",
  "A fall through the gaps. He is rebuilt at his mark.",
  "Stack overflow. He boots again where the ground was.",
];
const STATIONS = ["Night drive", "Dhol and drone", "The long shot"];

// the walkable world is the folded figure at 4x, shrunk back to the figure's size
const S = 4; // letter size of the walkable beams
const TOP = 0.55 * S; // their depth: the face he stands on
const K = 1 / S; // world scale of the walkable copy

type Runner = {
  root: T.Group;
  hips: T.Group;
  legs: { hip: T.Group; knee: T.Group; side: number }[];
  arms: { shoulder: T.Group; elbow: T.Group; side: number }[];
};

export default function Forme() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const caption = useRef<HTMLParagraphElement>(null);
  const readout = useRef<HTMLDivElement>(null);
  const prog = useRef(0);
  const pixels = useRef<HTMLDivElement>(null);
  const prompt = useRef<HTMLButtonElement>(null);
  const promptBar = useRef<HTMLSpanElement>(null);
  const radioCount = useRef<HTMLSpanElement>(null);
  const soundBtn = useRef<HTMLButtonElement>(null);
  const promptHeld = useRef(false);

  useSectionProgress(section, (p) => {
    prog.current = p;
    const r = section.current!.getBoundingClientRect();
    // stay hidden while sliding in over the manifesto; take over the instant we pin
    if (stage.current) stage.current.style.visibility = r.top <= 1 && r.bottom > 0 ? "visible" : "hidden";
    // on the way out, the picture breaks down into a few pixels
    pixels.current?.querySelectorAll<HTMLElement>("[data-px]").forEach((el, i) => {
      const t = ease(range(p, 0.955 + (i % 7) * 0.005, 0.985 + (i % 7) * 0.002));
      el.style.transform = `scale(${t})`;
    });
  });

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { FontLoader } = await import("three/examples/jsm/loaders/FontLoader.js");
      const { TextGeometry } = await import("three/examples/jsm/geometries/TextGeometry.js");
      const json = await fetch("/fonts/archivo-cast.typeface.json").then((r) => r.json());
      if (disposed || !canvas.current) return;
      const font = new FontLoader().parse(json);
      const V3 = THREE.Vector3;

      // ---------------------------------------------------------------- renderer & scene
      const renderer = new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.02, 400);
      const D = 30; // camera distance for the flat, face-on opening

      const hemi = new THREE.HemisphereLight(0xffffff, 0x222226, 1.1);
      scene.add(hemi);
      const sun = new THREE.DirectionalLight(0xffffff, 2.2);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      sun.shadow.bias = -0.0003;
      sun.shadow.normalBias = 0.01;
      scene.add(sun, sun.target);

      // two materials per extrusion: [faces, sides]
      const faceMat = new THREE.MeshStandardMaterial({ roughness: 0.55, metalness: 0.0 });
      const sideMat = new THREE.MeshStandardMaterial({ roughness: 0.7, metalness: 0.05 });
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x9a9a98, roughness: 0.42, metalness: 0.1 });

      // ---------------------------------------------------------------- act 1: the three lines
      const arms = new THREE.Group();
      scene.add(arms);
      const lineMeshes = LINES.map((text) => {
        const g = new TextGeometry(text, { font, size: 1, depth: 1, curveSegments: 6, bevelEnabled: false });
        g.computeBoundingBox();
        const m = new THREE.Mesh(g, [faceMat, sideMat]);
        arms.add(m);
        return { m, w: g.boundingBox!.max.x - g.boundingBox!.min.x, minX: g.boundingBox!.min.x };
      });
      // flat pose (matched to the DOM capitals) and the folded pose along X, Y and Z
      const flat = lineMeshes.map(() => ({ pos: new V3(), k: 1 }));
      const GAP = 0.5;
      const folded = [
        { pos: new V3(GAP, 0, 0), q: new THREE.Quaternion() },
        { pos: new V3(0.62, GAP, 0), q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2)) },
        { pos: new V3(0, 0, GAP), q: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -Math.PI / 2, 0)) },
      ];
      const ident = new THREE.Quaternion();
      const SPIN_AXIS = new V3(1, 1, 1).normalize();
      const SPIN_END = Math.PI * 0.9;

      const measureFlat = () => {
        const vw = window.innerWidth, vh = window.innerHeight;
        const upp = (2 * D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / vh;
        const caps = document.querySelectorAll<HTMLElement>("#eye [data-caps-line]");
        const host = document.querySelector<HTMLElement>("#eye [data-stage]");
        const o = host?.getBoundingClientRect() ?? { left: 0, top: 0 };
        lineMeshes.forEach((l, i) => {
          const el = caps[i];
          if (el) {
            const r = el.getBoundingClientRect();
            const k = (r.width * upp) / l.w;
            flat[i].k = k;
            flat[i].pos.set((r.left - o.left - vw / 2) * upp - l.minX * k, (vh / 2 - (r.top - o.top + r.height / 2)) * upp - 0.344 * k, 0);
          } else {
            const k = 1.6;
            flat[i].k = k;
            flat[i].pos.set((-l.w * k) / 2, (1 - i) * 1.4 * k - 0.344 * k, 0);
          }
        });
      };

      // ---------------------------------------------------------------- act 2: the same figure, walkable
      // world2 is an exact copy of the finished figure. Each beam carries a "frame" whose +Y is the
      // face's normal; the figure lives in that frame, so on every beam "down" is into the letters.
      const world2 = new THREE.Group();
      world2.scale.setScalar(K);
      world2.quaternion.setFromAxisAngle(SPIN_AXIS, SPIN_END);
      world2.visible = false;
      scene.add(world2);

      const inPoly = (x: number, y: number, poly: number[][]) => {
        let c = false;
        for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
          const [xi, yi] = poly[i], [xj, yj] = poly[j];
          if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
        }
        return c;
      };

      const surfaces = LINES.map((text, si) => {
        const geo = new TextGeometry(text, { font, size: S, depth: TOP, curveSegments: 8, bevelEnabled: false });
        geo.computeBoundingBox();
        const width = geo.boundingBox!.max.x;
        const mesh = new THREE.Mesh(geo, [faceMat, sideMat]);
        mesh.position.copy(folded[si].pos).multiplyScalar(S);
        mesh.quaternion.copy(folded[si].q);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        world2.add(mesh);
        const frame = new THREE.Group();
        frame.rotation.x = Math.PI / 2; // frame (x, Y, Z) -> text (x, -Z, Y)
        mesh.add(frame);

        // ground test against the real outlines (with counters), in frame coordinates (x, z = -text y)
        const polys = font.generateShapes(text, S).map((sh) => {
          const pts = sh.extractPoints(8);
          return { outer: pts.shape.map((v) => [v.x, v.y]), holes: pts.holes.map((h) => h.map((v) => [v.x, v.y])) };
        });
        const onLetter = (x: number, z: number) => polys.some((p) => inPoly(x, -z, p.outer) && !p.holes.some((h) => inPoly(x, -z, h)));
        const FOOT = 0.24;
        const footing = (x: number, z: number) => {
          if (onLetter(x, z)) return true;
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            if (onLetter(x + Math.cos(a) * FOOT, z + Math.sin(a) * FOOT) && onLetter(x - Math.cos(a) * FOOT, z - Math.sin(a) * FOOT)) return true;
          }
          return false;
        };
        const solid = (x: number, z: number, r = 0.14) =>
          onLetter(x, z) && onLetter(x + r, z) && onLetter(x - r, z) && onLetter(x, z + r) && onLetter(x, z - r);
        const rings = polys
          .flatMap((p) => [p.outer, ...p.holes])
          .map((r) => r.map(([x, y]) => [x, -y] as [number, number]).filter((pt, i, a) => i === 0 || Math.hypot(pt[0] - a[i - 1][0], pt[1] - a[i - 1][1]) > 1e-4))
          .filter((r) => r.length > 2);
        const edgeAt = (ri: number, i: number) => {
          const r = rings[ri];
          const a = r[i], b = r[(i + 1) % r.length];
          const dx = b[0] - a[0], dz = b[1] - a[1];
          const len = Math.hypot(dx, dz) || 1e-6;
          const tx = dx / len, tz = dz / len;
          let nx = tz, nz = -tx;
          if (onLetter(a[0] + dx / 2 + nx * 0.06, a[1] + dz / 2 + nz * 0.06)) {
            nx = -nx;
            nz = -nz;
          }
          return { a, len, tx, tz, nx, nz };
        };
        const nearestEdge = (x: number, z: number) => {
          let best = { ri: 0, i: 0, s: 0, dist: Infinity };
          rings.forEach((r, ri) => {
            for (let i = 0; i < r.length; i++) {
              const a = r[i], b = r[(i + 1) % r.length];
              const dx = b[0] - a[0], dz = b[1] - a[1];
              const l2 = dx * dx + dz * dz || 1e-9;
              const t = clamp(((x - a[0]) * dx + (z - a[1]) * dz) / l2);
              const d = Math.hypot(a[0] + dx * t - x, a[1] + dz * t - z);
              if (d < best.dist) best = { ri, i, s: t * Math.sqrt(l2), dist: d };
            }
          });
          return best;
        };
        const spots: [number, number][] = [];
        for (let x = 0; x < width; x += 0.25) for (let z = -S; z < 0; z += 0.25) if (solid(x, z, 0.25)) spots.push([x, z]);
        const nearestSpot = (x: number, z: number) => {
          let best = spots[0], d = Infinity;
          for (const s of spots) {
            const dd = (s[0] - x) ** 2 + (s[1] - z) ** 2;
            if (dd < d) {
              d = dd;
              best = s;
            }
          }
          return best;
        };
        return { mesh, frame, width, onLetter, footing, solid, rings, edgeAt, nearestEdge, nearestSpot };
      });
      const surfMeshes = surfaces.map((s) => s.mesh);

      // ---------------------------------------------------------------- the runner
      const runner = makeRunner(THREE, bodyMat);
      const me = {
        surf: 0, x: 0, z: -1.4, y: TOP, vy: 0, vx: 0, vz: 0, heading: Math.PI / 2, phase: 0,
        safe: [0, -1.4] as [number, number], grounded: true, printed: 1, air: 0,
        mode: "down" as "down" | "wall", wr: 0, wi: 0, ws: 0, wh: 0, fwd: [0, 1] as [number, number],
      };
      const place = (si: number) => {
        me.surf = si;
        surfaces[si].frame.add(runner.root);
      };
      {
        // he starts on the first beam, by "AND ART"
        const s0 = surfaces[0];
        const s = s0.nearestSpot(s0.width * 0.6, -1.4);
        me.x = s[0]; me.z = s[1]; me.safe = [s[0], s[1]];
        place(0);
      }

      // ---------------------------------------------------------------- a radio at the far end of each beam
      const radioMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3e, roughness: 0.5, metalness: 0.3 });
      const lampOff = new THREE.MeshBasicMaterial({ color: 0x555555 });
      const lampOn = new THREE.MeshBasicMaterial({ color: 0xff5a36 });
      const radios = surfaces.map((sf, i) => {
        const s = sf.nearestSpot(sf.width - 1.4, -1.2);
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.3, 0.2), radioMat);
        body.position.y = 0.15;
        body.castShadow = true;
        const grill = new THREE.Mesh(new THREE.CircleGeometry(0.08, 20), lampOff);
        grill.position.set(-0.1, 0.16, 0.101);
        const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), lampOff);
        lamp.position.set(0.13, 0.22, 0.101);
        const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5), radioMat);
        antenna.position.set(0.16, 0.5, 0);
        antenna.rotation.z = -0.35;
        g.add(body, grill, lamp, antenna);
        g.position.set(s[0], TOP, s[1]);
        g.rotation.y = -0.6;
        sf.frame.add(g);
        return { surf: i, x: s[0], z: s[1], g, lamp, tuned: false, t: 0, name: STATIONS[i] };
      });
      let woken = false;
      let wake = 0;

      // ---------------------------------------------------------------- input
      const drag = { on: false, x0: 0, y0: 0, x: 0, y: 0, pending: 0 as number | 0 };
      const keys = new Set<string>();
      let walkActive = false;
      let jumpQueued = false;
      let gravityQueued = false;
      const taps: number[] = [];
      const el = canvas.current;

      const onDown = (e: PointerEvent) => {
        if (!walkActive) return;
        sound.start();
        const start = () => {
          drag.on = true;
          drag.x0 = drag.x = e.clientX;
          drag.y0 = drag.y = e.clientY;
        };
        if (e.pointerType === "touch") {
          const t = performance.now();
          taps.push(t);
          while (taps.length && t - taps[0] > 650) taps.shift();
          if (taps.length >= 3) {
            taps.length = 0;
            gravityQueued = true;
          }
          // rest a thumb, then drag: a quick swipe still scrolls the page
          drag.x0 = drag.x = e.clientX;
          drag.y0 = drag.y = e.clientY;
          drag.pending = window.setTimeout(start, 220) as unknown as number;
        } else {
          el.setPointerCapture(e.pointerId);
          start();
        }
      };
      const onMove = (e: PointerEvent) => {
        if (drag.pending && !drag.on && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) > 10) {
          clearTimeout(drag.pending);
          drag.pending = 0;
        }
        drag.x = e.clientX;
        drag.y = e.clientY;
      };
      const onUp = () => {
        clearTimeout(drag.pending);
        drag.pending = 0;
        drag.on = false;
      };
      const onTouchMove = (e: TouchEvent) => {
        if (drag.on) e.preventDefault();
      };
      const held = { shift: false, space: false, f: false };
      const onKey = (e: KeyboardEvent) => {
        if (!walkActive) return;
        const k = e.key.toLowerCase();
        const downNow = e.type === "keydown";
        if (downNow) sound.start();
        if (k === "shift") held.shift = downNow;
        if (k === "f") held.f = downNow;
        if (k === "g" && downNow && !e.repeat) gravityQueued = true;
        if (k === "m" && downNow) {
          const m = sound.toggle();
          if (soundBtn.current) soundBtn.current.textContent = m ? "SOUND OFF" : "SOUND ON";
        }
        if (["w", "a", "s", "d"].includes(k)) {
          if (downNow) keys.add(k);
          else keys.delete(k);
        }
        if (k === " ") {
          e.preventDefault();
          if (downNow && !held.space) jumpQueued = true;
          held.space = downNow;
        }
      };
      el.addEventListener("pointerdown", onDown);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
      el.addEventListener("touchmove", onTouchMove, { passive: false });
      window.addEventListener("keydown", onKey);
      window.addEventListener("keyup", onKey);

      // ---------------------------------------------------------------- sizing & theme
      let vw = 0, vh = 0;
      const resize = () => {
        vw = el.clientWidth;
        vh = el.clientHeight;
        renderer.setSize(vw, vh, false);
        camera.aspect = vw / vh;
        camera.updateProjectionMatrix();
        measureFlat();
      };
      resize();
      document.fonts?.ready.then(() => !disposed && measureFlat());
      window.addEventListener("resize", resize);

      let themeInk: boolean | null = null;
      const applyTheme = () => {
        const ink = isInk();
        if (ink === themeInk) return;
        themeInk = ink;
        const bg = new THREE.Color(ink ? 0x0a0a0c : 0xf4f4f1);
        scene.background = bg;
        scene.fog = new THREE.Fog(bg, 12, 60);
        faceMat.color.set(ink ? 0xf1f0ec : 0x0d0e11);
        faceMat.emissive.set(ink ? 0x7a7a78 : 0x000000);
        sideMat.color.set(ink ? 0x2b2b31 : 0x8d8e94);
        hemi.intensity = ink ? 1.0 : 1.3;
        bodyMat.color.set(ink ? 0x8f8f8c : 0xcfcfcb);
      };

      // ---------------------------------------------------------------- helpers between frames and the world
      const toWorld = (si: number, x: number, y: number, z: number) => surfaces[si].frame.localToWorld(new V3(x, y, z));
      const dirToWorld = (si: number, d: T.Vector3) => d.clone().applyQuaternion(surfaces[si].frame.getWorldQuaternion(new THREE.Quaternion()));
      const dirToLocal = (si: number, d: T.Vector3) =>
        d.clone().applyQuaternion(surfaces[si].frame.getWorldQuaternion(new THREE.Quaternion()).invert());

      /** put him on another beam at a point given in world space, keeping where he was heading */
      const moveTo = (si: number, world: T.Vector3, headingWorld: T.Vector3 | null) => {
        const p = surfaces[si].frame.worldToLocal(world.clone());
        const s = surfaces[si].footing(p.x, p.z) ? [p.x, p.z] : surfaces[si].nearestSpot(p.x, p.z);
        place(si);
        me.mode = "down";
        me.x = s[0]; me.z = s[1]; me.y = TOP; me.vy = 0; me.vx = me.vz = 0;
        me.grounded = true;
        me.safe = [me.x, me.z];
        if (headingWorld) {
          const h = dirToLocal(si, headingWorld);
          if (Math.hypot(h.x, h.z) > 0.1) me.heading = Math.atan2(h.x, h.z);
        }
      };

      // ---------------------------------------------------------------- per frame
      let visible = false;
      const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px" });
      io.observe(el);

      const tmpQ = new THREE.Quaternion();
      const look = new V3();
      const camA = new V3(), camB = new V3(), lookA = new V3(), lookB = new V3();
      const follow = { pos: new V3(), look: new V3(), up: new V3(0, 1, 0), ready: false };
      const ray = new THREE.Raycaster();
      let last = performance.now();
      let captionTimer = 0;
      let raf = 0;

      const say = (text: string) => {
        if (!caption.current) return;
        caption.current.textContent = text;
        caption.current.style.opacity = "1";
        captionTimer = 3.4;
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        if (!visible) return;
        applyTheme();
        const p = prog.current;

        // ---- act 1: flat -> extruded -> folded into three axes -> turning
        const extr = ease(range(p, 0.02, 0.16));
        const fold = ease(range(p, 0.1, 0.34));
        const spin = range(p, 0.3, 0.46);
        lineMeshes.forEach((l, i) => {
          const st = clamp(fold * 1.4 - i * 0.2);
          const f = flat[i], g = folded[i];
          l.m.position.lerpVectors(f.pos, g.pos, st);
          tmpQ.slerpQuaternions(ident, g.q, st);
          l.m.quaternion.copy(tmpQ);
          const k = lerp(f.k, 1, st);
          l.m.scale.set(k, k, Math.max(0.002, lerp(0.002, 0.55, extr) * k));
        });
        arms.quaternion.setFromAxisAngle(SPIN_AXIS, spin * SPIN_END);

        // the walkable copy takes over the moment the figure stops turning
        const playing = p >= 0.46;
        arms.visible = !playing;
        world2.visible = playing;

        // camera for act 1
        camA.set(0, 0, D);
        lookA.set(0, 0, 0);
        camB.set(1, 0.82, 1).normalize().multiplyScalar(26).add(new V3(2.2, 2.2, 2.2));
        lookB.set(2.2, 2.2, 2.2);
        const c = ease(range(p, 0.08, 0.34));
        const act1Pos = new V3().lerpVectors(camA, camB, c);
        const act1Look = new V3().lerpVectors(lookA, lookB, c);
        act1Pos.lerp(lookB, ease(range(p, 0.36, 0.46)) * 0.55);

        // ---- act 2: walking on the figure
        const wasActive = walkActive;
        walkActive = playing && p < 0.97;
        if (wasActive && !walkActive) sound.silence();
        if (hint.current) hint.current.style.visibility = walkActive ? "visible" : "hidden";
        if (readout.current) readout.current.style.visibility = walkActive ? "visible" : "hidden";
        if (soundBtn.current && soundBtn.current.dataset.muted !== String(sound.muted)) {
          soundBtn.current.dataset.muted = String(sound.muted);
          soundBtn.current.textContent = sound.muted ? "SOUND OFF" : "SOUND ON";
        }

        const sf = surfaces[me.surf];
        if (playing) {
          // ---- input, mapped through the camera onto the face he stands on
          let ix = 0, iz = 0, mag = 0;
          let sprintDrag = false;
          if (drag.on) {
            const dx = drag.x - drag.x0, dy = drag.y - drag.y0;
            const len = Math.hypot(dx, dy);
            if (len > 6) {
              mag = clamp(len / 90);
              if (len > 170) sprintDrag = true;
              // the ground direction whose on-screen image points where the finger went
              const o = toWorld(me.surf, me.x, TOP, me.z).project(camera);
              const ex = toWorld(me.surf, me.x + 1, TOP, me.z).project(camera).sub(o);
              const ez = toWorld(me.surf, me.x, TOP, me.z + 1).project(camera).sub(o);
              const sx = dx / len, sy = -dy / len;
              const det = ex.x * ez.y - ez.x * ex.y;
              if (Math.abs(det) > 1e-9) {
                let a = (sx * ez.y - ez.x * sy) / det;
                let b = (ex.x * sy - sx * ex.y) / det;
                const n = Math.hypot(a, b) || 1;
                a /= n;
                b /= n;
                ix = a;
                iz = b;
              }
            }
          }
          const kx = (keys.has("d") ? 1 : 0) - (keys.has("a") ? 1 : 0);
          const kz = (keys.has("w") ? 1 : 0) - (keys.has("s") ? 1 : 0);
          if (kx || kz) {
            // keys follow the beam: A / D along it, W / S up and down across the letters
            const l = Math.hypot(kx, kz);
            ix = kx / l;
            iz = -kz / l;
            mag = 1;
          }

          const speed = 3.4;
          let sp = 0;

          // ---- G: gravity toward the surface he faces, or the wall he hangs from
          if (gravityQueued) {
            gravityQueued = false;
            const fwdLocal = me.mode === "wall" ? new V3(0, 0, 0) : new V3(Math.sin(me.heading), 0, Math.cos(me.heading));
            let handled = false;
            if (me.mode === "down" && me.grounded) {
              // look where he faces, a little above his feet, for another beam
              const origin = toWorld(me.surf, me.x, TOP + 0.5, me.z);
              const dirW = dirToWorld(me.surf, fwdLocal).normalize();
              ray.set(origin, dirW);
              ray.far = 6 * K;
              const hit = ray.intersectObjects(surfMeshes, false).find((h) => h.object !== surfaces[me.surf].mesh);
              if (hit) {
                const si = surfMeshes.findIndex((m) => m === hit.object);
                moveTo(si, hit.point, dirW);
                me.printed = 0.4;
                say(`Gravity turns toward ${LINES[si].replace(/\.$/, "")}.`);
                handled = true;
              }
            }
            if (!handled && me.mode === "down" && me.grounded) {
              const e = sf.nearestEdge(me.x, me.z);
              if (e.dist < 0.6) {
                const E = sf.edgeAt(e.ri, e.i);
                const facing = Math.sin(me.heading) * E.nx + Math.cos(me.heading) * E.nz;
                if (facing > 0.15 || e.dist < 0.22) {
                  me.mode = "wall";
                  me.wr = e.ri; me.wi = e.i; me.ws = e.s; me.wh = TOP - 0.4;
                  me.fwd = [0, -1];
                  say("Gravity turns toward the wall. Down is sideways now.");
                  handled = true;
                }
              }
              if (!handled) say("Face another beam, or the edge of a letter, then press G.");
            } else if (!handled && me.mode === "wall") {
              const E = sf.edgeAt(me.wr, me.wi);
              me.mode = "down";
              me.x = E.a[0] + E.tx * me.ws + E.nx * 0.35;
              me.z = E.a[1] + E.tz * me.ws + E.nz * 0.35;
              me.y = me.wh; me.vy = 0; me.vx = E.nx * 1.2; me.vz = E.nz * 1.2;
              me.grounded = false; me.air = 1;
              say("Gravity returns to the letters.");
            }
          }

          if (me.mode === "wall") {
            // on the side of a letter: along the wall, and up or down it
            const ring = sf.rings[me.wr];
            let E = sf.edgeAt(me.wr, me.wi);
            const along = (ix * E.tx + iz * E.tz) * mag;
            const climb = -(ix * E.nx + iz * E.nz) * mag; // push into the wall to climb
            const v = held.shift || sprintDrag ? 4.4 : 2.6;
            me.ws += along * v * dt;
            me.wh += climb * v * dt;
            let guard = 0;
            while (me.ws > E.len && guard++ < 64) {
              me.ws -= E.len;
              me.wi = (me.wi + 1) % ring.length;
              E = sf.edgeAt(me.wr, me.wi);
            }
            while (me.ws < 0 && guard++ < 128) {
              me.wi = (me.wi - 1 + ring.length) % ring.length;
              E = sf.edgeAt(me.wr, me.wi);
              me.ws += E.len;
            }
            const px = E.a[0] + E.tx * me.ws, pz = E.a[1] + E.tz * me.ws;
            me.x = px; me.z = pz; me.y = me.wh;
            if (me.wh > TOP - 0.05) {
              me.mode = "down";
              me.x = px - E.nx * 0.3; me.z = pz - E.nz * 0.3; me.y = TOP;
              me.grounded = true; me.vx = me.vz = 0;
              me.heading = Math.atan2(-E.nx, -E.nz);
              if (!sf.footing(me.x, me.z)) {
                me.x = me.safe[0];
                me.z = me.safe[1];
              }
            } else if (me.wh < 0.05) {
              me.mode = "down";
              me.x = px + E.nx * 0.3; me.z = pz + E.nz * 0.3; me.y = 0; me.vy = 0; me.vx = me.vz = 0;
              me.grounded = false; me.air = 1;
            }
            if (me.mode === "wall") {
              const mv = Math.hypot(along, climb);
              if (mv > 0.05) me.fwd = [along / mv, climb / mv];
              const up3 = new V3(E.nx, 0, E.nz);
              const f3 = new V3(E.tx * me.fwd[0], me.fwd[1], E.tz * me.fwd[0]).normalize();
              const x3 = new V3().crossVectors(up3, f3).normalize();
              runner.root.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(x3, up3, f3));
              runner.root.position.set(px, me.wh, pz);
              sp = mv * v;
              me.phase += dt * (2.2 + clamp(sp / speed) * 10);
              me.printed = Math.min(1, me.printed + dt * 2.2);
              runner.root.scale.setScalar(0.95 * ease(me.printed));
              animateRunner(runner, me.phase, clamp(sp / speed), now / 1000, true);
            }
          } else {
            const top = held.shift || sprintDrag ? 6.6 : speed;
            const ax = ix * mag * top, az = iz * mag * top;
            const k = me.grounded ? 1 - Math.exp(-dt * 12) : 1 - Math.exp(-dt * 1.5);
            me.vx += (ax - me.vx) * k;
            me.vz += (az - me.vz) * k;
            me.x += me.vx * dt;
            me.z += me.vz * dt;

            if (jumpQueued && me.grounded) {
              me.vy = 6.4;
              me.grounded = false;
              me.air = 0;
            }

            if (me.grounded) {
              if (sf.footing(me.x, me.z)) {
                me.y = TOP;
                if (sf.solid(me.x, me.z)) me.safe = [me.x, me.z];
              } else {
                // off this beam: is another beam's face right here, in the same plane?
                const w = toWorld(me.surf, me.x, TOP, me.z);
                let moved = false;
                for (let si = 0; si < surfaces.length && !moved; si++) {
                  if (si === me.surf) continue;
                  const q = surfaces[si].frame.worldToLocal(w.clone());
                  if (Math.abs(q.y - TOP) < 0.08 && surfaces[si].footing(q.x, q.z)) {
                    const hw = dirToWorld(me.surf, new V3(Math.sin(me.heading), 0, Math.cos(me.heading)));
                    const vw3 = dirToWorld(me.surf, new V3(me.vx, 0, me.vz));
                    place(si);
                    me.x = q.x; me.z = q.z;
                    const h = dirToLocal(si, hw);
                    me.heading = Math.atan2(h.x, h.z);
                    const v2 = dirToLocal(si, vw3);
                    me.vx = v2.x; me.vz = v2.z;
                    moved = true;
                  }
                }
                if (!moved) {
                  me.grounded = false;
                  me.vy = 0;
                }
              }
            } else {
              me.air += dt;
              me.vy -= (held.space && me.vy > 0 && me.air < 0.38 ? 9 : 24) * dt;
              me.y += me.vy * dt;
              if (me.vy < 0 && me.y <= TOP && me.y > TOP - 0.35 && sf.footing(me.x, me.z)) {
                me.y = TOP;
                me.vy = 0;
                me.grounded = true;
              }
              if (me.y < -16) {
                me.x = me.safe[0]; me.z = me.safe[1]; me.y = TOP; me.vy = 0; me.vx = me.vz = 0;
                me.grounded = true;
                me.printed = 0;
                say(FALLS[Math.floor(Math.random() * FALLS.length)]);
              }
            }

            sp = Math.hypot(me.vx, me.vz);
            const run = clamp(sp / speed);
            if (sp > 0.15) {
              const target = Math.atan2(me.vx, me.vz);
              let d = target - me.heading;
              d = Math.atan2(Math.sin(d), Math.cos(d));
              me.heading += d * (1 - Math.exp(-dt * 14));
            }
            me.phase += dt * (2.2 + run * 10 + Math.max(0, sp - speed) * 2.4);
            me.printed = Math.min(1, me.printed + dt * 2.2);
            runner.root.position.set(me.x, me.y, me.z);
            runner.root.rotation.set(0, me.heading, 0);
            runner.root.scale.setScalar(0.95 * ease(me.printed));
            animateRunner(runner, me.phase, me.grounded ? run : 0.25, now / 1000, me.grounded);
          }
          jumpQueued = false;

          // ---- radios
          const surfNow = surfaces[me.surf];
          let near = -1, nearD = Infinity;
          radios.forEach((r, i) => {
            const d = r.surf === me.surf ? Math.hypot(r.x - me.x, r.z - me.z) : Infinity;
            if (d < nearD) {
              nearD = d;
              near = i;
            }
            r.lamp.material = r.tuned || (r.t > 0 && Math.sin(now / 90) > 0) ? lampOn : lampOff;
            r.g.rotation.z = r.tuned ? Math.sin(now / 160 + i) * 0.03 : 0; // a tuned radio hums
          });
          const nr = near >= 0 ? radios[near] : null;
          const canTune = !!nr && !nr.tuned && nearD < 1.4 && me.grounded && me.mode === "down";
          if (nr && canTune && (held.f || promptHeld.current)) {
            nr.t = Math.min(1, nr.t + dt / 1.3);
            if (nr.t >= 1) {
              nr.tuned = true;
              const found = radios.filter((r) => r.tuned).length;
              say(found < 3 ? `${nr.name}. ${found} of 3 stations found.` : "Three stations found. The structure wakes.");
              if (radioCount.current) radioCount.current.textContent = `${found} / 3`;
              if (found === 3 && !woken) {
                woken = true;
                wake = 1;
              }
            }
          } else if (nr && !nr.tuned) {
            nr.t = Math.max(0, nr.t - dt * 0.6);
          }
          if (prompt.current) {
            const show = walkActive && canTune;
            prompt.current.style.visibility = show ? "visible" : "hidden";
            if (show && nr) {
              const v = toWorld(nr.surf, nr.x, TOP + 0.9, nr.z).project(camera);
              prompt.current.style.transform = `translate(${((v.x + 1) / 2) * vw}px, ${((1 - v.y) / 2) * vh}px) translate(-50%, -100%)`;
              if (promptBar.current) promptBar.current.style.transform = `scaleX(${nr.t})`;
            }
          }
          // the structure wakes: the letters breathe light for a while
          if (wake > 0) {
            wake = Math.max(0, wake - dt * 0.12);
            const pulse = (0.5 + 0.5 * Math.sin(now / 260)) * wake;
            faceMat.emissiveIntensity = 1 + pulse * 1.6;
            world2.position.y = Math.sin(now / 400) * 0.02 * wake;
          }

          // ---- sound follows him around the radios
          if (sound.started && walkActive) {
            const lv = (i: number) => {
              const r = radios[i];
              const d = r.surf === me.surf ? Math.hypot(r.x - me.x, r.z - me.z) : 99;
              return r.tuned ? clamp(1 - d / 6) * 0.95 : r.t * 0.7;
            };
            const radio = [lv(0), lv(1), lv(2)];
            const loud = Math.max(...radio);
            const hiss = nr && !nr.tuned ? clamp(1 - nearD / 3.5) * (1 - nr.t) * 0.55 : 0;
            sound.set({ walkway: 0.6 * (1 - loud * 0.7), "radio-1": radio[0], "radio-2": radio[1], "radio-3": radio[2], static: hiss });
          }

          if (readout.current) {
            readout.current.textContent = `${LINES[me.surf].replace(/\.$/, "")}\nX ${me.x.toFixed(1).padStart(5)}  Z ${(-me.z).toFixed(1).padStart(4)}  ${
              me.mode === "wall" ? "ON A WALL" : !me.grounded ? (me.vy > 0 ? "JUMPING" : "FALLING") : sp > 4.6 ? "SPRINTING" : sp > 0.3 ? "RUNNING" : "STANDING"
            }${woken ? "  ·  AWAKE" : ""}`;
          }

          // ---- the follow camera: behind and above him, in the frame of the beam he is on
          const fw = surfNow.frame;
          const target = toWorld(me.surf, me.x, me.y + 0.55, me.z);
          const want = fw.localToWorld(new V3(me.x - 4.2, me.y + 5.4, me.z + 7.2));
          const upW = dirToWorld(me.surf, new V3(0, 1, 0)).normalize();
          if (!follow.ready) {
            follow.pos.copy(want);
            follow.look.copy(target);
            follow.up.copy(upW);
            follow.ready = true;
          }
          const kc = 1 - Math.exp(-dt * 4);
          follow.pos.lerp(want, kc);
          follow.look.lerp(target, 1 - Math.exp(-dt * 8));
          follow.up.lerp(upW, kc).normalize();

          // shadows: a small light box that travels with him
          const sunAt = target.clone().add(upW.clone().multiplyScalar(2)).add(dirToWorld(me.surf, new V3(-0.8, 0, 0.6)));
          sun.position.copy(sunAt);
          sun.target.position.copy(target);
          const sc = sun.shadow.camera;
          sc.left = -1.6; sc.right = 1.6; sc.top = 1.6; sc.bottom = -1.6; sc.near = 0.01; sc.far = 6;
          sc.updateProjectionMatrix();
        } else {
          follow.ready = false;
          sun.position.set(8, 14, 12);
          sun.target.position.set(0, 0, 0);
          const sc = sun.shadow.camera;
          sc.left = -14; sc.right = 14; sc.top = 10; sc.bottom = -10; sc.near = 0.5; sc.far = 60;
          sc.updateProjectionMatrix();
          if (prompt.current) prompt.current.style.visibility = "hidden";
        }

        // ---- one continuous camera: act 1, then a dive down onto him
        const dive = ease(range(p, 0.46, 0.56));
        if (playing && follow.ready) {
          camera.position.lerpVectors(act1Pos, follow.pos, dive);
          look.lerpVectors(act1Look, follow.look, dive);
          camera.up.set(0, 1, 0).lerp(follow.up, dive).normalize();
        } else {
          camera.position.copy(act1Pos);
          look.copy(act1Look);
          camera.up.set(0, 1, 0);
        }
        camera.lookAt(look);

        // ---- the way out
        if (veil.current) veil.current.style.opacity = `${range(p, 0.925, 0.958)}`;

        if (captionTimer > 0) {
          captionTimer -= dt;
          if (captionTimer <= 0 && caption.current) caption.current.style.opacity = "0";
        }
        renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(frame);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", resize);
        el.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        el.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("keydown", onKey);
        window.removeEventListener("keyup", onKey);
        sound.silence();
        scene.traverse((o) => {
          const m = o as T.Mesh;
          if (m.geometry) m.geometry.dispose();
        });
        radioMat.dispose();
        lampOff.dispose();
        lampOn.dispose();
        faceMat.dispose();
        sideMat.dispose();
        bodyMat.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <section ref={section} id="other-side" data-plate="03 — THE OTHER SIDE" className="relative z-10 -mt-[100vh] h-[820vh]">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-paper" style={{ visibility: "hidden" }}>
        <canvas
          ref={canvas}
          className="absolute inset-0 h-full w-full"
          aria-label="Engineering and art should be seen through the same lens: three beams of letters, and a small figure you can walk across them."
        />
        <div ref={veil} aria-hidden className="pointer-events-none absolute inset-0 bg-paper opacity-0" />
        <div ref={pixels} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[30vh] w-[30vh] -translate-x-1/2 -translate-y-1/2">
          {PIXELS.map(([x, y], i) => (
            <span
              key={i}
              data-px
              className="absolute bg-ink"
              style={{ left: `${x * 16.66}%`, top: `${y * 16.66}%`, width: "16.66%", height: "16.66%", transform: "scale(0)" }}
            />
          ))}
        </div>

        <div
          ref={readout}
          aria-hidden
          className="pointer-events-none absolute left-[3.2vw] top-[12vh] whitespace-pre font-mono text-[9.5px] leading-relaxed tracking-[0.18em] text-ink/60"
          style={{ visibility: "hidden" }}
        />
        <div
          ref={hint}
          className="absolute bottom-[9vh] left-[3.2vw] font-mono text-[9.5px] tracking-[0.18em] text-ink/75"
          style={{ visibility: "hidden" }}
        >
          <dl className="hidden grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 md:grid">
            <dt><Key>W</Key><Key>A</Key><Key>S</Key><Key>D</Key></dt>
            <dd>WALK · OR DRAG</dd>
            <dt><Key wide>SHIFT</Key></dt>
            <dd>RUN</dd>
            <dt><Key wide>SPACE</Key></dt>
            <dd>JUMP · HOLD TO RISE</dd>
            <dt><Key>G</Key></dt>
            <dd>TURN GRAVITY TOWARD WHAT HE FACES</dd>
            <dt><Key>F</Key></dt>
            <dd>HOLD BY A RADIO TO TUNE IT</dd>
            <dt><Key>M</Key></dt>
            <dd>SOUND</dd>
          </dl>
          <p className="md:hidden">REST A THUMB, THEN DRAG TO WALK · DRAG FAR TO RUN · TAP THREE TIMES TO TURN GRAVITY</p>
          <p className="mt-3 flex items-center gap-3">
            <span>
              RADIOS <span ref={radioCount}>0 / 3</span> · ONE AT THE END OF EACH BEAM
            </span>
            <button
              ref={soundBtn}
              type="button"
              data-cursor="hover"
              onClick={(e) => {
                const m = sound.toggle();
                e.currentTarget.textContent = m ? "SOUND OFF" : "SOUND ON";
              }}
              className="border border-ink/40 px-2 py-0.5 hover:bg-ink hover:text-paper"
            >
              SOUND ON
            </button>
          </p>
        </div>
        <button
          ref={prompt}
          type="button"
          onPointerDown={() => {
            promptHeld.current = true;
            sound.start();
          }}
          onPointerUp={() => (promptHeld.current = false)}
          onPointerLeave={() => (promptHeld.current = false)}
          className="absolute left-0 top-0 border border-ink bg-paper px-2.5 py-1.5 font-mono text-[9.5px] tracking-[0.2em] text-ink"
          style={{ visibility: "hidden" }}
        >
          <span className="hidden md:inline">HOLD F TO TUNE</span>
          <span className="md:hidden">HOLD TO TUNE</span>
          <span className="mt-1 block h-[2px] w-full bg-ink/15">
            <span ref={promptBar} className="block h-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
          </span>
        </button>
        <p
          ref={caption}
          aria-live="polite"
          className="pointer-events-none absolute bottom-[15vh] left-1/2 w-[min(90vw,560px)] -translate-x-1/2 text-center font-serif text-[clamp(15px,1.4vw,20px)] italic text-ink opacity-0 transition-opacity duration-700"
        />
      </div>
    </section>
  );
}

function Key({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <span className={`mr-1 inline-flex h-[18px] items-center justify-center border border-ink/50 px-1 ${wide ? "min-w-[44px]" : "min-w-[18px]"}`}>
      {children}
    </span>
  );
}

// ------------------------------------------------------------------ the figure
function makeRunner(THREE: typeof import("three"), mat: T.Material): Runner {
  const part = (r: number, len: number) => {
    const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, len, 6, 12), mat);
    m.castShadow = true;
    return m;
  };
  const root = new THREE.Group();
  const hips = new THREE.Group();
  hips.position.y = 0.5;
  root.add(hips);

  const torso = part(0.11, 0.2);
  torso.position.y = 0.2;
  hips.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 14), mat);
  head.castShadow = true;
  head.position.y = 0.47;
  hips.add(head);

  const legs: Runner["legs"] = [];
  const arms: Runner["arms"] = [];
  for (const side of [-1, 1]) {
    const hip = new THREE.Group();
    hip.position.set(0.075 * side, 0, 0);
    hips.add(hip);
    const thigh = part(0.05, 0.15);
    thigh.position.y = -0.12;
    hip.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.25;
    hip.add(knee);
    const shin = part(0.045, 0.15);
    shin.position.y = -0.11;
    knee.add(shin);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.04, 0.13), mat);
    foot.castShadow = true;
    foot.position.set(0, -0.23, 0.03);
    knee.add(foot);
    legs.push({ hip, knee, side });

    const shoulder = new THREE.Group();
    shoulder.position.set(0.15 * side, 0.31, 0);
    hips.add(shoulder);
    const upper = part(0.035, 0.11);
    upper.position.y = -0.09;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.18;
    shoulder.add(elbow);
    const fore = part(0.032, 0.1);
    fore.position.y = -0.08;
    elbow.add(fore);
    arms.push({ shoulder, elbow, side });
  }
  return { root, hips, legs, arms };
}

function animateRunner(r: Runner, phase: number, run: number, t: number, grounded: boolean) {
  const breathe = Math.sin(t * 1.8) * 0.006;
  r.hips.position.y = 0.5 + Math.abs(Math.sin(phase)) * 0.06 * run + breathe;
  r.hips.rotation.x = 0.2 * run;
  for (const l of r.legs) {
    const s = Math.sin(phase + (l.side > 0 ? Math.PI : 0));
    l.hip.rotation.x = grounded ? -s * 0.9 * run : -0.5;
    l.knee.rotation.x = grounded ? Math.max(0, Math.sin(phase + (l.side > 0 ? Math.PI : 0) + Math.PI / 2)) * 1.4 * run + 0.05 : 0.9;
  }
  for (const a of r.arms) {
    const s = Math.sin(phase + (a.side > 0 ? 0 : Math.PI));
    a.shoulder.rotation.x = grounded ? -s * 0.85 * run : -2.4;
    a.shoulder.rotation.z = a.side * (0.08 + (grounded ? 0 : 0.5));
    a.elbow.rotation.x = -0.25 - 1.0 * run;
  }
}
