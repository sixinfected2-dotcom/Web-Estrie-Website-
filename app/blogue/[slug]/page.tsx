import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
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
        <header className="pt-[72px]">
          <Container className="pb-12 pt-20 md:pb-14 md:pt-28">
            <Reveal y={0}>
              <Eyebrow>Blogue</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="text-title mt-5 max-w-[26ch] text-ink md:text-[clamp(2.2rem,4vw,3.2rem)]">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-ink-soft">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min de lecture</span>
              </p>
            </Reveal>
          </Container>
        </header>

        <Container className="pb-20 md:pb-28">
          <Reveal delay={0.1}>
            <div className="max-w-[720px] border-t border-hairline pt-10">
              <Content />
            </div>
          </Reveal>
        </Container>
      </article>

      <FinalCta
        title="Votre site vous coûte des clients?"
        body="On l'analyse pis on vous montre clairement quoi corriger. Sans engagement."
      />
    </>
  );
}
