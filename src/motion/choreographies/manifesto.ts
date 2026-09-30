/**
 * HERO (calmo) — manifesto. Menos estímulo: as linhas entram por máscara (data-split),
 * o vapor da xícara sobe devagar, e a assinatura final é a única coisa que se escreve.
 */
import { gsap } from "../gsap";
import { float } from "../ambient";
import { penTimeline, prepPens, readWeights } from "../brand";
import type { Choreo } from "../choreography";

export const manifesto: Choreo = ({ root, tier, reduce }) => {
  if (reduce) return;
  const cleanups: (() => void)[] = [];
  const steam = root.querySelector<SVGGElement>("[data-part='steam']") as unknown as HTMLElement | null;
  if (steam && tier !== "mobile") cleanups.push(float(steam, 5, 3.6));

  const sign = root.querySelector<SVGSVGElement>("[data-manifesto-logo]");
  if (sign) {
    const pens = Array.from(sign.querySelectorAll<SVGPathElement>("[data-pen]"));
    const dot = sign.querySelector("[data-part='dot']");
    prepPens(pens);
    const sig = penTimeline(pens, readWeights(sign));
    gsap
      .timeline({ scrollTrigger: { trigger: sign, start: "top 80%", once: true } })
      .from(sign.querySelectorAll("[data-letter]"), { yPercent: 40, autoAlpha: 0, stagger: 0.08, duration: 1, ease: "expo.out" })
      .to(sig, { progress: 1, duration: 1.8, ease: "power1.inOut" }, 0.4)
      .fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.45, ease: "back.out(3)" }, ">-0.1");
  }
  return () => cleanups.forEach((fn) => fn());
};
