/**
 * Consentimento de cookies (LGPD). A escolha fica salva em dois lugares:
 * localStorage (o site lembra sem perguntar de novo) e um cookie de primeira parte por 12 meses.
 * Estatística (Google Consent Mode v2) só é liberada com o aceite; o padrão "negado" é definido no <head>.
 */
export type Consent = { v: 1; analytics: boolean; at: string };

export const CONSENT_KEY = "casa:consent";
export const CONSENT_COOKIE = "casa_consent";
const YEAR = 60 * 60 * 24 * 365;

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      const c = JSON.parse(raw) as Consent;
      if (c && c.v === 1) return c;
    }
  } catch {}
  const m = typeof document !== "undefined" ? document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(all|essential)`)) : null;
  return m ? { v: 1, analytics: m[1] === "all", at: "" } : null;
}

export function saveConsent(analytics: boolean): Consent {
  const c: Consent = { v: 1, analytics, at: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {}
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${analytics ? "all" : "essential"}; Max-Age=${YEAR}; Path=/; SameSite=Lax${secure}`;
  window.gtag?.("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
  window.dispatchEvent(new CustomEvent("casa:consent", { detail: c }));
  return c;
}

/** Script do <head>: Consent Mode com tudo negado por padrão, e a escolha salva reaplicada antes de qualquer tag. */
export const CONSENT_BOOT = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');if((c&&c.analytics)||/(?:^|; )${CONSENT_COOKIE}=all/.test(document.cookie)){gtag('consent','update',{analytics_storage:'granted'})}}catch(e){}`;
