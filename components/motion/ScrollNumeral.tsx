"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "./useMediaQuery";

type ScrollNumeralProps = {
  /** Le numéral affiché — « 01 », « 02 »… */
  value: string;
  /** Amplitude verticale en px (négatif = parallaxe inverse). */
  range?: number;
  className?: string;
};

/**
 * Numéral serif italique géant en parallaxe douce. Décoratif : masqué
 * aux lecteurs d'écran. Passer une couleur pleine (ex. `text-accent`) —
 * l'opacité est modulée ici (0.14 → 0.25 → 0.14). Amplitude divisée
 * par deux sous 768 px. Fallback statique si prefers-reduced-motion.
 */
export function ScrollNumeral({ value, range = 50, className }: ScrollNumeralProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const factor = useMediaQuery("(max-width: 767px)") ? 0.5 : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [range * factor, -range * factor]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.14, 0.25, 0.14]);

  if (reduceMotion) {
    return (
      <span
        aria-hidden
        className={`block font-serif italic leading-none ${className ?? ""}`}
        style={{ opacity: 0.2 }}
      >
        {value}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden
      ref={ref}
      className={`block font-serif italic leading-none ${className ?? ""}`}
      style={{ y, opacity }}
    >
      {value}
    </motion.span>
  );
}
