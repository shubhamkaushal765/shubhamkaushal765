# Site Personality Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Express true 60-30-10 perception on the Next.js site by adding one neutral mid-tone surface, five monospace personality motifs, and one build-time WCAG gate — without modifying any locked rule in `.agent/profile-system.md`.

**Architecture:** Pure CSS + React Server Component additions on top of the existing Tailwind v4 `@theme` token system. One new server component (`StatsLine`), one new build-time module (`build-meta.ts`), one new Node script (`verify-contrast.mjs`). No new client components, no new dependencies, no new pages.

**Tech Stack:** Next.js 15 (app router, static export), React 19 (server components default), Tailwind v4 (`@theme` block in `globals.css`), TypeScript strict, `@next/mdx`. No test runner — verification = `npm run build` + `npm run verify-contrast` + manual visual check.

**Spec:** [`superpowers/specs/2026-05-17-site-personality-refresh-design.md`](../specs/2026-05-17-site-personality-refresh-design.md) — read it before starting if you are a subagent receiving this plan.

**Locked elements (must remain verbatim):** Tagline `Parsers to qubits.`, three engineering-philosophy lines, ASCII pillar diagram string (`site/components/PillarDiagram.tsx`), three pillar H3 strings (`Code intelligence`, `Machine learning`, `Quantum computing`).

**Commit policy:** No `Co-Authored-By: Claude` tags. Conventional Commits. One logical commit per task.

---

## File map

| File | Action | Owning task |
|---|---|---|
| `site/styles/globals.css` | edit (multiple sections) | T1, T2, T3, T5, T6 |
| `site/scripts/verify-contrast.mjs` | create | T1 |
| `site/package.json` | edit (add script, gate `build`) | T1 |
| `site/components/SectionRule.tsx` | edit | T2 |
| `site/lib/build-meta.ts` | create | T4 |
| `site/components/StatsLine.tsx` | create | T4 |
| `site/components/Hero.tsx` | edit | T4 |
| `site/components/Highlights.tsx` | edit | T5 |
| `site/components/diagrams/QecFlow.tsx` | edit | T6 |
| `site/components/diagrams/CvBaselineFlow.tsx` | edit | T6 |
| `site/components/diagrams/ZuitFlow.tsx` | edit | T6 |
| `site/components/diagrams/TellMeWhyFlow.tsx` | edit | T6 |
| `site/mdx-components.tsx` | edit | T7 |
| `site/content/home.mdx` | edit | T8 |
| `site/content/about.mdx` | edit | T8 |
| `.agent/visual-system.md` | edit | T9 |
| `AGENTS.md` | edit | T9 |

`site/styles/globals.css` is shared by six tasks — execute them sequentially (T1 → T2 → T3 → T4 → T5 → T6), not in parallel, to avoid merge conflicts inside the file. (T4 adds the `.stats-line` rule; the other five also write to globals.css.)

---

## Task 1: Token system + WCAG verify script

**Files:**
- Modify: `site/styles/globals.css` (lines 1–40, the `@theme` and `[data-theme="light"]` blocks)
- Create: `site/scripts/verify-contrast.mjs`
- Modify: `site/package.json` (scripts block)

- [ ] **Step 1.1: Add new tokens to `@theme` block**

In `site/styles/globals.css`, inside the `@theme { }` block (around line 12–24), add these two lines after `--color-surface-hover` and before `/* text (dark default) */`:

```css
  --color-surface-rail: #1b1b22;
  --color-border-hair: rgba(255, 255, 255, 0.06);
```

In the same block, change two existing values:

```css
  --color-surface-card: #131318;    /* was #111111 */
  --color-surface-hover: #1f1f27;   /* was #161616 */
```

- [ ] **Step 1.2: Mirror tokens to light mode**

Inside the `[data-theme="light"] { }` block (around line 32–40), add:

```css
  --color-surface-rail: #e6e6ec;
  --color-border-hair: rgba(0, 0, 0, 0.04);
```

And change:

```css
  --color-surface-card: #efeff3;    /* was #f5f5f5 */
  --color-surface-hover: #dedee4;   /* was #ececec */
```

- [ ] **Step 1.3: Create the contrast verification script**

Create `site/scripts/verify-contrast.mjs` with this exact content:

