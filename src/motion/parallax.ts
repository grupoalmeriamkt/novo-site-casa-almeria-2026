/**
 * Sistema de profundidade: background · midground · content · foreground.
 * Cada plano tem velocidade própria; diferenças pequenas (ver config.planes).
 * data-plane="background|midground|foreground" ou data-speed="-8" (yPercent livre).
 */
import { gsap } from "./gsap";
import { amplitude, ease, planes, type Intensity, type Plane, type Tier } from "./config";

export function applyPlanes(root: HTMLElement, tier: Tier) {
  if (tier === "mobile") return;
  const els = root.querySelectorAll<HTMLElement>("[data-plane], [data-speed]");
  els.forEach((el) => {
    const plane = el.dataset.plane as Plane | undefined;
    const intensity = (el.closest<HTMLElement>("[data-intensity]")?.dataset.intensity ?? "editorial") as Intensity;
    let shift = el.dataset.speed ? parseFloat(el.dataset.speed) : plane ? planes[plane][tier] : 0;
    if (tier === "tablet" && el.dataset.speed) shift *= 0.5;
    shift *= amplitude[intensity];
    if (!shift) return;
    gsap.fromTo(
      el,
      { yPercent: -shift / 2 },
      {
        yPercent: shift / 2,
        ease: ease.linear,
        scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });
}
