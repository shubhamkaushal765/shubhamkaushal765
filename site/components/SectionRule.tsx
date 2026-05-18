import type { ReactNode } from 'react';

type Glyph = 'fleuron' | 'pilcrow' | 'section' | 'asterism';

interface SectionRuleProps {
  children: ReactNode;
  number?: string;
  /**
   * Typographic ornament that sits on the dividing rule. Each section can pick
   * a different glyph for visual rhythm — a printed-book gesture. Defaults
   * cycle so consecutive rules don't repeat the same mark.
   */
  glyph?: Glyph;
}

// Deterministic cycle so the same `number` always gets the same glyph.
const GLYPH_CYCLE: Glyph[] = ['section', 'fleuron', 'pilcrow', 'asterism'];

function glyphFor(number?: string, override?: Glyph): Glyph {
  if (override) return override;
  if (!number) return 'section';
  const idx = parseInt(number, 10);
  if (Number.isNaN(idx)) return 'section';
  return GLYPH_CYCLE[(idx - 1) % GLYPH_CYCLE.length] ?? 'section';
}

export default function SectionRule({ children, number, glyph }: SectionRuleProps) {
  const resolved = glyphFor(number, glyph);
  return (
    <div className="section-rule">
      <h2>
        {number !== undefined && (
          <span className="section-num" aria-hidden="true">
            {`[ ${number} ] `}
          </span>
        )}
        {children}
      </h2>
      <hr className="section-rule__hr" />
      <span className="section-rule__ornament" data-glyph={resolved} aria-hidden="true" />
    </div>
  );
}
