# AGENTS.md

This is the GitHub profile repository for `shubhamkaushal765`. The root
`README.md` is the profile README rendered on the GitHub user page. The
Next.js site that backs `https://shubhamkaushal765.github.io` lives under
`site/` (source). Build output is **not committed**: GitHub Actions builds
the site on every push and deploys it directly to Pages via the Pages
artifact API. The `.agent/` directory holds the operating manual and
conventions.

## How to work here

- Operating manual (positioning, voice, rules, pin slate, personality motifs): `.agent/profile-system.md`
- Repo conventions (naming, README skeleton, commit hygiene, releases): `.agent/repo-conventions.md`
- Writing strategy (topics, pipeline, voice, citation policy): `.agent/writing-strategy.md`
- Visual system (design tokens, typography, color, spacing, hero diagram): `.agent/visual-system.md`
- Site source: `site/` (Next.js, own `package.json`; run all npm commands from there)
- Site deploy: GitHub Actions workflow at `.github/workflows/site.yml` builds `site/` and uploads to Pages via `actions/deploy-pages`. Build output (`site/out/` or local `docs/`) is gitignored. Do not commit it.
- Design specs: `superpowers/specs/`
- Implementation plans: `superpowers/plans/`

Read `.agent/profile-system.md` before making any edit to `README.md`.

## Hard rules

- No emoji in any file in this repository.
- No badges in the profile `README.md`. No shields.io, no GitHub stats widgets, no streak cards, no top-langs cards, no trophies, no profile-views counters, no skill-icons rows.
- No GitHub stats widgets of any kind in the profile README. Banned list: `github-readme-stats`, `streak-stats`, `top-langs`, `wakatime`, `metrics`, ASCII contribution charts, trophy badges.
- The tagline is locked verbatim: `Parsers to qubits.` Do not paraphrase, do not punctuate differently, do not omit. The lowercase rendering `parsers -> qubits.` inside the hero diagram is the only permitted variant.
- The three engineering-philosophy lines are locked verbatim (see `.agent/profile-system.md`). Do not reword them.
- Do not commit build output. `site/out/`, `site/.next/`, and `docs/` are gitignored. Pages is deployed by the Actions workflow, not from in-tree files.

## Site work

The Next.js source lives in `site/`. All npm commands must be run from there:

    cd site
    npm install        # first-time setup
    npm run dev        # local preview at http://localhost:3000
    npm run build      # static export to site/out/
    npm run verify-contrast   # WCAG gate over visual-system.md surface pairs
    npm run lint       # ESLint
    npm run typecheck  # tsc --noEmit

### Site components

Components under `site/components/` are scoped to the site only. They are not
binding visual primitives. The binding visual rules live in
`.agent/visual-system.md`. Inventory:

- `PillarDiagram.tsx`. The canonical ASCII hero. Its string constant is
  locked verbatim; never edit it.
- `Hero.tsx`. Wraps `<PillarDiagram>`, the tagline reveal (split into pillar-colored spans: `parsers` (sky/code-int) + muted arrow + `qubits.` (emerald/quantum); text content stays exactly `parsers -> qubits.` per the lock), `<StatsLine>`, and `<Nav>`.
- `Nav.tsx`. Primary nav with active-state in `var(--color-accent)`; embeds
  `<ThemeToggle>`.
- `ThemeToggle.tsx`. Client component; flips `[data-theme]` and persists to
  `localStorage`. ASCII label `[ light ]` / `[ dark ]`, no icons.
- `StatusDot.tsx`. Small accent pip + monospace label; pulse animation is
  guarded by `prefers-reduced-motion`. Used inline with `<h1>` on `/now`.
- `SectionRule.tsx`. `<h2>` with optional rail-bracket `[ NN ]` prefix when the `number` prop is set; 1px `var(--color-border-hair)` rule rendered BELOW the heading. The bracket prefix uses the existing `.section-num` class.
- `Highlights.tsx`. Server component. Exports `<Highlights>` (default,
  `<section>` wrapper) and named `<TopicCard>`. Used in `content/home.mdx`
  to render the four-topic highlights block between Selected work and Bridges.
  TopicCard renders its number prefix locally as `<span class="section-num">`.
  It does NOT route the `<h3>` through `mdx-components.tsx`, so the locked
  three-key map in that file is unaffected. The optional `pillar` prop
  (`'code-int' | 'ml' | 'quantum'`) writes `data-pillar` on the `<article>`;
  CSS keys off it to set the bracket number, chip, table key column, left
  stripe, and SVG accent edge color from the pillar family.
