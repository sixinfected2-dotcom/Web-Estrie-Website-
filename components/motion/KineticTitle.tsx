"use client";

import { motion, useReducedMotion } from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type KineticTitleProps = {
  /** Une entrée par ligne visuelle — chaque ligne monte derrière son masque. */
  lines: React.ReactNode[];
  as?: "h1" | "h2";
  /** Délai en secondes avant la première ligne. */
  delay?: number;
  /** Bloom optique : l'axe opsz passe de 70 à 130 pendant la montée. */
  bloom?: boolean;
  className?: string;
};

/**
 * Le titre qui se compose : montée par ligne derrière masque, et, si
 * `bloom`, le type devient display sous les yeux (time-based, jamais
 * scrubbed). Fallback statique si prefers-reduced-motion.
 */
export function KineticTitle({
  lines,
  as = "h1",
  delay = 0,
  bloom = false,
  className,
}: KineticTitleProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  const MotionTag = as === "h2" ? motion.h2 : motion.h1;

  return (
    <MotionTag
      className={className}
      initial={bloom ? { fontVariationSettings: '"opsz" 70' } : false}
      animate={bloom && ready ? { fontVariationSettings: '"opsz" 130' } : undefined}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            data-reveal
            className="block"
            initial={{ y: "112%" }}
            animate={ready ? { y: 0 } : { y: "112%" }}
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
    </MotionTag>
  );
}
