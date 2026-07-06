"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { navLinks, site } from "@/lib/data";
import { Container } from "../ui/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Nav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Le menu se referme à chaque navigation (ajustement pendant le
  // rendu — couvre aussi back/forward, sans effet en cascade).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Échap referme le menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Scroll verrouillé pendant que le menu est ouvert.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Piège de focus : à l'ouverture, le focus entre dans le panneau et
  // Tab/Shift+Tab bouclent entre son premier et son dernier focusable ;
  // à la fermeture, il revient au bouton hamburger.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const trigger = triggerRef.current;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", onKey);
    return () => {
      panel.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-hairline bg-paper/90 shadow-[0_12px_32px_-28px_rgb(36_26_18/0.35)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <nav
          aria-label="Navigation principale"
          className="flex h-[72px] items-center justify-between"
        >
          <Link
            href="/"
            className="font-serif text-[22px] font-[480] tracking-[-0.01em] text-ink"
          >
            Web Estrie<span className="text-accent">.</span>
          </Link>

          {/* Desktop — le filet accent se trace sous le lien. */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`relative inline-block py-1.5 text-[14.5px] font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:bg-accent after:content-[''] motion-safe:after:transition-transform motion-safe:after:duration-300 motion-safe:after:ease-editorial ${
                      isActive(href)
                        ? "text-ink after:scale-x-100"
                        : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-paper transition-colors duration-300 hover:bg-accent-deep"
            >
              Démarrer un projet
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
            <span className="relative block h-3.5 w-5" aria-hidden>
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] h-[1.5px] w-full bg-ink transition-opacity duration-200 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-[1.5px] w-full bg-ink transition-transform duration-300 ease-editorial ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </Container>

      {/* ——— Panneau mobile — le sommaire se compose sous la barre :
          le voile descend par clip-path, chaque rangée monte derrière
          son masque, les filets se tracent. Reduced-motion : tout est
          posé d'un coup, sans geste. ——— */}
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            className="h-[calc(100dvh-72px)] overflow-y-auto overscroll-contain border-t border-hairline bg-paper md:hidden"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={
              reduceMotion
                ? { opacity: 0, transition: { duration: 0.01 } }
                : {
                    clipPath: "inset(0 0 100% 0)",
                    transition: { duration: 0.32, ease: EASE },
                  }
            }
            transition={
              reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }
            }
          >
            <Container className="flex min-h-full flex-col justify-between pb-10 pt-4">
              <ul className="border-b border-hairline">
                {navLinks.map(({ href, label }, i) => (
                  <li key={href} className="relative">
                    <motion.span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-px origin-left bg-hairline"
                      initial={reduceMotion ? false : { scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { duration: 0.55, delay: 0.08 + i * 0.055, ease: EASE }
                      }
                    />
                    <div className="overflow-hidden">
                      <motion.div
                        initial={reduceMotion ? false : { y: "112%" }}
                        animate={{ y: 0 }}
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.6, delay: 0.12 + i * 0.06, ease: EASE }
                        }
                      >
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(href) ? "page" : undefined}
                          className="flex items-baseline gap-5 py-4"
                        >
                          <span
                            aria-hidden
                            className="w-7 shrink-0 font-serif text-[15px] italic leading-none text-accent"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-serif text-[clamp(2rem,7.5vw,2.6rem)] font-[420] leading-[1.05] tracking-[-0.018em] ${
                              isActive(href) ? "italic text-accent" : "text-ink"
                            }`}
                          >
                            {label}
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.5, delay: 0.42, ease: EASE }
                }
                className="mt-12"
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-paper"
                >
                  Démarrer un projet <span aria-hidden>→</span>
                </Link>
                <p className="text-eyebrow mt-8 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft">
                  <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
                  {site.region}
                </p>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
