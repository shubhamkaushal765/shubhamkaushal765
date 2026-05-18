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
    slug: 'structure-not-surface',
    title: 'Why code intelligence? Structure, not surface.',
    summary:
      'Working on the tree, the graph, and the symbol table beats working on the text — explained without making you read a compilers textbook first.',
    reading: '9 min',
  },
  {
    number: '02',
    slug: 'lexing-and-parsing',
    title: 'Lexing, parsing, and the trees you get for your trouble.',
    summary:
      'Bytes become tokens, tokens become a concrete tree, the concrete tree gets pruned into an abstract tree. Each step throws something away and earns something — and incremental parsing is what makes the whole thing usable in an IDE.',
    reading: '11 min',
  },
  {
    number: '03',
    slug: 'control-flow-and-dataflow',
    title: 'Control flow, dataflow, and what soundness costs.',
    summary:
      'The graph, the lattice, and the fixed point — how a static analyzer actually computes facts about your program, and why being right and being useful are in tension.',
    reading: '12 min',
  },
  {
    number: '04',
    slug: 'language-servers',
    title: 'The language server as an incremental cache.',
    summary:
      'LSP, salsa-style query systems, and the cache-invalidation problem at the heart of every modern IDE — why latency, not algorithmic correctness, is the binding constraint.',
    reading: '12 min',
  },
  {
    number: '05',
    slug: 'symbolic-and-neural',
    title: 'Symbolic and neural: hybrid code intelligence.',
    summary:
      'Embeddings over code, retrieval pipelines, and why the production system you actually want is a language server plus a vector index plus a model — wired up so each does what it is good at.',
    reading: '13 min',
  },
];
