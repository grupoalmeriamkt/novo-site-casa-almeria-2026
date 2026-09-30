import { media } from "./config";

/** Com reduced motion: sem smooth scroll, sem parallax, sem ambientes contínuos, sem coreografias longas. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia(media.reduce).matches;
}

export function hasFinePointer(): boolean {
  return typeof window !== "undefined" && window.matchMedia(media.finePointer).matches;
}
