"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Dévoile un visuel derrière un masque clip-path à l'entrée dans le
 * viewport. Fallback statique si prefers-reduced-motion.
 */
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(6% 4% 12% 4% round 16px)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)", opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
