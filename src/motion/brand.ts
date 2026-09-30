/**
 * A assinatura "almeria" sendo escrita — continuidade do motion original da marca (GIF 08/09 da Cápsula).
 * Cada traço de caneta é uma máscara (DrawSVG) que revela o contorno original, na ordem da escrita.
 */
import { gsap } from "./gsap";

/** Esconde os traços antes de desenhar (pontas redondas deixariam pontinhos visíveis em 0%). */
export function prepPens(pens: Element[]) {
  gsap.set(pens, { drawSVG: "0%", opacity: 0 });
}

/**
 * Timeline pausada de 1s de duração total; anime o progress dela (com o ease desejado)
 * para controlar o ritmo da escrita como um gesto único.
 */
export function penTimeline(pens: Element[], weights: number[]) {
  const tl = gsap.timeline({ paused: true });
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let t = 0;
  pens.forEach((pen, i) => {
    const w = (weights[i] ?? 1 / pens.length) / total;
    tl.set(pen, { opacity: 1 }, t).fromTo(pen, { drawSVG: "0%" }, { drawSVG: "100%", duration: w, ease: "none" }, t);
    t += w;
  });
  return tl;
}

export function readWeights(el: Element | null): number[] {
  return (el?.getAttribute("data-pen-weights") ?? "").split(",").map(Number).filter((n) => n > 0);
}
