"use client";

import { useEffect, useRef, useState } from "react";

export type TocItem = { id: string; title: string };

/**
 * Table des matières de la politique. Desktop : colonne collante, la
 * section en cours de lecture s'allume (IntersectionObserver). Mobile :
 * un <details> natif sous l'en-tête. Sans JS, les ancres fonctionnent
 * telles quelles (défilement natif, avec son fallback reduced-motion).
 */
export function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string | null>(null);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const cibles = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0) return;

    // Bande de lecture : la section qui traverse le tiers haut du viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    cibles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const list = (
    <ol className="flex flex-col">
      {items.map((item, i) => {
        const courant = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={courant ? "location" : undefined}
              onClick={() => {
                if (details.current) details.current.open = false;
              }}
              className={`flex min-h-11 items-baseline gap-3.5 py-2.5 text-[15px] leading-snug transition-colors duration-300 hover:text-ink lg:min-h-10 lg:py-2 ${
                courant ? "font-semibold text-ink" : "text-ink-soft"
              }`}
            >
              <span
                aria-hidden
                className={`w-6 shrink-0 font-serif italic transition-colors duration-300 ${
                  courant ? "text-accent" : "text-ink-soft"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <nav aria-label="Sur cette page" className="hidden lg:sticky lg:top-[104px] lg:block">
        <p className="text-eyebrow text-ink-soft">Sur cette page</p>
        <div className="mt-4 border-t border-hairline pt-3">{list}</div>
      </nav>

      <nav aria-label="Sur cette page" className="lg:hidden">
        <details ref={details} className="group border-y border-hairline">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
            <span className="text-eyebrow text-ink-soft">Sur cette page</span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-ink-soft transition-transform duration-300 ease-editorial group-open:rotate-180"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </summary>
          <div className="pb-3">{list}</div>
        </details>
      </nav>
    </>
  );
}
