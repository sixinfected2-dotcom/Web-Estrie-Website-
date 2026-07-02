import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { CaseStudyRow } from "@/components/sections/CaseStudyRow";
import { FinalCta } from "@/components/sections/FinalCta";
import { caseStudies } from "@/content/realisations/data";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  description:
    "Des sites web sur mesure pour les entreprises de l'Estrie. Pas de template générique — des sites propres, rapides, pensés pour convertir.",
};

const approachPoints = [
  {
    title: "On écoute d'abord.",
    body: "On comprend votre business avant de dessiner quoi que ce soit.",
  },
  {
    title: "On bâtit sur mesure.",
    body: "Pas de template, pas de recyclage.",
  },
  {
    title: "On livre vite.",
    body: "Un échéancier clair, respecté.",
  },
  {
    title: "Vous parlez à la bonne personne.",
    body: "Pas d'intermédiaire, pas de runaround.",
  },
];

export default function Home() {
  return (
    <>
      {/* ——— Bloc 1 — Hero : le pitch à gauche, le travail réel à droite ——— */}
      <section className="pt-[72px]">
        <Container className="flex min-h-[86svh] flex-col justify-center py-20 md:py-24">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <Reveal y={0}>
                <Eyebrow>Agence web · Estrie</Eyebrow>
              </Reveal>
              <TextReveal
                as="h1"
                className="mt-6 max-w-[16ch] font-serif text-[clamp(2.55rem,4.9vw,4.4rem)] font-[400] leading-[1.03] tracking-[-0.024em] text-ink [font-variation-settings:'opsz'_120]"
                delay={0.1}
                lines={[
                  <Fragment key="l1">On bâtit des sites</Fragment>,
                  <Fragment key="l2">que vos clients ont</Fragment>,
                  <Fragment key="l3">
                    <em className="italic text-accent">envie</em>
                    {" d’utiliser."}
                  </Fragment>,
                ]}
              />
              <Reveal delay={0.5} y={14}>
                <p className="text-lead mt-7 max-w-[46ch] text-ink-soft">
                  Des sites web sur mesure pour les entreprises de
                  l&rsquo;Estrie. Pas de template générique — des sites
                  propres, rapides, pensés pour convertir.
                </p>
              </Reveal>
              <Reveal delay={0.62} y={14}>
                <div className="mt-9 flex flex-wrap items-center gap-7">
                  <Magnetic>
                    <Button href="/contact">Démarrer un projet</Button>
                  </Magnetic>
                  <Button href="/realisations" variant="link">
                    Voir nos réalisations
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Le travail réel, dès la première seconde. */}
            <Reveal delay={0.35} y={26} className="lg:col-span-6">
              <div className="group relative mb-12 md:mb-14">
                <div
                  aria-hidden
                  className="absolute -inset-5 -z-10 rounded-[30px] bg-wash md:-inset-8"
                />
                <BrowserFrame
                  src="/images/realisations/poddrop.png"
                  alt="Boutique en ligne PodDrop — réalisation Web Estrie"
                  url="poddrop.ca"
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
                <div className="absolute -bottom-12 left-0 w-[54%] max-w-[330px] md:-left-8">
                  <BrowserFrame
                    src="/images/realisations/ct-arbro.png"
                    alt="Site vitrine C&T Arbro — réalisation Web Estrie"
                    url="ctarbro.ca"
                    sizes="(min-width: 1024px) 24vw, 54vw"
                    aspect="aspect-[16/11]"
                  />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.8} y={10}>
            <p className="text-eyebrow mt-16 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              Sherbrooke · Estrie — Sites sur mesure, SEO local
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ——— Bandeau éditorial ——— */}
      <Marquee />

      {/* ——— Bloc 2 — Le constat — première rupture encre ——— */}
      <Section tone="ink" rule={false} className="py-24 md:py-32 lg:py-36">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <p className="text-eyebrow text-accent-bright">Le problème</p>
            <h2 className="text-title mt-4 text-paper">
              Un beau site, c&rsquo;est bien. Un site qui{" "}
              <em className="italic text-accent-bright">travaille</em>
              {" pour vous, c’est mieux."}
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7 md:pt-12">
            <p className="text-lead max-w-[58ch] text-paper/70">
              Trop d&rsquo;entreprises locales se retrouvent avec un template
              recyclé, lent, qui ressemble à celui du voisin — pis qui dort.
              Chez Web Estrie, chaque site est bâti à la main, à partir de
              votre réalité&nbsp;: votre clientèle, votre région, vos
              objectifs. Le résultat, c&rsquo;est un site propre, rapide,
              facile à trouver sur Google, pis pensé pour transformer les
              visiteurs en appels pis en ventes.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ——— Bloc 3 — Aperçu des services ——— */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Ce qu'on fait"
            title={
              <>
                Trois façons de vous{" "}
                <em className="italic text-accent">démarquer</em> en ligne.
              </>
            }
          />
          <Reveal delay={0.15} className="hidden md:block">
            <Button href="/services" variant="link">
              Voir tous les services
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.09} className="h-full">
              <Link
                href="/services"
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-paper-raised p-8 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-accent/45"
              >
                <span className="font-serif text-[30px] italic leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading mt-4 text-ink">{service.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  {service.short}
                </p>
                <span className="mt-6 text-[14px] font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors group-hover:text-accent-deep">
                  En savoir plus
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 md:hidden">
          <Button href="/services" variant="link">
            Voir tous les services
          </Button>
        </Reveal>
      </Section>

      {/* ——— Bloc 4 — Aperçu des réalisations — le travail en grand ——— */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Nos réalisations"
            title={
              <>
                Du vrai travail, pour de{" "}
                <em className="italic text-accent">vraies entreprises</em>.
              </>
            }
          />
          <Reveal delay={0.15} className="hidden md:block">
            <Button href="/realisations" variant="link">
              Voir les études de cas
            </Button>
          </Reveal>
        </div>
        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.08}>
              <CaseStudyRow study={study} index={i} flip={i % 2 === 1} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 md:hidden">
          <Button href="/realisations" variant="link">
            Voir les études de cas
          </Button>
        </Reveal>
      </Section>

      {/* ——— Bloc 5 — Aperçu de l'approche — décompression sable ——— */}
      <Section tone="wash" rule={false}>
        <SectionHeader
          eyebrow="Notre approche"
          title={
            <>
              Simple, direct, sans mauvaise{" "}
              <em className="italic text-accent-deep">surprise</em>.
            </>
          }
        />
        <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {approachPoints.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.08}>
              <div className="flex gap-5">
                <span className="font-serif text-[22px] italic leading-[1.3] text-accent-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-[21px] font-[460] tracking-[-0.01em] text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {point.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-14">
          <Button href="/approche" variant="link">
            En savoir plus sur nous
          </Button>
        </Reveal>
      </Section>

      {/*
        Bloc 6 — Témoignage : omis volontairement.
        Slot prévu pour un vrai quote client (idéalement C&T Arbro) — jamais de faux témoignage.
      */}

      {/* ——— Bloc 7 — CTA final ——— */}
      <FinalCta
        title={
          <>
            Prêt à donner à votre entreprise le site qu&rsquo;elle{" "}
            <em className="italic text-accent-bright">mérite</em>?
          </>
        }
        body="Parlez-nous de votre projet. On vous répond vite, sans engagement."
        instagram
      />
    </>
  );
}
