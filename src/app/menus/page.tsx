import type { Metadata } from "next";
import { PageIntro } from "@/components/sections/PageIntro";
import { UnitMenuCards } from "@/components/sections/Blocks";
import { MenuCollection } from "@/components/sections/MenuCollection";

export const metadata: Metadata = {
  title: "Menus",
  description: "Café da manhã, padaria, almoço, doces, café, drinks e vinhos. Escolha a sua Casa, na 104 Sul ou no Noroeste, e veja o menu completo.",
  alternates: { canonical: "/menus" },
};

export default function MenusPage() {
  return (
    <>
      <PageIntro label="Menus" title={<>Escolha a <em>sua Casa.</em></>} lead="Cada Casa tem o seu menu, do primeiro café ao último brinde. Escolha por onde começar." />
      <UnitMenuCards />
      <MenuCollection />
    </>
  );
}
