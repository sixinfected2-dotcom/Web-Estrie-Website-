import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ServicesAnchorNav } from "@/components/sections/services/ServicesAnchorNav";
import { ServiceArticle } from "@/components/sections/services/ServiceArticle";
import { services, complements, forfaits } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Site vitrine, boutique en ligne, refonte",
  description:
    "Site vitrine, boutique en ligne, refonte et audit. Des services web sur mesure pour les entreprises de l'Estrie, avec un prix transparent.",
  alternates: { canonical: "/services" },
};

/* Icônes inline — famille Lucide, stroke 1.5, currentColor. */
const complementIcons: Record<string, React.ReactNode> = {
  "SEO local": (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  "Identité de marque": (
    <svg
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
      <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
      <path d="m2.3 2.3 7.286 7.286" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Nos services"
        lead="Que vous partiez de zéro ou que vous refassiez un site dépassé, on a ce qu'il vous faut."
        meta="Sherbrooke · Estrie — Sites sur mesure, SEO local"
        aside={
          <ServicesAnchorNav
            items={services.map(({ slug, title }) => ({ slug, title }))}
          />
        }
      />

      {/* ——— Les trois services — le catalogue de caractères ———
          Chaque article vit dans ServiceArticle : numéral en deux
          couches qui s'encre à la lecture, colonne gauche collante au
          desktop, titre en hover WONK. Les ancres #slug restent
          intactes (l'accueil pointe dessus). */}
      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <ServiceArticle service={service} index={i} />
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
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 text-accent">
                  {complementIcons[c.title] ?? null}
                </span>
                <h3 className="text-heading mt-6 text-ink">{c.title}</h3>
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
        {/* Registre éditorial — un forfait par rangée, filets hairline.
            Le prix reste tel quel (« Sur demande » tant que non tranché). */}
        <div className="mt-14 border-b border-hairline">
          {forfaits.map((forfait, i) => (
            <Reveal key={forfait.name} delay={i * 0.06}>
              <article className="grid gap-x-10 gap-y-6 border-t border-hairline py-10 md:grid-cols-12 md:py-12">
                <div className="md:col-span-4">
                  <Eyebrow>{forfait.service}</Eyebrow>
                  <h3 className="mt-3 font-serif text-[clamp(26px,2.8vw,34px)] font-[430] tracking-[-0.015em] text-ink">
                    {forfait.name}
                  </h3>
                  <p className="mt-2 font-serif text-[19px] font-[440] tracking-[-0.01em] text-ink md:text-[20px]">
                    {forfait.priceFrom ? (
                      <>
                        À partir de{" "}
                        <span className="text-accent-deep">
                          {forfait.priceFrom}
                        </span>
                      </>
                    ) : (
                      <span className="italic text-accent-deep">
                        Sur demande
                      </span>
                    )}
                  </p>
                </div>
                <ul className="content-start gap-x-8 gap-y-2.5 sm:grid sm:grid-cols-2 md:col-span-5 md:pt-2">
                  {forfait.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-baseline gap-3 py-1 text-[15px] leading-relaxed text-ink sm:py-0"
                    >
                      <span
                        aria-hidden
                        className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="md:col-span-3 md:justify-self-end md:pt-2">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
                  >
                    Discutons-en
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
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
