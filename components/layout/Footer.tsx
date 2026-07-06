import Link from "next/link";
import { navLinks, services, site } from "@/lib/data";
import { Container } from "../ui/Container";
import { Reveal } from "../motion/Reveal";

function MailIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Footer encre — il prolonge le CTA final sombre. Rangée d'invitation,
 * colonnes structurées par filets paper/12, puis la grande signature :
 * le wordmark en pleine page, comme on signe une épreuve avant l'envoi
 * à l'impression. La barre légale ferme le registre.
 */
export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink">
      <Container className="pb-10 pt-16 md:pb-12 md:pt-20">
        {/* ——— Rangée haute — l'invitation ——— */}
        <div className="flex flex-col justify-between gap-8 border-b border-paper/12 pb-12 md:flex-row md:items-center md:pb-14">
          <p className="max-w-[18ch] font-serif text-[clamp(28px,3.4vw,42px)] font-[430] leading-[1.08] tracking-[-0.018em] text-paper">
            Un projet?{" "}
            <em className="italic text-accent-bright">Parlons-en.</em>
          </p>
          <Link
            href="/contact"
            className="group inline-flex min-h-11 items-center gap-2.5 self-start rounded-full bg-paper px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-300 hover:bg-accent-bright hover:text-ink md:self-auto"
          >
            Démarrer un projet
            <span
              aria-hidden
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>

        {/* ——— Grille — tagline + trois colonnes de liens ——— */}
        <div className="grid gap-x-8 gap-y-12 pt-12 sm:grid-cols-2 md:pt-14 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5 lg:pr-10">
            <p className="max-w-sm font-serif text-[clamp(19px,1.8vw,22px)] font-[440] italic leading-[1.45] tracking-[-0.01em] text-paper/85">
              {site.tagline}
            </p>
            <p className="text-eyebrow mt-5 flex items-center gap-3 text-paper/55">
              <span
                aria-hidden
                className="inline-block h-2 w-2 bg-accent-bright"
              />
              {site.region}
            </p>
          </div>

          <nav aria-label="Navigation du pied de page" className="lg:col-span-2">
            <p className="text-eyebrow text-paper/55">Navigation</p>
            <ul className="mt-5 flex flex-col">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex min-h-10 items-center text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex min-h-10 items-center text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-2">
            <p className="text-eyebrow text-paper/55">Services</p>
            <ul className="mt-5 flex flex-col">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex min-h-10 items-center text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="text-eyebrow text-paper/55">Nous joindre</p>
            <ul className="mt-5 flex flex-col">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-10 items-center gap-2.5 text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                >
                  <MailIcon />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-2.5 text-[15px] font-medium text-paper transition-colors hover:text-accent-bright"
                >
                  <InstagramIcon />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ——— La grande signature — l'épreuve est signée ——— */}
        <div className="mt-16 border-t border-paper/12 pt-10 md:mt-20 md:pt-12">
          <Reveal y={30}>
            <p className="wonk-hover select-none whitespace-nowrap font-serif text-[clamp(3rem,11.5vw,10.25rem)] font-[420] leading-[0.92] tracking-[-0.032em] text-paper [--wonk-opsz:144] [font-variation-settings:'opsz'_144]">
              Web Estrie<span className="text-accent-bright">.</span>
            </p>
          </Reveal>
        </div>

        {/* ——— Barre légale ——— */}
        <div className="mt-10 flex flex-col gap-2 border-t border-paper/12 pt-7 text-[13.5px] text-paper/55 sm:flex-row sm:items-center sm:justify-between md:mt-12">
          <p>© {new Date().getFullYear()} Web Estrie. Tous droits réservés.</p>
          <p>{site.region}</p>
        </div>
      </Container>
    </footer>
  );
}
