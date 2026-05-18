import PillarDiagram from './PillarDiagram';
import Nav from './Nav';
import StatsLine from './StatsLine';

type Variant = 'full' | 'compact';

export default function Hero({ variant = 'full' }: { variant?: Variant }) {
  if (variant === 'compact') {
    return (
      <header>
        <Nav />
      </header>
    );
  }

  return (
    <header>
      <Nav />
      <div className="hero hero--full">
        <div className="hero__left">
          <p className="hero-tagline">
            <span className="prompt-glyph" aria-hidden="true">$</span>
            <span className="hero-tagline__pillar--code">parsers</span>
            {' '}
            <span className="hero-tagline__arrow">-&gt;</span>
            {' '}
            <span className="hero-tagline__pillar--quantum">qubits.</span>
            <span className="blink-cursor" aria-hidden="true" />
          </p>
          <p className="hero__lede">
            Independent engineer and researcher across code intelligence,
            machine learning, and quantum computing — building structure-aware
            tooling that respects what the data actually is.
            <span className="aside">
              Yes, that&apos;s a strange shelf of interests. Each one taught me a
              different lesson about respecting structure; they get along better
              than you&apos;d think.
            </span>
          </p>
          <StatsLine />
        </div>
        <PillarDiagram />
      </div>
    </header>
  );
}