- `diagrams/QecFlow.tsx`, `diagrams/CvBaselineFlow.tsx`, `diagrams/ZuitFlow.tsx`,
  `diagrams/TellMeWhyFlow.tsx`. Inline-SVG server components, one per topic
  card. Hand-authored; theme via `currentColor`; one accent edge per diagram
  carries `className="flow-edge--animated"` for the stroke-dashoffset reveal.
  Source intent is documented in `site/diagrams/*.mmd` (mermaid flowcharts).
- `StatsLine.tsx`. Server component. Renders the monospace pillars/repos/stack/last-build line under the hero tagline on Home. Reads `BUILD_META` from `site/lib/build-meta.ts`. Never imported from a client component.
- `lib/build-meta.ts`. Build-time constants for `StatsLine`. `lastBuild` resolves at static-export time.
- `scripts/verify-contrast.mjs`. WCAG contrast gate; runs as a pre-step of `npm run build` via `npm run verify-contrast`. Source of pair list: `.agent/visual-system.md` § Surface contrast verification.
- `FootnoteList.tsx`, `FooterSignature.tsx`, `SkipLink.tsx`. Supporting components.

A11y baselines that must be preserved: skip-link at `<body>` top, `id="main"`
on every page's `<main>`, `:focus-visible` outline in accent color,
`prefers-reduced-motion` honored for every animation.

Bracket motif (`[ NN ]` prefix), `.chip` status pills, and the `.fn-ref`
inline footnote marker are documented in `.agent/visual-system.md`
§ Bracket motif, § Status chips, and § Footnote markers respectively.
The pillar dimension family (sky/violet/emerald) is documented in
`.agent/profile-system.md` § Personality motifs § Pillar dimension family
and `.agent/visual-system.md` § Accent. Pillar hues attach via the
`data-pillar` attribute on `<TopicCard>` and the three locked `<h3>`s in
`mdx-components.tsx`; CSS does the rest. These motifs are bound by the
visual system, not by component code.

### Local preview note

Dev mode (`npm run dev`) currently exhibits a `recentlyCreatedOwnerStacks`
error from React 19's owner-stack instrumentation interacting with
`@next/mdx`. The static export (`npm run build`) is unaffected and is the
only artifact deployed. For local visual review, run `npm run build` and
serve `site/out/` via a static file server, mounted under the basePath
prefix `/shubhamkaushal765/` (e.g., symlink `out` to that name inside a
preview directory).

`npm run build` writes to `site/out/`. That directory is gitignored. To
deploy, push to `main` and let `.github/workflows/site.yml` build and deploy
to Pages via the artifact API.

### Diagrams workflow

The four topic-card diagrams in `site/components/diagrams/*Flow.tsx` are
hand-authored inline SVG. Source intent for each diagram is committed
alongside as a mermaid `.mmd` file under `site/diagrams/`. These are
documentation only; nothing builds them.

To revise a diagram:

1. Edit the TSX source directly in `site/components/diagrams/<Topic>Flow.tsx`.
2. Update the matching `.mmd` file under `site/diagrams/` so symbolic intent
   stays in sync with the rendered SVG.
3. Re-run `npm run build` to confirm.

Rules for any new diagram:

- Inline `<svg>` only. Never `<img src>`. `currentColor` only resolves when
  the SVG is in the DOM cascade.
- `viewBox="0 0 320 180"` for consistency across all topic cards.
- `stroke-width` ≥ 1.5 so light-mode accent does not visually thin out.
- Geometric primitives only; no glyph icons.
- One accent edge maximum per diagram (the data-flow edge).
- Tag the accent edge with `className="flow-edge--animated"` for the
  stroke-dashoffset reveal. CSS handles `prefers-reduced-motion`.

Pages settings (set once in repo Settings → Pages, not in code):

- Source: GitHub Actions
- The workflow file is `.github/workflows/site.yml`. Do not change to
  "Deploy from a branch" or the workflow's artifact upload will be ignored.

## Scope boundaries

The repository previously contained a 2018 Jekyll site (Zolan theme). All
of it was deleted in this session: `index.html`, `404.html`, `images/`,
`2018/`, `about/`, `tag/`, `styleguide/`, `js/`, `favicon.ico`, `robots.txt`,
`search.json`, `sitemap.xml`, `zolanREADME.md`. Do not reintroduce.

## Adding a new repo to the profile

1. Update the pin slate in `.agent/profile-system.md` first. Record the reasoning in the commit message.
2. Update `README.md`'s `## Selected work` section to reflect the new entry (and remove or demote the displaced entry).
3. Open a single commit with message `feat: update pin slate, add {repo-name}`.
