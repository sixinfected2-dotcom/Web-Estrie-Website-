"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type UseScrollOptions,
} from "motion/react";
import { useMediaQuery } from "./useMediaQuery";

type ParallaxLayerProps = {
  /** Course verticale en px, du début à la fin de la fenêtre. */
  range: [number, number];
  offset?: [string, string];
  /** Multiplicateur sous 768 px (0 = parallaxe coupée). */
  mobileFactor?: number;
  className?: string;
  children: React.ReactNode;
};

/**
 * Couche en parallaxe différentielle — transform uniquement, springée
 * pour rester feutrée. Fallback : passthrough statique.
 */
export function ParallaxLayer({
  range,
  offset = ["start end", "end start"],
  mobileFactor = 0.5,
  className,
  children,
}: ParallaxLayerProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const factor = useMediaQuery("(max-width: 767px)") ? mobileFactor : 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as unknown as UseScrollOptions["offset"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [range[0] * factor, range[1] * factor]
  );
  const smooth = useSpring(y, { stiffness: 65, damping: 22 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} className={className} style={{ y: smooth }}>
      {children}
    </motion.div>
  );
}
