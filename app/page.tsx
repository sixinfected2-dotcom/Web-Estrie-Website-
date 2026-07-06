import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/MagneticButton";
import { CharRise } from "@/components/motion/CharRise";
import { RuleDraw } from "@/components/motion/RuleDraw";
import { ScrollNumeral } from "@/components/motion/ScrollNumeral";
import { UnderlineDraw } from "@/components/motion/UnderlineDraw";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { CaseStudyRow } from "@/components/sections/CaseStudyRow";
import { FinalCta } from "@/components/sections/FinalCta";
import { ApproachRail } from "@/components/sections/approche/ApproachRail";
import { HeroStage } from "@/components/sections/home/HeroStage";
import { HeroTitle } from "@/components/sections/home/HeroTitle";
import { ConstatVerdict } from "@/components/sections/home/ConstatVerdict";
import { SlideNumeral } from "@/components/sections/home/SlideNumeral";
import { caseStudies } from "@/content/realisations/data";
import { services, complements } from "@/lib/data";

export const metadata: Metadata = {
  description:
    "Des sites web sur mesure pour les entreprises de l'Estrie. Pas de template générique — des sites propres, rapides, pensés pour convertir.",
};

/* ——— Icônes SVG inline — famille Lucide, stroke 1.5 ——— */

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

/* ——— Données de composition (fragments fidèles du copy existant) ——— */

