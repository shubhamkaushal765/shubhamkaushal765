import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

interface PillarEntry {
  num: string;
  pillar: 'code-int' | 'ml' | 'quantum';
}

const PILLAR_NUMBERS: Record<string, PillarEntry> = {
  'Code intelligence': { num: '01', pillar: 'code-int' },
  'Machine learning': { num: '02', pillar: 'ml' },
  'Quantum computing': { num: '03', pillar: 'quantum' },
};

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (
    children !== null &&
    typeof children === 'object' &&
    'props' in (children as { props?: unknown })
  ) {
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

const DATE_H3 = /^\d{4}-\d{2}(-\d{2})?$/;

function NumberedH3({ children, id }: { children?: ReactNode; id?: string }) {
  const text = extractText(children);
  const entry = PILLAR_NUMBERS[text];
  if (entry !== undefined) {
    return (
      <h3 id={id} data-pillar={entry.pillar}>
        <span className="section-num" aria-hidden="true">{entry.num}</span>
        {children}
      </h3>
    );
  }
  if (DATE_H3.test(text)) {
    return (
      <h3 id={id}>
        <span className="section-num" aria-label={text}>{`[ ${text} ]`}</span>
      </h3>
    );
  }
  return <h3 id={id}>{children}</h3>;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h3: NumberedH3,
  };
}
