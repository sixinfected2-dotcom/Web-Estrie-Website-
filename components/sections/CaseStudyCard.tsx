import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/content/realisations/data";

type CaseStudyCardProps = {
  study: CaseStudy;
  /**
   * "clay" = version pour la section pleine argile (bg-accent) :
   * cadre papier translucide, textes papier. "paper" = fond clair.
   */
  tone?: "paper" | "clay";
};

export function CaseStudyCard({ study, tone = "paper" }: CaseStudyCardProps) {
  const clay = tone === "clay";

  return (
    <Link
      href={`/realisations/${study.slug}`}
      className="group block"
      aria-label={`Étude de cas — ${study.client}`}
    >
      <div
        className={`overflow-hidden rounded-2xl border ${
          clay ? "border-paper/25 bg-accent-deep" : "border-hairline bg-wash"
        }`}
      >
        <div className="relative aspect-[16/10]">
          <Image
            src={study.image}
            alt={study.imageAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-[1.02]"
          />
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3
            className={`text-heading transition-colors ${
              clay ? "text-paper" : "text-ink group-hover:text-accent"
            }`}
          >
            {study.client}
          </h3>
          <p
            className={`mt-1.5 text-[15px] ${
              clay ? "text-paper/70" : "text-ink-soft"
            }`}
          >
            {study.oneLiner}
          </p>
        </div>
        <span
          aria-hidden
          className={`text-eyebrow shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-1 ${
            clay ? "text-paper/70" : "text-ink-soft"
          }`}
        >
          {study.service.split("·")[0].trim()} →
        </span>
      </div>
    </Link>
  );
}
