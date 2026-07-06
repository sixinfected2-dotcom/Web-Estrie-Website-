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

/** La date en numéraux d'imprimerie — « 02·07·2026 ». */
function dateNumerals(iso: string) {
  const [year, month, day] = iso.split("-");
  return `${day}·${month}·${year}`;
}

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
        {/* ——— Ligne meta du sommaire ——— */}
        <Reveal y={0}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-hairline pt-6 md:pt-7">
            <p className="text-eyebrow text-ink-soft">Derniers articles</p>
            <p className="text-eyebrow text-ink-soft/80">
              {String(sorted.length).padStart(2, "0")}{" "}
              {sorted.length > 1 ? "articles" : "article"}
            </p>
          </div>
        </Reveal>

        {/* ——— Le sommaire du journal — rangées registre pleine largeur,
                la date en numéraux Fraunces italiques, zéro carte. ——— */}
        <div className="mt-10 border-b border-hairline md:mt-12">
          {sorted.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <article className="border-t border-hairline">
                <Link
                  href={`/blogue/${post.slug}`}
                  className="group grid gap-y-5 py-10 md:grid-cols-12 md:gap-x-12 md:py-14"
                >
                  <div className="md:col-span-3">
                    <time
                      dateTime={post.date}
                      className="block font-serif text-[clamp(26px,3.4vw,38px)] font-[400] italic leading-none tracking-[-0.01em] text-accent"
                    >
                      {dateNumerals(post.date)}
                    </time>
                    <p className="mt-3 text-[13px] text-ink-soft">
                      {formatDate(post.date)} · {post.readingMinutes} min de
                      lecture
                    </p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="wonk-hover text-heading max-w-[34ch] text-ink transition-colors duration-300 [--wonk-opsz:45] group-hover:text-accent-deep">
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
                  <span
                    aria-hidden
                    className="hidden text-[24px] leading-none text-ink-soft/60 transition-all duration-300 ease-editorial group-hover:translate-x-1.5 group-hover:text-accent md:col-span-1 md:block md:self-center md:justify-self-end"
                  >
                    →
                  </span>
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
