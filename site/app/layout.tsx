import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import SkipLink from '@/components/SkipLink';
import HelpDialog from '@/components/HelpDialog';
import '@/styles/globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans-var',
  display: 'swap',
});

// Fraunces: variable serif with opsz / SOFT / WONK axes.
// Optical sizing sharpens at display sizes; the soft and wonky axes give
// headings a hand-cut, editorial flavour rather than a SaaS-template feel.
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display-var',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-var',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Shubham Kaushal',
  description: 'Parsers to qubits.',
  openGraph: {
    siteName: 'Shubham Kaushal',
    type: 'website',
  },
  twitter: {
    card: 'summary',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
  ],
};

const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem('theme');}catch(e){}if(t!=='light'&&t!=='dark'){try{t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}catch(e){t='dark';}}document.documentElement.setAttribute('data-theme',t);})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <SkipLink />
        {children}
        <HelpDialog />
      </body>
    </html>
  );
}
