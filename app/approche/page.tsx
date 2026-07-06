import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CharRise } from "@/components/motion/CharRise";
import { ApproachRail } from "@/components/sections/approche/ApproachRail";

export const metadata: Metadata = {
  title: "Approche — Une agence d'ici, pour les entreprises d'ici",
  description:
    "Web Estrie bâtit des sites sur mesure pour les entreprises de l'Estrie. On écoute, on dessine sur mesure, on bâtit propre, pis on vous accompagne.",
  alternates: { canonical: "/approche" },
};

const processSteps = [
  {
    title: "On écoute.",
    body: "On prend le temps de comprendre votre entreprise, votre clientèle, vos objectifs.",
  },
  {
    title: "On dessine sur mesure.",
    body: "Chaque site part d'une page blanche, pas d'un gabarit.",
  },
  {
    title: "On bâtit propre.",
    body: "Un site rapide, solide, facile à trouver sur Google.",
  },
  {
    title: "On livre pis on vous accompagne.",
    body: "Un échéancier clair, pis quelqu'un à qui parler après le lancement.",
  },
];

export default function ApprochePage() {
  return (
    <>
      {/* ——— Bloc 1 — Le pourquoi ——— */}
      <PageHeader
        eyebrow="Approche"
        title="Web Estrie, c'est quoi."
        lead="Une agence web basée en Estrie, qui bâtit des sites sur mesure pour les entreprises d'ici. L'idée est simple : les entreprises locales méritent mieux qu'un template recyclé. Elles méritent un site propre, pensé pour elles, qui les fait bien paraître pis qui leur amène des clients."
        meta="Sherbrooke · Estrie — Sites sur mesure, SEO local"
      />

      {/* ——— Bloc 2 — Le process — le rail qui se trace à la lecture ——— */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <SectionHeader
                eyebrow="Notre façon de faire"
                title="Comment on travaille."
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <ApproachRail points={processSteps} />
          </div>
        </div>
      </Section>

      {/* ——— Bloc 3 — Pourquoi local ——— */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeader
              eyebrow="Pourquoi local"
              title="Une agence d'ici, pour les entreprises d'ici."
            />
            <p className="text-lead mt-7 max-w-[48ch] text-ink-soft">
              On connaît la réalité des PME de l&rsquo;Estrie. Pas
              d&rsquo;intermédiaire, pas de gros forfait corporatif&nbsp;:
              vous parlez directement à la personne qui bâtit votre site.
            </p>
            {/*
              [Décision en suspens — Felix] Slot prévu pour nom + photo.
              Fort signal de confiance pour du local. À activer quand Felix tranche.
            */}
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7">
            <figure className="relative h-full rounded-2xl bg-wash p-8 md:p-12 lg:p-14">
              <svg
                aria-hidden
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="34"
                viewBox="0 0 44 34"
                fill="currentColor"
                className="text-accent"
              >
                <path d="M0 34V21.4C0 15.5 1.3 10.9 4 7.5 6.7 4.1 10.8 1.6 16.3 0l2.9 5.6c-3.6 1.2-6.2 2.8-7.8 4.8-1.5 2-2.3 4.3-2.4 7H19V34H0Zm25 0V21.4c0-5.9 1.3-10.5 4-13.9C31.7 4.1 35.8 1.6 41.3 0l2.9 5.6c-3.6 1.2-6.2 2.8-7.8 4.8-1.5 2-2.3 4.3-2.4 7H44V34H25Z" />
              </svg>
              {/* Le pull-quote — le seul moment kinetic de la page :
                  « zéro détour » se compose caractère par caractère. */}
              <blockquote className="mt-8 md:mt-10">
                <p className="max-w-[22ch] font-serif text-[clamp(28px,3vw,40px)] font-[440] italic leading-[1.22] tracking-[-0.014em] text-ink">
                  Accès direct, soin personnel,{" "}
                  <CharRise text="zéro détour" className="text-accent-deep" />{" "}
                  — c&rsquo;est ça, travailler avec une agence à échelle
                  humaine.
                </p>
              </blockquote>
              <figcaption className="text-eyebrow mt-9 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft md:mt-11">
                <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
                Web Estrie — agence à échelle humaine
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <FinalCta
        title="On regarde votre projet ensemble?"
        body="Parlez-nous de ce que vous avez en tête. On vous répond vite, sans engagement."
      />
    </>
  );
}
