import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ChapterSidebar from '@/components/ChapterSidebar';
import FooterSignature from '@/components/FooterSignature';
import Hero from '@/components/Hero';
import { CHAPTERS } from '../chapters';

import Ch01 from '@/content/photonics/ch01-qumodes-not-qubits.mdx';
import Ch02 from '@/content/photonics/ch02-phase-space.mdx';
import Ch03 from '@/content/photonics/ch03-gaussian-operations.mdx';
import Ch04 from '@/content/photonics/ch04-non-gaussian.mdx';
import Ch05 from '@/content/photonics/ch05-architectures.mdx';

type ChapterComponent = (props: Record<string, unknown>) => React.ReactElement;

const COMPONENTS: Record<string, ChapterComponent> = {
  'qumodes-not-qubits': Ch01 as ChapterComponent,
  'phase-space': Ch02 as ChapterComponent,
  'gaussian-operations': Ch03 as ChapterComponent,
  'non-gaussian': Ch04 as ChapterComponent,
  'architectures': Ch05 as ChapterComponent,
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
  if (chapter === undefined) return { title: 'Photonics | Shubham Kaushal' };
  return {
    title: `${chapter.title} | Photonics | Shubham Kaushal`,
    description: chapter.summary,
  };
}

export default async function PhotonicsChapterPage({
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
    <main id="main" data-pillar="photonics" className="chapter-main">
      <Hero variant="compact" />
      <p className="chapter-eyebrow">
        <Link href="/writing/photonics/">Photonics</Link>
        <span aria-hidden="true"> · </span>
        <span>{`Chapter ${chapter.number}`}</span>
        <span aria-hidden="true"> · </span>
        <span>{chapter.reading}</span>
      </p>
      <div className="chapter-layout">
        <ChapterSidebar
          bookLabel="Photonic QC"
          bookHref="/writing/photonics/"
          basePath="/writing/photonics/"
          chapters={CHAPTERS}
          currentSlug={slug}
        />
        <article className="chapter-article">
          <Body />
        </article>
      </div>
      <nav className="chapter-nav" aria-label="Chapter navigation">
        {prev !== undefined ? (
          <Link href={`/writing/photonics/${prev.slug}/`} className="chapter-nav__prev">
            <span className="chapter-nav__direction">{`← Chapter ${prev.number}`}</span>
            <span className="chapter-nav__title">{prev.title}</span>
          </Link>
        ) : (
          <span className="chapter-nav__placeholder" />
        )}
        {next !== undefined ? (
          <Link href={`/writing/photonics/${next.slug}/`} className="chapter-nav__next">
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
