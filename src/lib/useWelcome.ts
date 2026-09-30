"use client";

import { useEffect, useState } from "react";
import { UNITS } from "@/content/site";
import { FALLBACK_INVITE, inviteLine, type Weather } from "@/content/welcome";
import { brasiliaNow, casaStatus, type CasaStatus } from "./hours";

const KEY = "casa:clima";
const TTL = 15 * 60 * 1000;
let pending: Promise<Weather | null> | null = null;

/** Uma consulta por visita (compartilhada entre hero e header), guardada por 15 min. */
function fetchWeather(): Promise<Weather | null> {
  if (pending) return pending;
  pending = (async () => {
    try {
      const cached = sessionStorage.getItem(KEY);
      if (cached) {
        const { at, w } = JSON.parse(cached) as { at: number; w: Weather };
        if (Date.now() - at < TTL) return w;
      }
    } catch {}
    try {
      const res = await fetch("/api/clima");
      if (!res.ok) return null;
      const j = await res.json();
      if (j.error || typeof j.temp !== "number") return null;
      const w: Weather = { temp: j.temp, code: j.code, isDay: j.isDay };
      try {
        sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), w }));
      } catch {}
      return w;
    } catch {
      return null;
    }
  })();
  return pending;
}

/** Status da Casa (atualiza a cada minuto) + clima + o convite do momento. Só no cliente: nada muda no HTML do servidor. */
export function useWelcome() {
  const [status, setStatus] = useState<CasaStatus | null>(null);
  const [hour, setHour] = useState(12);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const tick = () => {
      setStatus(casaStatus(UNITS[0].hours));
      setHour(Math.floor(brasiliaNow().minutes / 60));
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    let alive = true;
    fetchWeather().then((w) => alive && setWeather(w));
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return { status, weather, invite: status ? inviteLine(weather, status, hour) : FALLBACK_INVITE };
}
