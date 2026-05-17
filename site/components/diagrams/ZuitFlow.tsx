/**
 * ZuitFlow — inline SVG diagram for the zuit code intelligence topic card.
 * Nodes: source -> parser -> AST -> analyzers -> SARIF
 * Accent edge: parser -> AST (animated dash flow)
 */

export default function ZuitFlow() {
  const nodeW = 52;
  const nodeH = 32;
  const nodeY = 72;
  const nodeYMid = nodeY + nodeH / 2; // 88

  const nodes = [
    { x: 8, label: ['source'] },
    { x: 72, label: ['parser'] },
    { x: 136, label: ['AST'] },
    { x: 200, label: ['analyzers'] },
    { x: 256, label: ['SARIF'] },
  ];

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="zuit-title zuit-desc"
    >
      <title id="zuit-title">zuit static analysis pipeline</title>
      <desc id="zuit-desc">
        Five nodes from left to right representing the zuit code intelligence
        pipeline: source code is fed to a parser which produces an AST, then
        five dimension analyzers process the AST and emit a SARIF 2.1.0 report.
        The edge from parser to AST is highlighted as the animated accent
        data-flow path. The analyzers node is annotated with five dimensions
        below it.
      </desc>

      <defs>
        <marker
          id="zuit-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker
          id="zuit-arrow-accent"
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
            strokeWidth="1.5"
            fill="var(--color-surface-card)"
          />
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
        </g>
      ))}

      {/* Annotation below analyzers node */}
      <text
        x={nodes[3]!.x + nodeW / 2}
        y={nodeY + nodeH + 14}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fill="var(--color-text-footnote)"
      >
        (5 dimensions)
      </text>

      {/* Plain edges: source->parser */}
      <line
        x1={nodes[0]!.x + nodeW}
        y1={nodeYMid}
        x2={nodes[1]!.x - 2}
        y2={nodeYMid}
        stroke="currentColor"
        strokeWidth="1.5"
        markerEnd="url(#zuit-arrow)"
      />

      {/* Accent edge: parser -> AST */}
      <line
        x1={nodes[1]!.x + nodeW}
        y1={nodeYMid}
        x2={nodes[2]!.x - 2}
        y2={nodeYMid}
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        markerEnd="url(#zuit-arrow-accent)"
        className="flow-edge--animated"
      />

      {/* Plain edges: AST->analyzers, analyzers->SARIF */}
      {[2, 3].map((i) => {
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
            strokeWidth="1.5"
            markerEnd="url(#zuit-arrow)"
          />
        );
      })}
    </svg>
  );
}
