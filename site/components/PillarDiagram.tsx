type Pillar = {
  x: number;
  color: string;
  label: [string] | [string, string];
};

const PILLARS: Pillar[] = [
  { x: 90,  color: 'var(--color-pillar-code)',      label: ['code', 'intelligence']                  },
  { x: 230, color: 'var(--color-pillar-ml)',        label: ['machine learning', '/ computer vision'] },
  { x: 370, color: 'var(--color-pillar-quantum)',   label: ['quantum', 'computing']                  },
  { x: 510, color: 'var(--color-pillar-photonics)', label: ['photonics']                             },
];

const SHAFT_TOP = 60;
const SHAFT_BOTTOM = 214;
const CAPITAL_HEIGHT = 8;
const SHAFT_WIDTH = 40;
const CAP_WIDTH = 60;
const BASELINE_Y = SHAFT_BOTTOM + CAPITAL_HEIGHT + 4;
const LABEL_FIRST_Y = SHAFT_BOTTOM + CAPITAL_HEIGHT + 22;
const LABEL_LINE_DY = 14;
const VIEWBOX_HEIGHT = 300;

export default function PillarDiagram() {
  return (
    <svg
      className="hero__diagram"
      viewBox={`0 0 640 ${VIEWBOX_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Four pillars: code intelligence, machine learning / computer vision, quantum computing, and photonics."
    >
      <text x="20" y="26" className="hero__diagram-caption">
        shubham kaushal // shubhamkaushal765
      </text>

      <line
        x1="40"
        y1={SHAFT_TOP - 4}
        x2="600"
        y2={SHAFT_TOP - 4}
        stroke="currentColor"
        strokeOpacity="0.18"
        strokeDasharray="2 4"
      />
      <line
        x1="20"
        y1={BASELINE_Y}
        x2="620"
        y2={BASELINE_Y}
        stroke="currentColor"
        strokeOpacity="0.35"
      />

      {PILLARS.map((p) => (
        <g key={p.label.join(' ')}>
          <rect
            x={p.x - CAP_WIDTH / 2}
            y={SHAFT_TOP - CAPITAL_HEIGHT}
            width={CAP_WIDTH}
            height={CAPITAL_HEIGHT}
            fill={p.color}
          />
          <rect
            x={p.x - SHAFT_WIDTH / 2}
            y={SHAFT_TOP}
            width={SHAFT_WIDTH}
            height={SHAFT_BOTTOM - SHAFT_TOP}
            fill={p.color}
            fillOpacity="0.14"
            stroke={p.color}
            strokeOpacity="0.6"
          />
          <line
            x1={p.x - 10}
            y1={SHAFT_TOP}
            x2={p.x - 10}
            y2={SHAFT_BOTTOM}
            stroke={p.color}
            strokeOpacity="0.32"
          />
          <line
            x1={p.x}
            y1={SHAFT_TOP}
            x2={p.x}
            y2={SHAFT_BOTTOM}
            stroke={p.color}
            strokeOpacity="0.32"
          />
          <line
            x1={p.x + 10}
            y1={SHAFT_TOP}
            x2={p.x + 10}
            y2={SHAFT_BOTTOM}
            stroke={p.color}
            strokeOpacity="0.32"
          />
          <rect
            x={p.x - CAP_WIDTH / 2}
            y={SHAFT_BOTTOM}
            width={CAP_WIDTH}
            height={CAPITAL_HEIGHT}
            fill={p.color}
          />
          <text
            x={p.x}
            y={LABEL_FIRST_Y}
            textAnchor="middle"
            className="hero__diagram-label"
            fill={p.color}
          >
            <tspan x={p.x}>{p.label[0]}</tspan>
            {p.label[1] !== undefined && (
              <tspan x={p.x} dy={LABEL_LINE_DY}>{p.label[1]}</tspan>
            )}
          </text>
        </g>
      ))}

      <text x="20" y={VIEWBOX_HEIGHT - 10} className="hero__diagram-caption">
        parsers -&gt; qubits. rust at the bottom. python at the top.
      </text>
    </svg>
  );
}
