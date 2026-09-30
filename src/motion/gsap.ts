/**
 * Ponto único de entrada do GSAP. Nenhum outro arquivo importa "gsap" direto.
 * Observer não é importado: ScrollTrigger.observe() cobre wheel/touch/pointer.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { useGSAP } from "@gsap/react";
import { duration, ease } from "./config";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, InertiaPlugin, useGSAP);
  gsap.defaults({ ease: ease.enter, duration: duration.normal });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

registerGSAP();

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Draggable, InertiaPlugin, useGSAP };
