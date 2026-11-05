# AGENTS.md

This is the GitHub profile repository for `shubhamkaushal765`. The root
`README.md` is the profile README rendered on the GitHub user page. The
Next.js site that backs `https://shubhamkaushal765.github.io/shubhamkaushal765/` lives under
`site/` (source). Build output is **not committed**: GitHub Actions builds
the site on every push and deploys it directly to Pages via the Pages
artifact API. The `.agent/` directory holds the operating manual and
conventions.

## How to work here

- Operating manual (positioning, voice, rules, pin slate, personality motifs): `.agent/profile-system.md`
- Repo conventions (naming, README skeleton, commit hygiene, releases): `.agent/repo-conventions.md`
- Writing strategy (topics, pipeline, voice, citation policy): `.agent/writing-strategy.md`
- Visual system (design tokens, typography, color, spacing, hero diagram): `.agent/visual-system.md`
- Slides system (deck structure, reveal.js rules, SVG and animation grammar): `.agent/slides-system.md`
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
  locked verbatim; never edit it. On the site it renders as the closing map of the home Four pillars story (inside `.parse-story__map` in `ParseStory.tsx`); still the home page, string unchanged.
- `Hero.tsx`. Renders the tagline reveal (split into pillar-colored spans: `parsers` (cyan/sky, code-int) + muted arrow + `qubits.` (emerald/quantum); text content stays exactly `parsers -> qubits.` per the lock), `<StatsLine>`, and `<Nav>`. The full variant renders a visible name `<h1 className="hero__name">Shubham Kaushal</h1>` above the tagline, plus a desktop-only `.hero__teaser` card (`let y = x + 1;`, links to `#four-pillars`, hidden below 900px).
- `ParseStory.tsx`. Server component. Home Four pillars story: sticky `.parse-story__figure`, four `.parse-story__step[data-step]` blocks (h3, link, `.aside`), and `.parse-story__map` holding `<PillarDiagram>`. `data-stage="1"` is in server JSX.
- `StageObserver.tsx`. Client island (`'use client'`). Runs an IntersectionObserver over `.parse-story__step` and sets `data-stage` on `.parse-story` via `setAttribute` only.
- `HelpDialog.tsx`. Client component. `dialog#help` with `~/lab $` prompt (help/whoami/ls, mood line); opens on `?` or the `.footer-help` footer button via the `toggle-help` window event.
- `Nav.tsx`. Primary nav (`home`, `writing`, `slides`) with active-state in
  `var(--color-accent)`; embeds `<ThemeToggle>`.
- `ThemeToggle.tsx`. Client component; flips `[data-theme]` and persists to
  `localStorage`. ASCII label `[ light ]` / `[ dark ]`, no icons.
- `SectionRule.tsx`. `<h2>` with optional rail-bracket `[ NN ]` prefix when the `number` prop is set; 1px `var(--color-border-hair)` rule rendered BELOW the heading. The bracket prefix uses the existing `.section-num` class.
- `StatsLine.tsx`. Server component. Renders the monospace pillars/repos/stack/last-build line plus a proof chip (`zuit · rust SAST`, linked to the zuit repo) under the hero tagline on Home. Reads `BUILD_META` from `site/lib/build-meta.ts`. Never imported from a client component.
- `lib/build-meta.ts`. Build-time constants for `StatsLine`. `lastBuild` resolves at static-export time.
- `lib/site-config.ts`. `SITE_BASE_PATH` (mirrors `basePath` in `next.config.mjs`) and `deckUrl()`, the only sanctioned way to link to a static deck under `public/`.
- `scripts/verify-contrast.mjs`. WCAG contrast gate; runs as a pre-step of `npm run build` via `npm run verify-contrast`. Source of pair list: `.agent/visual-system.md` § Surface contrast verification.
- `ChapterSidebar.tsx`. Server component. Book contents sidebar for chapter pages: book link plus an ordered chapter list with the current chapter marked.
- `PromptGlyph.tsx`. Client component. Renders a decorative, `aria-hidden` shell-prompt glyph picked at random after mount.
- `app/icon.svg`. Favicon: four pillar-colored bars on a dark rounded square.
- `FooterSignature.tsx`, `SkipLink.tsx`. Supporting components.

