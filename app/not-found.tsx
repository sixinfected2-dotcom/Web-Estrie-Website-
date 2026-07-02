import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="pt-[72px]">
      <Container className="flex min-h-[70svh] flex-col items-start justify-center py-24">
        <Eyebrow>Erreur 404</Eyebrow>
        <h1 className="text-display mt-5 max-w-[18ch] text-ink">
          Cette page-là n&rsquo;existe pas<span className="text-accent">.</span>
        </h1>
        <p className="text-lead mt-6 max-w-[48ch] text-ink-soft">
          Le lien est peut-être brisé, ou la page a été déplacée. Revenez à
          l&rsquo;accueil — tout est encore là.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-7">
          <Button href="/">Retour à l&rsquo;accueil</Button>
          <Link
            href="/contact"
            className="text-[15px] font-semibold text-ink underline decoration-accent decoration-[1.5px] underline-offset-[5px] transition-colors hover:text-accent"
          >
            Nous écrire
          </Link>
        </div>
      </Container>
    </section>
  );
}
