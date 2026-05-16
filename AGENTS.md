# AGENTS.md

This is the GitHub profile repository for `shubhamkaushal765`. The root
`README.md` is the profile README rendered on the GitHub user page. The
Next.js site that backs `https://shubhamkaushal765.github.io` lives under
`site/` (source) and `docs/` (static export served by GitHub Pages). The
`.agent/` directory holds the operating manual and conventions.

## How to work here

- Operating manual (positioning, voice, rules, pin slate, personality motifs): `.agent/profile-system.md`
- Repo conventions (naming, README skeleton, commit hygiene, releases): `.agent/repo-conventions.md`
- Writing strategy (topics, pipeline, voice, citation policy): `.agent/writing-strategy.md`
- Visual system (design tokens, typography, color, spacing, hero diagram): `.agent/visual-system.md`
- Site source: `site/` (Next.js, own `package.json` — run all npm commands from there)
- Site build output: `docs/` (committed, served by GitHub Pages — never edit by hand)
- Design specs: `superpowers/specs/` (NOT `docs/superpowers/`)
- Implementation plans: `superpowers/plans/`

Read `.agent/profile-system.md` before making any edit to `README.md`.

## Hard rules

- No emoji in any file in this repository.
- No badges in the profile `README.md`. No shields.io, no GitHub stats widgets, no streak cards, no top-langs cards, no trophies, no profile-views counters, no skill-icons rows.
- No GitHub stats widgets of any kind in the profile README. Banned list: `github-readme-stats`, `streak-stats`, `top-langs`, `wakatime`, `metrics`, ASCII contribution charts, trophy badges.
- The tagline is locked verbatim: `Parsers to qubits.` — do not paraphrase, do not punctuate differently, do not omit. The lowercase rendering `parsers -> qubits.` inside the hero diagram is the only permitted variant.
- The three engineering-philosophy lines are locked verbatim (see `.agent/profile-system.md`). Do not reword them.
- Never edit `docs/` by hand. Always regenerate via `cd site && npm run build`.
- `docs/.nojekyll` must always exist after a build. If missing, the build is broken.

## Site work

The Next.js source lives in `site/`. All npm commands must be run from there:

    cd site
    npm install        # first-time setup
    npm run dev        # local preview at http://localhost:3000
    npm run build      # static export to ../docs
    npm run lint       # ESLint
    npm run typecheck  # tsc --noEmit

The build writes to `docs/` at the repo root. Commit `docs/` along with the
source changes that produced it. CI will rebuild on push to `main` and commit
a follow-up `chore: rebuild site from <sha>` commit if the output drifts.

Pages settings (set once in repo Settings → Pages, not in code):

- Source: Deploy from a branch
- Branch: `main`, folder: `/docs`

## Scope boundaries

The repository previously contained a 2018 Jekyll site (Zolan theme). All
of it was deleted in this session — `index.html`, `404.html`, `images/`,
`2018/`, `about/`, `tag/`, `styleguide/`, `js/`, `favicon.ico`, `robots.txt`,
`search.json`, `sitemap.xml`, `zolanREADME.md`. Do not reintroduce.

## Adding a new repo to the profile

1. Update the pin slate in `.agent/profile-system.md` first. Record the reasoning in the commit message.
2. Update `README.md`'s `## Selected work` section to reflect the new entry (and remove or demote the displaced entry).
3. Open a single commit with message `feat: update pin slate — add {repo-name}`.
