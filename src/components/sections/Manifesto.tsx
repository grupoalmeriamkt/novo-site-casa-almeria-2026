import Image from "next/image";
import { Art } from "@/components/brand/Art";
import { Selo } from "@/components/brand/Selo";
import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { MERGULHO } from "@/brand/vectors";
import { MANIFESTO } from "@/content/home";
import { SITE } from "@/content/site";
import styles from "./Manifesto.module.css";

export function Manifesto({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  const [l1, l2, l3, l4, l5, l6, l7] = MANIFESTO;
  return (
    <Choreography name="manifesto" className={styles.section} data-header-theme="light" data-intensity="hero" aria-labelledby="manifesto-titulo">
      <p className="label">Manifesto</p>
      <Heading id="manifesto-titulo" className={styles.title} data-split="chars">
        Uma Casa para <em>qualquer tempo.</em>
      </Heading>

      <div className={styles.flow}>
        <p className={styles.line} data-split="lines">
          {l1}
        </p>
        <div className={styles.visual} aria-hidden="true">
          <Art art={MERGULHO} className={styles.cup} />
        </div>
        <p className={styles.line} data-split="lines">
          {l2}
        </p>
        <p className={styles.line} data-split="lines">
          {l3}
        </p>
        <Media id="manifesto" ratio="4 / 5" reveal className={styles.photo} sizes="(min-width: 768px) 30vw, 80vw" />
        <p className={styles.line} data-split="lines">
          {l4}
        </p>
        <p className={styles.line} data-split="lines">
          {l5}
        </p>
        <figure className={styles.visual} data-reveal="up">
          <Image src="/illustrations/bailarina.svg" alt="" width={391} height={467} className={styles.dancer} unoptimized />
        </figure>
        <p className={styles.line} data-split="lines">
          {l6}
        </p>
        <p className={styles.line} data-split="lines">
          {l7}
        </p>
      </div>

      <div className={styles.close}>
        <Selo spin speed={4} className={styles.selo} />
        <p className={styles.signature} data-split="words">
          {SITE.signature}
        </p>
      </div>
    </Choreography>
  );
}
