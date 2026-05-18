import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { CHAPTERS } from './chapters';

export const metadata: Metadata = {
  title: 'Photonics — Shubham Kaushal',
  description:
    'A working notebook on photonic quantum computing — continuous-variable encoding, Gaussian operations, measurement-induced nonlinearity, and where the architecture diverges from gate-model superconducting qubits.',
};

export default function PhotonicsBookPage() {
  return (
    <main id="main" data-pillar="photonics">
      <Hero variant="compact" />
      <p className="book-eyebrow">photonics · book</p>
      <h1>Photonics</h1>
      <p>
        A working notebook on photonic quantum computing. The qumode — not the
        qubit — is the native degree of freedom. Gaussian operations are cheap
        and deterministic; non-Gaussian resources are expensive and discrete;
        photon loss replaces decoherence as the dominant error. The chapters
        develop those three claims from first principles to architecture.
      </p>
      <ol className="chapter-toc">
        {CHAPTERS.map((c) => (
          <li key={c.slug} className="chapter-toc__item">
            <Link href={`/writing/photonics/${c.slug}/`} className="chapter-toc__link">
              <span className="chapter-toc__num">{`[ ${c.number} ]`}</span>
              <span className="chapter-toc__body">
                <span className="chapter-toc__title">{c.title}</span>
                <span className="chapter-toc__summary">{c.summary}</span>
                <span className="chapter-toc__reading">{c.reading}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
