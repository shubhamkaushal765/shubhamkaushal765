# Next.js Site Scaffold + README Personality Refresh — Design Spec

**Subject:** Shubham Kaushal — `shubhamkaushal765.github.io`
**Date:** 2026-05-17
**Status:** Approved (user signed off on Sections 1–4 in brainstorming session 2026-05-17)
**Parent spec:** [`2026-05-17-github-profile-design.md`](2026-05-17-github-profile-design.md) — locks identity, voice, visual system, hard rules. This spec extends it with site-scaffold details and the personality-motif system.
**Out of scope:** Real essay content under `/writing/[slug]`, KaTeX setup, OG image generation, custom domain purchase, downstream repo description edits.

---

## 0. Context

The parent spec (2026-05-17-github-profile-design.md) approved the identity system, voice rules, visual tokens, README architecture, and `.agent/` operating manual. That session left the Next.js site explicitly deferred. This spec covers the deferred site work and a parallel personality refresh of the profile `README.md`.

The hostname `shubhamkaushal765.github.io` is served by GitHub Pages from the `shubhamkaushal765/shubhamkaushal765` repository. Vercel cannot serve at `*.github.io`. Therefore the parent spec's choice of Vercel as the deploy target is overridden here: the v1 site ships as a static export from Next.js, committed to `/docs` on `main`, served by GitHub Pages. Vercel returns as an option only if a custom domain is purchased later.

The repository currently contains legacy Jekyll content at root (`index.html`, `404.html`, `images/`, `2018/`, `about/`, `tag/`, `styleguide/`, `js/`, `favicon.ico`, `robots.txt`, `search.json`, `sitemap.xml`, `zolanREADME.md`). All of it is deleted in this session.

---

## 1. Locked decisions (from this brainstorming session)

| Dimension | Locked value |
|---|---|
| **Hosting** | GitHub Pages, source `main` branch, folder `/docs` |
| **Deploy mechanism** | Next.js static export (`output: 'export'`), committed to `/docs` on `main` |
| **Repo layout** | Source in `site/`, build output in `docs/`, design specs in `superpowers/specs/` |
| **v1 page set** | `/` (Home), `/about`, `/writing`, `/now`, `/404` |
| **Legacy cleanup** | Delete all Jekyll files in this session |
| **Personality flavor** | Approach C — Hybrid (monospace hero + prose body + ASCII pillar diagram + small-caps section headers + numbered footnotes + single accent + monospace footer signature) |
| **README scope** | Refresh in same flavor; preserve all locked elements (tagline, philosophy lines, project descriptions) verbatim |
| **CI** | GitHub Action rebuilds `docs/` on push to `main` when `site/**` changes; manual build is the fallback path |
| **Arrows in ASCII** | Plain ASCII (`->`), not Unicode (`→`) |
| **GPG footer line** | Kept with placeholder fingerprint until real key is available |
| **Commit plan** | Two commits at end of implementation: site scaffold + Jekyll deletion, then README refresh + `.agent/` updates |
| **Co-author tag** | None. No Claude co-author lines. |

---

## 2. Architecture

### 2.1 Repository layout (after this session)

