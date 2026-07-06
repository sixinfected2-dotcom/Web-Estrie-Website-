"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Le filet de lecture — la seule barre de progression du site
 * (article de blogue). Fixé sous la nav, tracé à l'argile, springé.
 * Fallback : masqué.
 */
export function ProgressHairline() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-[72px] z-40 h-[2px] bg-accent"
      style={{ scaleX, transformOrigin: "left" }}
    />
  );
}
