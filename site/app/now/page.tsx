import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/now.mdx';

export const metadata: Metadata = {
  title: 'Now — Shubham Kaushal',
  description: 'Current research focus, in research-diary form.',
};

export default function NowPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>Now</h1>
      <Content />
      <FooterSignature />
    </main>
  );
}
