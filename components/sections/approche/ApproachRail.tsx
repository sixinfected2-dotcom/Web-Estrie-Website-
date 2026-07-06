"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { RuleDraw } from "@/components/motion/RuleDraw";

const EASE = [0.22, 1, 0.36, 1] as const;
const NODE_SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;

type RailPoint = { title: string; body: string };

/** Seuils d'allumage resserrés dans [0.12, 0.9] — 0.12/0.38/0.64/0.9 pour n = 4. */
function seuil(i: number, n: number): number {
  return n > 1 ? 0.12 + (i / (n - 1)) * 0.78 : 0.12;
}

function etat(v: number, n: number): boolean[] {
  return Array.from({ length: n }, (_, i) => v >= seuil(i, n));
}

/**
 * Le fil de la méthode : un rail hairline en attente, un trait accent
 * qui se trace au rythme de la lecture (RuleDraw en mode progress), et
 * des nœuds argile qui « tamponnent » quand le trait les dépasse — les
 * numéraux italiques s'allument au passage. Même fenêtre de scroll que
 * le rail, trait et nœuds restent synchrones. Fallback reduced-motion :
 * rail et nœuds pleins, statiques.
 */
export function ApproachRail({ points }: { points: RailPoint[] }) {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const [lit, setLit] = useState<boolean[]>(() => points.map(() => false));

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setLit((prev) => {
      const next = etat(v, points.length);
      return next.some((on, i) => on !== prev[i]) ? next : prev;
    });
  });

  // Arrivée en cours de page (ancre, restauration de scroll) :
  // l'état initial reflète la position réelle, sans attendre un scroll.
  // Après la première frame, le temps que useScroll mesure sa cible.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const v = scrollYProgress.get();
      setLit((prev) => {
        const next = etat(v, points.length);
        return next.some((on, i) => on !== prev[i]) ? next : prev;
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress, points.length]);

  if (reduceMotion) {
    return (
      <div className="relative">
        <span
          aria-hidden
          className="absolute bottom-2 left-[5px] top-2 w-px bg-accent"
        />
        <ol className="flex flex-col">
          {points.map((point, i) => (
            <li
              key={point.title}
              className="relative pb-12 pl-8 last:pb-0 md:pl-10"
            >
              <span
                aria-hidden
                className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full bg-accent"
              />
              <span
                aria-hidden
                className="block w-fit font-serif text-[19px] italic leading-none text-accent-deep"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-[22px] font-[460] tracking-[-0.01em] text-ink md:text-[24px]">
                {point.title}
              </h3>
              <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
                {point.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Le chemin en attente… */}
      <span
        aria-hidden
        className="absolute bottom-2 left-[5px] top-2 w-px bg-hairline"
      />
      {/* …pis le trait qui se trace au rythme de la lecture. */}
      <RuleDraw
        axis="y"
        mode="progress"
        targetRef={listRef}
        className="absolute bottom-2 left-[5px] top-2 w-px text-accent"
      />
      <ol ref={listRef} className="flex flex-col">
        {points.map((point, i) => (
          <li
            key={point.title}
            className="relative pb-12 pl-8 last:pb-0 md:pl-10"
          >
            <motion.span
              aria-hidden
              className="absolute left-0 top-[5px] h-[11px] w-[11px] rounded-full bg-accent"
              initial={false}
              animate={{ scale: lit[i] ? 1 : 0 }}
              transition={NODE_SPRING}
            />
            <motion.span
              aria-hidden
              className="block w-fit font-serif text-[19px] italic leading-none text-accent-deep"
              initial={false}
              animate={{ opacity: lit[i] ? 1 : 0.5 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <h3 className="mt-3 font-serif text-[22px] font-[460] tracking-[-0.01em] text-ink md:text-[24px]">
              {point.title}
            </h3>
            <p className="mt-2.5 max-w-[46ch] text-[15.5px] leading-relaxed text-ink-soft">
              {point.body}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
