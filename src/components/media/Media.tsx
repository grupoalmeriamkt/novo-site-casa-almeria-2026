import Image from "next/image";
import type { CSSProperties, HTMLAttributes } from "react";
import { media, SHOW_MEDIA_NOTES } from "@/content/media";
import { cx } from "@/lib/cx";
import styles from "./Media.module.css";

type Props = HTMLAttributes<HTMLDivElement> & {
  id: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Image Reveal ao entrar na tela */
  reveal?: boolean | "top" | "left";
  /** Editorial Crop durante o scroll */
  crop?: boolean;
  note?: boolean;
  [data: `data-${string}`]: string | number | boolean | undefined;
};

const isDarkTone = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 < 0.5;
};

/**
 * Moldura de mídia. Com `src` no acervo: foto/vídeo real.
 * Sem `src`: placeholder com o tom do momento e a descrição da foto que falta.
 */
export function Media({ id, ratio, sizes = "100vw", priority, reveal, crop, note = SHOW_MEDIA_NOTES, className, style, ...rest }: Props) {
  const m = media(id);
  const frameStyle: CSSProperties = { ...(ratio ? { aspectRatio: ratio } : null), ...style };
  return (
    <div
      className={cx(styles.frame, className)}
      style={frameStyle}
      data-image-reveal={reveal === true ? "" : reveal || undefined}
      data-crop={crop ? "" : undefined}
      data-dark={!m.src && isDarkTone(m.tone[0]) ? "" : undefined}
      {...rest}
    >
      <div className={styles.inner} data-media-inner="">
        {m.src ? (
          m.kind === "video" ? (
            <video className={styles.fill} src={m.src} poster={m.poster} autoPlay muted loop playsInline aria-hidden="true" />
          ) : (
            <Image className={styles.fill} src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} />
          )
        ) : (
          <div
            className={styles.placeholder}
            style={{ "--tone-a": m.tone[0], "--tone-b": m.tone[1] } as CSSProperties}
            aria-hidden="true"
          />
        )}
      </div>
      {!m.src && note && (
        <span className={styles.note} aria-hidden="true">
          <span className={styles.noteTag}>Foto em produção</span>
          {m.brief}
        </span>
      )}
    </div>
  );
}
