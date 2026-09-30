import { Art } from "@/components/brand/Art";
import { IfoodIcon } from "@/components/brand/IfoodIcon";
import { Selo } from "@/components/brand/Selo";
import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink, Button } from "@/components/ui/Links";
import { BIKE } from "@/brand/vectors";
import { ORDER_CATEGORIES, SITE, UNITS } from "@/content/site";
import styles from "./Territories.module.css";

// recorte da cesta (coordenadas do vetor): os pães sobem de dentro dela
const BREADS_CLIP = `<clipPath id="bike-breads-clip"><rect x="590" y="0" width="280" height="250"/></clipPath>`;

export function Territories() {
  return (
    <Choreography name="territories" className={styles.section} data-header-theme="light" aria-labelledby="territorios-titulo">
      <div className={styles.bikeTrack} data-bike-track="" aria-hidden="true">
        <div className={styles.bike} data-bike="" data-breads-clip="bike-breads-clip">
          <Art art={BIKE} defs={BREADS_CLIP} className={styles.bikeArt} />
        </div>
      </div>

      <header className={styles.head}>
        <p className="label">Para cada vontade, uma porta</p>
        <h2 id="territorios-titulo" className={styles.title} data-split="words">
          O que você <em>veio buscar?</em>
        </h2>
      </header>

      <div className={styles.grid}>
        <article className={`${styles.block} ${styles.mesa}`} data-follow="16">
          <Media id="territory-mesa" ratio="4 / 5" reveal className={styles.media} data-follow-target="" sizes="(min-width: 1200px) 45vw, 100vw" />
          <div className={styles.copy}>
            <h3>Sentar à mesa</h3>
            <p>Do café da manhã ao happy hour, sempre há uma mesa esperando. Escolha a sua Casa.</p>
            <ul className={styles.links}>
              {UNITS.map((u) => (
                <li key={u.id}>
                  <ArrowLink href={u.menuUrl ?? "/menus"} event="hero_menu_click" params={{ unit: u.id }}>
                    Menu {u.short}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className={`${styles.block} ${styles.levar}`}>
          <div className={styles.mediaWrap}>
            <Media id="territory-levar" ratio="3 / 2" reveal="left" className={styles.media} sizes="(min-width: 1200px) 40vw, 100vw" />
            <span className={styles.crust} aria-hidden="true" />
          </div>
          <div className={styles.copy}>
            <h3>Levar a Casa</h3>
            <p>O pão do dia, os doces da confeitaria e o empório para levar um pouco da Casa com você.</p>
            <ul className={styles.links}>
              <li>
                <ArrowLink href="/menus#padaria">Padaria</ArrowLink>
              </li>
              <li>
                <ArrowLink href="/menus#doces">Confeitaria</ArrowLink>
              </li>
              <li>
                <ArrowLink href="/menus">Empório</ArrowLink>
              </li>
            </ul>
          </div>
        </article>

        <article className={`${styles.block} ${styles.presentear}`}>
          <div className={styles.mediaWrap}>
            <Media id="territory-presentear" ratio="1 / 1" reveal className={styles.media} sizes="(min-width: 1200px) 34vw, 100vw" />
            <Selo spin speed={5} className={styles.selo} />
          </div>
          <div className={styles.copy}>
            <h3>Presentear</h3>
            <p>Cestas, tábuas e tortas pensadas para chegar bonitas à casa de quem você gosta.</p>
            <ul className={styles.links}>
              {ORDER_CATEGORIES.map((c) => (
                <li key={c.id}>
                  <ArrowLink href={c.href} event="encomenda_category_click" params={{ category: c.id, from: "territorios" }}>
                    {c.label}
                  </ArrowLink>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className={`${styles.block} ${styles.receber}`}>
          <div>
            <h3>Receber em casa</h3>
            <p>Quando o dia pede sofá, a Casa vai até você.</p>
          </div>
          <Button href={UNITS[0].ifoodUrl ?? SITE.vendas} event="ifood_click" tone="light" icon={<IfoodIcon />}>
            Pedir no iFood
          </Button>
        </article>
      </div>
    </Choreography>
  );
}
