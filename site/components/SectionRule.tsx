import type { ReactNode } from 'react';

interface SectionRuleProps {
  children: ReactNode;
  number?: string;
}

export default function SectionRule({ children, number }: SectionRuleProps) {
  return (
    <div>
      <h2>
        {number !== undefined && (
          <span className="section-num" aria-hidden="true">
            {`[ ${number} ] `}
          </span>
        )}
        {children}
      </h2>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--color-border-hair)',
          margin: '0 0 var(--spacing-5) 0',
        }}
      />
    </div>
  );
}
