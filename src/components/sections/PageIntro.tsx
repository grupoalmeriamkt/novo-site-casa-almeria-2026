import type { ReactNode } from "react";
import { Choreography } from "@/components/motion/Choreography";
import styles from "./PageIntro.module.css";

/** Abertura das páginas internas: H1 único, título grande, poucas palavras. */
export function PageIntro({ label, title, lead }: { label: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <Choreography name="section" className={styles.intro} data-header-theme="light">
      <p className="label">{label}</p>
      <h1 className={styles.title} data-split="chars">
        {title}
      </h1>
      {lead && (
        <p className={styles.lead} data-reveal="up">
          {lead}
        </p>
      )}
    </Choreography>
  );
}
