"use client";

import { useEffect, useRef, useState } from "react";
import { IfoodIcon } from "@/components/brand/IfoodIcon";
import { ArrowLink } from "@/components/ui/Links";
import { NavApps } from "@/components/ui/NavApps";
import { UNITS, unitAddressLine, type Unit } from "@/content/site";
import { track } from "@/lib/analytics";
import { CASA_MAP_STYLE, distanceKm, loadMaps, loadRoutes, mapsAvailable } from "@/lib/maps";
import { gsap } from "@/motion/gsap";
import { ease } from "@/motion/config";
import { prefersReducedMotion } from "@/motion/reducedMotion";
import styles from "./UnitsMap.module.css";

type LatLng = google.maps.LatLngLiteral;
type Located = Unit & { geo: LatLng };
type Status = "idle" | "loading" | "ready" | "error";
type Overlay = google.maps.OverlayView & { setPosition(p: LatLng): void };
type RoutePhase = "locating" | "computing" | "drawing" | "done" | "nolocation" | "error";
type RouteState = { unitId: string; phase: RoutePhase; origin?: LatLng; distance?: string; duration?: string };

declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}

const located = UNITS.filter((u): u is Located => Boolean(u.geo));
const km = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const formatDistance = (d: number) => (d < 1 ? `${Math.round(d * 1000)} m` : `${km.format(d)} km`);

function currentPosition(): Promise<LatLng> {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) return reject(new Error("NO_GEO"));
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
      reject,
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  });
}

/**
 * "Quero encontrar uma Casa": mapa na paleta da marca, pins próprios, a Casa mais perto
 * e a rota desenhada como um traço de caneta, com saída para Google Maps, Waze ou Apple Maps.
 * O Google Maps só carrega quando a seção se aproxima da tela.
 */