```js
#!/usr/bin/env node
/**
 * WCAG 2.1 relative-luminance contrast verifier.
 * Source of truth for thresholds: superpowers/specs/2026-05-17-site-personality-refresh-design.md §3.3.
 * Fails the build if any (foreground, background, theme) triple falls below its threshold.
 */

const TOKENS = {
  dark: {
    'surface-base': '#0a0a0a',
    'surface-card': '#131318',
    'surface-rail': '#1b1b22',
    'text-body': '#ededed',
    'text-muted': '#a3a3a3',
    'text-footnote': '#737373',
    'accent': '#7dd3fc',
  },
  light: {
    'surface-base': '#fafafa',
    'surface-card': '#efeff3',
    'surface-rail': '#e6e6ec',
    'text-body': '#171717',
    'text-muted': '#525252',
    'text-footnote': '#737373',
    'accent': '#0284c7',
  },
};

const PAIRS = [
  { fg: 'text-body',     bg: 'surface-rail', threshold: 4.5, use: 'prose in rail asides' },
  { fg: 'text-muted',    bg: 'surface-rail', threshold: 4.5, use: 'chip labels' },
  { fg: 'text-footnote', bg: 'surface-rail', threshold: 3.0, use: 'section-num on rail' },
  { fg: 'accent',        bg: 'surface-rail', threshold: 3.0, use: 'accent edge on rail' },
  { fg: 'accent',        bg: 'surface-card', threshold: 3.0, use: 'links inside cards' },
  { fg: 'text-body',     bg: 'surface-card', threshold: 4.5, use: 'card body prose' },
  { fg: 'text-footnote', bg: 'surface-card', threshold: 3.0, use: 'section-num inside topic cards' },
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function relLum([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(fg, bg) {
  const a = relLum(hexToRgb(fg));
  const b = relLum(hexToRgb(bg));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const theme of ['dark', 'light']) {
  for (const { fg, bg, threshold, use } of PAIRS) {
    const ratio = contrast(TOKENS[theme][fg], TOKENS[theme][bg]);
    const pass = ratio >= threshold;
    const status = pass ? 'PASS' : 'FAIL';
    const line = `${status}  ${theme.padEnd(5)}  ${fg.padEnd(14)} on ${bg.padEnd(14)}  ${ratio.toFixed(2).padStart(5)}  (>= ${threshold})  ${use}`;
    console.log(line);
    if (!pass) failed += 1;
  }
}
if (failed > 0) {
  console.error(`\n${failed} pair(s) below threshold.`);
  process.exit(1);
}
console.log('\nAll contrast pairs pass.');
```

- [ ] **Step 1.4: Wire the script into npm**

In `site/package.json`, edit the `scripts` block to add `verify-contrast` and gate `build` on it:

```json
"scripts": {
  "dev": "next dev",
  "build": "npm run verify-contrast && next build",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "verify-contrast": "node scripts/verify-contrast.mjs"
}
```

- [ ] **Step 1.5: Run the verifier**

```bash
cd site && npm run verify-contrast
```

Expected: every pair prints `PASS`. If any prints `FAIL`, stop and adjust the failing token value (e.g., nudge `surface-rail` light to `#dedee5`).

- [ ] **Step 1.6: Build the site**

```bash
cd site && npm run build
```

Expected: build succeeds (verify-contrast runs first, then `next build`).

- [ ] **Step 1.7: Commit**

```bash
git add site/styles/globals.css site/scripts/verify-contrast.mjs site/package.json
git commit -m "feat(site): add rail + hair surface tokens with WCAG contrast gate

Adds --color-surface-rail and --color-border-hair (dark + light) and
nudges --color-surface-card/--color-surface-hover values one perceptual
step apart from --color-surface-base, so the 30% mid-tone layer is
actually visible. Adds scripts/verify-contrast.mjs as a build-time
gate covering the seven (fg, bg) pairs in the design spec §3.3."
```

---

## Task 2: SectionRule bracket motif

**Files:**
- Modify: `site/components/SectionRule.tsx`
- Modify: `site/styles/globals.css` (no new rule selector; only inline-style change inside the component, but the related `main::before` rule is unaffected)

- [ ] **Step 2.1: Rewrite `SectionRule.tsx`**

Replace the entire contents of `site/components/SectionRule.tsx` with:

```tsx
import type { ReactNode } from 'react';

interface SectionRuleProps {
  children: ReactNode;
  number?: string;
}

export default function SectionRule({ children, number }: SectionRuleProps) {
  return (
    <div>
      <h2>
        {number !== undefined && (
          <span className="section-num" aria-hidden="true">
            {`[ ${number} ] `}
          </span>
        )}
        {children}
      </h2>
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--color-border-hair)',
          margin: '0 0 var(--spacing-5) 0',
        }}
      />
    </div>
  );
}
```

Notes for the implementer:
- The `<hr>` moves from BEFORE the heading to AFTER it, per spec §4.1.
- Color changes from `var(--color-text-footnote)` to `var(--color-border-hair)`.
- The bracket prefix `[ NN ]<space>` lives inside the same `<h2>` as a `<span class="section-num">` so it inherits the heading's small-caps and weight chrome but visually reads as a mono prefix (the `.section-num` class already declares `font-family: var(--font-mono)`).
- The `.section-num` class's existing `padding-right: 0.5em` is intentionally retained; combined with the literal trailing ASCII space inside the wrapper, total spacing stays under a single space-character — see spec §4.1.

- [ ] **Step 2.2: Build**

```bash
cd site && npm run build
```

Expected: build succeeds.

