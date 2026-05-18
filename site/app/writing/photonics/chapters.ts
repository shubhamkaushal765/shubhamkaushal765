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
    slug: 'qumodes-not-qubits',
    title: 'Why photonics? Qumodes, not qubits.',
    summary:
      'Why light is an attractive carrier of quantum information, and why photonic platforms reach beyond the qubit into the infinite-dimensional state space of a bosonic mode.',
    reading: '8 min',
  },
  {
    number: '02',
    slug: 'phase-space',
    title: 'Phase space and the Wigner picture.',
    summary:
      'CV quantum states as quasi-probability distributions in (x, p), and why Wigner negativity is the resource that matters.',
    reading: '9 min',
  },
  {
    number: '03',
    slug: 'gaussian-operations',
    title: 'Gaussian operations on a photonic chip.',
    summary:
      'Phase shifters, beam splitters, and squeezers as the symplectic alphabet of CV photonic circuits — and why Gaussian-only chips are classically simulable.',
    reading: '10 min',
  },
  {
    number: '04',
    slug: 'non-gaussian',
    title: 'Non-Gaussian resources: where the magic lives.',
    summary:
      'How discrete non-Gaussian states — Fock, cat, cubic-phase, GKP — supply the computational resource that Gaussian-only photonics lacks.',
    reading: '11 min',
  },
  {
    number: '05',
    slug: 'architectures',
    title: 'Architectures: MBQC, fusion-based, and the loss problem.',
    summary:
      'A comparative survey of measurement-based and fusion-based photonic QC, and how each absorbs the dominant cost of photon loss.',
    reading: '13 min',
  },
];
