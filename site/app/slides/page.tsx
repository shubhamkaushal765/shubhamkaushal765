import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { deckUrl } from '@/lib/site-config';
import { SLIDES } from './decks';

export const metadata: Metadata = {
  title: 'Slides | Shubham Kaushal',
  description:
    'Interactive reveal.js slide decks with SVG animations, diagrams, and tables across photonics, quantum computing, machine learning, and code intelligence.',
};

export default function SlidesPage() {
  return (
    <main id="main">
      <Hero variant="compact" />
      <h1>Slides</h1>
      <p>
        Interactive decks built with reveal.js. Each one leans on animated SVG
        diagrams, stepwise reveals, and tables rather than bullet walls, so a
        topic can be explained on screen the way it would be at a whiteboard.
        Folders group the decks of one series; standalone decks stand on their
        own. Arrow keys move between slides; press <span className="kbd">?</span> inside
        a deck for the full key map.
      </p>
      <ol className="blog-list">
        {SLIDES.map((entry) => {
          if (entry.kind === 'folder') {
            return (
              <li key={entry.slug} className="blog-entry" data-pillar={entry.pillar}>
                <div className="blog-entry__meta">
                  <time className="blog-entry__date">{entry.date}</time>
                  <span className="blog-entry__pillar">{entry.pillarLabel}</span>
                  <span className="blog-entry__status">{entry.status}</span>
                  <span className="blog-entry__status">folder</span>
                </div>
                <h3 className="blog-entry__title">
                  <Link href={`/slides/${entry.slug}/`} className="blog-entry__title-link">
                    {entry.title}
                  </Link>
                </h3>
                <p className="blog-entry__summary">{entry.summary}</p>
                <ol className="blog-entry__chapters">
                  {entry.decks.map((deck, j) => (
                    <li key={deck.slug} className="blog-entry__chapter">
                      <span className="blog-entry__chapter-num">{`[ ${String(j + 1).padStart(2, '0')} ]`}</span>
                      <a
                        href={deckUrl(entry.slug, deck.slug)}
                        className="blog-entry__chapter-title blog-entry__chapter-link"
                      >
                        {deck.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </li>
            );
          }
          return (
            <li key={entry.deck.slug} className="blog-entry" data-pillar={entry.pillar}>
              <div className="blog-entry__meta">
                <time className="blog-entry__date">{entry.date}</time>
                <span className="blog-entry__pillar">{entry.pillarLabel}</span>
                <span className="blog-entry__status">{entry.status}</span>
                <span className="blog-entry__status">deck</span>
              </div>
              <h3 className="blog-entry__title">
                <a href={deckUrl(entry.folder, entry.deck.slug)} className="blog-entry__title-link">
                  {entry.deck.title}
                </a>
              </h3>
              <p className="blog-entry__summary">{entry.deck.summary}</p>
            </li>
          );
        })}
      </ol>
      <FooterSignature />
    </main>
  );
}