- [ ] **Step 2.3: Commit**

```bash
git add site/components/SectionRule.tsx
git commit -m "feat(site): SectionRule renders rail-bracket prefix; rule moves below heading

The bracket [ NN ] sits inside the H2 so the small-caps run continues
naturally. The hairline rule moves from above to below the heading and
uses --color-border-hair (the new neutral border token). Headings
without a number prop render the rule below + plain small-caps H2."
```

---

## Task 3: Chip + footnote-ref classes + flow-delay CSS plumbing

**Files:**
- Modify: `site/styles/globals.css` (add new classes; tweak `.flow-edge--animated` to read `--flow-delay`)

- [ ] **Step 3.1: Add the `.chip` and `.fn-ref` classes**

Insert these blocks after the existing `.status-dot__label` block (around line 231) and before `@keyframes status-pulse`:

```css
/* ── Status chips ── */
.chip {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 0.8em;
  padding: 2px 6px;
  background: var(--color-surface-rail);
  color: var(--color-text-muted);
  border-radius: 3px;
  letter-spacing: 0.03em;
}

.chips {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--spacing-2);
  margin-left: var(--spacing-2);
  vertical-align: baseline;
}

/* ── Inline footnote markers ── */
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

- [ ] **Step 3.2: Update `.flow-edge--animated` to read `--flow-delay`**

In the existing `.flow-edge--animated` block (around line 381), replace this:

```css
.flow-edge--animated {
  stroke-dasharray: var(--dash-len, 60);
  stroke-dashoffset: var(--dash-len, 60);
  animation: flow-dash 1200ms ease-out 200ms both;
}
```

with this:

```css
.flow-edge--animated {
  stroke-dasharray: var(--dash-len, 60);
  stroke-dashoffset: var(--dash-len, 60);
  animation: flow-dash 1200ms ease-out var(--flow-delay, 200ms) both;
}
```

Only the `200ms` literal becomes `var(--flow-delay, 200ms)`. Everything else is unchanged. The fallback (`200ms`) preserves existing behavior for any svg that does not set the variable.

- [ ] **Step 3.3: Build**

```bash
cd site && npm run build
```

Expected: build succeeds.

- [ ] **Step 3.4: Commit**

```bash
git add site/styles/globals.css
git commit -m "feat(site): add .chip and .fn-ref utility classes; plumb --flow-delay

Adds .chip + .chips for monospace status pills (used in topic-card head
rows and Selected work bullets) and .fn-ref for inline numbered footnote
markers. .flow-edge--animated now reads --flow-delay (fallback 200ms)
so per-diagram stagger can be set inline on each <svg>."
```

---

## Task 4: BUILD_META + StatsLine + Hero integration

**Files:**
- Create: `site/lib/build-meta.ts`
- Create: `site/components/StatsLine.tsx`
- Modify: `site/components/Hero.tsx`
- Modify: `site/styles/globals.css` (add `.stats-line` rule)

- [ ] **Step 4.1: Create `site/lib/build-meta.ts`**

```ts
/**
 * Build-time constants for the Home hero stats line.
 *
 * MUST NOT be imported from any client component ('use client'). Doing so
 * would pull this module into the client bundle. The only allowed importer
 * is the server component StatsLine.tsx.
 */
export const BUILD_META = {
  pillars: 3,
  repos: 5,
  stack: ['rust', 'python', 'typescript'] as const,
  lastBuild: new Date().toISOString().slice(0, 10), // YYYY-MM-DD; resolves at static-export time
} as const;
```

- [ ] **Step 4.2: Create `site/components/StatsLine.tsx`**

```tsx
import { BUILD_META } from '@/lib/build-meta';

export default function StatsLine() {
  const { pillars, repos, stack, lastBuild } = BUILD_META;
  return (
    <p className="stats-line" aria-label={`${pillars} pillars, ${repos} repos, stack ${stack.join(' plus ')}, last build ${lastBuild}`}>
      <span>{pillars} pillars</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>{repos} repos</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>{stack.join(' + ')}</span>
      <span aria-hidden="true">{'  ·  '}</span>
      <span>
        last build <time dateTime={lastBuild}>{lastBuild}</time>
      </span>
    </p>
  );
}
```

- [ ] **Step 4.3: Wire `StatsLine` into `Hero.tsx`**

Replace the entire contents of `site/components/Hero.tsx` with:

```tsx
import PillarDiagram from './PillarDiagram';
import Nav from './Nav';
import StatsLine from './StatsLine';

type Variant = 'full' | 'compact';

