# GitHub Profile + Personal Website Branding Spec

**Subject:** Shubham Kaushal — GitHub `shubhamkaushal765`
**Date:** 2026-05-17
**Status:** Approved (user signed off on all three design sections in brainstorming session 2026-05-17)
**Scope (this session):** Branding system + GitHub profile `README.md` + `AGENTS.md` + `.agent/` operational docs. Next.js site scaffold is deferred to a future session.

---

## 0. Context

The directory `/Users/coolmajor/VSCodeProjects/shubhamkaushal765` is a clone of the user's GitHub profile repo (`shubhamkaushal765/shubhamkaushal765`). Its current contents are a 2018 Jekyll site (Zolan theme, tarot/crystal posts) that does not represent the user's engineering identity. The original Jekyll `README.md` was renamed to `zolanREADME.md`, leaving no profile README at the repo root.

The user is an independent engineer / researcher working across three domains with real shipped artifacts:

- **Code intelligence / static analysis** — `zuit` (Rust, public), `codelens` (Rust, private, being absorbed into `zuit`), `zuit-python-test-cases` (fixture corpus), `codelens-docs` (TypeScript docs site).
- **Machine learning (applied)** — `tell-me-why` (local-first RAG over code: Ollama + Chroma + sentence-transformers, supports Python/Rust/C#/Java/JS/TS/Go), `Denoising-images-Autoencoders`, `IMDB-Sentiment-Analysis`, `MNIST-image-classifier`, `exploratory-data-analysis`, `kaggle_competitions`.
- **Quantum computing** — `TransformerQEC` (⭐6, unofficial impl of "Transformer-QEC: Quantum Error Correction Code Decoding with Transferable Transformers" — surface code via Stim, custom transformer encoder, PyTorch Lightning, 31 commits), `qosf_excercises` (QOSF Cohort 9, Task 4: QAOA and Adiabatic Quantum Computing), `qc` (practice notebooks). Ecosystem reading: forks of `openqaoa`, `QAOAKit`, `qBraid`, `qiskit-textbook`.

Additional adjacent work omitted from the profile to preserve research-lab framing: `codestick` (TS animation library, breadth proof — kept as pin), `verbose-noodles` (Tauri local-first notes — future pin candidate), `habit-tracker` (Next.js+Supabase), `ordersync` (Next.js+Supabase SaaS). Quant work in `~/PycharmProjects` (`millipede-of-trades`, `systematic_trading`, `v20-python-samples`) is also omitted.

The user's email is `kaushalshubham.ks@gmail.com`. Site URL convention: subject lives at `shubhamkaushal765.github.io` until a custom domain is purchased.

---

## 1. Locked decisions (from brainstorming)

| Dimension | Locked value |
|---|---|
| **Primary positioning** | Independent researcher / tool builder |
| **Domain spine** | Code intelligence + ML + Quantum (three equal pillars) |
| **Bridge artifacts** | `TransformerQEC` (ML→Quantum), `tell-me-why` (Code→ML) |
| **Q + ML scope** | Equal-weight spine alongside code intelligence |
| **Tagline (locked)** | "Parsers to qubits." |
| **Stack name** | High-Signal Research-Lab Stack |
| **Design archetype** | Engineering research lab — terminal-adjacent, paper-adjacent |
| **Pin slate (5 of 6)** | TransformerQEC · zuit · tell-me-why · qosf_excercises · codestick |
| **6th pin** | Intentionally empty until `verbose-noodles` or `zuit-python-test-cases` ships stronger |
| **Default mode** | Dark mode default; light is a toggle |
| **Co-authorship in commits** | None. No Claude co-author tags. |

---

## 2. Brand positioning

### One-line identity
> Independent engineer and researcher working across code intelligence, machine learning, and quantum computing — from Rust-based static analyzers at the bottom of the stack to transformer-based quantum error correction at the top.

### Tagline (locked)
**"Parsers to qubits."** — Code intelligence, ML, and quantum error correction.

### Developer archetype
Research-lab independent operator. Tone reference: `oilshell.org`, `nullprogram.com`, Stripe Press whitepaper. Not a portfolio site.

### Engineering philosophy (three lines, verbatim across profile and site)
- Structure first, syntax second — work on the AST, the syndrome graph, the embedding, not the surface form.
- Run local until proven otherwise — code, models, and quantum simulators belong on the operator's machine.
- Reproducibility is the deliverable — fixtures, seeds, SARIF, `expected.json` — the artifact is the contract.

### Differentiation (one paragraph used in About page + LinkedIn summary)
You build the infrastructure for the artifacts you study. You write Rust static analyzers because you take program structure seriously. You build local-first RAG over code (`tell-me-why`) because models should run where the data lives. You implement transformer-based quantum decoders (`TransformerQEC`) because error correction is where ML methods are about to matter most. The connecting thread is operating on *symbolic structure* — ASTs, code embeddings, syndrome graphs — and building tooling that respects the structure.

---

## 3. Tech stack strategy

### Locked foundation (no overrides; for the future Next.js site)
- **Next.js 15 (App Router)** — RSC + file-based routing + MDX-native via `@next/mdx`
- **TypeScript strict** — pinned `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- **Tailwind CSS v4** — utility-first, tokens as CSS variables
- **MDX** — every long-form piece is `.mdx`; Shiki for syntax (theme `vesper` or `vitesse-dark`)
- **Vercel** — deployment + preview deploys

### Optional enhancements (off by default)
- `lucide-react` — monoline icons only
- `next-seo` — metadata + OG + JSON-LD Person + ScholarlyArticle schema
- `framer-motion` — at most one micro-interaction (≤200ms)
- `shadcn/ui` — only if forms appear
- `@vercel/og` — when first quantum essay ships
- KaTeX / `rehype-mathjax` — required for the TransformerQEC writeup

### Stack identity narrative
The stack signals: optimization for words-on-the-page, not animation; respect for metadata, semantics, accessibility; content shipped like code — typed, lint-clean, versioned in MDX. Next.js + MDX is one module graph; Tailwind tokens style both code blocks and prose; no CMS, no animation framework, no design system overlay. The stack is the design system.

### Stack evolution path
- **Add when warranted:** OG image generation (`@vercel/og`), KaTeX, Mermaid for syndrome graphs.
- **Avoid:** headless CMS, drag-and-drop builders, GSAP, R3F on landing pages, particle backgrounds, AI-generated hero images.
- **Senior-signal upgrades:** correct `og:` + JSON-LD per page; type-checked MDX at build time; hover citation cards on external essay links.

---

## 4. README architecture

### Section order (final)
1. **Hero block (codefenced)** — name + tagline + 1-paragraph thesis. 6–8 lines.
2. **What I work on** — three pillars (Code Intelligence · Machine Learning · Quantum Computing). 3 lines per pillar. 9 lines total.
3. **Selected work** — 5 pinned-mirror items with 1-line descriptions, with one keyword tag each.
4. **Bridges** — explicit callout: TransformerQEC bridges ML→Quantum; tell-me-why bridges Code→ML.
5. **Engineering philosophy** — three lines from §2 verbatim.
6. **Current focus** — three bullets, dated this quarter. (2026-Q2: qubit calibration & orchestration tooling research; zuit 0.x → 1.0 path; TransformerQEC reproduction on public datasets.)
7. **Writing & talks** — site link + RSS hook (auto-pulled when site is live).
8. **Connect** — email, site, LinkedIn, GitHub. One line each. No badges.

### Perception matrix (already validated)
| Audience | Action |
|---|---|
| OSS maintainer | Stars zuit, opens issue if codelens visible |
| Quantum/ML researcher | Opens TransformerQEC, possibly cites |
| Recruiter (staff IC) | Outbound |
| Founder/VC | Reaches out about tell-me-why / codelens commercial story |
| Hiring manager (skeptical) | Reads to the end |

### README content rules
- **Hero codefence:** triple backticks with `text` (no language) for the hero block to preserve monospace + visual anchor.
- **No emoji.** Anywhere. Period.
- **No badges in the profile README.** Project READMEs may use up to 3 (build, version, license).
- **No GitHub stats widgets.** Banned list: `github-readme-stats`, `streak-stats`, `top-langs`, `wakatime`, `metrics`, ASCII contribution charts, trophy badges, profile-views counters, skill-icons rows.
- **No emoji-bullets, no "✨ Made with love".**
- Links open in the same tab. Anchored to project repos directly.

---

## 5. Project positioning system

### Pin slate (final — 5 active, 6th intentionally empty)
1. **TransformerQEC** — quantum × ML flagship
2. **zuit** — static analysis (public Rust)
3. **tell-me-why** — local-first RAG over code
4. **qosf_excercises** — QOSF Cohort 9 credential
5. **codestick** — published TS animation library
6. *(empty — discipline signal)*

### Improved GitHub repo descriptions (apply via `gh repo edit ... --description`)
- **TransformerQEC:** "Transformer-based decoder for surface-code QEC. Stim simulation + PyTorch Lightning training + syndrome-graph encoding. Implements Transformer-QEC: Quantum Error Correction Code Decoding with Transferable Transformers."
- **zuit:** "Multi-language static-analysis CLI in Rust. Structured findings across maintainability, security, complexity, documentation, and test-smell dimensions. SARIF 2.1.0 + CWE/OWASP taxonomy."
- **tell-me-why:** "Local-first RAG over your codebase. Multi-language: Python, Rust, C#, Java, JS/TS, Go. Ollama + Chroma + sentence-transformers — code and embeddings never leave the machine."
- **qosf_excercises:** "QOSF Cohort 9 — Task 4: QAOA and Adiabatic Quantum Computing solutions. Variational ansatz, adiabatic-to-QAOA mapping, benchmark notebooks."
- **codestick:** "Programmatic stick-figure animation library for TypeScript. Angular-skeleton system with forward kinematics, 22 human poses, 10 animation clips, motion paths along bezier curves, SVG export."

### Tier 3 — README mention, no pin
- **zuit-python-test-cases** — "Python fixture corpus exercising every zuit Python-applicable rule — vulnerable + safe pairs with `expected.json` contracts."
- **codelens-docs** — "TypeScript docs site for codelens — guides, API reference, dimension explainers." *(Will be folded into `zuit-docs` as codelens absorbs into zuit.)*
- **qc** — "Quantum computing study notebooks — Qiskit, Cirq, variational methods."
- **ML fundamentals (group line)** — "Earlier ML work — autoencoders, sentiment classification, image classification, EDA, Kaggle competitions."

### Tier 4 — forks (single line at most)
> Reads / contributes to the qBraid, openqaoa, QAOAKit, and qiskit-textbook ecosystems.

### Omitted entirely from profile README
- `habit-tracker`, `ordersync` — side products, preserve research-lab framing.
- `ac_roster` — no public mapping to qubit calibration; ignored.
- All PycharmProjects (`millipede-of-trades`, `systematic_trading`, `v20-python-samples`, `ball-of-fire`) — out of spine.

### Qubit calibration & orchestration positioning
No public repo exists. Position in the **Current focus** section as research direction:
> Currently researching: qubit calibration scheduling (RB / T1 / T2 / single-qubit gate tomography) as an orchestration problem.

---

## 6. Visual + design system (for site; informs README aesthetic choices)

### Hierarchy
1. One H1 per page (page title only).
2. H2 = pillar (Code Intelligence / ML / Quantum). Small-caps, slightly larger leading.
3. H3 = project or topic.
4. Never deeper than H3 in README; H4 max on site.
5. Text > badges > stats > images. In trust order. 8-words → no badge.

### Spacing (site)
- Base: `--space-1: 0.25rem`. Scale: 1, 2, 3, 5, 8, 13 (Fibonacci).
- Section gap: `--space-13`; subsection gap: `--space-8`.
- Max prose width: `68ch`; code may extend to `82ch` with horizontal scroll.

### Typography (site)
- Headings: Inter Display, weight 600, tracking -0.02em, optical sizing on.
- Prose: Inter, weight 400, `leading-7`.
- Code: Berkeley Mono (paid) → fallback JetBrains Mono or Geist Mono.
- Math: KaTeX with STIX Two Math.
- Allowed weights: 400, 500, 600. No italic display headings. No drop caps. Left-rag always.

### Color (dark default)
- Surface: `#0a0a0a` base, `#111111` cards, `#161616` hover.
- Text: `#ededed` body, `#a3a3a3` muted, `#737373` footnote.
- Accent (one only): `#7dd3fc` (sky-300) — links, inline `code`, single reveal animation.
- Link underline: 1px currentColor at 50% opacity, offset 2px. No color change on hover — opacity → 100% only.
- Code blocks: Shiki, `vesper` or `vitesse-dark`. Page-surface background (no tint). Single line-numbers column.

### Banner / OG
Default = no banner. When OG needed: `@vercel/og` at build time — `#0a0a0a` background, white Inter Display (name + tagline), single 1px hairline at 60% from top. No emoji, no avatar, no gradient.

### Photography / illustration
- No stock photography.
- Allowed: surface-code diagrams (SVG from Stim outputs), syndrome graphs, parser AST visualizations, `zuit` SARIF screenshots. Vector preferred.

---

## 7. Profile optimization strategy

### Pin selection logic (priority order)
1. Pillar coverage (≥1 per pillar).
2. Bridges beat singles (TransformerQEC, tell-me-why rank higher).
3. Shipped > scaffolded (≥30 commits, real README, real CI).
4. Self-contained card description (≤250 chars).
5. No demos, no tutorials, no forks.

### Repo naming convention (going forward)
- Lowercase, hyphenated.
- No version suffixes (`v2`, `final`, `new`).
- Prefix discipline: `zuit-*` family; `qec-*` for future quantum-error-correction repos.
- Function-name over codename (`tell-me-why` is fine because product name; `ball-of-fire` is not).

### Repo README skeleton (apply to all owned repos)
```
# {repo-name}

One-sentence value proposition.

## Install / Quickstart
## Usage
## Architecture (1 paragraph + optional ASCII diagram)
## Status (alpha / beta / stable + roadmap link)
## License
```
Status section is **mandatory** for OSS credibility.

### Commit hygiene
- Conventional commits strict (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- Squash-merge into `main`; linear history.
- No WIP/asdf/lol commits on `main`. Force-push only in feature branches.
- Sign commits (`gpgSign true`). "Verified" badge is senior signal.

### Release strategy
- `zuit`: semver, 0.x.y until SARIF schema stabilizes → 1.0. crates.io.
- `tell-me-why`: semver, npm + PyPI.
- `codestick`: semver, npm, `changesets`.
- `TransformerQEC`: date-tagged (`2026-05-17-v1`) — research impl, not library.
- Every release: `CHANGELOG.md` generated then reviewed.
- TransformerQEC must include `CITATION.cff`.

### GitHub Actions
- Required: CI matrix on every PR (test + lint + typecheck/clippy/ruff).
- Required: `release-please` or `changesets` workflow per library.
- Required: Dependabot, security updates only.
- Banned: welcome-bots, auto-labelers, stale-issue bots.

### Contribution graph ethics
No artificial inflation. Empty weeks are fine. Research-lab profile expects bursts.

---

## 8. Advanced differentiation

### Unique identity angles to surface in content
- **The transformer that crosses domains** — transformers on code (tell-me-why embeddings) AND on qubits (TransformerQEC syndrome decoder).
- **Rust at the bottom, Python at the top** — compiler-grade Rust tooling + Python research code. The senior pattern.
- **Verified through fixtures** — `zuit-python-test-cases` shows correctness discipline.

### Narrative themes for the site
1. Tooling for symbolic structure (ASTs, syndrome graphs, embeddings as views of the same thing).
2. Local-first AI infrastructure.
3. Reproducibility as deliverable.

### 12-month OSS plan
- **Q1:** zuit 0.x→1.0; first three Python rules with paper-grade rationale; submit to `awesome-static-analysis`.
- **Q2:** tell-me-why benchmark suite vs. cursor / continue / claude-projects at fixed memory.
- **Q3:** TransformerQEC reproduction on public datasets; release weights + training script.
- **Q4:** Synthesis post — "Three projects, one thesis" — formalize parsers-to-qubits.

### Writing pipeline (order)
1. "Why your static analyzer should emit SARIF — and what most authors get wrong about it" (zuit, immediate authority).
2. "Local-first RAG over code: the embedding choice matters more than the LLM" (tell-me-why, viral potential).
3. "Transformers as quantum decoders: a Stim + Lightning walkthrough" (TransformerQEC, citation potential).
4. "Five quality dimensions: a taxonomy for code-health analyzers" (zuit RFC, foundational).
5. "Qubit calibration as an orchestration problem" (content-first; no repo required).

### Demos / talks
- FOSDEM dev-tools room — zuit SARIF + dimensions (20 min).
- PyData / SciPy — TransformerQEC walkthrough (30 min).
- APS March Meeting / Q2B — transformer decoders poster.
- Single 8-min recorded demo: tell-me-why → zuit → TransformerQEC, end-to-end across three pillars.

### Defensible niche
"Independent operator at the ML × quantum × code-intelligence intersection, with shipped Rust + Python + TypeScript tooling." Narrow enough that the search returns ~zero competitors; broad enough for 5+ years of compounding content.

Cross-link tactics:
- Every post references the other pillars.
- Maintain `awesome-transformer-qec` curated reading list.
- One slow-growth community on your own site, not Discord.

---

## 9. Implementation plan (this session)

### Files to create

| Path | Owner | Purpose |
|---|---|---|
| `README.md` (root) | implementation subagent | Profile README following §4 |
| `AGENTS.md` (root) | implementation subagent | Entry point for AI agents working on this repo — short, links to `.agent/` |
| `.agent/profile-system.md` | implementation subagent | Full operating manual — restates positioning, voice, rules. The "no badges, no emoji" laws live here. |
| `.agent/repo-conventions.md` | implementation subagent | README skeleton + naming + commit hygiene + release strategy for ALL the user's repos. |
| `.agent/writing-strategy.md` | implementation subagent | Content topics, post pipeline, voice, citation policy. |
| `.agent/visual-system.md` | implementation subagent | Design tokens, typography, color, spacing for future site work. |
| `docs/superpowers/specs/2026-05-17-github-profile-design.md` | this doc | Approved design spec (this file). |

### Out of scope this session
- Next.js site scaffold.
- Touching the existing Jekyll files (`index.html`, `404.html`, `images/`, `2018/`, `about/`, `tag/`, `styleguide/`, `js/`).
- `zolanREADME.md` — leave it; it's already renamed and harmless.
- Editing any project repo's own README (zuit, tell-me-why, etc.).

### Out of scope this session but listed for next session
- Scaffold Next.js + Tailwind + MDX site under a sibling directory or `/site` subfolder.
- Build OG image generator with `@vercel/og`.
- Migrate or remove Jekyll content from this repo.
- Update GitHub repo descriptions via `gh repo edit`.
- Add `CITATION.cff` to TransformerQEC.

### Implementation subagent brief
- **Model:** Sonnet (general-purpose). Reason: needs taste, density, voice consistency across four `.agent/` files + AGENTS.md + README. Haiku would generate generic copy.
- **Input:** this spec doc, full text.
- **Output:** the seven files in the table above.
- **Constraints (binding):**
  - Voice: calm, precise, technical. No hype. No motivational language.
  - No emoji in any file.
  - No badges in the profile README.
  - Use the locked tagline verbatim: "Parsers to qubits."
  - Use the three engineering-philosophy lines verbatim from §2.
  - Pin slate exactly as in §5.
  - All facts about projects must match this spec — no invented stars, languages, or descriptions.

### Commit plan
- One commit at the end. Message convention: `feat: add github profile readme + agents docs`.
- No Claude co-author tag.
- Push to `origin/main`.

---

## 10. Open items / future work

- **Custom domain decision** — continued use of `shubhamkaushal765.github.io`. Decide before scaffolding the Next.js site.
- **codelens-docs migration** — when codelens fully absorbs into zuit, decide whether to redirect `codelens-docs` repo to `zuit-docs` or transfer history.
- **`verbose-noodles` publish timing** — once shipped, swap into the 6th pin slot or replace `codestick`.
- **Qubit calibration repo** — open a public placeholder repo `qubit-calibration-orchestration` when there's at least one runnable script; until then, content-first only.
- **LinkedIn integration** — user could not be scraped (auth required). Manual paste needed if LinkedIn copy should be aligned with this spec.

---

## 11. Approval trace

- 2026-05-17: User selected "Independent researcher / tool builder" positioning.
- 2026-05-17: User selected "Code intelligence / static analysis" as primary spine, then asked to add quantum (superconducting/photonics) and ML/CV.
- 2026-05-17: User selected "Equal-weight spine alongside static analysis" for Q + ML scope.
- 2026-05-17: User added "qubit calibration and orchestration" and "TransformerQEC" by URL.
- 2026-05-17: User selected "Branding system + README + AGENTS.md + .agent/ docs only" scope.
- 2026-05-17: User accepted Approach A (three-pillar lab) with Approach B's "parsers to qubits" metaphor in hero.
- 2026-05-17: User approved Section 1 (positioning + stack) with tagline 1.
- 2026-05-17: User approved Section 2 (README architecture + project positioning) with: ignore ac_roster, prefer zuit over codelens, omit habit-tracker and ordersync.
- 2026-05-17: User approved Section 3 (visual + optimization + differentiation).
- 2026-05-17: User approved final design.
