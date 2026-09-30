import { SITE, UNITS, type Unit } from "@/content/site";

/** Restaurant/LocalBusiness por unidade (brief §35). Campos pendentes são omitidos, nunca inventados. */
export function unitSchema(u: Unit) {
  return {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "Bakery"],
    "@id": `${SITE.url}/unidades#${u.id}`,
    name: `${SITE.name} ${u.short}`,
    url: `${SITE.url}/unidades`,
    image: `${SITE.url}/og.png`,
    telephone: "+55-61-99582-8131",
    servesCuisine: ["Padaria", "Café", "Brasileira"],
    ...(u.menuUrl ? { hasMenu: u.menuUrl } : {}),
    address: {
      "@type": "PostalAddress",
      ...(u.address.street ? { streetAddress: u.address.street } : {}),
      addressLocality: `${u.address.district}, ${u.address.city}`,
      addressRegion: u.address.region,
      ...(u.address.postalCode ? { postalCode: u.address.postalCode } : {}),
      addressCountry: "BR",
    },
    ...(u.geo ? { geo: { "@type": "GeoCoordinates", latitude: u.geo.lat, longitude: u.geo.lng } } : {}),
    openingHoursSpecification: u.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => `https://schema.org/${DAY[d]}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [SITE.instagram.href],
  };
}

const DAY = { Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday" } as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    slogan: SITE.slogan,
    sameAs: [SITE.instagram.href],
    subOrganization: UNITS.map((u) => ({ "@id": `${SITE.url}/unidades#${u.id}` })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
