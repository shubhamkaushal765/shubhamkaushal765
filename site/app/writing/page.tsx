import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';

export const metadata: Metadata = {
  title: 'Writing — Shubham Kaushal',
  description: 'Essay pipeline across code intelligence, machine learning, and quantum computing.',
};

type Pillar = 'code-int' | 'ml' | 'quantum';

const PIPELINE: { title: string; summary: string; pillar: Pillar; pillarLabel: string }[] = [
  {
    title: 'Why your static analyzer should emit SARIF — and what most authors get wrong about it',
    summary: 'SARIF 2.1.0 schema, CWE/OWASP anchoring, and the implementation mistakes that make findings non-portable.',
    pillar: 'code-int',
    pillarLabel: 'code intelligence',
  },
  {
    title: 'Local-first RAG over code: the embedding choice matters more than the LLM',
    summary: 'Benchmark methodology and results comparing embedding models at fixed memory budget.',
    pillar: 'ml',
    pillarLabel: 'machine learning',
  },
  {
    title: 'Transformers as quantum decoders: a Stim + Lightning walkthrough',
    summary: 'Syndrome graph encoding, transformer architecture, and training setup for surface-code QEC.',
    pillar: 'quantum',
    pillarLabel: 'quantum',
  },
  {
    title: 'Five quality dimensions: a taxonomy for code-health analyzers',
    summary: 'RFC-style foundational post on the dimension model that other writing references.',
    pillar: 'code-int',
    pillarLabel: 'code intelligence',
  },
  {
    title: 'Qubit calibration as an orchestration problem',
    summary: 'Framing RB / T1 / T2 / single-qubit gate tomography as resource allocation and dependency ordering.',
    pillar: 'quantum',
    pillarLabel: 'quantum',
  },
];

export default function WritingPage() {
  return (
    <main id="main">
      <Hero variant="compact" />
      <h1>Writing</h1>
      <p>First essay shipping 2026-Q3. Pipeline below — each post cites primary sources directly (arXiv permalinks, not commentary), every code sample runs as written, and pseudocode is labeled as pseudocode.</p>
      <ol className="writing-pipeline">
        {PIPELINE.map((post, i) => (
          <li key={i} className="writing-card" data-pillar={post.pillar}>
            <span className="writing-card__pillar">{post.pillarLabel}</span>
            <h3 className="writing-card__title">{post.title}</h3>
            <p className="writing-card__summary">{post.summary}</p>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
