/**
 * TellMeWhyFlow — inline SVG diagram for the tell-me-why RAG card.
 *
 * Top row: corpus -> parser -> embed -> Chroma (ingestion). Bottom row:
 * query -> Ollama. A curved retrieval arc returns from Chroma to Ollama.
 * The embed node shows a vector ripple, Chroma shows nearest-neighbour
 * dots, and a particle travels the retrieval arc.
 */
import type { CSSProperties } from 'react';

export default function TellMeWhyFlow() {
  const nodeW = 56;
  const nodeH = 28;

  const topY = 36;
  const topYMid = topY + nodeH / 2;

  const botY = 116;
  const botYMid = botY + nodeH / 2;

  const topNodes = [
    { x: 8, label: 'corpus' },
    { x: 80, label: 'parser' },
    { x: 152, label: 'embed' },
    { x: 224, label: 'Chroma' },
  ];

  const botNodes = [
    { x: 8, label: 'query' },
    { x: 80, label: 'Ollama' },
  ];

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="tmw-title tmw-desc"
      style={{ '--flow-delay': '450ms' } as CSSProperties}
    >
      <title id="tmw-title">tell-me-why RAG pipeline</title>
      <desc id="tmw-desc">
        Top row: corpus, parser, embed, Chroma — the ingestion pipeline.
        Bottom row: query feeds Ollama. A curved arc connects Chroma back
        down to Ollama for retrieval.
      </desc>

      <defs>
        <marker id="tmw-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker id="tmw-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--pillar-color, var(--color-accent))" />
        </marker>
      </defs>

      {/* Top row nodes */}
      {topNodes.map(({ x, label }, i) => (
        <g key={`top-${label}`}>
          <rect
            x={x}
            y={topY}
            width={nodeW}
            height={nodeH}
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="var(--color-surface-rail)"
            className="flow-node--pulse"
            style={{ animationDelay: `${i * 200}ms` } as CSSProperties}
          />
          <text
            x={x + nodeW / 2}
            y={topY + nodeH / 2 + 3}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fill="currentColor"
          >
            {label}
          </text>
        </g>
      ))}

      {/* Vector ripple inside embed node */}
      <g transform={`translate(${152 + nodeW / 2}, ${topYMid})`}>
        <circle r="6" stroke="var(--pillar-color, var(--color-accent))" strokeWidth="0.75" fill="none" opacity="0.6">
          <animate attributeName="r" values="2;10;2" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="var(--pillar-color, var(--color-accent))" />
      </g>

      {/* Nearest-neighbour dots inside Chroma */}
      {[
        { dx: -16, dy: -6 },
        { dx: -8, dy: 4 },
        { dx: 4, dy: -3 },
        { dx: 12, dy: 5 },
        { dx: 16, dy: -4 },
      ].map((d, i) => (
        <circle
          key={`nn-${i}`}
          cx={224 + nodeW / 2 + d.dx}
          cy={topYMid + d.dy}
          r="1.5"
          fill={i === 2 ? 'var(--pillar-color, var(--color-accent))' : 'currentColor'}
          opacity={i === 2 ? 1 : 0.5}
          className={i === 2 ? 'flow-node--pulse' : ''}
          style={i === 2 ? { animationDelay: '1200ms' } as CSSProperties : undefined}
        />
      ))}

      {/* Top row plain edges */}
      {[0, 1].map((i) => {
        const from = topNodes[i]!;
        const to = topNodes[i + 1]!;
        return (
          <line
            key={`top-edge-${i}`}
            x1={from.x + nodeW}
            y1={topYMid}
            x2={to.x - 2}
            y2={topYMid}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#tmw-arrow)"
            className="flow-edge--animated"
            style={{ '--dash-len': 18, '--flow-delay': `${300 + i * 200}ms` } as CSSProperties}
          />
        );
      })}

      {/* embed -> Chroma (accent) */}
      <line
        x1={topNodes[2]!.x + nodeW}
        y1={topYMid}
        x2={topNodes[3]!.x - 2}
        y2={topYMid}
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        strokeDasharray="5 3"
        markerEnd="url(#tmw-arrow-accent)"
        className="flow-edge--animated"
        style={{ '--dash-len': 20, '--flow-delay': '700ms' } as CSSProperties}
      />

      {/* Bottom row nodes */}
      {botNodes.map(({ x, label }, i) => (
        <g key={`bot-${label}`}>
          <rect
            x={x}
            y={botY}
            width={nodeW}
            height={nodeH}
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="var(--color-surface-rail)"
            className="flow-node--pulse"
            style={{ animationDelay: `${800 + i * 200}ms` } as CSSProperties}
          />
          <text
            x={x + nodeW / 2}
            y={botY + nodeH / 2 + 3}
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
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        strokeDasharray="5 3"
        markerEnd="url(#tmw-arrow-accent)"
        className="flow-edge--animated"
        style={{ '--dash-len': 18, '--flow-delay': '1100ms' } as CSSProperties}
      />

      {/* Retrieval arc: Chroma -> Ollama (down + left) */}
      <path
        d={`M ${224 + nodeW / 2} ${topY + nodeH} C ${224 + nodeW / 2} ${100} ${80 + nodeW} ${100} ${80 + nodeW} ${botYMid}`}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        markerEnd="url(#tmw-arrow)"
        className="flow-edge--animated"
        style={{ '--dash-len': 200, '--flow-delay': '1300ms' } as CSSProperties}
      />

      {/* Traveling retrieval particle */}
      <circle
        r="2"
        className="flow-particle"
        style={{
          offsetPath: `path("M ${224 + nodeW / 2} ${topY + nodeH} C ${224 + nodeW / 2} ${100} ${80 + nodeW} ${100} ${80 + nodeW} ${botYMid}")`,
          offsetDistance: '0%',
          '--particle-delay': '1300ms',
        } as CSSProperties}
      />

      {/* Retrieval label */}
      <text
        x="180"
        y="102"
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="7.5"
        fill="var(--color-text-footnote)"
      >
        retrieval
      </text>

      {/* "local-first" badge */}
      <rect x="160" y="158" width="68" height="14" rx="7" stroke="var(--pillar-color, var(--color-accent))" strokeWidth="0.75" fill="none" />
      <text x="194" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--pillar-color, var(--color-accent))">
        local-first
      </text>
    </svg>
  );
}
