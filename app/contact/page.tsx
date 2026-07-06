import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/sections/ContactForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact — Démarrons votre projet",
  description:
    "Parlez-nous de votre projet web. On vous répond vite, sans engagement — pas de vente sous pression.",
  alternates: { canonical: "/contact" },
};

/**
 * La lettre — la page la plus proche de l'argent reste la plus calme.
 * Un formulaire sur filets, une colonne de coordonnées en registre.
 */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Démarrons votre projet."
        lead="Parlez-nous de ce que vous avez en tête. On vous répond vite, sans engagement."
      />

      <Container className="pb-28 md:pb-36">
        <div className="grid gap-16 border-t border-hairline pt-14 md:pt-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <ContactForm />
            <p className="mt-7 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-soft">
              Pas de vente sous pression. On regarde votre projet pis on vous
              revient avec un plan clair.
            </p>
          </Reveal>

          {/* La colonne de coordonnées — registre sur filets, sans carte. */}
          <Reveal delay={0.12} className="lg:col-span-5">
            <aside className="lg:sticky lg:top-[104px]">
              <p className="flex items-center gap-2.5 text-[14px] font-medium text-ink">
                <span
                  aria-hidden
                  className="dot-pulse inline-block h-[7px] w-[7px] rounded-full bg-accent"
                />
                On vous répond vite, sans engagement.
              </p>

              <div className="mt-9 border-t border-hairline pt-6">
                <Eyebrow>Par courriel</Eyebrow>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 inline-block font-serif text-[clamp(19px,2vw,23px)] font-[440] tracking-[-0.012em] text-ink transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>

              <div className="mt-9 border-t border-hairline pt-6">
                <Eyebrow>Vous préférez Instagram?</Eyebrow>
                <p className="mt-3 max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">
                  Écrivez-nous directement — on répond aussi vite qu&rsquo;au
                  formulaire.
                </p>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
                >
                  Nous écrire sur Instagram
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </div>

              <div className="mt-9 border-t border-hairline pt-6">
                <p className="text-eyebrow flex items-center gap-3 text-ink-soft">
                  <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
                  {site.region}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
