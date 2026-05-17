/**
 * TellMeWhyFlow — inline SVG diagram for the tell-me-why RAG topic card.
 * Top row:    corpus -> parser -> embed -> Chroma
 * Bottom row: query -> Ollama
 * Retrieval arc: Ollama curves up into Chroma
 * Accent edge: query -> Ollama (animated dash flow)
 * Stagger delay: 650ms via --flow-delay. Node fill --color-surface-rail.
 */
import type { CSSProperties } from 'react';

export default function TellMeWhyFlow() {
  const nodeW = 56;
  const nodeH = 30;

  // Top row y
  const topY = 40;
  const topYMid = topY + nodeH / 2; // 55

  // Bottom row y
  const botY = 112;
  const botYMid = botY + nodeH / 2; // 127

  // Top row nodes
  const topNodes = [
    { x: 8, label: 'corpus' },
    { x: 80, label: 'parser' },
    { x: 152, label: 'embed' },
    { x: 224, label: 'Chroma' },
  ];

  // Bottom row nodes — left-aligned under corpus/parser area
  const botNodes = [
    { x: 8, label: 'query' },
    { x: 80, label: 'Ollama' },
  ];

  // Chroma node center x
  const chromaCx = 224 + nodeW / 2; // 252
  // Ollama node right edge x
  const ollamaRightX = 80 + nodeW; // 136

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="tmw-title tmw-desc"
      style={{ '--flow-delay': '650ms' } as CSSProperties}
    >
      <title id="tmw-title">tell-me-why RAG pipeline</title>
      <desc id="tmw-desc">
        Two rows of nodes. Top row from left to right: corpus, parser, embed,
        Chroma — the ingestion pipeline. Bottom row: query feeds into Ollama.
        A curved arc connects Ollama up to the Chroma vector store, representing
        the retrieval path. The edge from query to Ollama is highlighted as the
        animated accent data-flow path.
      </desc>

      <defs>
        <marker
          id="tmw-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker
          id="tmw-arrow-accent"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="var(--color-accent)" />
        </marker>
      </defs>

      {/* Top row nodes */}
      {topNodes.map(({ x, label }) => (
        <g key={`top-${label}`}>
          <rect
            x={x}
            y={topY}
            width={nodeW}
            height={nodeH}
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
            fill="var(--color-surface-rail)"
          />
          <text
            x={x + nodeW / 2}
            y={topY + nodeH / 2 + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="currentColor"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Top row plain edges: corpus->parser, parser->embed, embed->Chroma */}
      {[0, 1, 2].map((i) => {
        const from = topNodes[i];
        const to = topNodes[i + 1];
        if (!from || !to) return null;
        return (
          <line
            key={`top-edge-${i}`}
            x1={from.x + nodeW}
            y1={topYMid}
            x2={to.x - 2}
            y2={topYMid}
            stroke="currentColor"
            strokeWidth="1.75"
            markerEnd="url(#tmw-arrow)"
          />
        );
      })}

      {/* Bottom row nodes */}
      {botNodes.map(({ x, label }) => (
        <g key={`bot-${label}`}>
          <rect
            x={x}
            y={botY}
            width={nodeW}
            height={nodeH}
            rx="3"
            stroke="currentColor"
            strokeWidth="1.75"
            fill="var(--color-surface-rail)"
          />
          <text
            x={x + nodeW / 2}
            y={botY + nodeH / 2 + 4}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="currentColor"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Accent edge: query -> Ollama */}
      <line
        x1={botNodes[0]!.x + nodeW}
        y1={botYMid}
        x2={botNodes[1]!.x - 2}
        y2={botYMid}
        stroke="var(--color-accent)"
        strokeWidth="1.75"
        strokeDasharray="6 3"
        markerEnd="url(#tmw-arrow-accent)"
        className="flow-edge--animated"
      />

      {/* Retrieval arc: Ollama -> Chroma (curved path going right and up) */}
      {/* Start: right edge of Ollama (136, botYMid=127), End: bottom of Chroma (chromaCx=252, topY+nodeH=70) */}
      <path
        d={`M ${ollamaRightX} ${botYMid} C ${ollamaRightX + 60} ${botYMid} ${chromaCx} ${botYMid - 20} ${chromaCx} ${topY + nodeH + 2}`}
        stroke="currentColor"
        strokeWidth="1.75"
        markerEnd="url(#tmw-arrow)"
      />

      {/* Label for retrieval arc */}
      <text
        x="200"
        y="103"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--color-text-footnote)"
      >
        retrieval
      </text>
    </svg>
  );
}
