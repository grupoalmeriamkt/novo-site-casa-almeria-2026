import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { TERMOS } from "@/content/legal";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "As regras de uso do site da Casa Almeria: pedidos por plataformas parceiras, propriedade intelectual, responsabilidades e foro.",
  alternates: { canonical: "/termos" },
};

export default function Page() {
  return <LegalPage doc={TERMOS} />;
}
