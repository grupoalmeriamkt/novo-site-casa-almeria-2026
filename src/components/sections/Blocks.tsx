import Image from "next/image";
import { IfoodIcon } from "@/components/brand/IfoodIcon";
import { Choreography } from "@/components/motion/Choreography";
import { ArrowLink } from "@/components/ui/Links";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { SITE, UNITS, unitAddressLine } from "@/content/site";
import styles from "./Blocks.module.css";

/** Escolha da Casa antes do menu completo (destino: Get In). */
export function UnitMenuCards() {
  return (
    <Choreography name="section" className={styles.band} data-header-theme="light" aria-label="Menus por unidade">
      <ul className={styles.cards}>
        {UNITS.map((u) => (
          <li key={u.id} data-reveal="up">
            <TrackedLink href={u.menuUrl ?? "/unidades"} event={u.analytics.menu} className={styles.card}>
              <span className="label">Menu</span>
              <span className={styles.cardTitle}>{u.name}</span>
              <span className={styles.cardMeta}>{unitAddressLine(u)}</span>
              <span className={styles.cardCta}>{u.menuUrl ? "Abrir o menu" : "Menu em breve. Conheça a unidade"} →</span>
            </TrackedLink>
          </li>
        ))}
      </ul>
    </Choreography>
  );
}

export function UnitDetails() {
  return (
    <Choreography name="section" className={styles.band} data-header-theme="light" aria-label="Endereços e horários">
      <div className={styles.details}>
        {UNITS.map((u) => (
          <section key={u.id} id={u.id} className={styles.detail} data-reveal="up" aria-labelledby={`${u.id}-titulo`}>
            <h2 id={`${u.id}-titulo`} className={styles.detailTitle}>
              {u.name}
            </h2>
            <dl className={styles.dl}>
              <dt>Endereço</dt>
              <dd>
                <address>{unitAddressLine(u)}</address>
                {u.address.postalCode && <span>CEP {u.address.postalCode}</span>}
              </dd>
              <dt>Horário</dt>
              <dd>
                {u.hours.map((h) => (
                  <span key={h.label}>{h.label}</span>
                ))}
              </dd>
            </dl>
            <ul className={styles.inline}>
              {u.menuUrl && (
                <li>
                  <ArrowLink href={u.menuUrl} event={u.analytics.menu}>
                    Menu
                  </ArrowLink>
                </li>
              )}
              <li>
                <ArrowLink href={u.mapsUrl} event={u.analytics.maps}>
                  Como chegar
                </ArrowLink>
              </li>
              {u.ifoodUrl && (
                <li>
                  <ArrowLink href={u.ifoodUrl} event="ifood_click" icon={<IfoodIcon />}>
                    Delivery no iFood
                  </ArrowLink>
                </li>
              )}
            </ul>
          </section>
        ))}
      </div>
    </Choreography>
  );
}

export function ContactList() {
  const mail = `mailto:${SITE.careersEmail}?subject=${encodeURIComponent("Currículo para a Casa Almeria")}`;
  return (
    <Choreography name="section" className={styles.band} data-header-theme="light" aria-label="Canais">
      <ul className={styles.contacts}>
        <li data-reveal="up">
          <span className="label">Atendimento, reservas e encomendas</span>
          <ArrowLink href={SITE.whatsapp.href} event="whatsapp_click" params={{ from: "contato" }}>
            WhatsApp {SITE.whatsapp.display}
          </ArrowLink>
        </li>
        <li data-reveal="up">
          <span className="label">Encomendas online</span>
          <ArrowLink href={SITE.vendas} event="order_click" params={{ from: "contato" }}>
            vendas.grupoalmeria.com.br
          </ArrowLink>
        </li>
        <li data-reveal="up">
          <span className="label">Instagram</span>
          <ArrowLink href={SITE.instagram.href}>{SITE.instagram.handle}</ArrowLink>
        </li>
        <li data-reveal="up">
          <span className="label">Trabalhe conosco</span>
          <ArrowLink href={mail}>{SITE.careersEmail}</ArrowLink>
        </li>
      </ul>
    </Choreography>
  );
}

const ARTS = [
  { src: "/illustrations/bike-cena.svg", alt: "Bicicleta rosa com pães na cesta", w: 874, h: 540 },
  { src: "/illustrations/vaso-cena.svg", alt: "Vaso com oliveira diante de uma escada", w: 471, h: 541 },
  { src: "/illustrations/merlot.png", alt: "Cachorro com uma taça de vinho", w: 963, h: 1400 },
  { src: "/illustrations/cachorro.svg", alt: "Cachorro comendo espaguete", w: 253, h: 331 },
  { src: "/illustrations/mergulho.svg", alt: "Mergulho numa xícara de café", w: 364, h: 381 },
  { src: "/illustrations/maos-pao.svg", alt: "Duas mãos passando um pão", w: 987, h: 246 },
];

/** As ilustrações da Casa como acervo (página Sobre). */
export function Illustrations() {
  return (
    <Choreography name="section" className={styles.band} data-header-theme="light" aria-labelledby="ilustracoes-titulo">
      <h2 id="ilustracoes-titulo" className={styles.bandTitle} data-split="words">
        As ilustrações <em>da Casa.</em>
      </h2>
      <ul className={styles.arts}>
        {ARTS.map((a) => (
          <li key={a.src} data-reveal="up">
            <figure>
              <Image src={a.src} alt={a.alt} width={a.w} height={a.h} sizes="(min-width: 1024px) 30vw, 90vw" unoptimized={a.src.endsWith(".svg")} />
              <figcaption>{a.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Choreography>
  );
}

export function Pillars() {
  const items = [
    { t: "Gastronomia", d: "Do pão de fermentação lenta ao prato do almoço, tudo feito com atenção ao detalhe." },
    { t: "Encontros", d: "Café com quem chega cedo, almoço com quem tem pressa, vinho com quem quer ficar." },
    { t: "Casa", d: "Um lugar para qualquer hora, que continua na sua casa pelas encomendas." },
  ];
  return (
    <Choreography name="section" className={styles.band} data-header-theme="light" aria-label="O que é a Casa">
      <ul className={styles.pillars}>
        {items.map((p) => (
          <li key={p.t} data-reveal="up">
            <h2 className={styles.pillarTitle}>{p.t}</h2>
            <p>{p.d}</p>
          </li>
        ))}
      </ul>
    </Choreography>
  );
}
