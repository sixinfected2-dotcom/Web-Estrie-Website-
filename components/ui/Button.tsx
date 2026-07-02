import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "link";
  className?: string;
};

/**
 * Deux registres seulement : le CTA encré (pilule) et le lien souligné.
 * La retenue est volontaire — lane C, l'accent reste discret.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  if (variant === "link") {
    return (
      <Link
        href={href}
        className={`group inline-flex items-center gap-2 font-sans text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent ${className}`}
      >
        {children}
        <span
          aria-hidden
          className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
        >
          →
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-sans text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-accent-deep ${className}`}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
      >
        →
      </span>
    </Link>
  );
}
