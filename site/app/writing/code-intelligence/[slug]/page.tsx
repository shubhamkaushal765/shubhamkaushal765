import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChapterSidebar from '@/components/ChapterSidebar';
import FooterSignature from '@/components/FooterSignature';
import Hero from '@/components/Hero';
import { CHAPTERS } from '../chapters';

import Ch01 from '@/content/code-intelligence/ch01-structure-not-surface.mdx';
import Ch02 from '@/content/code-intelligence/ch02-lexing-and-parsing.mdx';
import Ch03 from '@/content/code-intelligence/ch03-control-flow-and-dataflow.mdx';
import Ch04 from '@/content/code-intelligence/ch04-language-servers.mdx';
import Ch05 from '@/content/code-intelligence/ch05-symbolic-and-neural.mdx';

type ChapterComponent = (props: Record<string, unknown>) => React.ReactElement;

const COMPONENTS: Record<string, ChapterComponent> = {
  'structure-not-surface': Ch01 as ChapterComponent,
  'lexing-and-parsing': Ch02 as ChapterComponent,
  'control-flow-and-dataflow': Ch03 as ChapterComponent,
  'language-servers': Ch04 as ChapterComponent,
  'symbolic-and-neural': Ch05 as ChapterComponent,
};

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  if (chapter === undefined) return { title: 'Code intelligence | Shubham Kaushal' };
  return {
    title: `${chapter.title} | Code intelligence | Shubham Kaushal`,
    description: chapter.summary,
  };
}

export default async function CodeIntelligenceChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = CHAPTERS.find((c) => c.slug === slug);
  const Body = COMPONENTS[slug];
  if (chapter === undefined || Body === undefined) {
    notFound();
  }

  const index = CHAPTERS.findIndex((c) => c.slug === slug);
  const prev = index > 0 ? CHAPTERS[index - 1] : undefined;
  const next = index >= 0 && index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : undefined;

  return (
    <main id="main" data-pillar="code-int" className="chapter-main">
      <Hero variant="compact" />
      <p className="chapter-eyebrow">
        <Link href="/writing/code-intelligence/">Code intelligence</Link>
        <span aria-hidden="true"> · </span>
        <span>{`Chapter ${chapter.number}`}</span>
        <span aria-hidden="true"> · </span>
        <span>{chapter.reading}</span>
      </p>
      <div className="chapter-layout">
        <ChapterSidebar
          bookLabel="Code intelligence"
          bookHref="/writing/code-intelligence/"
          basePath="/writing/code-intelligence/"
          chapters={CHAPTERS}
          currentSlug={slug}
        />
        <article className="chapter-article">
          <Body />
        </article>
      </div>
      <nav className="chapter-nav" aria-label="Chapter navigation">
        {prev !== undefined ? (
          <Link
            href={`/writing/code-intelligence/${prev.slug}/`}
            className="chapter-nav__prev"
          >
            <span className="chapter-nav__direction">{`← Chapter ${prev.number}`}</span>
            <span className="chapter-nav__title">{prev.title}</span>
          </Link>
        ) : (
          <span className="chapter-nav__placeholder" />
        )}
        {next !== undefined ? (
          <Link
            href={`/writing/code-intelligence/${next.slug}/`}
            className="chapter-nav__next"
          >
            <span className="chapter-nav__direction">{`Chapter ${next.number} →`}</span>
            <span className="chapter-nav__title">{next.title}</span>
          </Link>
        ) : (
          <span className="chapter-nav__placeholder" />
        )}
      </nav>
      <FooterSignature />
    </main>
  );
}
