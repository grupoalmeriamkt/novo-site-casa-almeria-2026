/**
 * Decoradores declarativos: componentes marcam o HTML com data-atributos,
 * o motion aplica o comportamento. Motion fica sobre o HTML, não o substitui.
 *
 *  data-split="lines|words|chars"   typography reveal
 *  data-reveal="up|fade"            entrada simples (lote)
 *  data-image-reveal[="top|left"]   máscara + escala
 *  data-crop                        editorial crop no scroll
 *  data-plane / data-speed          profundidade (parallax.ts)
 *  data-magnetic                    botão magnético (desktop)
 *  data-follow[="14"]               imagem responde ao ponteiro (desktop)
 *  data-ambient="spin|float"        loop ambiente (desktop/tablet; mobile só com data-ambient-mobile)
 */
import { ScrollTrigger, gsap } from "./gsap";
import { duration, ease, stagger, type Tier } from "./config";
import { splitReveal, type SplitBy } from "./text";
import { editorialCrop, imageReveal } from "./image";
import { applyPlanes } from "./parallax";
import { magnetic } from "./magnetic";
import { follow } from "./pointer";
import { float, spin } from "./ambient";

export function decorate(root: HTMLElement, tier: Tier): () => void {
  const cleanups: (() => void)[] = [];
  const all = <T extends HTMLElement = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T>(sel));

  all("[data-split]").forEach((el) => {
    let by = el.dataset.split as SplitBy;
    if (by === "chars" && tier === "mobile") by = "lines";
    if (by === "chars" && tier === "tablet") by = "words";
    const split = splitReveal(el, { by, start: el.dataset.splitStart });
    cleanups.push(() => split.revert());
  });

  const ups = all("[data-reveal]");
  if (ups.length) {
    gsap.set(ups, { autoAlpha: 0, y: (_i, el: HTMLElement) => (el.dataset.reveal === "fade" ? 0 : 36) });
    ScrollTrigger.batch(ups, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: duration.slow, ease: ease.reveal, stagger: stagger.items, overwrite: true }),
    });
  }

  all("[data-image-reveal]").forEach((el) => {
    imageReveal(el, { from: (el.dataset.imageReveal || "bottom") as "bottom" | "top" | "left" });
  });

  if (tier !== "mobile") all("[data-crop]").forEach((el) => editorialCrop(el));

  applyPlanes(root, tier);

  if (tier === "desktop") {
    all("[data-magnetic]").forEach((el) => cleanups.push(magnetic(el, { label: el.querySelector<HTMLElement>("[data-magnetic-label]") })));
    all("[data-follow]").forEach((el) => {
      const target = el.querySelector<HTMLElement>("[data-follow-target]") ?? undefined;
      cleanups.push(follow(el, { strength: parseFloat(el.dataset.follow || "14"), target }));
    });
  }

  all("[data-ambient]").forEach((el, i) => {
    if (tier === "mobile" && !("ambientMobile" in el.dataset)) return;
    const kind = el.dataset.ambient;
    if (kind === "spin") {
      gsap.set(el, { transformOrigin: "50% 50%" });
      cleanups.push(spin(el, parseFloat(el.dataset.ambientSpeed || "6")));
    } else if (kind === "float") {
      cleanups.push(float(el, parseFloat(el.dataset.ambientAmp || "6"), parseFloat(el.dataset.ambientPeriod || "5"), i * 0.7));
    }
  });

  return () => cleanups.forEach((fn) => fn());
}
