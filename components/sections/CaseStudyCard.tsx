import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/content/realisations/data";

export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/realisations/${study.slug}`}
      className="group block"
      aria-label={`Étude de cas — ${study.client}`}
    >
      <div className="overflow-hidden rounded-2xl border border-hairline bg-wash">
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
          <h3 className="text-heading text-ink transition-colors group-hover:text-accent">
            {study.client}
          </h3>
          <p className="mt-1.5 text-[15px] text-ink-soft">{study.oneLiner}</p>
        </div>
        <span
          aria-hidden
          className="text-eyebrow shrink-0 text-ink-soft transition-transform duration-300 ease-editorial group-hover:translate-x-1"
        >
          {study.service.split("·")[0].trim()} →
        </span>
      </div>
    </Link>
  );
}
