/**
 * Tokens de motion. Nenhum componente inventa timing próprio: tudo sai daqui.
 * Critério de aprovação de cada animação (personalidade da marca, Cápsula):
 * agradável · humana · detalhista · sensual — nunca incomum, rebelde ou questionadora.
 */

export const ease = {
  /** movimentos contínuos, ida e volta */
  smooth: "power2.inOut",
  /** máscaras e revelações: sai rápido, assenta devagar */
  reveal: "expo.out",
  /** entradas de elementos */
  enter: "power3.out",
  /** reservado a microinterações de retorno (magnetismo) */
  elastic: "elastic.out(1, 0.55)",
  /** scrub e loops */
  linear: "none",
} as const;

export const duration = {
  fast: 0.35,
  normal: 0.7,
  slow: 1.2,
  cinematic: 2,
} as const;

export const stagger = {
  chars: 0.028,
  words: 0.06,
  lines: 0.1,
  items: 0.08,
} as const;

/** SUBTLE: links, botões · EDITORIAL: fotos, seções, títulos · HERO: momentos especiais */
export type Intensity = "subtle" | "editorial" | "hero";
export type Tier = "desktop" | "tablet" | "mobile";

/**
 * "A Casa tem peso": deslocamentos por plano, em % da altura do elemento.
 * Diferenças pequenas de propósito — não é parallax genérico.
 */
export const planes = {
  background: { desktop: -6, tablet: -3, mobile: 0 },
  midground: { desktop: -12, tablet: -6, mobile: 0 },
  content: { desktop: 0, tablet: 0, mobile: 0 },
  foreground: { desktop: 18, tablet: 8, mobile: 0 },
} as const;
export type Plane = keyof typeof planes;

/** Amplitude por intensidade (multiplica deslocamentos e escalas) */
export const amplitude: Record<Intensity, number> = {
  subtle: 0.4,
  editorial: 1,
  hero: 1.6,
};

/**
 * Elementos grandes se movem mais devagar; pequenos reagem mais rápido.
 * Recebe a maior dimensão em px e devolve a duração em segundos.
 */
export function weightedDuration(sizePx: number, base: number = duration.normal): number {
  const k = Math.min(1.8, Math.max(0.6, sizePx / 600));
  return Math.round(base * k * 100) / 100;
}

export const media = {
  desktop: "(min-width: 1200px) and (pointer: fine)",
  tablet: "(min-width: 768px) and (max-width: 1199px), (min-width: 1200px) and (pointer: coarse)",
  mobile: "(max-width: 767px)",
  reduce: "(prefers-reduced-motion: reduce)",
  finePointer: "(pointer: fine)",
} as const;
