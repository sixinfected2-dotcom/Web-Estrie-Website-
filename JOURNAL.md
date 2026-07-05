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

## Session 4 — Domaine webestrie.ca (2026-07-04/05)

**Contexte.** Felix achète `webestrie.ca` sur Cloudflare Registrar le 2026-07-04 et demande de le connecter au projet Vercel `web-estrie-website`. Le connecteur Cloudflare disponible côté Claude ne couvre que Workers/D1/R2/KV/Hyperdrive — aucune gestion de zone DNS ni de Domain Registration. La vérification s'est donc faite par requêtes DNS publiques directes (Google DoH via `curl`) plutôt que par un accès Cloudflare programmatique, et la connexion du domaine dans Vercel (Project Settings → Domains) a été faite manuellement par Felix.

**Premier diagnostic (2026-07-04).** Un `dig +trace` fait par Felix ne montrait aucune délégation NS visible côté registre .ca — signe possible de propagation en cours. Vérification différée à la propagation.

**Vérification complète (2026-07-05).** Requêtes DNS publiques confirment : NS bien délégués (`gwen.ns.cloudflare.com` / `norm.ns.cloudflare.com`, résolution SOA valide) — le souci de la veille n'était que de la propagation, rien de bloquant au registre. Mais l'enregistrement `A @` (`216.198.79.1`) et le `CNAME www` (`25cd9528d5b6458f.vercel-dns-017.com`) étaient configurés en mode **Proxied (nuage orange)** plutôt qu'en **DNS only (nuage gris)**. Fait notable : le site fonctionnait déjà bout-en-bout malgré ça — Cloudflare proxifiait correctement jusqu'à Vercel (`x-vercel-id` visible dans les réponses HTTP, contenu Next.js réel servi). Mais ce n'est pas la configuration officiellement supportée par Vercel (risque de friction sur le renouvellement auto du certificat SSL) — recommandation de repasser en DNS-only, comme convenu pour poddrop.ca.

Felix a désactivé le proxy sur les deux enregistrements via le dashboard Cloudflare. Re-vérification post-correction : `A @` résout directement vers `216.198.79.1`, `CNAME www` visible en clair vers `25cd9528d5b6458f.vercel-dns-017.com`, headers HTTP montrent `server: Vercel` (plus de double-proxy Cloudflare), redirections HTTP→HTTPS et apex→www propres sans boucle. Confirmé côté Vercel dashboard : `webestrie.ca`, `www.webestrie.ca` et `web-estrie-website.vercel.app` tous en **Valid Configuration**, `www` en **Production**.

**Limites d'outillage rencontrées et documentées** :
- Le connecteur Cloudflare MCP ne couvre pas DNS/Domain Registration — seulement Workers/D1/R2/KV/Hyperdrive.
- `dig`/`whois` absents du sandbox Claude — contourné avec `curl` vers l'API DoH de Google (`https://dns.google/resolve`).
- `openssl s_client` depuis le sandbox est intercepté par le proxy réseau interne d'Anthropic (certificat MITM visible côté "Egress Gateway") — inutilisable pour vérifier un vrai certificat TLS. La vérification du cadenas SSL reste à faire manuellement par Felix (navigateur ou ssllabs.com).
- L'outil `get_project` du connecteur Vercel ne remonte pas les domaines custom (seulement les sous-domaines `.vercel.app` par défaut) — la confirmation finale du domaine s'est faite via une capture d'écran du dashboard Vercel fournie par Felix, pas via l'API.

