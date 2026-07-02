"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai en secondes — pour staggerer des éléments voisins. */
  delay?: number;
  y?: number;
};

export function Reveal({ children, className, delay = 0, y = 20 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type RevealGroupProps = {
  children: React.ReactNode[];
  className?: string;
  itemClassName?: string;
  /** Écart entre chaque enfant, en secondes. */
  stagger?: number;
};

export function RevealGroup({
  children,
  className,
  itemClassName,
  stagger = 0.09,
}: RevealGroupProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
