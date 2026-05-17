import type { ReactNode } from 'react';

interface TopicCardProps {
  number: '01' | '02' | '03' | '04';
  title: string;
  tag: string;
  table: { key: string; value: string }[];
  diagram: ReactNode;
  children: ReactNode;
}

function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function TopicCard({
  number,
  title,
  tag,
  table,
  diagram,
  children,
}: TopicCardProps) {
  const headingId = `topic-${toKebabCase(title)}`;

  return (
    <article className="topic-card" aria-labelledby={headingId}>
      <div className="topic-card__head">
        <span className="topic-card__num section-num" aria-hidden="true">
          {number}
        </span>
        <h3 id={headingId} className="topic-card__title">
          {title}
        </h3>
        <span className="topic-card__tag">{tag}</span>
      </div>

      <div className="topic-card__blurb">{children}</div>

      <div className="topic-card__body">
        <div className="topic-card__table">
          <table>
            <thead className="sr-only">
              <tr>
                <th scope="col">Property</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              {table.map(({ key, value }) => (
                <tr key={key}>
                  <th scope="row">{key}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="topic-card__diagram">{diagram}</div>
      </div>
    </article>
  );
}

export default function Highlights({ children }: { children: ReactNode }) {
  // aria-label used directly rather than aria-labelledby because @next/mdx does not
  // attach id attributes to headings by default (no rehype-slug in next.config.mjs).
  return (
    <section aria-label="Highlights" className="highlights">
      {children}
    </section>
  );
}
