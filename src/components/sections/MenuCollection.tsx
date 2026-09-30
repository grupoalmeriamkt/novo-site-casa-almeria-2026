"use client";

import { useRef, useState } from "react";
import { Media } from "@/components/media/Media";
import { ArrowLink } from "@/components/ui/Links";
import { MENU_CATEGORIES } from "@/content/home";
import { UNITS } from "@/content/site";
import { gsap, useGSAP } from "@/motion/gsap";
import { runChoreography } from "@/motion/choreography";
import { createCollection } from "@/motion/draggable";
import { prefersReducedMotion } from "@/motion/reducedMotion";
import { ease } from "@/motion/config";
import styles from "./MenuCollection.module.css";

type Api = ReturnType<typeof createCollection>;

/**
 * "O que vai ser hoje?" — coleção navegável por drag, trackpad ou swipe.
 * Cada troca apresenta uma foto forte; a anterior sai por máscara enquanto a nova entra.
 */
export function MenuCollection({ as: Heading = "h2" }: { as?: "h1" | "h2" }) {
  const root = useRef<HTMLElement>(null);
  const api = useRef<Api | null>(null);
  const shown = useRef(0);
  const z = useRef(2);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current) return;
      return runChoreography(root.current, ({ root: el, tier }) => {
        if (tier === "mobile") return;
        const viewport = el.querySelector<HTMLElement>("[data-viewport]");
        const track = el.querySelector<HTMLElement>("[data-track]");
        if (!viewport || !track) return;
        const items = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
        const collection = createCollection({ viewport, track, items, onIndex: setActive });
        api.current = collection;
        return () => {
          collection.kill();
          api.current = null;
        };
      });
    },
    { scope: root },
  );

  // Image Transition: a nova foto entra por máscara na direção do movimento
  useGSAP(
    () => {
      const from = shown.current;
      const to = active;
      if (from === to || !root.current) return;
      const frames = Array.from(root.current.querySelectorAll<HTMLElement>("[data-stage-frame]"));
      const incoming = frames[to];
      const outgoing = frames[from];
      const dir = to > from ? 1 : -1;
      shown.current = to;
      if (prefersReducedMotion()) {
        gsap.set(frames, { autoAlpha: 0 });
        gsap.set(incoming, { autoAlpha: 1, clipPath: "none" });
        return;
      }
      z.current += 1;
      gsap.set(incoming, { zIndex: z.current, autoAlpha: 1 });
      gsap.fromTo(
        incoming,
        { clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: ease.reveal, overwrite: true },
      );
      gsap.fromTo(
        incoming.querySelector("[data-media-inner]"),
        { scale: 1.16, xPercent: 7 * dir },
        { scale: 1, xPercent: 0, duration: 1.6, ease: ease.reveal, overwrite: true },
      );
      gsap.to(outgoing.querySelector("[data-media-inner]"), { xPercent: -9 * dir, duration: 1.15, ease: ease.reveal, overwrite: true });
    },
    { dependencies: [active], scope: root },
  );

  const select = (i: number) => {
    if (api.current) api.current.goTo(i);
    else setActive(i);
  };

  return (
    <section ref={root} id="menu" className={styles.section} data-choreo="menu" data-header-theme="light" aria-labelledby="menu-titulo">
      <header className={styles.head}>
        <Heading id="menu-titulo" className={styles.title} data-split="words">
          O que vai ser <em>hoje?</em>
        </Heading>
        <div className={styles.controls}>
          <button type="button" onClick={() => select(Math.max(0, active - 1))} aria-label="Categoria anterior" disabled={active === 0}>
            ←
          </button>
          <span aria-live="polite" className={styles.counter}>
            {String(active + 1).padStart(2, "0")} / {String(MENU_CATEGORIES.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => select(Math.min(MENU_CATEGORIES.length - 1, active + 1))}
            aria-label="Próxima categoria"
            disabled={active === MENU_CATEGORIES.length - 1}
          >
            →
          </button>
        </div>
      </header>

      <div className={styles.stage} aria-hidden="true">
        {MENU_CATEGORIES.map((c, i) => (
          <div key={c.id} className={styles.stageFrame} data-stage-frame="">
            <Media id={`menu-${c.id}`} className={styles.stageMedia} sizes="100vw" />
          </div>
        ))}
        <p className={styles.stageCaption}>
          <span className={styles.stageLabel}>{MENU_CATEGORIES[active].label}</span>
          <span>{MENU_CATEGORIES[active].line}</span>
        </p>
      </div>

      <div className={styles.viewport} data-viewport="">
        <ul className={styles.track} data-track="">
          {MENU_CATEGORIES.map((c, i) => (
            <li key={c.id} id={c.id} className={styles.item}>
              <button
                type="button"
                className={styles.card}
                data-card=""
                aria-pressed={i === active}
                onClick={() => select(i)}
                onFocus={() => select(i)}
              >
                <Media id={`menu-${c.id}`} className={styles.cardMedia} ratio="4 / 5" sizes="80vw" note={false} />
                <span className={styles.cardIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.cardLabel}>{c.label}</span>
                <span className={styles.cardLine}>{c.line}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.cta}>
        <p className={styles.ctaTitle}>Ver menu completo</p>
        <ul>
          {UNITS.map((u) => (
            <li key={u.id}>
              <ArrowLink href={u.menuUrl ?? "/unidades"} event={u.analytics.menu}>
                {u.short}
              </ArrowLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
