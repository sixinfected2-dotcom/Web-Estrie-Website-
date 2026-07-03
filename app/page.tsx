import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { CaseStudyRow } from "@/components/sections/CaseStudyRow";
import { FinalCta } from "@/components/sections/FinalCta";
import { caseStudies } from "@/content/realisations/data";
import { services, complements } from "@/lib/data";

export const metadata: Metadata = {
  description:
    "Des sites web sur mesure pour les entreprises de l'Estrie. Pas de template générique — des sites propres, rapides, pensés pour convertir.",
};

/* ——— Icônes SVG inline — famille Lucide, stroke 1.5 ——— */

function CrossIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[18px] w-[18px] shrink-0 ${className}`}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[18px] w-[18px] shrink-0 ${className}`}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MapPinIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 ${className}`}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PenToolIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 shrink-0 ${className}`}
    >
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
      <path d="m2.3 2.3 7.286 7.286" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  );
}

/* ——— Données de composition (fragments fidèles du copy existant) ——— */

const problemRows = [
  "Un template recyclé qui ressemble à celui du voisin",
  "Lent, pis qui dort",
  "Difficile à trouver sur Google",
];

const complementIcons = [MapPinIcon, PenToolIcon];

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
                className="mt-6 font-serif text-[clamp(2.7rem,5.1vw,4.9rem)] font-[400] leading-[1.02] tracking-[-0.026em] text-ink [font-variation-settings:'opsz'_130]"
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
                <p className="mt-6 flex items-center gap-2.5 text-[13.5px] font-medium text-ink-soft">
                  <span
                    aria-hidden
                    className="inline-block h-[7px] w-[7px] rounded-full bg-accent"
                  />
                  On vous répond vite, sans engagement.
                </p>
              </Reveal>
            </div>

            {/* Le travail réel, dès la première seconde — duo desktop + mobile. */}
            <Reveal delay={0.35} y={26} className="lg:col-span-6">
              <div className="group relative mb-14 md:mb-16">
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
                <PhoneFrame
                  src="/images/realisations/ct-arbro-mobile.png"
                  alt="Site vitrine C&T Arbro sur mobile — réalisation Web Estrie"
                  sizes="(min-width: 1024px) 12vw, 28vw"
                  className="absolute -bottom-14 left-0 w-[28%] max-w-[172px] md:-left-8"
                />
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

      {/* ——— Bloc 2 — Le constat — respiration sable, verdict en filets ——— */}
      <Section tone="wash" rule={false} className="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <span
              aria-hidden
              className="block font-serif text-[clamp(56px,7vw,92px)] font-[400] italic leading-none text-accent/25"
            >
              01
            </span>
            <p className="text-eyebrow mt-8 text-accent-deep">Le problème</p>
            <h2 className="text-title mt-4 text-ink">
              Un beau site, c&rsquo;est bien. Un site qui{" "}
              <em className="italic text-accent">travaille</em>
              {" pour vous, c’est mieux."}
            </h2>
            <p className="text-lead mt-7 max-w-[58ch] text-ink-soft">
              Trop d&rsquo;entreprises locales se retrouvent avec un template
              recyclé, lent, qui ressemble à celui du voisin — pis qui dort.
              Chez Web Estrie, chaque site est bâti à la main, à partir de
              votre réalité&nbsp;: votre clientèle, votre région, vos
              objectifs. Le résultat, c&rsquo;est un site propre, rapide,
              facile à trouver sur Google, pis pensé pour transformer les
              visiteurs en appels pis en ventes.
            </p>
          </Reveal>

          {/* Le verdict, en rangées hairline — trois constats, une réponse. */}
          <div className="lg:col-span-6 lg:self-center lg:pl-6">
            <ul>
              {problemRows.map((row, i) => (
                <Reveal key={row} delay={0.1 + i * 0.09}>
                  <li className="flex items-center gap-4 border-t border-ink/10 py-5 md:py-6">
                    <CrossIcon className="text-accent" />
                    <p className="text-[16px] font-medium leading-snug text-ink-soft md:text-[17px]">
                      {row}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.1 + problemRows.length * 0.09}>
              <div className="flex items-center gap-4 border-y border-ink/10 py-5 md:py-6">
                <CheckIcon className="text-accent-deep" />
                <p className="font-serif text-[19px] font-[460] italic leading-snug tracking-[-0.01em] text-ink md:text-[21px]">
                  Bâti à la main, à partir de votre réalité.
                </p>
              </div>
            </Reveal>
          </div>
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
                href={`/services#${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-hairline bg-paper-raised p-8 transition-all duration-300 ease-editorial hover:-translate-y-1 hover:border-accent/45"
              >
                <span className="font-serif text-[30px] italic leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-heading mt-4 text-ink">{service.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {service.short}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-hairline pt-6">
                  {service.included
                    .filter((item) => !item.includes("["))
                    .slice(0, 3)
                    .map((item) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-3 text-[14px] leading-snug text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                </ul>
                <span className="mt-7 inline-flex min-h-6 items-center gap-2 text-[14px] font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors group-hover:text-accent-deep">
                  En savoir plus
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Bande « Aussi inclus » — les compléments, en tuiles sable. */}
        <div className="mt-12 md:mt-14">
          <Reveal>
            <p className="text-eyebrow text-ink-soft">Aussi inclus</p>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {complements.map((complement, i) => {
              const Icon = complementIcons[i] ?? MapPinIcon;
              return (
                <Reveal key={complement.title} delay={0.08 + i * 0.09}>
                  <div className="flex items-start gap-5 rounded-2xl bg-wash p-6 md:p-7">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-paper text-accent-deep">
                      <Icon />
                    </span>
                    <div>
                      <h3 className="font-serif text-[19px] font-[460] tracking-[-0.01em] text-ink">
                        {complement.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                        {complement.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
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
        <div className="mt-16 flex flex-col gap-24 md:mt-20 md:gap-28">
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

      {/* ——— Bloc 5 — Aperçu de l'approche — rail connecté + panneau sable ——— */}
      <Section>
        <SectionHeader
          eyebrow="Notre approche"
          title={
            <>
              Simple, direct, sans mauvaise{" "}
              <em className="italic text-accent-deep">surprise</em>.
            </>
          }
        />
        <div className="mt-14 grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Le fil de la méthode — rail hairline, nœuds argile. */}
          <ol className="lg:col-span-7">
            {approachPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <li className="relative ml-1 border-l border-hairline pb-11 pl-8 last:pb-0 md:pl-10">
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full bg-accent"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      aria-hidden
                      className="font-serif text-[22px] italic leading-none text-accent-deep"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-[22px] font-[460] tracking-[-0.01em] text-ink">
                      {point.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
                    {point.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* Le différenciateur — panneau sable, collant au défilement. */}
          <Reveal delay={0.15} className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="rounded-[26px] bg-wash p-8 md:p-10">
              <span
                aria-hidden
                className="block h-[3px] w-10 rounded-full bg-accent"
              />
              <p className="mt-7 font-serif text-[clamp(24px,2.1vw,28px)] font-[440] italic leading-[1.28] tracking-[-0.014em] text-ink">
                Vous parlez directement à la personne qui bâtit votre site.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                Pas d&rsquo;intermédiaire, pas de runaround.
              </p>
              <div className="mt-8">
                <Button href="/approche" variant="link">
                  En savoir plus sur nous
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
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
