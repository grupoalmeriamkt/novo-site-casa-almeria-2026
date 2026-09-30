"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Art } from "@/components/brand/Art";
import { IfoodIcon } from "@/components/brand/IfoodIcon";
import { Logo } from "@/components/brand/Logo";
import { Welcome } from "@/components/sections/Welcome";
import { Arrow, Swap } from "@/components/ui/Links";
import { MERGULHO } from "@/brand/vectors";
import { NAV, ORDER_LAYER, SITE } from "@/content/site";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { statusLine } from "@/lib/hours";
import { useWelcome } from "@/lib/useWelcome";
import { ScrollTrigger } from "@/motion/gsap";
import styles from "./Header.module.css";

type Panel = "pedir" | "cafe" | null;

export function Header() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const pedirRef = useRef<HTMLDivElement>(null);
  const cafeRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const { status } = useWelcome();
  const isHome = pathname === "/";

  const close = useCallback(() => setPanel(null), []);

  const openPanel = (which: Exclude<Panel, null>, btn: HTMLButtonElement) => {
    triggerRef.current = btn;
    setPanel(which);
    if (which === "pedir") track("order_click", { from: btn.dataset.from ?? "header" });
  };

  // fundo reduz e escurece; sem escala se houver seção fixada (pin) ativa
  useEffect(() => {
    const html = document.documentElement;
    const node = panel === "pedir" ? pedirRef.current : panel === "cafe" ? cafeRef.current : null;
    if (panel) {
      const pinned = ScrollTrigger.getAll().some((t) => t.pin && t.isActive);
      html.style.setProperty("--layer-origin", `${window.scrollY + window.innerHeight / 2}px`);
      html.dataset.layer = pinned ? "open-flat" : "open";
      node?.querySelector<HTMLElement>("a, button")?.focus();
    } else if (html.dataset.layer) {
      delete html.dataset.layer;
      triggerRef.current?.focus();
    }
  }, [panel]);

  useEffect(() => setPanel(null), [pathname]);

  useEffect(() => {
    if (!panel) return;
    const node = panel === "pedir" ? pedirRef.current : cafeRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !node) return;
      const f = Array.from(node.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [panel, close]);

  return (
    <>
      <header className={styles.header} data-site-header="" data-theme={isHome ? "dark" : "light"} data-intro-header={isHome ? "" : undefined}>
        <Link href="/" className={styles.brand} aria-label="Casa Almeria, página inicial">
          <span className={styles.logoBox} data-header-logo="">
            <Logo id="header-logo" decorative className={styles.logo} />
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line" aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.order}
            aria-expanded={panel === "pedir"}
            aria-controls="camada-pedir"
            data-from="header"
            onClick={(e) => openPanel("pedir", e.currentTarget)}
          >
            <span className={styles.statusDot} data-open={status ? String(status.open) : undefined} aria-hidden="true" />
            <Swap>Pedir</Swap>
            {status && <span className="sr-only">. {statusLine(status)}</span>}
          </button>
          <button
            type="button"
            className={styles.cup}
            aria-expanded={panel === "cafe"}
            aria-controls="cafezinho"
            aria-label="Um cafezinho? Veja se a Casa está aberta e como chegar"
            onClick={(e) => openPanel("cafe", e.currentTarget)}
          >
            <Art art={MERGULHO} className={styles.cupArt} />
          </button>
        </div>
      </header>

      <div className={styles.scrim} aria-hidden="true" onClick={close} data-open={panel ? "" : undefined} />

      {/* Pedir: toda a complexidade externa atrás de uma escolha só */}
      <div
        id="camada-pedir"
        ref={pedirRef}
        className={styles.layer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="camada-pedir-titulo"
        data-open={panel === "pedir" || undefined}
        inert={panel !== "pedir"}
      >
        <div className={styles.layerHead}>
          <p id="camada-pedir-titulo" className="label">
            Pedir
          </p>
          <button type="button" className={styles.close} onClick={close}>
            <Swap>Fechar</Swap>
          </button>
        </div>

        <ul className={styles.layerList}>
          {ORDER_LAYER.map((item, i) => (
            <li key={item.label} style={{ "--i": i } as React.CSSProperties}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className={styles.layerItem}
                onClick={() => track(item.event as AnalyticsEvent, { item: item.label })}
              >
                <span className={styles.layerLabel}>{item.label}</span>
                <span className={styles.layerNote}>
                  {item.event === "ifood_click" && <IfoodIcon />}
                  {item.note}
                </span>
                <Arrow />
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          ))}
        </ul>

        <nav className={styles.layerNav} aria-label="Navegação">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href} style={{ "--i": i + ORDER_LAYER.length } as React.CSSProperties}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.layerFoot}>
          <p>Para reservas, encomendas e dúvidas</p>
          <a href={SITE.whatsapp.href} target="_blank" rel="noopener" className="link-line" onClick={() => track("whatsapp_click", { from: "layer" })}>
            WhatsApp {SITE.whatsapp.display}
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>

      {/* Cafezinho: a Casa recebendo quem chega pelo celular */}
      <div
        id="cafezinho"
        ref={cafeRef}
        className={styles.cafe}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cafezinho-titulo"
        data-open={panel === "cafe" || undefined}
        inert={panel !== "cafe"}
      >
        <div className={styles.cafeHead}>
          <Art art={MERGULHO} className={styles.cafeArt} />
          <button type="button" className={styles.close} onClick={close}>
            <Swap>Fechar</Swap>
          </button>
        </div>
        <p id="cafezinho-titulo" className={styles.cafeTitle}>
          Entre, <em>o café está passado.</em>
        </p>
        <Welcome tone="onLight" />
        <div className={styles.cafeActions}>
          <Link href="/unidades" className="btn" onClick={close}>
            <span className="btn__label">
              <Swap>Como chegar</Swap>
            </span>
            <Arrow />
          </Link>
          <a href={SITE.whatsapp.href} target="_blank" rel="noopener" className="link-line" onClick={() => track("whatsapp_click", { from: "cafezinho" })}>
            Falar com a Casa
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </>
  );
}
