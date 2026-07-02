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
  id?: string;
};

export function Section({ children, className = "", rule = true, id }: SectionProps) {
  return (
    <section id={id} className={rule ? "border-t border-hairline" : ""}>
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
