"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

/*
 * « Belle Épreuve » — la séquence d'ouverture. L'épreuve se compose :
 * les mots montent derrière leur masque pendant que le type devient
 * display (bloom opsz), le point de plomb frappe la platine, la règle
 * se trace, puis l'épreuve se lève.
 *
 * Les phases visuelles sont des @keyframes CSS purs (globals.css,
 * préfixe `intro-`) : elles jouent dès le premier paint, avant
 * l'hydratation. Le JS ne fait que la synchro (événement
 * `we:intro:done`), le skip et le nettoyage. Le script inline du
 * <head> (app/layout.tsx) pose `data-intro` avant le premier paint —
 * jamais de flash pour qui a déjà vu l'intro.
 */

// Compte les montages pour distinguer un vrai démontage (navigation en
// pleine intro) du double montage de développement.
let mounts = 0;

export function IntroSignature() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);
  const veilRef = useRef<HTMLDivElement>(null);
  const dispatchedRef = useRef(false);
  const skippedRef = useRef(false);
  const skipRef = useRef<() => void>(() => {});
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    // Double verrou reduced-motion (le script du <head> et le CSS
    // masquent déjà le voile) — et sortie immédiate hors lecture.
    if (
      reduceMotion ||
      document.documentElement.dataset.intro !== "play"
    ) {
      const eject = window.setTimeout(() => setDone(true), 0);
      return () => window.clearTimeout(eject);
    }

    mounts += 1;
    const timeouts = timeoutsRef.current;

    const dispatchDone = () => {
      if (dispatchedRef.current) return;
      dispatchedRef.current = true;
      window.dispatchEvent(new CustomEvent("we:intro:done"));
    };

    const unlock = () => {
      if (document.documentElement.dataset.intro === "play") {
        delete document.documentElement.dataset.intro;
      }
    };

    const later = (fn: () => void, ms: number) => {
      timeouts.push(window.setTimeout(fn, Math.max(0, ms)));
    };

    // Les keyframes ont démarré au premier paint, pas au montage React :
    // on relit l'horloge de l'animation du voile pour rester synchrone.
    const lift = veilRef.current?.getAnimations()[0];
    const elapsed = typeof lift?.currentTime === "number" ? lift.currentTime : 0;

    later(dispatchDone, 1850 - elapsed); // les entrées du hero démarrent
    later(unlock, 2300 - elapsed); // scroll délocké
    later(() => setDone(true), 2350 - elapsed); // libère la layer

    const skip = () => {
      if (skippedRef.current) return;
      skippedRef.current = true;
      timeouts.forEach(window.clearTimeout);
      timeouts.length = 0;
      veilRef.current?.classList.add("intro-veil--skip");
      dispatchDone();
      timeouts.push(
        window.setTimeout(() => {
          unlock();
          setDone(true);
        }, 400)
      );
    };
    skipRef.current = skip;

    const onKey = (event: KeyboardEvent) => {
      if (
        ["Escape", " ", "PageDown", "ArrowDown", "ArrowUp"].includes(event.key)
      ) {
        skip();
      }
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchmove", skip, { passive: true });

    return () => {
      mounts -= 1;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      timeouts.forEach(window.clearTimeout);
      timeouts.length = 0;
      // Navigation en pleine intro : on rend l'écran et le scroll tout
      // de suite (différé pour ignorer le double montage de dev).
      window.setTimeout(() => {
        if (
          mounts === 0 &&
          document.documentElement.dataset.intro === "play"
        ) {
          delete document.documentElement.dataset.intro;
          dispatchDone();
        }
      }, 0);
    };
  }, [reduceMotion]);

  // L'intro n'existe que sur l'accueil, une fois par session.
  if (pathname !== "/" || done) {
    return null;
  }

  return (
    <div
      ref={veilRef}
      className="intro-veil pointer-events-none fixed inset-0 z-[80] bg-paper"
    >
      <div
        aria-hidden
        className="intro-lockup flex h-full flex-col items-center justify-center px-6"
      >
        <div className="flex flex-col items-center">
          <div className="intro-wordmark font-serif text-[clamp(3rem,10vw,8.5rem)] font-[400] leading-none text-ink">
            <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="intro-word intro-word--1 inline-block">Web</span>
            </span>{" "}
            <span className="-mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom">
              <span className="intro-word intro-word--2 inline-block">
                Estrie
              </span>
            </span>
            <span className="intro-dot ml-[0.07em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-accent" />
          </div>
          <div className="intro-rule mt-7 h-px self-stretch bg-hairline" />
          <p className="intro-eyebrow text-eyebrow mt-5 text-ink-soft">
            Sherbrooke · Estrie
          </p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Passer l'intro"
        onClick={() => skipRef.current()}
        className="intro-skip pointer-events-auto absolute bottom-6 right-6 inline-flex min-h-[44px] items-center font-sans text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
      >
        Passer l&rsquo;intro
      </button>
    </div>
  );
}
