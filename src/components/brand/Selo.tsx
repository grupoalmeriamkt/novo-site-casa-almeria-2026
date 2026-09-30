import type { SVGProps } from "react";
import { SELO } from "@/brand/vectors";

type Props = SVGProps<SVGSVGElement> & {
  /** anel gira devagar (loop ambiente); o "almeria" fica sempre na horizontal, como no GIF original */
  spin?: boolean;
  speed?: number;
};

/** Selo circular. Cores: --selo-ink (padrão currentColor) e --selo-accent (amarelo). */
export function Selo({ spin = false, speed = 6, ...rest }: Props) {
  return (
    <svg viewBox={SELO.viewBox} aria-hidden="true" focusable="false" {...rest}>
      <g data-ambient={spin ? "spin" : undefined} data-ambient-speed={spin ? speed : undefined}>
        {SELO.ring.map((r, i) => (
          <path
            key={i}
            d={r.d}
            style={{ fill: r.tone === "accent" ? "var(--selo-accent, #f2ba72)" : "var(--selo-ink, currentColor)" }}
          />
        ))}
      </g>
      <path d={SELO.script} style={{ fill: "var(--selo-accent, #f2ba72)" }} />
    </svg>
  );
}
