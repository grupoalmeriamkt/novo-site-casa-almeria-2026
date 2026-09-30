import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink } from "@/components/ui/Links";
import { UnitsMap } from "./UnitsMap";
import { UNITS } from "@/content/site";
import styles from "./Houses.module.css";

export function Houses({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  return (
    <Choreography name="houses" id="unidades" className={styles.section} data-header-theme="light" aria-labelledby="casas-titulo">
      <header className={styles.head}>
        <Heading id="casas-titulo" className={styles.title} data-split="words">
          Duas Casas. <em>A mesma Casa.</em>
        </Heading>
      </header>

      <div className={styles.stage} data-split-stage="">
        {UNITS.map((u, i) => (
          <article key={u.id} className={`${styles.pane} ${i === 0 ? styles.left : styles.right}`} aria-labelledby={`casa-${u.id}`}>
            <Media id={u.mediaId} className={styles.media} note={false} sizes="(min-width: 1200px) 65vw, 100vw" />
            <div className={styles.info}>
              <p className="label">{i === 0 ? "104 Sul" : "Noroeste"}</p>
              <h3 id={`casa-${u.id}`} className={styles.name}>
                {u.name}
              </h3>
              <address className={styles.address}>
                {u.address.street && (
                  <>
                    {u.address.street}
                    <br />
                  </>
                )}
                {u.address.district} · {u.address.city} {u.address.region}
              </address>
              <p className={styles.hours}>
                {u.hours.map((h) => (
                  <span key={h.label}>{h.label}</span>
                ))}
              </p>
              <ul className={styles.links}>
                <li>
                  <ArrowLink href={u.menuUrl ?? "/menus"} event={u.analytics.menu}>
                    Menu
                  </ArrowLink>
                </li>
                <li>
                  <ArrowLink href={u.mapsUrl} event={u.analytics.maps}>
                    Como chegar
                  </ArrowLink>
                </li>
              </ul>
            </div>
          </article>
        ))}
      </div>

      <UnitsMap />
    </Choreography>
  );
}
