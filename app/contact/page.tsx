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

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Démarrons votre projet."
        lead="Parlez-nous de ce que vous avez en tête. On vous répond vite, sans engagement."
      />

      <Container className="pb-24 md:pb-32">
        <div className="grid gap-14 border-t border-hairline pt-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <ContactForm />
            <p className="mt-6 max-w-[58ch] text-[13.5px] leading-relaxed text-ink-soft">
              Pas de vente sous pression. On regarde votre projet pis on vous
              revient avec un plan clair.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5">
            <aside className="rounded-2xl bg-wash p-8 lg:sticky lg:top-[96px]">
              <Eyebrow>Vous préférez Instagram?</Eyebrow>
              <p className="mt-4 text-[15.5px] leading-relaxed text-ink">
                Écrivez-nous directement — on répond aussi vite qu&rsquo;au
                formulaire.
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
              >
                Nous écrire sur Instagram
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                >
                  ↗
                </span>
              </a>

              <div className="mt-8 border-t border-hairline pt-6">
                <Eyebrow>Par courriel</Eyebrow>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 inline-block text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
