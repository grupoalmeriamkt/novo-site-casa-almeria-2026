// Vector extractor for CasaAlmeria_miniMIV.pdf
// usage (a partir da raiz do projeto, com `npm i --no-save mupdf`):
//   node scripts/vectors/extract.mjs dump <page> [-v]          -> itens desenhados na página
//   node scripts/vectors/extract.mjs build [name...]           -> scripts/vectors/out/<name>.svg
import * as mupdf from "mupdf";
import fs from "node:fs";

import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT = path.join(HERE, "out");
const PDF = path.join(ROOT, "Branding Completo/CasaAlmeria_miniMIV.pdf");
const doc = mupdf.Document.openDocument(fs.readFileSync(PDF), "application/pdf");

// Official palette (hex from manual p.14). Extracted colors within tolerance snap to these.
export const PALETTE = {
  azul: "#11284b", amarelo: "#f2ba72", verde: "#304334", bordo: "#5b2f2e",
  vermelho: "#d34848", rosa: "#ec9cbc", azulclaro: "#89bfca", oliva: "#6d8257",
  branco: "#ffffff", preto: "#11141b",
};
const hex = (r, g, b) => "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
const rgbOf = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
function snap(h) {
  const [r, g, b] = rgbOf(h);
  let best = null, bd = 1e9;
  for (const [name, p] of Object.entries(PALETTE)) {
    const [R, G, B] = rgbOf(p);
    const d = Math.hypot(r - R, g - G, b - B);
    if (d < bd) { bd = d; best = p; }
  }
  return bd < 34 ? best : h;
}
function toHex(cs, color) {
  const n = cs.getNumberOfComponents();
  if (n === 4) {
    const [c, m, y, k] = color;
    return snap(hex(255 * (1 - c) * (1 - k), 255 * (1 - m) * (1 - k), 255 * (1 - y) * (1 - k)));
  }
  if (n === 3) return snap(hex(color[0] * 255, color[1] * 255, color[2] * 255));
  if (n === 1) return snap(hex(color[0] * 255, color[0] * 255, color[0] * 255));
  return "#ff00ff";
}
const r2 = (v) => Math.round(v * 100) / 100;
function pathData(p, m) {
  const [a, b, c, d, e, f] = m;
  const T = (x, y) => `${r2(a * x + c * y + e)} ${r2(b * x + d * y + f)}`;
  let s = "";
  p.walk({
    moveTo: (x, y) => (s += `M${T(x, y)}`),
    lineTo: (x, y) => (s += `L${T(x, y)}`),
    curveTo: (x1, y1, x2, y2, x3, y3) => (s += `C${T(x1, y1)} ${T(x2, y2)} ${T(x3, y3)}`),
    closePath: () => (s += "Z"),
  });
  return s;
}
const scaleOf = (m) => Math.sqrt(Math.abs(m[0] * m[3] - m[1] * m[2]));
const CAPS = ["butt", "round", "square", "round"];
const JOINS = ["miter", "round", "bevel", "miter"];

