"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Marquee } from "../ui/Marquee";
import { useMediaQuery } from "./useMediaQuery";

/**
 * Le bandeau qui sent la vitesse : la vélocité du scroll module un
 * léger cisaillement (±1.2deg) et un décalage (±40 px) du bandeau.
 * Desktop pointeur seulement — mobile et reduced-motion rendent le
 * Marquee CSS nu, inchangé.
 */
export function VelocityMarquee() {
  const reduceMotion = useReducedMotion();
  const active = useMediaQuery("(hover: hover)");
  const ref = useRef<HTMLDivElement>(null);
  // Hors écran, on ne branche pas la vélocité : le bandeau reste droit
  // et le travail par frame est réservé au moment où il est visible.
  const inView = useInView(ref, { margin: "0px 0px" });

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 100, damping: 30 });
  const skewX = useTransform(smooth, [-1500, 1500], [-1.2, 1.2], {
    clamp: true,
  });
  const x = useTransform(smooth, [-1500, 1500], [40, -40], { clamp: true });

  if (reduceMotion || !active) {
    return <Marquee />;
  }

  // Les filets restent droits sur le conteneur : seul le bandeau
  // intérieur (débordant de 56 px de chaque côté) se cisaille.
  return (
    <div ref={ref} className="overflow-hidden border-y border-hairline">
      <motion.div
        style={inView ? { skewX, x } : undefined}
        className="-mx-14 [&_.marquee]:border-y-0"
      >
        <Marquee />
      </motion.div>
    </div>
  );
}
