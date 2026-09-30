/**
 * Boas-vindas do hero: a Casa recebe como quem abre a porta de casa.
 * O convite muda com o tempo lá fora e com a hora. Nada de promessa de cardápio:
 * só o cafezinho, o pão e a mesa.
 */
import type { CasaStatus } from "@/lib/hours";

export type Weather = { temp: number; code: number; isDay: boolean };
export type Sky = "sol" | "noite" | "nuvens" | "neblina" | "garoa" | "chuva" | "tempestade";

/** Códigos WMO (Open-Meteo) agrupados no que importa para o convite. */
export function skyOf(w: Weather): Sky {
  const c = w.code;
  if (c >= 95) return "tempestade";
  if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return "chuva";
  if (c >= 51 && c <= 57) return "garoa";
  if (c === 45 || c === 48) return "neblina";
  if (c === 2 || c === 3) return "nuvens";
  return w.isDay ? "sol" : "noite";
}

export const SKY_LABEL: Record<Sky, string> = {
  sol: "sol",
  noite: "noite aberta",
  nuvens: "céu nublado",
  neblina: "neblina",
  garoa: "garoa",
  chuva: "chuva",
  tempestade: "tempo fechado",
};

export const FALLBACK_INVITE = "A Casa é sua. Entre e fique à vontade.";

export function inviteLine(w: Weather | null, status: CasaStatus, hour: number): string {
  if (!status.open) {
    if (!status.opens) return FALLBACK_INVITE;
    const quando = status.when === "hoje" ? `Hoje às ${status.opens}` : status.when === "amanhã" ? `Amanhã às ${status.opens}` : `Na ${status.when}, às ${status.opens}`;
    return hour < 8
      ? `${quando} a porta se abre. Guarde um lugar na mesa para o primeiro cafezinho do dia.`
      : `A Casa já descansa. ${quando} o cafezinho estará pronto esperando por você.`;
  }
  if (!w) return "A Casa é sua. Entre e fique à vontade, o cafezinho está pronto.";

  switch (skyOf(w)) {
    case "tempestade":
      return "Tempo fechado lá fora. Aqui dentro a mesa está posta e o café, quentinho. Entre.";
    case "chuva":
      return "Chove lá fora. Entre, que aqui dentro tem cafezinho quente e pão saindo do forno.";
    case "garoa":
      return "Garoa fina em Brasília. Tempo perfeito para um cafezinho sem pressa.";
    case "neblina":
      return "Neblina lá fora. Um café passado na hora ajuda o dia a começar.";
    case "nuvens":
      return w.temp >= 26
        ? "Céu nublado e calor em Brasília. Entre, escolha a sua mesa, o cafezinho já vem."
        : "Céu nublado em Brasília. Um cafezinho quente cai bem. Venha.";
    case "noite":
      return "Noite aberta em Brasília. A Casa continua acesa para um último café ou uma taça.";
    default:
      if (w.temp >= 29) return "Sol forte lá fora. Entre, a sombra do jardim e um cafezinho esperam por você.";
      if (hour < 11) return "Manhã de sol em Brasília. O cafezinho acabou de ser passado. Entre, a Casa é sua.";
      return "Céu aberto em Brasília. Tem uma mesa esperando por você.";
  }
}
