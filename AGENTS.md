# AGENTS.md

This is the GitHub profile repository for `shubhamkaushal765`. The root
`README.md` is the profile README rendered on the GitHub user page. The
repository also contains a legacy Jekyll site (Zolan theme, renamed to
`zolanREADME.md`) and a `.agent/` directory holding the operating manual and
conventions for this profile and all related repositories.

## How to work here

- Operating manual (positioning, voice, rules, pin slate): `.agent/profile-system.md`
- Repo conventions (naming, README skeleton, commit hygiene, releases): `.agent/repo-conventions.md`
- Writing strategy (topics, pipeline, voice, citation policy): `.agent/writing-strategy.md`
- Visual system (design tokens, typography, color, spacing): `.agent/visual-system.md`

Read `.agent/profile-system.md` before making any edit to `README.md`.

## Hard rules

- No emoji in any file in this repository.
- No badges in the profile `README.md`. No shields.io, no GitHub stats widgets, no streak cards, no top-langs cards, no trophies, no profile-views counters, no skill-icons rows.
- No GitHub stats widgets of any kind in the profile README. Banned list: `github-readme-stats`, `streak-stats`, `top-langs`, `wakatime`, `metrics`, ASCII contribution charts, trophy badges.
- The tagline is locked verbatim: `Parsers to qubits.` — do not paraphrase, do not punctuate differently, do not omit.
- The three engineering-philosophy lines are locked verbatim (see `.agent/profile-system.md`). Do not reword them.

## Scope boundaries

Do not touch the following files or directories. They are legacy Jekyll content
that is intentionally left in place and is not part of the engineering profile:

- `zolanREADME.md`
- `index.html`
- `404.html`
- `images/`
- `2018/`
- `about/`
- `tag/`
- `styleguide/`
- `js/`
- `.gitignore`
- `favicon.ico`
- `robots.txt`
- `search.json`
- `sitemap.xml`
- `.grepai/`

## Adding a new repo to the profile

1. Update the pin slate in `.agent/profile-system.md` first. Record the reasoning in the commit message.
2. Update `README.md`'s `## Selected work` section to reflect the new entry (and remove or demote the displaced entry).
3. Open a single commit with message `feat: update pin slate — add {repo-name}`.
