"use client";

import { WeatherIcon } from "@/components/ui/WeatherIcon";
import { SKY_LABEL, skyOf } from "@/content/welcome";
import { servicesLine, statusLine } from "@/lib/hours";
import { useWelcome } from "@/lib/useWelcome";
import { cx } from "@/lib/cx";
import styles from "./Welcome.module.css";

/**
 * A Casa recebendo: está aberta? dá para pedir? como está o tempo lá fora?
 * E o convite para entrar e tomar um cafezinho.
 */
export function Welcome({ tone = "onPhoto", className, ...rest }: { tone?: "onPhoto" | "onLight"; className?: string; [data: `data-${string}`]: string | undefined }) {
  const { status, weather, invite } = useWelcome();
  const sky = weather ? skyOf(weather) : null;
  return (
    <div className={cx(styles.welcome, styles[tone], className)} {...rest}>
      <p className={styles.status} data-open={status ? String(status.open) : undefined} aria-live="polite">
        <span className={styles.dot} aria-hidden="true" />
        {status ? statusLine(status) : "A Casa está por aqui"}
      </p>
      {status && <p className={styles.services}>{servicesLine(status)}</p>}
      <p className={styles.invite}>
        {weather && sky && (
          <span className={styles.weather}>
            <WeatherIcon sky={sky} className={styles.weatherIcon} />
            <span className={styles.temp}>{weather.temp}°</span>
            <span className="sr-only">, {SKY_LABEL[sky]} em Brasília. </span>
          </span>
        )}
        {invite}
      </p>
    </div>
  );
}
