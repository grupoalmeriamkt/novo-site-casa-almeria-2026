import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { COOKIES } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Quais cookies o site da Casa Almeria usa, para que servem e como mudar a sua escolha a qualquer momento.",
  alternates: { canonical: "/cookies" },
};

export default function Page() {
  return <LegalPage doc={COOKIES} />;
}
