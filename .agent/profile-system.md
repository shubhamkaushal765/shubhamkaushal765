# Profile Operating Manual

This document is the authoritative reference for the GitHub profile
`shubhamkaushal765`. Every edit to `README.md` must be consistent with the
rules stated here.

---

## Identity

Shubham Kaushal is an independent engineer and researcher working across three
equal domains: code intelligence and static analysis, applied machine learning,
and quantum computing. The work is characterized by shipped tooling: a
Rust-based multi-language static analyzer (`zuit`), a local-first RAG pipeline
over source code (`tell-me-why`), and a transformer-based quantum error
correction decoder (`TransformerQEC`). The archetype is research-lab
independent operator, not portfolio developer.

---

## Tagline

> Parsers to qubits.

This is the locked tagline. It appears verbatim in the `README.md` hero block.
Do not paraphrase it. Do not change the punctuation. Do not expand it inline.
The subtitle "Code intelligence, ML, and quantum error correction" is a
subtitle only, not part of the tagline itself.

---

## Engineering philosophy

These three lines appear verbatim in `README.md` and on the site About page.
Do not reword them under any circumstances.

- **Structure first, syntax second.** Work on the AST, the syndrome graph, the embedding, not the surface form. It's more work up front and it pays off later.
- **Run local until proven otherwise.** Code, models, and quantum simulators belong on the operator's machine. Your data stays yours.
- **Reproducibility is the deliverable.** Fixtures, seeds, SARIF, `expected.json`. If you can't re-run it and get the same result, the job isn't done.

---

## Three pillars and bridge artifacts

### Code intelligence

Primary artifact: `zuit`. Multi-language static-analysis CLI in Rust.
Emits SARIF 2.1.0 with CWE and OWASP anchors.
Correctness verified by `zuit-python-test-cases` fixture corpus.

### Machine learning

Primary artifact: `tell-me-why`. Local-first RAG over source code.
Multi-language parsing + Ollama inference + Chroma + sentence-transformers.
All computation stays on the operator's machine.

### Quantum computing

Primary artifact: `TransformerQEC`. Transformer-based decoder for surface-code QEC.
Syndrome graph encoding, Stim simulation, PyTorch Lightning training.

### Bridge artifacts

- `TransformerQEC` bridges ML to Quantum. Transformer sequence modeling applied to syndrome graph decoding.
- `tell-me-why` bridges Code to ML. Source code treated as a structured corpus for embedding and retrieval.

---

## Pin slate

The GitHub profile shows 5 pinned repositories. The 6th slot is intentionally
empty as a discipline signal. It will not be filled until `verbose-noodles`
or another artifact ships with at least 30 meaningful commits, a real README,
and real CI.

| Slot | Repository | Rationale |
|------|------------|-----------|
| 1 | TransformerQEC | Quantum × ML flagship; bridge artifact; citation surface |
| 2 | zuit | Code intelligence flagship; public Rust; most polished README |
| 3 | tell-me-why | Code × ML bridge; local-first AI infrastructure |
| 4 | qosf_excercises | Quantum credential (QOSF Cohort 9); peer-reviewed cohort |
| 5 | codestick | Breadth proof; published TypeScript library; shows full-stack range |
| 6 | *(empty)* | Intentionally empty. Discipline signal; not a gap to fill reflexively |

To change the pin slate, follow the procedure in `AGENTS.md` § Adding a new repo.

---

## Hard rules

These are absolute constraints. Any output that violates them is incorrect.

- No emoji anywhere in any file in this repository.
- No badges in `README.md`. No shields.io, no GitHub stats widgets, no streak cards, no top-langs cards, no wakatime badges, no trophies, no profile-views counters, no skill-icons rows.
- No GitHub stats widgets of any kind. Banned list: `github-readme-stats`, `streak-stats`, `top-langs`, `wakatime`, `metrics`, ASCII contribution charts, trophy badges, profile-views counters.
- No HTML in `README.md` except `<sub>` tags. Two `<sub>` blocks are permitted: the footer signature (per `.agent/visual-system.md` § Hero diagram) and the forks footnote, in that order at the bottom of the file.
- No section headers deeper than H3 in `README.md`.
- No tables-of-contents in `README.md`.
- No invented facts: no fake star counts, no invented release dates, no fabricated metrics, no projects not listed in the approved spec.
- Genuine first-person enthusiasm is encouraged when it is grounded in shipped work ("the project I'm most invested in right now," "the part I like digging into"). What stays banned is empty hype and try-hard performance: no "passionate developer," no "always learning," no "I'll talk your ear off," no "genuinely thrilling."
- No marketing-grade hype words: no "bleeding edge," no "cutting-edge," no "revolutionary," no "world-class," no "boasts."
- No em dashes (U+2014) in prose anywhere in the repository. Use a period, comma, colon, parentheses, or a restructured sentence instead. This does not apply to math or technical Unicode (minus sign, en dash, arrows) or to anything inside code.
- No AI-tell phrasing: no "delve," "tapestry," "in the realm of," "it's worth noting," "navigating the landscape," or forced "not only X but also Y" constructions.
- No co-author tags on commits. No `Co-Authored-By: Claude` lines.

