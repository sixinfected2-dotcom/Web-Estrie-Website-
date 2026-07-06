"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { useIntroReady } from "@/components/intro/IntroGate";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAMP_SPRING = { type: "spring", stiffness: 260, damping: 20 } as const;

/* La cadence du correcteur : la croix i se dessine à 0,1 s + i × 0,14 s
   (350 ms), la biffure se trace juste après, et le panneau tamponne
   200 ms après la fin de la dernière biffure. */
const crossAt = (i: number) => 0.1 + i * 0.14;
const strikeAt = (i: number) => crossAt(i) + 0.3;
const stampAt = (n: number) => strikeAt(n - 1) + 0.45 + 0.2;

type ConstatVerdictProps = {
  /** Les constats à biffer — copy existant, texte jamais estompé (AA). */
  rows: string[];
  /** Le panneau argile qui tamponne la réponse (rendu côté serveur). */
  panel: React.ReactNode;
};

/**
 * Le verdict à l'épreuve : chaque constat reçoit sa croix dessinée au
 * trait (pathLength) puis sa biffure argile (scaleX origin-left, même
 * geste que StrikeReveal — décision AA : le trait porte seul la
 * correction, le texte garde sa pleine couleur). Une seule fenêtre
 * d'observation orchestre les trois rangées et le tampon final, pour
 * que la séquence reste un geste continu. Fallback reduced-motion :
 * croix et traits pleins, panneau statique.
 */
export function ConstatVerdict({ rows, panel }: ConstatVerdictProps) {
  const reduceMotion = useReducedMotion();
  const ready = useIntroReady();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  if (reduceMotion) {
    return (
      <div>
        <ul className="border-b border-ink/10">
          {rows.map((row) => (
            <li
              key={row}
              className="flex items-center gap-4 border-t border-ink/10 py-5 md:py-6"
            >
              <CrossDrawn shown delay={0} instant />
              <span className="relative inline-block">
                <span className="text-[16px] font-medium leading-snug text-ink-soft md:text-[17px]">
                  {row}
                </span>
                <span
                  aria-hidden
                  className="absolute left-0 right-0 top-[calc(50%-1px)] h-[2px] bg-accent"
                />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-7 md:mt-8">{panel}</div>
      </div>
    );
  }

  const shown = ready && inView;

  return (
    <div ref={ref}>
      <ul className="border-b border-ink/10">
        {rows.map((row, i) => (
          <li
            key={row}
            className="flex items-center gap-4 border-t border-ink/10 py-5 md:py-6"
          >
            <CrossDrawn shown={shown} delay={crossAt(i)} />
            <span className="relative inline-block">
              <span className="text-[16px] font-medium leading-snug text-ink-soft md:text-[17px]">
                {row}
              </span>
              {/* La biffure — trait argile 2 px, origin-left. */}
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 top-[calc(50%-1px)] h-[2px] bg-accent"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: shown ? 1 : 0 }}
                transition={{ duration: 0.45, delay: strikeAt(i), ease: EASE }}
              />
            </span>
          </li>
        ))}
      </ul>
      {/* Le tampon — la réponse posée d'un geste ferme. */}
      <motion.div
        className="mt-7 md:mt-8"
        initial={{ scale: 0.94, opacity: 0 }}
        animate={shown ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0 }}
        transition={{ ...STAMP_SPRING, delay: stampAt(rows.length) }}
      >
        {panel}
      </motion.div>
    </div>
  );
}

/**
 * La croix du correcteur — les deux traits se dessinent (pathLength,
 * 350 ms au total) juste avant la biffure. Famille Lucide, stroke 1.5.
 */
function CrossDrawn({
  shown,
  delay,
  instant = false,
}: {
  shown: boolean;
  delay: number;
  instant?: boolean;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] shrink-0 text-accent"
    >
      {instant ? (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ) : (
        <>
          <motion.path
            d="M18 6 6 18"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={{ duration: 0.2, delay, ease: EASE }}
          />
          <motion.path
            d="m6 6 12 12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: shown ? 1 : 0 }}
            transition={{ duration: 0.2, delay: delay + 0.15, ease: EASE }}
          />
        </>
      )}
    </svg>
  );
}
