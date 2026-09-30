// Publishes extracted vectors into the Next.js project.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../..");
const OUT = path.join(HERE, "out");

const round = (s) => s.replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10));
const read = (n) => round(fs.readFileSync(path.join(OUT, `${n}.svg`), "utf8"));
const vbOf = (svg) => svg.match(/viewBox="([^"]+)"/)[1];
const inner = (svg) => svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
const group = (svg, id) => { const m = svg.match(new RegExp(`<g id="${id}">(.*?)</g>(?=<g id=|<path|</svg>|$)`)); if (!m) throw new Error("no group " + id); return m[1]; };
const ds = (markup) => [...markup.matchAll(/<path d="([^"]+)"([^>]*)\/>/g)].map((m) => ({ d: m[1], attrs: m[2] }));
const firstX = (d) => parseFloat(d.match(/M(-?[\d.]+)/)[1]);

fs.mkdirSync(`${ROOT}/public/illustrations`, { recursive: true });
fs.mkdirSync(`${ROOT}/src/brand`, { recursive: true });

// Static files (ids -> data-part so multiple inline copies never collide)
const statics = ["bike-cena", "cachorro", "bailarina", "mergulho", "maos-pao", "vaso-cena", "textura-crosta", "textura-tipografica", "bike", "selo", "logo"];
for (const n of statics) {
  const svg = read(n).replace(/<g id="([a-z-]+)">/g, '<g data-part="$1">').replace(/<svg /, `<svg role="img" aria-hidden="true" `);
  fs.writeFileSync(`${ROOT}/public/illustrations/${n}.svg`, svg);
}

// Logo: letters sorted by x, script, dot, pen-order centerline for the draw mask
const logo = read("logo");
const letters = ds(group(logo, "casa")).map((p) => p.d).sort((a, b) => firstX(a) - firstX(b));
const script = ds(group(logo, "almeria"))[0].d;
const dot = ds(group(logo, "dot"))[0].d;
const cl = JSON.parse(fs.readFileSync(path.join(OUT, "almeria-centerline.json"), "utf8"));
const total = cl.counts.reduce((a, b) => a + b, 0);

// Selo: ring (letters + dots, 2 colors) and horizontal script
const selo = read("selo");
const ring = ds(group(selo, "ring")).map((p) => ({ d: p.d, tone: /#f2ba72/.test(p.attrs) ? "accent" : "ink" }));
const seloScript = ds(group(selo, "script"))[0].d;

const markup = (n) => inner(read(n)).replace(/<g id="([a-z-]+)">/g, '<g data-part="$1">');
const ts = `// GERADO a partir de "Branding Completo/CasaAlmeria_miniMIV.pdf" (vetores do manual).
// Não editar à mão: regenerar com scripts/vectors (ver docs/assets.md).

export const LOGO = {
  viewBox: "${vbOf(logo)}",
  /** C, A, S, A — em ordem de leitura */
  letters: ${JSON.stringify(letters)},
  /** "almeria" manuscrito (contorno preenchido) */
  script: ${JSON.stringify(script)},
  /** pingo do i */
  dot: ${JSON.stringify(dot)},
  /** traço central na ordem da caneta — usado como máscara para "escrever" a assinatura */
  pen: ${JSON.stringify(cl.strokes.map(round))},
  /** peso relativo de cada traço (comprimento), soma = 1 */
  penWeights: ${JSON.stringify(cl.counts.map((c) => Math.round((c / total) * 1000) / 1000))},
  penWidth: ${Math.round(cl.maxWidthPt * 1.35 * 10) / 10},
} as const;

export const SELO = {
  viewBox: "${vbOf(selo)}",
  ring: ${JSON.stringify(ring)} as { d: string; tone: "ink" | "accent" }[],
  script: ${JSON.stringify(seloScript)},
} as const;

/** Bicicleta isolada; partes animáveis: wheel-front, wheel-rear, breads, basket, sprig, frame */
export const BIKE = { viewBox: "${vbOf(read("bike"))}", markup: ${JSON.stringify(markup("bike"))} } as const;

/** Mergulhadora na xícara; partes: steam, cup */
export const MERGULHO = { viewBox: "${vbOf(read("mergulho"))}", markup: ${JSON.stringify(markup("mergulho"))} } as const;

/** Mãos da Criação com o pão; partes: bread, hands */
export const MAOS_PAO = { viewBox: "${vbOf(read("maos-pao"))}", markup: ${JSON.stringify(markup("maos-pao"))} } as const;
`;
fs.writeFileSync(`${ROOT}/src/brand/vectors.ts`, ts);
console.log("letters", letters.length, "ring", ring.length, "pen", cl.strokes.length, "vectors.ts bytes", ts.length);
for (const n of statics) console.log(n, fs.statSync(`${ROOT}/public/illustrations/${n}.svg`).size);
