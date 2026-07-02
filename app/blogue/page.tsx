import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections/PageHeader";
import { FinalCta } from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { posts, formatDate } from "@/lib/blogue";

export const metadata: Metadata = {
  title: "Blogue — Conseils web pour les entreprises locales",
  description:
    "Des conseils clairs pour les entreprises locales qui veulent une meilleure présence en ligne.",
  alternates: { canonical: "/blogue" },
};

export default function BloguePage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Blogue"
        title="Le blogue"
        lead="Des conseils clairs pour les entreprises locales qui veulent une meilleure présence en ligne."
      />

      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        <div className="flex flex-col">
          {sorted.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <article className="border-t border-hairline">
                <Link
                  href={`/blogue/${post.slug}`}
                  className="group grid gap-4 py-10 md:grid-cols-12 md:gap-12 md:py-14"
                >
                  <div className="flex items-baseline gap-6 md:col-span-3 md:flex-col md:gap-2">
                    <time
                      dateTime={post.date}
                      className="text-[14px] text-ink-soft"
                    >
                      {formatDate(post.date)}
                    </time>
                    <span className="text-[13px] text-ink-soft">
                      {post.readingMinutes} min de lecture
                    </span>
                  </div>
                  <div className="md:col-span-9">
                    <h2 className="text-heading max-w-[32ch] text-ink transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-block text-[14px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors group-hover:text-accent">
                      Lire l&rsquo;article
                    </span>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <FinalCta
        title="Une question sur votre présence en ligne?"
        body="Parlez-nous de votre situation. On vous répond vite, sans engagement."
      />
    </>
  );
}
