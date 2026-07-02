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

const inputClass =
  "w-full rounded-xl border border-hairline bg-paper-raised px-4 py-3.5 text-[15.5px] text-ink placeholder:text-ink-soft/60 transition-colors focus:border-accent focus:outline-none focus-visible:outline-none";

const labelClass = "mb-2 block text-[14px] font-semibold text-ink";

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
      <div
        role="status"
        className="rounded-2xl border border-hairline bg-paper-raised p-10 text-center"
      >
        <p className="font-serif text-[26px] font-[440] tracking-[-0.01em] text-ink">
          Message reçu<span className="text-accent">.</span>
        </p>
        <p className="mx-auto mt-3 max-w-[40ch] text-[15.5px] leading-relaxed text-ink-soft">
          Merci! On regarde votre projet pis on vous revient vite avec un plan
          clair.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom
          </label>
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
        <div>
          <label htmlFor="courriel" className={labelClass}>
            Courriel
          </label>
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="typeProjet" className={labelClass}>
            Type de projet
          </label>
          <select
            id="typeProjet"
            name="typeProjet"
            required
            defaultValue="Site vitrine"
            className={inputClass}
          >
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget approximatif{" "}
            <span className="font-normal text-ink-soft">(optionnel)</span>
          </label>
          <select
            id="budget"
            name="budget"
            defaultValue=""
            className={inputClass}
          >
            <option value="">À discuter</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          placeholder="Parlez-nous de votre entreprise pis de ce que vous avez en tête."
          className={`${inputClass} resize-y`}
        />
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
          className="rounded-xl bg-wash px-4 py-3 text-[14.5px] font-medium text-ink"
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
