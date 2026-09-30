/**
 * HERO — "Entre na Casa".
 * Intro (nada entra junto): fachada → marca → assinatura → a porta → as folhas se entreabrem
 * com luz na fresta (o convite) → navegação.
 * Scroll (desktop/tablet com pin; mobile sem pin): as portas abrem, o selo se parte,
 * a fachada se aproxima e o arco cresce até a tela toda — você está dentro do salão.
 * A marca migra para o header no caminho.
 */
import { ScrollTrigger, gsap } from "../gsap";
import { duration, ease } from "../config";
import { splitFor } from "../text";
import { penTimeline, prepPens, readWeights } from "../brand";
import type { Choreo } from "../choreography";

const AJAR = 24; // graus da porta entreaberta
const OPEN = 104; // graus da porta aberta (passa de 90°: some pelo backface)

export const hero: Choreo = ({ root, tier, reduce }) => {
  const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T & HTMLElement>(s);
  const qa = (s: string) => Array.from(root.querySelectorAll<HTMLElement>(s));
  const introEls = qa("[data-intro]");
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const headerLogo = document.querySelector<HTMLElement>("[data-header-logo]");

  const leafL = q("[data-leaf='left']");
  const leafR = q("[data-leaf='right']");
  const glow = q("[data-door-glow]");

  if (reduce) {
    // sem coreografia: fachada, marca e o arco já aberto mostrando o salão
    gsap.set([...introEls, header], { visibility: "visible" });
    gsap.set([leafL, leafR, glow, q("[data-arch-line]")], { autoAlpha: 0 });
    return;
  }

  const plane = q("[data-hero-plane]");
  const film = q("[data-hero-media]");
  const portal = q("[data-portal]");
  const portalInner = portal?.querySelector<HTMLElement>("[data-media-inner]") ?? null;
  const doorway = q("[data-doorway]");
  const doorwayWrap = q("[data-doorway-wrap]");
  const archPath = q("[data-arch-path]");
  const archLine = q("[data-arch-line]");
  const logo = q<SVGSVGElement>("[data-hero-logo]");
  const wrap = q("[data-hero-logo-wrap]");
  const letters = qa("[data-hero-logo] [data-letter]");
  const pens = qa("[data-hero-logo] [data-pen]");
  const dot = q("[data-hero-logo] [data-part='dot']");
  const slogan = q("[data-hero-slogan]");
  const sloganPlane = q("[data-hero-slogan-plane]");
  const invite = q("[data-invite]");
  const inviteWrap = q("[data-invite-wrap]");
  const cue = q("[data-hero-cue]");

  // Portas: rotação = entreaberta (intro) + abertura (scroll), num cálculo só
  const doors = { ajar: 0, open: 0 };
  const setL = leafL ? gsap.quickSetter(leafL, "rotationY", "deg") : null;
  const setR = leafR ? gsap.quickSetter(leafR, "rotationY", "deg") : null;
  const setGlow = glow ? gsap.quickSetter(glow, "opacity") : null;
  const renderDoors = () => {
    const a = AJAR * doors.ajar;
    const rot = a + (OPEN - a) * doors.open;
    setL?.(rot);
    setR?.(-rot);
    setGlow?.(doors.ajar * (1 - doors.open * 0.6));
  };
  renderDoors();

  // ---------- intro ----------
  prepPens(pens);
  const signature = penTimeline(pens, readWeights(logo));
  const words = slogan ? splitFor(slogan, "words") : null;
  if (archPath) gsap.set(archPath, { drawSVG: "0%" });

  const intro = gsap.timeline({ paused: true, defaults: { ease: ease.reveal } });
  intro
    .set([...introEls, header], { visibility: "visible" }, 0)
    .fromTo(film, { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.6, ease: "power2.out" }, 0)
    .from(letters, { yPercent: 55, autoAlpha: 0, duration: duration.slow, stagger: 0.09 }, 0.7)
    .to(signature, { progress: 1, duration: 1.8, ease: "power1.inOut" }, 1.2)
    .fromTo(dot, { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.5, ease: "back.out(3)" }, 2.85)
    .from(words?.targets ?? [], { ...(words?.vars ?? {}), duration: duration.slow }, 2.8)
    // a porta
    .from(doorway, { autoAlpha: 0, y: 24, duration: 1.1 }, 3.1)
    .from(portal, { autoAlpha: 0, duration: 0.6 }, 3.1)
    .to(archPath, { drawSVG: "100%", duration: 1.5, ease: "power2.inOut" }, 3.2)
    // o convite: as folhas se entreabrem e a luz sai pela fresta
    .to(doors, { ajar: 1, duration: 1.5, ease: "power2.inOut", onUpdate: renderDoors }, 3.9)
    .from(invite, { autoAlpha: 0, y: 12, duration: 1 }, 4.1)
    .from(header, { autoAlpha: 0, y: -14, duration: duration.normal }, 4.3)
    .from(cue, { autoAlpha: 0, y: 12, duration: duration.normal }, 4.5);
  const start = () => intro.play();
  (document.fonts?.ready ?? Promise.resolve()).then(start, start);

  // ---------- scroll: entrar ----------
  const archClip = () => {
    if (!doorway) return "inset(0px 0px 0px 0px round 0px 0px 0px 0px)";
    const r = root.getBoundingClientRect();
    const d = doorway.getBoundingClientRect();
    const rad = d.width / 2;
    return `inset(${d.top - r.top}px ${r.right - d.right}px ${r.bottom - d.bottom}px ${d.left - r.left}px round ${rad}px ${rad}px 0px 0px)`;
  };
  const FULL = "inset(0px 0px 0px 0px round 0px 0px 0px 0px)";

  const pinned = tier !== "mobile";
  let docked = false;
  const dock = (on: boolean) => {
    if (!headerLogo || !logo || on === docked) return;
    docked = on;
    gsap.set(headerLogo, { autoAlpha: on ? 1 : 0 });
    gsap.set(logo, { autoAlpha: on ? 0 : 1 });
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: pinned
      ? {
          trigger: root,
          start: "top top",
          end: "+=110%",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => dock(self.progress > 0.62),
        }
      : { trigger: root, start: "top top", end: "bottom top", scrub: true, invalidateOnRefresh: true },
  });
  tl.to(doors, { open: 1, duration: 0.38, ease: "power2.in", onUpdate: renderDoors }, 0)
    .to(archLine, { autoAlpha: 0, duration: 0.2 }, 0.05)
    .fromTo(portal, { clipPath: () => archClip() }, { clipPath: FULL, duration: 0.66, ease: "power2.inOut", immediateRender: false }, 0.26)
    .fromTo(portalInner, { scale: 1.28 }, { scale: 1, duration: 0.74, ease: "power1.out" }, 0.26)
    .to(plane, { scale: 1.32, duration: 0.92, ease: "power1.in" }, 0.08)
    .to(doorwayWrap, { autoAlpha: 0, duration: 0.14 }, 0.34)
    .to(sloganPlane, { yPercent: -80, autoAlpha: 0, duration: 0.3 }, 0)
    .to(inviteWrap, { autoAlpha: 0, duration: 0.2 }, 0)
    .to(cue?.parentElement ?? [], { autoAlpha: 0, duration: 0.15 }, 0);

  // a marca migra para o header dentro do mesmo trecho fixado
  if (pinned && logo && wrap && headerLogo) {
    const delta = () => {
      const r = root.getBoundingClientRect();
      const a = wrap.getBoundingClientRect();
      const b = headerLogo.getBoundingClientRect();
      return {
        x: b.left + b.width / 2 - (a.left + a.width / 2),
        y: b.top + b.height / 2 - (a.top - r.top + a.height / 2),
        s: b.width / a.width,
      };
    };
    gsap.set(headerLogo, { autoAlpha: 0 });
    tl.to(logo, { x: () => delta().x, y: () => delta().y, scale: () => delta().s, transformOrigin: "50% 50%", duration: 0.62, ease: "power1.inOut" }, 0);
  }

  // mobile: o logo pequeno do header só aparece depois que o hero sai
  if (headerLogo && !pinned) {
    gsap.set(headerLogo, { autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: root,
      start: "top top",
      end: "bottom 64px",
      onLeave: () => gsap.to(headerLogo, { autoAlpha: 1, duration: 0.4 }),
      onEnterBack: () => gsap.to(headerLogo, { autoAlpha: 0, duration: 0.3 }),
    });
  }

  return () => {
    words?.split.revert();
  };
};
