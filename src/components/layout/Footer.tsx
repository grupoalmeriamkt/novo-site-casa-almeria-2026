import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Choreography } from "@/components/motion/Choreography";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CUP_MESSAGES } from "@/content/home";
import { NAV, SITE, UNITS, unitAddressLine } from "@/content/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <Choreography name="footer" as="footer" className={styles.footer} data-header-theme="dark" data-intensity="hero">
      <div className={styles.top}>
        <div className={styles.columns}>
          <nav aria-label="Rodapé">
            <p className="label">Casa</p>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-line">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <TrackedLink href={SITE.instagram.href} className="link-line">
                  Instagram
                </TrackedLink>
              </li>
              <li>
                <Link href="/contato" className="link-line">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          {UNITS.map((u) => (
            <div key={u.id}>
              <p className="label">{u.short}</p>
              <address>{unitAddressLine(u)}</address>
              <p className={styles.hours}>
                {u.hours.map((h) => (
                  <span key={h.label}>{h.label}</span>
                ))}
              </p>
              <ul className={styles.inline}>
                {u.menuUrl && (
                  <li>
                    <TrackedLink href={u.menuUrl} event={u.analytics.menu} className="link-line">
                      Menu
                    </TrackedLink>
                  </li>
                )}
                <li>
                  <TrackedLink href={u.mapsUrl} event={u.analytics.maps} className="link-line">
                    Como chegar
                  </TrackedLink>
                </li>
              </ul>
            </div>
          ))}

          <div>
            <p className="label">Atendimento</p>
            <p>
              <TrackedLink href={SITE.whatsapp.href} event="whatsapp_click" params={{ from: "footer" }} className="link-line">
                WhatsApp {SITE.whatsapp.display}
              </TrackedLink>
            </p>
            <p className={styles.muted}>Para reservas, encomendas e dúvidas.</p>
          </div>
        </div>
      </div>

      <div className={styles.brand}>
        <Logo id="footer-logo" draw decorative className={styles.logo} data-footer-logo="" />
        <p className={styles.slogan}>{SITE.slogan}</p>
      </div>

      <div className={styles.bottom}>
        <p>
          © {year} {SITE.name}
          {SITE.legalName ? ` · ${SITE.legalName}` : ""}
        </p>
        <p className={styles.cup} data-cup="">
          {CUP_MESSAGES[0]}
        </p>
      </div>
    </Choreography>
  );
}
