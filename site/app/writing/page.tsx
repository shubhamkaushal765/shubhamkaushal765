import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';

export const metadata: Metadata = {
  title: 'Blog — Shubham Kaushal',
  description: 'Essays across code intelligence, machine learning, and quantum computing.',
};

type Pillar = 'code-int' | 'ml' | 'quantum';

type Post = {
  title: string;
  summary: string;
  pillar: Pillar;
  pillarLabel: string;
  date: string;
  status: 'upcoming' | 'draft' | 'published';
};

const POSTS: Post[] = [
  {
    title: 'Why your static analyzer should emit SARIF — and what most authors get wrong about it',
    summary: 'SARIF 2.1.0 schema, CWE/OWASP anchoring, and the implementation mistakes that make findings non-portable.',
    pillar: 'code-int',
    pillarLabel: 'code intelligence',
    date: '2026-Q3',
    status: 'upcoming',
  },
  {
    title: 'Local-first RAG over code: the embedding choice matters more than the LLM',
    summary: 'Benchmark methodology and results comparing embedding models at fixed memory budget.',
    pillar: 'ml',
    pillarLabel: 'machine learning',
    date: '2026-Q3',
    status: 'upcoming',
  },
  {
    title: 'Transformers as quantum decoders: a Stim + Lightning walkthrough',
    summary: 'Syndrome graph encoding, transformer architecture, and training setup for surface-code QEC.',
    pillar: 'quantum',
    pillarLabel: 'quantum',
    date: '2026-Q4',
    status: 'upcoming',
  },
  {
    title: 'Five quality dimensions: a taxonomy for code-health analyzers',
    summary: 'RFC-style foundational post on the dimension model that other writing references.',
    pillar: 'code-int',
    pillarLabel: 'code intelligence',
    date: '2026-Q4',
    status: 'upcoming',
  },
  {
    title: 'Qubit calibration as an orchestration problem',
    summary: 'Framing RB / T1 / T2 / single-qubit gate tomography as resource allocation and dependency ordering.',
    pillar: 'quantum',
    pillarLabel: 'quantum',
    date: '2027-Q1',
    status: 'upcoming',
  },
];

export default function WritingPage() {
  return (
    <main id="main">
      <Hero variant="compact" />
      <h1>Blog</h1>
      <p>Essays across code intelligence, machine learning, and quantum computing. Primary sources cited directly (arXiv permalinks, not commentary); every code sample runs as written; pseudocode is labeled as pseudocode.</p>
      <ol className="blog-list">
        {POSTS.map((post, i) => (
          <li key={i} className="blog-entry" data-pillar={post.pillar}>
            <div className="blog-entry__meta">
              <time className="blog-entry__date">{post.date}</time>
              <span className="blog-entry__pillar">{post.pillarLabel}</span>
              <span className="blog-entry__status">{post.status}</span>
            </div>
            <h3 className="blog-entry__title">{post.title}</h3>
            <p className="blog-entry__summary">{post.summary}</p>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
