/**
 * Une section numérotée de la politique. Le numéro (serif italique,
 * accent) reprend le langage des index de /services; le filet hairline
 * sépare les sections sans les encadrer.
 */
export function LegalSection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-titre`}
      className="scroll-mt-24 border-t border-hairline py-12 first:border-t-0 first:pt-0 md:py-14"
    >
      <p
        aria-hidden
        className="font-serif text-[17px] italic leading-none text-accent"
      >
        {String(index).padStart(2, "0")}
      </p>
      <h2 id={`${id}-titre`} className="text-heading mt-3 max-w-[30ch] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Registre sur filets : une rangée = un intitulé + son contenu. */
export function Ledger({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 max-w-[760px] border-t border-hairline">{children}</ul>;
}

export function LedgerRow({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="grid gap-x-8 gap-y-2 border-b border-hairline py-5 md:grid-cols-12">
      <div className="font-serif text-[19px] font-[460] leading-snug tracking-[-0.01em] text-ink md:col-span-4">
        {label}
      </div>
      <div className="flex flex-col gap-1.5 text-[16px] leading-relaxed text-ink-soft md:col-span-8">
        {children}
      </div>
    </li>
  );
}
