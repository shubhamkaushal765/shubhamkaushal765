# Visual System

This document defines the design tokens, typography, color, spacing, and
component rules for the future Next.js site build. It is a specification
document, not implementation code. Implementation happens in a separate
session; this document is the single source of truth for visual decisions.

---

## Hierarchy rules

1. One H1 per page. H1 is the page title only — it does not appear in body
   prose.
2. H2 is the pillar level (Code Intelligence / Machine Learning / Quantum
   Computing on the About page; major section titles elsewhere). H2 uses
   small-caps styling and slightly larger leading than body prose.
3. H3 is project or topic level.
4. H4 is the deepest level permitted on site pages. H4 is never used in
   `README.md` — H3 is the floor there.
5. The hierarchy of trust: text > badges > stats > images. A claim supported
   by eight words of prose does not need a badge.

---

## Spacing scale

The spacing system is Fibonacci-based on a `0.25rem` unit.

| Token | Multiplier | Value |
|-------|-----------|-------|
| `--space-1` | 1 | 0.25rem |
| `--space-2` | 2 | 0.5rem |
| `--space-3` | 3 | 0.75rem |
| `--space-5` | 5 | 1.25rem |
| `--space-8` | 8 | 2rem |
| `--space-13` | 13 | 3.25rem |

- Section gap (between major H2 sections): `--space-13`
- Subsection gap (between H3 blocks): `--space-8`
- Paragraph gap: `--space-5`
- Max prose width: `68ch`
- Code may extend to `82ch` with horizontal scroll; no truncation.

---

## Typography

### Typefaces

| Role | Primary | Fallback |
|------|---------|---------|
| Headings | Inter Display | Inter, system-ui, sans-serif |
| Prose | Inter | system-ui, sans-serif |
| Code | Berkeley Mono | JetBrains Mono, Geist Mono, ui-monospace, monospace |
| Math | STIX Two Math | KaTeX default serif |

### Heading styles

- Weight: 600.
- Tracking: `-0.02em`.
- Optical sizing: `font-optical-sizing: auto` (on for display sizes).
- H2 only: `font-variant: small-caps`.
- No italic display headings.
- No drop caps.
- Always left-aligned (left-rag). No centered headings in body content.

### Prose styles

- Weight: 400.
- Line height: `leading-7` (approximately `1.75`).
- No bold prose except for term definitions.
- Allowed weights across the entire type system: 400, 500, 600. No 700, no
  800, no 900 outside of the `<b>` override for term definitions.

---

## Color tokens (dark default)

### Surfaces

| Token | Hex | Use |
|-------|-----|-----|
| `--surface-base` | `#0a0a0a` | Page background |
| `--surface-card` | `#131318` | Card and aside backgrounds |
| `--surface-hover` | `#1f1f27` | Hover state for cards and interactive surfaces |
| `--surface-rail` | `#1b1b22` | Rail asides, card head rows, diagram node fills (the 30% layer) |

### Text

| Token | Hex | Use |
|-------|-----|-----|
| `--text-body` | `#ededed` | Primary body text |
| `--text-muted` | `#a3a3a3` | Secondary labels, captions, metadata |
| `--text-footnote` | `#737373` | Footnotes, timestamps, minor annotations |

### Accent

One accent color only. Do not introduce a second accent.

| Token | Hex | Use |
|-------|-----|-----|
| `--accent` | `#7dd3fc` | Links, inline `code`, single reveal animation |

### Light mode

Light mode is implemented as a toggle wired through a `[data-theme="light"]`
attribute on `<html>`. The tokens below are the tested set; the accent has
been hue-preserved (sky family) and contrast-verified at 5.7:1 on the light
base.

| Token | Light value | Use |
|-------|-------------|-----|
| `--color-surface-base` | `#fafafa` | Page background |
| `--color-surface-card` | `#efeff3` | Card and aside backgrounds |
| `--color-surface-hover` | `#dedee4` | Hover state |
| `--color-surface-rail` | `#e6e6ec` | Rail asides, card head rows, diagram node fills |
| `--color-text-body` | `#171717` | Primary body text |
| `--color-text-muted` | `#525252` | Secondary labels |
| `--color-text-footnote` | `#737373` | Footnotes |
| `--color-accent` | `#0284c7` | Links, inline `code`, hero reveal (light variant of `#7dd3fc`) |

Defaults: `prefers-color-scheme` on first visit; user choice persists in
`localStorage` key `theme` (values `light` | `dark`). An anti-flash inline
`<script>` in `<head>` sets the attribute synchronously before paint.

### Border hairlines

One neutral border token, expressed as alpha over the body text color so
the line works at every surface step.

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--color-border-hair` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.04)` | Hairline under `<SectionRule>` H2, the rule below the `.topic-card__head` row |

