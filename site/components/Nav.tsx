import Link from 'next/link';

const ITEMS = [
  { href: '/', label: 'home' },
  { href: '/about/', label: 'about' },
  { href: '/writing/', label: 'writing' },
  { href: '/now/', label: 'now' },
];

export default function Nav() {
  return (
    <nav
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-muted)',
        fontSize: '0.95em',
        marginTop: 'var(--spacing-5)',
      }}
      aria-label="Primary"
    >
      <span aria-hidden="true">[ </span>
      {ITEMS.map((item, i) => (
        <span key={item.href}>
          <Link href={item.href}>{item.label}</Link>
          {i < ITEMS.length - 1 && <span aria-hidden="true">  ·  </span>}
        </span>
      ))}
      <span aria-hidden="true"> ]</span>
    </nav>
  );
}
