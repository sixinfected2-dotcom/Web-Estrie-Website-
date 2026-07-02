import Link from "next/link";
import { Section } from "../ui/Section";
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

export function FinalCta({
  title,
  body,
  cta = "Démarrer un projet",
  instagram = false,
}: FinalCtaProps) {
  return (
    <Section rule={false} className="pt-4 md:pt-4 lg:pt-4">
      <Reveal>
        <div className="rounded-3xl bg-ink px-8 py-16 text-center md:px-16 md:py-24">
          <h2 className="text-title mx-auto max-w-[24ch] text-paper">{title}</h2>
          {body ? (
            <p className="text-lead mx-auto mt-5 max-w-[44ch] text-paper/70">
              {body}
            </p>
          ) : null}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-7">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-wash"
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
                className="text-[15px] font-semibold text-paper underline decoration-paper/40 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-paper"
              >
                Nous écrire sur Instagram
              </a>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
