import { Media } from "@/components/media/Media";
import { Choreography } from "@/components/motion/Choreography";
import { HOURS } from "@/content/home";
import styles from "./AnyHour.module.css";

export function AnyHour() {
  return (
    <Choreography
      name="anyHour"
      id="qualquer-hora"
      className={styles.section}
      data-header-theme="light"
      data-intensity="hero"
      aria-labelledby="hour-title"
    >
      <div className={styles.stage} data-hour-stage="">
        <div className={styles.night} data-night="" aria-hidden="true" />
        <header className={styles.head}>
          <h2 id="hour-title" className={styles.title} data-split="words">
            Uma Casa para <em>qualquer hora.</em>
          </h2>
        </header>

        <p className={styles.clock} aria-hidden="true">
          {HOURS.map((h) => (
            <span key={h.time} data-clock-time="">
              {h.time}
            </span>
          ))}
        </p>

        <ol className={styles.moments}>
          {HOURS.map((h) => (
            <li key={h.time} className={styles.moment} data-moment="" data-time={h.time} data-bg={h.bg} data-ink={h.ink}>
              <div className={styles.text} data-moment-text="">
                <p className={styles.momentTime}>
                  <time dateTime={h.time}>{h.time}</time>
                  <span className={styles.now}>agora</span>
                </p>
                <h3 className={styles.momentTitle}>{h.title}</h3>
                <p className={styles.momentLine}>{h.text}</p>
              </div>
              <Media id={h.media} className={styles.frame} data-frame="" ratio="4 / 5" sizes="(min-width: 768px) 45vw, 100vw" />
              <Media id={h.detail} className={styles.detail} data-detail="" ratio="1 / 1" sizes="(min-width: 768px) 18vw, 45vw" note={false} />
            </li>
          ))}
        </ol>

        <ol className={styles.rail} aria-hidden="true">
          {HOURS.map((h) => (
            <li key={h.time} data-tick="">
              {h.time}
            </li>
          ))}
          <span className={styles.fill} data-rail-fill="" />
        </ol>
      </div>
    </Choreography>
  );
}
