import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { deckUrl } from '@/lib/site-config';
import { PHOTONIC_IC_DECKS } from '../decks';

const FOLDER = 'photonic-integrated-circuits';

export const metadata: Metadata = {
  title: 'Photonic integrated circuits | Slides | Shubham Kaushal',
  description:
    'A lecture-by-lecture deck series on photonic integrated circuits: what gets integrated, why light needs a waveguide once it leaves the optical table, and how the component physics builds up to a circuit.',
};

export default function PhotonicIcSlidesPage() {
  return (
    <main id="main" data-pillar="photonics">
      <Hero variant="compact" />
      <p className="book-eyebrow">photonics · slides</p>
      <h1>Photonic integrated circuits</h1>
      <p>
        A deck series that follows the NPTEL lecture sequence on photonic
        integrated circuits. The first deck is the introduction: what
        integrated photonics means, the three inventions that turned optics
        into photonics, the sub-fields photonics absorbed on the way, and the
        one design move (guided waves on a planar substrate) that makes it a
        circuit. The second follows the technology evolution: the key events
        from the first planar waveguide to commercial silicon photonics, and
        the communication and compute demands behind them. Later decks pick
        up the component physics.
      </p>
      <ol className="chapter-toc">
        {PHOTONIC_IC_DECKS.map((d) => (
          <li key={d.slug} className="chapter-toc__item">
            <a href={deckUrl(FOLDER, d.slug)} className="chapter-toc__link">
              <span className="chapter-toc__num">{`[ ${d.number} ]`}</span>
              <span className="chapter-toc__body">
                <span className="chapter-toc__title">{d.title}</span>
                <span className="chapter-toc__summary">{d.summary}</span>
                <span className="chapter-toc__reading">
                  {d.length}
                  {d.source ? ` · adapted from ${d.source.label}` : ''}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