---

## Hero diagram

The canonical ASCII pillar diagram is the single shared visual motif across the README and site Home/About. It is reproduced verbatim from `.agent/profile-system.md` § Personality motifs. Do not modify the characters, the spacing, or the case.

### Implementation rules

- Renders inside `<pre>` (site) or a `text`-language codefence (README).
- Font: `var(--font-mono)` (Berkeley Mono → JetBrains Mono → Geist Mono fallback chain).
- Line height: `1.2`.
- No surrounding background, border, or box-shadow.
- The `parsers -> qubits.` line is the single accent reveal: opacity 0 → 1 fade over 200ms on initial render, then static at `var(--color-accent)` (`#7dd3fc`). No hover state, no other animation.
- ASCII only: `+`, `-`, `|`, `\`, `/`, `>`. No Unicode arrows. No box-drawing characters. No emoji.
- Width is fixed at 60 characters between the `+` borders.

---

## Top-of-page hairline

Every page renders a 1px horizontal hairline at the very top of `<main>`,
echoing the OG-image hairline motif. It is a personality motif, not
decoration, and is binding.

- Color: `color-mix(in oklab, var(--color-accent) 15%, transparent)`. Both
  themes use the same token; opacity is the differentiator.
- Implemented as a `main::before` pseudo-element. Spans the full width
  inside the `<main>` container.
- Pointer events disabled; the hairline never receives focus.

---

## Section numbering motif

The three pillar headings on the About page — `Code intelligence`,
`Machine learning`, `Quantum computing` — render with a small monospace
prefix `01` / `02` / `03` in the footnote-color, 0.75em, 0.1em
letter-spacing. The prefix is `aria-hidden="true"` so screen readers do
not announce it.

This is implemented in `mdx-components.tsx` via an `h3` override that
matches the three exact heading strings. No other H3 receives a number.
Do not add numbers to other headings.

---

## Bracket motif

`<SectionRule>` accepts an optional `number` prop. When set, the rendered
H2 carries a monospace bracket prefix `[ NN ] ` styled by the existing
`.section-num` class. The 1px hairline rule below the heading uses
`var(--color-border-hair)`. The rule moved from above the heading
(previous design) to below it.

Numbering convention:

- Major content sections on Home and About get a number (`01`, `02`, ...).
- Footer-style sections (e.g., `Connect` on Home) render `<SectionRule>`
  without a `number` prop.
- The bracket prefix lives inside the H2 so the small-caps run continues
  naturally across the prefix and heading text.

---

## Status chips

`.chip` is a mono pill used to surface status/tag values without prose
weight. Replaces inline trailing tag suffixes on Selected work and
replaces `.topic-card__tag` on Highlights.

- Background: `var(--color-surface-rail)`. Color: `var(--color-text-muted)`.
- Padding `2px 6px`, radius `3px`, mono `0.8em`, letter-spacing `0.03em`.
- No hover state. No border. No animation.
- Wrapped in `<span class="chips">` when more than one chip follows the
  same prose item (provides flex layout and gap).

---

## Footnote markers

`.fn-ref` styles inline `[N]` superscript links to the bottom-of-page
`<FootnoteList>`. Mono `0.8em`, color `var(--color-accent)`,
vertical-align `0.3em`, no underline at rest. Underline appears on hover.

---

## Stats line

A single monospace line under the home hero tagline reveal:

`3 pillars  ·  5 repos  ·  rust + python + typescript  ·  last build YYYY-MM-DD`

Server component `site/components/StatsLine.tsx` reads `BUILD_META` from
`site/lib/build-meta.ts`. `BUILD_META.lastBuild` resolves at static-export
build time via `new Date().toISOString().slice(0, 10)`. `build-meta.ts`
is never imported from a client component. Rendered only on `/`.

---

## Link style

- Underline: `1px solid currentColor` at `50%` opacity.
- Underline offset: `2px`.
- No color change on hover.
- On hover: opacity transitions to `100%` only. No other change.
- No visited-state color change.
- External links: no icon. Links open in the same tab unless the destination
  is a PDF, in which case `target="_blank"` with `rel="noopener noreferrer"`.

---

## Code blocks

- Syntax highlighting: Shiki.
- Theme: `vesper` (preferred) or `vitesse-dark`.
- Background: `--surface-base` (`#0a0a0a`) — no tint, no border, no box shadow.
- Line numbers: single left-aligned column. Font: code typeface, `--text-muted`
  color.
- Horizontal scroll at `82ch`. No line wrapping inside code blocks.
- Inline `code`: `--accent` (`#7dd3fc`) color, `--surface-card` background,
  `2px 4px` padding, `3px` border-radius.

