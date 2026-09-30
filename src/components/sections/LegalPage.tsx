import Link from "next/link";
import { Choreography } from "@/components/motion/Choreography";
import { PageIntro } from "@/components/sections/PageIntro";
import { CookiePrefsButton } from "@/components/layout/CookieConsent";
import { LEGAL_DOCS, type LegalDoc } from "@/content/legal";
import styles from "./LegalPage.module.css";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);
  return (
    <>
      <PageIntro label="Documentos da Casa" title={doc.title} lead={doc.lead} />
      <Choreography name="section" as="article" className={styles.doc} data-header-theme="light">
        <p className={styles.updated}>Atualizada em {doc.updated}.</p>
        {doc.sections.map((s, i) => (
          <section key={s.title} className={styles.section} aria-labelledby={`${doc.slug}-${i}`}>
            <h2 id={`${doc.slug}-${i}`} className={styles.heading}>
              {s.title}
            </h2>
            {s.body.map((b, k) =>
              typeof b === "string" ? (
                <p key={k}>{b}</p>
              ) : (
                <ul key={k}>
                  {b.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
        {doc.slug === "cookies" && <CookiePrefsButton className={styles.prefs} />}
        <nav className={styles.more} aria-label="Outros documentos">
          <p className="label">Veja também</p>
          <ul>
            {others.map((d) => (
              <li key={d.slug}>
                <Link href={`/${d.slug}`} className="link-line">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Choreography>
    </>
  );
}
