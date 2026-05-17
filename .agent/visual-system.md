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
| `--surface-card` | `#111111` | Card and aside backgrounds |
| `--surface-hover` | `#161616` | Hover state for cards and interactive surfaces |

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
| `--color-surface-card` | `#f5f5f5` | Card and aside backgrounds |
| `--color-surface-hover` | `#ececec` | Hover state |
| `--color-text-body` | `#171717` | Primary body text |
| `--color-text-muted` | `#525252` | Secondary labels |
| `--color-text-footnote` | `#737373` | Footnotes |
| `--color-accent` | `#0284c7` | Links, inline `code`, hero reveal (light variant of `#7dd3fc`) |

Defaults: `prefers-color-scheme` on first visit; user choice persists in
`localStorage` key `theme` (values `light` | `dark`). An anti-flash inline
`<script>` in `<head>` sets the attribute synchronously before paint.

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

## Photography and illustration policy

- No stock photography anywhere on the site.
- No AI-generated hero images.
- Allowed imagery: surface-code diagrams (SVG exported from Stim outputs),
  syndrome graphs, parser AST visualizations, `zuit` SARIF screenshots.
- Preferred format: SVG. PNG is acceptable when SVG is not available (e.g.,
  screenshots). No JPEG for diagrams.
- All images must have explicit `alt` text describing the diagram content
  technically, not aesthetically.
