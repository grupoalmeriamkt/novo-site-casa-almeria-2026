/**
 * HERO — "Uma Casa para qualquer hora." O scroll é o relógio.
 * Desktop/tablet: palco fixo (pin justificado: scroll = passagem do tempo).
 * A foto seguinte entra antes da anterior sair; a anterior recua (passa por trás);
 * o texto antigo fica um pouco mais; a cor da interface muda com o dia.
 * Mobile: sem pin, momentos empilhados, só a cor e as revelações acompanham.
 */
import { ScrollTrigger, gsap } from "../gsap";
import { imageReveal } from "../image";
import type { Choreo } from "../choreography";

function markNow(root: HTMLElement) {
  const fmt = new Intl.DateTimeFormat("pt-BR", { timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  const [h, m] = fmt.format(new Date()).split(":").map(Number);
  const now = h * 60 + m;
  if (now < 7 * 60 || now > 21 * 60 + 30) return () => {};
  const moments = Array.from(root.querySelectorAll<HTMLElement>("[data-moment]"));
  const toMin = (t: string) => { const [a, b] = t.split(":").map(Number); return a * 60 + b; };
  let idx = 0;
  moments.forEach((el, i) => { if (toMin(el.dataset.time ?? "0:0") <= now) idx = i; });
  const marked = [moments[idx], root.querySelectorAll<HTMLElement>("[data-tick]")[idx]].filter(Boolean) as HTMLElement[];
  marked.forEach((el) => el.setAttribute("data-now", ""));
  return () => marked.forEach((el) => el.removeAttribute("data-now"));
}

/** A seção muda de tema conforme a hora; o header (MotionRoot) reavalia sem medir nada. */
function setHeaderTheme(root: HTMLElement, theme: string) {
  if (root.dataset.headerTheme === theme) return;
  root.dataset.headerTheme = theme;
  window.dispatchEvent(new CustomEvent("casa:header-theme"));
}

export const anyHour: Choreo = ({ root, tier, reduce }) => {
  const unmark = markNow(root);
  const moments = Array.from(root.querySelectorAll<HTMLElement>("[data-moment]"));
  const n = moments.length;
  const colorOf = (i: number) => ({ backgroundColor: moments[i].dataset.bg, color: moments[i].dataset.ink });
  const themeOf = (i: number) => (moments[i].dataset.ink === "#fbf7f0" ? "dark" : "light");

  if (reduce || tier === "mobile") {
    moments.forEach((m, i) => {
      ScrollTrigger.create({
        trigger: m,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => {
          if (!self.isActive) return;
          if (reduce) gsap.set(root, colorOf(i));
          else gsap.to(root, { ...colorOf(i), duration: 0.8, ease: "power1.inOut", overwrite: "auto" });
          setHeaderTheme(root, themeOf(i));
        },
      });
      if (!reduce) {
        const frame = m.querySelector<HTMLElement>("[data-frame]");
        if (frame) imageReveal(frame);
      }
    });
    return unmark;
  }

  root.setAttribute("data-staged", "");
  const stage = root.querySelector<HTMLElement>("[data-hour-stage]")!;
  const frames = moments.map((m) => m.querySelector<HTMLElement>("[data-frame]"));
  const inners = frames.map((f) => f?.querySelector<HTMLElement>("[data-media-inner]") ?? null);
  const details = moments.map((m) => m.querySelector<HTMLElement>("[data-detail]"));
  const texts = moments.map((m) => m.querySelector<HTMLElement>("[data-moment-text]"));
  const times = Array.from(root.querySelectorAll<HTMLElement>("[data-clock-time]"));
  const fill = root.querySelector<HTMLElement>("[data-rail-fill]");
  const ticks = Array.from(root.querySelectorAll<HTMLElement>("[data-tick]"));

  gsap.set(frames.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
  gsap.set(details.slice(1), { autoAlpha: 0, yPercent: 50 });
  gsap.set(texts.slice(1), { autoAlpha: 0, yPercent: 35 });
  gsap.set(times.slice(1), { yPercent: 100 });
  gsap.set(fill, { scaleX: 0, transformOrigin: "0% 50%" });
  gsap.set(root, colorOf(0));
  ticks[0]?.setAttribute("data-active", "");

  const night = root.querySelector<HTMLElement>("[data-night]");
  const isDark = (i: number) => themeOf(i) === "dark";
  // Claro→claro: a cor do dia muda devagar. Claro→escuro: a noite sobe como cortina
  // (interpolar creme→azul passaria por um cinza sujo) e a tinta vira no meio do caminho.
  const dayColor = (i: number, at: number) => {
    const t = gsap.timeline();
    if (isDark(i) && !isDark(i - 1) && night) {
      t.fromTo(night, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power2.inOut" }, 0)
        .to(root, { color: moments[i].dataset.ink, duration: 0.3, ease: "none" }, 0.5);
    } else {
      t.to(root, { ...colorOf(i), duration: 1.1, ease: "power1.inOut" }, 0);
    }
    tl.add(t, at);
  };

  const step = 1.5;
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${(n - 1) * window.innerHeight * 0.95}`,
      pin: stage,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const i = Math.min(n - 1, Math.round(self.progress * (n - 1)));
        ticks.forEach((t, k) => t.toggleAttribute("data-active", k === i));
        setHeaderTheme(root, themeOf(i));
      },
    },
  });

  for (let i = 1; i < n; i++) {
    const at = (i - 1) * step + 0.35;
    tl.to(frames[i - 1], { scale: 0.9, yPercent: -7, duration: 1.1, ease: "power1.inOut" }, at)
      .to(frames[i - 1], { autoAlpha: 0, duration: 0.45, ease: "power1.in" }, at + 0.75)
      .fromTo(frames[i], { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, at + 0.12)
      .fromTo(inners[i], { scale: 1.22 }, { scale: 1, duration: 1.3, ease: "power2.out" }, at + 0.12)
      .to(details[i - 1], { yPercent: -70, autoAlpha: 0, duration: 0.8, ease: "power1.in" }, at)
      .fromTo(details[i], { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power2.out" }, at + 0.4)
      .to(texts[i - 1], { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power2.in" }, at + 0.3)
      .fromTo(texts[i], { yPercent: 35, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, at + 0.62)
      .to(times[i - 1], { yPercent: -100, duration: 0.55, ease: "power2.inOut" }, at + 0.35)
      .fromTo(times[i], { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "power2.inOut" }, at + 0.35)
      .to(fill, { scaleX: i / (n - 1), duration: 1.1, ease: "power1.inOut" }, at);
    dayColor(i, at);
  }
  tl.to({}, { duration: 0.35 });

  return () => {
    unmark();
    root.removeAttribute("data-staged");
  };
};
