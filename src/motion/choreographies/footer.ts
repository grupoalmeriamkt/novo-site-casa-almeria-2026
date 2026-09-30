/**
 * Footer — conclusão. A logo enorme é revelada pelo scroll: letras sobem, a assinatura
 * se escreve, e no fundo (como no fundo da xícara) aparece a mensagem.
 */
import { gsap } from "../gsap";
import { penTimeline, prepPens, readWeights } from "../brand";
import type { Choreo } from "../choreography";

export const footer: Choreo = ({ root, tier, reduce }) => {
  if (reduce) return;
  const logo = root.querySelector<SVGSVGElement>("[data-footer-logo]");
  if (!logo) return;
  const letters = Array.from(logo.querySelectorAll("[data-letter]"));
  const pens = Array.from(logo.querySelectorAll<SVGPathElement>("[data-pen]"));
  const dot = logo.querySelector("[data-part='dot']");
  const cup = root.querySelector<HTMLElement>("[data-cup]");
  prepPens(pens);
  const sig = penTimeline(pens, readWeights(logo));

  const scrub = tier !== "mobile";
  const tl = gsap.timeline({
    scrollTrigger: scrub
      ? { trigger: logo, start: "top 95%", end: "bottom 70%", scrub: 0.8 }
      : { trigger: logo, start: "top 85%", once: true },
  });
  tl.from(letters, { yPercent: 45, autoAlpha: 0, stagger: 0.12, duration: 0.8, ease: "power2.out" })
    .to(sig, { progress: 1, duration: 1.4, ease: scrub ? "none" : "power1.inOut" }, 0.35)
    .fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.25, ease: "back.out(3)" }, ">-0.05");
  if (cup) gsap.from(cup, { autoAlpha: 0, y: 12, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: cup, start: "top 98%", once: true } });
};