A11y baselines that must be preserved: skip-link at `<body>` top, `id="main"`
on every page's `<main>`, `:focus-visible` outline in accent color,
`prefers-reduced-motion` honored for every animation.

Bracket motif (`[ NN ]` prefix), `.chip` status pills, and the `.fn-ref`
inline footnote marker are documented in `.agent/visual-system.md`
§ Bracket motif, § Status chips, and § Footnote markers respectively.
The pillar dimension family (cyan/violet/emerald/amber) is documented in
`.agent/profile-system.md` § Personality motifs § Pillar dimension family
and `.agent/visual-system.md` § Accent. Pillar hues attach via the
`data-pillar` attribute on writing-page `<main>` elements and the three locked `<h3>`s in
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

Pages settings (set once in repo Settings → Pages, not in code):

- Source: GitHub Actions
- The workflow file is `.github/workflows/site.yml`. Do not change to
  "Deploy from a branch" or the workflow's artifact upload will be ignored.

## Scope boundaries

The repository previously contained a 2018 Jekyll site (Zolan theme). All
of it was deleted in this session: `index.html`, `404.html`, `images/`,
`2018/`, `about/`, `tag/`, `styleguide/`, `js/`, `favicon.ico`, `robots.txt`,
`search.json`, `sitemap.xml`, `zolanREADME.md`. Do not reintroduce.

## Adding a book to the writing section

A "book" is a multi-chapter long-form series rendered under `/writing/<slug>/`.
To add one, create the following files and registrations:

**File layout:**

- `site/app/writing/<slug>/chapters.ts` -- exports a `Chapter` type and a
  `CHAPTERS` array (id, title, description, date per chapter).
- `site/app/writing/<slug>/page.tsx` -- book index page; lists all chapters.
- `site/app/writing/<slug>/[slug]/page.tsx` -- chapter renderer; imports the
  MDX file for each chapter slug.
- `site/content/<slug>/chNN-<title>.mdx` -- one MDX file per chapter
  (e.g., `ch01-intro.mdx` through `ch05-...mdx`).

**Registration:**

- In `site/app/writing/page.tsx`, import the book's `CHAPTERS` and add an
  entry to the `POSTS` array with `pillar`, `label`, `date`, `status`, `href`,
  and a `chapters` field mapping from `CHAPTERS`.

**IMPORTANT -- pillar color gotcha:**

- Add a CSS rule to `site/styles/globals.css`:
  `main[data-pillar="<pillar>"] { --pillar-color: var(--color-pillar-<pillar>); }`
  Without this, chapter pages render with the wrong accent color. The `ml`,
  `code-int`, and `photonics` rules already exist as reference.

**Existing books (5 chapters each):** `code-intelligence`, `photonics`,
`bayesian-optimization`.

**MDX authoring rules (all chapters):**

- Follow the voice and citation rules in `.agent/writing-strategy.md`.
- Tables use `<table className="encoding-table">`.
- Inline SVG figures use `currentColor` and `var(--pillar-color, currentColor)`
  for accent strokes, with unique chapter-prefixed `id` attributes.
- Citations appear as footnotes (not naked inline links).
- Retention scaffolding (reference implementation: `bayesian-optimization`):
  - Open each chapter with a memorable mental model introduced as "A useful mental model: ..." (a single sustained metaphor carried across all chapters).
  - Thread a single running example through all five chapters.
  - Chapters 2-5 open with a one-sentence bridge: "In Chapter NN we ...; this chapter answers the question that left open: ..."
  - Intuition-before-equation: include a short numeric walkthrough before any key equation (GP posterior, Expected Improvement, etc.).
  - End each chapter with two retention blocks in this order, placed BEFORE the final `## Notes` section: `## Check your understanding` (3 reasoning questions) and `## What to remember` (bold one-sentence summary, 3-bullet list, bold `Key insight:` line). `## Notes` must remain the last section.
  - Include exactly one `<p className="aside">` memory hook per chapter.
  - Use plain Markdown plus the existing `.aside` primitive only. No new CSS, no new components, no new SVG.

