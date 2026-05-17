# Site Personality Refresh — Design Spec

**Subject:** `shubhamkaushal765.github.io` (Next.js source under `site/`)
**Date:** 2026-05-17
**Status:** Approved — Approach B (mid-tone amendment), confirmed in brainstorming session 2026-05-17.
**Parent specs:**
- [`2026-05-17-github-profile-design.md`](2026-05-17-github-profile-design.md) — identity, voice, hard rules.
- [`2026-05-17-nextjs-site-design.md`](2026-05-17-nextjs-site-design.md) — site scaffold, routes, build pipeline.

This spec extends the parent specs with a perceptual 60-30-10 refresh. It introduces one new surface token (`--color-surface-rail`), one new border token (`--color-border-hair`), and five new monospace personality motifs. No hue is added. No hard rule in `.agent/profile-system.md` is amended.

---

## 0. Problem

The current site implements the locked design tokens strictly but lands closer to 95/4/1 than 60/30/10 in pixel coverage:

- `--color-surface-card` (`#111`) and `--color-surface-base` (`#0a0a0a`) are one perceptual step apart. The 30% mid-tone is invisible.
- The single accent (`#7dd3fc`) renders only as link underline at 50%, inline `code` foreground, and one 200ms hero fade. Three placements per page.
- The `SectionRule` is a 1px hairline at 15% accent above a small-caps H2 — easy to scroll past.
- The four-topic highlight cards share the page background tone, carry no border, no head row separator, no hover — they read as undifferentiated prose blocks.

The diagnosis is structural, not chromatic: the 30% layer needs a real surface to live on, and the accent needs a few more confident, semantically-meaningful placements (numbered prefixes, status chips, footnote markers).

## 1. Non-goals

- No second accent hue. The `.agent/profile-system.md` § Personality motifs "Single accent color" rule is unchanged.
- No pillar dimension family. (Approach C, deferred.)
- No new pages. No new essays. No KaTeX. No OG image generation. No custom domain.
- No edits to locked content: tagline (`Parsers to qubits.`), the three engineering-philosophy lines, the ASCII pillar diagram string, or the three pillar H3 strings on About.
- No client components beyond what already exists (`Nav`, `ThemeToggle`). New components are server components.
- No layout breaks: the 68ch reading column remains, with no sidebar.

## 2. Locked decisions (this session)

| Dimension | Locked value |
|---|---|
| **Approach** | B — Mid-tone amendment |
| **New tokens** | `--color-surface-rail`, `--color-border-hair` (dark + light) |
| **Surface card values** | dark `#111` → `#131318`; light `#f5f5f5` → `#efeff3` |
| **Surface hover values** | dark `#161616` → `#1f1f27`; light `#ececec` → `#dedee4` |
| **Diagram node fill** | `--color-surface-rail` (was `--color-surface-card`) |
| **Diagram stroke** | 1.5 → 1.75 |
| **Animation budget** | unchanged (1 hero fade + 4 staggered flow edges max per page); reduced-motion overrides preserved |
| **Hard-rule amendments** | None |
| **Doc updates** | `.agent/visual-system.md` and `AGENTS.md` only |
| **Commit policy** | No `Co-Authored-By: Claude` tags |

## 3. Token system

### 3.1 Additions

```css
@theme {
  /* dark default */
  --color-surface-rail:  #1b1b22;
  --color-border-hair:   rgba(255, 255, 255, 0.06);
}

[data-theme="light"] {
  --color-surface-rail:  #e6e6ec;
  --color-border-hair:   rgba(0, 0, 0, 0.04);
}
```

### 3.2 Adjustments (existing tokens, value change only)

| Token | Dark old | Dark new | Light old | Light new |
|---|---|---|---|---|
| `--color-surface-card` | `#111111` | `#131318` | `#f5f5f5` | `#efeff3` |
| `--color-surface-hover` | `#161616` | `#1f1f27` | `#ececec` | `#dedee4` |

`--color-surface-base`, `--color-text-body`, `--color-text-muted`, `--color-text-footnote`, and `--color-accent` are unchanged in both themes.

### 3.3 WCAG verification matrix