---

## Voice rules

Tone: enthusiastic, knowledgeable, dependable, and human. First person is
allowed and encouraged ("I build...", "the part I like digging into"). The
register is a working engineer talking about real, shipped work: warm and
genuinely interested, but grounded, never hype and never performative.

What to write: confident, concrete statements about what things are and what
they do, with room for the author's perspective on why a problem is worth the
effort. Lead with the shipped artifact; let the enthusiasm follow from it.

What to avoid: empty hype, try-hard lines ("I'll talk your ear off,"
"genuinely thrilling"), AI-tell phrasing (see Hard rules), vague capability
claims, and jargon used for signaling rather than precision. Never use the em
dash character (U+2014) in prose.

Sentences should be short enough to parse on first read. Paragraphs in the
profile README run 2-3 sentences; subsection prose stays under 4 sentences.
The current `README.md` is the canonical exemplar of this voice. Match it.

---

## Personality motifs

Five recurring elements give the README and site a coherent visual flavor without violating the hard rules. These are binding; do not remove them, do not replace them with decoration.

### Hero codefence with ASCII pillar diagram

Shared between README and site Home/About. Canonical form (60 chars wide):

`+----------------------------------------------------------+`
`|  shubham kaushal // shubhamkaushal765                    |`
`|                                                          |`
`|  parsers -> qubits.                                      |`
`|                                                          |`
`|     code intelligence ---bridge--- machine learning      |`
`|              \                          /                |`
`|               \                        /                 |`
`|                +------ bridge ------> quantum computing  |`
`|                                                          |`
`|  rust at the bottom. python at the top.                  |`
`+----------------------------------------------------------+`

ASCII only. Lowercase throughout. No Unicode arrows.

### Section headers

README: `---` horizontal rule above each H2. Site: 1px top-rule + small-caps Inter Display H2 via the `<SectionRule>` component. No numbered headers.

### Numbered footnote citations

Used on `/about`, `/now`, and all essays. Format: `[N] Author et al. "Title." Venue Year. URL`. Inline reference: `Transformer-QEC [1]` linking to `#fn-1`.

### Pillar dimension family

The visual system carries one *primary accent* and a *pillar dimension family* of three hues (one per research pillar). The primary accent governs all non-pillar UI; the pillar hues are used only on pillar-coded elements.

Primary accent (sky, doubles as the code-intelligence pillar hue):

- `#7dd3fc` (dark) / `#0284c7` (light)
- Used for inline `<code>` foreground, link underline (50% opacity at rest), focus rings, the top-of-page hairline, footnote markers, status-dot pip, and the one-time fade-in animation on the hero tagline.

Pillar dimension family (sub-palette of the 10% accent layer, codelens precedent):

| Pillar            | Dark      | Light     | Tailwind anchor             |
|-------------------|-----------|-----------|-----------------------------|
| Code intelligence | `#7dd3fc` | `#0284c7` | sky (aliased to primary)    |
| Machine learning  | `#c4b5fd` | `#7c3aed` | violet                      |
| Quantum computing | `#6ee7b7` | `#047857` | emerald                     |

Pillar hues are used ONLY on pillar-coded elements:

- The three pillar `<h3>`s on `/about` and Home § What I work on (`01 / 02 / 03` number prefix per pillar).
- The four topic cards on Home (per-card `data-pillar` attribute drives the bracket number, table key column, chip foreground, 3px inset left stripe, and SVG accent edge).
- The hero tagline split: `parsers` (sky) + `->` (muted) + `qubits.` (emerald). Text content stays verbatim per § Tagline.

The pillar family is NOT used for general links, body prose, inline `code`, or any element without semantic pillar meaning. Decorative pillar coloring is forbidden.

Adding a new hue (e.g., a fourth pillar) requires updating this section, the `--color-pillar-*` token table in `.agent/visual-system.md`, and the WCAG verifier `site/scripts/verify-contrast.mjs`.

### Footer signature

Monospace line at the bottom of every site page and the README:

`~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF`

PGP fingerprint is a placeholder until a real key is generated. Location and timezone are real.

---

## Audience perception matrix

| Audience | Desired action |
|----------|----------------|
| OSS maintainer | Stars zuit; opens an issue or sends a PR |
| Quantum / ML researcher | Opens TransformerQEC; possibly cites the implementation |
| Recruiter (staff IC search) | Sends outbound message |
| Founder / VC | Reaches out about tell-me-why or codelens commercial story |
| Hiring manager (skeptical) | Reads to the end without dropping off |

The README is optimized for the researcher and the skeptical hiring manager.
Density and precision serve both; hype and badges serve neither.
