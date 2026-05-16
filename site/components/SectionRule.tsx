import type { ReactNode } from 'react';

export default function SectionRule({ children }: { children: ReactNode }) {
  return (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-text-footnote)', margin: 'var(--spacing-13) 0 var(--spacing-3) 0' }} />
      <h2>{children}</h2>
    </div>
  );
}
