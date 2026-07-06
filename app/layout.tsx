import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { fraunces, hanken } from "@/lib/fonts";
import { site } from "@/lib/data";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { IntroGateProvider } from "@/components/intro/IntroGate";
import { IntroSignature } from "@/components/intro/IntroSignature";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

/*
 * Exécuté avant le premier paint : décide si l'intro joue (accueil,
 * première visite de la session, pas de reduced-motion). Le flag de
 * session est posé au démarrage — un refresh en pleine intro ne la
 * rejoue pas. Filet de sécurité à 3,2 s si l'hydratation meurt.
 */
const introScript = `(function(){try{
var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
var vue = sessionStorage.getItem("we-intro-vue");
if (reduce || vue || location.pathname !== "/") {
  document.documentElement.dataset.intro = "off";
} else {
  document.documentElement.dataset.intro = "play";
  sessionStorage.setItem("we-intro-vue", "1");
  setTimeout(function(){ var h = document.documentElement;
    if (h.dataset.intro === "play") h.dataset.intro = "off"; }, 3200);
}
}catch(e){ document.documentElement.dataset.intro = "off"; }})();`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Web Estrie — Sites web sur mesure pour les entreprises de l'Estrie",
    template: "%s — Web Estrie",
  },
  description:
    "Agence web en Estrie. Des sites sur mesure, propres, rapides, pensés pour convertir — pas de template générique.",
  openGraph: {
    type: "website",
    locale: "fr_CA",
    siteName: site.name,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "./",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  description:
    "Agence web qui bâtit des sites sur mesure pour les entreprises de l'Estrie : sites vitrines, boutiques en ligne, refontes et audits.",
  url: site.url,
  email: site.email,
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Estrie, Québec",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "QC",
    addressCountry: "CA",
  },
  sameAs: [site.instagram],
  knowsLanguage: "fr-CA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr-CA"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        {/* Sans JS, les entrées animées (opacity/translate posés en SSR
            par motion) resteraient masquées : on force leur état final
            pour garder tout le corps de texte lisible. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>[data-reveal]{opacity:1!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Avant tout le reste : le bouton « Passer l'intro » est le
            premier focusable pendant que l'intro joue. */}
        <IntroSignature />
        <LenisProvider>
          <IntroGateProvider>
            <Nav />
            <main className="flex-1">{children}</main>
            <Footer />
          </IntroGateProvider>
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
