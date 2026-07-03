import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { caseStudies, getCaseStudy } from "@/content/realisations/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.client} — Étude de cas`,
    description: study.oneLiner,
    alternates: { canonical: `/realisations/${study.slug}` },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const prev = index > 0 ? caseStudies[index - 1] : null;
  const next = index < caseStudies.length - 1 ? caseStudies[index + 1] : null;
  const domain = study.url.replace(/^https?:\/\//, "");

  return (
    <>
      {/* ——— En-tête ——— */}
      <header className="pt-[72px]">
        <Container className="pb-14 pt-20 md:pb-16 md:pt-28">
          <Reveal y={0}>
            <Eyebrow>
              {study.sector} · {study.service}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="text-display mt-5 max-w-[16ch] text-ink">
              {study.client}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-lead mt-6 max-w-[52ch] text-ink-soft">
              {study.oneLiner}
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <a
              href={study.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
            >
              Voir le site en ligne
              <span
                aria-hidden
                className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
              >
                ↗
              </span>
            </a>
          </Reveal>
        </Container>
      </header>

      {/* ——— Visuel principal : navigateur + téléphone en surimpression ——— */}
      <Container>
        <div className="relative pb-16 sm:pb-20 md:pb-24">
          <ImageReveal>
            <BrowserFrame
              src={study.image}
              alt={study.imageAlt}
              url={domain}
              priority
              sizes="(min-width: 1200px) 1120px, 100vw"
              aspect="aspect-[16/9]"
            />
          </ImageReveal>
          <Reveal
            delay={0.3}
            className="absolute -bottom-2 left-4 w-[104px] sm:w-[128px] md:left-8 md:w-[160px] lg:left-12 lg:w-[184px]"
          >
            <PhoneFrame
              src={study.imageMobile}
              alt={`Version mobile — ${study.imageAlt}`}
              sizes="(min-width: 1024px) 184px, (min-width: 768px) 160px, 128px"
            />
          </Reveal>
        </div>
      </Container>

      {/* ——— Corps : contexte + travail à gauche, fiche projet sticky à droite ——— */}
      <Section rule={false} className="pt-14 md:pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            {/* Le contexte */}
            <Reveal>
              <Eyebrow>Le contexte</Eyebrow>
              <h2 className="text-title mt-4 text-ink">Le point de départ.</h2>
              <p className="text-lead mt-6 max-w-[58ch] text-ink-soft">
                {study.context}
              </p>
            </Reveal>

            {/* Ce qu'on a fait */}
            <div className="mt-16 border-t border-hairline pt-12 md:mt-20 md:pt-14">
              <Reveal>
                <Eyebrow>Le travail</Eyebrow>
                <h2 className="text-title mt-4 text-ink">
                  Ce qu&rsquo;on a fait.
                </h2>
              </Reveal>
              <ul className="mt-8 flex flex-col md:mt-10">
                {study.work.map((item, i) => (
                  <Reveal key={item} delay={i * 0.07}>
                    <li className="flex items-baseline gap-5 border-b border-hairline py-4 md:py-[18px]">
                      <span
                        aria-hidden
                        className="font-serif text-[16px] italic text-accent"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-[16.5px] leading-relaxed text-ink">
                        {item}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>

          {/* Fiche projet — panneau sticky */}
          <div className="lg:col-span-4">
            <Reveal delay={0.1} className="lg:sticky lg:top-24">
              <aside className="rounded-2xl bg-wash p-7 md:p-8">
                <p className="text-eyebrow text-accent-deep">Fiche projet</p>
                <dl className="mt-6 flex flex-col">
                  <div className="border-t border-ink/10 py-4">
                    <dt className="text-eyebrow text-ink-soft">Secteur</dt>
                    <dd className="mt-1.5 text-[15.5px] leading-snug text-ink">
                      {study.sector}
                    </dd>
                  </div>
                  <div className="border-t border-ink/10 py-4">
                    <dt className="text-eyebrow text-ink-soft">Service</dt>
                    <dd className="mt-1.5 text-[15.5px] leading-snug text-ink">
                      {study.service}
                    </dd>
                  </div>
                </dl>
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-2 border-t border-ink/10 pt-4 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
                >
                  Voir le site en ligne
                  <span
                    aria-hidden
                    className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                  >
                    ↗
                  </span>
                </a>
              </aside>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ——— Visuel secondaire pleine largeur ——— */}
      <Container className="pt-4 md:pt-6">
        <ImageReveal>
          <BrowserFrame
            src={study.imageSecondary}
            alt={`Section intérieure — ${study.imageAlt}`}
            url={domain}
            sizes="(min-width: 1200px) 1120px, 100vw"
            aspect="aspect-[16/9]"
          />
        </ImageReveal>
      </Container>

      {/* ——— Le résultat ——— */}
      <Section rule={false} className="pt-16 md:pt-20 lg:pt-24">
        <div className="grid gap-10 border-t border-hairline pt-12 md:grid-cols-12 md:gap-16 md:pt-14">
          <Reveal className="md:col-span-4">
            <Eyebrow>Le résultat</Eyebrow>
            <h2 className="text-title mt-4 text-ink">Ce que ça donne.</h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-8 md:pt-11">
            <p className="max-w-[46ch] font-serif text-[clamp(24px,3vw,32px)] font-[440] italic leading-[1.3] tracking-[-0.014em] text-ink">
              {study.outcome}
            </p>
            {/* [metrics à remplir par Felix — le count-up s'active quand les chiffres arrivent] */}
            {study.metrics ? (
              <dl className="mt-12 grid gap-8 sm:grid-cols-3">
                {study.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="text-eyebrow order-2 mt-2 text-ink-soft">
                      {m.label}
                    </dt>
                    <dd className="text-title text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </Reveal>
        </div>
      </Section>

      {/* ——— Navigation entre études de cas ——— */}
      {prev || next ? (
        <Container className="pb-20 md:pb-24">
          <Reveal>
            <nav
              aria-label="Autres études de cas"
              className="grid border-t border-hairline sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  href={`/realisations/${prev.slug}`}
                  className="group flex min-h-[44px] flex-col gap-2 border-b border-hairline py-8 pr-6 sm:border-b-0 sm:py-10"
                >
                  <span className="text-eyebrow text-ink-soft">
                    Projet précédent
                  </span>
                  <span className="flex items-baseline gap-3 font-serif text-[clamp(22px,2.6vw,30px)] font-[430] tracking-[-0.014em] text-ink transition-colors duration-300 group-hover:text-accent">
                    <span
                      aria-hidden
                      className="text-[0.7em] transition-transform duration-300 ease-editorial group-hover:-translate-x-0.5"
                    >
                      ←
                    </span>
                    {prev.client}
                  </span>
                </Link>
              ) : (
                <span aria-hidden className="hidden sm:block" />
              )}
              {next ? (
                <Link
                  href={`/realisations/${next.slug}`}
                  className="group flex min-h-[44px] flex-col gap-2 py-8 sm:items-end sm:border-l sm:border-hairline sm:py-10 sm:pl-6 sm:text-right"
                >
                  <span className="text-eyebrow text-ink-soft">
                    Projet suivant
                  </span>
                  <span className="flex items-baseline gap-3 font-serif text-[clamp(22px,2.6vw,30px)] font-[430] tracking-[-0.014em] text-ink transition-colors duration-300 group-hover:text-accent">
                    {next.client}
                    <span
                      aria-hidden
                      className="text-[0.7em] transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ) : (
                <span
                  aria-hidden
                  className="hidden sm:block sm:border-l sm:border-hairline"
                />
              )}
            </nav>
          </Reveal>
        </Container>
      ) : null}

      <FinalCta
        title="Un projet similaire? Parlons-en."
        body="Racontez-nous où vous en êtes — on vous revient avec un plan clair."
      />
    </>
  );
}
