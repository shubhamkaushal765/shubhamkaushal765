```text
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

Independent engineer and researcher working across code intelligence, machine
learning, and quantum computing — from Rust-based static analyzers at the
bottom of the stack to transformer-based quantum error correction at the top.
The connecting thread is operating on symbolic structure: ASTs, code
embeddings, syndrome graphs. The tooling is built to respect that structure.
```

---

## What I work on

### Code intelligence

Multi-language static analysis in Rust. The work focuses on structured
findings across maintainability, security, complexity, and test-smell
dimensions, emitted as SARIF 2.1.0 with CWE and OWASP taxonomy anchors.
Correctness is verified through a fixture corpus of vulnerable + safe pairs
with `expected.json` contracts. Shipped: [zuit](https://github.com/shubhamkaushal765/zuit).

### Machine learning

Local-first RAG infrastructure over source code. Models and embeddings stay
on the operator's machine — Ollama inference, Chroma vector store,
sentence-transformers encoding, six language parsers. The earlier ML
fundamentals work (autoencoders, sentiment classification, image
classification) established the applied baseline. Shipped: [tell-me-why](https://github.com/shubhamkaushal765/tell-me-why).

### Quantum computing

Transformer-based decoding for surface-code quantum error correction. Syndrome
graphs are encoded as sequences; a custom transformer encoder learns to correct
bit-flip and phase-flip errors from Stim-simulated circuits, trained under
PyTorch Lightning. QOSF Cohort 9 work covers QAOA and adiabatic quantum
computing. Shipped: [TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC).

---

## Selected work

**[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC)** — Transformer-based decoder for surface-code QEC. Stim simulation, PyTorch Lightning training, syndrome-graph encoding. — Quantum · ML

**[zuit](https://github.com/shubhamkaushal765/zuit)** — Multi-language static-analysis CLI in Rust. Structured findings across five quality dimensions. SARIF 2.1.0 + CWE/OWASP taxonomy. — Rust · static analysis

**[tell-me-why](https://github.com/shubhamkaushal765/tell-me-why)** — Local-first RAG over your codebase. Multi-language. Ollama + Chroma + sentence-transformers — code and embeddings never leave the machine. — RAG · local-first

**[qosf_excercises](https://github.com/shubhamkaushal765/qosf_excercises)** — QOSF Cohort 9, Task 4: QAOA and adiabatic quantum computing solutions. Variational ansatz, adiabatic-to-QAOA mapping, benchmark notebooks. — QAOA · quantum

**[codestick](https://github.com/shubhamkaushal765/codestick)** — Programmatic stick-figure animation library for TypeScript. Angular-skeleton system, 22 human poses, 10 animation clips, SVG export. — TypeScript · animation

---

## Bridges

[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC) is the ML-to-Quantum bridge: it applies transformer sequence modeling — the same architecture that underlies code embeddings — to syndrome graph decoding, bringing ML methodology into quantum error correction directly.

[tell-me-why](https://github.com/shubhamkaushal765/tell-me-why) is the Code-to-ML bridge: it treats source code as a corpus, runs multi-language parsing to extract structure, and feeds that structure into a local embedding and retrieval pipeline.

---

## Engineering philosophy

- Structure first, syntax second — work on the AST, the syndrome graph, the embedding, not the surface form.
- Run local until proven otherwise — code, models, and quantum simulators belong on the operator's machine.
- Reproducibility is the deliverable — fixtures, seeds, SARIF, `expected.json` — the artifact is the contract.

---

## How I work

- Conventional Commits strict on every repo. Linear history on `main`.
- Commits are GPG-signed. No Claude co-author tags.
- Reproducibility is the deliverable: fixtures, seeds, SARIF, `expected.json`.

---

## Current focus

2026-Q2:

- Researching qubit calibration scheduling (RB / T1 / T2 / single-qubit gate tomography) as an orchestration problem. No public repo yet — this is a research direction.
- zuit 0.x to 1.0: stabilizing the SARIF schema, adding the first three Python rules with paper-grade rationale, preparing a crates.io release.
- TransformerQEC reproduction on public datasets: releasing training weights and the full training script for independent verification.

---

## Writing

Essays and technical posts are published at [shubhamkaushal765.github.io](https://shubhamkaushal765.github.io). The personal site is under active development; a custom domain and a structured writing section are forthcoming. Posts are drafted as MDX and versioned in the site build.

---

## Connect

- Site: [shubhamkaushal765.github.io](https://shubhamkaushal765.github.io)
- Email: [kaushalshubham.ks@gmail.com](mailto:kaushalshubham.ks@gmail.com)
- GitHub: [shubhamkaushal765](https://github.com/shubhamkaushal765)
- LinkedIn: [kaushalshubham](https://linkedin.com/in/kaushalshubham)
- ORCID: _coming_

<sub>~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF</sub>

<sub>Reads / contributes to the qBraid, openqaoa, QAOAKit, and qiskit-textbook ecosystems.</sub>
