import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section, SectionHeader, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
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
          <nav
            aria-label="Aller à un service"
            className="rounded-2xl bg-wash p-3 md:p-4"
          >
            <p className="text-eyebrow px-3 pb-2 pt-2 text-ink-soft">
              Trois services
            </p>
            <ul className="flex flex-col">
              {services.map((service, i) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.slug}`}
                    className="group flex min-h-[52px] items-center gap-4 rounded-xl border border-hairline bg-paper-raised px-4 py-3 transition-all duration-300 ease-editorial hover:border-accent/45 hover:bg-paper [&:not(:first-of-type)]:mt-2"
                  >
                    <span
                      aria-hidden
                      className="font-serif text-[17px] italic leading-none text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-ink">
                      {service.title}
                    </span>
                    <span
                      aria-hidden
                      className="text-[14px] text-ink-soft transition-all duration-300 ease-editorial group-hover:translate-y-0.5 group-hover:text-accent"
                    >
                      ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        }
      />

      {/* ——— Les trois services ——— */}
      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        <div className="flex flex-col">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="grid gap-10 border-t border-hairline py-14 scroll-mt-24 md:grid-cols-12 md:gap-12 md:py-20"
              >
                <div className="md:col-span-5">
                  <span
                    aria-hidden
                    className="block font-serif text-[64px] font-[400] italic leading-[0.85] tracking-[-0.02em] text-accent/20 select-none md:text-[76px]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-title mt-5 text-ink">{service.title}</h2>
                  <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
                    {service.short}
                  </p>
                  <div className="mt-8 hidden md:block">
                    <Button href="/contact" variant="link">
                      Démarrer un projet
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col gap-9 md:col-span-7 md:pt-3">
                  <div>
                    <h3 className="text-eyebrow flex items-center gap-3 text-ink-soft">
                      <span
                        aria-hidden
                        className="inline-block h-2 w-2 bg-accent"
                      />
                      Pour qui
                    </h3>
                    <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-ink">
                      {service.forWho}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-eyebrow flex items-center gap-3 text-ink-soft">
                      <span
                        aria-hidden
                        className="inline-block h-2 w-2 bg-accent"
                      />
                      Ce qui est inclus
                    </h3>
                    <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-hairline pt-4 sm:grid-cols-2">
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
                  <div className="rounded-2xl bg-wash p-7 md:p-8">
                    <h3 className="text-eyebrow text-accent-deep">
                      Le résultat
                    </h3>
                    <p className="mt-3 max-w-[46ch] font-serif text-[20px] font-[440] italic leading-snug tracking-[-0.01em] text-ink md:text-[22px]">
                      {service.outcome}
                    </p>
                  </div>
                  <div className="md:hidden">
                    <Button href="/contact" variant="link">
                      Démarrer un projet
                    </Button>
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
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {forfaits.map((forfait, i) => (
            <Reveal key={forfait.name} delay={i * 0.09} className="h-full">
              <div
                className={`flex h-full flex-col rounded-2xl border bg-paper-raised p-8 ${
                  i === 1 ? "border-accent/45" : "border-hairline"
                }`}
              >
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
                <div className="mt-8 border-t border-hairline pt-6">
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
