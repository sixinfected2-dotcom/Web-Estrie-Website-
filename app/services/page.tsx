import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { services, complements, forfaits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Site vitrine, boutique en ligne, refonte",
  description:
    "Site vitrine, boutique en ligne, refonte et audit. Des services web sur mesure pour les entreprises de l'Estrie, avec un prix transparent.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Nos services"
        lead="Que vous partiez de zéro ou que vous refassiez un site dépassé, on a ce qu'il vous faut."
      />

      {/* ——— Les trois services ——— */}
      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="grid gap-8 border-t border-hairline py-14 md:grid-cols-12 md:gap-12 md:py-20"
              >
                <div className="md:col-span-5">
                  <span className="font-serif text-[30px] italic leading-none text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-title mt-3 text-ink">{service.title}</h2>
                  <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
                    {service.short}
                  </p>
                </div>
                <div className="flex flex-col gap-8 md:col-span-7 md:pt-2">
                  <div>
                    <h3 className="text-eyebrow text-ink-soft">Pour qui</h3>
                    <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-ink">
                      {service.forWho}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-eyebrow text-ink-soft">
                      Ce qui est inclus
                    </h3>
                    <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                      {service.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-baseline gap-3 text-[16px] leading-relaxed text-ink"
                        >
                          <span
                            aria-hidden
                            className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-eyebrow text-ink-soft">Le résultat</h3>
                    <p className="mt-3 max-w-[58ch] font-serif text-[19px] font-[440] italic leading-snug tracking-[-0.01em] text-ink">
                      {service.outcome}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ——— Inclus / complémentaires ——— */}
      <Section>
        <SectionHeader
          eyebrow="Aussi inclus"
          title="Ce qui vient renforcer votre site."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {complements.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.09}>
              <div className="h-full rounded-2xl bg-wash p-8">
                <h3 className="text-heading text-ink">{c.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ——— Forfaits ——— */}
      <Section>
        <SectionHeader
          eyebrow="Forfaits"
          title="Un prix clair, avant de commencer."
          lead="Pas de soumission mystère : des forfaits à portée définie, pis vous savez toujours à quoi vous attendre avant qu'on parte le projet."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {forfaits.map((forfait, i) => (
            <Reveal key={forfait.name} delay={i * 0.09} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-hairline bg-paper-raised p-8">
                <Eyebrow>{forfait.service}</Eyebrow>
                <h3 className="text-heading mt-4 text-ink">{forfait.name}</h3>
                <p className="mt-2 font-serif text-[24px] font-[440] tracking-[-0.01em] text-ink">
                  {forfait.priceFrom ? (
                    <>
                      À partir de{" "}
                      <span className="text-accent">{forfait.priceFrom}</span>
                    </>
                  ) : (
                    <span className="italic">Sur demande</span>
                  )}
                </p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-hairline pt-6">
                  {forfait.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-baseline gap-3 text-[15px] leading-relaxed text-ink"
                    >
                      <span
                        aria-hidden
                        className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8">
          <p className="max-w-[64ch] text-[14px] leading-relaxed text-ink-soft">
            Chaque projet est unique — le prix final dépend de la portée
            exacte. On vous donne un chiffre clair après une première
            conversation, sans engagement.
          </p>
        </Reveal>
      </Section>

      <FinalCta
        title="Un projet en tête?"
        body="Parlez-nous de ce que vous voulez bâtir. On vous revient avec un plan clair."
      />
    </>
  );
}
