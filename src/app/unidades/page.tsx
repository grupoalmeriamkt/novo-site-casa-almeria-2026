import type { Metadata } from "next";
import { Houses } from "@/components/sections/Houses";
import { PageIntro } from "@/components/sections/PageIntro";
import { UNITS } from "@/content/site";
import { JsonLd, unitSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Unidades",
  description: "Casa Almeria na 104 Sul (CLS 104, Bloco D, Loja 01) e no Noroeste, em Brasília. Endereços, horários, menus e como chegar.",
  alternates: { canonical: "/unidades" },
};

export default function UnidadesPage() {
  return (
    <>
      <JsonLd data={UNITS.map(unitSchema)} />
      <PageIntro label="Unidades" title={<>Encontre <em>uma Casa.</em></>} lead="Na 104 Sul, entre palmeiras. No Noroeste, sob arcos brancos. As duas com a porta aberta para você." />
      <Houses />
    </>
  );
}