```
shubhamkaushal765/
  README.md                  # profile README, refreshed
  AGENTS.md                  # updated scope rules + site work conventions
  .agent/
    profile-system.md        # adds Personality motifs subsection
    repo-conventions.md      # unchanged
    writing-strategy.md      # unchanged
    visual-system.md         # adds Hero diagram subsection
  site/                      # Next.js source
    app/
      layout.tsx
      page.tsx               # /
      about/page.tsx
      writing/page.tsx
      now/page.tsx
      not-found.tsx          # /404
    components/
      Hero.tsx               # renders the shared ASCII pillar diagram
      PillarDiagram.tsx      # the diagram itself, used by Hero
      SectionRule.tsx        # 1px top-rule used above every H2
      FootnoteList.tsx       # numbered citations block
      FooterSignature.tsx    # ~/lab · asia/kolkata · pgp ... block
    content/
      home.mdx
      about.mdx
      now.mdx
    styles/
      globals.css            # Tailwind v4 + design tokens from visual-system.md
    public/
      .nojekyll              # copied to docs/ at build via next.config.mjs
    next.config.mjs
    package.json
    tsconfig.json
    .eslintrc.cjs            # next/core-web-vitals + @typescript-eslint/recommended
  docs/                      # build output, committed and served by Pages
    index.html
    about/index.html
    writing/index.html
    now/index.html
    404.html
    _next/...
    .nojekyll
  superpowers/specs/
    2026-05-17-github-profile-design.md   # MOVED from docs/superpowers/specs/
    2026-05-17-nextjs-site-design.md      # this spec, MOVED from docs/superpowers/specs/
  .github/workflows/
    site.yml                 # rebuilds docs/ on push to main when site/** changes
```

### 2.2 Specs relocation

The existing `docs/superpowers/specs/` directory collides with the build output that will own `/docs/`. Both spec files move to `superpowers/specs/` (new top-level folder) as part of implementation. This is a `git mv` operation and preserves history.

### 2.3 Build pipeline

```
cd site
npm install
npm run build              # runs next build with output: 'export'
                           # writes to ../docs
                           # copies public/.nojekyll to docs/.nojekyll
```

Build configuration in `next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  distDir: '../docs',
  basePath: '',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'mdx'],
};
```

`trailingSlash: true` makes the export emit `/about/index.html` style URLs that GitHub Pages serves cleanly.
`images.unoptimized: true` is required because static export cannot run the Next.js image-optimization API.
`basePath: ''` is correct because the site is at the root of `*.github.io`, not a subpath.

TypeScript config (`tsconfig.json`) is strict and pins the two flags called out in the parent spec §3:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "noEmit": true,
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "paths": { "@/*": ["./*"] }
  }
}
```

### 2.4 GitHub Pages configuration

- Pages source: `main` branch, folder `/docs`.
- This requires a manual one-time step in the repo Settings → Pages UI (cannot be set via API without a token). The implementation plan must call this out as a user step.
- `docs/.nojekyll` is required to prevent Jekyll from rewriting paths that begin with `_next/`.

### 2.5 CI workflow

`.github/workflows/site.yml`:

```yaml
name: Build site

on:
  push:
    branches: [main]
    paths: ['site/**', '.github/workflows/site.yml']

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: site/package-lock.json
      - run: npm ci
        working-directory: site
      - run: npm run build
        working-directory: site
      - name: Commit rebuilt docs/ if changed
        run: |
          if [ -n "$(git status --porcelain docs)" ]; then
            git config user.name "github-actions[bot]"
            git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
            git add docs
            git commit -m "chore: rebuild site from $GITHUB_SHA"
            git push
          fi
