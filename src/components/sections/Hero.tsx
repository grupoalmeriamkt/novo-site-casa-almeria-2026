import { Logo } from "@/components/brand/Logo";
import { Selo } from "@/components/brand/Selo";
import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { Welcome } from "@/components/sections/Welcome";
import { SITE } from "@/content/site";
import styles from "./Hero.module.css";

/**
 * Hero — "Entre na Casa".
 * Fora: a fachada da 104 Sul. No centro, um arco com as portas azuis da Casa
 * (padrão tipográfico + selo dividido entre as folhas). As portas se entreabrem
 * como convite; o scroll as abre e atravessa o arco para dentro do salão.
 */
export function Hero() {
  return (
    <Choreography name="hero" className={styles.hero} data-header-theme="dark" data-intensity="hero" aria-labelledby="hero-title">
      {/* fora */}
      <div className={styles.outside} data-hero-plane="">
        <div className={styles.film} data-hero-media="" data-intro="">
          <Media id="hero" className={styles.media} priority sizes="100vw" note={false} />
        </div>
      </div>
      <div className={styles.shade} aria-hidden="true" />

      {/* dentro, visto pelo arco */}
      <div className={styles.portal} data-portal="" data-intro="" aria-hidden="true">
        <Media id="hero-inside" className={styles.media} sizes="100vw" note={false} />
      </div>

      {/* a porta */}
      <div className={styles.doorwayWrap} data-doorway-wrap="" aria-hidden="true">
        <div className={styles.doorway} data-doorway="" data-intro="">
          <span className={styles.glow} data-door-glow="" />
          <div className={`${styles.leaf} ${styles.leafLeft}`} data-leaf="left">
            <Selo className={styles.leafSelo} />
            <span className={styles.handle} />
          </div>
          <div className={`${styles.leaf} ${styles.leafRight}`} data-leaf="right">
            <Selo className={styles.leafSelo} />
            <span className={styles.handle} />
          </div>
          <svg className={styles.archLine} viewBox="0 0 60 100" preserveAspectRatio="none" data-arch-line="">
            <path d="M0,100 V30 A30,30 0 0 1 60,30 V100" data-arch-path="" />
          </svg>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.logoWrap} data-hero-logo-wrap="">
          <Logo id="hero-logo" draw decorative className={styles.logo} data-hero-logo="" data-intro="" />
        </div>
        <div data-hero-slogan-plane="">
          <h1 id="hero-title" className={styles.slogan}>
            <span className="sr-only">{SITE.name}, </span>
            <span data-hero-slogan="" data-intro="">
              {SITE.slogan}
            </span>
          </h1>
        </div>
      </div>

      <div className={styles.inviteWrap} data-invite-wrap="">
        <Welcome data-invite="" data-intro="" />
      </div>

      <div className={styles.cueWrap}>
        <a href="#qualquer-hora" className={styles.cue} data-hero-cue="" data-intro="">
          Entre
        </a>
      </div>
    </Choreography>
  );
}
