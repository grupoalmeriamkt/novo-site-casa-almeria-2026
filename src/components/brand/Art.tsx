import type { SVGProps } from "react";

type Artwork = { viewBox: string; markup: string };

type Props = Omit<SVGProps<SVGSVGElement>, "dangerouslySetInnerHTML"> & {
  art: Artwork;
  /** <defs> extras (ex.: clipPath da cesta da bicicleta) */
  defs?: string;
  [data: `data-${string}`]: string | number | boolean | undefined;
};

/**
 * Ilustração vetorial inline (marcação gerada a partir do manual).
 * Partes animáveis expostas como [data-part="..."]. Sempre decorativa.
 */
export function Art({ art, defs, ...rest }: Props) {
  return (
    <svg
      viewBox={art.viewBox}
      aria-hidden="true"
      focusable="false"
      {...rest}
      dangerouslySetInnerHTML={{ __html: (defs ? `<defs>${defs}</defs>` : "") + art.markup }}
    />
  );
}
