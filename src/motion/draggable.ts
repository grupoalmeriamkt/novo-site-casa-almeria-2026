/**
 * Coleção arrastável (O que vai ser hoje?). Drag com inércia + snap,
 * trackpad horizontal via ScrollTrigger.observe (sem sequestrar o scroll vertical).
 * No mobile o componente usa scroll nativo com scroll-snap (swipe simples).
 */
import { Draggable, ScrollTrigger, gsap } from "./gsap";

type CollectionOptions = {
  viewport: HTMLElement;
  track: HTMLElement;
  items: HTMLElement[];
  onIndex: (index: number) => void;
};

export function createCollection({ viewport, track, items, onIndex }: CollectionOptions) {
  let offsets: number[] = [];
  let minX = 0;
  let current = 0;

  const measure = () => {
    const base = items[0]?.offsetLeft ?? 0;
    offsets = items.map((it) => -(it.offsetLeft - base));
    minX = Math.min(0, viewport.clientWidth - track.scrollWidth);
  };
  measure();

  const nearest = (x: number) => {
    let best = 0;
    offsets.forEach((o, i) => {
      if (Math.abs(o - x) < Math.abs(offsets[best] - x)) best = i;
    });
    return best;
  };
  const report = (x: number) => {
    const i = nearest(x);
    if (i !== current) {
      current = i;
      onIndex(i);
    }
  };

  const [drag] = Draggable.create(track, {
    type: "x",
    inertia: true,
    bounds: { minX, maxX: 0 },
    edgeResistance: 0.85,
    dragClickables: true,
    cursor: "grab",
    activeCursor: "grabbing",
    snap: { x: (v: number) => Math.max(minX, offsets[nearest(v)]) },
    onDrag() {
      report(this.x);
    },
    onThrowUpdate() {
      report(this.x);
    },
  });

  const goTo = (i: number) => {
    const idx = gsap.utils.clamp(0, items.length - 1, i);
    const x = Math.max(minX, offsets[idx]);
    gsap.to(track, { x, duration: 0.9, ease: "power3.out", onUpdate: () => drag.update() });
    if (idx !== current) {
      current = idx;
      onIndex(idx);
    }
  };

  // Trackpad horizontal: só deltaX; vertical continua sendo scroll da página.
  let wheelAccum = 0;
  const obs = ScrollTrigger.observe({
    target: viewport,
    type: "wheel",
    wheelSpeed: 1,
    onChangeX(self) {
      if (Math.abs(self.deltaX) < Math.abs(self.deltaY)) return;
      wheelAccum += self.deltaX;
      if (Math.abs(wheelAccum) > 60) {
        goTo(current + (wheelAccum > 0 ? 1 : -1));
        wheelAccum = 0;
      }
    },
    onStop: () => (wheelAccum = 0),
  });

  const onResize = () => {
    measure();
    drag.applyBounds({ minX, maxX: 0 });
    goTo(current);
  };
  ScrollTrigger.addEventListener("refresh", onResize);

  return {
    goTo,
    next: () => goTo(current + 1),
    prev: () => goTo(current - 1),
    kill() {
      drag.kill();
      obs.kill();
      ScrollTrigger.removeEventListener("refresh", onResize);
    },
  };
}
