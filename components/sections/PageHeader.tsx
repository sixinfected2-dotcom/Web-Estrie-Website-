import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Section";
import { Reveal } from "../motion/Reveal";
import { KineticTitle } from "../motion/KineticTitle";

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  /**
   * Optionnel : le titre découpé en lignes visuelles — chaque ligne
   * monte derrière son masque. Sans lui, `title` monte d'un bloc.
   */
  titleLines?: React.ReactNode[];
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

/**
 * Héros des sous-pages. Le h1 se compose en KineticTitle (montée derrière
 * masque + bloom optique) — calé à 0.12 s pour enchaîner la levée du
 * voile de transition en un seul geste perçu.
 */
export function PageHeader({
  eyebrow,
  title,
  titleLines,
  lead,
  aside,
  meta,
}: PageHeaderProps) {
  const heading = (
    <>
      {eyebrow ? (
        <Reveal y={0} delay={0.04}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      ) : null}
      <KineticTitle
        bloom
        delay={0.12}
        className="text-display mt-5 max-w-[18ch] text-ink"
        lines={titleLines ?? [title]}
      />
      {lead ? (
        <Reveal delay={0.32}>
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
            <Reveal delay={0.38} y={16} className="lg:col-span-5">
              {aside}
            </Reveal>
          </div>
        ) : (
          heading
        )}
        {meta ? (
          <Reveal delay={0.5} y={10}>
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
