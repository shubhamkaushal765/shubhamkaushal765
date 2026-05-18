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
            <span className="hero-tagline__pillar--code">parsers</span>
            {' '}
            <span className="hero-tagline__arrow">-&gt;</span>
            {' '}
            <span className="hero-tagline__pillar--quantum">qubits.</span>
          </p>
          <p className="hero__lede">
            Independent engineer and researcher across code intelligence,
            machine learning, and quantum computing — building structure-aware
            tooling that respects what the data actually is.
          </p>
          <StatsLine />
        </div>
        <PillarDiagram />
      </div>
    </header>
  );
}
