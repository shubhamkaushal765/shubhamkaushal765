'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

const ITEMS = [
  { href: '/', label: 'home' },
  { href: '/about/', label: 'about' },
  { href: '/writing/', label: 'writing' },
  { href: '/now/', label: 'now' },
];

export default function Nav() {
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href);
  }

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav__items">
        <Link
          href="/"
          className="site-nav__link"
          style={{ fontWeight: 600, color: 'var(--color-text-body)' }}
        >
          <span aria-hidden="true" style={{ color: 'var(--color-pillar-code)' }}>~/</span>
          sk
        </Link>
        <span aria-hidden="true" style={{ color: 'var(--color-border-strong)' }}>|</span>
        {ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav__link"
              data-active={active ? 'true' : 'false'}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <ThemeToggle />
    </nav>
  );
}
