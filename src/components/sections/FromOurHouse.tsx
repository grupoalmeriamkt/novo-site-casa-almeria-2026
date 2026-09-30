import { Art } from "@/components/brand/Art";
import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink, Button } from "@/components/ui/Links";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { MAOS_PAO } from "@/brand/vectors";
import { ORDER_CATEGORIES, SITE } from "@/content/site";
import styles from "./FromOurHouse.module.css";

// profundidade e rotação de cada objeto sobre a "mesa"
const PLACEMENT = [
  { depth: 1.3, rot: -4 },
  { depth: 0.7, rot: 3 },
  { depth: 1.1, rot: -2 },
  { depth: 0.5, rot: 5 },
];

export function FromOurHouse({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <Choreography
      name="fromOurHouse"
      id="encomendas"
      className={styles.section}
      data-header-theme="dark"
      data-intensity="hero"
      aria-labelledby="encomendas-titulo"
    >
      <div className={styles.table} data-table="" aria-hidden="true" />
      <div className={styles.inner}>
        <p className="label">Encomendas e presentes</p>
        <Heading id="encomendas-titulo" className={styles.title} data-split="chars">
          Da nossa Casa <em>para a sua.</em>
        </Heading>

        <div className={styles.hands} data-hands="" aria-hidden="true">
          <Art art={MAOS_PAO} className={styles.handsArt} />
        </div>

        <ul className={styles.objects}>
          {ORDER_CATEGORIES.map((c, i) => (
            <li key={c.id} className={styles.object} data-object="" data-depth={PLACEMENT[i % 4].depth} data-rot={PLACEMENT[i % 4].rot}>
              <TrackedLink href={c.href} event="encomenda_category_click" params={{ category: c.id }} className={styles.objectLink}>
                <Media id={c.mediaId} ratio="1 / 1" className={styles.objectMedia} sizes="(min-width: 768px) 22vw, 45vw" />
                <span className={styles.objectLabel}>{c.label}</span>
                <span className={styles.objectLine}>{c.line}</span>
              </TrackedLink>
            </li>
          ))}
        </ul>

        <div className={styles.ctas}>
          <Button href={SITE.vendas} event="order_click" params={{ from: "encomendas" }} tone="light">
            Ver todas as encomendas
          </Button>
          <ArrowLink href={SITE.whatsapp.href} event="whatsapp_click" params={{ from: "encomendas" }}>
            Falar com a Casa
          </ArrowLink>
        </div>
      </div>
    </Choreography>
  );
}
