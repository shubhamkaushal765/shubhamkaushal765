import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';

export const metadata: Metadata = {
  title: 'Writing — Shubham Kaushal',
  description: 'Essay pipeline across code intelligence, machine learning, and quantum computing.',
};

const PIPELINE = [
  {
    title: 'Why your static analyzer should emit SARIF — and what most authors get wrong about it',
    summary: 'SARIF 2.1.0 schema, CWE/OWASP anchoring, and the implementation mistakes that make findings non-portable.',
    pillar: 'code intelligence',
  },
  {
    title: 'Local-first RAG over code: the embedding choice matters more than the LLM',
    summary: 'Benchmark methodology and results comparing embedding models at fixed memory budget.',
    pillar: 'machine learning',
  },
  {
    title: 'Transformers as quantum decoders: a Stim + Lightning walkthrough',
    summary: 'Syndrome graph encoding, transformer architecture, and training setup for surface-code QEC.',
    pillar: 'quantum',
  },
  {
    title: 'Five quality dimensions: a taxonomy for code-health analyzers',
    summary: 'RFC-style foundational post on the dimension model that other writing references.',
    pillar: 'code intelligence',
  },
  {
    title: 'Qubit calibration as an orchestration problem',
    summary: 'Framing RB / T1 / T2 / single-qubit gate tomography as resource allocation and dependency ordering.',
    pillar: 'quantum',
  },
];

export default function WritingPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>Writing</h1>
      <p>First essay shipping 2026-Q3. Pipeline:</p>
      <ol>
        {PIPELINE.map((post, i) => (
          <li key={i} style={{ marginBottom: 'var(--spacing-5)' }}>
            <strong>{post.title}</strong>
            <br />
            <span style={{ color: 'var(--color-text-muted)' }}>
              {post.summary} <em>· {post.pillar}</em>
            </span>
          </li>
        ))}
      </ol>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95em' }}>
        Every post cites primary sources directly (arXiv permalinks, not commentary). Every code sample runs as written. Pseudocode is labeled as pseudocode.
      </p>
      <FooterSignature />
    </main>
  );
}
