/**
 * HERO — "Da nossa Casa para a sua." O azul cresce como uma grande mesa;
 * os objetos pousam nela com peso: cada um em sua profundidade (posição, escala, rotação).
 * As mãos passam o pão adiante — o gesto de presentear.
 */
import { gsap } from "../gsap";
import { float } from "../ambient";
import type { Choreo } from "../choreography";

export const fromOurHouse: Choreo = ({ root, tier, reduce }) => {
  if (reduce) return;
  const table = root.querySelector<HTMLElement>("[data-table]");
  const objects = Array.from(root.querySelectorAll<HTMLElement>("[data-object]"));
  const hands = root.querySelector<HTMLElement>("[data-hands]");
  const bread = hands?.querySelector<SVGGElement>("[data-part='bread']") as unknown as HTMLElement | null;
  const cleanups: (() => void)[] = [];

  if (table && tier !== "mobile") {
    gsap.fromTo(
      table,
      { clipPath: "inset(6% 4% 6% 4% round 28px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "top 15%", scrub: true },
      },
    );
  }

  if (tier !== "mobile") {
    objects.forEach((el) => {
      const depth = parseFloat(el.dataset.depth || "1");
      const rot = parseFloat(el.dataset.rot || "0");
      gsap.fromTo(
        el,
        { y: 110 * depth, rotation: rot - 5 * depth, scale: 1 - 0.05 * depth },
        {
          y: -80 * depth,
          rotation: rot + 3 * depth,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.9 },
        },
      );
    });
  }

  if (hands) {
    gsap.fromTo(
      hands,
      { xPercent: tier === "mobile" ? 0 : -6 },
      { xPercent: tier === "mobile" ? 0 : 4, ease: "none", scrollTrigger: { trigger: hands, start: "top bottom", end: "bottom top", scrub: true } },
    );
    if (bread && tier !== "mobile") {
      gsap.set(bread, { transformOrigin: "50% 50%" });
      cleanups.push(float(bread, 7, 4.5));
    }
  }

  return () => cleanups.forEach((fn) => fn());
};
