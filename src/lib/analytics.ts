/**
 * Eventos de navegação e conversão (brief §34). Envia para dataLayer (GTM) e gtag, se existirem.
 */
export type AnalyticsEvent =
  | "hero_menu_click"
  | "hero_order_click"
  | "menu_asa_sul"
  | "menu_noroeste"
  | "order_click"
  | "whatsapp_click"
  | "ifood_click"
  | "maps_asa_sul"
  | "maps_noroeste"
  | "encomenda_category_click"
  | "scroll_depth";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
  window.gtag?.("event", event, params);
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, params);
}
