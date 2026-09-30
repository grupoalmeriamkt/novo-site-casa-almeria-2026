/**
 * Image motion system. Só transform, opacity e clip-path — nada que cause layout.
 *  reveal     → máscara abre, imagem começa maior e assenta
 *  drift      → atravessa o viewport com velocidade levemente diferente
 *  crop       → mudança controlada de enquadramento durante o scroll
 *  follow     → ver pointer.ts
 *  transition → ver choreographies (AnyHour, Menu)
 */
import { gsap } from "./gsap";
import { duration, ease } from "./config";

export function imageReveal(frame: HTMLElement, { from = "bottom", start = "top 85%" }: { from?: "bottom" | "top" | "left"; start?: string } = {}) {
  const inner = frame.querySelector<HTMLElement>("[data-media-inner]") ?? frame.firstElementChild;
  const clipFrom = from === "top" ? "inset(0% 0% 100% 0%)" : from === "left" ? "inset(0% 100% 0% 0%)" : "inset(100% 0% 0% 0%)";
  const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start, once: true } });
  tl.fromTo(frame, { clipPath: clipFrom }, { clipPath: "inset(0% 0% 0% 0%)", duration: duration.slow, ease: ease.reveal });
  if (inner) tl.fromTo(inner, { scale: 1.18 }, { scale: 1, duration: duration.cinematic, ease: ease.reveal }, 0);
  return tl;
}

export function imageDrift(el: HTMLElement, amount: number) {
  return gsap.fromTo(
    el,
    { yPercent: -amount / 2 },
    { yPercent: amount / 2, ease: ease.linear, scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
  );
}

export function editorialCrop(frame: HTMLElement) {
  return gsap.fromTo(
    frame,
    { clipPath: "inset(7% 9% 7% 9% round var(--radius-m))" },
    {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      ease: ease.linear,
      scrollTrigger: { trigger: frame, start: "top 90%", end: "center 45%", scrub: true },
    },
  );
}
