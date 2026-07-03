export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  service: string;
  url: string;
  oneLiner: string;
  /** Le contexte / le problème — où en était le client avant. */
  context: string;
  /** Ce qu'on a fait — le travail, les décisions clés. */
  work: string[];
  /** Le résultat. Metrics chiffrées à venir de Felix. */
  outcome: string;
  /** [metrics à remplir par Felix — trafic, appels, ventes] */
  metrics: { value: string; label: string }[] | null;
  image: string;
  imageAlt: string;
  /** Capture d'une section intérieure du site (variété visuelle). */
  imageSecondary: string;
  /** Capture mobile (390px) — pour les compositions navigateur + téléphone. */
  imageMobile: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "poddrop",
    client: "PodDrop",
    sector: "Commerce électronique",
    service: "Boutique en ligne",
    url: "https://poddrop.ca",
    oneLiner:
      "Une boutique en ligne bâtie de A à Z — la preuve vivante de ce qu'on vend.",
    context:
      "PodDrop, c'est notre propre boutique de produits AirPods. Plutôt que de vendre l'e-commerce en théorie, on l'a bâti pour nous-mêmes : catalogue, panier, paiement, gestion des commandes. Tout ce qu'on propose à nos clients, on l'opère au quotidien.",
    work: [
      "Design de la boutique sur mesure, pensé pour l'achat rapide",
      "Catalogue de produits avec fiches claires pis photos propres",
      "Panier pis paiement sécurisé, sans friction",
      "Optimisation vitesse pis mobile — la majorité des achats se font au téléphone",
    ],
    outcome:
      "Une boutique rapide, simple à gérer, qui vend en continu. On applique à nous-mêmes ce qu'on vend — pis ça nous garde aiguisés sur ce qui convertit réellement.",
    metrics: null,
    image: "/images/realisations/poddrop.png",
    imageAlt: "Aperçu de la boutique en ligne PodDrop",
    imageSecondary: "/images/realisations/poddrop-2.png",
    imageMobile: "/images/realisations/poddrop-mobile.png",
  },
  {
    slug: "ct-arbro",
    client: "C&T Arbro",
    sector: "Services d'arboriculture — Magog",
    service: "Site vitrine · Refonte",
    url: "https://ctarbro.ca",
    oneLiner:
      "Un site vitrine refait au complet pour une entreprise d'émondage de Magog.",
    context:
      "C&T Arbro, une entreprise d'émondage pis de coupage d'arbres de Magog, avait besoin d'une présence web à la hauteur de son travail sur le terrain : un site clair, crédible, facile à trouver pour les clients de la région.",
    work: [
      "Refonte complète du site, design sur mesure",
      "Structure pensée pour la conversion : services clairs, appel à l'action direct",
      "SEO local — être trouvé à Magog pis dans les environs",
      "Site rapide, adapté mobile, facile à maintenir",
    ],
    outcome:
      "Un site vitrine propre qui représente bien l'entreprise pis qui génère des demandes de soumission dans sa région.",
    metrics: null,
    image: "/images/realisations/ct-arbro.png",
    imageAlt: "Aperçu du site vitrine C&T Arbro",
    imageSecondary: "/images/realisations/ct-arbro-2.png",
    imageMobile: "/images/realisations/ct-arbro-mobile.png",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