```

Manual fallback path (always works, used when CI is broken or for local iteration):

```
cd site
npm run build
cd ..
git add docs
git commit -m "chore: rebuild site"
git push
```

The CI commit is the only situation where a non-human author appears in `main`'s commit log. The hard rule against Claude co-author tags is unrelated to and unaffected by this.

---

## 3. Page content

Each page is built from an MDX file in `content/` rendered by a thin TSX route handler. Prose lives in MDX so future edits do not require touching JSX.

### 3.1 `/` (Home)

Rendered by `app/page.tsx` from `content/home.mdx`.

Structure:

1. Hero — `<Hero>` component renders the shared ASCII pillar diagram (see §4.1).
2. H2 "What I work on" — three H3 pillars (Code Intelligence, Machine Learning, Quantum Computing), each 3 lines of prose. Content matches parent spec §4 (README architecture).
3. H2 "Selected work" — the 5 pinned items as a list. Each item: project name (link), one-sentence description, one keyword tag. Layout is text-only — no images, no badges.
4. H2 "Bridges" — two paragraphs covering TransformerQEC (ML→Quantum) and tell-me-why (Code→ML).
5. H2 "Engineering philosophy" — three lines verbatim from `.agent/profile-system.md`.
6. H2 "Current focus" — H3 "2026-Q2" with three bullets matching the parent spec.
7. H2 "Connect" — email, GitHub, LinkedIn, site URL.
8. `<FooterSignature>` — monospace `~/lab` line.

Metadata:
- `title`: `Shubham Kaushal — Parsers to qubits.`
- `description`: the one-line identity statement.
- JSON-LD: `Person` schema with `name`, `url`, `sameAs` (GitHub, LinkedIn).

### 3.2 `/about`

Rendered by `app/about/page.tsx` from `content/about.mdx`.

Structure:

1. Hero — `<Hero variant="compact">` rendering just the tagline + diagram, smaller than home.
2. H1 "About" (page title).
3. H2 "Identity" — the one-line identity statement followed by the differentiation paragraph (parent spec §2).
4. H2 "Three pillars" — H3 per pillar, 5–7 sentences of prose each (longer than home).
5. H2 "Bridge artifacts" — TransformerQEC + tell-me-why with numbered footnote citations to the relevant papers.
6. H2 "Engineering philosophy" — three lines verbatim.
7. H2 "How I work" — short list of operational norms (Conventional Commits, GPG-signed, SARIF-as-deliverable, no co-author tags), lifted from `.agent/repo-conventions.md`.
8. H2 "12-month direction" — H3 per quarter, one paragraph each, lifted from parent spec §8.
9. H2 "Footnotes" — `<FootnoteList>` numbered list, format per `.agent/writing-strategy.md` §citation policy.
10. `<FooterSignature>`.

Metadata:
- `title`: `About — Shubham Kaushal`
- `description`: independent engineer/researcher one-liner.
- JSON-LD: extended `Person` schema with `knowsAbout` array.

### 3.3 `/writing`

Rendered by `app/writing/page.tsx`. No MDX — content is inline.

Structure:

1. H1 "Writing".
2. Empty-state paragraph: "First essay shipping Q3 2026. Pipeline:".
3. Ordered list of the five planned posts from `.agent/writing-strategy.md` §writing pipeline, each as: bolded title, one-sentence summary, pillar tag. No publication dates.
4. Closing paragraph: brief note on citation policy and reproducibility commitment.
5. `<FooterSignature>`.

Routes for individual essays (`/writing/[slug]`) are scaffolded in the file tree but no slugs exist. Implementation creates `app/writing/[slug]/page.tsx` that throws on missing slug (or uses `generateStaticParams` returning `[]`).

Metadata:
- `title`: `Writing — Shubham Kaushal`
- `description`: pipeline summary.

### 3.4 `/now`

Rendered by `app/now/page.tsx` from `content/now.mdx`.

Structure:

1. H1 "Now".
2. Paragraph explaining the `/now` convention with a footnote link to nownownow.com.
3. Three dated entries from 2026-Q2 in reverse-chronological order, 1–3 lines each. Content lifted from parent spec §4 "Current focus".
4. Last-updated line: `Last updated 2026-05-17.`
5. `<FooterSignature>`.

Metadata:
- `title`: `Now — Shubham Kaushal`
- `description`: current research focus.

### 3.5 `/404` (not-found)

Rendered by `app/not-found.tsx`. Sparse:

1. Monospace tagline at top (`parsers -> qubits.` only, no diagram).
2. H1 "404".
3. One-line message: "That page does not exist. Try [home](/) or [writing](/writing/)."
4. `<FooterSignature>`.

---

## 4. Personality motifs

These five motifs recur across the README and every site page. They are the visual fingerprint of the profile and bind all surfaces together.

### 4.1 Hero codefence with ASCII pillar diagram

The shared visual centerpiece. Used in:
- `README.md` hero (as a `text` codefence per parent spec §4)
- `/` Home hero (full-size)
- `/about` hero (compact variant — diagram only, no header line)
- `/404` (tagline line only)

Diagram (canonical form, copy verbatim):

```
+----------------------------------------------------------+
|  shubham kaushal // shubhamkaushal765                    |
|                                                          |
|  parsers -> qubits.                                      |
|                                                          |
|     code intelligence ---bridge--- machine learning      |
|              \                          /                |
|               \                        /                 |
|                +------ bridge ------> quantum computing  |
|                                                          |
|  rust at the bottom. python at the top.                  |
+----------------------------------------------------------+
```

Rules:
- Lowercase throughout the diagram. Reads as a terminal banner, not a marketing block.
- ASCII only: `+`, `-`, `|`, `\`, `/`, `>`. No Unicode arrows. No emoji. No box-drawing characters.
- Diagram width is fixed at 60 characters between the `+` borders.
- The line `parsers -> qubits.` is the locked tagline from parent spec §2.
- The bottom line `rust at the bottom. python at the top.` is a new permitted addition (from parent spec §8 "advanced differentiation"). Locked verbatim.
- On the site, this renders inside `<pre>` with `font-family: var(--font-mono)` (Berkeley Mono). On the README, it lives in a `text`-language codefence to preserve monospace.
- On the site only: the `parsers -> qubits.` line gets a one-time fade-in reveal in `--accent` color, duration ≤200ms (parent spec §3 micro-interaction budget). No other animation anywhere.

### 4.2 Section headers

- README: every H2 is preceded by a `---` horizontal-rule line. H3 has no rule.
- Site: every H2 renders via `<SectionRule>` — a 1px line in `--text-footnote` color across the prose column, with 2rem space above and 0.5rem below. H2 text uses Inter Display 600, small-caps, tracking `-0.02em`, per `.agent/visual-system.md`. H3 has no rule.
- No numbering (`[01]`, `§1`) on any header — would tilt toward whimsy.

### 4.3 Numbered footnote citations

- Used on `/about`, `/now` (one footnote for nownownow), and all future essays under `/writing/[slug]`.
- Not used on `/` or `/writing` (index) — those are not papers.
- Format from `.agent/writing-strategy.md`: `[N] Author et al. "Title." Venue Year. https://arxiv.org/abs/...`
- Implementation: hand-written MDX, no `rehype-citation` dependency for v1.
- Inline reference style: `Transformer-QEC [1]` with `[1]` as an anchor link to `#fn-1` inside `<FootnoteList>`.

