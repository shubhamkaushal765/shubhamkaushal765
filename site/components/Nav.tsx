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

  // Strip basePath prefix for comparison — Next.js exposes the path without basePath.
  // The href values in ITEMS already omit the basePath.
  function isActive(href: string): boolean {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href);
  }

  return (
    <nav
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-muted)',
        fontSize: '0.95em',
        marginTop: 'var(--spacing-5)',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-label="Primary"
    >
      <span>
        <span aria-hidden="true">[ </span>
        {ITEMS.map((item, i) => {
          const active = isActive(item.href);
          return (
            <span key={item.href}>
              <Link
                href={item.href}
                style={
                  active
                    ? {
                        color: 'var(--color-accent)',
                        textDecorationColor: 'var(--color-accent)',
                      }
                    : undefined
                }
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
              {i < ITEMS.length - 1 && <span aria-hidden="true">  ·  </span>}
            </span>
          );
        })}
        <span aria-hidden="true"> ]</span>
      </span>
      <ThemeToggle />
    </nav>
  );
}
