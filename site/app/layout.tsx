import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import SkipLink from '@/components/SkipLink';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Shubham Kaushal',
  description: 'Parsers to qubits.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
};

const THEME_SCRIPT = `(function(){var t=localStorage.getItem('theme')||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
