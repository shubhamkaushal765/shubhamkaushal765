/**
 * ZuitFlow — inline SVG diagram for the zuit code intelligence card.
 *
 * Left: a stream of source tokens flowing into a parser. Middle: an AST,
 * rendered as a binary tree of pulsing nodes (the lexical structure).
 * Right: a SARIF report card with 5 dimension dots scanning, and one
 * finding highlighted in accent. Edges animate dashes between stages.
 */
import type { CSSProperties } from 'react';

export default function ZuitFlow() {
  // AST tree node coords
  const nodes = [
    { id: 'root', x: 162, y: 50 },
    { id: 'a', x: 142, y: 80 },
    { id: 'b', x: 182, y: 80 },
    { id: 'c', x: 128, y: 110 },
    { id: 'd', x: 156, y: 110 },
    { id: 'e', x: 196, y: 110 },
  ];

  const edges: [string, string][] = [
    ['root', 'a'],
    ['root', 'b'],
    ['a', 'c'],
    ['a', 'd'],
    ['b', 'e'],
  ];

  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // SARIF findings (dots)
  const findings = [
    { y: 56, label: 'M', accent: false }, // maintain
    { y: 72, label: 'S', accent: true },  // security (accent)
    { y: 88, label: 'C', accent: false }, // complexity
    { y: 104, label: 'D', accent: false }, // docs
    { y: 120, label: 'T', accent: false }, // tests
  ];

  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="zuit-title zuit-desc"
      style={{ '--flow-delay': '300ms' } as CSSProperties}
    >
      <title id="zuit-title">zuit static analysis pipeline</title>
      <desc id="zuit-desc">
        Source tokens stream into a parser that builds an AST; analyzers
        scan five quality dimensions and emit a SARIF report. The security
        dimension is highlighted as the accent finding.
      </desc>

      <defs>
        <marker id="zuit-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker id="zuit-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--pillar-color, var(--color-accent))" />
        </marker>
      </defs>

      {/* Source code tokens — vertical stream */}
      <rect
        x="10"
        y="40"
        width="76"
        height="100"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-surface-rail)"
      />
      {[
        { y: 56, t: 'fn parse' },
        { y: 70, t: '(s: &str)' },
        { y: 84, t: '  -> AST' },
        { y: 98, t: '{ ... }' },
        { y: 112, t: 'impl Lex' },
        { y: 126, t: 'for Tok' },
      ].map((line, i) => (
        <text
          key={i}
          x="16"
          y={line.y}
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          fill="currentColor"
          opacity={0.75}
        >
          {line.t}
          <animate
            attributeName="opacity"
            values="0;0.75;0.75"
            keyTimes="0;0.3;1"
            dur="2.4s"
            begin={`${i * 200}ms`}
            repeatCount="indefinite"
          />
        </text>
      ))}
      {/* Cursor */}
      <rect x="58" y="50" width="6" height="2" fill="var(--pillar-color, var(--color-accent))" className="flow-glow" />
      <text x="48" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        source
      </text>

      {/* Edge: source -> AST (accent, animated dash) */}
      <line
        x1="86"
        y1="90"
        x2="118"
        y2="90"
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        strokeDasharray="6 3"
        markerEnd="url(#zuit-arrow-accent)"
        className="flow-edge--animated"
        style={{ '--dash-len': 30 } as CSSProperties}
      />

      {/* AST tree edges */}
      {edges.map(([from, to], i) => {
        const a = nodeById[from]!;
        const b = nodeById[to]!;
        return (
          <line
            key={`edge-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="3 2"
            opacity="0.7"
            className="flow-edge--animated"
            style={{ '--dash-len': 20, '--flow-delay': `${400 + i * 100}ms` } as CSSProperties}
          />
        );
      })}
      {/* AST tree nodes */}
      {nodes.map((n, i) => (
        <circle
          key={n.id}
          cx={n.x}
          cy={n.y}
          r="5"
          fill="var(--color-surface-rail)"
          stroke="var(--pillar-color, var(--color-accent))"
          strokeWidth="1.5"
          className="flow-node--pulse"
          style={{ animationDelay: `${i * 150}ms` } as CSSProperties}
        />
      ))}
      <text x="162" y="140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        AST + analyzers
      </text>

      {/* Edge: AST -> SARIF */}
      <line
        x1="208"
        y1="90"
        x2="232"
        y2="90"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        markerEnd="url(#zuit-arrow)"
        className="flow-edge--animated"
        style={{ '--dash-len': 24, '--flow-delay': '900ms' } as CSSProperties}
      />

      {/* SARIF report card */}
      <rect
        x="234"
        y="38"
        width="76"
        height="100"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="var(--color-surface-rail)"
      />
      <text x="272" y="50" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7.5" fill="var(--color-text-muted)">
        SARIF 2.1.0
      </text>
      <line x1="240" y1="53" x2="304" y2="53" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
      {findings.map((f, i) => (
        <g key={f.label}>
          <circle
            cx="244"
            cy={f.y}
            r="3"
            fill={f.accent ? 'var(--pillar-color, var(--color-accent))' : 'currentColor'}
            opacity={f.accent ? 1 : 0.5}
            className={f.accent ? 'flow-node--pulse' : ''}
            style={f.accent ? { animationDelay: '1100ms' } as CSSProperties : undefined}
          />
          <text
            x="252"
            y={f.y + 3}
            fontFamily="var(--font-mono)"
            fontSize="7"
            fill={f.accent ? 'var(--pillar-color, var(--color-accent))' : 'currentColor'}
            opacity={f.accent ? 1 : 0.7}
          >
            {f.label}: line {12 + i * 7}
          </text>
        </g>
      ))}
      <text x="272" y="156" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        SARIF
      </text>

      {/* Scanning highlight line on report card */}
      <line
        x1="234"
        y1="56"
        x2="310"
        y2="56"
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1"
        opacity="0.35"
      >
        <animate
          attributeName="y1"
          values="56;130;56"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="56;130;56"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}