All pairs are verified by `scripts/verify-contrast.mjs` (new — modeled on the codelens precedent). Build fails if any pair falls below its threshold.

| Foreground | Background | Threshold | Use |
|---|---|---|---|
| `--color-text-body` | `--color-surface-rail` | 4.5:1 | prose inside rail asides |
| `--color-text-muted` | `--color-surface-rail` | 4.5:1 | chip labels, footnote captions |
| `--color-text-footnote` | `--color-surface-rail` | 3.0:1 | section-num prefix |
| `--color-accent` | `--color-surface-rail` | 3.0:1 | accent edges, [N] markers |
| `--color-accent` | `--color-surface-card` | 3.0:1 | links inside cards |
| `--color-text-body` | `--color-surface-card` | 4.5:1 | (already passing; revalidate after value change) |
| `--color-text-footnote` | `--color-surface-card` | 3.0:1 | section-num inside topic cards (the `01 / 02 / 03 / 04` bracket prefix) |

Dark expected: all ≥ 7:1. Light expected: all ≥ 5:1. Failures are build-blocking.

### 3.4 60-30-10 pixel-coverage table (updated)

Replaces the table in `.agent/visual-system.md` § Highlight cards § Pixel-coverage 60-30-10.

| Share | Token | Used for |
|---|---|---|
| 60% | `--color-surface-base` | Page background, between-section padding |
| 30% | `--color-surface-card` + `--color-surface-rail` + `--color-text-body` | Card chrome, rail asides, card head rows, diagram node fills, prose ink |
| 10% | `--color-accent` | Section numbers, [N] markers, status chips when active, link underline, SVG accent edge, inline `code` foreground, table key column |

The single-accent rule is unchanged. There is still exactly one accent token. The rail is a neutral.

## 4. Personality motifs (additions)

All five motifs are CSS-only. None require `'use client'`. None introduce new fonts.

### 4.1 Rail-bracket H2 motif (extends existing `SectionRule`)

`SectionRule` already accepts an optional `number` prop. The render is augmented:

```
[ 01 ]  CODE INTELLIGENCE
————————————————————————————————————————————   (1px solid --color-border-hair)
```

- The `[ 01 ]` bracket is `<span class="section-num" aria-hidden="true">[ 01 ]</span>`.
  Reuses the existing `.section-num` class.
- `.section-num` currently carries `padding-right: 0.5em` for the in-card `01 / 02 / 03 / 04` prefix where the bracket characters are not rendered. For the new bracket form, the literal content inside the `<span>` is `[ 01 ]` plus one trailing ASCII space; visual spacing comes from that space plus the H2's natural leading. The `padding-right: 0.5em` declaration is left in place — the doubled spacing is intentional, kept under one space-character's worth, and consistent across both motif usages. No selector override is introduced.
- The 1px rule below the heading replaces the existing rule above the heading.
  Color changes from `color-mix(in oklab, var(--color-accent) 30%, transparent)` to `var(--color-border-hair)`.
- Headings without a `number` prop render the rule below + small-caps H2; no bracket.

### 4.2 Status chips

New utility class `.chip`. Replaces inline trailing tags in:
- Selected-work list items (`Rust · static analysis` → `[ rust ]  [ static analysis ]`)
- `<TopicCard tag="...">` (the `.topic-card__tag` element gets this class)

```css
.chip {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8em;
  padding: 2px 6px;
  background: var(--color-surface-rail);
  color: var(--color-text-muted);
  border-radius: 3px;
  letter-spacing: 0.03em;
  /* No hover, no animation, no border. */
}
```

Surrounding context:
- The chip wraps each comma-separated tag from the selected-work entries.
- In MDX, the tag list moves to its own `<span class="chips">` element at the end of the list item.

### 4.3 Inline `[N]` footnote markers

New utility class `.fn-ref` (extends existing `[1]` link convention). Applied to all footnote backreference anchors:

```css
.fn-ref {
  font-family: var(--font-mono);
  font-size: 0.8em;
  color: var(--color-accent);
  vertical-align: 0.3em;
  text-decoration: none;
}
.fn-ref:hover {
  text-decoration: underline;
  text-decoration-color: currentColor;
  text-underline-offset: 1px;
}
```

