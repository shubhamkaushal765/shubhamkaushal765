import PillarDiagram from './PillarDiagram';
import Nav from './Nav';

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
        parsers -&gt; qubits.
      </p>
      <Nav />
    </header>
  );
}
