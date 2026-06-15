import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { CHAPTERS } from './chapters';

export const metadata: Metadata = {
  title: 'Bayesian optimization | Shubham Kaushal',
  description:
    'A working notebook on Bayesian optimization: surrogate models, acquisition functions, and the feedback loop that makes each expensive evaluation count. Covers GPs, EI, GP-UCB, Thompson sampling, and worked examples in ML hyperparameter tuning and qubit gate calibration.',
};

export default function BayesianOptimizationBookPage() {
  return (
    <main id="main" data-pillar="ml">
      <Hero variant="compact" />
      <p className="book-eyebrow">machine learning · book</p>
      <h1>Bayesian optimization</h1>
      <p>
        A working notebook on Bayesian optimization: the surrogate model, the acquisition
        function, and the feedback loop that makes each expensive evaluation count. The
        objective could be a training run, a lab assay, or a qubit calibration sequence.
        The algorithm is the same. The chapters build from the GP prior to practical
        engineering concerns -- kernel priors, noisy observations, batch parallelism, and
        two cross-pillar worked examples.
      </p>
      <ol className="chapter-toc">
        {CHAPTERS.map((c) => (
          <li key={c.slug} className="chapter-toc__item">
            <Link href={`/writing/bayesian-optimization/${c.slug}/`} className="chapter-toc__link">
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
