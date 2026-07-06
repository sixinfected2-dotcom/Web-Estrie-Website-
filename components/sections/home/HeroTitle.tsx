"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIntroReady } from "@/components/intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type HeroTitleProps = {
  /** Une entrée par ligne visuelle — chaque ligne monte derrière son masque. */
  lines: React.ReactNode[];
  /** Délai en secondes avant la première ligne. */
  delay?: number;
  className?: string;
};

/**
 * Variante maison du TextReveal pour le h1 de l'accueil : le masque
 * descend plus bas (0.26em au lieu de 0.08em) pour laisser respirer le
 * souligné tracé à la main sous « envie » — sans ça, l'overflow-hidden
 * du masque rognerait le trait. La montée part de 140 % pour rester
 * couverte malgré la fenêtre élargie. Même tempo que TextReveal
 * (850 ms, stagger 110 ms), même gate d'intro, même ease.
 */
export function HeroTitle({ lines, delay = 0, className }: HeroTitleProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();

  if (reduceMotion) {
    return (
      <h1 className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.26em] block overflow-hidden pb-[0.26em]">
          <motion.span
            className="block"
            initial={{ y: "140%" }}
            animate={ready ? { y: 0 } : { y: "140%" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.11,
              ease: EASE,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
