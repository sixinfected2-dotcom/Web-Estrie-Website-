"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * « Levée d'épreuve » — la transition de page. Le template remonte à
 * chaque navigation : on n'orchestre que l'entrée. Un voile paper se
 * lève (même gestuelle que la fin de l'intro) pendant que le contenu
 * monte en place ; le titre de la page de destination enchaîne.
 */

// Premier chargement (SSR) : aucun voile, aucun mouvement — le paint
// serveur reste intact. Ne bascule qu'après le premier montage client.
let firstMount = true;

function PageVeil({ onDone }: { onDone: () => void }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] bg-paper"
      initial={{ clipPath: "inset(0 0 0 0)" }}
      animate={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
      onAnimationComplete={onDone}
    />
  );
}

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  // Capturé au montage : `true` seulement au tout premier chargement.
  const [isFirst] = useState(firstMount);
  const [veil, setVeil] = useState(!isFirst);

  useEffect(() => {
    firstMount = false;
  }, []);

  // L'intro possède l'écran — pas de double rideau.
  const introPlaying =
    typeof document !== "undefined" &&
    document.documentElement.dataset.intro === "play";

  if (reduceMotion || isFirst || introPlaying) {
    return <>{children}</>;
  }

  return (
    <>
      {veil ? <PageVeil onDone={() => setVeil(false)} /> : null}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
