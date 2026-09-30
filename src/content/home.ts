/**
 * Textos da Home. Tom: habilidoso + convidativo (Cápsula).
 * Manifesto: trechos condensados SEM os fatos pendentes de confirmação (docs/decisoes.md #2).
 */

export const HOURS = [
  { time: "08:00", title: "Bom dia.", text: "Café, pão, manteiga, ovos.", media: "hour-0800", detail: "hour-0800-detail", bg: "#fbf3e6", ink: "#11284b" },
  { time: "10:30", title: "Ainda dá tempo.", text: "Padaria, doces, café.", media: "hour-1030", detail: "hour-1030-detail", bg: "#fdf8ef", ink: "#11284b" },
  { time: "12:30", title: "A mesa está posta.", text: "Almoço.", media: "hour-1230", detail: "hour-1230-detail", bg: "#f7f3ea", ink: "#11284b" },
  { time: "16:00", title: "Só mais um café.", text: "Doces, bebidas e encontros.", media: "hour-1600", detail: "hour-1600-detail", bg: "#f6e6d2", ink: "#11284b" },
  { time: "19:00", title: "A Casa continua.", text: "Drinks, vinho, comida, conversa.", media: "hour-1900", detail: "hour-1900-detail", bg: "#11284b", ink: "#fbf7f0" },
] as const;

export const MENU_CATEGORIES = [
  { id: "cafe-da-manha", label: "Café da manhã", line: "Pão quente, manteiga, ovos do seu jeito e o dia começando sem pressa." },
  { id: "padaria", label: "Padaria", line: "Fermentação lenta, miolo macio e a casca que estala." },
  { id: "almoco", label: "Almoço", line: "Pratos do dia servidos à mesa, com tempo para a conversa." },
  { id: "doces", label: "Doces", line: "A confeitaria que transforma o meio da tarde em pausa." },
  { id: "cafe", label: "Café", line: "Espresso, coado e aquele cafezinho depois do café." },
  { id: "drinks", label: "Drinks", line: "Para quando a tarde, sem avisar, vira happy hour." },
  { id: "vinhos", label: "Vinhos", line: "Uma taça escolhida para acompanhar a boa conversa." },
] as const;

export const MANIFESTO = [
  "Em Brasília tem um lugar para qualquer tempo.",
  "Onde se sente de longe o cheiro do pão saindo do forno.",
  "Dá pra passar e levar a sobremesa do almoço.",
  "Dá pra sentar com as amigas e comemorar a vida com bons vinhos.",
  "É onde você vai encontrar aquela pessoa que faz o coração acelerar.",
  "Não importa o dia nem o tempo que você tem.",
  "Do café da manhã ao happy hour, você degusta, se encanta e conhece um pouco da origem da comida.",
] as const;

/** Frases do fundo da xícara (experiência sensorial da Cápsula). */
export const CUP_MESSAGES = ["amor até o fim.", "recarreguei.", "agora vai com fé."] as const;
