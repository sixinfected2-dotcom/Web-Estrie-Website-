import Link from "next/link";
import { navLinks, site } from "@/lib/data";
import { Container } from "../ui/Container";

/**
 * Footer encre — il prolonge le CTA final sombre (séparé par un filet
 * paper/12, les hairlines deviennent paper/12 sur fond encre).
 * Hero clair / footer sombre = arc complet de la page.
 */
export function Footer() {
  return (
    <footer className="border-t border-paper/12 bg-ink">
      <Container className="py-16 md:py-20">
        <div className="flex flex-col justify-between gap-12 md:flex-row md:items-start">
          <div className="max-w-sm">
            <p className="font-serif text-[24px] font-[480] tracking-[-0.01em] text-paper">
              Web Estrie<span className="text-accent-bright">.</span>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/55">
              {site.tagline}
            </p>
          </div>

          <div className="flex gap-16 md:gap-24">
            <nav aria-label="Navigation du pied de page">
              <p className="text-eyebrow text-paper/55">Navigation</p>
              <ul className="mt-5 flex flex-col gap-3">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/contact"
                    className="text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            <div>
              <p className="text-eyebrow text-paper/55">Nous joindre</p>
              <ul className="mt-5 flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                  >
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/12 pt-8 text-[13.5px] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Web Estrie. Tous droits réservés.
          </p>
          <p>{site.region}</p>
        </div>
      </Container>
    </footer>
  );
}
