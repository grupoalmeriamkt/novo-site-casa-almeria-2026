import type { Metadata } from "next";
import { FromOurHouse } from "@/components/sections/FromOurHouse";
import { ContactList } from "@/components/sections/Blocks";
import { PageIntro } from "@/components/sections/PageIntro";

export const metadata: Metadata = {
  title: "Encomendas",
  description: "Tábuas, cestas de café da manhã e tortas da Casa Almeria, para receber em casa ou presentear quem você gosta.",
  alternates: { canonical: "/encomendas" },
};

export default function EncomendasPage() {
  return (
    <>
      <PageIntro
        label="Encomendas"
        title={<>Para receber <em>ou presentear.</em></>}
        lead="Escolha a ocasião e finalize o pedido na nossa central de vendas. Se preferir conversar, a Casa atende pelo WhatsApp."
      />
      <FromOurHouse />
      <div style={{ paddingTop: "var(--section-y)" }}>
        <ContactList />
      </div>
    </>
  );
}