**Reste non-bloquant, pas fait cette session** : configuration MX/SPF/DKIM/DMARC pour `@webestrie.ca` (Cloudflare l'a signalé — email actuellement non fonctionnel sur ce domaine, comme au tout début pour poddrop.ca avant la Phase Resend). Statut CIRA / Domain Registration dans Cloudflare non vérifiable par les tools connectés — délégation NS fonctionnelle en est un signe indirect fort, mais Felix reste seul à pouvoir confirmer cet onglet précis.

**Leçons de cette session :**
- **Même leçon que poddrop.ca, répétée** : toujours DNS-only (gris), jamais Proxied (orange), pour un domaine pointant vers Vercel — même si le site semble fonctionner en mode proxifié, ce n'est pas la config supportée.
- **Un connecteur MCP "Cloudflare" ne veut pas dire accès complet à Cloudflare** — vérifier le périmètre réel (ici : Developer Platform seulement, pas DNS ni Registrar) avant de promettre une vérification.
- **Le sandbox réseau Claude a son propre MITM TLS** — toute vérification de certificat SSL réel doit se faire depuis un vrai navigateur ou un outil externe (ssllabs.com), jamais depuis `openssl s_client` en sandbox.
- **Les API des connecteurs ne remontent pas toujours tout** (ex. domaines custom absents de `Vercel:get_project`) — une capture d'écran du dashboard reste parfois la source de vérité la plus fiable.

---

## Session 5 — Élévation ciblée de sections (2026-07-05)

**Objectif.** Analyse design du site complet (hiérarchie, densité, rythme, micro-interactions), identification de 2-4 sections à fort impact visuel, implémentation directe. Contraintes : direction Argile intacte, copy existante seulement, placeholders des 9 décisions non touchés, pas de commit (review du working tree par Felix).

**Diagnostic.** Le site tient bien (hero, réalisations, CTA final, footer forts). Les maillons faibles : les grilles de cartes identiques — bloc services de l'accueil et forfaits de /services (anti-pattern « identical card grid », le seul moment template des pages) — plus la colonne verdict du bloc « problème » où la réponse restait au même niveau visuel que les trois constats, et les tuiles icône-dans-cercle « Aussi inclus » de l'accueil.

**Livré.**
- **Accueil, bloc « Ce qu'on fait »** : grille de 3 cartes → ledger éditorial pleine largeur. Numéral serif italique géant (accent à 18 %, s'allume en pleine argile au survol), filets hairline, titre + short au centre, 3 inclusions en méta à droite (desktop), flèche qui glisse. Même langage que les index géants de /services. La bande « Aussi inclus » passe de tuiles avec icônes en cercle à une ligne typographique compacte (titre serif italique + dot argile + body).
- **Accueil, bloc « Le problème »** : le verdict ✓ sort des rangées hairline pour un panneau `bg-accent` plein — première utilisation du registre « clay » prévu dans Section.tsx — texte paper serif italique. Les 3 constats ✕ restent en filets au-dessus : la réponse a maintenant le punch argile que les constats n'ont pas.
- **/services, Forfaits** : 3 cartes identiques → registre en rangées (eyebrow service, nom serif grand, prix « Sur demande » inchangé en italique accent-deep, features sur 2 colonnes, CTA à droite). L'emphase arbitraire de la carte du milieu (bordure accent sans donnée qui la justifie) est supprimée.
- **Micro-interaction** : `PhoneFrame` reçoit un lift léger au `group-hover` (translate-y -8 px, `motion-safe:` seulement) — actif dans le hero et les rangées réalisations, en écho au scale déjà présent sur l'image des BrowserFrames.

**Vérifié.** Preview local (port 3456) : desktop 1280 et mobile 375 sur accueil + /services, console propre, `lint` + `build` verts.

**Pièges/notes pour les prochaines sessions.**
- L'outil de preview Claude a un bug de viewport après une navigation (`location.href`) : la page rend minuscule dans le coin. Contournement fiable : reset `preset: desktop` puis re-resize aux dimensions voulues.
- `launch.json` global (`~/.claude/.claude/launch.json`) : entrée `web-estrie` ajoutée (pointe vers `~/Desktop/web-estrie`, port 3456). Les anciennes entrées `webestrie-*` pointent vers `~/Desktop/code-ref/*` — chemins périmés depuis le déménagement du projet.
- Warning Next dev sur le LCP du hero (`poddrop.png`) malgré `priority` sur le BrowserFrame — pré-existant à cette session, à investiguer pendant la QA de la phase 7.

---

## Convention pour les prochaines entrées

Ajoute une nouvelle section `## Session N — <titre> (date)` en bas de ce fichier après chaque session de travail significative. Inclus : le feedback ou objectif de départ, les décisions prises et **pourquoi**, ce qui a été livré, et tout incident/piège rencontré qui pourrait re-piéger une session future.
