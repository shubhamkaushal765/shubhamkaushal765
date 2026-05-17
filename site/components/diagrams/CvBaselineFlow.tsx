/**
 * CvBaselineFlow — inline SVG diagram for the computer vision foundation topic card.
 * Nodes: input -> conv·pool -> conv·pool -> fc -> softmax
 * Accent edge: fc -> softmax (animated dash flow)
 * Stagger delay: 350ms via --flow-delay. Node fill --color-surface-rail.
 */
import type { CSSProperties } from 'react';

export default function CvBaselineFlow() {
  // 5 nodes across 320px viewBox, with consistent spacing
  // Node width: 48, height: 32, gap between nodes: ~12 (arrow space)
  // Centers: 20, 84, 152, 214, 278 — adjust to fit 320 viewBox
  const nodeW = 48;
  const nodeH = 32;
  const nodeY = 74;
  const nodeYMid = nodeY + nodeH / 2; // 90

  const nodes = [
    { x: 12, label: ['input'] },
    { x: 76, label: ['conv', 'pool'] },
    { x: 140, label: ['conv', 'pool'] },
    { x: 204, label: ['fc'] },
    { x: 260, label: ['softmax'] },
  ];

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="cv-title cv-desc"
      style={{ '--flow-delay': '350ms' } as CSSProperties}
    >
      <title id="cv-title">CNN baseline data flow</title>
      <desc id="cv-desc">
        Five nodes from left to right representing a convolutional neural
        network pipeline: input feeds into two conv-pool stages, then a fully
        connected layer, and finally a softmax output. The edge from fc to
        softmax is highlighted as the animated accent data-flow path.
      </desc>

      <defs>
        <marker
          id="cv-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker
          id="cv-arrow-accent"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Render nodes */}
      {nodes.map(({ x, label }) => (
        <g key={x}>
          <rect
            x={x}
            y={nodeY}
            width={nodeW}
            height={nodeH}
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
            fill="var(--color-surface-rail)"
          />
          {label.length === 1 ? (
            <text
              x={x + nodeW / 2}
              y={nodeY + nodeH / 2 + 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="currentColor"
            >
              {label[0]}
            </text>
          ) : (
            <>
              <text
                x={x + nodeW / 2}
                y={nodeY + nodeH / 2 - 2}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="currentColor"
              >
                {label[0]}
              </text>
              <text
                x={x + nodeW / 2}
                y={nodeY + nodeH / 2 + 10}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="currentColor"
              >
                {label[1]}
              </text>
            </>
          )}
        </g>
      ))}

      {/* Plain edges: input->conv1, conv1->conv2, conv2->fc */}
      {[0, 1, 2].map((i) => {
        const fromNode = nodes[i];
        const toNode = nodes[i + 1];
        if (!fromNode || !toNode) return null;
        return (
          <line
            key={i}
            x1={fromNode.x + nodeW}
            y1={nodeYMid}
            x2={toNode.x - 2}
            y2={nodeYMid}
            stroke="currentColor"
            strokeWidth="1.75"
            markerEnd="url(#cv-arrow)"
          />
        );
      })}

      {/* Accent edge: fc -> softmax */}
      <line
        x1={nodes[3]!.x + nodeW}
        y1={nodeYMid}
        x2={nodes[4]!.x - 2}
        y2={nodeYMid}
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeDasharray="6 3"
        markerEnd="url(#cv-arrow-accent)"
        className="flow-edge--animated"
      />
    </svg>
  );
}
