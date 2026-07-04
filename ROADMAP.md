# Roadmap — Site Web Estrie

> Document vivant. Coche les cases au fur et à mesure. Toute session Claude Code qui travaille sur ce repo devrait lire ce fichier en premier — voir aussi [JOURNAL.md](./JOURNAL.md) pour l'historique détaillé des décisions.

**Repo :** `sixinfected2-dotcom/Web-Estrie-Website-` (public) · **Prod :** https://web-estrie-website.vercel.app · **Stack :** Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion + Lenis

---

## État général

🟢 **Le site est live en production sur Vercel, branché sur GitHub (push → deploy auto).** Direction visuelle verrouillée : **Argile assumée** (terre cuite `#A6512E`, papier chaud, Fraunces + Hanken Grotesk). Design élevé une première fois suite au feedback de Felix (« manque de punch, trop blanc »).

**Ce qui bloque le lancement public officiel :** l'achat du domaine `webestrie.ca` + les décisions de contenu en suspens (§ Décisions en attente ci-dessous).

---

## Phases du plan de match — statut

| Phase | Contenu | Statut |
|---|---|---|
| 0 | Direction visuelle | ✅ Fait (2 passes — voir Journal) |
| 1 | Fondation Next.js (scaffold, tokens, layout) | ✅ Fait |
| 2 | Pages Accueil / Services / Approche | ✅ Fait + élevées |
| 3 | Réalisations + Blogue (contenu structuré) | ✅ Fait + élevées |
| 4 | Contact (formulaire Resend/Zod/honeypot) | ✅ Fait — ⚠️ clé Resend manquante (voir Décisions) |
| 5 | Passe motion (reveals, marquee, magnétique) | ✅ Fait |
| 6 | SEO technique (metadata, JSON-LD, sitemap, OG) | ✅ Fait |
| 7 | QA (build/lint/responsive/formulaire) | 🟡 Fait pour v1 — **à refaire après l'élévation design** (Lighthouse, a11y approfondie, cross-browser) |
| 8 | Déploiement (GitHub + Vercel) | ✅ Fait — domaine custom pas encore branché |
| 9 | Post-launch (analytics, rank tracking, alertes) | ⬜ Pas commencé |

---

## Ce qui a été livré (résumé — détails dans JOURNAL.md)

- Site complet 8 routes : `/`, `/services`, `/realisations` + `/realisations/[slug]`, `/approche`, `/contact`, `/blogue` + `/blogue/[slug]`
- Formulaire de contact fonctionnel (Zod + Resend + honeypot + rate-limit), testé de bout en bout
- Deux vraies études de cas (PodDrop, C&T Arbro) avec captures desktop + mobile réelles
- Un article de blogue seed rédigé et publié (MDX)
- SEO technique complet : sitemap.xml, robots.txt, JSON-LD LocalBusiness, image OG dynamique
- Design élevé (v2) : hero portfolio avec cadres navigateur+téléphone, section "problème" sur fond clair, cartes services enrichies, rangées réalisations en duo desktop/mobile, timeline approche, CTA avec effet fantôme, footer refait
- Déployé sur Vercel, connecté à GitHub (`sixinfected2-dotcom/Web-Estrie-Website-`), déploiement de prod confirmé `READY`

---

## Décisions en attente (Felix)

Rien ne bloque techniquement — tout a des placeholders propres — mais il faut trancher :

1. **Prix des forfaits** — `lib/data.ts` → `forfaits[].priceFrom` (affiche « Sur demande » tant que `null`)
2. **Lien Instagram exact** — `lib/data.ts` → `site.instagram`
3. **Courriel de contact définitif** — `lib/data.ts` → `site.email`
4. **Nombre de pages du forfait vitrine** — `lib/data.ts` → « jusqu'à [X] pages »
5. **Metrics des études de cas** (trafic, appels, ventes) — `content/realisations/data.ts` → `metrics` (le bloc s'affiche automatiquement dès que non-null)
6. **Témoignage client** (idéalement C&T Arbro) — slot commenté dans `app/page.tsx`, jamais de faux témoignage
7. **Nom + photo de Felix** sur `/approche` — slot commenté dans `app/approche/page.tsx`
8. **Domaine `webestrie.ca`** — à acheter puis connecter dans Vercel (Project Settings → Domains)
9. **Clé `RESEND_API_KEY`** — sans elle, le formulaire simule l'envoi en dev et échoue proprement en prod (voir `.env.example`). À ajouter dans les variables d'environnement Vercel.

---

## Prochaines étapes suggérées (ordre de priorité)

1. **Régler les 9 décisions ci-dessus** — surtout la clé Resend (sinon le formulaire de contact ne fonctionne pas réellement en prod) et le domaine
2. **Re-passer la QA complète post-élévation** : Lighthouse (cible 90+), accessibilité (contraste AA, navigation clavier), test cross-browser, responsive 375/768/1024/1440
3. **Nettoyer les branches/worktrees de travail** devenues obsolètes : `direction-nuit`, `elev-accueil`, `elev-services-approche`, `elev-realisations-blogue` (mergées dans `direction-argile` → `main`, elles peuvent être supprimées)
4. **Investiguer le repo git parasite** trouvé dans `/Users/gee0x8` (le home directory de Felix) qui pointe vers ce même remote GitHub — voir note dans JOURNAL.md, à clarifier avant d'y toucher
5. **Phase 9 post-launch** une fois le domaine actif : Vercel Analytics / GA4, rank tracking SEO, alertes performance

---

## Pièges connus pour les prochaines sessions

- **Le dossier du projet a bougé plusieurs fois** (`~/code-ref/web-estrie` → `~/Desktop/code-ref/web-estrie` → `~/Desktop/web-estrie`). Si les worktrees git cassent après un déplacement, utiliser `git worktree repair <chemins>` depuis le dépôt principal, ou corriger manuellement le fichier `.git` du worktree concerné (il contient un chemin absolu vers `.git/worktrees/<nom>` dans le dépôt principal).
- **Ne pas confondre** avec `~/code-ref/web-estrie-website` (un clone séparé, fait par Felix, resté à l'ancien commit `240f16e` — pas synchronisé, ne pas travailler dedans sans le re-fetch d'abord).
- Le repo GitHub `Web-Estrie-Website-` avait été initialisé par Felix via upload manuel de fichiers (3 commits « Add files via upload » / « first commit », historique sans rapport avec le travail réel). Un **force-push** a été fait (avec confirmation explicite de Felix) pour remplacer cet historique par le vrai historique de développement.