export default function Hero({ variant = 'full' }: { variant?: Variant }) {
  if (variant === 'compact') {
    return (
      <header>
        <PillarDiagram />
        <Nav />
      </header>
    );
  }
  return (
    <header>
      <PillarDiagram />
      <p className="hero-tagline" style={{ fontFamily: 'var(--font-mono)', marginTop: 'var(--spacing-3)' }}>
        parsers -&gt; qubits.
      </p>
      <StatsLine />
      <Nav />
    </header>
  );
}
```

- [ ] **Step 4.4: Add `.stats-line` CSS**

In `site/styles/globals.css`, insert this block immediately after the `.hero-tagline` block (around line 253):

```css
.stats-line {
  font-family: var(--font-mono);
  font-size: 0.85em;
  color: var(--color-text-muted);
  margin: var(--spacing-2) 0 0 0;
}
```

- [ ] **Step 4.5: Build**

```bash
cd site && npm run build
```

Expected: build succeeds; static export emits the stats line in the home page HTML.

- [ ] **Step 4.6: Commit**

```bash
git add site/lib/build-meta.ts site/components/StatsLine.tsx site/components/Hero.tsx site/styles/globals.css
git commit -m "feat(site): add StatsLine under hero tagline (Home only)

Renders one monospace line: '3 pillars  ·  5 repos  ·  rust + python +
typescript  ·  last build YYYY-MM-DD'. Date resolves at static-export
build time via BUILD_META in site/lib/build-meta.ts. Server component;
build-meta is not exposed to any client bundle."
```

---

## Task 5: TopicCard head row restructure

**Files:**
- Modify: `site/components/Highlights.tsx`
- Modify: `site/styles/globals.css` (`.topic-card__head`, `.topic-card__tag` deprecation)

- [ ] **Step 5.1: Restructure `TopicCard` head**

In `site/components/Highlights.tsx`, replace the existing `topic-card__head` block (lines 30–39) with:

```tsx
      <div className="topic-card__head">
        <h3 id={headingId} className="topic-card__title">
          <span className="section-num" aria-hidden="true">
            {`[ ${number} ] `}
          </span>
          {title}
        </h3>
        <span className="chip" aria-label={`Status: ${tag}`}>{tag}</span>
      </div>
```

- [ ] **Step 5.2: Add `padding-bottom` + `border-bottom` to `.topic-card__head` in globals.css**

In `site/styles/globals.css`, edit the existing `.topic-card__head` block (around line 284) so it becomes:

```css
.topic-card__head {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-3);
  padding-bottom: var(--spacing-2);
  margin-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--color-border-hair);
}
```

Then delete the now-unused `.topic-card__tag` block (around line 297–302). The chip class supersedes it.

- [ ] **Step 5.3: Build**

```bash
cd site && npm run build
```

Expected: build succeeds.

- [ ] **Step 5.4: Commit**

```bash
git add site/components/Highlights.tsx site/styles/globals.css
git commit -m "feat(site): topic-card head row gains bracket prefix, chip tag, and rail rule

Head row now reads '[ NN ]  Title  [ tag ]' separated from the blurb by
a 1px --color-border-hair line. Replaces the .topic-card__tag class
with the shared .chip utility. Adds padding-bottom: var(--spacing-2)
for visible clearance between the flex row and the new rule."
```

---

## Task 6: Diagrams — rail fill + thicker stroke + staggered flow-delay

**Files (edit all four):**
- `site/components/diagrams/QecFlow.tsx` — `--flow-delay: 200ms`
- `site/components/diagrams/CvBaselineFlow.tsx` — `--flow-delay: 350ms`
- `site/components/diagrams/ZuitFlow.tsx` — `--flow-delay: 500ms`
- `site/components/diagrams/TellMeWhyFlow.tsx` — `--flow-delay: 650ms`

For each file apply the same three edits.

- [ ] **Step 6.1: For each diagram file, add the inline `--flow-delay` to the `<svg>`**

First add this import at the top of each diagram file (the file currently has no React import — JSX transform is used):

```tsx
import type { CSSProperties } from 'react';
```

Then locate the `<svg>` opening tag (around line 9) and add a `style` prop. Example for `QecFlow.tsx` (200ms):

```tsx
    <svg
      viewBox="0 0 320 180"
      width="100%"
      role="img"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="qec-title qec-desc"
      style={{ '--flow-delay': '200ms' } as CSSProperties}
    >
