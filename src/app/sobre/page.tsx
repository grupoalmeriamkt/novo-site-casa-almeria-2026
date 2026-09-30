import type { Metadata } from "next";
import { Illustrations, Pillars } from "@/components/sections/Blocks";
import { Manifesto } from "@/components/sections/Manifesto";
import { PageIntro } from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "A Casa",
  description: "Casa Almeria é uma casa de gastronomia e encontros em Brasília, feita para alimentar corpo e alma.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <>
      <PageIntro
        label="A Casa"
        title={<>Gastronomia <em>e encontros.</em></>}
        lead="Uma casa que começa pela manhã, serve café, assa pão, recebe encontros, prepara almoço e continua dentro da casa das pessoas."
      />
      <Pillars />
      <Manifesto />
      <Illustrations />
    </>
  );
}
