"use client";

import { createContext, useContext, useEffect, useState } from "react";

/*
 * Le gate de l'intro : les entrées du hero attendent la fin (ou le
 * skip) de la séquence d'ouverture avant de se déclencher.
 *
 * Valeur par défaut `true` — un composant rendu hors provider n'est
 * jamais bloqué.
 */
const IntroReadyContext = createContext(true);

/** `false` uniquement pendant que l'intro joue sur l'accueil. */
export function useIntroReady(): boolean {
  return useContext(IntroReadyContext);
}

export function IntroGateProvider({ children }: { children: React.ReactNode }) {
  // Initialiseur lazy : `true` en SSR, `false` seulement si l'intro est
  // en cours au premier rendu client. Rien dans le DOM ne dépend de
  // cette valeur — zéro mismatch d'hydratation.
  const [ready, setReady] = useState(() => {
    if (typeof document === "undefined") return true;
    return document.documentElement.dataset.intro !== "play";
  });

  useEffect(() => {
    if (ready) return;
    const done = () => setReady(true);
    window.addEventListener("we:intro:done", done);
    // Filet de sécurité : jamais plus de 3,4 s d'attente.
    const timeout = window.setTimeout(done, 3400);
    return () => {
      window.removeEventListener("we:intro:done", done);
      window.clearTimeout(timeout);
    };
  }, [ready]);

  return (
    <IntroReadyContext.Provider value={ready}>
      {children}
    </IntroReadyContext.Provider>
  );
}
