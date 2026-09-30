import type { Metadata } from "next";
import { ContactList, UnitDetails } from "@/components/sections/Blocks";
import { PageIntro } from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Contato",
  description: "WhatsApp, encomendas, Instagram e trabalhe conosco. Endereços e horários da Casa Almeria na 104 Sul e no Noroeste.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <>
      <PageIntro label="Contato" title={<>Fale com <em>a Casa.</em></>} lead="Reservas, encomendas ou só uma dúvida: escreva pelo WhatsApp, que a Casa responde." />
      <ContactList />
      <UnitDetails />
    </>
  );
}
