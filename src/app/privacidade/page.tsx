import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { PRIVACIDADE } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Casa Almeria trata dados pessoais no site, com base na LGPD: o que coletamos, para quê, com quem compartilhamos e os seus direitos.",
  alternates: { canonical: "/privacidade" },
};

export default function Page() {
  return <LegalPage doc={PRIVACIDADE} />;
}
