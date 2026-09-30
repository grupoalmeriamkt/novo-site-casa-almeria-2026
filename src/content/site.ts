/**
 * Dados da Casa. Fonte única para links, unidades e integrações.
 * Origem dos dados marcada em cada campo; TODO = pendente com o cliente (docs/pedidos-cliente.md).
 * Para adicionar uma unidade: inclua um item em UNITS — Home, /unidades, schema e footer se ajustam sozinhos.
 */

export const SITE = {
  name: "Casa Almeria",
  url: "https://www.casaalmeria.com.br",
  slogan: "para alimentar corpo e alma",
  signature: "A Casa que alimenta corpo e alma.",
  description:
    "Casa de gastronomia e encontros em Brasília. Do primeiro café ao último brinde, na 104 Sul e no Noroeste: padaria, confeitaria, almoço, empório, happy hour e encomendas.",
  locale: "pt_BR",
  // fonte: casaalmeria.com.br (set/2026)
  instagram: { handle: "@casa_almeria", href: "https://www.instagram.com/casa_almeria/" },
  whatsapp: { display: "61 99582-8131", href: "https://wa.me/5561995828131" },
  vendas: "https://vendas.grupoalmeria.com.br",
  careersEmail: "gerente.casa@grupoalmeria.com.br",
  legalName: null as string | null, // TODO razão social + CNPJ
} as const;

export type Weekday = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";
export type OpeningHours = { days: Weekday[]; opens: string; closes: string; label: string };

// fonte: casaalmeria.com.br — horário publicado único; confirmar se vale para as duas unidades
const HOURS: OpeningHours[] = [
  { days: ["Mo", "Tu", "We", "Th", "Fr", "Sa"], opens: "08:00", closes: "21:00", label: "Segunda a sábado, 8h às 21h" },
  { days: ["Su"], opens: "08:00", closes: "20:00", label: "Domingo, 8h às 20h" },
];

export type Unit = {
  id: "asa-sul" | "noroeste";
  name: string;
  short: string;
  address: { street: string | null; district: string; city: string; region: string; postalCode: string | null };
  geo: { lat: number; lng: number } | null;
  menuUrl: string | null;
  mapsUrl: string;
  ifoodUrl: string | null;
  hours: OpeningHours[];
  mediaId: string;
  analytics: { menu: "menu_asa_sul" | "menu_noroeste"; maps: "maps_asa_sul" | "maps_noroeste" };
};

export const UNITS: Unit[] = [
  {
    id: "asa-sul",
    name: "Casa Asa Sul",
    short: "Asa Sul",
    address: { street: "CLS 104, Bloco D, Loja 01", district: "Asa Sul", city: "Brasília", region: "DF", postalCode: "70343-540" },
    // coordenadas do link oficial do Maps publicado no site atual
    geo: { lat: -15.8064413, lng: -47.8940539 },
    menuUrl: "https://menu.getinapp.com.br/pt-br/L6Y2Owk3/menus/g1g83w6w/categories/J6JDL4PX",
    mapsUrl: "https://maps.app.goo.gl/stGsyvpCVCZ1fjQv9",
    ifoodUrl: "https://www.ifood.com.br/delivery/brasilia-df/casa-almeria-asa-sul/ab5fd86a-bfb1-4377-8da3-4d7c9833bf59",
    hours: HOURS,
    mediaId: "unit-asa-sul",
    analytics: { menu: "menu_asa_sul", maps: "maps_asa_sul" },
  },
  {
    id: "noroeste",
    name: "Casa Noroeste",
    short: "Noroeste",
    // TODO endereço de rua e CEP; coordenadas vêm do link do Maps publicado no site atual
    address: { street: null, district: "Noroeste", city: "Brasília", region: "DF", postalCode: null },
    geo: { lat: -15.7657486, lng: -47.9108097 },
    // TODO o site atual aponta o "menu Noroeste" para um Google Forms; aguardando link do Get In
    menuUrl: null,
    mapsUrl: "https://maps.app.goo.gl/PWQ3iu3HPDfTu7Kk9",
    ifoodUrl: null,
    hours: HOURS,
    mediaId: "unit-noroeste",
    analytics: { menu: "menu_noroeste", maps: "maps_noroeste" },
  },
];

export const unitAddressLine = (u: Unit) =>
  [u.address.street, u.address.district, `${u.address.city} ${u.address.region}`].filter(Boolean).join(" · ");

/** Encomendas: uma categoria nova = um item aqui. */
export const ORDER_CATEGORIES = [
  { id: "tabuas", label: "Tábuas", line: "Frios, queijos e pães para receber com generosidade.", href: `${SITE.vendas}/tabuas`, mediaId: "order-tabua" },
  { id: "cestas", label: "Cestas", line: "Um café da manhã inteiro, arrumado para chegar como presente.", href: `${SITE.vendas}/cestas-cafe`, mediaId: "order-cesta" },
  { id: "tortas", label: "Tortas", line: "Para o domingo em família ou para a data que merece.", href: `${SITE.vendas}/tortas`, mediaId: "order-torta" },
  { id: "encomendas", label: "Encomendas", line: "Pães, doces e tudo o que a ocasião pedir.", href: SITE.vendas, mediaId: "order-caixa" },
] as const;

export const NAV = [
  { label: "Casa", href: "/sobre" },
  { label: "Menus", href: "/menus" },
  { label: "Encomendas", href: "/encomendas" },
  { label: "Unidades", href: "/unidades" },
] as const;

/** Camada "Pedir": toda a complexidade externa escondida atrás de uma escolha só. */
export const ORDER_LAYER = [
  { label: "Delivery", note: "iFood · Asa Sul", href: UNITS[0].ifoodUrl ?? SITE.vendas, event: "ifood_click" },
  { label: "Encomendas", note: "Para retirar ou receber em casa", href: SITE.vendas, event: "order_click" },
  { label: "Cestas", note: "Café da manhã para presentear", href: `${SITE.vendas}/cestas-cafe`, event: "encomenda_category_click" },
  { label: "Tábuas", note: "Frios, queijos e pães", href: `${SITE.vendas}/tabuas`, event: "encomenda_category_click" },
  { label: "Tortas", note: "Doces e salgadas", href: `${SITE.vendas}/tortas`, event: "encomenda_category_click" },
] as const;
