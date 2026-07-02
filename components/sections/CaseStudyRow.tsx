import Link from "next/link";
import { BrowserFrame } from "../ui/BrowserFrame";
import type { CaseStudy } from "@/content/realisations/data";

type CaseStudyRowProps = {
  study: CaseStudy;
  index: number;
  /** Inverse la position du visuel (rangées alternées). */
  flip?: boolean;
};

/**
 * Rangée portfolio éditoriale : grande capture réelle dans un cadre
 * navigateur + méta typographique. Le travail d'abord.
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
        <BrowserFrame
          src={study.image}
          alt={study.imageAlt}
          url={domain}
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
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
        <span className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[5px] transition-colors group-hover:text-accent-deep">
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
