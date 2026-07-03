import Link from "next/link";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";
import { Magnetic } from "../motion/MagneticButton";
import { site } from "@/lib/data";

type FinalCtaProps = {
  title: React.ReactNode;
  body?: React.ReactNode;
  cta?: string;
  /** Affiche le lien Instagram en action secondaire. */
  instagram?: boolean;
};

/**
 * CTA final pleine largeur en encre, registre éditorial aligné à gauche.
 * En toile de fond, un seul mot serif fantôme — « Parlons-en. » — la
 * seule occurrence de cet effet sur tout le site. Le footer (bg-ink lui
 * aussi) le prolonge — la page se termine ancrée dans l'encre.
 */
export function FinalCta({
  title,
  body,
  cta = "Démarrer un projet",
  instagram = false,
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-paper/12 bg-ink">
      {/* Mot fantôme — décor typographique, invisible aux lecteurs d'écran. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.18em] right-0 z-0 select-none whitespace-nowrap font-serif text-[clamp(7rem,22vw,19rem)] font-[440] italic leading-none tracking-[-0.03em] text-paper/[0.05]"
      >
        Parlons-en.
      </span>
      <Container className="relative z-10 py-28 md:py-40">
        <Reveal>
          <p className="text-eyebrow text-accent-bright">Prochaine étape</p>
          <h2 className="text-display mt-6 max-w-[18ch] text-paper">{title}</h2>
          {body ? (
            <p className="text-lead mt-7 max-w-[48ch] text-paper/70">{body}</p>
          ) : null}
          <div className="mt-12 flex flex-wrap items-center gap-7">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-accent-bright"
              >
                {cta}
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </Magnetic>
            {instagram ? (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[15px] font-semibold text-paper underline decoration-accent-bright/60 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-accent-bright"
              >
                Nous écrire sur Instagram
              </a>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
