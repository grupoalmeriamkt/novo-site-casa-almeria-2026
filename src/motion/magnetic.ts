/** Magnetismo sutil para botões principais. Só ponteiro fino; nunca em touch. */
import { gsap } from "./gsap";
import { ease } from "./config";

export function magnetic(el: HTMLElement, { strength = 0.28, label }: { strength?: number; label?: HTMLElement | null } = {}) {
  const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
  const lx = label ? gsap.quickTo(label, "x", { duration: 0.6, ease: "power3.out" }) : null;
  const ly = label ? gsap.quickTo(label, "y", { duration: 0.6, ease: "power3.out" }) : null;
  let rect: DOMRect | null = null;

  const enter = () => (rect = el.getBoundingClientRect());
  const move = (e: PointerEvent) => {
    if (!rect || e.pointerType !== "mouse") return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    xTo(dx * strength);
    yTo(dy * strength);
    lx?.(dx * strength * 0.35);
    ly?.(dy * strength * 0.35);
  };
  const leave = () => {
    rect = null;
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: ease.elastic, overwrite: true });
    if (label) gsap.to(label, { x: 0, y: 0, duration: 0.9, ease: ease.elastic, overwrite: true });
  };
  el.addEventListener("pointerenter", enter);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerleave", leave);
  return () => {
    el.removeEventListener("pointerenter", enter);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerleave", leave);
  };
}
