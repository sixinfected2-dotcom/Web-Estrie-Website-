export const site = {
  name: "Web Estrie",
  tagline: "Des sites web sur mesure pour les entreprises de l'Estrie.",
  url: "https://webestrie.ca",
  // [À fournir par Felix — courriel de contact définitif]
  email: "info@webestrie.ca",
  // [À fournir par Felix — lien Instagram exact]
  instagram: "https://www.instagram.com/webestrie",
  region: "Estrie, Québec",
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/realisations", label: "Réalisations" },
  { href: "/approche", label: "Approche" },
  { href: "/blogue", label: "Blogue" },
] as const;

export type Service = {
  slug: string;
  title: string;
  short: string;
  forWho: string;
  included: string[];
  outcome: string;
};

export const services: Service[] = [
  {
    slug: "site-vitrine",
    title: "Site vitrine",
    short:
      "Une présence professionnelle qui inspire confiance pis fait sonner le téléphone.",
    forWho:
      "PME, nouvelles entreprises, travailleurs autonomes qui veulent une présence pro.",
    included: [
      "Design sur mesure",
      "Jusqu'à [X] pages",
      "Adapté mobile pis tablette",
      "Optimisation SEO de base",
      "Formulaire de contact",
      "Mise en ligne",
    ],
    outcome:
      "Un site crédible qui inspire confiance pis génère des demandes.",
  },
  {
    slug: "boutique-en-ligne",
    title: "Boutique en ligne",
    short:
      "Vendez vos produits en ligne avec une boutique claire, rapide pis facile à gérer.",
    forWho: "Commerces qui veulent vendre en ligne.",
    included: [
      "Catalogue de produits",
      "Panier",
      "Paiement sécurisé",
      "Gestion des commandes",
      "Design sur mesure",
    ],
    outcome:
      "Une boutique facile à gérer qui vend même quand vous dormez.",
  },
  {
    slug: "refonte-audit",
    title: "Refonte & audit",
    short:
      "Un site dépassé? On l'analyse, on le corrige, pis on le remet à niveau.",
    forWho:
      "Entreprises avec un site dépassé, lent, ou qui ne convertit pas.",
    included: [
      "Audit complet (contenu, UX, SEO technique, conversion)",
      "Plan de correction clair",
      "Refonte",
    ],
    outcome:
      "Un site remis à niveau, plus rapide, mieux positionné sur Google.",
  },
];

export const complements = [
  {
    title: "SEO local",
    body: "Fiche Google Business, schémas de données, pour être trouvé dans votre région.",
  },
  {
    title: "Identité de marque",
    body: "Logo, couleurs, typographie, pour une image cohérente et professionnelle.",
  },
];

export type Forfait = {
  name: string;
  service: string;
  // [À DÉTERMINER par Felix — montant « à partir de »]
  priceFrom: string | null;
  features: string[];
};

export const forfaits: Forfait[] = [
  {
    name: "Vitrine",
    service: "Site vitrine",
    priceFrom: null,
    features: [
      "Design sur mesure",
      "Adapté mobile pis tablette",
      "SEO de base inclus",
      "Formulaire de contact",
      "Mise en ligne comprise",
    ],
  },
  {
    name: "Boutique",
    service: "Boutique en ligne",
    priceFrom: null,
    features: [
      "Catalogue de produits",
      "Paiement sécurisé",
      "Gestion des commandes simple",
      "Design sur mesure",
      "Formation à la remise",
    ],
  },
  {
    name: "Refonte",
    service: "Refonte & audit",
    priceFrom: null,
    features: [
      "Audit complet du site actuel",
      "Plan de correction clair",
      "Refonte design pis contenu",
      "Optimisation vitesse pis SEO",
    ],
  },
];