```

The `as CSSProperties` cast is required because CSS custom properties are not in React's `CSSProperties` type; TypeScript strict will otherwise reject the unknown key. Do NOT use `React.CSSProperties` here — these files use the JSX transform and do not import `React` as a namespace; the named-type import shown above is the right pattern.

Per-file delay values:
- `QecFlow.tsx`: `'200ms'`
- `CvBaselineFlow.tsx`: `'350ms'`
- `ZuitFlow.tsx`: `'500ms'`
- `TellMeWhyFlow.tsx`: `'650ms'`

- [ ] **Step 6.2: Change every rect fill from `--color-surface-card` to `--color-surface-rail`**

In each file, replace every occurrence of `fill="var(--color-surface-card)"` with `fill="var(--color-surface-rail)"`. Each diagram has 2–3 such rects (one per node).

- [ ] **Step 6.3: Bump every `strokeWidth` from `"1.5"` to `"1.75"`**

In each file, replace every `strokeWidth="1.5"` with `strokeWidth="1.75"`. This applies to rects (node borders) and `<line>` / `<path>` edges (both plain and accent).

- [ ] **Step 6.4: Update the head comment of each file**

The current comment header (e.g., for QecFlow): `Nodes: syndrome graph -> transformer encoder -> corrected bit / Accent edge: syndrome graph -> transformer encoder (animated dash flow)`. Append: ` Stagger delay: 200ms via --flow-delay. Node fill --color-surface-rail.` (with the appropriate delay per file).

- [ ] **Step 6.5: Build**

```bash
cd site && npm run build
```

Expected: build succeeds; no TypeScript errors on the inline CSS variable cast.

- [ ] **Step 6.6: Commit**

```bash
git add site/components/diagrams/QecFlow.tsx site/components/diagrams/CvBaselineFlow.tsx site/components/diagrams/ZuitFlow.tsx site/components/diagrams/TellMeWhyFlow.tsx
git commit -m "feat(site): diagrams adopt rail fill, 1.75 stroke, staggered flow-delay

Node fills move from --color-surface-card to --color-surface-rail so
nodes read against the topic-card mid-chrome. Stroke 1.5 -> 1.75 so the
light-mode accent does not visually thin out. Each diagram sets
--flow-delay inline (200/350/500/650ms in card document order) so the
four flow-dash reveals stagger as one orchestrated sequence."
```

---

## Task 7: mdx-components.tsx — date regex H3 fallback

**Files:**
- Modify: `site/mdx-components.tsx`

- [ ] **Step 7.1: Extend the H3 override with the date regex**

Replace the entire `NumberedH3` function in `site/mdx-components.tsx` with:

```tsx
const DATE_H3 = /^\d{4}-\d{2}(-\d{2})?$/;

function NumberedH3({ children, id }: { children?: ReactNode; id?: string }) {
  const text = extractText(children);
  const num = PILLAR_NUMBERS[text];
  if (num !== undefined) {
    return (
      <h3 id={id}>
        <span className="section-num" aria-hidden="true">{num}</span>
        {children}
      </h3>
    );
  }
  if (DATE_H3.test(text)) {
    return (
      <h3 id={id}>
        <span className="section-num" aria-label={text}>{`[ ${text} ]`}</span>
      </h3>
    );
  }
  return <h3 id={id}>{children}</h3>;
}
```

Notes for the implementer:
- The exact-string `PILLAR_NUMBERS` lookup runs first — the three locked pillar strings (`Code intelligence`, `Machine learning`, `Quantum computing`) keep their original `01 / 02 / 03` rendering. The date regex is purely format-shaped; none of the pillar strings can match `^\d{4}-\d{2}(-\d{2})?$`.
- The date-H3 branch renders `[ <date> ]` (visible) but exposes only `<date>` to assistive tech via `aria-label={text}`. This avoids both (a) rendering the date twice in the DOM and (b) leaving the heading with no accessible name (which would happen if the span were `aria-hidden`). The pillar branch's `aria-hidden` is correct in its case because the H3 text (`Code intelligence`) is a sibling of the span; the date branch has no sibling text, so the span must own the accessible name.
- The export and `extractText` helper remain unchanged.

- [ ] **Step 7.2: Build**

```bash
cd site && npm run build
```

Expected: build succeeds. Inspect `site/out/now/index.html` and confirm each date H3 renders as `<h3 id="..."><span class="section-num" aria-hidden="true">[ 2026-05-17 ] </span></h3>` (the trailing space inside the span is intentional, per the spec §4.1 spacing note — when there is no following text, the trailing space is harmless).

- [ ] **Step 7.3: Verify the locked map is preserved**

```bash
grep -A3 'Code intelligence\|Machine learning\|Quantum computing' site/out/about/index.html | head -20
```

Expected: each pillar heading still includes `<span class="section-num" aria-hidden="true">01</span>` (or `02`, `03`) — same rendering as before this change.

- [ ] **Step 7.4: Commit**

```bash
git add site/mdx-components.tsx
git commit -m "feat(site): mdx H3 override adds date-pattern fallback for /now entries

Resolution order: exact-string pillar map first (preserves locked
About H3 rendering), date regex /^\\d{4}-\\d{2}(-\\d{2})?\$/ second,
plain H3 third. Matches the three /now H3s 2026-05-17, 2026-05, 2026-04
and any future YYYY-MM[-DD] post entries. Cannot collide with the
locked pillar strings."
```

---

## Task 8: Content — home.mdx + about.mdx number props + chips

**Files:**
- Modify: `site/content/home.mdx`
- Modify: `site/content/about.mdx`

- [ ] **Step 8.1: Add `SectionRule` import and number props to `home.mdx`**

`home.mdx` currently uses `## What I work on` etc. — plain Markdown H2 without `SectionRule`. Replace each `## ...` heading with an explicit `<SectionRule number="NN">...</SectionRule>` invocation, then add the import at the top.

