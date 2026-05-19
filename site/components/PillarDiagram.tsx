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

const PILLAR_CENTER_Y = 137;
const LABEL_FIRST_Y = 100;
const LABEL_LINE_DY = 14;

export default function PillarDiagram() {
  return (
    <svg
      className="hero__diagram"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 300"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="pillars-title pillars-desc"
    >
      <title id="pillars-title">Four pillars</title>
      <desc id="pillars-desc">
        Four colored columns representing the dimensions this site works across:
        code intelligence, machine learning and computer vision, quantum
        computing, and photonics.
      </desc>

      <defs>
        <g id="pillar-shape">
          <rect x="-30" y="-85" width="60" height="8" fill="currentColor" />
          <rect
            x="-20"
            y="-77"
            width="40"
            height="154"
            fill="currentColor"
            fillOpacity="0.14"
            stroke="currentColor"
            strokeOpacity="0.6"
          />
          <line x1="-10" y1="-77" x2="-10" y2="77" stroke="currentColor" strokeOpacity="0.32" />
          <line x1="0"   y1="-77" x2="0"   y2="77" stroke="currentColor" strokeOpacity="0.32" />
          <line x1="10"  y1="-77" x2="10"  y2="77" stroke="currentColor" strokeOpacity="0.32" />
          <rect x="-30" y="77" width="60" height="8" fill="currentColor" />
        </g>
      </defs>

      <g className="hero__diagram-meta" aria-hidden="true">
        <text x="20" y="26" className="hero__diagram-caption">
          shubham kaushal // shubhamkaushal765
        </text>
        <line
          x1="40"
          y1="56"
          x2="600"
          y2="56"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeDasharray="2 4"
        />
        <line
          x1="20"
          y1="226"
          x2="620"
          y2="226"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <text x="20" y="290" className="hero__diagram-caption">
          parsers -&gt; qubits. rust at the bottom. python at the top.
        </text>
      </g>

      <g className="hero__diagram-pillars">
        {PILLARS.map((p) => (
          <g
            key={p.label.join(' ')}
            transform={`translate(${p.x} ${PILLAR_CENTER_Y})`}
            style={{ color: p.color }}
          >
            <use href="#pillar-shape" />
            <text
              y={LABEL_FIRST_Y}
              textAnchor="middle"
              fill="currentColor"
              className="hero__diagram-label"
            >
              <tspan x="0">{p.label[0]}</tspan>
              {p.label[1] !== undefined && (
                <tspan x="0" dy={LABEL_LINE_DY}>{p.label[1]}</tspan>
              )}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
