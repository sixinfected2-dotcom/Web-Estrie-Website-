import Link from "next/link";
import { BrowserFrame } from "../ui/BrowserFrame";
import { PhoneFrame } from "../ui/PhoneFrame";
import type { CaseStudy } from "@/content/realisations/data";

type CaseStudyRowProps = {
  study: CaseStudy;
  index: number;
  /** Inverse la position du visuel (rangées alternées). */
  flip?: boolean;
};

/**
 * Rangée portfolio éditoriale v2 : le duo desktop + mobile en cadres
 * réels — capture navigateur en grand, capture téléphone en overlap
 * bas-gauche (même langage que le hero) — + méta typographique.
 * Le travail d'abord, sous toutes ses coutures.
 */
export function CaseStudyRow({ study, index, flip = false }: CaseStudyRowProps) {
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
          <BrowserFrame
            src={study.image}
            alt={study.imageAlt}
            url={domain}
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <PhoneFrame
            src={study.imageMobile}
            alt={`Version mobile — ${study.client}`}
            sizes="(min-width: 1024px) 13vw, 26vw"
            className="absolute -bottom-10 left-0 w-[26%] max-w-[164px] md:-bottom-12 md:-left-6"
          />
        </div>
      </div>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <span
          aria-hidden
          className="font-serif text-[26px] italic leading-none text-accent"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="text-eyebrow mt-4 text-accent-deep">{study.service}</p>
        <h3 className="mt-3 font-serif text-[clamp(28px,3.2vw,40px)] font-[430] leading-[1.06] tracking-[-0.018em] text-ink transition-colors duration-300 group-hover:text-accent">
          {study.client}
        </h3>
        <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
          {study.oneLiner}
        </p>
        <span className="mt-7 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors group-hover:text-accent-deep">
          Voir l&rsquo;étude de cas
          <span
            aria-hidden
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
