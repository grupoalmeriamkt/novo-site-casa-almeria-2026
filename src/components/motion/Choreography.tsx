"use client";

import { useRef, type ComponentPropsWithoutRef, type ElementType } from "react";
import { useGSAP } from "@/motion/gsap";
import { runChoreography } from "@/motion/choreography";
import { choreographies, type ChoreoName } from "@/motion/choreographies";

type Props = ComponentPropsWithoutRef<"section"> & {
  name: ChoreoName;
  as?: "section" | "div" | "footer" | "article" | "header";
  [data: `data-${string}`]: string | number | boolean | undefined;
};

/**
 * Liga uma seção (HTML renderizado no servidor) à sua coreografia.
 * O conteúdo existe sem JS; o motion só se aplica por cima.
 */
export function Choreography({ name, as = "section", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      if (!ref.current) return;
      return runChoreography(ref.current, choreographies[name]);
    },
    { scope: ref },
  );
  const Tag = as as ElementType;
  return (
    <Tag ref={ref} data-choreo={name} {...rest}>
      {children}
    </Tag>
  );
}