const problemRows = [
  "Un template recyclé qui ressemble à celui du voisin",
  "Lent, pis qui dort",
  "Difficile à trouver sur Google",
];

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
      {/* ——— Bloc 1 — Hero : le pitch à gauche, le travail réel à droite.
          Les entrées attendent la fin de l'intro (gate interne des
          primitives) ; au défilement, l'épreuve part à l'impression. ——— */}
      <HeroStage
        intro={
          <Reveal y={0}>
            <Eyebrow>Agence web · Estrie</Eyebrow>
          </Reveal>
        }
        heading={
          <HeroTitle
            className="mt-6 font-serif text-[clamp(2.7rem,5.1vw,4.9rem)] font-[400] leading-[1.02] tracking-[-0.026em] text-ink [font-variation-settings:'opsz'_130]"
            delay={0.1}
            lines={[
              <Fragment key="l1">On bâtit des sites</Fragment>,
              <Fragment key="l2">que vos clients ont</Fragment>,
              <Fragment key="l3">
                <UnderlineDraw delay={1.2}>
                  <em className="italic text-accent">envie</em>
                </UnderlineDraw>
                {" d’utiliser."}
              </Fragment>,
            ]}
          />
        }
        body={
          <>
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
          </>
        }
        frames={
          /* Le travail réel, dès la première seconde — duo desktop + mobile.
             Non gaté : l'image LCP est peinte au premier rendu ; c'est la levée
             du voile d'intro qui la révèle, pas un fondu qui la retarde. */
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
        }
        footer={
          <Reveal delay={0.8} y={10}>
            <p className="text-eyebrow mt-16 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              Sherbrooke · Estrie — Sites sur mesure, SEO local
            </p>
          </Reveal>
        }
      />

      {/* ——— Bandeau éditorial — la vélocité du scroll le cisaille. ——— */}
      <VelocityMarquee />

      {/* ——— Bloc 2 — Le constat — respiration sable, le correcteur passe ——— */}
      <Section tone="wash" rule={false} className="py-24 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <ScrollNumeral
              value="01"
              className="text-[clamp(56px,7vw,92px)] font-[400] text-accent"
            />
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

          {/* Le verdict — trois constats biffés à l'épreuve, la réponse
              tamponnée en pleine argile. */}
          <div className="lg:col-span-6 lg:self-center lg:pl-6">
            <ConstatVerdict
              rows={problemRows}
              panel={
                <div className="flex items-start gap-4 rounded-[20px] bg-accent p-7 md:p-8">
                  <CheckIcon className="mt-[5px] text-paper" />
                  <p className="font-serif text-[clamp(20px,1.9vw,24px)] font-[440] italic leading-[1.35] tracking-[-0.012em] text-paper">
                    Bâti à la main, à partir de votre réalité.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </Section>

      {/* La règle — la ponctuation du retour au papier. */}
      <RuleDraw className="h-px w-full bg-hairline" />

      {/* ——— Bloc 3 — Aperçu des services ——— */}
      <Section rule={false}>
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
        {/* Le sommaire en registre — rangées pleine largeur, numéral serif
            géant qui se cale dans le composteur à l'entrée pis s'allume à
            l'argile au survol — le survol penche aussi le caractère (WONK).
            Même langage que les index de /services, zéro carte. */}
        <div className="mt-14 border-b border-hairline md:mt-16">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 0.07}>
              <Link
                href={`/services#${service.slug}`}
                className="group grid items-center gap-x-8 gap-y-4 border-t border-hairline py-9 md:grid-cols-12 md:py-12"
              >
                <SlideNumeral
                  delay={0.1 + i * 0.07}
                  className="font-serif text-[clamp(46px,5.4vw,76px)] font-[400] italic leading-[0.85] tracking-[-0.02em] text-accent/[0.18] transition-colors duration-500 ease-editorial group-hover:text-accent md:col-span-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </SlideNumeral>
                <div className="md:col-span-5 md:pr-6">
                  <h3 className="wonk-hover font-serif text-[clamp(24px,2.5vw,31px)] font-[440] tracking-[-0.014em] text-ink transition-colors duration-300 [--wonk-opsz:32] [font-variation-settings:'opsz'_32] group-hover:text-accent-deep">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                    {service.short}
                  </p>
                </div>
                <ul className="hidden md:col-span-4 md:block">
                  {service.included
                    .filter((item) => !item.includes("["))
                    .slice(0, 3)
                    .map((item, j) => (
                      <li
                        key={item}
                        className={`flex items-baseline gap-3 py-[7px] text-[13.5px] leading-snug text-ink-soft ${
                          j > 0 ? "border-t border-hairline/70" : ""
                        }`}
                      >
                        <span
                          aria-hidden
                          className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                        />
                        {item}
                      </li>
                    ))}
                </ul>
                <span
                  aria-hidden
                  className="hidden text-[24px] leading-none text-ink-soft/60 transition-all duration-300 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent md:col-span-1 md:block md:justify-self-end"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Les compléments — une ligne typographique, sans tuiles. */}
        <div className="mt-9 flex flex-col gap-x-14 gap-y-5 md:mt-10 lg:flex-row lg:items-baseline">
          <Reveal>
            <p className="text-eyebrow shrink-0 text-ink-soft">Aussi inclus</p>
          </Reveal>
          <div className="flex flex-col gap-x-14 gap-y-5 md:flex-row">
            {complements.map((complement, i) => (
              <Reveal key={complement.title} delay={0.08 + i * 0.08}>
                <p className="max-w-[44ch] text-[14.5px] leading-relaxed text-ink-soft">
                  <span className="font-serif text-[17px] font-[460] italic tracking-[-0.01em] text-ink">
                    {complement.title}
                  </span>
                  <span
                    aria-hidden
                    className="mx-3 inline-block h-[5px] w-[5px] translate-y-[-2px] rounded-full bg-accent"
                  />
                  {complement.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-10 md:hidden">
          <Button href="/services" variant="link">
            Voir tous les services
          </Button>
        </Reveal>
      </Section>

      {/* ——— Bloc 4 — Aperçu des réalisations — le travail en grand,
          mis en profondeur par la parallaxe différentielle ——— */}
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

      {/* ——— Bloc 5 — Aperçu de l'approche — le trait se trace au rythme
          de la lecture, les nœuds argile tamponnent au passage ——— */}
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
          {/* Le fil de la méthode — rail progressif partagé avec /approche. */}
          <div className="lg:col-span-7">
            <ApproachRail points={approachPoints} />
          </div>

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

      {/* ——— Bloc 7 — CTA final — le mot qui monte, puis fleurit ——— */}
      <FinalCta
        title={
          <>
            Prêt à donner à votre entreprise le site qu&rsquo;elle{" "}
            <CharRise text="mérite" bloom className="italic text-accent-bright" />?
          </>
        }
        body="Parlez-nous de votre projet. On vous répond vite, sans engagement."
        instagram
      />
    </>
  );
}
