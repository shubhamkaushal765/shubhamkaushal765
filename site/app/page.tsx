import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ParseStory from '@/components/ParseStory';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/home.mdx';

export const metadata: Metadata = {
  title: 'Shubham Kaushal: Parsers to qubits.',
  description:
    'Independent engineer and researcher across code intelligence, machine learning, quantum computing, and photonics.',
  openGraph: {
    title: 'Shubham Kaushal: Parsers to qubits.',
    description:
      'Independent engineer and researcher across code intelligence, machine learning, quantum computing, and photonics.',
    siteName: 'Shubham Kaushal',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Shubham Kaushal: Parsers to qubits.',
    description:
      'Independent engineer and researcher across code intelligence, machine learning, quantum computing, and photonics.',
  },
};

export default function HomePage() {
  return (
    <main id="main">
      <Hero variant="full" />
      <ParseStory />
      <Content />
      <FooterSignature />
    </main>
  );
}
