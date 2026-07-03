import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyRow } from "@/components/sections/CaseStudyRow";
import { caseStudies } from "@/content/realisations/data";

export const metadata: Metadata = {
  title: "Réalisations — Du vrai travail, pour de vraies entreprises",
  description:
    "Études de cas de Web Estrie : boutiques en ligne pis sites vitrines livrés pour de vraies entreprises de l'Estrie.",
  alternates: { canonical: "/realisations" },
};

export default function RealisationsPage() {
  // Types de projets réels, dérivés des études de cas existantes.
  const projectTypes = Array.from(
    new Set(caseStudies.flatMap((s) => s.service.split(" · "))),
  );

  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title="Nos réalisations"
        lead="Du vrai travail, livré pour de vraies entreprises."
      />

      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        {/* ——— Ligne meta : les types de projets réels ——— */}
        <Reveal y={0}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-hairline pt-6 md:pt-7">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
              {projectTypes.map((type, i) => (
                <span key={type} className="flex items-center gap-x-3">
                  {i > 0 ? (
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-accent"
                    />
                  ) : null}
                  <span className="text-eyebrow text-ink-soft">{type}</span>
                </span>
              ))}
            </p>
            <p className="text-eyebrow text-ink-soft/80">
              {String(caseStudies.length).padStart(2, "0")} études de cas
            </p>
          </div>
        </Reveal>

        {/* ——— Les rangées, séparées par des filets éditoriaux ——— */}
        <div className="mt-14 flex flex-col gap-16 md:mt-16 md:gap-24">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={0.05}>
              <div className="border-t border-hairline pt-8 md:pt-10">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 md:mb-10">
                  <p className="text-eyebrow text-accent-deep">
                    {study.service} · {study.sector}
                  </p>
                  <p className="text-eyebrow hidden text-ink-soft/80 sm:block">
                    {study.url.replace(/^https?:\/\//, "")}
                  </p>
                </div>
                <CaseStudyRow study={study} index={i} flip={i % 2 === 1} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Un projet similaire? Parlons-en."
        body="Racontez-nous où vous en êtes — on vous revient avec un plan clair."
      />
    </>
  );
}
