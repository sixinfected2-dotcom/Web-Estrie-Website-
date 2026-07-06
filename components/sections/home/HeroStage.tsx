"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";
import { useMediaQuery } from "@/components/motion/useMediaQuery";

type HeroStageProps = {
  /** L'eyebrow au-dessus du titre (rendu côté serveur). */
  intro: React.ReactNode;
  /** Le h1 — son encre pâlit à la sortie (opacité 1 → 0.4). */
  heading: React.ReactNode;
  /** Lead, actions et micro-copy sous le titre. */
  body: React.ReactNode;
  /** La colonne des cadres — navigateur + téléphone. */
  frames: React.ReactNode;
  /** La ligne de pied — Sherbrooke · Estrie. */
  footer: React.ReactNode;
};

/**
 * La scène du hero : structure inchangée, contenu rendu côté serveur
 * (l'image LCP garde son priority), mais l'épreuve « part à
 * l'impression » au défilement — colonne texte −40 px, cadres −80 px,
 * le h1 s'estompe vers 0.4. Transform/opacity uniquement, amplitudes
 * divisées par deux sous 768 px. Fallback statique si
 * prefers-reduced-motion.
 */
export function HeroStage({
  intro,
  heading,
  body,
  frames,
  footer,
}: HeroStageProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const factor = useMediaQuery("(max-width: 767px)") ? 0.5 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -40 * factor]);
  const yFrames = useTransform(scrollYProgress, [0, 1], [0, -80 * factor]);
  const inkFade = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  if (reduceMotion) {
    return (
      <section className="pt-[72px]">
        <Container className="flex min-h-[86svh] flex-col justify-center py-20 md:py-24">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              {intro}
              {heading}
              {body}
            </div>
            <div className="lg:col-span-6">{frames}</div>
          </div>
          {footer}
        </Container>
      </section>
    );
  }

  return (
    <section ref={ref} className="pt-[72px]">
      <Container className="flex min-h-[86svh] flex-col justify-center py-20 md:py-24">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <motion.div style={{ y: yText }} className="lg:col-span-6">
            {intro}
            <motion.div style={{ opacity: inkFade }}>{heading}</motion.div>
            {body}
          </motion.div>
          <motion.div style={{ y: yFrames }} className="lg:col-span-6">
            {frames}
          </motion.div>
        </div>
        {footer}
      </Container>
    </section>
  );
}
