import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Section";
import { Reveal } from "../motion/Reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /**
   * Colonne droite optionnelle (chips-ancres, panneau contextuel…).
   * Quand présente, le header passe en grille 12 colonnes au desktop.
   */
  aside?: React.ReactNode;
  /**
   * Ligne de contexte sous le header — même motif que l'accueil :
   * filet hairline + dot argile + eyebrow.
   */
  meta?: string;
};

export function PageHeader({ eyebrow, title, lead, aside, meta }: PageHeaderProps) {
  const heading = (
    <>
      {eyebrow ? (
        <Reveal y={0}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h1 className="text-display mt-5 max-w-[18ch] text-ink">{title}</h1>
      </Reveal>
      {lead ? (
        <Reveal delay={0.18}>
          <p className="text-lead mt-7 max-w-[54ch] text-ink-soft">{lead}</p>
        </Reveal>
      ) : null}
    </>
  );

  return (
    <header className="pt-[72px]">
      <Container
        className={`pt-20 md:pt-28 ${meta ? "pb-10 md:pb-12" : "pb-16 md:pb-20"}`}
      >
        {aside ? (
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">{heading}</div>
            <Reveal delay={0.28} y={16} className="lg:col-span-5">
              {aside}
            </Reveal>
          </div>
        ) : (
          heading
        )}
        {meta ? (
          <Reveal delay={0.42} y={10}>
            <p className="text-eyebrow mt-14 flex items-center gap-3 border-t border-hairline pt-5 text-ink-soft md:mt-16">
              <span aria-hidden className="inline-block h-2 w-2 bg-accent" />
              {meta}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </header>
  );
}
