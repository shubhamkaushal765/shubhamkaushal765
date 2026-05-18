'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="site-nav__link"
      style={{
        background: 'var(--color-surface-rail)',
        border: '1px solid var(--color-border-hair)',
        cursor: 'pointer',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78em',
        color: 'var(--color-text-muted)',
        padding: '4px 10px',
        borderRadius: '999px',
      }}
    >
      <span aria-hidden="true">
        {theme === 'dark' ? 'light' : 'dark'}
      </span>
    </button>
  );
}