### 4.4 Single accent color (`#7dd3fc`)

- Inline `<code>` (project names, file paths, technical terms): foreground `#7dd3fc`, background `--surface-card`, padding `2px 4px`, radius `3px` — matches `.agent/visual-system.md`.
- Link underline: `currentColor` at 50% opacity → 100% on hover. No color change.
- One-time use: the `parsers -> qubits.` line in the home hero fades to `--accent` for the reveal.
- Nothing else uses the accent. No accent for buttons (there are no buttons in v1). No accent for active nav state (there is no nav in v1 — just inline links between pages).

### 4.5 Footer signature (monospace)

Rendered by `<FooterSignature>` on every site page and at the bottom of the README, immediately above the `<sub>` forks footnote.

Canonical form:

```
~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF
```

Rules:
- Lowercase throughout.
- Three middle-dot-separated segments. Middle dot `·` is U+00B7 (acceptable Unicode — it is punctuation, not emoji, and is widely used in legal/research contexts).
- The PGP fingerprint is a placeholder (`0xDEADBEEF`) until a real key is generated. When the real key exists, replace the placeholder; do not remove the segment.
- Renders in `--font-mono` at `--text-footnote` color, centered within the prose column.

---

## 5. README refresh

The current `README.md` (committed in 09c4223) is structurally correct per the parent spec. This refresh adds personality motifs without altering locked content.

