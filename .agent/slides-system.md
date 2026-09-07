# Slides System

This document governs the `Slides` section of the site (`/slides/`). It is
the binding reference for how a deck is built, where it lives, and what it
is allowed to look like. Decks are reveal.js pages. The visual tokens are
the same ones the rest of the site uses (`.agent/visual-system.md`); this
document only adds what is specific to a full-screen, stepwise deck.

Reference implementation:
`site/public/slides/photonic-integrated-circuits/01-introduction/index.html`.

---

## Purpose

A deck exists to make an explanation easier than prose would. It leans on
animated SVG diagrams, stepwise reveals, and tables. If a slide could be a
paragraph, it should be a paragraph in the blog instead. The blog is for
reading; the slides are for showing.

---

## Structure

The Slides tab mirrors the Blog tab: an index page, "folders" (a series of
decks on one topic), and standalone decks.

| Piece | Location | Notes |
|-------|----------|-------|
| Nav item | `site/components/Nav.tsx` | `{ href: '/slides/', label: 'slides' }`, beside `blog` |
| Registry | `site/app/slides/decks.ts` | `SLIDES: SlideEntry[]`, one `DeckFolder` or `StandaloneDeck` per entry; each folder exports its own `Deck[]` constant |
| Index page | `site/app/slides/page.tsx` | Reuses the `.blog-list` / `.blog-entry` classes; folders list their decks inline the way books list chapters |
| Folder page | `site/app/slides/<folder-slug>/page.tsx` | Reuses `.book-eyebrow` + `.chapter-toc`; sets `data-pillar` on `<main>` |
| Deck | `site/public/slides/<folder-slug>/<deck-slug>/index.html` | One self-contained reveal.js HTML file; static, copied verbatim into the export |
| URL helper | `site/lib/site-config.ts` | `deckUrl(folder, deck)` prefixes `SITE_BASE_PATH` for plain `<a href>` links |

Deck slugs are zero-padded and ordered: `01-introduction`, `02-...`. Folder
slugs are kebab-case topic names: `photonic-integrated-circuits`.

Decks live under `public/`, not under `app/`, on purpose:

- `globals.css` constrains `<main>` to a reading column and restyles every
  heading and paragraph; a full-screen deck should not fight it.
- A deck is a single file that can be opened, copied, or presented offline
  with nothing but a browser.
- Next.js does not process `public/`, so Link-prefetch and client routing
  never touch a deck. Link to a deck with a plain `<a href={deckUrl(...)}>`,
  never `<Link>`.

Links from inside a deck back to the site are relative (`../../../slides/`,
`../../../`), so the deck works under the Pages `basePath` and from a local
static server alike.

---

## Adding a deck

1. Author `site/public/slides/<folder>/<NN-slug>/index.html`. Start from the
   reference deck: copy its `<head>`, `<style>`, the `.deck-label`, and the
   `<script>` block, then replace the `<section>`s.
2. Register it in `site/app/slides/decks.ts`: add a `Deck` to the folder's
   array (number, slug, title, summary, `length` as `'NN slides'`, and a
   `source` when adapted from a lecture or paper).
3. If it is a new folder: add a `DeckFolder` to `SLIDES`, create
   `site/app/slides/<folder>/page.tsx` from the photonic-integrated-circuits
   page, and confirm `main[data-pillar="<pillar>"]` exists in `globals.css`.
4. If it is a standalone deck: add a `StandaloneDeck` to `SLIDES`, pointing
   `folder` at the `public/slides/<folder>/` directory that holds it.
5. `cd site && npm run typecheck && npm run lint && npm run build`, then open
   `out/slides/<folder>/<deck>/index.html` through a static server and step
   through every slide once with the keyboard.

---

## Deck anatomy

Every deck has, in order:

1. **Title slide.** Eyebrow (`pillar | series | deck NN`), H1, one-line
   summary, an animated hero SVG, and the key hint
   (`Arrow keys to move. f fullscreen. ? key map.`).
2. **Content slides.** Each carries an eyebrow with a bracket number
   `[ NN ]` and the section name, one H2 that states the claim of the slide
   (a sentence, not a topic label), and one figure or table.
3. **Check your understanding.** Three reasoning questions as fragments,
   then a `what to remember` card. Same retention scaffolding as a blog
   chapter.
4. **End slide.** What the next deck covers, the source attribution with a
   link, and links back to the folder page and the slides index.

Numbering: content slides are numbered `[ 01 ]` upward in the eyebrow.
Auto-animate pairs share one number. The title and end slides carry the
series eyebrow instead of a number.

---

## Content rules

- **One claim per slide.** The H2 is the claim. If a slide needs two H2s
  it is two slides.
