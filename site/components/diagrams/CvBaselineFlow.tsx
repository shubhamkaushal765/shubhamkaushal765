/**
 * CvBaselineFlow — inline SVG diagram for the computer vision foundation card.
 *
 * Left: pixel grid input with a sliding conv kernel highlight. Middle: stack
 * of feature-map planes that pulse in sequence. Right: softmax bar chart with
 * the winning class glowing. Animated dashed edges connect each stage.
 */
import type { CSSProperties } from 'react';

export default function CvBaselineFlow() {
  // Pixel grid: 4x4 starting at (12,52), cell=12px
  const cell = 10;
  const gridX = 12;
  const gridY = 52;
  const gridN = 6;

  // Feature map planes
  const planes = [
    { x: 110, y: 50, w: 30, h: 50 },
    { x: 122, y: 58, w: 30, h: 50 },
    { x: 134, y: 66, w: 30, h: 50 },
  ];

  const planes2 = [
    { x: 178, y: 60, w: 22, h: 36 },
    { x: 186, y: 66, w: 22, h: 36 },
    { x: 194, y: 72, w: 22, h: 36 },
  ];

  // Softmax bars
  const bars = [
    { x: 246, h: 8 },
    { x: 256, h: 20 },
    { x: 266, h: 38, win: true },
    { x: 276, h: 14 },
    { x: 286, h: 10 },
  ];
  const barBaseY = 116;

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
        Pixel grid input is convolved (sliding kernel highlight), producing
        feature maps that pulse in sequence, then a fully-connected layer
        feeds a softmax classifier whose top class glows.
      </desc>

      <defs>
        <marker id="cv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="currentColor" />
        </marker>
        <marker id="cv-arrow-accent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--pillar-color, var(--color-accent))" />
        </marker>
      </defs>

      {/* Input pixel grid */}
      <g>
        {Array.from({ length: gridN }).map((_, ix) =>
          Array.from({ length: gridN }).map((_, iy) => {
            const intensity = Math.sin((ix * 1.3 + iy * 0.9 + 1) * 0.7) * 0.4 + 0.5;
            return (
              <rect
                key={`px-${ix}-${iy}`}
                x={gridX + ix * cell}
                y={gridY + iy * cell}
                width={cell - 1}
                height={cell - 1}
                fill="currentColor"
                opacity={intensity * 0.6}
              />
            );
          })
        )}
        {/* Grid outline */}
        <rect
          x={gridX - 1}
          y={gridY - 1}
          width={gridN * cell + 1}
          height={gridN * cell + 1}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.6"
        />
        {/* Sliding conv kernel (3x3) */}
        <rect
          x={gridX}
          y={gridY}
          width={cell * 3}
          height={cell * 3}
          stroke="var(--pillar-color, var(--color-accent))"
          strokeWidth="1.5"
          fill="color-mix(in oklab, var(--pillar-color, var(--color-accent)) 18%, transparent)"
        >
          <animate
            attributeName="x"
            values={`${gridX};${gridX + cell * 3};${gridX};${gridX}`}
            keyTimes="0;0.45;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            values={`${gridY};${gridY};${gridY + cell * 3};${gridY}`}
            keyTimes="0;0.45;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
      <text x={gridX + (gridN * cell) / 2} y="124" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        input + conv
      </text>

      {/* Edge: input -> feature maps */}
      <line
        x1="78"
        y1="80"
        x2="108"
        y2="80"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        markerEnd="url(#cv-arrow)"
        className="flow-edge--animated"
        style={{ '--dash-len': 30, '--flow-delay': '300ms' } as CSSProperties}
      />

      {/* Feature map planes — conv block 1 */}
      {planes.map((p, i) => (
        <rect
          key={`p1-${i}`}
          x={p.x}
          y={p.y}
          width={p.w}
          height={p.h}
          fill="var(--color-surface-rail)"
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.5 + i * 0.15}
          className="flow-node--pulse"
          style={{ animationDelay: `${i * 200}ms` } as CSSProperties}
        />
      ))}
      <text x="135" y="124" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        feature maps
      </text>

      {/* Edge: feature maps -> deeper feature maps */}
      <line
        x1="168"
        y1="84"
        x2="178"
        y2="78"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        markerEnd="url(#cv-arrow)"
        className="flow-edge--animated"
        style={{ '--dash-len': 12, '--flow-delay': '500ms' } as CSSProperties}
      />

      {/* Feature map planes — conv block 2 */}
      {planes2.map((p, i) => (
        <rect
          key={`p2-${i}`}
          x={p.x}
          y={p.y}
          width={p.w}
          height={p.h}
          fill="var(--color-surface-rail)"
          stroke="currentColor"
          strokeWidth="1"
          opacity={0.5 + i * 0.15}
          className="flow-node--pulse"
          style={{ animationDelay: `${i * 200 + 400}ms` } as CSSProperties}
        />
      ))}

      {/* Edge to softmax (accent) */}
      <line
        x1="216"
        y1="84"
        x2="240"
        y2="100"
        stroke="var(--pillar-color, var(--color-accent))"
        strokeWidth="1.75"
        strokeDasharray="5 3"
        markerEnd="url(#cv-arrow-accent)"
        className="flow-edge--animated"
        style={{ '--dash-len': 30, '--flow-delay': '700ms' } as CSSProperties}
      />

      {/* Softmax bars */}
      <line
        x1="240"
        y1={barBaseY + 2}
        x2="298"
        y2={barBaseY + 2}
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {bars.map((b, i) => (
        <rect
          key={`bar-${i}`}
          x={b.x}
          y={barBaseY - b.h}
          width="6"
          height={b.h}
          fill={b.win ? 'var(--pillar-color, var(--color-accent))' : 'currentColor'}
          opacity={b.win ? 1 : 0.4}
          className={b.win ? 'flow-node--pulse' : ''}
          style={b.win ? { animationDelay: '900ms' } as CSSProperties : undefined}
        >
          <animate
            attributeName="height"
            values={`0;${b.h}`}
            dur="600ms"
            begin={`${500 + i * 80}ms`}
            fill="freeze"
          />
          <animate
            attributeName="y"
            values={`${barBaseY};${barBaseY - b.h}`}
            dur="600ms"
            begin={`${500 + i * 80}ms`}
            fill="freeze"
          />
        </rect>
      ))}
      <text x="269" y="132" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--color-text-muted)">
        softmax
      </text>

      {/* Winning class star */}
      <circle
        cx="269"
        cy={barBaseY - bars[2]!.h - 6}
        r="3"
        fill="var(--pillar-color, var(--color-accent))"
        className="flow-node--pulse"
      />
    </svg>
  );
}
