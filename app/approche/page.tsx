import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

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
      />

      {/* ——— Bloc 2 — Le process ——— */}
      <Section>
        <SectionHeader eyebrow="Notre façon de faire" title="Comment on travaille." />
        <ol className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <li className="flex gap-5">
                <span
                  aria-hidden
                  className="font-serif text-[22px] italic leading-[1.3] text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-serif text-[21px] font-[460] tracking-[-0.01em] text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ——— Bloc 3 — Pourquoi local ——— */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-5">
            <SectionHeader
              eyebrow="Pourquoi local"
              title="Une agence d'ici, pour les entreprises d'ici."
            />
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-7 md:pt-12">
            <p className="text-lead max-w-[58ch] text-ink-soft">
              On connaît la réalité des PME de l&rsquo;Estrie. Pas
              d&rsquo;intermédiaire, pas de gros forfait corporatif&nbsp;:
              vous parlez directement à la personne qui bâtit votre site.
            </p>
            {/*
              [Décision en suspens — Felix] Slot prévu pour nom + photo.
              Fort signal de confiance pour du local. À activer quand Felix tranche.
            */}
            <blockquote className="mt-10 border-l-2 border-accent pl-6">
              <p className="font-serif text-[22px] font-[440] italic leading-snug tracking-[-0.01em] text-ink">
                Accès direct, soin personnel, zéro détour — c&rsquo;est ça,
                travailler avec une agence à échelle humaine.
              </p>
            </blockquote>
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
