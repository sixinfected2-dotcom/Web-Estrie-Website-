"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { BrowserFrame } from "../ui/BrowserFrame";
import { PhoneFrame } from "../ui/PhoneFrame";
import { useMediaQuery } from "../motion/useMediaQuery";
import type { CaseStudy } from "@/content/realisations/data";

type CaseStudyRowProps = {
  study: CaseStudy;
  index: number;
  /** Inverse la position du visuel (rangées alternées). */
  flip?: boolean;
};

/**
 * Rangée portfolio éditoriale v3 : le duo desktop + mobile en cadres
 * réels, mis en profondeur par une parallaxe différentielle — le
 * navigateur ±20 px, le téléphone ±44 px, et un numéral serif italique
 * fantôme qui dépasse du coin supérieur en parallaxe inverse (∓30 px).
 * Une seule cible de scroll par rangée pilote les trois couches,
 * springée pour rester feutrée ; amplitudes divisées par deux sous
 * 768 px. Fallback statique si prefers-reduced-motion.
 */
export function CaseStudyRow({ study, index, flip = false }: CaseStudyRowProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const factor = useMediaQuery("(max-width: 767px)") ? 0.5 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 65, damping: 22 });
  const yBrowser = useTransform(smooth, [0, 1], [20 * factor, -20 * factor]);
  const yPhone = useTransform(smooth, [0, 1], [44 * factor, -44 * factor]);
  const yNumeral = useTransform(smooth, [0, 1], [-30 * factor, 30 * factor]);
  const numeralInk = useTransform(smooth, [0, 0.5, 1], [0.14, 0.25, 0.14]);

  const domain = study.url.replace(/^https?:\/\//, "");
  const numeral = String(index + 1).padStart(2, "0");

  /* Le numéral fantôme sort toujours du côté de la gouttière centrale —
     jamais vers le bord du viewport (zéro débordement horizontal). */
  const numeralSide = flip ? "-left-2 md:-left-4" : "-right-2 md:-right-4";

  const meta = (
    <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
      <span
        aria-hidden
        className="font-serif text-[26px] italic leading-none text-accent"
      >
        {numeral}
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
  );

  if (reduceMotion) {
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
            <span
              aria-hidden
              className={`pointer-events-none absolute -top-[0.38em] select-none font-serif text-[clamp(120px,14vw,200px)] font-[400] italic leading-none tracking-[-0.02em] text-accent opacity-[0.18] ${numeralSide}`}
            >
              {numeral}
            </span>
            <BrowserFrame
              src={study.image}
              alt={study.imageAlt}
              url={domain}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="relative z-10"
            />
            <div className="absolute -bottom-10 left-0 z-10 w-[26%] max-w-[164px] md:-bottom-12 md:-left-6">
              <PhoneFrame
                src={study.imageMobile}
                alt={`Version mobile — ${study.client}`}
                sizes="(min-width: 1024px) 13vw, 26vw"
              />
            </div>
          </div>
        </div>
        {meta}
      </Link>
    );
  }

  return (
    <Link
      ref={ref}
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
          {/* Le numéral fantôme — derrière les cadres, parallaxe inverse. */}
          <motion.span
            aria-hidden
            style={{ y: yNumeral, opacity: numeralInk }}
            className={`pointer-events-none absolute -top-[0.38em] select-none font-serif text-[clamp(120px,14vw,200px)] font-[400] italic leading-none tracking-[-0.02em] text-accent ${numeralSide}`}
          >
            {numeral}
          </motion.span>
          <motion.div style={{ y: yBrowser }}>
            <BrowserFrame
              src={study.image}
              alt={study.imageAlt}
              url={domain}
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
          </motion.div>
          <motion.div
            style={{ y: yPhone }}
            className="absolute -bottom-10 left-0 z-10 w-[26%] max-w-[164px] md:-bottom-12 md:-left-6"
          >
            <PhoneFrame
              src={study.imageMobile}
              alt={`Version mobile — ${study.client}`}
              sizes="(min-width: 1024px) 13vw, 26vw"
            />
          </motion.div>
        </div>
      </div>
      {meta}
    </Link>
  );
}
