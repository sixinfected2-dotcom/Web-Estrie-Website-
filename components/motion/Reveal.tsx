"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

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
  const ready = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Pendant l'intro (accueil), l'entrée reste masquée : elle démarre
  // quand le gate bascule, avec son délai propre.
  const shown = ready && inView;

  return (
    <motion.div
      ref={ref}
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
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
