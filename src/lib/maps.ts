/**
 * Google Maps (mesmo padrão do projeto 1-ano-SommaDay: loader funcional + NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).
 * A chave vai para o navegador por definição da API: restrinja por referenciador HTTP no Google Cloud
 * (localhost e casaalmeria.com.br) e mantenha só a Maps JavaScript API habilitada para ela.
 */
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

export const GMAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

let configured = false;

export function mapsAvailable(): boolean {
  return Boolean(GMAPS_KEY);
}

export async function loadMaps() {
  if (!GMAPS_KEY) throw new Error("NO_MAPS_KEY");
  if (!configured) {
    setOptions({ key: GMAPS_KEY, v: "weekly", language: "pt-BR", region: "BR" });
    configured = true;
  }
  const [maps, core] = await Promise.all([importLibrary("maps"), importLibrary("core")]);
  return { ...maps, ...core };
}

/** Mapa na paleta da Casa: terra creme, lago Paranoá em azul claro, nada de POIs concorrendo com as Casas. */
export const CASA_MAP_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#f4ecdf" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b7890" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#fbf7f0" }, { weight: 3 }] },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ visibility: "on" }, { color: "#e1e5d6" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#fbf7f0" }] },
  { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#eadfcd" }] },
  { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#f5d9ac" }] },
  { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9c99a" }] },
  { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#9fcad3" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#11284b" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ visibility: "off" }] },
  { featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#11284b" }] },
  { featureType: "landscape.man_made", elementType: "geometry", stylers: [{ color: "#efe5d5" }] },
];

/** Distância em linha reta (km). */
export function distanceKm(a: google.maps.LatLngLiteral, b: google.maps.LatLngLiteral): number {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Biblioteca de rotas (a mesma que o projeto 1-ano-SommaDay usa com esta chave). */
export async function loadRoutes() {
  await loadMaps();
  return importLibrary("routes");
}
