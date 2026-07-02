# Web Estrie — webestrie.ca

Site de l'agence Web Estrie. Next.js (App Router) + TypeScript + Tailwind v4 + Motion + Lenis.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de production
```

## Direction visuelle (verrouillée — Phase 0)

- **Lane C — quasi-neutre** : papier `#FAF6F0`, encre `#211C16`, accent taupe `#4E4639` discret.
- **Typo** : Fraunces (titres) + Hanken Grotesk (texte), via `next/font`.
- Tokens dans [app/globals.css](app/globals.css) (`@theme` Tailwind v4).
- Le doc de Phase 0 est dans [docs/phase-0/direction-visuelle.html](docs/phase-0/direction-visuelle.html).

## Structure

- `app/` — pages (Accueil, Services, Réalisations, Approche, Contact, Blogue) + API contact + sitemap/robots/OG.
- `components/ui|layout|motion|sections/` — primitives et sections.
- `content/realisations/data.ts` — études de cas (données typées).
- `content/blogue/*.mdx` + `lib/blogue.ts` — articles (MDX + registre typé).
- `lib/data.ts` — config du site (courriel, Instagram, services, forfaits).

## Formulaire de contact

Route `app/api/contact/route.ts` : validation Zod, honeypot, rate-limit basique, envoi via Resend.
Copier `.env.example` → `.env.local` pis remplir `RESEND_API_KEY`. Sans clé, l'envoi est simulé en dev.

## À régler par Felix (placeholders prévus)

1. **Prix des forfaits** — `lib/data.ts` → `forfaits[].priceFrom` (affiche « Sur demande » tant que null).
2. **Lien Instagram exact** — `lib/data.ts` → `site.instagram`.
3. **Courriel de contact** — `lib/data.ts` → `site.email` + variables d'env.
4. **Nombre de pages du forfait vitrine** — `lib/data.ts` → « jusqu'à [X] pages ».
5. **Metrics des études de cas** — `content/realisations/data.ts` → `metrics` (le bloc s'affiche automatiquement).
6. **Témoignage client** (C&T Arbro idéalement) — slot commenté dans `app/page.tsx` (bloc 6).
7. **Nom + photo** sur /approche — slot commenté dans `app/approche/page.tsx`.
8. **Domaine** — acheter `webestrie.ca`, vérifier chez Resend pour l'envoi depuis le domaine.