The `<FootnoteList>` component continues to render the list at page bottom — unchanged.

### 4.4 Stats line (Home only)

New server component `site/components/StatsLine.tsx`. Renders one line under the hero tagline reveal:

```
3 pillars  ·  5 repos  ·  rust + python + typescript  ·  last build 2026-05-17
```

- Font: mono 0.85em. Color: `--color-text-muted`. Separator: ` · ` (spaced middle dot).
- Values come from a build-time constant in `site/lib/build-meta.ts`:

  ```ts
  export const BUILD_META = {
    pillars: 3,
    repos: 5,
    stack: ['rust', 'python', 'typescript'] as const,
    lastBuild: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
  };
  ```

  `lastBuild` resolves at static-export time (`output: 'export'`). No runtime fetch.
- `<time dateTime={BUILD_META.lastBuild}>{BUILD_META.lastBuild}</time>` for the date — picks up `tabular-nums` automatically.
- Rendered only on Home (`/`), inside `<Hero variant="full">`.
- `site/lib/build-meta.ts` MUST NOT be imported from any client component (`'use client'`). Doing so would pull the build-time constant into the client bundle. The only importer is `StatsLine.tsx`, which is a server component.

### 4.5 Card head row (Highlights internal restructure)

`TopicCard` re-renders its head:

```
Before:  01  Quantum computing                 research
After:   [ 01 ]  Quantum computing            [ research ]
         ————————————————————————————————————————————  (1px --color-border-hair)
```

- Number prefix reuses motif 4.1 styling (`.section-num` with `[ NN ]` literal).
- Tag becomes a `.chip`.
- A 1px `border-bottom: 1px solid var(--color-border-hair)` is added to `.topic-card__head` (margin-bottom unchanged).
- The existing two-column body (`table | diagram`) is unchanged.
- Card background remains `var(--color-surface-card)` (the new value, `#131318`).
- `.topic-card__head` gets `padding-bottom: var(--spacing-2)` so the new 1px rule has clearance below the flex row. The existing `margin-bottom: var(--spacing-3)` becomes the space between the rule and the blurb. Net: head row → 0.5rem clearance → 1px rule → 0.75rem clearance → blurb.

## 5. Page-level deltas

| Page | Sections that gain numbered `SectionRule` | Other changes |
|---|---|---|
| `/` (Home) | What I work on `01`, Selected work `02`, Highlights `03`, Bridges `04`, Engineering philosophy `05`, Current focus `06`. `Connect` renders a plain (un-numbered) `SectionRule` — it is a two-link list, not a substantive section, and numbering it would imply structural parity it does not have. | Hero gains `<StatsLine>`. Selected-work bullets keep `<ul class="selected-work">` but each `<li>` ends with `<span class="chips">` containing each comma-separated tag as a `.chip`. |
| `/about` | Identity `01`, Three pillars `02`, Bridge artifacts `03`, Engineering philosophy `04`, How I work `05`, 12-month direction `06` | The three pillar H3s (`Code intelligence`, `Machine learning`, `Quantum computing`) keep their existing `mdx-components.tsx` H3 override (`01 / 02 / 03` prefix). The override is NOT touched. |
| `/now` | None — single H1, dated H3 entries only | Each date H3 (`2026-05-17`, `2026-05`, `2026-04`) gains a `<span class="section-num">[ <date> ]</span>` prefix via an extended `mdx-components.tsx` H3 override. Regex `^\d{4}-\d{2}(-\d{2})?$` matches both full ISO dates and year-month partials present in `now.mdx`. The locked three pillar strings (`Code intelligence`, `Machine learning`, `Quantum computing`) are checked first in the existing exact-string map and provably cannot match the date regex. |
| `/writing` | Index page gains numbered `SectionRule` once content exists. Out of scope for this spec. | — |
| `/404` | Single H1; no `SectionRule`. | The hairline rail-bracket motif is not applied (single-section page). |

## 6. Diagram updates

Apply to all four: `QecFlow`, `CvBaselineFlow`, `ZuitFlow`, `TellMeWhyFlow`.

