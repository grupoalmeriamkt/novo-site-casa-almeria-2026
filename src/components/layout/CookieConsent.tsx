"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readConsent, saveConsent } from "@/lib/consent";
import styles from "./CookieConsent.module.css";

/**
 * "Aceita um cookie com o café?" Aparece uma vez; a escolha fica salva (localStorage + cookie, 12 meses).
 * No rodapé, "Preferências de cookies" reabre o aviso a qualquer momento.
 */
export function CookieConsent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent()) return;
    // na Home, espera a abertura terminar para não disputar atenção com a porta
    const t = window.setTimeout(() => setOpen(true), pathname === "/" ? 5600 : 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener("casa:cookie-prefs", reopen);
    return () => window.removeEventListener("casa:cookie-prefs", reopen);
  }, []);

  const choose = (analytics: boolean) => {
    saveConsent(analytics);
    setOpen(false);
  };

  return (
    <section className={styles.banner} aria-label="Aviso de cookies" data-open={open || undefined} inert={!open}>
      <p className={styles.title}>
        Aceita um cookie <em>com o café?</em>
      </p>
      <p className={styles.text}>
        Usamos cookies essenciais para o site funcionar e, com a sua licença, cookies de estatística para entender como ele é usado. Você escolhe, e pode mudar
        de ideia quando quiser. <Link href="/cookies">Política de Cookies</Link>
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.accept} onClick={() => choose(true)}>
          Aceitar todos
        </button>
        <button type="button" className={styles.essential} onClick={() => choose(false)}>
          Só os essenciais
        </button>
      </div>
    </section>
  );
}

/** Botão do rodapé que reabre o aviso. */
export function CookiePrefsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent("casa:cookie-prefs"))}>
      Preferências de cookies
    </button>
  );
}
