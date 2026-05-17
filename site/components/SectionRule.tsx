import type { ReactNode } from 'react';

interface SectionRuleProps {
  children: ReactNode;
  number?: string;
}

export default function SectionRule({ children, number }: SectionRuleProps) {
  return (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-text-footnote)', margin: 'var(--spacing-13) 0 var(--spacing-3) 0' }} />
      {number !== undefined && (
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-footnote)',
            fontSize: '0.8em',
            letterSpacing: '0.1em',
            marginBottom: '0.25em',
          }}
          aria-hidden="true"
        >
          {number}
        </div>
      )}
      <h2>{children}</h2>
    </div>
  );
}
