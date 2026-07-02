import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { fraunces, hanken } from "@/lib/fonts";
import { site } from "@/lib/data";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

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
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LenisProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
