import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyCard } from "@/components/sections/CaseStudyCard";
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
        <div className="grid gap-12 md:grid-cols-2 md:gap-8">
          {caseStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.1}>
              <CaseStudyCard study={study} />
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
