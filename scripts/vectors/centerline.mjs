// Builds a pen-order centerline for the "almeria" script (logo page 2, item 9)
// Output: out/almeria-centerline.json { strokes: [pathD...], width, bbox }
import * as mupdf from "mupdf";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT = path.join(HERE, "out");

const PDF = path.join(ROOT, "Branding Completo/CasaAlmeria_miniMIV.pdf");
const doc = mupdf.Document.openDocument(fs.readFileSync(PDF), "application/pdf");
const page = doc.loadPage(1);
const S = 6; // px per pt
const BB = [133, 238, 830, 366]; // script bbox (pt) with margin
const pix = page.toPixmap(mupdf.Matrix.scale(S, S), mupdf.ColorSpace.DeviceRGB, false);
const W = pix.getWidth(), H = pix.getHeight(), N = pix.getNumberOfComponents(), stride = pix.getStride();
const px = pix.getPixels();
const x0 = Math.floor(BB[0] * S), y0 = Math.floor(BB[1] * S), w = Math.ceil((BB[2] - BB[0]) * S), h = Math.ceil((BB[3] - BB[1]) * S);
const DOT = [612 * S, 300 * S, 645 * S, 331 * S]; // i-dot region, handled separately
const img = new Uint8Array(w * h);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const X = x0 + x, Y = y0 + y;
  if (X >= DOT[0] && X <= DOT[2] && Y >= DOT[1] && Y <= DOT[3]) continue;
  const o = Y * stride + X * N;
  const r = px[o], g = px[o + 1], b = px[o + 2];
  // amarelo #f2ba72 (242,186,114) vs white bg / navy letters
  const d = Math.hypot(r - 242, g - 186, b - 114);
  if (d < 70) img[y * w + x] = 1;
}
// half-width via BFS distance from background
const dist = new Int32Array(w * h).fill(-1);
let q = [];
for (let i = 0; i < w * h; i++) if (!img[i]) { dist[i] = 0; q.push(i); }
for (let qi = 0; qi < q.length; qi++) {
  const i = q[qi], x = i % w, y = (i / w) | 0;
  for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
    const nx = x + dx, ny = y + dy; if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
    const j = ny * w + nx; if (dist[j] < 0) { dist[j] = dist[i] + 1; q.push(j); }
  }
}
// Zhang-Suen thinning
const sk = img.slice();
const at = (x, y) => (x < 0 || y < 0 || x >= w || y >= h ? 0 : sk[y * w + x]);
let changed = true;
while (changed) {
  changed = false;
  for (const step of [0, 1]) {
    const del = [];
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
      if (!sk[y * w + x]) continue;
      const p = [at(x, y - 1), at(x + 1, y - 1), at(x + 1, y), at(x + 1, y + 1), at(x, y + 1), at(x - 1, y + 1), at(x - 1, y), at(x - 1, y - 1)];
      const B = p.reduce((a, b) => a + b, 0);
      if (B < 2 || B > 6) continue;
      let A = 0; for (let k = 0; k < 8; k++) if (!p[k] && p[(k + 1) % 8]) A++;
      if (A !== 1) continue;
      if (step === 0 ? (p[0] * p[2] * p[4] || p[2] * p[4] * p[6]) : (p[0] * p[2] * p[6] || p[0] * p[4] * p[6])) continue;
      del.push(y * w + x);
    }
    if (del.length) { changed = true; for (const i of del) sk[i] = 0; }
  }
}
// graph traversal in pen order
const nb = (i) => { const x = i % w, y = (i / w) | 0, r = []; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!dx && !dy) continue; const nx = x + dx, ny = y + dy; if (nx >= 0 && ny >= 0 && nx < w && ny < h && sk[ny * w + nx]) r.push(ny * w + nx); } return r; };
const skel = []; for (let i = 0; i < w * h; i++) if (sk[i]) skel.push(i);
// connected components, drop tiny ones
const comp = new Int32Array(w * h).fill(-1); const sizes = [];
for (const s of skel) { if (comp[s] >= 0) continue; const id = sizes.length; let n = 0; const st = [s]; comp[s] = id; while (st.length) { const i = st.pop(); n++; for (const j of nb(i)) if (comp[j] < 0) { comp[j] = id; st.push(j); } } sizes.push(n); }
const keep = new Set(skel.filter((i) => sizes[comp[i]] > 40));
const visitedPix = new Set(), visitedEdge = new Set();
const ek = (a, b) => (a < b ? a + "," + b : b + "," + a);
const strokes = [];
const deg = (i) => nb(i).filter((j) => keep.has(j)).length;
function nextStart() {
  let best = null;
  for (const i of keep) { if (visitedPix.has(i)) continue; const x = i % w; const isEnd = deg(i) === 1; const score = x - (isEnd ? 40 : 0); if (!best || score < best.score) best = { i, score }; }
  return best?.i;
}
while (true) {
  const s = nextStart(); if (s === undefined) break;
  const pts = [s]; visitedPix.add(s);
  let cur = s;
  while (true) {
    const cands = nb(cur).filter((j) => keep.has(j) && !visitedEdge.has(ek(cur, j)));
    if (!cands.length) break;
    const k = Math.max(0, pts.length - 8), a = pts[k];
    const dirx = (cur % w) - (a % w), diry = ((cur / w) | 0) - ((a / w) | 0);
    let best = null;
    for (const j of cands) {
      const vx = (j % w) - (cur % w), vy = ((j / w) | 0) - ((cur / w) | 0);
      let ang = pts.length > 1 ? Math.abs(Math.atan2(dirx * vy - diry * vx, dirx * vx + diry * vy)) : 0;
      if (pts.length === 1) ang = -vx * 0.1; // first step: prefer going right
      const cost = ang + (visitedPix.has(j) ? 1.2 : 0);
      if (!best || cost < best.cost) best = { j, cost };
    }
    if (best.cost > 2.2) break; // would need a sharp turn into visited territory
    visitedEdge.add(ek(cur, best.j));
    // mark neighbor pixels of a junction as visited edges too, to avoid ping-pong
    cur = best.j; pts.push(cur); visitedPix.add(cur);
  }
  if (pts.length > 25) strokes.push(pts);
  else for (const p of pts) visitedPix.add(p);
}
// RDP simplify
function rdp(P, eps) {
  if (P.length < 3) return P;
  const [ax, ay] = P[0], [bx, by] = P[P.length - 1];
  let md = 0, mi = 0; const L = Math.hypot(bx - ax, by - ay) || 1;
  for (let i = 1; i < P.length - 1; i++) { const d = Math.abs((by - ay) * P[i][0] - (bx - ax) * P[i][1] + bx * ay - by * ax) / L; if (d > md) { md = d; mi = i; } }
  if (md <= eps) return [P[0], P[P.length - 1]];
  return rdp(P.slice(0, mi + 1), eps).slice(0, -1).concat(rdp(P.slice(mi), eps));
}
const r2 = (v) => Math.round(v * 100) / 100;
const toPt = (i) => [(x0 + (i % w)) / S, (y0 + ((i / w) | 0)) / S];
// Catmull-Rom -> cubic
function smooth(P) {
  let d = `M${r2(P[0][0])} ${r2(P[0][1])}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] ?? P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d;
}
let maxHalf = 0; for (const i of keep) maxHalf = Math.max(maxHalf, dist[i]);
const out = strokes.map((s) => smooth(rdp(s.map(toPt), 0.35)));
const total = skel.length, covered = [...keep].filter((i) => visitedPix.has(i)).length;
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "almeria-centerline.json"), JSON.stringify({ strokes: out, maxWidthPt: r2((2 * maxHalf) / S), counts: strokes.map((s) => s.length) }, null, 1));
console.log("strokes", strokes.length, strokes.map((s) => s.length), "maxWidthPt", (2 * maxHalf) / S, "coverage", covered, "/", keep.size);
