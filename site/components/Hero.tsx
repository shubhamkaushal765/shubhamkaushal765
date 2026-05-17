import PillarDiagram from './PillarDiagram';
import Nav from './Nav';
import StatsLine from './StatsLine';

type Variant = 'full' | 'compact';

export default function Hero({ variant = 'full' }: { variant?: Variant }) {
  if (variant === 'compact') {
    return (
      <header>
        <PillarDiagram />
        <Nav />
      </header>
    );
  }
  return (
    <header>
      <PillarDiagram />
      <p className="hero-tagline" style={{ fontFamily: 'var(--font-mono)', marginTop: 'var(--spacing-3)' }}>
        <span className="hero-tagline__pillar--code">parsers</span>
        {' '}
        <span className="hero-tagline__arrow">-&gt;</span>
        {' '}
        <span className="hero-tagline__pillar--quantum">qubits.</span>
      </p>
      <StatsLine />
      <Nav />
    </header>
  );
}
