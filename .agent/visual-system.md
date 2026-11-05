# Visual System

This document defines the design tokens, typography, color, spacing, and
component rules for the future Next.js site build. It is a specification
document, not implementation code. Implementation happens in a separate
session; this document is the single source of truth for visual decisions.

---

## Hierarchy rules

1. One H1 per page. H1 is the page title only; it does not appear in body
   prose.
2. H2 is the pillar level (Code Intelligence / Machine Learning / Quantum
   Computing on the About page; major section titles elsewhere). H2 uses
   small-caps styling and slightly larger leading than body prose.
3. H3 is project or topic level.
4. H4 is the deepest level permitted on site pages. H4 is never used in
   `README.md`. H3 is the floor there.
5. The hierarchy of trust: text > badges > stats > images. A claim supported
   by eight words of prose does not need a badge.

---

## Spacing scale

The spacing system is Fibonacci-based on a `0.25rem` unit.

| Token | Multiplier | Value |
|-------|-----------|-------|
| `--spacing-1` | 1 | 0.25rem |
| `--spacing-2` | 2 | 0.5rem |
| `--spacing-3` | 3 | 0.75rem |
| `--spacing-5` | 5 | 1.25rem |
| `--spacing-8` | 8 | 2rem |
| `--spacing-13` | 13 | 3.25rem |
| `--spacing-21` | 21 | 5.25rem |

- Section gap (between major H2 sections): `--spacing-13`
- Subsection gap (between H3 blocks): `--spacing-8`
- Paragraph gap: `--spacing-5`
- Max prose width: `68ch`
- Code may extend to `82ch` with horizontal scroll; no truncation.

---

## Typography

### Typefaces

| Role | Primary | Fallback |
|------|---------|---------|
| Display (headings) | Fraunces | Iowan Old Style, Apple Garamond, Baskerville, Georgia, serif |
| Body | Inter | system-ui, sans-serif |
| Code | JetBrains Mono | Berkeley Mono, Geist Mono, ui-monospace, monospace |

Fonts load through `next/font/google` in `site/app/layout.tsx`. Berkeley Mono is a CSS fallback only; it is not loaded.

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
| `--color-surface-base` | `#0a0a0f` | Page background |
| `--color-surface-card` | `#131320` | Card and aside backgrounds |
| `--color-surface-hover` | `#1f1f2e` | Hover state for cards and interactive surfaces |
| `--color-surface-rail` | `#1b1b28` | Rail asides, card head rows, diagram node fills (the 30% layer) |
| `--color-surface-elevated` | `#181826` | Elevated panels |

### Borders

| Token | Value (dark) | Value (light) | Use |
|-------|--------------|---------------|-----|
| `--color-border-hair` | `rgba(255, 255, 255, 0.07)` | `rgba(0, 0, 0, 0.07)` | Hairline rules |
| `--color-border-strong` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.14)` | Emphasised borders |

### Text

| Token | Hex | Use |
|-------|-----|-----|
| `--color-text-body` | `#f0ede5` | Primary body text |
| `--color-text-muted` | `#a3a098` | Secondary labels, captions, metadata |
| `--color-text-footnote` | `#757269` | Footnotes, timestamps, minor annotations |

### Accent

One *primary* accent + a four-hue *pillar dimension family*. The primary accent governs all non-pillar UI; the pillar hues are used only on pillar-coded elements. See `.agent/profile-system.md` § Personality motifs § Pillar dimension family for the binding rule.

| Token | Hex (dark) | Hex (light) | Use |
|-------|------------|-------------|-----|
| `--color-accent` | `#f472b6` | `#be185d` | Links, inline `code`, focus rings, footnote markers (`fn-ref`), the nav `~/` mark, the stats-line counts, and the shell prompt glyph (`.prompt-glyph`). Never equal to a pillar hue. Pillar hues additionally apply to home Four pillars story step `h3`s and the stage-synced figure stroke. |
| `--color-pillar-code` | `#22d3ee` | `#0369a1` | Pillar-coded elements where the pillar is *code intelligence*. Hue: cyan (dark) / sky (light). |
| `--color-pillar-ml` | `#a78bfa` | `#6d28d9` | Pillar-coded elements where the pillar is *machine learning*. Hue: violet. |
| `--color-pillar-quantum` | `#34d399` | `#047857` | Pillar-coded elements where the pillar is *quantum computing*. Hue: emerald. |
| `--color-pillar-photonics` | `#fbbf24` | `#b45309` | Pillar-coded elements where the pillar is *photonics*. Hue: amber. |

Values mirror `site/styles/globals.css`, which is the source of truth.

Pillar hues appear in these locations only:

