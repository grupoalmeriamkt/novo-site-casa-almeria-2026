/**
 * Elementos ambientais contínuos (selo girando, pão flutuando, vapor).
 * Todos no MESMO ticker; cada loop só roda enquanto seu elemento está visível.
 * Desligados em reduced motion (quem chama verifica) e no mobile quando indicado.
 */
import { gsap } from "./gsap";
import { scrollVelocity } from "./scroll";

type Loop = (time: number, dt: number) => void;

const running = new Set<Loop>();
let attached = false;

function tick(time: number, deltaTime: number) {
  running.forEach((loop) => loop(time, deltaTime / 1000));
}
function sync() {
  if (running.size && !attached) {
    gsap.ticker.add(tick);
    attached = true;
  } else if (!running.size && attached) {
    gsap.ticker.remove(tick);
    attached = false;
  }
}

export function addAmbient(el: Element, loop: Loop): () => void {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) running.add(loop);
      else running.delete(loop);
      sync();
    },
    { rootMargin: "15% 0px" },
  );
  io.observe(el);
  return () => {
    io.disconnect();
    running.delete(loop);
    sync();
  };
}

/** Rotação lenta; acelera levemente com a velocidade do scroll (o selo "sente" o movimento). */
export function spin(el: HTMLElement, degPerSecond = 6) {
  const set = gsap.quickSetter(el, "rotation", "deg");
  let angle = 0;
  return addAmbient(el, (_t, dt) => {
    const boost = Math.min(4, Math.abs(scrollVelocity()) / 900);
    angle = (angle + degPerSecond * (1 + boost) * dt) % 360;
    set(angle);
  });
}

/** Flutuação lenta (pão entre as mãos). Amplitude em px, período em s. */
export function float(el: HTMLElement, amplitude = 6, period = 5, phase = 0) {
  const set = gsap.quickSetter(el, "y", "px");
  const rot = gsap.quickSetter(el, "rotation", "deg");
  return addAmbient(el, (t) => {
    const s = Math.sin(((t + phase) / period) * Math.PI * 2);
    set(s * amplitude);
    rot(s * amplitude * 0.18);
  });
}
