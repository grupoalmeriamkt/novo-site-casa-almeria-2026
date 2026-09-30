/**
 * Acervo de mídia por papel narrativo (brief §36). Enquanto não há fotografia própria,
 * cada slot renderiza um placeholder com direção de arte e descreve a foto necessária —
 * esta lista é a shot list da produção. Para publicar uma foto: preencha `src` (em /public/media).
 */

export type MediaCategory =
  | "hero"
  | "food"
  | "people"
  | "environment"
  | "units"
  | "products"
  | "packaging"
  | "team"
  | "events"
  | "illustrations";

export type MediaSlot = {
  id: string;
  category: MediaCategory;
  kind: "image" | "video";
  /** o que fotografar/filmar */
  brief: string;
  alt: string;
  src?: string;
  poster?: string;
  /** tom do placeholder: [fundo, detalhe] */
  tone: [string, string];
};

/** Mostra a descrição da foto pendente sobre o placeholder (revisão com o cliente). */
export const SHOW_MEDIA_NOTES = true;

const T = {
  manha: ["#f4e6cf", "#e9c99a"],
  padaria: ["#efd9b8", "#d9a86a"],
  almoco: ["#e8e2d4", "#b9a88a"],
  tarde: ["#f0d9c0", "#d7a47a"],
  noite: ["#1b2f52", "#2c4470"],
  verde: ["#dfe3d4", "#9fae8a"],
  azul: ["#16305a", "#29467a"],
} satisfies Record<string, [string, string]>;

