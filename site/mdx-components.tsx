import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

const PILLAR_NUMBERS: Record<string, string> = {
  'Code intelligence': '01',
  'Machine learning': '02',
  'Quantum computing': '03',
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
  const num = PILLAR_NUMBERS[text];
  if (num !== undefined) {
    return (
      <h3 id={id}>
        <span className="section-num" aria-hidden="true">{num}</span>
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
