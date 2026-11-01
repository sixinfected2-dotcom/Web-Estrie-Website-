import Link from "next/link";

/**
 * Primitives de lecture longue pour les pages légales : mêmes mesures et
 * même échelle que les articles du blogue (17 px / 1.75, 66ch).
 */

export function P({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-4 max-w-[66ch] text-[17px] leading-[1.75] text-ink-soft ${className}`}
    >
      {children}
    </p>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 font-serif text-[20px] font-[460] tracking-[-0.01em] text-ink">
      {children}
    </h3>
  );
}

export function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul className="mt-4 flex max-w-[66ch] list-disc flex-col gap-2 pl-5 text-[17px] leading-[1.75] text-ink-soft marker:text-accent">
      {children}
    </ul>
  );
}

const linkClass =
  "font-medium text-ink underline decoration-accent decoration-[1.5px] underline-offset-[4px] transition-colors hover:text-accent";

/** Lien interne (page ou ancre) ou externe (nouvel onglet, annoncé aux lecteurs d'écran). */
export function A({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={linkClass}>
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkClass} [overflow-wrap:anywhere]`}
    >
      {children}
      <span className="sr-only"> (s’ouvre dans un nouvel onglet)</span>
    </a>
  );
}

/** Nom technique (portée OAuth, identifiant) — lisible, sans prétendre à du code. */
export function Tech({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-md bg-wash px-1.5 py-0.5 font-mono text-[0.86em] text-ink [overflow-wrap:anywhere]">
      {children}
    </code>
  );
}
