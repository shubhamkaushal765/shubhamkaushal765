import Link from 'next/link';
import PillarDiagram from './PillarDiagram';
import SectionRule from './SectionRule';
import StageObserver from './StageObserver';

const NODES = ['let', 'y', '+', 'x', '1'] as const;
const STAGE_CAPTIONS = ['01  ast', '02  embedding graph', '03  qubits', '04  waveguide'];

type Step = {
  n: number;
  pillar: 'code-int' | 'ml' | 'quantum' | 'photonics';
  title: string;
  eyebrow: string;
  body: React.ReactNode;
  link: React.ReactNode;
  aside: string;
};

const STEPS: Step[] = [
  {
    n: 1,
    pillar: 'code-int',
    title: 'Code intelligence',
    eyebrow: '01 · ast',
    body: (
      <>
        <code>zuit</code>, Rust. Multi-language static analysis emitting SARIF 2.1.0 with CWE and
        OWASP anchors.
      </>
    ),
    link: <a href="https://github.com/shubhamkaushal765/zuit">zuit on GitHub</a>,
    aside: 'Prefers a parser error with a line number over a compliment.',
  },
  {
    n: 2,
    pillar: 'ml',
    title: 'Machine learning / computer vision',
    eyebrow: '02 · embedding graph',
    body: (
      <>
        <code>tell-me-why</code>, local-first. RAG over source code; Ollama + Chroma +
        sentence-transformers; nothing leaves the machine.
      </>
    ),
    link: <a href="https://github.com/shubhamkaushal765/tell-me-why">tell-me-why on GitHub</a>,
    aside: 'Trusts a boring baseline before an exciting leaderboard.',
  },
  {
    n: 3,
    pillar: 'quantum',
    title: 'Quantum computing',
    eyebrow: '03 · qubits',
    body: (
      <>
        <code>TransformerQEC</code>, surface code. Transformer-based decoder; syndrome graphs as
        sequences; Stim for simulation, PyTorch Lightning for training.
      </>
    ),
    link: <a href="https://github.com/shubhamkaushal765/TransformerQEC">TransformerQEC on GitHub</a>,
    aside: 'Counts a syndrome graph as light reading.',
  },
  {
    n: 4,
    pillar: 'photonics',
    title: 'Photonics',
    eyebrow: '04 · waveguide',
    body: (
      <>
        Continuous-variable quantum computing. Qumodes, Gaussian operations, measurement-induced
        nonlinearity; where the architecture diverges from gate-model superconducting qubits.
      </>
    ),
    link: <Link href="/writing/photonics/">the photonics series</Link>,
    aside: 'Still a little delighted that a beam splitter is a 2x2 matrix.',
  },
];

// Pulse path: input (top) -> coupler -> top arm -> coupler -> output (top).
const PULSE =
  'M52,96 C72,96 84,112 104,112 H124 C140,112 146,88 164,88 H176 C194,88 200,112 216,112 H236 C256,112 264,96 284,96';

