"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type CharRiseProps = {
  text: string;
  /** Écart entre chaque caractère, en secondes. */
  stagger?: number;
  delay?: number;
  /** Bloom optique après la montée : opsz 60 → 144 en 700 ms. */
  bloom?: boolean;
  className?: string;
};

/**
 * Le mot qui se compose caractère par caractère, chacun derrière son
 * masque. Le parent porte l'aria-label — les caractères sont masqués
 * aux lecteurs d'écran. Fallback statique si prefers-reduced-motion.
 */
export function CharRise({
  text,
  stagger = 0.03,
  delay = 0,
  bloom = false,
  className,
}: CharRiseProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  const chars = Array.from(text);
  const started = ready && inView;
  // Fin de la montée du dernier caractère — le bloom prend le relais.
  const riseEnd = delay + (chars.length - 1) * stagger + 0.5;

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      initial={bloom ? { fontVariationSettings: '"opsz" 60' } : false}
      animate={bloom && started ? { fontVariationSettings: '"opsz" 144' } : undefined}
      transition={{ duration: 0.7, delay: riseEnd, ease: EASE }}
    >
      {/* Le mot réel pour les lecteurs d'écran ; les caractères animés
          restent décoratifs (aria-hidden). Un aria-label sur un span sans
          rôle est prohibé — ce span sr-only porte le sens à sa place. */}
      <span className="sr-only">{text}</span>
      {chars.map((char, i) => (
        <span
          key={i}
          aria-hidden
          className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom"
        >
          <motion.span
            data-reveal
            className="inline-block"
            initial={{ y: "112%" }}
            animate={started ? { y: 0 } : { y: "112%" }}
            transition={{
              duration: 0.5,
              delay: delay + i * stagger,
              ease: EASE,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
