import PillarDiagram from './PillarDiagram';
import Nav from './Nav';
import StatsLine from './StatsLine';
import PromptGlyph from './PromptGlyph';

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
            <PromptGlyph />
            <span className="hero-tagline__pillar--code">parsers</span>
            <span className="hero-tagline__arrow">-&gt;</span>
            <span className="hero-tagline__pillar--quantum">qubits.</span>
            <span className="blink-cursor" aria-hidden="true" />
          </p>
          <p className="hero__lede drop-cap">
            Independent engineer and researcher across code intelligence,
            machine learning / computer vision, quantum computing, and
            photonics. I build structure-aware tooling that respects what
            the data actually is. The connecting thread is operating on
            <em> symbolic structure</em>: ASTs, code embeddings, syndrome
            graphs, qumodes. Rust at the bottom for compiler-grade tooling;
            Python at the top for research.
            <span className="aside">
              Yes, it&apos;s a strange shelf of interests. Each one taught me a
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
