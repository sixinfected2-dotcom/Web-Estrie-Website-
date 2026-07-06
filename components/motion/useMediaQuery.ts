"use client";

import { useCallback, useSyncExternalStore } from "react";

/*
 * Un seul MediaQueryList par requête, réutilisé par tous les îlots —
 * getSnapshot lit `mql.matches` sans réinstancier un MQL à chaque rendu.
 */
const cache = new Map<string, MediaQueryList>();

function getMql(query: string): MediaQueryList {
  let mql = cache.get(query);
  if (!mql) {
    mql = window.matchMedia(query);
    cache.set(query, mql);
  }
  return mql;
}

/**
 * Suit une media query sans mismatch d'hydratation — `false` en SSR,
 * valeur réelle dès le premier rendu client.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = getMql(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => getMql(query).matches,
    () => false
  );
}