- `mdx-components.tsx` sets `data-pillar` on the three pillar `<h3>`s (`Code intelligence`, `Machine learning`, `Quantum computing`); CSS scopes `.section-num` color via `h3[data-pillar="..."] .section-num`.
- Writing pages set `data-pillar` on `<main>`; CSS maps it to `--pillar-color`.
- The top-of-page hairline (`main::before`): a four-pillar gradient, see § Top-of-page hairline.
- The pillar diagram's border gradient (`.hero__diagram::before`, part of `PillarDiagram`).
- `Hero.tsx` splits the tagline into `<span class="hero-tagline__pillar--code">parsers</span>` + `<span class="hero-tagline__arrow">-></span>` + `<span class="hero-tagline__pillar--quantum">qubits.</span>`. Text content is exactly `parsers -> qubits.` per § Tagline lock.

`color-mix(in oklab, var(--pillar-color) 18%, var(--color-surface-card))` is the standard recipe for "pillar-tinted chrome" (chip background, etc.). Pillar background mixes use `var(--color-surface-card)` as the base, not `var(--color-accent)`.

#### Accent rationale and rule

The accent is rose: `#f472b6` dark, `#be185d` light.

- Pillar hues sit at about 43 (amber), 158 (emerald), 188 (cyan), 255 (violet) degrees. The widest gap (148 degrees) is centred near 329, where the rose sits.
- Rose is near-complementary to emerald.
- It avoids pure red or crimson, which UI convention reads as error.
- Colour meaning is a working model and culture-dependent; prefer a 5-second test with a viewer to assertion.

Rule: the accent never equals a pillar hue. Decorative pillar colouring is forbidden, so the nav `~/` mark and the stats-line counts use the accent, not a pillar hue.

Contrast: the accent must reach >= 4.5:1 on base, card, and rail in both themes, gated by `npm run verify-contrast`.

### Theme boot

An inline script in `site/app/layout.tsx` sets `data-theme` on `<html>` before first paint: the saved choice (read inside try/catch), else `prefers-color-scheme`. The viewport `theme-color` equals `--color-surface-base`. The toggle label is `[ light ]` / `[ dark ]`.

### Light mode

Light mode is implemented as a toggle wired through a `[data-theme="light"]`
attribute on `<html>`. The tokens below are the tested set; the accent has
been contrast-verified (>= 4.5:1) on base, card, and rail (gate: `npm run verify-contrast`).

| Token | Light value | Use |
|-------|-------------|-----|
| `--color-surface-base` | `#faf7f2` | Page background |
| `--color-surface-card` | `#f1ede5` | Card and aside backgrounds |
| `--color-surface-hover` | `#e3ddd1` | Hover state |
| `--color-surface-rail` | `#ebe6db` | Rail asides, card head rows, diagram node fills |
| `--color-text-body` | `#1a1a1a` | Primary body text |
| `--color-text-muted` | `#525252` | Secondary labels |
| `--color-text-footnote` | `#6b6b6b` | Footnotes |
| `--color-accent` | `#be185d` | Links, inline `code`, nav mark, stats counts (light variant of `#f472b6`) |
| `--color-pillar-code` | `#0369a1` | Pillar: code intelligence |
| `--color-pillar-ml` | `#6d28d9` | Pillar: machine learning |
| `--color-pillar-quantum` | `#047857` | Pillar: quantum computing |
| `--color-pillar-photonics` | `#b45309` | Pillar: photonics |

Defaults: `prefers-color-scheme` on first visit; user choice persists in
`localStorage` key `theme` (values `light` | `dark`). An anti-flash inline
`<script>` in `<head>` sets the attribute synchronously before paint.

### Border hairlines

One neutral border token, expressed as alpha over the body text color so
the line works at every surface step.