First, near the top of the file, add the import line (after the other component imports):

```tsx
import SectionRule from '@/components/SectionRule';
```

Then replace headings as follows (preserve exact heading text and verbatim content under each):

| Before | After |
|---|---|
| `## What I work on` | `<SectionRule number="01">What I work on</SectionRule>` |
| `## Selected work` | `<SectionRule number="02">Selected work</SectionRule>` |
| `## Highlights` | `<SectionRule number="03">Highlights</SectionRule>` |
| `## Bridges` | `<SectionRule number="04">Bridges</SectionRule>` |
| `## Engineering philosophy` | `<SectionRule number="05">Engineering philosophy</SectionRule>` |
| `## Current focus` | `<SectionRule number="06">Current focus</SectionRule>` |
| `## Connect` | `<SectionRule>Connect</SectionRule>` |

Note: `Connect` gets a plain `<SectionRule>` (no `number` prop) per spec §5.

- [ ] **Step 8.2: Convert selected-work tags to chips in `home.mdx`**

In the `<div className="selected-work">` list, each `<li>` ends with a trailing `Rust · static analysis` style tag list. Convert each to chips. Example transformation for the first entry:

Before:

```mdx
- **[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC)** — Transformer-based decoder for surface-code QEC. Stim simulation, PyTorch Lightning training, syndrome-graph encoding. Quantum · ML
```

After:

```mdx
- **[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC)** — Transformer-based decoder for surface-code QEC. Stim simulation, PyTorch Lightning training, syndrome-graph encoding. <span className="chips"><span className="chip">quantum</span><span className="chip">ml</span></span>
```

Repeat the pattern for the other four selected-work entries. Tag mapping:

| Repo | Chips |
|---|---|
| TransformerQEC | `quantum`, `ml` |
| zuit | `rust`, `static analysis` |
| tell-me-why | `rag`, `local-first` |
| qosf_excercises | `qaoa`, `quantum` |
| codestick | `typescript`, `animation` |

(Lowercase the chip labels for consistency with the `.chip` `letter-spacing: 0.03em` mono treatment; the trailing period after the prose stays, the chips follow with one space.)

- [ ] **Step 8.3: Add `SectionRule` import and number props to `about.mdx`**

Top of file:

```tsx
import SectionRule from '@/components/SectionRule';
```

Then replace each `## ...` heading:

| Before | After |
|---|---|
| `## Identity` | `<SectionRule number="01">Identity</SectionRule>` |
| `## Three pillars` | `<SectionRule number="02">Three pillars</SectionRule>` |
| `## Bridge artifacts` | `<SectionRule number="03">Bridge artifacts</SectionRule>` |
| `## Engineering philosophy` | `<SectionRule number="04">Engineering philosophy</SectionRule>` |
| `## How I work` | `<SectionRule number="05">How I work</SectionRule>` |
| `## 12-month direction` | `<SectionRule number="06">12-month direction</SectionRule>` |

DO NOT touch the three pillar H3s (`### Code intelligence`, `### Machine learning`, `### Quantum computing`) — they remain plain `###` and continue to use the `mdx-components.tsx` exact-string override.

DO NOT touch the engineering-philosophy line content or any other prose under the headings.

- [ ] **Step 8.4: Build**

```bash
cd site && npm run build
```

Expected: build succeeds. Inspect `site/out/index.html` and `site/out/about/index.html`. Confirm each modified heading renders `<h2><span class="section-num" aria-hidden="true">[ NN ] </span>...</h2>` followed by the new hairline rule.

- [ ] **Step 8.5: Commit**

```bash
git add site/content/home.mdx site/content/about.mdx
git commit -m "feat(site): number Home + About section rules; chip tags on Selected work

Home: SectionRule[number] on 6 sections; Connect un-numbered.
Selected-work trailing tag suffixes become explicit <span class=chip>
elements wrapped in <span class=chips>.
About: SectionRule[number] on 6 sections. The three pillar H3s remain
plain ### and keep their existing mdx-components.tsx 01/02/03 prefix."
```

---

## Task 9: Documentation updates

**Files:**
- Modify: `.agent/visual-system.md`
- Modify: `AGENTS.md`

- [ ] **Step 9.1: Update `.agent/visual-system.md`**

Apply these edits per spec §9:

1. **§ Color tokens § Surfaces (dark)** — add a row:

   | `--surface-rail` | `#1b1b22` | Rail asides, card head rows, diagram node fills (the 30% layer) |

2. **§ Color tokens § Surfaces (dark)** — update the existing rows:

   | `--surface-card` | `#131318` | Card and aside backgrounds |
   | `--surface-hover` | `#1f1f27` | Hover state for cards and interactive surfaces |

3. **§ Color tokens § Light mode** — add a row:

   | `--color-surface-rail` | `#e6e6ec` | Rail asides, card head rows, diagram node fills |

