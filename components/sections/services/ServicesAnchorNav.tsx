"use client";

import { useEffect, useState } from "react";

type AnchorItem = { slug: string; title: string };

/**
 * Nav-ancres du catalogue de services : un filet accent se trace sous
 * le chip de l'article en cours de lecture. Piloté par un
 * IntersectionObserver sur les trois articles — le défilement des
 * ancres reste natif (scroll-behavior: smooth de globals.css, avec son
 * fallback reduced-motion). Sans JS, les ancres fonctionnent telles
 * quelles.
 */
export function ServicesAnchorNav({ items }: { items: AnchorItem[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const cibles = items
      .map((item) => document.getElementById(item.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (cibles.length === 0) return;

    // Bande de lecture : l'article qui traverse le tiers haut du viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    cibles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Aller à un service"
      className="rounded-2xl bg-wash p-3 md:p-4"
    >
      <p className="text-eyebrow px-3 pb-2 pt-2 text-ink-soft">
        Trois services
      </p>
      <ul className="flex flex-col">
        {items.map((item, i) => {
          const courant = active === item.slug;
          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={courant ? "true" : undefined}
                className={`group relative flex min-h-[52px] items-center gap-4 overflow-hidden rounded-xl border bg-paper-raised px-4 py-3 transition-all duration-300 ease-editorial hover:border-accent/45 hover:bg-paper [&:not(:first-of-type)]:mt-2 ${
                  courant ? "border-accent/45" : "border-hairline"
                }`}
              >
                <span
                  aria-hidden
                  className="font-serif text-[17px] italic leading-none text-accent"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-[15px] font-semibold text-ink">
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className="text-[14px] text-ink-soft transition-all duration-300 ease-editorial group-hover:translate-y-0.5 group-hover:text-accent"
                >
                  ↓
                </span>
                {/* Le filet accent sous le chip actif — scaleX 0 → 1. */}
                <span
                  aria-hidden
                  className={`absolute bottom-0 left-4 right-4 h-[2px] origin-left rounded-full bg-accent motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-editorial ${
                    courant ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
