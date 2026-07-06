"use client";

import { useRef, type RefObject } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type UseScrollOptions,
} from "motion/react";
import { useIntroReady } from "../intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;

type RuleDrawProps = {
  /** Direction du filet. */
  axis?: "x" | "y";
  /** `inview` : trait tracé une fois ; `progress` : suit le scroll. */
  mode?: "inview" | "progress";
  /** Requis en mode `progress` : l'élément dont on suit la lecture. */
  targetRef?: RefObject<HTMLElement | null>;
  /** Fenêtre de progression (mode `progress` seulement). */
  offset?: [string, string];
  delay?: number;
  /**
   * Dimensions et couleur viennent d'ici. `inview` : classes de filet
   * (ex. `h-px w-full bg-hairline`) ; `progress` : taille + `text-*`
   * (ex. `h-full w-px text-accent`, le trait est en currentColor).
   */
  className?: string;
};

/**
 * La règle typographique — le filet qui se trace. Deux modes : entrée
 * one-shot (`inview`) ou tracé asservi à la progression de lecture
 * (`progress`). Fallback : filet plein statique.
 */
export function RuleDraw({
  axis = "x",
  mode = "inview",
  targetRef,
  offset = ["start 0.75", "end 0.55"],
  delay = 0,
  className,
}: RuleDrawProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    if (mode === "progress") {
      return (
        <div
          aria-hidden
          className={className}
          style={{ backgroundColor: "currentColor" }}
        />
      );
    }
    return <div aria-hidden className={className} />;
  }

  if (mode === "progress" && targetRef) {
    return (
      <RuleProgress
        axis={axis}
        targetRef={targetRef}
        offset={offset}
        className={className}
      />
    );
  }

  return <RuleInView axis={axis} delay={delay} className={className} />;
}

function RuleInView({
  axis,
  delay,
  className,
}: {
  axis: "x" | "y";
  delay: number;
  className?: string;
}) {
  const ready = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const shown = ready && inView;

  return (
    <motion.div
      aria-hidden
      ref={ref}
      className={className}
      style={{ transformOrigin: axis === "y" ? "top" : "left" }}
      initial={axis === "y" ? { scaleY: 0 } : { scaleX: 0 }}
      animate={
        axis === "y" ? { scaleY: shown ? 1 : 0 } : { scaleX: shown ? 1 : 0 }
      }
      transition={{ duration: 0.7, delay, ease: EASE }}
    />
  );
}

function RuleProgress({
  axis,
  targetRef,
  offset,
  className,
}: {
  axis: "x" | "y";
  targetRef: RefObject<HTMLElement | null>;
  offset: [string, string];
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: offset as unknown as UseScrollOptions["offset"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
  });
  const vertical = axis === "y";

  return (
    <svg
      aria-hidden
      className={`overflow-visible ${className ?? ""}`}
      viewBox={vertical ? "0 0 1 100" : "0 0 100 1"}
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.line
        x1={vertical ? 0.5 : 0}
        y1={vertical ? 0 : 0.5}
        x2={vertical ? 0.5 : 100}
        y2={vertical ? 100 : 0.5}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        style={{ pathLength }}
      />
    </svg>
  );
}
