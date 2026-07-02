const items = [
  "Sites vitrines",
  "Boutiques en ligne",
  "Refonte & audit",
  "SEO local",
  "Sherbrooke",
  "Magog",
  "Estrie",
];

/**
 * Bandeau éditorial lent — CSS pur, pause au survol,
 * statique sous prefers-reduced-motion (géré dans globals.css).
 */
export function Marquee() {
  const line = (
    <span className="marquee-chunk" aria-hidden>
      {items.map((item) => (
        <span key={item} className="inline-flex items-baseline">
          <span className="font-serif text-[clamp(20px,2.3vw,29px)] italic tracking-[-0.01em] text-ink/25">
            {item}
          </span>
          <span className="mx-6 inline-block h-[7px] w-[7px] translate-y-[-4px] rounded-full bg-accent/50 md:mx-8" />
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="marquee overflow-hidden border-y border-hairline py-5"
      role="presentation"
    >
      <span className="sr-only">
        Sites vitrines, boutiques en ligne, refonte et audit, SEO local —
        Sherbrooke, Magog, Estrie.
      </span>
      <div className="marquee-track flex w-max whitespace-nowrap">
        {line}
        {line}
      </div>
    </div>
  );
}