| Token | Dark | Light | Use |
|-------|------|-------|-----|
| `--color-border-hair` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.07)` | Hairline under `<SectionRule>` H2 |

---

## Hero diagram

The canonical ASCII pillar diagram is the single shared visual motif across the README and site Home/About. It is reproduced verbatim from `.agent/profile-system.md` § Personality motifs. Do not modify the characters, the spacing, or the case. On the site, the pillar diagram renders as the closing map of the home Four pillars story (`.parse-story__map`); still the home page, string unchanged.

### Implementation rules

- Renders inside `<pre>` (site) or a `text`-language codefence (README).
- Font: `var(--font-mono)` (JetBrains Mono, then Berkeley Mono, Geist Mono, ui-monospace fallbacks).
- Line height: `1.2`.
- No surrounding background, border, or box-shadow.
- The `parsers -> qubits.` line is the single accent reveal: opacity 0 → 1 fade over 400ms (`accent-fade-in` in `globals.css`) on initial render, then static in the pillar-coloured spans (`parsers` in `--color-pillar-code`, `qubits.` in `--color-pillar-quantum`). No hover state, no other animation.
- ASCII only: `+`, `-`, `|`, `\`, `/`, `>`. No Unicode arrows. No box-drawing characters. No emoji.
- Width is fixed at 60 characters between the `+` borders.

---

## Top-of-page hairline

Every page renders a 1px horizontal hairline at the very top of `<main>`,
echoing the OG-image hairline motif. It is a personality motif, not
decoration, and is binding.

- Color: a gradient of all four pillar hues in order (code, ml, quantum, photonics), a signature of the pillar family. It does not use the accent.
- Implemented as a `main::before` pseudo-element. Spans the full width
  inside the `<main>` container.
- Pointer events disabled; the hairline never receives focus.

---

## Section numbering motif

The three pillar headings on the About page (`Code intelligence`,
`Machine learning`, `Quantum computing`) render with a small monospace
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
weight. Replaces inline trailing tag suffixes on Selected work.

- Background: `var(--color-surface-rail)`. Color: `var(--color-text-muted)`.
- Padding `2px 6px`, radius `3px`, mono `0.8em`, letter-spacing `0.03em`.
- No hover state. No border. No animation.
- Wrapped in `<span class="chips">` when more than one chip follows the
  same prose item (provides flex layout and gap).

---

## Footnote markers

`.fn-ref` styles inline `[N]` superscript links to the bottom-of-page
footnote list. Mono `0.8em`, color `var(--color-accent)`,
vertical-align `0.3em`, no underline at rest. Underline appears on hover.

---

## Stats line

A single monospace line under the home hero tagline reveal:

`4 pillars  ·  5 repos  ·  rust + python + typescript  ·  last build YYYY-MM-DD  ·  zuit · rust SAST`

The last chip is the proof chip: a link (`zuit · rust SAST`) to the zuit
repository, styled in the accent color. There is no mood chip.

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
- Background: `--color-surface-base` (`#0a0a0f`). No tint, no border, no box shadow.
- Line numbers: single left-aligned column. Font: code typeface, `--color-text-muted`
  color.
- Horizontal scroll at `82ch`. No line wrapping inside code blocks.
- Inline `code`: `--color-accent` (`#f472b6` dark, `#be185d` light) color, `--color-surface-card` background,
  `2px 4px` padding, `3px` border-radius.

---

## OG image rules

No OG image. Text `og:title` / `og:description` and `twitter:card=summary` are set in `site/app/layout.tsx`. Favicon: `site/app/icon.svg` (four pillar bars).

---

## Surface distribution and animation

### Pixel-coverage 60-30-10

The single-accent rule is unchanged: there is still exactly one accent
token (`--color-accent`). The 60-30-10 distribution is expressed as
**pixel coverage** of the existing three-token surface system, not as
introduction of new colors.

| Share | Token | Used for |
|-------|-------|----------|
| 60% | `--color-surface-base` | Page background and section padding |
| 30% | `--color-surface-card` + `--color-surface-rail` + `--color-text-body` | Card chrome, rail asides, card head rows, diagram node fills, prose ink |
| 10% | `--color-accent` | Section numbers, [N] markers, status chips when active, link underline, SVG accent edge, inline code foreground, table key column |

### Allowed animations (updated)

Any further animation requires a documentation step here.

| Animation | Where | Duration | Easing | Behavior |
|-----------|-------|----------|--------|----------|
| Accent reveal (tagline fade) | `.hero-tagline` on `/` | per `accent-fade-in` in `globals.css` | ease-out | One play on initial paint |
| Blink cursor | `.blink-cursor` | 1.05s steps | steps(1, end) | Infinite blink |
| MZI beams | `.mzi-beam--a/b`, `.mzi-phase-dot` (photonics MDX) | 4s | ease-in-out | Infinite sweep and phase pulse |
| Parse-story stage transitions | `.parse-story__node` on `/` | transform 600ms, opacity 400ms | ease-out | Driven by `data-stage` on `.parse-story`, set by an IntersectionObserver in `StageObserver.tsx` |
| Stage-4 pulse | waveguide dash in the `.parse-story__figure` | 2.6s (`ps-travel` keyframes) | linear | `stroke-dashoffset` only, active only when `data-stage="4"` |

The tagline fade, blink cursor, and MZI beams are CSS-only. `ParseStory.tsx`
is a server component; `StageObserver.tsx` is the only client island in the
story and only sets `data-stage` via `setAttribute`. `HelpDialog.tsx` is a
client component and has no animation. Every animation above has a rule in a
`prefers-reduced-motion` block in `globals.css` (stage nodes resolve to 0s transitions; the stage-4 dash is
static at the midpoint).

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
