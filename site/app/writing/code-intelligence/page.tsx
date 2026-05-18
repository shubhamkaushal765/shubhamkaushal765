import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { CHAPTERS } from './chapters';

export const metadata: Metadata = {
  title: 'Code intelligence — Shubham Kaushal',
  description:
    'A working notebook on code intelligence — parsers, static analysis, language servers, and the hybrid symbolic-plus-neural systems that ship in modern developer tools.',
};

export default function CodeIntelligenceBookPage() {
  return (
    <main id="main" data-pillar="code-int">
      <Hero variant="compact" />
      <p className="book-eyebrow">code intelligence · book</p>
      <h1>Code intelligence</h1>
      <p>
        A working notebook on tooling that operates on structure rather than on
        text. The tree, the graph, and the symbol table carry more than the
        source bytes do; static analyzers, language servers, and retrieval
        engines are different ways of asking questions over those structures.
        The chapters develop that thesis from a small parser through a hybrid
        symbolic-plus-neural pipeline.
      </p>
      <ol className="chapter-toc">
        {CHAPTERS.map((c) => (
          <li key={c.slug} className="chapter-toc__item">
            <Link
              href={`/writing/code-intelligence/${c.slug}/`}
              className="chapter-toc__link"
            >
              <span className="chapter-toc__num">{`[ ${c.number} ]`}</span>
              <span className="chapter-toc__body">
                <span className="chapter-toc__title">{c.title}</span>
                <span className="chapter-toc__summary">{c.summary}</span>
                <span className="chapter-toc__reading">{c.reading}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
