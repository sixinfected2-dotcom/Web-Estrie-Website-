import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { KineticTitle } from "@/components/motion/KineticTitle";
import { CharRise } from "@/components/motion/CharRise";
import { Reveal } from "@/components/motion/Reveal";

/**
 * 404 — la coquille dans l'épreuve. Le numéral fantôme se compose
 * caractère par caractère puis fleurit; le titre monte derrière son
 * masque. Une signature, rien de plus.
 */
export default function NotFound() {
  return (
    <section className="overflow-hidden pt-[72px]">
      <Container className="flex min-h-[78svh] flex-col justify-center py-24">
        {/* Le numéral fantôme — décoratif, l'eyebrow porte l'information. */}
        <div aria-hidden className="pointer-events-none select-none">
          <CharRise
            text="404"
            bloom
            className="font-serif text-[clamp(6.5rem,17vw,13rem)] font-[400] italic leading-[0.85] tracking-[-0.03em] text-accent/[0.18]"
          />
        </div>

        <Reveal y={0} delay={0.12}>
          <Eyebrow className="mt-10">Erreur 404</Eyebrow>
        </Reveal>
        <KineticTitle
          delay={0.18}
          className="text-display mt-5 max-w-[18ch] text-ink"
          lines={[
            <Fragment key="l1">Cette page-là</Fragment>,
            <Fragment key="l2">
              n&rsquo;existe pas<span className="text-accent">.</span>
            </Fragment>,
          ]}
        />
        <Reveal delay={0.42}>
          <p className="text-lead mt-7 max-w-[48ch] text-ink-soft">
            Le lien est peut-être brisé, ou la page a été déplacée. Revenez à
            l&rsquo;accueil — tout est encore là.
          </p>
        </Reveal>
        <Reveal delay={0.52}>
          <div className="mt-10 flex flex-wrap items-center gap-7">
            <Button href="/">Retour à l&rsquo;accueil</Button>
            <Button href="/contact" variant="link">
              Nous écrire
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
