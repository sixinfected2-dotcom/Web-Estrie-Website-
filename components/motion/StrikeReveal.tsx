"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type StrikeRevealProps = {
  children: React.ReactNode;
  delay?: number;
};

/**
 * La biffure du correcteur : un trait argile se trace sur le texte à
 * l'entrée dans le viewport. Le texte garde sa pleine couleur — le
 * trait porte seul la correction. Fallback : trait plein statique.
 */
export function StrikeReveal({ children, delay = 0 }: StrikeRevealProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  if (reduceMotion) {
    return (
      <span className="relative inline-block">
        {children}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-[calc(50%-1px)] h-[2px] bg-accent"
        />
      </span>
    );
  }

  const shown = ready && inView;

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-[calc(50%-1px)] h-[2px] bg-accent"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: shown ? 1 : 0 }}
        transition={{ duration: 0.45, delay, ease: EASE }}
      />
    </span>
  );
}
