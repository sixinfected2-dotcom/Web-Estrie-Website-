"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll } from "motion/react";
import { Button } from "@/components/ui/Button";
import { useMediaQuery } from "@/components/motion/useMediaQuery";
import type { Service } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Un caractère du catalogue : le numéral géant est en deux couches —
 * accent/20 dessous, accent dessus — et « s'encre » à mesure qu'on lit
 * l'article (opacité asservie à la progression de lecture, transform/
 * opacity seulement). Au desktop, la colonne de gauche est collante :
 * le numéral accompagne la lecture. Mobile : colonne dans le flux,
 * encrage inView simple. Fallback statique si prefers-reduced-motion.
 */
export function ServiceArticle({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // L'encrage suit la lecture : 0 quand l'article croise la ligne des
  // 60 % du viewport, 1 quand il l'a traversée.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.6"],
  });

  const numeral = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={ref}
      id={service.slug}
      className="grid gap-10 border-t border-hairline py-14 scroll-mt-24 md:grid-cols-12 md:gap-12 md:py-20"
    >
      <div className="md:col-span-5">
        <div className="md:sticky md:top-24">
          <span
            aria-hidden
            className="relative block w-fit select-none font-serif text-[64px] font-[400] italic leading-[0.85] tracking-[-0.02em] md:text-[76px]"
          >
            <span className="text-accent/20">{numeral}</span>
            {reduceMotion ? null : isDesktop ? (
              <motion.span
                className="absolute inset-0 text-accent"
                style={{ opacity: scrollYProgress }}
              >
                {numeral}
              </motion.span>
            ) : (
              <motion.span
                className="absolute inset-0 text-accent"
                initial={{ opacity: 0 }}
                animate={{ opacity: inView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                {numeral}
              </motion.span>
            )}
          </span>
          <h2 className="text-title wonk-hover mt-5 text-ink [--wonk-opsz:70]">
            {service.title}
          </h2>
          <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-ink-soft">
            {service.short}
          </p>
          <div className="mt-8 hidden md:block">
            <Button href="/contact" variant="link">
              Démarrer un projet
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9 md:col-span-7 md:pt-3">
        <div>
          <h3 className="text-eyebrow flex items-center gap-3 text-ink-soft">
            <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
            Pour qui
          </h3>
          <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed text-ink">
            {service.forWho}
          </p>
        </div>
        <div>
          <h3 className="text-eyebrow flex items-center gap-3 text-ink-soft">
            <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
            Ce qui est inclus
          </h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 border-t border-hairline pt-4 sm:grid-cols-2">
            {service.included.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-3 text-[16px] leading-relaxed text-ink"
              >
                <span
                  aria-hidden
                  className="h-[5px] w-[5px] shrink-0 translate-y-[-2px] rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-wash p-7 md:p-8">
          <h3 className="text-eyebrow text-accent-deep">Le résultat</h3>
          <p className="mt-3 max-w-[46ch] font-serif text-[20px] font-[440] italic leading-snug tracking-[-0.01em] text-ink md:text-[22px]">
            {service.outcome}
          </p>
        </div>
        <div className="md:hidden">
          <Button href="/contact" variant="link">
            Démarrer un projet
          </Button>
        </div>
      </div>
    </article>
  );
}
