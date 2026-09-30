"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/motion/gsap";
import { initScroll } from "@/motion/scroll";
import { prefersReducedMotion } from "@/motion/reducedMotion";

/**
 * Infra global de motion: refresh após fontes/imagens, velocidade e profundidade de scroll,
 * e o tema do header (claro/escuro) conforme a seção que está sob ele.
 * Roda depois das coreografias da página (efeitos dos filhos rodam antes), então os pins já existem.
 */
export function MotionRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const stopScroll = initScroll();
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    let active: HTMLElement | null = null;
    const apply = () => {
      if (header) header.dataset.theme = active?.dataset.headerTheme ?? "light";
    };
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        // seção fixada (pin): o espaçador carrega a altura real do trecho
        trigger: section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section,
        start: "top 36px",
        end: "bottom 36px",
        onToggle(self) {
          if (self.isActive) active = section;
          else if (active === section) active = null;
          apply();
        },
      }),
    );
    // fundo do header quando a página rolou (inclusive no fim dela, sobre o footer)
    const scrolled = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => header?.toggleAttribute("data-scrolled", self.scroll() > 60),
    });
    header?.toggleAttribute("data-scrolled", window.scrollY > 60);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    window.addEventListener("casa:header-theme", apply);
    apply();

    if (prefersReducedMotion()) {
      document.querySelectorAll<HTMLVideoElement>("video[autoplay]").forEach((v) => v.pause());
    }

    return () => {
      stopScroll();
      triggers.forEach((t) => t.kill());
      scrolled.kill();
      window.removeEventListener("casa:header-theme", apply);
    };
  }, [pathname]);

  return null;
}