---

## OG image rules

Default: no OG image. The site renders without one until the first quantum
essay ships.

When OG images are needed:

- Generator: `@vercel/og` at build time (not at request time).
- Background: `#0a0a0a` (solid, no gradient).
- Text: white Inter Display — page name on one line, tagline on the next.
  Weight 600 for the page name, 400 for the tagline.
- Single hairline: `1px` white line at `60%` from the top of the image.
  Opacity `15%`.
- No emoji in OG images.
- No avatar or profile photo.
- No gradient backgrounds.
- No illustrations.

---

## Highlight cards

The home page renders a four-topic "Highlights" section between Selected work
and Bridges. The pattern is implemented in `site/components/Highlights.tsx`
plus the four inline-SVG diagram components in
`site/components/diagrams/`.

### Pixel-coverage 60-30-10

The single-accent rule is unchanged — there is still exactly one accent
token (`--color-accent`). The 60-30-10 distribution is expressed as
**pixel coverage** of the existing three-token surface system, not as
introduction of new colors.

| Share | Token | Used for |
|-------|-------|----------|
| 60% | `--color-surface-base` | Page background and section padding |
| 30% | `--color-surface-card` + `--color-surface-rail` + `--color-text-body` | Card chrome, rail asides, card head rows, diagram node fills, prose ink |
| 10% | `--color-accent` | Section numbers, [N] markers, status chips when active, link underline, SVG accent edge, inline code foreground, table key column |

### Card layout

- One column at all breakpoints (4 cards stack vertically inside the 68ch
  reading column).
- Internal sub-grid (`.topic-card__body`) is 2-column at ≥640px (`table |
  diagram`), single column below.
- Card padding `var(--spacing-5)`. Inter-card gap `var(--spacing-8)`.
- Card background `var(--color-surface-card)`. **No hover state** — cards
  read as static reference units. (Distinct from `.selected-work li` which
  does carry a hover background; the difference is deliberate.)
- No box-shadow, no border. The card stands by background contrast only.

### Diagrams

- Hand-authored inline `<svg>` per topic. Sources of intent committed as
  mermaid `.mmd` files under `site/diagrams/`. Never `<img src>` — `currentColor`
  cascading requires DOM-embedded SVG.
- `viewBox="0 0 320 180"` consistent across all four diagrams.
- Stroke width ≥ 1.5px so light-mode `--color-accent` (`#0284c7` at 5.7:1
  on `#fafafa`) does not visually thin out.
- Only geometric primitives (rect, line, path, text). No glyph icons, no
  gears, no lightning bolts.
- Each diagram has one accent edge, the data-flow edge, painted with
  `stroke="var(--color-accent)"` directly. All other strokes use
  `currentColor` and resolve against the body text color.
- Each diagram carries `role="img"` + `<title>` + `<desc>` describing what
  the diagram shows technically, per the photography policy below.

### Allowed animations (updated)

The previous single allowed site animation (the 200ms accent fade on the
home hero tagline) is extended by exactly one rule. Any further addition
requires the same documentation step here.

| Animation | Where | Duration | Easing | Behavior |
|-----------|-------|----------|--------|----------|
| Accent reveal | `.hero-tagline` on `/` | 200ms | ease-out | One play on initial paint |
| Flow-dash | `.flow-edge--animated` inside topic-card diagrams | 1200ms | ease-out | Stroke-dashoffset travels from var(--dash-len, 60) to 0; the delay reads var(--flow-delay, 200ms) set inline per diagram (200/350/500/650ms in card order). Both endpoints respect prefers-reduced-motion: reduce and resolve to a static line |

Both animations are CSS-only. No `'use client'` anywhere in the chain.
Reduced-motion overrides live in the single `@media (prefers-reduced-motion:
reduce)` block at the end of `globals.css`.

---

## Photography and illustration policy

- No stock photography anywhere on the site.
- No AI-generated hero images.
- Allowed imagery: surface-code diagrams (SVG exported from Stim outputs),
  syndrome graphs, parser AST visualizations, `zuit` SARIF screenshots.
- Preferred format: SVG. PNG is acceptable when SVG is not available (e.g.,
  screenshots). No JPEG for diagrams.
- All images must have explicit `alt` text describing the diagram content
  technically, not aesthetically.

---

## Surface contrast verification

`site/scripts/verify-contrast.mjs` enumerates the (foreground, background,
theme) triples that the site renders and computes WCAG 2.1 relative-
luminance contrast. The build fails if any pair drops below its threshold.
Run via `npm run verify-contrast` (it is also wired as a pre-step of
`npm run build`).

Adding a new (fg, bg) combination anywhere on the site requires adding
the corresponding row to the script's `PAIRS` array.