| Property | Before | After |
|---|---|---|
| `rect` fill | `var(--color-surface-card)` | `var(--color-surface-rail)` |
| `stroke-width` (rects + edges) | `1.5` | `1.75` |
| Accent edge `--flow-delay` | — | `200ms`, `350ms`, `500ms`, `650ms` (one per diagram, in card document order) |

Implementation: each topic card sets an inline `style={{ '--flow-delay': '...ms' }}` on the `<svg>`, picked up by the existing `.flow-edge--animated` keyframes via a new `animation-delay: var(--flow-delay, 200ms)` declaration (replacing the current hardcoded `200ms` in `globals.css`).

`prefers-reduced-motion: reduce` continues to flatten all four to `stroke-dashoffset: 0`.

## 7. Animation budget

| Page | Active animations | Count vs ui-ux-pro-max excessive-motion (≤ 2 key elements per view) |
|---|---|---|
| `/` (Home) | 1× hero fade + 4× staggered flow-dash | 1 logical sequence + 1 logical reveal = 2 key motions. Within budget. |
| `/about` | none | 0 |
| `/now` | 1× status-pulse on `[ active ]` dot (existing) | 1 |
| `/writing` | none | 0 |
| `/404` | none | 0 |

The staggered flow-dash counts as one motion because all four edges share a single sequence, per ui-ux-pro-max §7 `stagger-sequence`.

## 8. Components inventory (additions and edits)

| File | Change |
|---|---|
| `site/styles/globals.css` | Add rail + hair tokens (dark + light). Adjust card + hover values. Add `.chip`, `.fn-ref` rules. Replace `SectionRule` rule color with `var(--color-border-hair)`. Move `SectionRule` rule from above to below H2. Add `.topic-card__head` `border-bottom` AND `padding-bottom: var(--spacing-2)` (per §4.5 clearance note). Update `.flow-edge--animated` to read `var(--flow-delay, 200ms)` inside the `animation` shorthand. |
| `site/components/SectionRule.tsx` | When `number` prop is set, render `<span class="section-num" aria-hidden="true">[ {number} ]</span>` before the H2 text. Move `<hr>` rendering from before H2 to after. |
| `site/components/StatsLine.tsx` | NEW. Server component. Renders the §4.4 line. |
| `site/lib/build-meta.ts` | NEW. Build-time constants per §4.4. |
| `site/components/Hero.tsx` | In `variant="full"`, render `<StatsLine>` after `<p class="hero-tagline">`. |
| `site/components/Highlights.tsx` | `TopicCard.head`: emit `[ NN ]` bracket, move `.topic-card__tag` to `.chip`, add `border-bottom` via `.topic-card__head` class (CSS handles it). |
| `site/mdx-components.tsx` | Extend the existing H3 override: keep the three pillar exact-string mappings (locked); add a date regex fallback `^\d{4}-\d{2}(-\d{2})?$` that wraps matching H3 children with a `<span class="section-num">[ <text> ]</span>` prefix. Resolution order: exact-string map first (preserves the locked pillar rendering), date regex second, plain H3 third. The regex is purely format-shaped; it cannot match any of the three locked pillar strings since none contain only digits and dashes. The component remains route-unaware — the date pattern naturally appears only on `/now` and forthcoming `/writing/[slug]` post entries, where it is the intended behavior. |
| `site/scripts/verify-contrast.mjs` | NEW. Implements §3.3 matrix. Runs as `npm run verify-contrast`; wired into `npm run build` as a pre-build gate. |
| `site/content/home.mdx` | Add `number` props to all 7 `SectionRule` instances. Convert trailing tags on each Selected-work bullet into `<span class="chips">` with one `.chip` per tag. |
| `site/content/about.mdx` | Add `number` props to all 6 `SectionRule` instances. No edits to the three pillar H3 lines (locked). |
| `site/content/now.mdx` | No content edits. The MDX H3 override picks up the date prefix automatically. |
| `site/components/diagrams/*Flow.tsx` (4 files) | Change rect fill token (§6). Change stroke-width (§6). Add `style={{ '--flow-delay': 'Nms' }}` on the `<svg>` per §6 stagger order. |
| `site/components/diagrams/*Flow.tsx` head comment | Update to reflect the new rail fill + stagger delay. |

