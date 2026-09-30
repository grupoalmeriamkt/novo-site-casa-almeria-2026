import { ScrollTrigger, gsap } from "./gsap";
import { track } from "@/lib/analytics";

let velocity = 0;
let velocityTrigger: ScrollTrigger | null = null;

/** Velocidade de scroll suavizada (px/s), lida pelos loops ambientais. */
export function scrollVelocity(): number {
  return velocity;
}

/**
 * Recalcula posições depois que fontes e imagens estabilizam
 * e mede profundidade de scroll (scroll_depth 25/50/75/100).
 */
export function initScroll(): () => void {
  const refresh = () => ScrollTrigger.refresh();
  document.fonts?.ready.then(refresh).catch(() => {});
  if (document.readyState === "complete") refresh();
  else window.addEventListener("load", refresh, { once: true });

  const smooth = gsap.quickTo({ v: 0 }, "v", { duration: 0.6, ease: "power3.out" });
  velocityTrigger = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      velocity = gsap.utils.clamp(-4000, 4000, self.getVelocity());
      smooth(velocity);
    },
  });

  const marks = [25, 50, 75, 100];
  const hit = new Set<number>();
  const depth = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      const pct = Math.round(self.progress * 100);
      for (const m of marks) {
        if (pct >= m && !hit.has(m)) {
          hit.add(m);
          track("scroll_depth", { percent: m, path: location.pathname });
        }
      }
    },
  });

  // velocity decays when scroll stops
  const decay = () => {
    velocity *= 0.9;
  };
  gsap.ticker.add(decay);

  return () => {
    velocityTrigger?.kill();
    depth.kill();
    gsap.ticker.remove(decay);
    window.removeEventListener("load", refresh);
  };
}