let _zero = null;
const ZERO = () => (_zero ??= new mupdf.StrokeState({ lineCap: "Butt", lineJoin: "Miter", lineWidth: 0, miterLimit: 10 }));
export function collect(pageNo) {
  const page = doc.loadPage(pageNo - 1);
  const items = [];
  const clips = [];
  const stack = [];
  let clipId = 0;
  const dev = new mupdf.Device({
    fillPath(p, evenOdd, ctm, cs, color, alpha) {
      const bb = p.getBounds(ZERO(), ctm);
      items.push({ i: items.length, kind: "fill", d: pathData(p, ctm), evenOdd, color: toHex(cs, color), alpha, bbox: bb, clips: [...stack] });
    },
    strokePath(p, st, ctm, cs, color, alpha) {
      const bb = p.getBounds(st, ctm);
      items.push({
        i: items.length, kind: "stroke", d: pathData(p, ctm), color: toHex(cs, color), alpha, bbox: bb, clips: [...stack],
        width: r2(st.getLineWidth() * scaleOf(ctm)), cap: CAPS[st.getLineCap()] ?? "butt", join: JOINS[st.getLineJoin()] ?? "miter",
        miter: st.getMiterLimit(),
      });
    },
    clipPath(p, evenOdd, ctm) {
      const id = ++clipId;
      clips[id] = { d: pathData(p, ctm), evenOdd, bbox: p.getBounds(ZERO(), ctm) };
      stack.push(id);
    },
    clipStrokePath(p, st, ctm) { const id = ++clipId; clips[id] = { d: pathData(p, ctm), evenOdd: false, bbox: [0, 0, 0, 0] }; stack.push(id); },
    clipText() { stack.push(0); },
    clipImageMask() { stack.push(0); },
    popClip() { stack.pop(); },
    fillImage(img, ctm) { items.push({ i: items.length, kind: "image", bbox: [ctm[4], ctm[5], ctm[4] + ctm[0], ctm[5] + ctm[3]], color: "img", clips: [...stack] }); },
  });
  page.run(dev, mupdf.Matrix.identity);
  dev.close();
  return { items, clips, bounds: page.getBounds() };
}

const area = (b) => Math.max(0, b[2] - b[0]) * Math.max(0, b[3] - b[1]);
const inside = (b, r) => b[0] >= r[0] && b[1] >= r[1] && b[2] <= r[2] && b[3] <= r[3];
const centerIn = (b, r) => { const x = (b[0] + b[2]) / 2, y = (b[1] + b[3]) / 2; return x >= r[0] && x <= r[2] && y >= r[1] && y <= r[3]; };

// rule: { region?, center?, colors?, notColors?, maxArea?, minArea?, kinds?, ids?, notIds?, test?(item) }
function match(it, rule) {
  if (it.kind === "image") return false;
  if (rule.ids && !rule.ids.includes(it.i)) return false;
  if (rule.notIds && rule.notIds.includes(it.i)) return false;
  if (rule.range && (it.i < rule.range[0] || it.i > rule.range[1])) return false;
  if (rule.region && !inside(it.bbox, rule.region)) return false;
  if (rule.center && !centerIn(it.bbox, rule.center)) return false;
  if (rule.colors && !rule.colors.includes(it.color)) return false;
  if (rule.notColors && rule.notColors.includes(it.color)) return false;
  if (rule.kinds && !rule.kinds.includes(it.kind)) return false;
  if (rule.maxArea && area(it.bbox) > rule.maxArea) return false;
  if (rule.minArea && area(it.bbox) < rule.minArea) return false;
  if (rule.test && !rule.test(it)) return false;
  return true;
}
const anyMatch = (it, rules) => [].concat(rules).some((r) => match(it, r));

function el(it, recolor) {
  const color = recolor?.[it.color] ?? it.color;
  if (it.kind === "fill") return `<path d="${it.d}" fill="${color}"${it.evenOdd ? ' fill-rule="evenodd"' : ""}${it.alpha < 1 ? ` fill-opacity="${r2(it.alpha)}"` : ""}/>`;
  return `<path d="${it.d}" fill="none" stroke="${color}" stroke-width="${it.width}" stroke-linecap="${it.cap}" stroke-linejoin="${it.join}"${it.join === "miter" ? ` stroke-miterlimit="${r2(it.miter)}"` : ""}${it.alpha < 1 ? ` stroke-opacity="${r2(it.alpha)}"` : ""}/>`;
}