const slots: MediaSlot[] = [
  // Hero: a fachada da 104 Sul; atrás da porta, o salão
  { id: "hero", category: "hero", kind: "image", src: "/media/hero-fachada-104-sul.jpg", brief: "Fachada da 104 Sul", alt: "Fachada da Casa Almeria na 104 Sul: muro de tijolos brancos com o letreiro da Casa entre palmeiras", tone: T.verde },
  { id: "hero-inside", category: "environment", kind: "image", src: "/media/hero-dentro-salao.jpg", brief: "Salão visto das portas azuis", alt: "Salão da Casa Almeria visto pelas portas azuis abertas, com mesas ocupadas e luz natural", tone: T.almoco },
  { id: "hero-film", category: "hero", kind: "video", brief: "Filme de abertura de 10 a 20 segundos, feito de fragmentos", alt: "", tone: T.noite },

  { id: "hour-0800", category: "environment", kind: "image", src: "/media/0800-portas-abertas-jardim.jpg", brief: "Portas abertas para o jardim pela manhã", alt: "Portas azuis abertas para o terraço arborizado, com as primeiras mesas ocupadas", tone: T.manha },
  { id: "hour-0800-detail", category: "food", kind: "image", src: "/media/0800-vitrine-croissants.jpg", brief: "Vitrine de croissants", alt: "Vitrine com croissants e folhados recém-saídos do forno", tone: T.padaria },
  { id: "hour-1030", category: "food", kind: "image", src: "/media/1030-balcao-padaria.jpg", brief: "Balcão da padaria", alt: "Atendente no balcão da padaria, com a vitrine de pães e o salão ao fundo", tone: T.padaria },
  { id: "hour-1030-detail", category: "food", kind: "image", src: "/media/1030-vitrine-paes.jpg", brief: "Vitrine de pães", alt: "Vitrine de pães sob o teto laranja da padaria", tone: T.manha },
  { id: "hour-1230", category: "environment", kind: "image", src: "/media/1230-salao-almoco.jpg", brief: "Salão cheio no almoço", alt: "Salão da Casa na hora do almoço, com mesas ocupadas e o jardim ao fundo", tone: T.almoco },
  { id: "hour-1230-detail", category: "team", kind: "image", src: "/media/1230-atendimento.jpg", brief: "Atendimento à mesa", alt: "Atendente da Casa conversando com clientes à mesa", tone: T.verde },
  { id: "hour-1600", category: "people", kind: "image", src: "/media/1600-terraco-noroeste.jpg", brief: "Conversa no terraço do Noroeste", alt: "Amigas conversando no terraço da Casa Noroeste, sob os arcos brancos", tone: T.tarde },
  { id: "hour-1600-detail", category: "people", kind: "image", src: "/media/1600-encontro.jpg", brief: "Encontro à tarde", alt: "Amigos conversando numa mesa ao ar livre", tone: T.manha },
  { id: "hour-1900", category: "environment", kind: "image", src: "/media/1900-terraco-arcos.jpg", brief: "Terraço com arcos e luz quente", alt: "Terraço da Casa Noroeste com palmeira, arcos e a luz quente do lustre", tone: T.noite },
  { id: "hour-1900-detail", category: "environment", kind: "image", src: "/media/1900-lanterna.jpg", brief: "Lanterna acesa", alt: "Lanterna acesa junto ao toldo azul da Casa", tone: T.azul },

  { id: "territory-mesa", category: "environment", kind: "image", src: "/media/sentar-a-mesa-noroeste.jpg", brief: "Mesas sob os arcos", alt: "Mesas ocupadas sob os arcos da Casa Noroeste, com folhagens em primeiro plano", tone: T.almoco },
  { id: "territory-levar", category: "units", kind: "image", src: "/media/padaria-emporio.jpg", brief: "Padaria · Empório", alt: "Entrada da Padaria e Empório da Casa, com toldo azul e jardim", tone: T.padaria },
  { id: "territory-presentear", category: "environment", kind: "image", src: "/media/encomendas-balcao.jpg", brief: "Balcão de encomendas", alt: "Balcão de encomendas da Casa, com prateleiras de pães e o caixa", tone: T.tarde },
  { id: "territory-receber", category: "packaging", kind: "image", brief: "Embalagem de delivery sobre a mesa de casa", alt: "Embalagem de delivery da Casa sobre uma mesa", tone: T.verde },

  { id: "menu-cafe-da-manha", category: "food", kind: "image", src: "/media/menu-cafe-da-manha.jpg", brief: "Balcão do café da manhã", alt: "Balcão da Casa Noroeste com pães e doces sob a assinatura da marca", tone: T.manha },
  { id: "menu-padaria", category: "food", kind: "image", src: "/media/menu-padaria.jpg", brief: "Padaria", alt: "Cliente escolhendo pães no balcão da padaria", tone: T.padaria },
  { id: "menu-almoco", category: "food", kind: "image", src: "/media/menu-rotisseria.jpg", brief: "Rotisseria", alt: "Balcão da rotisseria com pratos do dia e jardineira de folhagens", tone: T.almoco },
  { id: "menu-doces", category: "food", kind: "image", src: "/media/menu-confeitaria.jpg", brief: "Confeitaria", alt: "Vitrines da confeitaria e mesas iluminadas pela claraboia", tone: T.tarde },
  { id: "menu-cafe", category: "food", kind: "image", src: "/media/menu-cafe-bar.jpg", brief: "Bar de cafés e chás", alt: "Bar de cafés e chás, com clientes conversando no balcão", tone: T.padaria },
  { id: "menu-drinks", category: "food", kind: "image", brief: "Drink autoral no balcão", alt: "Drink autoral servido no balcão", tone: T.azul },
  { id: "menu-vinhos", category: "food", kind: "image", brief: "Garrafa e taças, rótulos da casa", alt: "Taças de vinho sobre a mesa", tone: T.noite },

  { id: "order-tabua", category: "products", kind: "image", brief: "Tábua de frios isolada em fundo neutro, vista de cima", alt: "Tábua de frios e queijos", tone: T.almoco },
  { id: "order-cesta", category: "products", kind: "image", brief: "Cesta de café isolada em fundo neutro", alt: "Cesta de café da manhã", tone: T.padaria },
  { id: "order-torta", category: "products", kind: "image", brief: "Torta inteira isolada em fundo neutro", alt: "Torta inteira", tone: T.tarde },
  { id: "order-caixa", category: "packaging", kind: "image", brief: "Caixa e sacola da Casa isoladas", alt: "Caixa e sacola da Casa Almeria", tone: T.manha },

  { id: "unit-asa-sul", category: "units", kind: "image", src: "/media/unidade-104-sul.jpg", brief: "Fachada da 104 Sul", alt: "Fachada da Casa Almeria na 104 Sul, com o letreiro, toldos azuis e palmeiras", tone: T.verde },
  { id: "unit-noroeste", category: "units", kind: "image", src: "/media/unidade-noroeste.jpg", brief: "Arcos do Noroeste", alt: "Arcos brancos da Casa Almeria no Noroeste, com a padaria iluminada ao fundo", tone: T.almoco },

  { id: "happens-retrato", category: "people", kind: "image", src: "/media/acontece-selo-noroeste.jpg", brief: "Selo na parede, alguém passando", alt: "Pessoa passando diante do selo da Casa Almeria na parede do Noroeste", tone: T.padaria },
  { id: "happens-mesa", category: "people", kind: "image", src: "/media/acontece-terraco.jpg", brief: "Terraço cheio", alt: "Terraço da Casa cheio de gente, sob a pérgola e as árvores", tone: T.tarde },
  { id: "happens-detalhe", category: "units", kind: "image", src: "/media/acontece-emporio.jpg", brief: "Empório", alt: "Letreiro do Empório e o selo da Casa na fachada branca", tone: T.manha },
  { id: "happens-video", category: "environment", kind: "image", src: "/media/acontece-arvore.jpg", brief: "Copa das árvores e céu de Brasília", alt: "Copa de árvore contra o céu azul de Brasília", tone: T.noite },
  { id: "happens-jardim", category: "environment", kind: "image", src: "/media/acontece-fachada-jardim.jpg", brief: "Fachada, jardim e toldos", alt: "Fachada da 104 Sul com jardim, palmeiras e toldos azuis", tone: T.verde },
  { id: "happens-produto", category: "units", kind: "image", src: "/media/acontece-balcao-noroeste.jpg", brief: "Balcão do Noroeste", alt: "Balcão da Casa Noroeste com a assinatura da marca na parede", tone: T.almoco },
  { id: "happens-cliente", category: "people", kind: "image", src: "/media/acontece-cliente.jpg", brief: "Cliente no salão", alt: "Cliente sentada no salão, vista entre as folhas do jardim", tone: T.tarde },

  { id: "manifesto", category: "units", kind: "image", src: "/media/manifesto-letreiro.jpg", brief: "Letreiro contra o céu", alt: "Letreiro da Casa Almeria no muro de tijolos brancos, contra o céu", tone: T.manha },
];

export const MEDIA: Record<string, MediaSlot> = Object.fromEntries(slots.map((s) => [s.id, s]));

export function media(id: string): MediaSlot {
  const m = MEDIA[id];
  if (!m) throw new Error(`media slot "${id}" não existe`);
  return m;
}

/** Fragmentos do filme de abertura (brief §04) — também legendas do placeholder. */
export const HERO_FRAGMENTS = [
  "café sendo passado",
  "croissant sendo partido",
  "massa sendo aberta",
  "manteiga",
  "vapor",
  "uma taça",
  "uma mão",
  "uma mesa",
  "uma conversa",
  "uma embalagem",
  "a fachada",
  "o jardim",
  "um prato chegando à mesa",
];