export function UnitsMap() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const lib = useRef<{
    LatLngBounds: typeof google.maps.LatLngBounds;
    Polyline: typeof google.maps.Polyline;
    event: typeof google.maps.event;
  } | null>(null);
  const makeOverlay = useRef<((pos: LatLng, el: HTMLElement) => Overlay) | null>(null);
  const pins = useRef<Record<string, HTMLButtonElement>>({});
  const me = useRef<{ pos: LatLng; overlay: Overlay } | null>(null);
  const routeLayer = useRef<{ lines: google.maps.Polyline[]; head: Overlay | null; tween: gsap.core.Tween | null } | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState<string | null>(null);
  const [dist, setDist] = useState<Record<string, number> | null>(null);
  const [nearestId, setNearestId] = useState<string | null>(null);
  const [geoMsg, setGeoMsg] = useState("");
  const [route, setRoute] = useState<RouteState | null>(null);
  const hasKey = mapsAvailable();
  const ready = status === "ready";

  const fitAll = (extra?: LatLng[]) => {
    const m = map.current;
    const L = lib.current;
    if (!m || !L) return;
    const bounds = new L.LatLngBounds();
    [...located.map((u) => u.geo), ...(extra ?? [])].forEach((p) => bounds.extend(p));
    m.fitBounds(bounds, { top: 90, bottom: 60, left: 70, right: 70 });
  };

  const focusUnit = (id: string) => {
    const u = located.find((x) => x.id === id);
    const m = map.current;
    const L = lib.current;
    setActive(id);
    if (!u || !m || !L) return;
    if (prefersReducedMotion()) {
      m.setCenter(u.geo);
      m.setZoom(16);
      return;
    }
    m.panTo(u.geo);
    if ((m.getZoom() ?? 13) < 15) L.event.addListenerOnce(m, "idle", () => m.setZoom(16));
  };

  /** Posição de quem está vendo (pergunta uma vez e marca no mapa). */
  const ensureMe = async (): Promise<LatLng> => {
    if (me.current) return me.current.pos;
    const here = await currentPosition();
    const m = map.current;
    if (m && makeOverlay.current) {
      const el = document.createElement("span");
      el.className = styles.me;
      el.innerHTML = `<span class="${styles.meDot}"></span><span class="${styles.meLabel}">Você</span>`;
      const overlay = makeOverlay.current(here, el);
      overlay.setMap(m);
      me.current = { pos: here, overlay };
    }
    const d = Object.fromEntries(located.map((u) => [u.id, distanceKm(here, u.geo)]));
    setDist(d);
    return here;
  };

  const clearRoute = () => {
    const layer = routeLayer.current;
    if (layer) {
      layer.tween?.kill();
      layer.lines.forEach((l) => l.setMap(null));
      layer.head?.setMap(null);
    }
    routeLayer.current = null;
  };

  /** Desenha a rota como um traço contínuo, em velocidade constante ao longo do caminho. */
  const drawRoute = (path: LatLng[]) =>
    new Promise<void>((resolve) => {
      const m = map.current;
      const L = lib.current;
      if (!m || !L || path.length < 2) return resolve();
      clearRoute();
      const under = new L.Polyline({ map: m, path: [], strokeColor: "#11284b", strokeOpacity: 0.9, strokeWeight: 9, zIndex: 1, clickable: false });
      const top = new L.Polyline({ map: m, path: [], strokeColor: "#f2ba72", strokeOpacity: 1, strokeWeight: 4, zIndex: 2, clickable: false });
      let head: Overlay | null = null;
      if (makeOverlay.current) {
        const el = document.createElement("span");
        el.className = styles.pen;
        head = makeOverlay.current(path[0], el);
        head.setMap(m);
      }
      routeLayer.current = { lines: [under, top], head, tween: null };

      const bounds = new L.LatLngBounds();
      path.forEach((p) => bounds.extend(p));
      m.fitBounds(bounds, { top: 90, bottom: 80, left: 80, right: 80 });

      const cum = [0];
      for (let i = 1; i < path.length; i++) cum.push(cum[i - 1] + distanceKm(path[i - 1], path[i]));
      const total = cum[cum.length - 1] || 1;
      const render = (t: number) => {
        const d = t * total;
        let lo = 0;
        let hi = cum.length - 1;
        while (lo < hi - 1) {
          const mid = (lo + hi) >> 1;
          if (cum[mid] <= d) lo = mid;
          else hi = mid;
        }
        const seg = cum[hi] - cum[lo] || 1;
        const f = Math.min(1, Math.max(0, (d - cum[lo]) / seg));
        const tip = { lat: path[lo].lat + (path[hi].lat - path[lo].lat) * f, lng: path[lo].lng + (path[hi].lng - path[lo].lng) * f };
        const pts = [...path.slice(0, lo + 1), tip];
        under.setPath(pts);
        top.setPath(pts);
        head?.setPosition(tip);
      };

      if (prefersReducedMotion()) {
        render(1);
        head?.setMap(null);
        return resolve();
      }
      let started = false;
      const go = () => {
        if (started) return;
        started = true;
        const state = { t: 0 };
        const tween = gsap.to(state, {
          t: 1,
          duration: gsap.utils.clamp(1.8, 3.2, 1.4 + total / 5),
          ease: "power1.inOut",
          onUpdate: () => render(state.t),
          onComplete: () => {
            head?.setMap(null);
            resolve();
          },
        });
        if (routeLayer.current) routeLayer.current.tween = tween;
      };
      L.event.addListenerOnce(m, "idle", go);
      window.setTimeout(go, 900);
    });

  const traceRoute = async (u: Located) => {
    setActive(u.id);
    setRoute({ unitId: u.id, phase: "locating" });
    track(u.analytics.maps, { action: "tracar_rota" });
    let here: LatLng;
    try {
      here = await ensureMe();
    } catch {
      clearRoute();
      setRoute({ unitId: u.id, phase: "nolocation" });
      focusUnit(u.id);
      return;
    }
    setRoute({ unitId: u.id, phase: "computing", origin: here });
    try {
      const { DirectionsService } = await loadRoutes();
      const res = await new DirectionsService().route({ origin: here, destination: u.geo, travelMode: google.maps.TravelMode.DRIVING });
      const best = res.routes[0];
      const leg = best?.legs[0];
      if (!best || !leg) throw new Error("NO_ROUTE");
      const path = best.overview_path.map((p) => ({ lat: p.lat(), lng: p.lng() }));
      setRoute({ unitId: u.id, phase: "drawing", origin: here, distance: leg.distance?.text, duration: leg.duration?.text });
      await drawRoute(path);
      setRoute((r) => (r && r.unitId === u.id ? { ...r, phase: "done" } : r));
    } catch {
      clearRoute();
      setRoute({ unitId: u.id, phase: "error", origin: here });
      focusUnit(u.id);
    }
  };

  // carrega o Maps quando a seção chega perto da tela
  useEffect(() => {
    if (!hasKey || !root.current || !canvas.current) return;
    let cancelled = false;
    window.gm_authFailure = () => setStatus("error");

    const build = async () => {
      setStatus("loading");
      try {
        const { Map, OverlayView, Polyline, LatLng: GLatLng, LatLngBounds, event } = await loadMaps();
        if (cancelled || !canvas.current) return;
        lib.current = { LatLngBounds, Polyline, event };

        class Marker extends OverlayView {
          pos: LatLng;
          el: HTMLElement;
          constructor(pos: LatLng, el: HTMLElement) {
            super();
            this.pos = pos;
            this.el = el;
          }
          setPosition(p: LatLng) {
            this.pos = p;
            this.draw();
          }
          onAdd() {
            this.getPanes()?.overlayMouseTarget.appendChild(this.el);
          }
          draw() {
            const p = this.getProjection()?.fromLatLngToDivPixel(new GLatLng(this.pos));
            if (!p) return;
            this.el.style.left = `${p.x}px`;
            this.el.style.top = `${p.y}px`;
          }
          onRemove() {
            this.el.remove();
          }
        }
        makeOverlay.current = (pos, el) => new Marker(pos, el);

        const m = new Map(canvas.current, {
          center: located[0]?.geo ?? { lat: -15.79, lng: -47.9 },
          zoom: 13,
          styles: CASA_MAP_STYLE,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
          clickableIcons: false,
          backgroundColor: "#f4ecdf",
        });
        map.current = m;

        located.forEach((u) => {
          const el = document.createElement("button");
          el.type = "button";
          el.className = styles.pin;
          el.setAttribute("aria-label", `${u.name}: mostrar no mapa`);
          el.innerHTML = `<span class="${styles.pinInner}"><span class="${styles.pinLabel}">${u.short}</span><span class="${styles.pinStem}"></span><span class="${styles.pinDot}"></span></span>`;
          el.addEventListener("click", () => focusUnit(u.id));
          pins.current[u.id] = el;
          new Marker(u.geo, el).setMap(m);
        });

        fitAll();
        event.addListenerOnce(m, "idle", () => {
          if (cancelled) return;
          setStatus("ready");
          if (!prefersReducedMotion()) {
            gsap.from(
              Object.values(pins.current).map((p) => p.firstElementChild),
              { y: -28, autoAlpha: 0, duration: 1, ease: ease.reveal, stagger: 0.18, delay: 0.2 },
            );
          }
        });
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        build();
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(root.current);
    return () => {
      cancelled = true;
      io.disconnect();
      clearRoute();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasKey]);

  useEffect(() => {
    Object.entries(pins.current).forEach(([id, el]) => el.toggleAttribute("data-active", id === active));
  }, [active, status]);

  const findNearest = async () => {
    setGeoMsg("Procurando você no mapa…");
    try {
      const here = await ensureMe();
      const d = Object.fromEntries(located.map((u) => [u.id, distanceKm(here, u.geo)]));
      const nearest = located.reduce((a, b) => (d[a.id] <= d[b.id] ? a : b));
      setNearestId(nearest.id);
      setActive(nearest.id);
      setGeoMsg(`A Casa mais perto de você é a ${nearest.short}, a ${formatDistance(d[nearest.id])}.`);
      if (d[nearest.id] < 60) fitAll([here]);
      else focusUnit(nearest.id);
    } catch {
      setGeoMsg("Não conseguimos a sua localização. Escolha uma das Casas ao lado.");
    }
  };

  const routeUnit = route ? located.find((u) => u.id === route.unitId) : undefined;
  const routeText = (() => {
    if (!route || !routeUnit) return "";
    switch (route.phase) {
      case "locating":
        return "Procurando você no mapa…";
      case "computing":
        return `Calculando o caminho até a ${routeUnit.name}…`;
      case "drawing":
      case "done":
        return [routeUnit.name, route.distance, route.duration && `cerca de ${route.duration} de carro`].filter(Boolean).join(" · ");
      case "nolocation":
        return "Sem a sua localização, o aplicativo encontra o caminho para você.";
      case "error":
        return "A rota não carregou agora, mas o aplicativo leva você até a porta.";
    }
  })();
  const showApps = route && ["done", "nolocation", "error"].includes(route.phase);

  return (
    <div ref={root} className={styles.wrap} data-status={status} data-nokey={hasKey ? undefined : ""}>
      <header className={styles.head} data-reveal="up">
        <p className="label">Como chegar</p>
        <h3 className={styles.title}>
          Encontre a Casa <em>mais perto.</em>
        </h3>
      </header>

      <div className={styles.mapCol} data-reveal="up">
        <div className={styles.frame}>
          <div ref={canvas} className={styles.canvas} role="region" aria-label="Mapa com as Casas Almeria em Brasília" />
          {status !== "ready" && (
            <p className={styles.veil} aria-live="polite">
              {status === "error" ? "O mapa não abriu agora. Os endereços estão logo ao lado." : "Abrindo o mapa…"}
            </p>
          )}
        </div>

        <div className={styles.tools}>
          <button type="button" className={styles.tool} onClick={findNearest} disabled={!ready}>
            Qual Casa fica mais perto de você?
          </button>
          <button
            type="button"
            className={styles.toolGhost}
            onClick={() => {
              clearRoute();
              setRoute(null);
              setActive(null);
              fitAll(me.current ? [me.current.pos] : undefined);
            }}
            disabled={!ready}
          >
            Ver as duas
          </button>
        </div>

        <div className={styles.feedback} aria-live="polite">
          {geoMsg && !route && (
            <p className={styles.geoMsg}>
              {geoMsg}
              {nearestId && (
                <button type="button" className={styles.inlineAction} onClick={() => traceRoute(located.find((u) => u.id === nearestId)!)}>
                  Traçar a rota até lá
                </button>
              )}
            </p>
          )}

          {route && routeUnit && (
            <div className={styles.route} data-phase={route.phase}>
              <p className={styles.routeText}>
                {["locating", "computing", "drawing"].includes(route.phase) && <span className={styles.spinner} aria-hidden="true" />}
                {routeText}
              </p>
              {showApps && (
                <div className={styles.routeApps}>
                  <p className="label">Seguir no aplicativo</p>
                  <NavApps destination={routeUnit.geo} origin={route.origin} event={routeUnit.analytics.maps} params={{ unit: routeUnit.id }} />
                </div>
              )}
              {showApps && (
                <button
                  type="button"
                  className={styles.inlineAction}
                  onClick={() => {
                    clearRoute();
                    setRoute(null);
                    fitAll(me.current ? [me.current.pos] : undefined);
                  }}
                >
                  Limpar a rota
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <ul className={styles.list}>
        {UNITS.map((u) => {
          const geo = u.geo;
          return (
            <li
              key={u.id}
              className={styles.item}
              data-active={active === u.id || undefined}
              data-reveal="up"
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse" && geo && ready && active !== u.id && !route) focusUnit(u.id);
              }}
            >
              <button type="button" className={styles.itemHead} onClick={() => focusUnit(u.id)} disabled={!geo || !ready} aria-pressed={active === u.id}>
                <span className={styles.itemName}>{u.name}</span>
                {dist?.[u.id] != null && <span className={styles.itemDist}>{formatDistance(dist[u.id])}</span>}
              </button>
              <address className={styles.itemAddress}>{unitAddressLine(u)}</address>
              <p className={styles.itemHours}>
                {u.hours.map((h) => (
                  <span key={h.label}>{h.label}</span>
                ))}
              </p>
              <div className={styles.itemActions}>
                {geo && (
                  <button type="button" className={styles.routeBtn} onClick={() => traceRoute({ ...u, geo })} disabled={!ready}>
                    Traçar rota
                  </button>
                )}
                <ul className={styles.itemLinks}>
                  {u.menuUrl && (
                    <li>
                      <ArrowLink href={u.menuUrl} event={u.analytics.menu}>
                        Menu
                      </ArrowLink>
                    </li>
                  )}
                  {u.ifoodUrl && (
                    <li>
                      <ArrowLink href={u.ifoodUrl} event="ifood_click" params={{ unit: u.id }} icon={<IfoodIcon />}>
                        iFood
                      </ArrowLink>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
