"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "@/components/intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type SlideNumeralProps = {
  children: React.ReactNode;
  /** Délai en secondes — stagger par rangée. */
  delay?: number;
  className?: string;
};

/**
 * Le numéral qui se cale dans le composteur : entrée x −28 px → 0 avec
 * fondu (600 ms, une fois, en vue), gatée par l'intro. Décoratif —
 * masqué aux lecteurs d'écran. Fallback statique si
 * prefers-reduced-motion.
 */
export function SlideNumeral({
  children,
  delay = 0,
  className,
}: SlideNumeralProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (reduceMotion) {
    return (
      <span aria-hidden className={className}>
        {children}
      </span>
    );
  }

  const shown = ready && inView;

  return (
    <motion.span
      aria-hidden
      ref={ref}
      className={className}
      initial={{ x: -28, opacity: 0 }}
      animate={shown ? { x: 0, opacity: 1 } : { x: -28, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  );
}
