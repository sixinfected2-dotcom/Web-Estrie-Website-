"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

// Un tracé à main levée — volontairement pas une droite.
const PATH = "M2 4.8 C 18 2.9 39 6.2 58 4.3 C 74 2.8 90 5.4 98 3.9";

type UnderlineDrawProps = {
  children: React.ReactNode;
  delay?: number;
};

/**
 * Souligné tracé à la main : un path SVG légèrement irrégulier qui se
 * dessine sous le mot (pathLength 0 → 1, trait argile 2 px).
 * Fallback : souligné plein statique.
 */
export function UnderlineDraw({ children, delay = 0 }: UnderlineDrawProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  if (reduceMotion) {
    return (
      <span className="relative inline-block">
        {children}
        <svg
          aria-hidden
          className="absolute -bottom-[0.16em] left-0 h-[0.18em] w-full text-accent"
          viewBox="0 0 100 8"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d={PATH}
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    );
  }

  const shown = ready && inView;

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <svg
        aria-hidden
        className="absolute -bottom-[0.16em] left-0 h-[0.18em] w-full text-accent"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
        fill="none"
      >
        <motion.path
          d={PATH}
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: shown ? 1 : 0 }}
          transition={{ duration: 0.6, delay, ease: EASE }}
        />
      </svg>
    </span>
  );
}
