import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Styles éditoriaux des articles de blogue — même échelle typographique
 * que le reste du site.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => (
      <h2
        className="text-heading mt-12 max-w-[30ch] text-ink first:mt-0"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-10 font-serif text-[20px] font-[460] tracking-[-0.01em] text-ink"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="mt-5 max-w-[66ch] text-[17px] leading-[1.75] text-ink-soft"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mt-5 flex max-w-[66ch] list-disc flex-col gap-2 pl-5 text-[17px] leading-[1.75] text-ink-soft marker:text-accent"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-5 flex max-w-[66ch] list-decimal flex-col gap-2 pl-5 text-[17px] leading-[1.75] text-ink-soft marker:text-accent"
        {...props}
      />
    ),
    strong: (props) => <strong className="font-semibold text-ink" {...props} />,
    em: (props) => <em className="italic" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-8 max-w-[60ch] border-l-2 border-accent pl-6 font-serif text-[20px] font-[440] italic leading-snug text-ink"
        {...props}
      />
    ),
    a: ({ href = "", ...props }) =>
      href.startsWith("/") ? (
        <Link
          href={href}
          className="font-medium text-ink underline decoration-accent decoration-[1.5px] underline-offset-[4px] transition-colors hover:text-accent"
          {...props}
        />
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-ink underline decoration-accent decoration-[1.5px] underline-offset-[4px] transition-colors hover:text-accent"
          {...props}
        />
      ),
    ...components,
  };
}
