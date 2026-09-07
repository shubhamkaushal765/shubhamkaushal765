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
    length: '21 slides',
    source: {
      label: 'NPTEL, Lec 05 Photonic integrated circuits: an introduction',
      href: 'https://www.youtube.com/watch?v=MOKPFINLPXE',
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
