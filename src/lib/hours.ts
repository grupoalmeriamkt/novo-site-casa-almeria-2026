import type { OpeningHours, Weekday } from "@/content/site";

const ORDER: Weekday[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const FROM_EN: Record<string, Weekday> = { Sun: "Su", Mon: "Mo", Tue: "Tu", Wed: "We", Thu: "Th", Fri: "Fr", Sat: "Sa" };
const DAY_NAME: Record<Weekday, string> = { Su: "domingo", Mo: "segunda", Tu: "terça", We: "quarta", Th: "quinta", Fr: "sexta", Sa: "sábado" };

/** Dia da semana e minutos do dia no fuso de Brasília, independente de onde o visitante está. */
export function brasiliaNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return { day: FROM_EN[get("weekday")] ?? "Mo", minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const spoken = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
};

export type CasaStatus =
  | { open: true; closes: string; minutesLeft: number }
  | { open: false; opens: string; when: string };

export function casaStatus(hours: OpeningHours[], date = new Date()): CasaStatus {
  const { day, minutes } = brasiliaNow(date);
  const today = hours.find((h) => h.days.includes(day));
  if (today) {
    const o = toMinutes(today.opens);
    const c = toMinutes(today.closes);
    if (minutes >= o && minutes < c) return { open: true, closes: spoken(today.closes), minutesLeft: c - minutes };
    if (minutes < o) return { open: false, opens: spoken(today.opens), when: "hoje" };
  }
  const i = ORDER.indexOf(day);
  for (let k = 1; k <= 7; k++) {
    const d = ORDER[(i + k) % 7];
    const h = hours.find((x) => x.days.includes(d));
    if (h) return { open: false, opens: spoken(h.opens), when: k === 1 ? "amanhã" : DAY_NAME[d] };
  }
  return { open: false, opens: "", when: "" };
}

/** "Aberta agora, até as 21h" · "Fechada agora, abre amanhã às 8h" */
export function statusLine(s: CasaStatus): string {
  if (s.open) return s.minutesLeft <= 60 ? `Aberta até as ${s.closes}, ainda dá tempo` : `Aberta agora, até as ${s.closes}`;
  return `Fechada agora, abre ${s.when} às ${s.opens}`;
}

/** O que dá para fazer neste momento. */
export function servicesLine(s: CasaStatus): string {
  return s.open ? "Padaria, café e pedidos funcionando" : "Encomendas pelo site a qualquer hora";
}
