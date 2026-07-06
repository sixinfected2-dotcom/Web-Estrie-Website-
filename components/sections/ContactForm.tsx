"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

const projectTypes = [
  "Site vitrine",
  "Boutique en ligne",
  "Refonte & audit",
  "Autre",
] as const;

const budgets = [
  "Moins de 2 000 $",
  "2 000 $ – 5 000 $",
  "5 000 $ – 10 000 $",
  "10 000 $ et plus",
  "Je ne sais pas encore",
] as const;

/* La lettre : champs sur filet. Au focus, le filet inférieur passe
   hairline → accent — un trait qui se trace (CSS pur, motion-safe). */
const fieldShell =
  "relative border-b border-hairline after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-accent after:content-[''] focus-within:after:scale-x-100 motion-safe:after:transition-transform motion-safe:after:duration-[250ms] motion-safe:after:ease-editorial";

/* Pas de suppression d'outline ici : l'anneau :focus-visible global
   (globals.css, accent 2px) reste l'indicateur clavier — WCAG 2.4.7.
   Le filet accent du fieldShell l'accompagne au focus-within. */
const inputClass =
  "w-full bg-transparent px-0 pb-3.5 pt-1 text-[16px] text-ink placeholder:text-ink-soft/50";

const labelClass =
  "mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.15em] text-ink-soft";

function ChevronIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="pointer-events-none absolute right-0 top-[9px] h-4 w-4 text-ink-soft"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          json.error ?? "L'envoi a échoué. Réessayez dans un instant.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "Impossible de joindre le serveur. Vérifiez votre connexion pis réessayez.",
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-y border-hairline py-12">
        <p className="font-serif text-[clamp(26px,3vw,34px)] font-[430] tracking-[-0.014em] text-ink">
          Message reçu<span className="text-accent">.</span>
        </p>
        <p className="mt-3 max-w-[44ch] text-[15.5px] leading-relaxed text-ink-soft">
          Merci! On regarde votre projet pis on vous revient vite avec un plan
          clair.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-9">
      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom
          </label>
          <div className={fieldShell}>
            <input
              id="nom"
              name="nom"
              type="text"
              required
              minLength={2}
              autoComplete="name"
              placeholder="Votre nom"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="courriel" className={labelClass}>
            Courriel
          </label>
          <div className={fieldShell}>
            <input
              id="courriel"
              name="courriel"
              type="email"
              required
              autoComplete="email"
              placeholder="vous@entreprise.ca"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
        <div>
          <label htmlFor="typeProjet" className={labelClass}>
            Type de projet
          </label>
          <div className={fieldShell}>
            <select
              id="typeProjet"
              name="typeProjet"
              required
              defaultValue="Site vitrine"
              className={`${inputClass} appearance-none pr-8`}
            >
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget approximatif{" "}
            <span className="font-normal normal-case tracking-normal text-ink-soft/80">
              (optionnel)
            </span>
          </label>
          <div className={fieldShell}>
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className={`${inputClass} appearance-none pr-8`}
            >
              <option value="">À discuter</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronIcon />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <div className={fieldShell}>
          <textarea
            id="message"
            name="message"
            required
            minLength={10}
            rows={6}
            placeholder="Parlez-nous de votre entreprise pis de ce que vous avez en tête."
            className={`${inputClass} resize-y pt-2`}
          />
        </div>
      </div>

      {/* Honeypot — invisible pour les humains, irrésistible pour les bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="entreprise">Entreprise</label>
        <input
          id="entreprise"
          name="entreprise"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="border-l-2 border-accent-deep bg-wash px-4 py-3 text-[14.5px] font-medium text-ink"
        >
          {errorMessage}
        </p>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 text-[15px] font-semibold text-paper transition-colors duration-300 hover:bg-accent-deep disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? "Envoi en cours…" : "Envoyer"}
          {status === "sending" ? null : (
            <span
              aria-hidden
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
            >
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