function Figure() {
  return (
    <figure className="parse-story__figure">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 240"
        preserveAspectRatio="xMidYMid meet"
        role="img"
      >
        <title>From a line of code to qubits and light</title>
        <desc>
          Four stages, in order. One: a line of code, let y = x + 1, as a syntax tree of five nodes
          with let at the root. Two: the same five nodes regroup into an embedding graph with
          connecting edges. Three: three of the nodes become qubits on three horizontal wires,
          labelled zero, one and plus, with a controlled-not and a Hadamard gate. Four: the wires
          become a photonic waveguide circuit, two couplers and a phase shifter forming a
          Mach-Zehnder interferometer, with a pulse of light travelling through it.
        </desc>

        {/* stage 1: source text */}
        <g className="parse-story__layer" data-show="1">
          <text className="ps-code" x="160" y="30" textAnchor="middle">
            let y = x + 1;
          </text>
        </g>

        {/* stage 1: tree edges */}
        <g className="parse-story__layer ps-edges" data-show="1">
          <line x1="140" y1="78" x2="80" y2="136" />
          <line x1="140" y1="78" x2="200" y2="136" />
          <line x1="200" y1="136" x2="160" y2="196" />
          <line x1="200" y1="136" x2="240" y2="196" />
        </g>

        {/* stage 2: graph edges */}
        <g className="parse-story__layer ps-edges" data-show="2">
          <line x1="160" y1="52" x2="74" y2="116" />
          <line x1="160" y1="52" x2="246" y2="116" />
          <line x1="74" y1="116" x2="246" y2="116" />
          <line x1="74" y1="116" x2="108" y2="192" />
          <line x1="246" y1="116" x2="212" y2="192" />
          <line x1="108" y1="192" x2="212" y2="192" />
        </g>

        {/* stage 3: wires and gates */}
        <g className="parse-story__layer" data-show="3">
          <g className="ps-wires">
            <line x1="56" y1="84" x2="292" y2="84" />
            <line x1="56" y1="130" x2="292" y2="130" />
            <line x1="56" y1="176" x2="292" y2="176" />
            <line x1="176" y1="130" x2="176" y2="176" />
          </g>
          <g className="ps-labels">
            <text x="34" y="88" textAnchor="middle">{'|0>'}</text>
            <text x="34" y="134" textAnchor="middle">{'|1>'}</text>
            <text x="34" y="180" textAnchor="middle">{'|+>'}</text>
          </g>
          <circle className="ps-dot" cx="176" cy="176" r="4.5" />
          <circle className="ps-box" cx="176" cy="130" r="9" />
          <line className="ps-wires" x1="176" y1="121" x2="176" y2="139" />
          <line className="ps-wires" x1="167" y1="130" x2="185" y2="130" />
          <rect className="ps-box" x="212" y="72" width="24" height="24" rx="2" />
          <text className="ps-labels" x="224" y="88.5" textAnchor="middle">H</text>
        </g>

        {/* stage 4: waveguides */}
        <g className="parse-story__layer" data-show="4">
          <g className="ps-guide">
            <path d="M52,96 C72,96 84,112 104,112 H124" />
            <path d="M216,112 H236 C256,112 264,96 284,96" />
            <path d="M52,144 C72,144 84,128 104,128 H124" />
            <path d="M216,128 H236 C256,128 264,144 284,144" />
            <path d="M124,112 C140,112 146,88 164,88 H176 C194,88 200,112 216,112" />
            <path d="M124,128 C140,128 146,152 164,152 H176 C194,152 200,128 216,128" />
          </g>
          <rect className="ps-box" x="158" y="82" width="24" height="12" rx="2" />
          <g className="ps-labels ps-labels--sm">
            <text x="114" y="150" textAnchor="middle">2x2</text>
            <text x="226" y="150" textAnchor="middle">2x2</text>
            <text x="170" y="72" textAnchor="middle">phase</text>
          </g>
          <path className="ps-pulse" d={PULSE} pathLength={100} />
        </g>

        {/* nodes: translate in viewBox units, no rotate or scale */}
        {NODES.map((id) => (
          <g key={id} className="parse-story__node" data-node={id}>
            <circle r="15" />
            <text textAnchor="middle" y="4.5">{id}</text>
          </g>
        ))}

        {/* stage captions and progress ticks */}
        {STAGE_CAPTIONS.map((c, i) => (
          <text
            key={c}
            className="parse-story__layer ps-caption"
            data-show={String(i + 1)}
            x="14"
            y="232"
          >
            {c}
          </text>
        ))}
        <g className="ps-ticks">
          {[1, 2, 3, 4].map((n) => (
            <rect key={n} data-i={n} x={224 + (n - 1) * 22} y="226" width="16" height="3" rx="1" />
          ))}
        </g>
      </svg>
    </figure>
  );
}

export default function ParseStory() {
  return (
    <section id="four-pillars" className="parse-story" data-stage="1" aria-label="Four pillars, from parsers to qubits">
      <StageObserver />
      <SectionRule number="01">Four pillars</SectionRule>
      <div className="parse-story__layout">
        <Figure />
        <div className="parse-story__steps">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="parse-story__step"
              data-step={s.n}
              data-pillar={s.pillar}
            >
              <span className="parse-story__eyebrow">{s.eyebrow}</span>
              <h3>{s.title}</h3>
              <p className="parse-story__body">{s.body}</p>
              <span className="parse-story__link">{s.link}</span>
              <p className="aside">{s.aside}</p>
            </article>
          ))}
        </div>
      </div>
      <figure className="parse-story__map">
        <PillarDiagram />
        <figcaption>the map</figcaption>
      </figure>
    </section>
  );
}
