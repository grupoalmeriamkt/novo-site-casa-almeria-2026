/**
 * EDITORIAL — "Duas Casas. A mesma Casa."
 * Desktop: o lado de que o cursor se aproxima ganha espaço (clip-path, sem relayout).
 * Tablet/mobile/reduced: duas colunas ou blocos verticais, sem disputa.
 */
import { gsap } from "../gsap";
import type { Choreo } from "../choreography";

export const houses: Choreo = ({ root, tier, reduce }) => {
  if (reduce || tier !== "desktop") return;
  const stage = root.querySelector<HTMLElement>("[data-split-stage]");
  if (!stage) return;
  stage.setAttribute("data-split", "on");
  const proxy = { v: 50 };
  const to = gsap.quickTo(proxy, "v", {
    duration: 1.1,
    ease: "power3.out",
    onUpdate: () => stage.style.setProperty("--split", `${proxy.v}%`),
  });
  let rect: DOMRect | null = null;
  const enter = () => (rect = stage.getBoundingClientRect());
  const move = (e: PointerEvent) => {
    if (!rect || e.pointerType !== "mouse") return;
    const nx = (e.clientX - rect.left) / rect.width;
    to(gsap.utils.clamp(35, 65, 50 + (0.5 - nx) * 30));
  };
  const leave = () => {
    rect = null;
    to(50);
  };
  stage.addEventListener("pointerenter", enter);
  stage.addEventListener("pointermove", move);
  stage.addEventListener("pointerleave", leave);
  return () => {
    stage.removeEventListener("pointerenter", enter);
    stage.removeEventListener("pointermove", move);
    stage.removeEventListener("pointerleave", leave);
    stage.removeAttribute("data-split");
    stage.style.removeProperty("--split");
  };
};
