import Link from "next/link";
import { BrowserFrame } from "../ui/BrowserFrame";
import { PhoneFrame } from "../ui/PhoneFrame";
import { ImageReveal } from "../motion/ImageReveal";
import { Reveal } from "../motion/Reveal";
import type { CaseStudy } from "@/content/realisations/data";

type CaseStudyCardProps = {
  study: CaseStudy;
  index: number;
  /** Inverse la position du visuel (rangées alternées). */
  flip?: boolean;
};

/**
 * Entrée du sommaire des réalisations : le duo navigateur + téléphone
 * dévoilé au masque, la fiche typographique à côté. Au survol, la
 * composition se soulève — le navigateur monte, le téléphone contrepèse
 * légèrement (profondeur sans 3D) — et le nom du client s'encre à
 * l'axe WONK. Tout le survol est en CSS pur, motion-safe seulement.
 */
export function CaseStudyCard({
  study,
  index,
  flip = false,
}: CaseStudyCardProps) {
  const domain = study.url.replace(/^https?:\/\//, "");

  return (
    <Link
      href={`/realisations/${study.slug}`}
      aria-label={`Étude de cas — ${study.client}`}
      className="group grid items-center gap-9 lg:grid-cols-12 lg:gap-14"
    >
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <div className="relative mb-10 md:mb-12">
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-[26px] bg-wash md:-inset-6"
          />
          {/* Le lift enveloppe le masque : l'ombre et la montée ne sont
              pas rognées par le clip-path du reveal. */}
          <div className="rounded-2xl motion-safe:transition-[transform,box-shadow] motion-safe:duration-[400ms] motion-safe:ease-editorial motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:shadow-[0_24px_48px_-24px_rgba(36,26,18,0.18)]">
            <ImageReveal>
              <BrowserFrame
                src={study.image}
                alt={study.imageAlt}
                url={domain}
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            </ImageReveal>
          </div>
          {/* Contre-lift : le PhoneFrame monte déjà de 8 px en interne
              au survol — +11 px ici donne un net de +3 px vers le bas,
              la composition respire au lieu de monter d'un bloc. */}
          <Reveal
            delay={0.25}
            className="absolute -bottom-10 left-0 w-[26%] max-w-[164px] md:-bottom-12 md:-left-6"
          >
            <div className="motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-editorial motion-safe:group-hover:translate-y-[11px]">
              <PhoneFrame
                src={study.imageMobile}
                alt={`Version mobile — ${study.client}`}
                sizes="(min-width: 1024px) 13vw, 26vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal
        delay={0.12}
        className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
      >
        <span
          aria-hidden
          className="font-serif text-[26px] italic leading-none text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-eyebrow mt-4 text-accent-deep">{study.service}</p>
        <h3 className="wonk-hover mt-3 font-serif text-[clamp(28px,3.2vw,40px)] font-[430] leading-[1.06] tracking-[-0.018em] text-ink transition-colors duration-300 [--wonk-opsz:60] [font-variation-settings:'opsz'_60] group-hover:text-accent-deep">
          {study.client}
        </h3>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
          {study.oneLiner}
        </p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors group-hover:text-accent-deep">
          Voir l&rsquo;étude de cas
          <span
            aria-hidden
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </Reveal>
    </Link>
  );
}
