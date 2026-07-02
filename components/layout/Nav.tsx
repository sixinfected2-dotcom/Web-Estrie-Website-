"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";
import { Container } from "../ui/Container";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-hairline bg-paper/90 backdrop-blur-md"
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

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`text-[14.5px] font-medium transition-colors hover:text-ink ${
                      isActive(href)
                        ? "text-ink underline decoration-accent decoration-[1.5px] underline-offset-[6px]"
                        : "text-ink-soft"
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
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="flex h-10 w-10 items-center justify-center md:hidden"
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

      {/* Mobile panel */}
      <div
        id="menu-mobile"
        className={`md:hidden ${open ? "block" : "hidden"} h-[calc(100dvh-72px)] overflow-y-auto border-t border-hairline bg-paper`}
      >
        <Container className="flex h-full flex-col justify-between py-10">
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`text-title block py-2 ${
                    isActive(href) ? "text-ink italic" : "text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-10 inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-4 text-[15px] font-semibold text-paper"
          >
            Démarrer un projet <span aria-hidden>→</span>
          </Link>
        </Container>
      </div>
    </header>
  );
}
