import Image from "next/image";
import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink } from "@/components/ui/Links";
import { SITE } from "@/content/site";
import styles from "./Happens.module.css";

type Item =
  | { kind: "media"; id: string; ratio: string; area: string; speed: number }
  | { kind: "quote"; text: string; area: string; speed: number }
  | { kind: "art"; src: string; alt: string; w: number; h: number; area: string; speed: number; bg?: string };

// Composição editorial: tamanhos, proporções e velocidades diferentes (profundidade sem 3D)
const ITEMS: Item[] = [
  { kind: "media", id: "happens-retrato", ratio: "3 / 4", area: "a", speed: -6 },
  { kind: "quote", text: "amor até o fim.", area: "b", speed: 10 },
  { kind: "media", id: "happens-mesa", ratio: "3 / 2", area: "c", speed: -10 },
  { kind: "art", src: "/illustrations/bike-cena.svg", alt: "Ilustração da Casa: bicicleta rosa com pães na cesta", w: 874, h: 540, area: "d", speed: 14 },
  { kind: "media", id: "happens-video", ratio: "9 / 16", area: "e", speed: -4 },
  { kind: "media", id: "happens-detalhe", ratio: "1 / 1", area: "f", speed: 12 },
  { kind: "quote", text: "A Casa é sua.", area: "g", speed: -8 },
  { kind: "art", src: "/illustrations/merlot.png", alt: "Ilustração da Casa: cachorro com uma taça de vinho", w: 963, h: 1400, area: "h", speed: -12 },
  { kind: "media", id: "happens-jardim", ratio: "16 / 9", area: "i", speed: 6 },
  { kind: "art", src: "/illustrations/cachorro.svg", alt: "Ilustração da Casa: cachorro comendo espaguete", w: 253, h: 331, area: "j", speed: 16, bg: "var(--c-rosa)" },
  { kind: "media", id: "happens-produto", ratio: "4 / 5", area: "k", speed: -6 },
  { kind: "art", src: "/illustrations/vaso-cena.svg", alt: "Ilustração da Casa: vaso com oliveira", w: 471, h: 541, area: "l", speed: 8 },
  { kind: "media", id: "happens-cliente", ratio: "4 / 5", area: "m", speed: -10 },
];

export function Happens() {
  return (
    <Choreography name="section" className={styles.section} data-header-theme="light" aria-labelledby="acontece-titulo">
      <header className={styles.head}>
        <h2 id="acontece-titulo" className={styles.title} data-split="words">
          A Casa <em>acontece aqui.</em>
        </h2>
        <ArrowLink href={SITE.instagram.href}>{SITE.instagram.handle}</ArrowLink>
      </header>

      <div className={styles.mosaic}>
        {ITEMS.map((it, i) => (
          <div key={i} className={styles.item} style={{ gridArea: it.area }} data-speed={it.speed}>
            {it.kind === "media" && <Media id={it.id} ratio={it.ratio} reveal={i % 2 ? "top" : true} sizes="(min-width: 1200px) 30vw, 50vw" />}
            {it.kind === "quote" && (
              <blockquote className={styles.quote} data-reveal="up">
                <p>{it.text}</p>
              </blockquote>
            )}
            {it.kind === "art" && (
              <figure className={styles.art} style={it.bg ? { background: it.bg } : undefined} data-reveal="up">
                <Image src={it.src} alt={it.alt} width={it.w} height={it.h} sizes="(min-width: 1200px) 30vw, 50vw" unoptimized={it.src.endsWith(".svg")} />
              </figure>
            )}
          </div>
        ))}
      </div>
    </Choreography>
  );
}
