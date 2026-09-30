import type { Metadata, Viewport } from "next";
import { Alegreya, Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { CONSENT_BOOT } from "@/lib/consent";
import { SITE } from "@/content/site";
import "./globals.css";

const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source-sans", display: "swap" });
const serif = Alegreya({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-alegreya", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.slogan}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: `${SITE.name} · ${SITE.slogan}`,
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#11284b",
};

// Antes da pintura: decide se haverá motion (esconde só o que a intro vai revelar).
// Failsafe: se o JS da página não rodar, tudo aparece em 5 s.
const motionBoot = `(function(){var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(r?'motion-reduce':'js-motion');setTimeout(function(){d.classList.add('motion-failsafe')},5000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_BOOT + motionBoot }} />
      </head>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <Header />
        <div className="page" data-page="">
          <main id="conteudo">{children}</main>
          <Footer />
        </div>
        <CookieConsent />
        <MotionRoot />
      </body>
    </html>
  );
}
