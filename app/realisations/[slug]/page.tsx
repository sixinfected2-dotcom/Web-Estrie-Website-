import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
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
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
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

      {/* ——— Visuel principal ——— */}
      <Container>
        <ImageReveal>
          <BrowserFrame
            src={study.image}
            alt={study.imageAlt}
            url={study.url.replace(/^https?:\/\//, "")}
            priority
            sizes="(min-width: 1200px) 1120px, 100vw"
            aspect="aspect-[16/9]"
          />
        </ImageReveal>
      </Container>

      {/* ——— Contexte ——— */}
      <Section rule={false}>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <Eyebrow>Le contexte</Eyebrow>
            <h2 className="text-title mt-4 text-ink">Le point de départ.</h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-8 md:pt-11">
            <p className="text-lead max-w-[58ch] text-ink-soft">
              {study.context}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ——— Ce qu'on a fait ——— */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <Eyebrow>Le travail</Eyebrow>
            <h2 className="text-title mt-4 text-ink">Ce qu&rsquo;on a fait.</h2>
          </Reveal>
          <div className="md:col-span-8 md:pt-11">
            <ul className="flex flex-col">
              {study.work.map((item, i) => (
                <Reveal key={item} delay={i * 0.07}>
                  <li className="flex items-baseline gap-5 border-b border-hairline py-5 first:pt-0">
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
      </Section>

      {/* ——— Le résultat ——— */}
      <Section>
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <Eyebrow>Le résultat</Eyebrow>
            <h2 className="text-title mt-4 text-ink">Ce que ça donne.</h2>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-8 md:pt-11">
            <p className="max-w-[52ch] font-serif text-[24px] font-[440] italic leading-snug tracking-[-0.012em] text-ink md:text-[28px]">
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

      <FinalCta
        title="Un projet similaire? Parlons-en."
        body="Racontez-nous où vous en êtes — on vous revient avec un plan clair."
      />
    </>
  );
}
