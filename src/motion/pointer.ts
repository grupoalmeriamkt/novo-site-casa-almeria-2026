/**
 * Image Follow / reação ao cursor. Retângulo medido só na entrada do ponteiro
 * (nunca getBoundingClientRect contínuo); movimento via quickTo.
 */
import { gsap } from "./gsap";

type FollowOptions = { strength?: number; rotate?: number; target?: HTMLElement };

export function follow(area: HTMLElement, { strength = 14, rotate = 0, target }: FollowOptions = {}) {
  const el = target ?? area;
  const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
  const rTo = rotate ? gsap.quickTo(el, "rotation", { duration: 1.1, ease: "power3.out" }) : null;
  let rect: DOMRect | null = null;

  const enter = () => {
    rect = area.getBoundingClientRect();
  };
  const move = (e: PointerEvent) => {
    if (!rect || e.pointerType !== "mouse") return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    xTo(nx * strength);
    yTo(ny * strength);
    rTo?.(nx * rotate);
  };
  const leave = () => {
    rect = null;
    xTo(0);
    yTo(0);
    rTo?.(0);
  };
  area.addEventListener("pointerenter", enter);
  area.addEventListener("pointermove", move);
  area.addEventListener("pointerleave", leave);
  return () => {
    area.removeEventListener("pointerenter", enter);
    area.removeEventListener("pointermove", move);
    area.removeEventListener("pointerleave", leave);
  };
}

/** Reação muito discreta à proximidade: o elemento "olha" levemente para o cursor dentro de uma seção. */
export function proximity(section: HTMLElement, el: HTMLElement, { strength = 10 } = {}) {
  const xTo = gsap.quickTo(el, "x", { duration: 1.4, ease: "power2.out" });
  const yTo = gsap.quickTo(el, "y", { duration: 1.4, ease: "power2.out" });
  let rect: DOMRect | null = null;
  const enter = () => (rect = section.getBoundingClientRect());
  const move = (e: PointerEvent) => {
    if (!rect || e.pointerType !== "mouse") return;
    xTo(((e.clientX - rect.left) / rect.width - 0.5) * strength);
    yTo(((e.clientY - rect.top) / rect.height - 0.5) * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };
  section.addEventListener("pointerenter", enter);
  section.addEventListener("pointermove", move);
  section.addEventListener("pointerleave", leave);
  return () => {
    section.removeEventListener("pointerenter", enter);
    section.removeEventListener("pointermove", move);
    section.removeEventListener("pointerleave", leave);
  };
}
