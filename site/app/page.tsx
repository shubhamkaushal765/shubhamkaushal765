import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/home.mdx';

export const metadata: Metadata = {
  title: 'Shubham Kaushal — Parsers to qubits.',
  description:
    'Independent engineer and researcher across code intelligence, machine learning, and quantum computing.',
};

export default function HomePage() {
  return (
    <main>
      <Hero variant="full" />
      <Content />
      <FooterSignature />
    </main>
  );
}
