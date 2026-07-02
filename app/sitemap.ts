import type { MetadataRoute } from "next";
import { site } from "@/lib/data";
import { caseStudies } from "@/content/realisations/data";
import { posts } from "@/lib/blogue";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/realisations", priority: 0.8 },
    { path: "/approche", priority: 0.7 },
    { path: "/contact", priority: 0.9 },
    { path: "/blogue", priority: 0.6 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
  }));

  const caseStudyPages = caseStudies.map(({ slug }) => ({
    url: `${site.url}/realisations/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = posts.map(({ slug, date }) => ({
    url: `${site.url}/blogue/${slug}`,
    lastModified: new Date(date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...caseStudyPages, ...blogPages];
}
