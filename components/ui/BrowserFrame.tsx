import Image from "next/image";

type BrowserFrameProps = {
  src: string;
  alt: string;
  /** Libellé affiché dans la barre d'adresse (ex. poddrop.ca). */
  url: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Ratio du visuel — 16/10 par défaut. */
  aspect?: string;
};

/**
 * Cadre navigateur éditorial : barre d'adresse sobre + capture réelle.
 * C'est le véhicule officiel du travail réel sur tout le site.
 */
export function BrowserFrame({
  src,
  alt,
  url,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className = "",
  aspect = "aspect-[16/10]",
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-hairline bg-paper-raised shadow-[0_30px_70px_-38px_rgba(36,26,18,0.4)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-hairline bg-paper px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        </span>
        <span className="mx-auto rounded-full bg-wash px-3.5 py-0.5 font-sans text-[11px] font-medium tracking-[0.06em] text-ink-soft">
          {url}
        </span>
        <span aria-hidden className="w-[46px]" />
      </div>
      <div className={`relative ${aspect} bg-wash`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-editorial group-hover:scale-[1.015]"
        />
      </div>
    </div>
  );
}
