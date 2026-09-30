/**
 * Typography motion system — três primitivas:
 *  LINE  → textos editoriais e manifesto (máscara por linha, re-split responsivo)
 *  WORD  → chamadas
 *  CHAR  → só grandes momentos (hero, títulos especiais)
 * SplitText cuida de aria (leitura semântica) e de refazer o split quando fontes/largura mudam.
 */
import { SplitText, gsap } from "./gsap";
import { duration, ease, stagger } from "./config";

export type SplitBy = "lines" | "words" | "chars";

type RevealOptions = {
  by: SplitBy;
  /** elemento que dispara; false = não usa ScrollTrigger (para timelines) */
  trigger?: Element | false;
  start?: string;
  delay?: number;
};

const fromVars = (by: SplitBy) =>
  by === "chars"
    ? { yPercent: 115, rotate: 4, duration: duration.slow, ease: ease.reveal, stagger: stagger.chars }
    : by === "words"
      ? { yPercent: 110, duration: duration.slow, ease: ease.reveal, stagger: stagger.words }
      : { yPercent: 105, duration: duration.slow, ease: ease.reveal, stagger: stagger.lines };

/** Revela um texto ao entrar na tela. Retorna o SplitText (reverte com .revert()). */
export function splitReveal(el: HTMLElement, { by, trigger, start = "top 85%", delay = 0 }: RevealOptions) {
  return SplitText.create(el, {
    type: by === "chars" ? "words,chars" : by,
    mask: by,
    autoSplit: by === "lines",
    linesClass: "split-line",
    onSplit(self) {
      const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
      return gsap.from(targets, {
        ...fromVars(by),
        delay,
        scrollTrigger: trigger === false ? undefined : { trigger: trigger ?? el, start, once: true },
      });
    },
  });
}

/** Para timelines: devolve os alvos já divididos, sem animar. */
export function splitFor(el: HTMLElement, by: SplitBy) {
  const split = SplitText.create(el, { type: by === "chars" ? "words,chars" : by, mask: by });
  const targets = by === "chars" ? split.chars : by === "words" ? split.words : split.lines;
  return { split, targets, vars: fromVars(by) };
}
