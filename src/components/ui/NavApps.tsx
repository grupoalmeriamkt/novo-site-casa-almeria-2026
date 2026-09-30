import type { AnalyticsEvent } from "@/lib/analytics";
import { TrackedLink } from "./TrackedLink";
import styles from "./NavApps.module.css";

/*
 * Ícones dos apps de navegação. Marcas registradas dos respectivos donos, usadas só para indicar o destino do link.
 * Google Maps (2020) e maçã do Apple Maps: Wikimedia Commons, domínio público. Waze: Simple Icons (CC0).
 */
const GOOGLE: [string, string][] = [["#1a73e8", "M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"], ["#ea4335", "M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"], ["#4285f4", "M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"], ["#fbbc04", "M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"], ["#34a853", "M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"]];
const APPLE = "M1393.93,402.59 c76.49-92.42,132.26-221.49,132.26-350.56c0-17.53-1.59-35.06-4.78-49.4c-125.88,4.78-277.26,84.45-368.09,191.22 c-71.71,81.27-137.04,208.74-137.04,339.41c0,19.12,3.19,38.24,4.78,44.62c11.03,2.09,22.23,3.15,33.46,3.19 C1167.66,581.05,1309.48,504.57,1393.93,402.59z M1483.17,608.14c-189.62,0-344.19,114.73-441.39,114.73 c-105.17,0-243.8-108.36-407.93-108.36c-312.32,0-629.42,258.14-629.42,745.74c0,302.76,117.92,623.05,262.92,830.2 c124.29,175.28,232.65,318.7,388.81,318.7c154.57,0,223.09-103.58,415.89-103.58c196,0,239.02,100.39,411.12,100.39 c168.91,0,282.04-156.16,388.81-309.14c119.51-175.28,168.9-347.37,172.09-355.34c-11.15-3.19-334.63-135.44-334.63-506.72 c0-321.88,254.96-466.89,269.3-478.04C1809.83,614.52,1553.28,608.14,1483.17,608.14L1483.17,608.14z";
const WAZE = "M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z";

type Point = { lat: number; lng: number };

export function navLinks(destination: Point, origin?: Point | null) {
  const d = `${destination.lat},${destination.lng}`;
  const o = origin ? `${origin.lat},${origin.lng}` : null;
  return {
    google: `https://www.google.com/maps/dir/?api=1${o ? `&origin=${o}` : ""}&destination=${d}&travelmode=driving`,
    waze: `https://waze.com/ul?ll=${d}&navigate=yes`,
    apple: `https://maps.apple.com/?${o ? `saddr=${o}&` : ""}daddr=${d}&dirflg=d`,
  };
}

export function GoogleMapsIcon() {
  return (
    <span className={`${styles.tile} ${styles.google}`} aria-hidden="true">
      <svg viewBox="0 0 92.3 132.3" focusable="false">
        {GOOGLE.map(([fill, d]) => (
          <path key={d.slice(0, 12)} fill={fill} d={d} />
        ))}
      </svg>
    </span>
  );
}

export function WazeIcon() {
  return (
    <span className={`${styles.tile} ${styles.waze}`} aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path fill="#0b1f2e" d={WAZE} />
      </svg>
    </span>
  );
}

export function AppleMapsIcon() {
  return (
    <span className={`${styles.tile} ${styles.apple}`} aria-hidden="true">
      <svg viewBox="4.4 2.6 2039.6 2506.5" focusable="false">
        <path fill="#ffffff" d={APPLE} />
      </svg>
    </span>
  );
}

/** Três botões: a rota segue para o app de preferência (ou para o navegador, no Google Maps). */
export function NavApps({
  destination,
  origin,
  event,
  params,
}: {
  destination: Point;
  origin?: Point | null;
  event?: AnalyticsEvent;
  params?: Record<string, string | number>;
}) {
  const links = navLinks(destination, origin);
  const apps = [
    { id: "google", label: "Google Maps", href: links.google, icon: <GoogleMapsIcon /> },
    { id: "waze", label: "Waze", href: links.waze, icon: <WazeIcon /> },
    { id: "apple", label: "Apple Maps", href: links.apple, icon: <AppleMapsIcon /> },
  ];
  return (
    <ul className={styles.list}>
      {apps.map((a, i) => (
        <li key={a.id} style={{ "--i": i } as React.CSSProperties}>
          <TrackedLink href={a.href} event={event} params={{ ...params, app: a.id }} className={styles.app}>
            {a.icon}
            <span className={styles.label}>{a.label}</span>
          </TrackedLink>
        </li>
      ))}
    </ul>
  );
}
