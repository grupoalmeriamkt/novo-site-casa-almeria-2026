import type { Sky } from "@/content/welcome";

/** Ícones de tempo em traço fino, na cor do texto. */
export function WeatherIcon({ sky, className }: { sky: Sky; className?: string }) {
  const cloud = "M7 18h10.5a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.2 9.6 4.2 4.2 0 0 0 7 18z";
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {sky === "sol" && (
        <>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
        </>
      )}
      {sky === "noite" && <path d="M19.5 14.6A7.8 7.8 0 0 1 9.4 4.5a7.8 7.8 0 1 0 10.1 10.1z" />}
      {sky === "nuvens" && <path d={cloud} />}
      {sky === "neblina" && <path d="M4 9h16M6 13h12M4 17h16" />}
      {sky === "garoa" && (
        <>
          <path d="M7 15h10.5a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.2 6.6 4.2 4.2 0 0 0 7 15z" />
          <path d="M9 19v.01M13 19v.01M17 19v.01" />
        </>
      )}
      {sky === "chuva" && (
        <>
          <path d="M7 15h10.5a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.2 6.6 4.2 4.2 0 0 0 7 15z" />
          <path d="M9 18l-1 2.5M13 18l-1 2.5M17 18l-1 2.5" />
        </>
      )}
      {sky === "tempestade" && (
        <>
          <path d="M7 14h10.5a3.5 3.5 0 0 0 .4-6.98A5 5 0 0 0 8.2 5.6 4.2 4.2 0 0 0 7 14z" />
          <path d="M12.5 15.5l-2 3.5h3l-2 3.5" />
        </>
      )}
    </svg>
  );
}
