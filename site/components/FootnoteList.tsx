type Footnote = { id: number; html: string };

export default function FootnoteList({ items }: { items: Footnote[] }) {
  return (
    <section>
      <SectionRuleInline>Footnotes</SectionRuleInline>
      <ol style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--color-text-muted)', fontSize: '0.95em' }}>
        {items.map((fn) => (
          <li key={fn.id} id={`fn-${fn.id}`} dangerouslySetInnerHTML={{ __html: fn.html }} />
        ))}
      </ol>
    </section>
  );
}

function SectionRuleInline({ children }: { children: string }) {
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-text-footnote)', margin: 'var(--spacing-13) 0 var(--spacing-3) 0' }} />
      <h2>{children}</h2>
    </>
  );
}
