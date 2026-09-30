import { gsap } from "./gsap";
import { media, type Tier } from "./config";
import { decorate } from "./reveal";

export type ChoreoContext = { root: HTMLElement; tier: Tier; reduce: boolean };
/** Uma coreografia devolve (opcionalmente) a limpeza do que não é GSAP. */
export type Choreo = (ctx: ChoreoContext) => void | (() => void);

/**
 * Roda decoradores + coreografia específica dentro de gsap.matchMedia:
 * ao trocar de breakpoint ou de preferência de movimento, tudo é revertido e refeito.
 */
export function runChoreography(root: HTMLElement, choreo?: Choreo): () => void {
  const mm = gsap.matchMedia();
  mm.add(
    { desktop: media.desktop, tablet: media.tablet, mobile: media.mobile, reduce: media.reduce },
    (context) => {
      const c = context.conditions ?? {};
      const tier: Tier = c.mobile ? "mobile" : c.desktop ? "desktop" : "tablet";
      const reduce = Boolean(c.reduce);
      const cleanups: (() => void)[] = [];
      if (!reduce) cleanups.push(decorate(root, tier));
      const extra = choreo?.({ root, tier, reduce });
      if (extra) cleanups.push(extra);
      return () => cleanups.forEach((fn) => fn());
    },
    root,
  );
  return () => mm.revert();
}
