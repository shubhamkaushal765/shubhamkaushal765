# Writing Strategy

This document governs all long-form technical writing published under
`shubhamkaushal765.github.io` or any successor domain. It covers narrative
themes, the post pipeline, voice rules, citation policy, demos, and the
defensible niche statement.

---

## Defensible niche

> Independent operator at the ML x quantum x code-intelligence intersection,
> with shipped Rust + Python + TypeScript tooling.

This niche is narrow enough that a search returns near-zero competitors; broad
enough for five or more years of compounding content. Every post should be
legible as evidence for this position, not a departure from it.

---

## Narrative themes

All writing gravitates toward one of three themes. A post that does not fit
one of these themes should not be published under this profile.

1. **Tooling for symbolic structure.** ASTs, syndrome graphs, and code
   embeddings are different representations of the same idea: a structured
   artifact that carries more information than its surface form. Posts in this
   theme build the conceptual framework and show how the three pillars
   (code intelligence, ML, quantum) are instances of a single problem.

2. **Local-first AI infrastructure.** Models, embeddings, and quantum
   simulators belong on the operator's machine until there is a specific,
   measurable reason to move them to the cloud. Posts in this theme document
   the engineering decisions behind `tell-me-why` and the qubit calibration
   orchestration work.

3. **Reproducibility as deliverable.** The artifact is the fixture, the seed,
   the SARIF file, the `expected.json`. Posts in this theme critique the state
   of reproducibility in ML and quantum research and show how the shipped
   projects instantiate a higher standard.

---

## Writing pipeline

Posts are published in this order. Earlier posts establish the authority
baseline; later posts build on it.

1. **"Why your static analyzer should emit SARIF: what most authors get
   wrong about it"** Anchored in `zuit`. Establishes authority in the code
   intelligence pillar immediately. Explains SARIF 2.1.0 schema, CWE/OWASP
   anchoring, and common implementation mistakes. Target: OSS maintainers and
   security tooling authors.

2. **"Local-first RAG over code: the embedding choice matters more than the
   LLM"** Anchored in `tell-me-why`. Documents the benchmark methodology
   and results comparing embedding models at fixed memory budget. High viral
   potential in the ML infrastructure community.

3. **"Transformers as quantum decoders: a Stim + Lightning walkthrough"**
   Anchored in `TransformerQEC`. Walks through the syndrome graph encoding,
   the transformer architecture, and the training setup. Citation potential
   from the QEC research community.

4. **"Five quality dimensions: a taxonomy for code-health analyzers"**
   Anchored in `zuit`'s dimension model. Foundational RFC-style post. Intended
   as a reference that other posts link back to.

5. **"Qubit calibration as an orchestration problem"** Content-first post;
   no public repo required at time of writing. Frames calibration scheduling
   (RB / T1 / T2 / single-qubit gate tomography) as a resource-allocation and
   dependency-ordering problem. Demonstrates depth in the quantum pillar beyond
   TransformerQEC.

---

## Voice rules

### What the writing sounds like

Short paragraphs. Declarative sentences. No rhetorical questions. The register
is technical documentation with authorial perspective: a well-annotated research
diary entry, not a Medium tutorial.

Paragraphs are 2-4 sentences. Section prose does not exceed 6 sentences before
a code block or a structural break. Transitions are explicit ("The second
consequence is...") rather than connective ("Now, let's look at...").

Tone: enthusiastic, knowledgeable, dependable, and human. Grounded first-person
is allowed and encouraged when it comes from shipped work ("the part I found
hardest to get right," "this is the tradeoff I kept running into"). What stays
banned is empty enthusiasm and try-hard performance.

### What to avoid

- Rhetorical questions as transitions ("But what does this mean for
  practitioners?")
- Empty first-person enthusiasm that isn't grounded in a specific shipped
  artifact or decision ("I was really excited to discover...")
- Vague forward-looking claims ("In the future, this will change everything")
- Sycophantic abstracts ("In this post, we will explore...")
- Jargon used for signaling without definition

### Code samples

Every code sample in a post must run as written. If a sample requires a
specific environment or dependency version, that version is stated explicitly
in a comment or callout block immediately before the sample. Pseudocode is
acceptable only if labeled as pseudocode.

---

## Citation policy

All claims that depend on external work must be cited. Citations appear as
footnotes with explicit URLs, not as naked hyperlinks embedded in prose.

Rules:

- Link directly to the source paper. Prefer arXiv permalink format:
  `https://arxiv.org/abs/{paper-id}` (not the PDF URL, not the HTML version).
- State the paper version (arXiv v3, ICLR 2024, etc.) in the footnote text.
- For software dependencies cited as prior art, link to the tagged release or
  commit, not to `main`.
- Do not cite blog posts as primary sources. A blog post may be cited as
  commentary on a primary source if both are cited.
- Format: `[N] Author et al. "Title." Venue Year. https://...`

---

## Demo and talk plan

### Recorded demo (single, ~8 minutes)

A single recorded end-to-end demo linking all three pillars:
`tell-me-why` querying a codebase → `zuit` emitting SARIF findings on the
same codebase → `TransformerQEC` as a worked example of the kind of
structured-artifact reasoning the profile is built around.

This demo is produced once `zuit` reaches beta and `tell-me-why` has a
stable CLI interface.

### Conference targets

- FOSDEM dev-tools room: "SARIF 2.1.0 and the missing dimension taxonomy"
  (20-minute talk, anchored in `zuit`).
- PyData or SciPy: "Transformers as quantum decoders: a reproducible
  walkthrough" (30-minute talk, anchored in `TransformerQEC`).
- APS March Meeting or Q2B: "Transformer-based decoding for surface codes"
  (poster, anchored in `TransformerQEC`).

### Cross-link discipline

Every post references at least one of the other pillars. Maintain a curated
reading list (`awesome-transformer-qec`) as a slow-growth community anchor.
Community discussion lives on the site itself, not on Discord.

### Existing long-form books

A "book" on the site is a multi-chapter series registered in the writing
section. Currently published books:

- **Bayesian optimization** (ML pillar, violet, 5 chapters). Covers Gaussian
  processes, acquisition functions (EI/PI/GP-UCB/Thompson sampling), practical
  loop concerns, ML hyperparameter tuning, and qubit gate calibration. A direct
  instantiation of the defensible niche: it cross-links the code-intelligence
  RAG/embedding pipeline (EI over embedding-model search spaces), the qubit
  calibration work (gate-pulse BO), and core ML infrastructure. Fits narrative
  theme 1 (structured artifact reasoning) and theme 2 (local-first
  infrastructure).
