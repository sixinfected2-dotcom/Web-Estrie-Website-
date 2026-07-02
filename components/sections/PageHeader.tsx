import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Section";
import { Reveal } from "../motion/Reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, lead }: PageHeaderProps) {
  return (
    <header className="pt-[72px]">
      <Container className="pb-16 pt-20 md:pb-20 md:pt-28">
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
      </Container>
    </header>
  );
}
