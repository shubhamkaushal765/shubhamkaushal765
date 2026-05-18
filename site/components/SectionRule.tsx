import type { ReactNode } from 'react';

interface SectionRuleProps {
  children: ReactNode;
  number?: string;
}

export default function SectionRule({ children, number }: SectionRuleProps) {
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
    </div>
  );
}
