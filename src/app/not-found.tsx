import Image from "next/image";
import { ArrowLink } from "@/components/ui/Links";
import { PageIntro } from "@/components/sections/PageIntro";

export default function NotFound() {
  return (
    <>
      <PageIntro label="404" title={<>Esta porta <em>não abre.</em></>} lead="Esta página não existe, mas a Casa continua de portas abertas." />
      <div style={{ padding: "0 var(--page-x) var(--section-y)", display: "grid", gap: "var(--space-6)", justifyItems: "start" }}>
        <Image src="/illustrations/cachorro.svg" alt="" width={253} height={331} unoptimized style={{ width: "min(240px, 50vw)", height: "auto" }} />
        <ArrowLink href="/">Voltar para a Casa</ArrowLink>
      </div>
    </>
  );
}
