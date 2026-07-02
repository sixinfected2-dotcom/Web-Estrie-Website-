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
  return (
    <>
      <PageHeader
        eyebrow="Réalisations"
        title="Nos réalisations"
        lead="Du vrai travail, livré pour de vraies entreprises."
      />

      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        <div className="flex flex-col gap-20 border-t border-hairline pt-16 md:gap-28 md:pt-20">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.1}>
              <CaseStudyRow study={study} index={i} flip={i % 2 === 1} />
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