// spec: { page, include: rule|rule[], exclude?: rule|rule[], layers?: [{id, rule}], pad?, keepClips?, recolor?, viewBox? }
export function build(spec) {
  const { items, clips } = collect(spec.page);
  const chosen = items.filter((it) => anyMatch(it, spec.include) && !(spec.exclude && anyMatch(it, spec.exclude)));
  if (!chosen.length) throw new Error("nothing selected for " + spec.name);
  let [x0, y0, x1, y1] = [1e9, 1e9, -1e9, -1e9];
  for (const it of chosen) { x0 = Math.min(x0, it.bbox[0]); y0 = Math.min(y0, it.bbox[1]); x1 = Math.max(x1, it.bbox[2]); y1 = Math.max(y1, it.bbox[3]); }
  const pad = spec.pad ?? 1;
  const clipBox = spec.viewBoxClip ? clips[chosen[0].clips.filter((c) => c > 0).at(-1)]?.bbox : null;
  const vb = spec.viewBox ?? (clipBox ? [clipBox[0], clipBox[1], clipBox[2] - clipBox[0], clipBox[3] - clipBox[1]].map(r2) : null) ?? [x0 - pad, y0 - pad, x1 - x0 + 2 * pad, y1 - y0 + 2 * pad].map(r2);
  const usedClips = new Set();
  const layerOf = (it) => spec.layers?.find((l) => anyMatch(it, l.rule))?.id ?? null;
  // Emit in paint order; consecutive items with same layer+clip-stack share a group.
  const out = [];
  let cur = null;
  const flush = () => { if (cur) out.push(cur); cur = null; };
  // Consolidate: every layer is emitted as one group at the paint position of its first item.
  const byLayer = new Map();
  for (const it of chosen) { const l = layerOf(it); if (l && !byLayer.has(l)) byLayer.set(l, []); if (l) byLayer.get(l).push(it); }
  const ordered = [];
  const done = new Set();
  for (const it of chosen) {
    const l = layerOf(it);
    if (!l) { ordered.push(it); continue; }
    if (done.has(l)) continue;
    done.add(l); ordered.push(...byLayer.get(l));
  }
  for (const it of ordered) {
    const layer = layerOf(it);
    const cstack = spec.keepClips === false ? [] : it.clips.filter((c) => c > 0);
    const key = layer + "|" + cstack.join(",");
    if (!cur || cur.key !== key) { flush(); cur = { key, layer, cstack, els: [] }; }
    cur.els.push(el(it, spec.recolor));
    cstack.forEach((c) => usedClips.add(c));
  }
  flush();
  // Merge consecutive runs of the same layer into one <g id=layer>
  let body = "";
  let openLayer = null;
  for (const run of out) {
    if (run.layer !== openLayer) {
      if (openLayer) body += `</g>`;
      if (run.layer) body += `<g id="${run.layer}">`;
      openLayer = run.layer;
    }
    let inner = run.els.join("");
    for (const c of [...run.cstack].reverse()) inner = `<g clip-path="url(#c${c})">${inner}</g>`;
    body += inner;
  }
  if (openLayer) body += `</g>`;
  const defs = [...usedClips].map((c) => `<clipPath id="c${c}"><path d="${clips[c].d}"${clips[c].evenOdd ? ' clip-rule="evenodd"' : ""}/></clipPath>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(" ")}">${defs ? `<defs>${defs}</defs>` : ""}${body}</svg>`;
  return { svg, count: chosen.length, vb };
}


const [, , cmd, arg, ...rest] = process.argv;
if (cmd === "dump") {
  const { items, clips, bounds } = collect(+arg);
  console.log("bounds", bounds, "items", items.length, "clips", clips.length - 1);
  const byColor = {};
  for (const it of items) { const k = `${it.kind}:${it.color}`; byColor[k] = (byColor[k] || 0) + 1; }
  console.log(byColor);
  const verbose = rest.includes("-v");
  for (const it of items) {
    const a = area(it.bbox);
    if (verbose || a > 3000 || it.kind === "image")
      console.log(it.i, it.kind, it.color, it.bbox.map(Math.round).join(","), "area", Math.round(a), "clips", it.clips.join("/"), it.width ?? "");
  }
} else if (cmd === "build") {
  const specs = (await import(path.join(HERE, "specs.mjs"))).default;
  const only = [arg, ...rest].filter(Boolean);
  fs.mkdirSync(OUT, { recursive: true });
  for (const spec of specs) {
    if (only.length && !only.includes(spec.name)) continue;
    const { svg, count, vb } = build(spec);
    fs.writeFileSync(path.join(OUT, `${spec.name}.svg`), svg);
    console.log(spec.name, "items", count, "viewBox", vb.join(" "), "bytes", svg.length);
  }
}
