import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ProgressHairline } from "@/components/motion/ProgressHairline";
import { FinalCta } from "@/components/sections/FinalCta";
import { posts, getPost, formatDate } from "@/lib/blogue";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogue/${post.slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(
    `@/content/blogue/${slug}.mdx`
  );

  return (
    <>
      <article>
        {/* Le filet de lecture — la seule barre de progression du site. */}
        <ProgressHairline />

        {/* ——— En-tête d'article ——— */}
        <header className="pt-[72px]">
          <Container className="pb-10 pt-20 md:pb-12 md:pt-28">
            <Reveal y={0}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="text-eyebrow text-accent-deep">Blogue</span>
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-accent"
                />
                <time
                  dateTime={post.date}
                  className="text-eyebrow text-ink-soft"
                >
                  {formatDate(post.date)}
                </time>
                <span
                  aria-hidden
                  className="h-1 w-1 rounded-full bg-accent"
                />
                <span className="text-eyebrow text-ink-soft">
                  {post.readingMinutes} min de lecture
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-[22ch] font-serif text-[clamp(2.3rem,5.2vw,3.8rem)] font-[420] leading-[1.05] tracking-[-0.022em] text-ink">
                {post.title}
              </h1>
            </Reveal>
          </Container>
        </header>

        {/* ——— Corps de l'article — largeur de lecture ——— */}
        <Container className="pb-20 md:pb-28">
          {/* La lettrine (CSS pur) exige que le premier <p> soit un
              enfant direct du conteneur `.lettrine`. */}
          <Reveal delay={0.1}>
            <div className="lettrine max-w-[700px] border-t border-hairline pt-10 md:pt-12">
              <Content />
            </div>
          </Reveal>

          {/* ——— Encart CTA de fin d'article ——— */}
          <Reveal>
            <aside className="mt-14 max-w-[700px] rounded-2xl bg-wash p-8 md:mt-16 md:p-10">
              <p className="text-eyebrow text-accent-deep">Prochaine étape</p>
              <p className="mt-4 max-w-[24ch] font-serif text-[clamp(1.5rem,2.8vw,1.9rem)] font-[430] leading-[1.15] tracking-[-0.014em] text-ink">
                Votre site vous coûte des clients?
              </p>
              <Link
                href="/contact"
                className="group mt-5 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
              >
                Parlez-nous de votre projet
                <span
                  aria-hidden
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </aside>
          </Reveal>
        </Container>
      </article>

      <FinalCta
        title="Une question sur votre présence en ligne?"
        body="Parlez-nous de votre situation. On vous répond vite, sans engagement."
      />
    </>
  );
}
