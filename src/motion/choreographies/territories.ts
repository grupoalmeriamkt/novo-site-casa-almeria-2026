/**
 * EDITORIAL — "O que você veio buscar?"
 * A bicicleta atravessa a seção: a roda gira exatamente o que a distância percorrida pede
 * (rotação = deslocamento / (π · diâmetro)), por isso o scrub aqui tem razão física.
 * Os pães sobem dentro da cesta enquanto ela anda.
 */
import { gsap } from "../gsap";
import type { Choreo } from "../choreography";

const NS = "http://www.w3.org/2000/svg";

export const territories: Choreo = ({ root, tier, reduce }) => {
  const track = root.querySelector<HTMLElement>("[data-bike-track]");
  const bike = root.querySelector<HTMLElement>("[data-bike]");
  if (!track || !bike || reduce || tier === "mobile") return;

  const wheels = Array.from(bike.querySelectorAll<SVGGElement>("[data-part^='wheel']"));
  const breads = bike.querySelector<SVGGElement>("[data-part='breads']");
  const clipId = bike.dataset.breadsClip;

  // Os pães ficam num grupo recortado pela borda da cesta; o grupo interno é o que sobe.
  let holder: SVGGElement | null = null;
  if (breads && clipId && breads.parentNode) {
    holder = document.createElementNS(NS, "g");
    holder.setAttribute("clip-path", `url(#${clipId})`);
    breads.parentNode.insertBefore(holder, breads);
    holder.appendChild(breads);
  }

  gsap.set(wheels, { transformOrigin: "50% 50%" });
  const travel = () => track.offsetWidth + bike.offsetWidth;
  const wheelPx = () => wheels[0]?.getBoundingClientRect().width || 100;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.9,
      invalidateOnRefresh: true,
    },
  });
  tl.fromTo(bike, { x: () => -bike.offsetWidth }, { x: () => track.offsetWidth, ease: "none", duration: 1 }, 0)
    .fromTo(wheels, { rotation: 0 }, { rotation: () => (travel() / (Math.PI * wheelPx())) * 360, ease: "none", duration: 1 }, 0);
  if (breads) tl.fromTo(breads, { y: 150 }, { y: 0, ease: "power2.out", duration: 0.4 }, 0.08);

  return () => {
    if (holder && breads && holder.parentNode) {
      holder.parentNode.insertBefore(breads, holder);
      holder.remove();
    }
  };
};
