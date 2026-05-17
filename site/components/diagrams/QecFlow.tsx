/**
 * QecFlow — inline SVG diagram for the TransformerQEC topic card.
 * Nodes: syndrome graph -> transformer encoder -> corrected bit
 * Accent edge: syndrome graph -> transformer encoder (animated dash flow)
 */

export default function QecFlow() {
  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="qec-title qec-desc"
    >
      <title id="qec-title">TransformerQEC data flow</title>
      <desc id="qec-desc">
        Three nodes from left to right: syndrome graph feeds into a transformer
        encoder annotated with stim sim and PyTorch, which outputs a corrected
        bit. The edge from syndrome graph to transformer encoder is highlighted
        as the animated accent data-flow path.
      </desc>

      <defs>
        <marker
          id="qec-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker
          id="qec-arrow-accent"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Node 1: syndrome graph — x=16, y=65, w=80, h=36 */}
      <rect
        x="16"
        y="65"
        width="80"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-surface-card)"
      />
      <text
        x="56"
        y="80"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        syndrome
      </text>
      <text
        x="56"
        y="93"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        graph
      </text>

      {/* Accent edge: syndrome graph -> transformer encoder */}
      <line
        x1="96"
        y1="83"
        x2="118"
        y2="83"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        markerEnd="url(#qec-arrow-accent)"
        className="flow-edge--animated"
      />

      {/* Node 2: transformer encoder — x=120, y=55, w=96, h=56 */}
      <rect
        x="120"
        y="55"
        width="96"
        height="56"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-surface-card)"
      />
      <text
        x="168"
        y="75"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        transformer
      </text>
      <text
        x="168"
        y="88"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        encoder
      </text>
      {/* Annotation above encoder node */}
      <text
        x="168"
        y="48"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--color-text-footnote)"
      >
        (stim sim · pyTorch)
      </text>

      {/* Plain edge: transformer encoder -> corrected bit */}
      <line
        x1="216"
        y1="83"
        x2="238"
        y2="83"
        stroke="currentColor"
        strokeWidth="1.5"
        markerEnd="url(#qec-arrow)"
      />

      {/* Node 3: corrected bit — x=240, y=65, w=64, h=36 */}
      <rect
        x="240"
        y="65"
        width="64"
        height="36"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-surface-card)"
      />
      <text
        x="272"
        y="80"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        corrected
      </text>
      <text
        x="272"
        y="93"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="currentColor"
      >
        bit
      </text>
    </svg>
  );
}