4. **§ Color tokens § Light mode** — update existing rows:

   | `--color-surface-card` | `#efeff3` | Card and aside backgrounds |
   | `--color-surface-hover` | `#dedee4` | Hover state |

5. **§ Color tokens** — add new subsection **§ Border hairlines** after the Light mode block:

   ```
   ### Border hairlines

   One neutral border token, expressed as alpha over the body text color so
   the line works at every surface step.

   | Token | Dark | Light | Use |
   |-------|------|-------|-----|
   | `--color-border-hair` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.04)` | Hairline under `<SectionRule>` H2, the rule below the `.topic-card__head` row |
   ```

6. **§ Highlight cards § Pixel-coverage 60-30-10** — replace the table with:

   | Share | Token | Used for |
   |-------|-------|----------|
   | 60% | `--color-surface-base` | Page background and section padding |
   | 30% | `--color-surface-card` + `--color-surface-rail` + `--color-text-body` | Card chrome, rail asides, card head rows, diagram node fills, prose ink |
   | 10% | `--color-accent` | Section numbers, [N] markers, status chips when active, link underline, SVG accent edge, inline code foreground, table key column |

   The single-accent rule is unchanged. There is still exactly one accent token. The rail is a neutral.

7. **Add new § Bracket motif** after the existing § Section numbering motif:

   ```
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
   ```

8. **Add new § Status chips** after § Bracket motif:

   ```
   ## Status chips

   `.chip` is a mono pill used to surface status/tag values without prose
   weight. Replaces inline trailing tag suffixes on Selected work and
   replaces `.topic-card__tag` on Highlights.

   - Background: `var(--color-surface-rail)`. Color: `var(--color-text-muted)`.
   - Padding `2px 6px`, radius `3px`, mono `0.8em`, letter-spacing `0.03em`.
   - No hover state. No border. No animation.
   - Wrapped in `<span class="chips">` when more than one chip follows the
     same prose item (provides flex layout and gap).
   ```

9. **Add new § Footnote markers** after § Status chips:

   ```
   ## Footnote markers

   `.fn-ref` styles inline `[N]` superscript links to the bottom-of-page
   `<FootnoteList>`. Mono `0.8em`, color `var(--color-accent)`,
   vertical-align `0.3em`, no underline at rest. Underline appears on hover.
   ```

10. **Add new § Stats line** after § Footnote markers:

    ```
    ## Stats line

    A single monospace line under the home hero tagline reveal:

    `3 pillars  ·  5 repos  ·  rust + python + typescript  ·  last build YYYY-MM-DD`

    Server component `site/components/StatsLine.tsx` reads `BUILD_META` from
    `site/lib/build-meta.ts`. `BUILD_META.lastBuild` resolves at static-export
    build time via `new Date().toISOString().slice(0, 10)`. `build-meta.ts`
    is never imported from a client component. Rendered only on `/`.
    ```

11. **Add new § Surface contrast verification** at the end of the document:

    ```
    ## Surface contrast verification

    `site/scripts/verify-contrast.mjs` enumerates the (foreground, background,
    theme) triples that the site renders and computes WCAG 2.1 relative-
    luminance contrast. The build fails if any pair drops below its threshold.
    Run via `npm run verify-contrast` (it is also wired as a pre-step of
    `npm run build`).

    Adding a new (fg, bg) combination anywhere on the site requires adding
    the corresponding row to the script's `PAIRS` array.
    ```

12. **§ Allowed animations** — update the existing `Flow-dash` row's `Behavior` cell to read:

    `Stroke-dashoffset travels from var(--dash-len, 60) to 0; the delay reads var(--flow-delay, 200ms) set inline per diagram (200/350/500/650ms in card order). Both endpoints respect prefers-reduced-motion: reduce and resolve to a static line`.

- [ ] **Step 9.2: Update `AGENTS.md`**

Apply these edits per spec §9:

1. **§ Site components** — extend the inventory bullet list with:

   ```
   - `StatsLine.tsx` — server component. Renders the monospace pillars/repos/stack/last-build line under the hero tagline on Home. Reads `BUILD_META` from `site/lib/build-meta.ts`. Never imported from a client component.
   - `lib/build-meta.ts` — build-time constants for `StatsLine`. `lastBuild` resolves at static-export time.
   - `scripts/verify-contrast.mjs` — WCAG contrast gate; runs as a pre-step of `npm run build` via `npm run verify-contrast`. Source of pair list: `.agent/visual-system.md` § Surface contrast verification.
   ```

2. **§ Site components** — update the `SectionRule.tsx` entry to read:

   ```
   - `SectionRule.tsx` — `<h2>` with optional rail-bracket `[ NN ]` prefix when the `number` prop is set; 1px `var(--color-border-hair)` rule rendered BELOW the heading. The bracket prefix uses the existing `.section-num` class.
   ```

3. **§ Site work** — extend the npm script list:

   ```
   npm run verify-contrast   # WCAG gate over visual-system.md surface pairs
   ```

   Insert this line before the existing `npm run lint` line.

4. **§ Site components** — add a paragraph at the end of the components inventory section:

   ```
   Bracket motif (`[ NN ]` prefix), `.chip` status pills, and the `.fn-ref`
   inline footnote marker are documented in `.agent/visual-system.md`
   § Bracket motif, § Status chips, and § Footnote markers respectively.
   These motifs are bound by the visual system, not by component code.
   ```

- [ ] **Step 9.3: Commit**

```bash
git add .agent/visual-system.md AGENTS.md
git commit -m "docs: update visual-system.md + AGENTS.md for personality refresh

