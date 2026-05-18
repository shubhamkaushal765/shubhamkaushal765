/**
 * QecFlow — inline SVG diagram for the TransformerQEC topic card.
 *
 * A syndrome lattice on the left, a transformer encoder block (with stacked
 * attention rows) in the middle, and a corrected qubit on the right. The
 * syndrome dots pulse like measurements, the encoder rows shimmer, dashed
 * edges flow with a moving wave, and an accent particle travels along the
 * data path.
 */
import type { CSSProperties } from 'react';

export default function QecFlow() {
  return (
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="qec-title qec-desc"
      style={{ '--flow-delay': '200ms' } as CSSProperties}
    >
      <title id="qec-title">TransformerQEC data flow</title>
      <desc id="qec-desc">
        A pulsing syndrome lattice feeds a transformer encoder built of
        stacked attention rows; the corrected qubit emerges on the right.
        Dashed edges show data flow.
      </desc>

      <defs>
        <marker id="qec-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker id="qec-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--pillar-color, var(--color-accent))" />
        </marker>
        <radialGradient id="qec-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--pillar-color, var(--color-accent))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--pillar-color, var(--color-accent))" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Syndrome lattice background glow */}
      <circle cx="48" cy="90" r="46" fill="url(#qec-glow)" className="flow-glow" />

      {/* Syndrome lattice — 3x3 grid of pulsing dots with connecting lines */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.4">
        {[20, 48, 76].map((x) =>
          [62, 90, 118].map((y) => (
            <g key={`grid-${x}-${y}`}>
              {x < 76 && <line x1={x} y1={y} x2={x + 28} y2={y} />}
              {y < 118 && <line x1={x} y1={y} x2={x} y2={y + 28} />}
            </g>
          ))
        )}
      </g>
      {[20, 48, 76].map((x, ix) =>
        [62, 90, 118].map((y, iy) => {
          const delay = `${(ix + iy) * 200}ms`;
          const isError = (ix + iy) % 2 === 0;
          return (
            <circle
              key={`dot-${x}-${y}`}
              cx={x}
              cy={y}
              r="2.5"
              fill={isError ? 'var(--pillar-color, var(--color-accent))' : 'currentColor'}
              className="flow-node--pulse"
              style={{ animationDelay: delay } as CSSProperties}
            />
          );
        })
      )}

      {/* Label under lattice */}
      <text x="48" y="142" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        syndrome graph
      </text>

      {/* Edge: syndrome -> encoder (accent, animated) */}
      <line
        x1="84"
        y1="90"
        x2="118"
        y2="90"
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        strokeDasharray="6 3"
        markerEnd="url(#qec-arrow-accent)"
        className="flow-edge--animated"
        style={{ '--dash-len': 36 } as CSSProperties}
      />

      {/* Encoder block: 4 stacked attention rows */}
      <rect
        x="120"
        y="50"
        width="100"
        height="80"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.75"
        fill="var(--color-surface-rail)"
      />
      {[60, 72, 84, 96, 108].map((y, i) => (
        <line
          key={`attn-${y}`}
          x1="128"
          y1={y}
          x2="212"
          y2={y}
          stroke="var(--pillar-color, var(--color-accent))"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="2 2"
          className="flow-edge--animated"
          style={{ '--dash-len': 84, '--flow-delay': `${300 + i * 150}ms` } as CSSProperties}
        />
      ))}
      <text x="170" y="124" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="currentColor">
        transformer
      </text>
      <text x="170" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="var(--color-text-footnote)">
        (stim · pyTorch lightning)
      </text>

      {/* Edge: encoder -> corrected */}
      <line
        x1="220"
        y1="90"
        x2="248"
        y2="90"
        stroke="currentColor"
        strokeWidth="1.75"
        markerEnd="url(#qec-arrow)"
      />

      {/* Corrected qubit: bloch-sphere style circle */}
      <circle
        cx="278"
        cy="90"
        r="20"
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        fill="var(--color-surface-rail)"
      />
      <ellipse cx="278" cy="90" rx="20" ry="6" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
      <line x1="278" y1="70" x2="278" y2="110" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" />
      <circle cx="278" cy="80" r="2.5" fill="var(--pillar-color, var(--color-accent))" className="flow-node--pulse" />
      <text x="278" y="125" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="currentColor">
        corrected
      </text>

      {/* Traveling particle along data path */}
      <circle
        r="2"
        className="flow-particle"
        style={{
          offsetPath: 'path("M 84 90 L 248 90")',
          offsetDistance: '0%',
        } as CSSProperties}
      />
    </svg>
  );
}
