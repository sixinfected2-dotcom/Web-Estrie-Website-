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
  const [featured, ...rest] = sorted;

  return (
    <>
      <PageHeader
        eyebrow="Blogue"
        title="Le blogue"
        lead="Des conseils clairs pour les entreprises locales qui veulent une meilleure présence en ligne."
      />

      <Section className="pt-0 md:pt-0 lg:pt-0" rule={false}>
        {/* ——— Article vedette ——— */}
        {featured ? (
          <Reveal>
            <article className="border-t border-hairline pt-10 md:pt-12">
              <Link
                href={`/blogue/${featured.slug}`}
                className="group grid gap-8 rounded-2xl bg-wash p-7 sm:p-9 md:grid-cols-12 md:gap-12 md:p-12"
              >
                <div className="flex items-start justify-between gap-6 md:col-span-3 md:flex-col md:justify-start md:gap-8">
                  <span
                    aria-hidden
                    className="font-serif text-[clamp(40px,5vw,56px)] italic leading-none text-accent"
                  >
                    01
                  </span>
                  <div className="flex flex-col gap-1.5 text-right md:text-left">
                    <p className="text-eyebrow text-accent-deep">
                      Dernier article
                    </p>
                    <time
                      dateTime={featured.date}
                      className="mt-1 text-[14px] text-ink-soft"
                    >
                      {formatDate(featured.date)}
                    </time>
                    <span className="text-[13px] text-ink-soft">
                      {featured.readingMinutes} min de lecture
                    </span>
                  </div>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-title max-w-[26ch] text-ink transition-colors duration-300 group-hover:text-accent">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                    {featured.excerpt}
                  </p>
                  <span className="mt-7 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors group-hover:text-accent">
                    Lire l&rsquo;article
                    <span
                      aria-hidden
                      className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          </Reveal>
        ) : null}

        {/* ——— Articles suivants ——— */}
        {rest.length > 0 ? (
          <div className="mt-14 flex flex-col md:mt-16">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <article className="border-t border-hairline">
                  <Link
                    href={`/blogue/${post.slug}`}
                    className="group grid gap-4 py-10 md:grid-cols-12 md:gap-12 md:py-14"
                  >
                    <div className="flex items-baseline gap-6 md:col-span-3 md:gap-7">
                      <span
                        aria-hidden
                        className="font-serif text-[22px] italic leading-none text-accent"
                      >
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <div className="flex items-baseline gap-6 md:flex-col md:gap-2">
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
                    </div>
                    <div className="md:col-span-9">
                      <h2 className="text-heading max-w-[32ch] text-ink transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      <p className="mt-3 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-soft">
                        {post.excerpt}
                      </p>
                      <span className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-[14px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors group-hover:text-accent">
                        Lire l&rsquo;article
                        <span
                          aria-hidden
                          className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        ) : null}
      </Section>

      <FinalCta
        title="Une question sur votre présence en ligne?"
        body="Parlez-nous de votre situation. On vous répond vite, sans engagement."
      />
    </>
  );
}
