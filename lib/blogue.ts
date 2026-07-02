export type PostMeta = {
  slug: string;
  title: string;
  /** Format ISO — YYYY-MM-DD. */
  date: string;
  excerpt: string;
  readingMinutes: number;
};

export const posts: PostMeta[] = [
  {
    slug: "5-raisons-site-entreprise-amene-pas-clients",
    title:
      "5 raisons pourquoi le site de votre entreprise ne vous amène pas de clients",
    date: "2026-07-02",
    excerpt:
      "Un site peut être en ligne pis ne rien rapporter. Voici les cinq problèmes qu'on voit le plus souvent chez les entreprises locales — pis comment les régler.",
    readingMinutes: 5,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Toronto",
  }).format(new Date(`${iso}T12:00:00-05:00`));
}
