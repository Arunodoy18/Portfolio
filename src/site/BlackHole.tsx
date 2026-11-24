"use client";

import { useEffect, useRef, type RefObject } from "react";
import { isInk, mouse, onTick } from "./scroll";

const vert = `
attribute vec2 a;
void main(){ gl_Position = vec4(a,0.,1.); }
`;

// Ink-on-paper black hole. Everything is computed in a frame tilted with the disk.
const frag = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uFocus;   // 0..1 how "formed" the hole is
uniform vec2 uCenter;   // screen-space centre (0..1)
uniform float uScale;   // size in units of viewport height
uniform float uZoom;    // 0..1 camera falling toward the hole
uniform float uDark;    // 0 day, 1 night

float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<5;i++){ v+=a*noise(p); p=p*2.03+vec2(1.7,9.2); a*=.5; }
  return v;
}
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

// swirling gas density at polar coord
float gas(float r, float th, float t){
  vec2 q = vec2(th*3.0 - t*0.35/ max(r,0.3), r*4.0);
  float n = fbm(q + fbm(q*1.7 + t*0.05));
  return n;
}

void main(){
  vec2 frag = gl_FragCoord.xy;
  float unit = min(uRes.y, uRes.x * 1.25);  // keeps the hole sane on tall screens
  vec2 uv = (frag - uCenter*uRes) / (unit*uScale);
  vec2 m = (uMouse - 0.5) * vec2(uRes.x/uRes.y, -1.0);

  // gentle parallax toward the cursor
  uv -= m * 0.025;

  float t = uTime;
  float rs = 0.11 * mix(0.2, 1.0, uFocus);    // event horizon
  vec2 p = rot(-0.16 * (1.0 - uZoom)) * uv;    // disk tilt levels out as we approach
  float r = length(p);

  // gravitational lensing of the paper grid behind
  vec2 bent = p * (1.0 + (rs*rs*2.2) / max(dot(p,p), 1e-4));
  vec2 g = abs(fract(bent*9.0) - 0.5);
  float grid = smoothstep(0.012, 0.0, min(g.x,g.y)) * 0.05 * smoothstep(rs*1.05, rs*3.5, r);

  // ----- accretion disk (seen almost edge-on) -----
  float squash = 0.17;
  vec2 dp = vec2(p.x, p.y / squash);
  float dr = length(dp);
  float th = atan(dp.y, dp.x);
  float inner = rs * 1.45, outer = rs * 6.5;
  float band = smoothstep(inner*0.9, inner*1.4, dr) * (1.0 - smoothstep(inner*1.4, outer, dr)) * 0.85;
  float gd = gas(dr/outer, th, t);
  // doppler: approaching side (left) is denser ink, with a long trailing plume
  float doppler = 0.55 + 0.45 * smoothstep(0.5, -0.9, dp.x / (dr + 1e-3));
  float plume = smoothstep(outer*1.5, 0.0, length(vec2(p.x + rs*2.2, (p.y + p.x*0.18) / 0.26))) * 0.38 * (1.0 - uZoom*0.75);
  float disk = band * (0.35 + 0.95*gd) * doppler + plume * (0.4 + 0.6*fbm(p*6.0 - vec2(t*0.08, 0.)));

  // front half of the disk (below the hole) is in front, the back half is hidden by it
  float front = step(p.y, 0.0);

  // ----- lensed image of the far side: a halo hugging the horizon -----
  float ringR = rs * 1.28;
  float halo = exp(-pow((r - ringR) / (rs*0.32), 2.0));
  float haloGas = 0.55 + 0.8 * fbm(vec2(atan(p.y,p.x)*2.5 + t*0.25, r*12.0));
  float upper = smoothstep(-0.35, 0.6, p.y / max(r,1e-3));
  float lensed = halo * haloGas * (0.45 + 0.55*upper);

  // up close, the far side of the disk is lifted over the hole into a tall arch
  float archW = rs * (2.3 + 1.6*uZoom);
  float archY = rs * (1.2 + 1.15*uZoom) * exp(-pow(p.x / archW, 2.0));
  float thick = rs * (0.28 + 0.55*uZoom);
  float arch = exp(-pow((p.y - archY) / thick, 2.0));
  float under = smoothstep(archY, archY - thick*2.5, p.y) * smoothstep(-rs*0.4, rs*0.6, p.y) * exp(-pow(p.x / (archW*1.6), 2.0)) * 0.35;
  float streak = 0.6 + 0.6 * fbm(vec2(p.x*3.0 - t*0.2, (p.y - archY) * 40.0));
  lensed = mix(lensed, max(lensed, (arch * streak + under) * 0.9), uZoom);

  // photon ring: a razor of light just outside the horizon
  float photon = exp(-pow((r - rs*1.04) / (rs*0.035), 2.0));
  float photonArc = photon * smoothstep(0.2, -0.6, p.x / max(r,1e-3) - p.y / max(r,1e-3) * 0.4);

  float horizon = 1.0 - smoothstep(rs*0.97, rs*1.0, r);

  // light matter (disk + lensed halo) and the dark horizon, kept apart so both themes work
  float matter = clamp(lensed * 0.95 + disk * (1.0 - horizon) + disk * front * horizon * 0.85, 0.0, 1.0) * uFocus;
  float hole = horizon * (1.0 - clamp(disk * front * 0.85, 0.0, 1.0)) * uFocus;

  vec2 sUV = frag / uRes;
  float cold = exp(-length(vec2(p.x - rs*5.0, p.y/0.25)) * 4.5) * 0.10 * uFocus;

  // day: ink on paper
  vec3 paper = vec3(0.958, 0.958, 0.952) - 0.035 * length(sUV - vec2(0.5, 0.55)) - grid * uFocus;
  paper -= vec3(cold*0.55, cold*0.3, 0.0);
  vec3 inkCol = vec3(0.03, 0.035, 0.045);
  vec3 day = mix(paper, inkCol, max(matter, hole));

  // night: glowing gas in black space, the horizon blacker than the sky
  vec3 space = vec3(0.039, 0.039, 0.047) + 0.025 * (1.0 - length(sUV - vec2(0.5, 0.55))) + grid * uFocus * 0.6;
  space += vec3(0.0, cold*0.25, cold*0.55);
  vec3 gas = vec3(0.93, 0.93, 0.95);
  vec3 night = mix(space, gas, matter * 0.92);
  night = mix(night, vec3(0.0), hole);

  vec3 col = mix(day, night, uDark);
  // the light razor is white in both
  col = mix(col, vec3(1.0), clamp(photonArc * uFocus * (0.95 + uZoom), 0.0, 1.0) * (1.0 - front*0.5));

  // film grain
  col += (hash(frag + fract(t)) - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}
`;

export type HoleState = { focus: number; cx: number; cy: number; scale: number; zoom: number };

type Props = {
  /** read every frame: how formed the hole is (0..1), centre & scale */
  state: RefObject<HoleState>;
  className?: string;
};

export default function BlackHole({ state, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uFocus = u("uFocus");
    const uCenter = u("uCenter"), uScale = u("uScale"), uZoom = u("uZoom"), uDark = u("uDark");
    let dark = isInk() ? 1 : 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    const sm = { x: 0.5, y: 0.5 };
    const start = performance.now();
    const off = onTick((now) => {
      if (!visible) return;
      const st = state.current;
      sm.x += (mouse.x - sm.x) * 0.05;
      sm.y += (mouse.y - sm.y) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uMouse, sm.x, sm.y);
      gl.uniform1f(uFocus, st.focus);
      gl.uniform2f(uCenter, st.cx, st.cy);
      gl.uniform1f(uScale, st.scale);
      gl.uniform1f(uZoom, st.zoom);
      dark += ((isInk() ? 1 : 0) - dark) * 0.08;
      gl.uniform1f(uDark, dark);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });

    return () => {
      off();
      io.disconnect();
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [state]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