## 9. Documentation updates

`.agent/visual-system.md`:
- § Color tokens → add the `--color-surface-rail` row to dark and light tables.
- § Color tokens → add a new "Border hairlines" subsection documenting `--color-border-hair`.
- § Color tokens → update `--color-surface-card` and `--color-surface-hover` hex values (dark + light).
- § Highlight cards → replace the 60-30-10 share table with §3.4 above.
- New § Bracket motif (positioned after § Section numbering motif): documents the `[ NN ]` prefix on `<SectionRule>`, the move of the rule from above to below the heading, and the `.section-num` reuse.
- New § Status chips: documents `.chip` shape, where it's used, the "no hover, no border, no animation" rule.
- New § Footnote markers (`.fn-ref`): documents inline `[N]` style.
- New § Stats line: documents the `BUILD_META` constants, the build-time resolution, the Home-only placement.
- New § Surface contrast verification: documents `scripts/verify-contrast.mjs` as the build-time gate.
- § Allowed animations table → update the existing `Flow-dash` row's "Behavior" to note the per-diagram `--flow-delay` (200/350/500/650ms).

`AGENTS.md`:
- § Site components → add `StatsLine.tsx`. Note that `SectionRule` now takes the `number` prop on Home and About.
- § Site components → add a paragraph: "Bracket motif and chips are documented in `.agent/visual-system.md` § Bracket motif and § Status chips. The `[ NN ]` prefix renders via the existing `.section-num` class; no new class is introduced."
- § Site work → add `npm run verify-contrast` to the npm script list.

## 10. Acceptance criteria

The implementation is complete when:

1. `npm run build` succeeds in `site/`.
2. `npm run verify-contrast` passes for all pairs in §3.3.
3. `npm run lint` passes.
4. `npm run typecheck` passes.
5. Manual visual check (local static serve, dark + light, basePath `/shubhamkaushal765/`):
   - The `[ NN ]` bracket prefix renders before all 6 numbered Home H2s and all 6 About H2s. `Connect` on Home renders an un-numbered `SectionRule`.
   - The four topic cards on Home each show the new head row with `[ NN ]` + chip + 1px rail-color rule.
   - The stats line renders under the Home hero tagline reveal.
   - All four topic-card diagrams render with the rail node fill and 1.75 stroke.
   - The four staggered flow-dash edges reveal in left-to-right card order (200/350/500/650ms).
   - `prefers-reduced-motion: reduce` (DevTools) collapses every animation to a static state.
   - Light/dark toggle preserves the bracket motif, chips, and stats line without flashing or color shift.
6. `.agent/visual-system.md` and `AGENTS.md` reflect the §9 deltas.
7. The three locked elements remain verbatim: tagline, philosophy lines, ASCII pillar diagram string.
8. No `Co-Authored-By: Claude` line appears in any commit message.

## 11. Risks

- **Rail token contrast in light mode**. `#e6e6ec` is close to `#efeff3` (the new card chrome). The verification script will block the build if any pair fails. Fallback: nudge rail to `#dedee5`.
- **Stats line "last build" date drift**. The build runs in GitHub Actions on push to `main`; the date stamp reflects the build, not the user-perceived "last updated". Mitigation: the field is labeled `last build`, not `last updated`, in the rendered text.
- **MDX H3 override on `/now`**. The current `mdx-components.tsx` matches three exact heading strings. Adding a regex-based fallback for `YYYY-MM-DD` is a new branch in that file. Risk: regression on the three locked strings. Mitigation: the three-string map is checked first; the date regex is the second branch; unit assertion in implementation that "Code intelligence", "Machine learning", "Quantum computing" still render with their original `01 / 02 / 03` prefix.
- **Animation budget**. Four flow-dash edges + one hero fade on Home approaches the ui-ux-pro-max excessive-motion ceiling. The stagger consolidates them perceptually into one sequence; if review pushes back, drop to two animated edges (cards 01 and 03) and leave 02/04 static.