### 5.1 Changes

- Replace the hero codefence with the canonical ASCII pillar diagram from §4.1. The 3-line thesis paragraph that follows the diagram stays inside the same codefence, separated by one blank line.
- Add `---` horizontal rule above each H2 (motif §4.2).
- Add a new H2 "How I work" between "Engineering philosophy" and "Current focus":
  ```
  ## How I work
  
  - Conventional Commits strict on every repo. Linear history on `main`.
  - Commits are GPG-signed. No Claude co-author tags.
  - Reproducibility is the deliverable: fixtures, seeds, SARIF, `expected.json`.
  ```
- Add a `<sub>` line containing the `<FooterSignature>` content at the very bottom, directly above (not replacing) the existing forks-ecosystem `<sub>` line.
- Add `Site: shubhamkaushal765.github.io` as the first line of the "Connect" block.

### 5.2 What does NOT change

- Tagline `Parsers to qubits.` — locked verbatim.
- The three engineering-philosophy lines — locked verbatim.
- All five Selected-work descriptions — locked per parent spec §5.
- "Bridges" section prose — unchanged.
- "Current focus" content — unchanged (only the bullet wording stays as-is).
- Section order — unchanged from parent spec §4.

---

## 6. `.agent/` document updates

### 6.1 `.agent/profile-system.md`

Add a new section "Personality motifs" between "Voice rules" and "Audience perception matrix". Content: the five motifs from §4 above, restated as binding rules. This ensures future edits do not reintroduce decoration or remove the motifs by accident.

### 6.2 `.agent/visual-system.md`

Add a new section "Hero diagram" between "Color tokens" and "Link style". Content:
- The canonical ASCII diagram (verbatim from §4.1).
- Implementation rule: `<pre>` with `font-family: var(--font-mono)`, `font-size` matching body code, `line-height: 1.2`, no surrounding background or border.
- The `parsers -> qubits.` line is the single accent reveal: opacity 0 → 1 fade-in over 200ms on initial render only, then static at `--accent` color. No hover state.

### 6.3 `.agent/repo-conventions.md`

No change. Already covers commit hygiene and co-author tag prohibition.

### 6.4 `.agent/writing-strategy.md`

No change. Citation format is already specified.

---

## 7. AGENTS.md updates

### 7.1 "How to work here" section

Add three lines after the existing four operating-manual links:

```
- Site source: `site/` (Next.js, own package.json — run all npm commands from there)
- Site build output: `docs/` (committed, served by GitHub Pages — never edit by hand)
- Design specs: `superpowers/specs/` (NOT `docs/superpowers/`)
```

### 7.2 Hard rules section

Add one rule:

```
- Never edit `docs/` by hand. Always regenerate via `cd site && npm run build`.
- `docs/.nojekyll` must always exist after a build. If missing, the build is broken.
```

### 7.3 Scope boundaries section

Replace the entire list of legacy Jekyll paths with a single line:

```
The repository previously contained a 2018 Jekyll site (Zolan theme). All of
it was deleted in commit {SHA-to-be-filled}. Do not reintroduce.
```

### 7.4 "Adding a new repo to the profile" section

No change.

### 7.5 Add new section "Site work"

```
## Site work

The Next.js source lives in `site/`. All npm commands must be run from there:

    cd site
    npm install        # first-time setup
    npm run dev        # local preview at http://localhost:3000
    npm run build      # static export to ../docs
    npm run lint       # ESLint
    npx tsc --noEmit   # typecheck

The build writes to `docs/` at the repo root. Commit `docs/` along with the
source changes that produced it. CI will rebuild on push to `main` and commit
a follow-up `chore: rebuild site from <sha>` commit if the output drifts.

Pages settings (set once in repo Settings → Pages, not in code):
- Source: Deploy from a branch
- Branch: `main`, folder: `/docs`
```

---

## 8. Legacy Jekyll deletion

Files and directories to remove with `git rm -rf` in the implementation plan:

