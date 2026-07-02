"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
