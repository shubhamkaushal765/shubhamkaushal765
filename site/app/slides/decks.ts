/**
 * Registry of slide decks. Mirrors the book/chapter registry under
 * app/writing/<slug>/chapters.ts.
 *
 * A "folder" groups several decks on one topic under /slides/<slug>/.
 * A folder's decks are static reveal.js pages under
 * public/slides/<folder-slug>/<deck-slug>/index.html.
 * A "standalone" entry is a single deck with no folder page.
 */

export type Pillar = 'code-int' | 'ml' | 'quantum' | 'photonics';

export type Deck = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  /** Slide count, e.g. '14 slides'. */
  length: string;
  /** Lecture / paper the deck is adapted from, shown on the folder page. */
  source?: { label: string; href: string };
};

export type DeckFolder = {
  kind: 'folder';
  slug: string;
  title: string;
  summary: string;
  pillar: Pillar;
  pillarLabel: string;
  date: string;
  status: 'upcoming' | 'draft' | 'published';
  decks: Deck[];
};

export type StandaloneDeck = {
  kind: 'standalone';
  /** Folder slug under public/slides/ that holds the deck. */
  folder: string;
  deck: Deck;
  pillar: Pillar;
  pillarLabel: string;
  date: string;
  status: 'upcoming' | 'draft' | 'published';
};

export type SlideEntry = DeckFolder | StandaloneDeck;

export const PHOTONIC_IC_DECKS: Deck[] = [
  {
    number: '01',
    slug: '01-introduction',
    title: 'Photonic integrated circuits: an introduction',
    summary:
      'What integrated photonics is, the three inventions that turned optics into photonics, the sub-fields photonics absorbed, and why a guided-wave circuit on a planar substrate is the whole idea.',
    length: '22 slides',
    source: {
      label: 'NPTEL, Lec 05 Photonic integrated circuits: an introduction',
      href: 'https://www.youtube.com/watch?v=MOKPFINLPXE',
    },
  },
  {
    number: '02',
    slug: '02-evolution',
    title: 'Photonic integrated circuits: the technology evolution',
    summary:
      'Sixty years of key events, from the first planar waveguide through lithium niobate and the III-V versus silicon race to commercial silicon photonics, and the two demands (communication and compute) that pulled the technology along.',
    length: '18 slides',
    source: {
      label: 'NPTEL, Lec 06 Photonic integrated circuits evolution',
      href: 'https://www.youtube.com/watch?v=2JK2OGKzSEM',
    },
  },
  {
    number: '03',
    slug: '03-components-1',
    title: 'Photonic integrated circuits: components, part 1',
    summary:
      'The passive power-handling toolkit: waveguides and bends, Y-branch and multimode-interference splitters, mirrors and gratings, and the directional coupler, with sliders for the split ratio and the coupling length.',
    length: '15 slides',
    source: {
      label: 'NPTEL, Lec 07 Photonic integrated circuit components 1',
      href: 'https://www.youtube.com/watch?v=fCc8OQ7H9lg',
    },
  },
];

export const SLIDES: SlideEntry[] = [
  {
    kind: 'folder',
    slug: 'photonic-integrated-circuits',
    title: 'Photonic integrated circuits',
    summary:
      'A lecture-by-lecture deck series on photonic integrated circuits: what gets integrated, why light needs a waveguide once it leaves the optical table, and how the component physics builds up to a circuit.',
    pillar: 'photonics',
    pillarLabel: 'photonics',
    date: '2026-Q3',
    status: 'draft',
    decks: PHOTONIC_IC_DECKS,
  },
];