- `index.html`
- `404.html`
- `images/`
- `2018/`
- `about/`
- `tag/`
- `styleguide/`
- `js/`
- `favicon.ico`
- `robots.txt`
- `search.json`
- `sitemap.xml`
- `zolanREADME.md`

Total: ~200KB of files, ~10 directories. Git history preserves the originals.

The legacy `.gitignore` at root is preserved — Next.js will use it (e.g., `node_modules/`, `.next/`, `*.log`). It may be edited during implementation to add `site/node_modules/`, `site/.next/`, and `site/out/` if the existing entries don't already cover them.

---

## 9. Dependency selection

Pinned for v1 (write into `site/package.json`):

| Package | Version (caret) | Purpose |
|---|---|---|
| `next` | `^15.0.0` | Framework. App Router + static export. |
| `react` | `^19.0.0` | Per Next 15 baseline. |
| `react-dom` | `^19.0.0` | Per Next 15 baseline. |
| `typescript` | `^5.6.0` | Strict mode + the two pinned flags. |
| `@types/react` | `^19.0.0` | Types. |
| `@types/react-dom` | `^19.0.0` | Types. |
| `@types/node` | `^22.0.0` | Types. |
| `tailwindcss` | `^4.0.0` | Utility CSS. |
| `@tailwindcss/postcss` | `^4.0.0` | Tailwind v4 PostCSS plugin. |
| `postcss` | `^8.4.0` | Required by Tailwind. |
| `@next/mdx` | `^15.0.0` | MDX-as-pages support. |
| `@mdx-js/loader` | `^3.0.0` | MDX loader. |
| `@mdx-js/react` | `^3.0.0` | MDX runtime. |
| `eslint` | `^9.0.0` | Linting. |
| `eslint-config-next` | `^15.0.0` | Next-specific rules. |

Explicitly NOT installed for v1 (deferred):
- `shiki` — no syntax-highlighted code blocks on Home/About; defer until first essay.
- `lucide-react` — no icons in v1.
- `framer-motion` — the single accent reveal is a CSS `@keyframes` animation, not a JS library.
- `katex` / `rehype-katex` — no math in v1; deferred to TransformerQEC essay.
- `next-seo` — manual `metadata` export is sufficient for 4 pages.
- `@vercel/og` — static export, no dynamic OG. Plain `og:image` omitted entirely for v1.
- `shadcn/ui` — no forms.

---

## 10. Implementation plan summary

This spec is the input to `writing-plans`. The plan will break implementation into these phases (in order):

1. **Specs relocation** — `git mv docs/superpowers/ superpowers/`. One commit: `chore: relocate specs to superpowers/`.
2. **Jekyll deletion** — `git rm -rf` the 13 files/dirs listed in §8. One commit included in the next phase.
3. **Next.js scaffold** — create `site/` with `package.json`, `next.config.mjs`, `tsconfig.json`, `app/layout.tsx`, `app/page.tsx`, `styles/globals.css`, `public/.nojekyll`. Verify `npm install` and `npm run build` succeed before adding content.
4. **Components** — implement `Hero`, `PillarDiagram`, `SectionRule`, `FootnoteList`, `FooterSignature`. Each is a server component (no `"use client"` needed; the accent reveal is CSS-only).
5. **Page content** — write `content/home.mdx`, `content/about.mdx`, `content/now.mdx`. Implement `/writing` page inline. Implement `/404`.
6. **Tokens + Tailwind** — write `styles/globals.css` with the design tokens from `.agent/visual-system.md` as CSS variables, then Tailwind config consuming them.
7. **Build + verify** — `npm run build`. Verify `docs/index.html`, `docs/about/index.html`, `docs/writing/index.html`, `docs/now/index.html`, `docs/404.html`, `docs/.nojekyll` all exist. Verify the diagram renders as monospace in the built output.
8. **CI workflow** — create `.github/workflows/site.yml`.
9. **README refresh** — apply §5 changes.
10. **`.agent/` updates** — apply §6 changes.
11. **AGENTS.md updates** — apply §7 changes (including filling in the SHA of the Jekyll-deletion commit once it exists).
12. **Commit + push** — two commits:
    - `feat(site): scaffold next.js site + delete jekyll legacy + relocate specs`
    - `feat(profile): refresh readme with personality motifs + update agent docs`
