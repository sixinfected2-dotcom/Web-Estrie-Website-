"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type TextRevealProps = {
  /** Une entrée par ligne visuelle — chaque ligne monte derrière son masque. */
  lines: React.ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
};

/**
 * Le moment signature : les lignes du titre montent derrière un masque
 * à l'arrivée. Fallback statique si prefers-reduced-motion.
 */
export function TextReveal({
  lines,
  className,
  as: Tag = "h1",
  delay = 0,
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
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

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "112%" }}
            animate={{ y: 0 }}
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
    </Tag>
  );
}
