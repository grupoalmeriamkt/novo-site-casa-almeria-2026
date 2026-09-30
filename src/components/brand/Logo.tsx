import type { SVGProps } from "react";
import { LOGO } from "@/brand/vectors";

const [vx, vy, vw, vh] = LOGO.viewBox.split(" ").map(Number);

type Props = Omit<SVGProps<SVGSVGElement>, "id"> & {
  /** prefixo único por instância (a máscara precisa de id próprio) */
  id: string;
  /** prepara a assinatura para ser "escrita" pelo motion */
  draw?: boolean;
  /** true quando há texto equivalente por perto (ex.: link com aria-label ou h1) */
  decorative?: boolean;
  [data: `data-${string}`]: string | number | boolean | undefined;
};

/**
 * Logo oficial (vetor extraído do manual). Cores por CSS:
 * --logo-letters (padrão: currentColor) e --logo-script (padrão: amarelo Almeria).
 */
export function Logo({ id, draw = false, decorative = false, ...rest }: Props) {
  const maskId = `${id}-pen`;
  return (
    <svg
      viewBox={LOGO.viewBox}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Casa Almeria"}
      aria-hidden={decorative || undefined}
      focusable="false"
      data-pen-weights={LOGO.penWeights.join(",")}
      {...rest}
    >
      {draw && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={vx - 10} y={vy - 10} width={vw + 20} height={vh + 20}>
            {LOGO.pen.map((d, i) => (
              <path
                key={i}
                d={d}
                data-pen=""
                fill="none"
                stroke="#fff"
                strokeWidth={LOGO.penWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </mask>
        </defs>
      )}
      <g style={{ fill: "var(--logo-letters, currentColor)" }}>
        {LOGO.letters.map((d, i) => (
          <path key={i} d={d} data-letter="" />
        ))}
      </g>
      <path
        d={LOGO.script}
        data-part="script"
        style={{ fill: "var(--logo-script, #f2ba72)" }}
        mask={draw ? `url(#${maskId})` : undefined}
      />
      <path d={LOGO.dot} data-part="dot" style={{ fill: "var(--logo-script, #f2ba72)" }} />
    </svg>
  );
}
