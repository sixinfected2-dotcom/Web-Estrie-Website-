import { Container } from "./Container";
import { Reveal } from "../motion/Reveal";

export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-eyebrow text-ink-soft ${className}`}>{children}</p>
  );
}

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Filet hairline au-dessus de la section. */
  rule?: boolean;
  /**
   * Fond pleine largeur — le rythme éditorial papier → encre → papier →
   * argile → sable de la direction « Argile assumée ».
   */
  tone?: "paper" | "ink" | "clay" | "wash";
  id?: string;
};

const toneClass: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "",
  ink: "bg-ink",
  clay: "bg-accent",
  wash: "bg-wash",
};

export function Section({
  children,
  className = "",
  rule = true,
  tone = "paper",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${toneClass[tone]} ${rule ? "border-t border-hairline" : ""}`.trim()}
    >
      <Container className={`py-20 md:py-28 lg:py-32 ${className}`}>
        {children}
      </Container>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
};

export function SectionHeader({ eyebrow, title, lead, className = "" }: SectionHeaderProps) {
  return (
    <Reveal className={`max-w-2xl ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="text-title mt-4 text-ink">{title}</h2>
      {lead ? <p className="text-lead mt-5 text-ink-soft">{lead}</p> : null}
    </Reveal>
  );
}
