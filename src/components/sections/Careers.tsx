import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink } from "@/components/ui/Links";
import { SITE } from "@/content/site";
import styles from "./Careers.module.css";

export function Careers() {
  const mail = `mailto:${SITE.careersEmail}?subject=${encodeURIComponent("Currículo para a Casa Almeria")}`;
  return (
    <Choreography name="section" id="trabalhe-conosco" className={styles.section} data-header-theme="light" aria-labelledby="vagas-titulo">
      <h2 id="vagas-titulo" className={styles.title} data-reveal="up">
        Tem lugar para você <em>nesta Casa.</em>
      </h2>
      <div className={styles.body} data-reveal="up">
        <p>Cozinha, padaria, salão e atendimento. Se receber bem é o que você faz de melhor, queremos conhecer você.</p>
        <ArrowLink href={mail}>Envie seu currículo</ArrowLink>
      </div>
    </Choreography>
  );
}
