# Journal de développement — Site Web Estrie

> Historique chronologique des sessions et décisions. Complète [ROADMAP.md](./ROADMAP.md) (l'état actuel et ce qui reste). Écrit pour qu'une nouvelle session Claude Code comprenne rapidement le "pourquoi" derrière les choix, pas juste le "quoi".

---

## Session 1 — Build initial (2026-07-01/02)

**Contexte.** Felix (agence Web Estrie, Estrie/QC) a fourni un plan de match complet (`~/Downloads/plan-de-match-web-estrie.md`) : positionnement, copy final en français québécois, architecture technique, séquence de build par phase. Règles non négociables : jamais mentionner l'IA, jamais de faux témoignage/contenu inventé, un seul accent de couleur, `prefers-reduced-motion` partout.

**Phase 0 — Direction visuelle.** Trois lanes d'accent proposées (Argile chaude / Encre bleue / Quasi-neutre) + deux pairings typo. Felix a choisi **C — Quasi-neutre** (taupe `#4E4639` discret) + **Fraunces + Hanken Grotesk**.

**Phases 1 à 8 — Build complet.** Scaffold Next.js 16 App Router + TypeScript + Tailwind v4. Toutes les pages construites avec le copy final du plan de match (rien d'inventé) : Accueil, Services, Réalisations (+ 2 études de cas réelles PodDrop/C&T Arbro, screenshots capturés en direct sur les sites live), Approche, Contact (formulaire Zod + Resend + honeypot + rate-limit), Blogue (MDX + article seed). Motion : Lenis, reveals staggerés, transitions de page, boutons magnétiques, reveal d'image clip-path — tout avec fallback reduced-motion. SEO technique : metadata par page, JSON-LD LocalBusiness, sitemap, robots, image OG dynamique. QA : build + lint verts, vérification visuelle desktop/mobile via preview, formulaire testé de bout en bout (soumission réelle, état de succès confirmé).

**Résultat.** Site complet et fonctionnel, mais Felix n'a pas encore vu le résultat final avant la session suivante.

---

## Session 2 — Rejet de la direction, exploration multi-agents (2026-07-02)

**Feedback de Felix.** « J'aime pas le choix de couleur finalement, et je trouve que ça manque de punch. On veut le highest quality website pour mon agence. » La lane C (quasi-neutre/taupe) est rejetée.

**Décision : ré-explorer via workflow multi-agents plutôt qu'itérer seul.** Un `Workflow` a lancé 4 agents en parallèle, chacun proposant une direction complète et distincte (tokens hex exacts, traitement section par section) :
- **Argile assumée** — terre cuite `#A6512E` traitée en vraie couleur éditoriale (section Réalisations en pleine argile)
- **Encre de nuit** — bleu-noir `#111722` + ambre doré `#E5A644`, la page ouvre/ferme dans la nuit
- **Manchette** — contraste éditorial maximal, vermillon d'imprimerie
- **Vert Cantons** — éditorial forestier (wildcard)

Un panel de 3 juges (DA senior, propriétaire de PME québécoise, critique anti-slop) a scoré les 4 sur punch/crédibilité/anti-slop/cohérence. **Argile assumée a gagné** (2 juges sur 3, total combiné 100.5 vs 96.5 pour Encre de nuit) — jugée la plus crédible pour une PME locale, avec le meilleur rapport punch/exécutabilité. Le 3ème juge (critique anti-slop) a pointé un risque réel : « terracotta + crème + serif éditoriale est LA palette template Awwwards/Framer 2023-2026 » — un risque à garder en tête si le site venait à sembler générique plus tard.

**Implémentation en parallèle (worktrees isolés).** Argile et Encre de nuit ont été entièrement implémentées sur des branches séparées (`direction-argile`, `direction-nuit`) par 2 agents, avec amendements anti-slop du jury (un seul "tic éditorial 2026" par direction — pas de marquee + wordmark fantôme + italiques colorés tous en même temps). Build + lint verts sur les deux. Comparatif visuel présenté à Felix (captures côte à côte + serveurs dev live).

**Felix a choisi Argile**, mais avec critique immédiate : trop de blanc, pas assez de photos, la section Réalisations en aplat orange "ne fit pas avec le reste", l'affichage des 2 projets "pas clean".

---

## Session 3 — Élévation design complète (2026-07-02)

**Approche.** Skill `ui-ux-pro-max` consulté pour la structure (pattern "Portfolio Grid" : visuals first, le travail avant tout). Nouveaux composants créés : `BrowserFrame` (cadre navigateur avec barre d'adresse, réutilisé partout) et `PhoneFrame` (cadre téléphone bezel encre) — le "window style" que Felix voulait pour montrer les projets. Nouvelles captures réelles ajoutées pour PodDrop et C&T Arbro (vue desktop, vue de section, vue mobile 390px).

**3 agents en parallèle sur périmètres disjoints** (pour merger sans conflit) :
- **Zone A (accueil + composants partagés)** : hero refait en 2 colonnes avec duo BrowserFrame+PhoneFrame, section "Le problème" déplacée du fond encre foncé vers un fond sable clair avec liste ✕/✓, cartes services enrichies avec inclusions + bande "Aussi inclus", rangées Réalisations en duo desktop/mobile, approche en rail vertical connecté + panneau citation, CTA final avec mot fantôme "Parlons-en." en filigrane, footer entièrement refait (grande ligne d'appel + 4 colonnes + icônes SVG).
- **Zone B (/services + /approche)** : hero de /services avec panneau d'ancres vers les 3 services, rangées services avec index géants et panneau résultat, forfaits raffinés, /approche en timeline + grande citation en panneau.
- **Zone C (/realisations + /blogue)** : étude de cas avec fiche projet sticky + navigation prev/next, page réalisations avec meta enrichie, blogue avec article vedette, header d'article raffiné.

**Merge et déploiement.** Les 3 branches mergées sans conflit dans `direction-argile`, puis `direction-argile` mergée dans `main`. Build + lint verts après merge. **Felix a validé** ce résultat.

**Déploiement production.** Repo GitHub `sixinfected2-dotcom/Web-Estrie-Website-` trouvé (créé par Felix lui-même, contenait seulement 3 commits d'upload manuel de la v1 — historique sans rapport avec le vrai travail). Avec confirmation explicite de Felix (question posée via AskUserQuestion — force push vs squash), **force-push de `main` local vers `origin/main`**, remplaçant l'historique du repo. Vercel (déjà lié au repo par Felix) a auto-déployé — confirmé `READY` en production sur le bon commit via l'API Vercel.

**Incidents de session à noter :** Le dossier de travail a été déplacé deux fois par Felix pendant la session (`~/code-ref/` → `~/Desktop/code-ref/` → `~/Desktop/web-estrie` + `~/Desktop/web-estrie-argile`), cassant les références git worktree à chaque fois. Réparé via `git worktree repair` puis correction manuelle du fichier `.git` d'un worktree quand `repair` ne trouvait pas le nouveau chemin exact.

**Point non résolu :** Felix a signalé un "commit sur Claude, +897 -1" qui lui demande de créer un PR manuellement. Investigation : un dépôt git parasite existe dans `/Users/gee0x8` (son dossier home), pointant vers le même remote GitHub, avec un seul commit "first commit" contenant juste un `README.md`. Ce n'est probablement pas la source du "+897 -1" rapporté (le diff réel trouvé est minime — juste le README). **Non résolu** — à clarifier avec Felix avant d'intervenir, car toucher au `.git` du dossier home est sensible (voir ROADMAP.md § Prochaines étapes).

---

## Convention pour les prochaines entrées

Ajoute une nouvelle section `## Session N — <titre> (date)` en bas de ce fichier après chaque session de travail significative. Inclus : le feedback ou objectif de départ, les décisions prises et **pourquoi**, ce qui a été livré, et tout incident/piège rencontré qui pourrait re-piéger une session future.