- **Figure or table on every content slide.** A slide with only text is
  not allowed outside the check-your-understanding and end slides.
- **Fragments carry the argument.** Reveal a diagram in the order the
  explanation needs it; use `data-fragment-index` explicitly so the text
  and the drawing step together.
- **Tables use the site recipe.** Mono uppercase headers on the rail
  surface, the first column in the accent, hairline row borders. Rows may
  be fragments.
- **Interactivity is welcome when it teaches.** A slider that changes a
  physical quantity (the Mach-Zehnder phase demo) is the model. Guard
  reveal's keyboard handling with `keyboardCondition` so form controls own
  their own arrow keys.
- **Attribution.** A deck adapted from a lecture or paper names it on the
  end slide with a link and states which parts are original (diagrams,
  demos, ordering).
- **Voice.** Same as `.agent/writing-strategy.md`: direct, second person
  allowed, no hype, no emoji anywhere in the file (hard rule from
  `AGENTS.md`).

---

## Visual rules

Tokens are copied into the deck's `:root` from `globals.css`; keep them in
sync when the site palette changes.

- **Surfaces and text.** `--bg`, `--card`, `--rail`, `--elevated`,
  `--hair`, `--strong`, `--text`, `--muted`, `--footnote` map one to one
  onto the site tokens. Dark only; decks do not carry the light toggle.
- **Accent.** The deck's `--accent` is the pillar colour of its folder
  (photonics is amber `#fbbf24`). The other pillar hues are available for
  semantic contrast only: cyan for electrical signals, violet for a second
  path or an acoustic wave, emerald for detectors and single photons.
  Do not use them decoratively.
- **Type.** Fraunces for headings, Inter for prose, JetBrains Mono for
  eyebrows, labels, table headers, and SVG text. Weights 400, 500, 600 only.
- **Chrome.** 1px accent hairline across the top of the viewport (the
  site's top-of-page motif), a 2px accent progress bar, mono `c/t` slide
  number bottom-right, and a fixed mono deck label bottom-left linking to
  `~/sk` and `slides`.
- **Layout.** `center: false`, left-ragged text, `1180 x 700` logical
  canvas, two-column `.cols` grid (text left, figure right) as the default
  content layout. Prose measures at most `34em`.

---

## SVG rules

Same rules as the site's diagrams (`AGENTS.md` § Diagrams workflow), with
the additions a deck needs:

- Inline `<svg>` only. Never `<img src>`.
- Geometric primitives only (rect, path, line, circle, text). No glyph
  icons.
- Every figure carries `role="img"`, a `<title>`, and a `<desc>` that
  describes the mechanism technically. Catalogue thumbnails are
  `aria-hidden="true"`.
- Strokes at `1.5px` or wider. Light beams use the accent at `2.5px`.
- Use the shared classes: `.box` (node), `.box.acc` (accent node),
  `.chip` (substrate), `.guide` (waveguide body), `.beam` (light),
  `.elec` (electrical signal), `.dot` (photon), `.wire` (neutral line).
- Reuse the same figure grammar across decks so a reader learns it once:
  amber lines are light, cyan square pulses are electronics, a green dot
  in a box is a detector, a translucent amber band is a waveguide.

---

## Animation rules

Motion is opacity, stroke, or position along a path. Nothing bounces,
scales, or spins.

| Class | Effect | Trigger |
|-------|--------|---------|
| `.draw` | Stroke draws itself in (`stroke-dashoffset` to 0); set `--len`, `--dur`, `--delay` inline | `section.present` or `.fragment.visible` |
| `.flowing` | Moving dash pattern along a beam | same |
| `.rider` | A dot travels the beam via `offset-path`; set `--dur`, `--delay` | same |
| `.blink` | Detector pip pulses | same |
| `.appear` | Fade up by 8px; set `--delay` | same |

- Animations key off reveal's `.present` and `.fragment.visible` classes
  so they replay every time a slide or fragment is entered.
- Animations inside an unrevealed fragment are held (`animation: none`)
  until the fragment becomes visible.
- Slide transition is `fade`; auto-animate is allowed for a before/after
  pair that shares `data-auto-animate-id` and `data-id` attributes.
- `prefers-reduced-motion: reduce` resolves every animation to its final
  state and sets the reveal transition to `none`. This is mandatory, not
  optional.
- No autoplay and no timed slide advance. The reader drives.

---

## Dependencies

- reveal.js is loaded from jsDelivr, pinned to an exact version
  (`reveal.js@6.0.1`, `dist/reveal.css` and `dist/reveal.js`). Bump the
  pin deliberately and re-test every deck.
- Fonts come from Google Fonts with real fallback stacks.
- No plugins, no markdown, no build step. The HTML is the source.