Adds rail surface token + hair border token to the color tables, new
subsections for Bracket motif, Status chips, Footnote markers, Stats
line, and Surface contrast verification. Updates the 60-30-10 share
table to reflect the rail token joining the 30% layer. AGENTS.md
gains the new components, the npm script, and the bracket-motif note."
```

---

## Task 10: Final verification + manual visual check

**Files:** none modified unless a regression is found.

- [ ] **Step 10.1: Run the full check suite**

```bash
cd site && npm run typecheck && npm run lint && npm run verify-contrast && npm run build
```

Expected: all four exit `0`. If `typecheck` or `lint` fails on changes from earlier tasks, fix as a small commit and re-run.

- [ ] **Step 10.2: Local visual check**

Serve the static output. The project documents the preview pattern in `AGENTS.md` § Local preview note: `npm run build` writes to `site/out/`, which is gitignored; serve it via a static server mounted under the basePath `/shubhamkaushal765/`. Example:

```bash
cd site && python3 -m http.server 8000 --directory out --bind 127.0.0.1
# then open http://127.0.0.1:8000/ (basePath is empty in the actual deploy)
```

Or with the basePath prefix path (closer to Pages):

```bash
mkdir -p /tmp/preview && ln -sf "$PWD/site/out" /tmp/preview/shubhamkaushal765 && python3 -m http.server 8000 --directory /tmp/preview --bind 127.0.0.1
# then open http://127.0.0.1:8000/shubhamkaushal765/
```

Run the manual check matrix from spec §10 acceptance criteria item 5:

- [ ] In dark mode: bracket prefix renders before all 6 numbered Home H2s and all 6 About H2s.
- [ ] In dark mode: `Connect` on Home renders an un-numbered `SectionRule`.
- [ ] In dark mode: the four topic cards on Home each show the new head row with `[ NN ]` + chip + 1px rail-color rule.
- [ ] In dark mode: the stats line renders under the Home hero tagline reveal.
- [ ] In dark mode: all four topic-card diagrams render with the rail node fill and 1.75 stroke.
- [ ] In dark mode: the four staggered flow-dash edges reveal in left-to-right card order (200/350/500/650ms).
- [ ] Toggle to light mode: all of the above remain visually coherent; no contrast or layout regressions.
- [ ] Toggle DevTools "Emulate prefers-reduced-motion: reduce": every animation collapses to a static state. The flow-dash edges remain visible as solid lines; the hero tagline does not fade in.
- [ ] On `/now`: the three date H3s render with the `[ YYYY-MM(-DD) ]` bracket prefix.
- [ ] On `/about`: the three pillar H3s still render with their original `01 / 02 / 03` prefix.

- [ ] **Step 10.3: If a regression is found**

Make a fix-only commit with a clear message (e.g., `fix(site): nudge surface-rail light to #dedee5 to pass body-on-rail WCAG`). Re-run Step 10.1 + the relevant manual check.

- [ ] **Step 10.4: No additional commit if no regression**

If Step 10.2 passes cleanly, no extra commit is needed — the work is already on `main` as Task 1–9 commits.

---

## Out of scope (do not implement; will be deferred to a later spec)

- Pillar dimension family (Approach C in brainstorming) — three pillar hues. Requires hard-rule amendment.
- Real essays under `/writing/[slug]`.
- KaTeX math typesetting.
- `@vercel/og` OG image generator.
- Custom domain.
- Sidebar / two-column layout beyond the 68ch column.
- Changing the locked PillarDiagram string, tagline, or philosophy lines.

---

## Acceptance criteria (from spec §10, restated for the implementer)

The plan is complete when:

1. `npm run build` succeeds in `site/`.
2. `npm run verify-contrast` passes for all pairs in spec §3.3.
3. `npm run lint` passes.
4. `npm run typecheck` passes.
5. The manual visual checks in Step 10.2 all pass in both dark and light themes.
6. `.agent/visual-system.md` and `AGENTS.md` reflect the spec §9 deltas.
7. The three locked verbatim elements remain unchanged: `Parsers to qubits.`, the three engineering-philosophy lines, the ASCII pillar diagram string.
8. No `Co-Authored-By: Claude` line appears in any commit message.
