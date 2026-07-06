"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type WorkNumeralProps = {
  /** Le numéral affiché — « 01 », « 02 »… */
  value: string;
  /** Délai en secondes — stagger entre les rangées. */
  delay?: number;
  className?: string;
};

/**
 * Le numéral d'une rangée « Le travail » : il glisse de la marge à sa
 * place (x -16 px → 0) à l'entrée dans le viewport, une seule fois.
 * Décoratif — masqué aux lecteurs d'écran. Fallback statique si
 * prefers-reduced-motion.
 */
export function WorkNumeral({ value, delay = 0, className }: WorkNumeralProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span aria-hidden className={`inline-block ${className ?? ""}`}>
        {value}
      </span>
    );
  }

  return (
    <motion.span
      aria-hidden
      className={`inline-block ${className ?? ""}`}
      initial={{ x: -16, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {value}
    </motion.span>
  );
}