13. **User step (out of automation)** — set Pages source to `main` branch, `/docs` folder in repo Settings.

---

## 11. Verification checklist

After implementation, the following must all be true:

- [ ] `cd site && npm run build` succeeds with no warnings other than acceptable framework noise.
- [ ] `docs/index.html` exists and contains the literal string `parsers -> qubits.` in a `<pre>` block.
- [ ] `docs/.nojekyll` exists.
- [ ] `docs/about/index.html`, `docs/writing/index.html`, `docs/now/index.html`, `docs/404.html` all exist.
- [ ] README hero codefence contains the canonical ASCII diagram verbatim from §4.1.
- [ ] No emoji anywhere in the repo: `grep -rP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' --include='*.md' --include='*.mdx' --include='*.tsx' --include='*.ts' --include='*.html' .` returns nothing.
- [ ] No badges in README: `grep -E 'shields\.io|img\.shields|github-readme-stats|streak-stats|top-langs|wakatime|skill-icons|profile-views' README.md` returns nothing.
- [ ] All five locked Selected-work descriptions in README match parent spec §5 verbatim.
- [ ] The three engineering-philosophy lines appear verbatim in README, `/`, and `/about`.
- [ ] No `Co-Authored-By: Claude` in any commit added this session.
- [ ] All 13 legacy Jekyll paths from §8 no longer exist in the working tree.
- [ ] `superpowers/specs/2026-05-17-github-profile-design.md` exists; `docs/superpowers/` no longer exists.
- [ ] AGENTS.md "Scope boundaries" no longer lists the deleted Jekyll files.

---

## 12. Open items / future work

- **Custom domain** — decide and purchase. Until then, `shubhamkaushal765.github.io` stays.
- **Real GPG key** — generate, publish to keys.openpgp.org, replace `0xDEADBEEF` placeholder in `<FooterSignature>` and `.agent/visual-system.md`.
- **First essay** — pipeline post #1 (SARIF) is the lead. Will introduce Shiki and the `/writing/[slug]` route.
- **TransformerQEC essay** — needs KaTeX. Add when drafting.
- **OG image generation** — `@vercel/og` requires server runtime; defer or move to Vercel deploy when custom domain is decided.
- **Sitemap + robots** — generate from Next config when there are more than ~10 pages. Skipped for 4-page v1.
- **Favicon** — parent spec bans avatars; a non-avatar favicon (e.g., a 16x16 SVG with the tagline character `>`) is permissible. Not in v1.

---

## 13. Approval trace

- 2026-05-17: User confirmed GitHub Pages (static export) as the hosting target, accepting that Vercel is not viable at the `*.github.io` hostname.
- 2026-05-17: User confirmed repo layout: source in `site/`, build to `docs/`.
- 2026-05-17: User confirmed v1 page set: Home + About + Writing index + `/now` (added via Approach C personality flavor).
- 2026-05-17: User confirmed deleting all Jekyll legacy files this session.
- 2026-05-17: User confirmed personality scope: refresh README and design site with the same flavor.
- 2026-05-17: User chose Approach C (Hybrid) for the personality flavor.
- 2026-05-17: User approved Section 1 (architecture & build pipeline), including the CI Action.
- 2026-05-17: User approved Section 2 (page-by-page content).
- 2026-05-17: User approved Section 3 (personality system), keeping the GPG placeholder line and ASCII (not Unicode) arrows.
- 2026-05-17: User approved Section 4 (README refresh + scope boundaries + two-commit plan).
