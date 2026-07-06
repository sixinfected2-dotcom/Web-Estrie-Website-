import Link from "next/link";
import type { CaseStudy } from "@/content/realisations/data";

type CaseNavLinkProps = {
  study: CaseStudy;
  direction: "prev" | "next";
};

/**
 * La flèche qui se prolonge au survol — le fût s'étire (scaleX,
 * origin gauche), la pointe suit. CSS pur, motion-safe seulement.
 */
function ArrowGrow({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-[12px] w-[40px] shrink-0 overflow-visible text-accent ${
        flip ? "-scale-x-100" : ""
      }`}
    >
      <line
        x1="1"
        y1="6"
        x2="31"
        y2="6"
        className="origin-left [transform-box:fill-box] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-editorial motion-safe:group-hover:scale-x-[1.25]"
      />
      <path
        d="M26.5 1.5 31 6l-4.5 4.5"
        className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-editorial motion-safe:group-hover:translate-x-[7.5px]"
      />
    </svg>
  );
}

/**
 * Lien précédent/suivant d'une étude de cas : le nom du client en
 * Fraunces `text-title`, glissement de 8 px au survol, encrage WONK,
 * flèche qui se prolonge. Pensé pour la grille `sm:grid-cols-2` de la
 * navigation entre études.
 */
export function CaseNavLink({ study, direction }: CaseNavLinkProps) {
  const prev = direction === "prev";

  return (
    <Link
      href={`/realisations/${study.slug}`}
      className={`group flex min-h-[44px] flex-col gap-3 py-8 sm:py-10 ${
        prev
          ? "border-b border-hairline pr-6 sm:border-b-0"
          : "sm:items-end sm:border-l sm:border-hairline sm:pl-6 sm:text-right"
      }`}
    >
      <span className="text-eyebrow text-ink-soft">
        {prev ? "Projet précédent" : "Projet suivant"}
      </span>
      <span
        className={`text-title wonk-hover flex items-center gap-4 text-ink transition-[color,transform] duration-300 ease-editorial [--wonk-opsz:70] group-hover:text-accent-deep ${
          prev
            ? "motion-safe:group-hover:-translate-x-2"
            : "motion-safe:group-hover:translate-x-2"
        }`}
      >
        {prev ? (
          <>
            <ArrowGrow flip />
            {study.client}
          </>
        ) : (
          <>
            {study.client}
            <ArrowGrow />
          </>
        )}
      </span>
    </Link>
  );
}