## Adding a slide deck to the slides section

The `Slides` tab (`/slides/`) sits beside `Writing` in the nav and mirrors its
shape: an index page, "folders" (a series of decks on one topic), and
standalone decks. Decks are reveal.js pages built for explanation: animated
inline SVG, stepwise fragments, tables, and the occasional interactive demo.
The binding rules live in `.agent/slides-system.md`; read it before touching
anything under `site/app/slides/` or `site/public/slides/`.

**File layout:**

- `site/app/slides/decks.ts` -- registry. `SLIDES: SlideEntry[]` holds one
  `DeckFolder` (slug, title, summary, pillar, date, status, `decks`) or
  `StandaloneDeck` per entry. Each folder's `Deck[]` (number, slug, title,
  summary, `length` as `'NN slides'`, optional `source`) is its own export.
- `site/app/slides/page.tsx` -- index page; renders `SLIDES` with the
  `.blog-list` classes, decks listed inline under their folder.
- `site/app/slides/<folder-slug>/page.tsx` -- folder page; `.chapter-toc`
  list of decks, `data-pillar` on `<main>`.
- `site/public/slides/<folder-slug>/<NN-slug>/index.html` -- the deck. One
  self-contained reveal.js file (reveal pinned from jsDelivr, tokens copied
  from `globals.css`, no build step). Reference:
  `photonic-integrated-circuits/01-introduction/index.html`.

**Registration:**

- New deck in an existing folder: append a `Deck` to that folder's array.
- New folder: add a `DeckFolder` to `SLIDES`, create the folder page from the
  photonic-integrated-circuits one, and confirm a
  `main[data-pillar="<pillar>"]` rule exists in `globals.css`.
- Standalone deck: add a `StandaloneDeck` whose `folder` names the
  `public/slides/<folder>/` directory that holds it.

**Linking gotcha:**

- Decks are static files under `public/`, so they are outside the Next.js
  router. Link to them with a plain `<a href={deckUrl(folder, deck)}>` from
  `site/lib/site-config.ts`, never `<Link>`. `deckUrl` prefixes the Pages
  `basePath`. Links inside a deck back to the site are relative
  (`../../../slides/`).

**Deck rules (summary; full text in `.agent/slides-system.md`):**

- Order: title slide, content slides, `Check your understanding` (three
  questions plus a `what to remember` card), end slide with next-deck
  pointer, attribution link, and links back to the folder and index.
- One claim per slide; the H2 is the claim. Every content slide has a figure
  or a table. Fragments step the drawing and the text together.
- Tokens, fonts, and chrome match the site: dark surfaces, the folder's
  pillar colour as `--accent`, Fraunces / Inter / JetBrains Mono, top
  hairline, mono slide number, fixed deck label.
- SVG: inline only, primitives only, `role="img"` + `<title>` + `<desc>`,
  strokes at 1.5px or wider, shared figure grammar (`.beam`, `.elec`,
  `.dot`, `.guide`, `.box`, `.chip`).
- Motion is opacity, stroke, or travel along a path, keyed to reveal's
  `.present` / `.fragment.visible` classes. `prefers-reduced-motion`
  resolves everything to its final state. No autoplay.
- No emoji, no plugins, no markdown, no `<img>`.

**Existing folders:** `photonic-integrated-circuits` (3 decks).

## Adding a new repo to the profile

1. Update the pin slate in `.agent/profile-system.md` first. Record the reasoning in the commit message.
2. Update `README.md`'s `## Selected work` section to reflect the new entry (and remove or demote the displaced entry).
3. Open a single commit with message `feat: update pin slate, add {repo-name}`.
