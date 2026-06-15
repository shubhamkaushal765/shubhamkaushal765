export type Chapter = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  reading: string;
};

export const CHAPTERS: Chapter[] = [
  {
    number: '01',
    slug: 'why-bayesian-optimization',
    title: 'Why Bayesian optimization? Sample efficiency, not scale.',
    summary:
      'Training a neural network, running a lab assay, and calibrating a qubit share one property: each evaluation is expensive and you cannot afford many. Bayesian optimization formalizes the surrogate-plus-acquisition loop that gets the most information per query.',
    reading: '12 min',
  },
  {
    number: '02',
    slug: 'gaussian-processes',
    title: 'Gaussian processes: a surrogate that quantifies its own doubt.',
    summary:
      'A GP places a prior over functions and updates it with observations to produce a posterior mean and variance at every untried point. The kernel encodes prior beliefs about smoothness; the marginal likelihood tunes it automatically.',
    reading: '14 min',
  },
  {
    number: '03',
    slug: 'acquisition-functions',
    title: 'Acquisition functions: turning uncertainty into the next query.',
    summary:
      'Expected improvement, probability of improvement, GP-UCB, and Thompson sampling each define a different policy for trading off exploration against exploitation. Optimizing the acquisition is cheap relative to the black-box objective.',
    reading: '13 min',
  },
  {
    number: '04',
    slug: 'the-loop-in-practice',
    title: 'The loop in practice: priors, noise, and where it breaks.',
    summary:
      'Kernel and length-scale priors matter more than most tutorials admit. Noisy observations, input warping, high-dimensional search spaces, and batch parallelism each require specific design choices that the basic loop glosses over.',
    reading: '15 min',
  },
  {
    number: '05',
    slug: 'bo-in-the-wild',
    title: 'Bayesian optimization in the wild: hyperparameters and qubit calibration.',
    summary:
      'Two worked domains: tuning ML embedding models (the RAG pipeline from the code-intelligence pillar) and qubit gate calibration (RB, T1, T2, gate tomography) framed as sequential black-box optimization. Reproducibility via seeds and fixtures.',
    reading: '16 min',
  },
];
