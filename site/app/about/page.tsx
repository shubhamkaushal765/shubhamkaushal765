import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FootnoteList from '@/components/FootnoteList';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/about.mdx';

export const metadata: Metadata = {
  title: 'About — Shubham Kaushal',
  description:
    'Independent engineer and researcher across code intelligence, machine learning, and quantum computing.',
};

const FOOTNOTES = [
  {
    id: 1,
    html: 'OASIS. <em>Static Analysis Results Interchange Format (SARIF) Version 2.1.0.</em> OASIS Standard, 27 March 2020. <a href="https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html">https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html</a>',
  },
  {
    id: 2,
    html: 'Wang H. et al. <em>Transformer-QEC: Quantum Error Correction Code Decoding with Transferable Transformers.</em> ICCAD 2023. <a href="https://arxiv.org/abs/2311.16082">https://arxiv.org/abs/2311.16082</a>',
  },
  {
    id: 3,
    html: 'Quantum Open Source Foundation. <em>QOSF Mentorship Program Cohort 9, Task 4: QAOA and Adiabatic Quantum Computing.</em> 2024. <a href="https://github.com/qosf/qosf-mentorship">https://github.com/qosf/qosf-mentorship</a>',
  },
];

export default function AboutPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>About</h1>
      <Content />
      <FootnoteList items={FOOTNOTES} />
      <FooterSignature />
    </main>
  );
}
