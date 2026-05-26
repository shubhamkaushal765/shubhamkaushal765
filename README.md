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
```

Independent engineer working across code intelligence, machine learning, and quantum computing. I build tools I'd put my name on, and I ship them so they hold up when someone else runs them.

---

## `[ 01 ]`  Three pillars

Three pillars, one operator, one conviction holding them together: work the structure, not the surface. ASTs, syndrome graphs, embeddings. That's where the signal lives, and that's the part I like digging into.

**Code intelligence.** [`zuit`](https://github.com/shubhamkaushal765/zuit). Multi-language static analysis in Rust, fast and honest. SARIF 2.1.0 with CWE and OWASP anchors, so findings drop straight into tooling you already use. Correctness is pinned by a vulnerable-vs-safe fixture corpus, so every finding it reports is one it can back up.

**Machine learning.** [`tell-me-why`](https://github.com/shubhamkaushal765/tell-me-why). Local-first RAG over source code, built for people who care where their code ends up. Six language parsers, Ollama for inference, Chroma for the vector store, sentence-transformers for encoding. Nothing leaves the machine.

**Quantum computing.** [`TransformerQEC`](https://github.com/shubhamkaushal765/TransformerQEC). Transformer-based decoder for surface-code QEC, and the project I'm most invested in right now. Syndrome graphs as sequences, Stim-simulated circuits, PyTorch Lightning training, a custom encoder built for the job.

---

## `[ 02 ]`  Selected work

- **[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC)**. Transformer-based decoder for surface-code QEC. Stim simulation, PyTorch Lightning training, syndrome-graph encoding. `quantum` · `ml`
- **[zuit](https://github.com/shubhamkaushal765/zuit)**. Multi-language static-analysis CLI in Rust. Structured findings across five quality dimensions. SARIF 2.1.0 + CWE/OWASP taxonomy. `rust` · `static analysis`
- **[tell-me-why](https://github.com/shubhamkaushal765/tell-me-why)**. Local-first RAG over a codebase. Multi-language. Ollama + Chroma + sentence-transformers; code and embeddings stay local. `rag` · `local-first`
- **[qosf_excercises](https://github.com/shubhamkaushal765/qosf_excercises)**. QOSF Cohort 9, Task 4: QAOA and adiabatic quantum computing. Variational ansatz, adiabatic-to-QAOA mapping. `qaoa` · `quantum`
- **[codestick](https://github.com/shubhamkaushal765/codestick)**. Programmatic stick-figure animation library for TypeScript. Angular-skeleton system, 22 poses, 10 clips, SVG export. `typescript` · `animation`

---

## `[ 03 ]`  Bridge artifacts

**`TransformerQEC`** bridges ML and Quantum, and the connection is what pulled me in. The transformer architecture that underlies code embeddings turns out to be a good structural prior for syndrome graphs: both are sparse, both have local correlations, both reward learning a low-dimensional structural representation over a surface-form one.

**`tell-me-why`** bridges Code and ML, and the design is deliberate at every step. Source code is the structured corpus; multi-language parsing is the structure-extraction step; local embedding and retrieval is the model layer. The pipeline never flattens a function into a string of tokens before embedding, because the structure is the whole point.

---

## `[ 04 ]`  Engineering philosophy

- **Structure first, syntax second.** Work on the AST, the syndrome graph, the embedding, not the surface form. It's more work up front and it pays off later.
- **Run local until proven otherwise.** Code, models, and quantum simulators belong on the operator's machine. Your data stays yours.
- **Reproducibility is the deliverable.** Fixtures, seeds, SARIF, `expected.json`. If you can't re-run it and get the same result, the job isn't done.

---

## `[ 05 ]`  Now · 2026-Q2

- Qubit calibration scheduling as an orchestration problem: RB, T1, T2, single-qubit gate tomography. Research direction; no public repo yet.
- `zuit` 0.x to 1.0: stabilize the SARIF schema, ship the first three Python rules with solid rationale, cut a crates.io release.
- `TransformerQEC` reproduction on public datasets: training weights and the full training script out for independent verification.

---

## `[ 06 ]`  Contact

- Site: [shubhamkaushal765.github.io/shubhamkaushal765](https://shubhamkaushal765.github.io/shubhamkaushal765/)
- Email: [kaushalshubham.ks@gmail.com](mailto:kaushalshubham.ks@gmail.com)
- GitHub: [@shubhamkaushal765](https://github.com/shubhamkaushal765)
- LinkedIn: [in/kaushalshubham](https://linkedin.com/in/kaushalshubham)

---

<sub>~/lab · asia/kolkata (utc+5:30) · pgp 0xDEADBEEF</sub>

<sub>reads / contributes to qBraid, openqaoa, QAOAKit, qiskit-textbook</sub>
