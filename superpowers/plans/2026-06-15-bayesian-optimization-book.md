# Plan: Bayesian Optimization Book

**Date:** 2026-06-15
**Book slug:** `bayesian-optimization`
**Pillar:** `ml` (machine learning, violet -- `--color-pillar-ml`)
**Sidebar bookLabel:** `"Bayesian opt"`
**bookHref / basePath:** `"/writing/bayesian-optimization/"`

---

## 1. Files to create / modify

### Create (new files)

- [ ] `site/app/writing/bayesian-optimization/chapters.ts`
- [ ] `site/app/writing/bayesian-optimization/page.tsx`
- [ ] `site/app/writing/bayesian-optimization/[slug]/page.tsx`
- [ ] `site/content/bayesian-optimization/ch01-why-bayesian-optimization.mdx`
- [ ] `site/content/bayesian-optimization/ch02-gaussian-processes.mdx`
- [ ] `site/content/bayesian-optimization/ch03-acquisition-functions.mdx`
- [ ] `site/content/bayesian-optimization/ch04-the-loop-in-practice.mdx`
- [ ] `site/content/bayesian-optimization/ch05-bo-in-the-wild.mdx`

### Modify (existing files)

- [ ] `site/app/writing/page.tsx` -- add import and POSTS entry
- [ ] `site/styles/globals.css` -- add `main[data-pillar="ml"]` block after line 872

---

## 2. Canonical CHAPTERS data

Paste verbatim into `site/app/writing/bayesian-optimization/chapters.ts`.

```ts
export type Chapter = {
  number: string;
  slug: string;
  title: string;
  summary: string;
  reading: string;
};

export const CHAPTERS: Chapter[] = [
  {
    number: '01',
    slug: 'why-bayesian-optimization',
    title: 'Why Bayesian optimization? Sample efficiency, not scale.',
    summary:
      'Training a neural network, running a lab assay, and calibrating a qubit share one property: each evaluation is expensive and you cannot afford many. Bayesian optimization formalizes the surrogate-plus-acquisition loop that gets the most information per query.',
    reading: '9 min',
  },
  {
    number: '02',
    slug: 'gaussian-processes',
    title: 'Gaussian processes: a surrogate that quantifies its own doubt.',
    summary:
      'A GP places a prior over functions and updates it with observations to produce a posterior mean and variance at every untried point. The kernel encodes prior beliefs about smoothness; the marginal likelihood tunes it automatically.',
    reading: '11 min',
  },
  {
    number: '03',
    slug: 'acquisition-functions',
    title: 'Acquisition functions: turning uncertainty into the next query.',
    summary:
      'Expected improvement, probability of improvement, GP-UCB, and Thompson sampling each define a different policy for trading off exploration against exploitation. Optimizing the acquisition is cheap relative to the black-box objective.',
    reading: '10 min',
  },
  {
    number: '04',
    slug: 'the-loop-in-practice',
    title: 'The loop in practice: priors, noise, and where it breaks.',
    summary:
      'Kernel and length-scale priors matter more than most tutorials admit. Noisy observations, input warping, high-dimensional search spaces, and batch parallelism each require specific design choices that the basic loop glosses over.',
    reading: '12 min',
  },
  {
    number: '05',
    slug: 'bo-in-the-wild',
    title: 'Bayesian optimization in the wild: hyperparameters and qubit calibration.',
    summary:
      'Two worked domains: tuning ML embedding models (the RAG pipeline from the code-intelligence pillar) and qubit gate calibration (RB, T1, T2, gate tomography) framed as sequential black-box optimization. Reproducibility via seeds and fixtures.',
    reading: '13 min',
  },
];
```

---

## 3. Per-chapter content outlines

### Chapter 01 -- `why-bayesian-optimization`

**File:** `site/content/bayesian-optimization/ch01-why-bayesian-optimization.mdx`

**Meta export:**
```ts
export const meta = {
  number: '01',
  slug: 'why-bayesian-optimization',
  title: 'Why Bayesian optimization? Sample efficiency, not scale.',
  summary:
    'Training a neural network, running a lab assay, and calibrating a qubit share one property: each evaluation is expensive and you cannot afford many. Bayesian optimization formalizes the surrogate-plus-acquisition loop that gets the most information per query.',
  reading: '9 min',
};
```

**h1:** `# Why Bayesian optimization? Sample efficiency, not scale.`

**chapter-lede:** One paragraph establishing the shared structure of expensive black-box objectives across ML training, wet-lab assays, and qubit calibration. No rhetorical questions. Declarative tone.

**Sections and key claims:**

`## The expensive-evaluation regime`
- Define "expensive": each evaluation takes seconds to hours and cannot be parallelized cheaply.
- Canonical examples: hyperparameter search for a training run (GPU-hours per trial), drug screening (days per assay), qubit gate calibration (minutes of device time per parameter setting).
- Grid search wastes budget evaluating uninformative corners. Random search is better but still ignores what it has already learned.

`## The surrogate-plus-acquisition loop`
- Four steps: fit a surrogate model to existing observations, use an acquisition function to pick the next point, evaluate the black box, add the observation, repeat.
- The surrogate is cheap to evaluate; the black box is not. All the cleverness goes into the surrogate.
- Cite Mockus 1975/1978 as the origin [fn-1]. Cite Jones et al. 1998 (EGO) as the canonical engineering formulation [fn-2]. Cite Frazier 2018 tutorial for the modern pedagogical treatment [fn-3].

`## Why not gradient-based optimization?`
- The black box is typically not differentiable. Even when it is, the gradient computation costs another evaluation.
- Short prose paragraph (2-3 sentences), no subheadings inside this section.

**Figure (one required):**

`bo-ch01-loop`: A horizontal cycle diagram showing four labeled nodes: "Surrogate (GP)" -> "Acquisition function" -> "Black-box evaluation" -> "New observation" -> back to "Surrogate (GP)". Nodes as rounded rectangles; arrows as stroked lines with arrowheads. The "Surrogate (GP)" node uses `fill="var(--pillar-color, currentColor)"` with `fillOpacity="0.15"` and an accented border. Use `stroke="var(--pillar-color, currentColor)"` for the arrows. viewBox 820x200. Unique ids: `bo-ch01-loop`, `bo-ch01-loop-title`, `bo-ch01-loop-desc`, marker id `bo-ch01-arrow`.

**Figcaption:** Explain that the outer loop is cheap except for the single black-box call per iteration. The surrogate enables the acquisition to be optimized by gradient descent or grid search over a cheap proxy.

**No table in this chapter.**

**Notes / Citations:**

```
[1] Mockus, J. "On Bayesian Methods for Seeking the Extremum." Optimization Techniques, Springer 1975. Reprinted with extensions in "Bayesian Approach to Global Optimization," Kluwer 1989.
[2] Jones, D. R., Schonlau, M., and Welch, W. J. "Efficient Global Optimization of Expensive Black-Box Functions." Journal of Global Optimization 13(4), 1998. https://link.springer.com/article/10.1023/A:1008306431147
[3] Frazier, P. I. "A Tutorial on Bayesian Optimization." arXiv 2018. https://arxiv.org/abs/1807.02811
```

---

### Chapter 02 -- `gaussian-processes`

**File:** `site/content/bayesian-optimization/ch02-gaussian-processes.mdx`

**Meta export:**
```ts
export const meta = {
  number: '02',
  slug: 'gaussian-processes',
  title: 'Gaussian processes: a surrogate that quantifies its own doubt.',
  summary:
    'A GP places a prior over functions and updates it with observations to produce a posterior mean and variance at every untried point. The kernel encodes prior beliefs about smoothness; the marginal likelihood tunes it automatically.',
  reading: '11 min',
};
```

**h1:** `# Gaussian processes: a surrogate that quantifies its own doubt.`

**chapter-lede:** The key property of a GP surrogate is that it returns not just a predicted value but a confidence interval at every untried input. That uncertainty is what feeds the acquisition function. Without it, you have a point estimate and no principled way to trade off exploration and exploitation.

**Sections and key claims:**

`## What a GP is`
- A GP is a probability distribution over functions. Any finite collection of function values follows a joint Gaussian.
- Prior mean function (often zero) and kernel (covariance function) fully specify the GP prior.
- Cite Rasmussen and Williams 2006 (GPML textbook) [fn-1]. This is the primary reference for the whole chapter.

`## Kernels: encoding prior beliefs about smoothness`
- RBF (squared exponential): infinitely differentiable functions. Good default for smooth objectives.
- Matern 5/2: once differentiable. Preferred in practice for objectives with less regularity (BO community consensus; cite Snoek et al. 2012 [fn-2] which uses Matern 5/2 by default).
- Brief table comparing kernel properties.

`## The posterior: mean and variance`
- After observing data, posterior mean and variance have closed-form expressions (standard GP conditioning equations). Write them in a code block formatted as pseudocode -- labeled as pseudocode.
- Posterior variance collapses to zero at observed points. Posterior variance is large in unvisited regions.
- No new citation needed here; this follows directly from [fn-1].

`## Marginal likelihood and hyperparameter tuning`
- The log marginal likelihood can be maximized with respect to kernel hyperparameters (length scale, signal variance, noise variance). This is Type-II maximum likelihood / empirical Bayes.
- Mention that this can overfit with few observations, and that placing priors over hyperparameters (full Bayes with MCMC or HMC) is more principled. Cite Snoek et al. 2012 for practical hyperparameter marginalization [fn-2].

**Figure (one required):**

`bo-ch02-posterior`: A 2D plot (function of one input x) showing: a shaded band (posterior variance, using `fill="var(--pillar-color, currentColor)"` with `fillOpacity="0.15"`), a posterior mean line (stroked in `var(--pillar-color, currentColor)` at strokeWidth 2), three observed data points as filled circles, and the prior mean as a dashed horizontal line. The x-axis spans 0 to 10, the y-axis is unlabeled. The variance band is wide between observed points and narrows near them. SVG viewBox 820x260. Unique ids: `bo-ch02-posterior`, `bo-ch02-post-title`, `bo-ch02-post-desc`. Axis lines stroked at strokeWidth 1.5. Observed points at (1.5, 0.8), (4.0, -0.3), (7.5, 1.1) approximately. The band can be approximated with a `<path d="M... Z">` polygon connecting upper and lower envelope curves.

**Figcaption:** Posterior mean and two-sigma band after three observations. Uncertainty is small near the data and large in the gaps. The acquisition function reads from this picture to decide where to evaluate next.

**Table:**

```
| Kernel     | Differentiability   | Typical use case             |
|------------|---------------------|------------------------------|
| RBF        | Infinitely smooth   | Very smooth latent functions |
| Matern 5/2 | Twice differentiable | Standard BO default          |
| Matern 3/2 | Once differentiable | Rougher objectives           |
| Linear     | n/a (degenerate)    | Monotone trend component     |
```

Use `<table className="encoding-table">` with `<thead>` / `<tbody>`.

**Notes / Citations:**

```
[1] Rasmussen, C. E. and Williams, C. K. I. "Gaussian Processes for Machine Learning." MIT Press 2006. https://gaussianprocess.org/gpml/
[2] Snoek, J., Larochelle, H., and Adams, R. P. "Practical Bayesian Optimization of Machine Learning Algorithms." NeurIPS 2012. https://arxiv.org/abs/1206.2944
```

---

### Chapter 03 -- `acquisition-functions`

**File:** `site/content/bayesian-optimization/ch03-acquisition-functions.mdx`

**Meta export:**
```ts
export const meta = {
  number: '03',
  slug: 'acquisition-functions',
  title: 'Acquisition functions: turning uncertainty into the next query.',
  summary:
    'Expected improvement, probability of improvement, GP-UCB, and Thompson sampling each define a different policy for trading off exploration against exploitation. Optimizing the acquisition is cheap relative to the black-box objective.',
  reading: '10 min',
};
```

**h1:** `# Acquisition functions: turning uncertainty into the next query.`

**chapter-lede:** The acquisition function is the decision rule. It takes the GP posterior at every candidate point and outputs a scalar score. The next query goes to the candidate with the highest score. The entire explore-exploit balance is encoded in which acquisition function you choose and how you parameterize it.

**Sections and key claims:**

`## Probability of improvement (PI)`
- Probability that the next query improves over the current best.
- Simple to compute from the GP posterior CDF. Tends to exploit heavily near the current best.
- Cite Kushner 1964 (the original PI paper); note it predates Mockus. Source: Kushner, H. J. "A New Method of Locating the Maximum Point of an Arbitrary Multipeak Curve in the Presence of Noise." Journal of Fluids Engineering, ASME, 1964. No reliable arXiv link. Cite as a historical reference without a URL.

`## Expected improvement (EI)`
- Expected amount by which the next query exceeds the current best.
- Has a closed-form expression under a GP posterior. The most widely used acquisition in practice.
- Cite Jones et al. 1998 [fn-1] as the EGO paper that popularized EI.

`## GP-UCB`
- Upper confidence bound: mean plus beta times standard deviation. The beta parameter controls the explore-exploit trade-off.
- Theoretically motivated: Srinivas et al. 2010 show GP-UCB achieves sublinear cumulative regret under mild assumptions [fn-2].
- Cite Srinivas et al. 2010. https://arxiv.org/abs/0912.3995

`## Thompson sampling`
- Sample a function from the GP posterior; evaluate the black box at the argmax of that sample.
- Simple to implement; naturally parallelizes to batches (sample k functions, evaluate their respective argmaxes in parallel).

`## Inner optimization of the acquisition`
- The acquisition function itself must be maximized over the input space. This is cheap (the GP is fast to query) but can be non-convex.
- Multi-start gradient ascent or quasi-random restarts (Sobol sequences) are standard. Mention BoTorch as a practical framework [fn-3].

**Figure (one required):**

`bo-ch03-ei`: A 2D plot showing, on the same x-axis as Chapter 02's posterior: (top sub-plot, taller) the GP posterior mean plus variance band, with an observed best y* marked as a horizontal dashed line; (bottom sub-plot, shorter) the EI acquisition curve, peaking in a region to the right of the observed best where variance is high. Use a `<g>` for each sub-plot. Accent the EI peak with `fill="var(--pillar-color, currentColor)"` circle. viewBox 820x340. Unique ids: `bo-ch03-ei`, `bo-ch03-ei-title`, `bo-ch03-ei-desc`, `bo-ch03-arrow`. Division line between sub-plots at y=220 approximately.

**Figcaption:** EI peaks where the GP is both uncertain and has a reasonable chance of exceeding the current best y*. A region with high variance but low mean contributes less than a region with moderate variance and a mean near y*.

**Table comparing acquisition functions:**

```
| Acquisition | Explore-exploit balance     | Parallelizable | Regret bound |
|-------------|----------------------------|----------------|--------------|
| PI          | Exploitative               | No (standard)  | No           |
| EI          | Balanced (default choice)  | No (standard)  | No           |
| GP-UCB      | Tunable via beta           | No (standard)  | Yes          |
| Thompson    | Balanced, stochastic       | Yes (natural)  | Yes          |
```

Use `<table className="encoding-table">`.

**Notes / Citations:**

```
[1] Jones, D. R., Schonlau, M., and Welch, W. J. "Efficient Global Optimization of Expensive Black-Box Functions." Journal of Global Optimization 13(4), 1998. https://link.springer.com/article/10.1023/A:1008306431147
[2] Srinivas, N., Krause, A., Kakade, S. M., and Seeger, M. "Gaussian Process Optimization in the Bandit Setting: No Regret and Experimental Design." ICML 2010. https://arxiv.org/abs/0912.3995
[3] Balandat, M., Karrer, B., Jiang, D. R., Daulton, S., Letham, B., Wilson, A. G., and Bakshy, E. "BoTorch: A Framework for Efficient Monte-Carlo Bayesian Optimization." NeurIPS 2020. https://arxiv.org/abs/1910.06403
```

---

### Chapter 04 -- `the-loop-in-practice`

**File:** `site/content/bayesian-optimization/ch04-the-loop-in-practice.mdx`

**Meta export:**
```ts
export const meta = {
  number: '04',
  slug: 'the-loop-in-practice',
  title: 'The loop in practice: priors, noise, and where it breaks.',
  summary:
    'Kernel and length-scale priors matter more than most tutorials admit. Noisy observations, input warping, high-dimensional search spaces, and batch parallelism each require specific design choices that the basic loop glosses over.',
  reading: '12 min',
};
```

**h1:** `# The loop in practice: priors, noise, and where it breaks.`

**chapter-lede:** The derivation in Chapter 02 assumes noiseless observations and a well-specified kernel. Real problems have heteroskedastic noise, poorly-chosen length scales, discrete and conditional search spaces, and evaluation budgets that demand batch parallelism. Each of these issues has a known fix and a known failure mode.

**Sections and key claims:**

`## Kernel and length-scale priors`
- With few observations (fewer than 20), maximum likelihood hyperparameter estimation overfits. The lengthscale collapses to zero (memorizes the data) or explodes to infinity (prior mean everywhere).
- Log-normal priors on length scale and signal variance stabilize the fit. Snoek et al. 2012 [fn-1] integrate over hyperparameters with slice sampling.
- Short practical note: set a prior that encodes "the function varies meaningfully over the scale of the search space."

`## Noisy observations`
- Add a noise term to the kernel diagonal. This is a standard Gaussian likelihood assumption.
- Distinguish: observation noise (IID, Gaussian, tunable) versus model misspecification (non-Gaussian noise, heteroskedasticity). Cite Snoek et al. 2012 [fn-1].
- Heteroskedastic noise requires more expressive models. Mention but do not develop.

`## High-dimensional search spaces`
- GP scaling is cubic in the number of observations; this is manageable. The real problem is that the acquisition function becomes hard to optimize in high dimensions.
- Additive models (assume the objective decomposes additively across input groups) and random embeddings (REMBO) are two approaches.
- Cite Shahriari et al. 2016 review [fn-2] for an overview of high-dimensional BO variants. https://ieeexplore.ieee.org/document/7352306

`## Batch and parallel BO`
- Evaluate k points in parallel. Standard EI is for a single next point. Batch EI (qEI) is defined but expensive to compute exactly.
- Thompson sampling's natural parallelism (k samples, k argmaxes) is one practical batch strategy.
- Monte Carlo acquisition functions in BoTorch make qEI and qUCB tractable [fn-3].
- Cite Balandat et al. 2020 [fn-3].

`## Where BO breaks`
- Cold start: the GP posterior is wide everywhere; the first few evaluations are effectively random.
- Objective is not smooth: the Matern kernel helps, but BO still assumes some structure. Discontinuous objectives require alternative models.
- Budget is large: BO overhead (GP fitting) grows; switch to cheaper surrogates.

**Figure (one required):**

`bo-ch04-length-scale`: A 2D diagnostic comparison. Two side-by-side plots sharing the same y range, each showing 5 observed points and a GP fit. Left panel: "Length scale too short" -- the posterior wiggles wildly between observations; variance collapses everywhere except at exact data points. Right panel: "Length scale too long" -- the posterior is nearly flat everywhere (prior mean dominates). A small descriptive label "overfits" under the left panel and "underfits" under the right panel. Use simple polygon paths for the variance bands. Accent the posterior mean in `var(--pillar-color, currentColor)`. viewBox 820x280. Unique ids: `bo-ch04-length-scale`, `bo-ch04-ls-title`, `bo-ch04-ls-desc`. Dividing line between panels at x=410.

**Figcaption:** Pathological length-scale values from maximum likelihood estimation when data are scarce. A log-normal prior on the length scale keeps the fit in the plausible middle.

**Table:**

```
| Problem              | Symptom                         | Fix                              |
|----------------------|---------------------------------|----------------------------------|
| Short length scale   | GP interpolates, no exploration  | Log-normal prior on length scale |
| Long length scale    | Posterior near prior mean       | Increase initial random samples  |
| High noise variance  | Wide posterior everywhere       | Noise prior; more observations   |
| High dimensionality  | Acquisition hard to optimize    | Additive GP or random embedding  |
| Large batch required | qEI expensive                   | Thompson sampling for batch      |
```

Use `<table className="encoding-table">`.

**Notes / Citations:**

```
[1] Snoek, J., Larochelle, H., and Adams, R. P. "Practical Bayesian Optimization of Machine Learning Algorithms." NeurIPS 2012. https://arxiv.org/abs/1206.2944
[2] Shahriari, B., Swersky, K., Wang, Z., Adams, R. P., and de Freitas, N. "Taking the Human Out of the Loop: A Review of Bayesian Optimization." Proceedings of the IEEE 104(1), 2016. https://ieeexplore.ieee.org/document/7352306
[3] Balandat, M., Karrer, B., Jiang, D. R., Daulton, S., Letham, B., Wilson, A. G., and Bakshy, E. "BoTorch: A Framework for Efficient Monte-Carlo Bayesian Optimization." NeurIPS 2020. https://arxiv.org/abs/1910.06403
```

---

### Chapter 05 -- `bo-in-the-wild`

**File:** `site/content/bayesian-optimization/ch05-bo-in-the-wild.mdx`

**Meta export:**
```ts
export const meta = {
  number: '05',
  slug: 'bo-in-the-wild',
  title: 'Bayesian optimization in the wild: hyperparameters and qubit calibration.',
  summary:
    'Two worked domains: tuning ML embedding models (the RAG pipeline from the code-intelligence pillar) and qubit gate calibration (RB, T1, T2, gate tomography) framed as sequential black-box optimization. Reproducibility via seeds and fixtures.',
  reading: '13 min',
};
```

**h1:** `# Bayesian optimization in the wild: hyperparameters and qubit calibration.`

**chapter-lede:** Two domains, one algorithm. Hyperparameter tuning of an embedding model and single-qubit gate calibration both present as expensive black-box optimization with a small evaluation budget. The structure is identical; only the lab bench changes. This chapter also closes the cross-pillar loop: the embedding model is the one powering the code-intelligence RAG pipeline from the code-intelligence book; the qubit calibration work connects to the "Qubit calibration as an orchestration problem" post in the queue.

**Sections and key claims:**

`## Domain 1: tuning ML embedding models`
- Framing: the code-intelligence book's Chapter 05 ("Symbolic and neural: hybrid code intelligence") lands on a retrieval pipeline that uses an embedding model. The choice of embedding model, chunk size, and retrieval top-k are hyperparameters. Evaluating each configuration requires running the full retrieval benchmark.
- BO loop: 5 initial random configurations, then EI with a Matern 5/2 GP. The objective is recall@10 on a fixed held-out query set.
- Practical note: seed the GP's random restarts for acquisition optimization. Store each trial's configuration and result in a JSON fixture. This is the reproducibility-as-deliverable principle from the writing strategy.
- Cite Snoek et al. 2012 [fn-1] as the foundational reference for this use case. Cite Balandat et al. 2020 [fn-2] for the BoTorch implementation.

`## Domain 2: qubit gate calibration as BO`
- Single-qubit gate calibration requires sweeping parameters (drive amplitude, duration, frequency) to maximize gate fidelity, minimize T1 and T2 decay, and pass randomized benchmarking (RB) tests. Each RB circuit takes minutes of QPU time.
- The calibration workflow is a sequential black-box problem: one set of parameters, one fidelity estimate, expensive evaluation.
- This cross-links to the planned "Qubit calibration as an orchestration problem" post, which frames the same workflow as resource allocation and dependency ordering. The BO perspective and the orchestration perspective are complementary.
- For the BO framing, the surrogate is a GP over the drive amplitude and frequency parameter space; EI or GP-UCB is the acquisition.
- Citation note: cite Egger and Wilhelm 2014 for Adaptive hybrid optimal quantum control (which uses sequential adaptive methods for calibration) [fn-3]. If the coder cannot verify the Egger and Wilhelm reference independently, use this citation with caution and confirm at: https://arxiv.org/abs/1309.0831. Do NOT substitute a fabricated citation.
- Alternative citation that is well-established: Rol et al. 2017, "Restless Tuneup of High-Fidelity Qubit Gates," Physical Review Applied 2017. ArXiv: https://arxiv.org/abs/1611.04815 -- this is a reliable paper on adaptive qubit calibration from the DiCarlo group. Use this as [fn-3] if preferred.

`## Reproducibility`
- BO runs are stochastic (random restarts for acquisition optimization, sometimes stochastic acquisition sampling). Reproducibility requires: fixed seed for GP hyperparameter initialization, fixed seed for Sobol initial design, stored fixture of all trial configurations and results.
- The expected.json pattern from the code-intelligence book applies here.

`## Connecting the pillars`
- One paragraph: the three pillars (ML, quantum, code-intelligence) share the problem structure of expensive black-box evaluation. BO is one instance of the broader theme "structured artifact that carries more information than its surface form" -- the GP posterior is the structured artifact; the raw evaluation budget is the surface form. The writing strategy's Theme 1 ("tooling for symbolic structure") applies.

**Figure (one required):**

`bo-ch05-calibration-loop`: A BO iteration diagram specific to qubit calibration. Left side: a box labeled "QPU / gate sequence" (physical device icon -- use a simple rectangle with a sine-wave line inside it to suggest a drive pulse). Arrow labeled "drive amplitude, frequency" pointing right to a box labeled "Fidelity measurement (RB)". Arrow pointing right from that to a box labeled "GP posterior update". Arrow pointing down from GP update to a box labeled "EI acquisition: next parameters". Arrow looping back left to the QPU box. Use `var(--pillar-color, currentColor)` for the loop arrows. viewBox 820x220. Unique ids: `bo-ch05-calibration-loop`, `bo-ch05-cal-title`, `bo-ch05-cal-desc`, `bo-ch05-cal-arrow`.

**Figcaption:** The qubit calibration loop as BO. The QPU is the expensive black box; drive parameters are the inputs; gate fidelity from RB is the objective. Each iteration is one full RB circuit run.

**Table (cross-domain comparison):**

```
| Property              | ML hyperparameter tuning         | Qubit gate calibration              |
|-----------------------|----------------------------------|-------------------------------------|
| Input space           | Continuous + discrete (mixed)    | Continuous (amplitude, frequency)   |
| Evaluation cost       | Minutes to hours (GPU)           | Minutes (QPU time, circuit depth)   |
| Observation noise     | Low (deterministic val loss)     | Moderate (shot noise in RB)         |
| Budget (typical)      | 50-200 trials                    | 20-100 trials per qubit             |
| Kernel choice         | Matern 5/2 (standard)            | Matern 5/2 or RBF (smooth surface)  |
| Acquisition (typical) | EI                               | GP-UCB or EI                        |
```

Use `<table className="encoding-table">`.

**Notes / Citations:**

```
[1] Snoek, J., Larochelle, H., and Adams, R. P. "Practical Bayesian Optimization of Machine Learning Algorithms." NeurIPS 2012. https://arxiv.org/abs/1206.2944
[2] Balandat, M., Karrer, B., Jiang, D. R., Daulton, S., Letham, B., Wilson, A. G., and Bakshy, E. "BoTorch: A Framework for Efficient Monte-Carlo Bayesian Optimization." NeurIPS 2020. https://arxiv.org/abs/1910.06403
[3] Rol, M. A., Battistel, F., Malinowski, F. K., Langford, N. K., Habraken, J. M., Terhal, B. M., DiCarlo, L., and Terhal, B. M. "Restless Tuneup of High-Fidelity Qubit Gates." Physical Review Applied 7(4), 2017. https://arxiv.org/abs/1611.04815
```

Note to coder: citation [3] is from the DiCarlo group (Delft) and uses a restless adaptive approach for qubit calibration -- it is not pure BO but frames single-qubit gate calibration as sequential adaptive optimization, which is the closest well-verified reference. Do not add a citation you cannot verify at the linked URL.

---

## 4. Book index intro paragraph and writing/page.tsx POSTS entry

### Book index intro paragraph

For `site/app/writing/bayesian-optimization/page.tsx`, use this intro paragraph verbatim:

```
A working notebook on Bayesian optimization: the surrogate model, the acquisition
function, and the feedback loop that makes each expensive evaluation count. The
objective could be a training run, a lab assay, or a qubit calibration sequence.
The algorithm is the same. The chapters build from the GP prior to practical
engineering concerns -- kernel priors, noisy observations, batch parallelism, and
two cross-pillar worked examples.
```

### writing/page.tsx POSTS entry

Add this entry to the `POSTS` array, immediately after the photonics entry (line ~58 in `site/app/writing/page.tsx`):

```ts
{
  title: 'Bayesian optimization',
  summary:
    'A working notebook on Bayesian optimization: surrogate models, acquisition functions, and the feedback loop that makes each expensive evaluation count. Covers GPs, EI, GP-UCB, Thompson sampling, and worked examples in ML hyperparameter tuning and qubit gate calibration.',
  pillar: 'ml',
  pillarLabel: 'machine learning',
  date: '2026-Q2',
  status: 'draft',
  href: '/writing/bayesian-optimization/',
  chapters: BAYESIAN_OPTIMIZATION_CHAPTERS.map((c) => ({
    title: c.title,
    href: `/writing/bayesian-optimization/${c.slug}/`,
  })),
},
```

Also add this import at the top of `site/app/writing/page.tsx`, alongside the existing CHAPTERS imports:

```ts
import { CHAPTERS as BAYESIAN_OPTIMIZATION_CHAPTERS } from './bayesian-optimization/chapters';
```

---

## 5. CSS snippet to add

In `site/styles/globals.css`, insert the following block immediately after line 872 (after the `main[data-pillar="code-int"]` block), before the `.book-eyebrow` rule:

```css
/* -- Machine learning / Bayesian optimization book -- */
main[data-pillar="ml"] {
  --pillar-color: var(--color-pillar-ml);
}
```

The exact insertion point in the file is:

```
/* ── Code intelligence book ── */
main[data-pillar="code-int"] {
  --pillar-color: var(--color-pillar-code);
}
                                         <-- INSERT HERE
/* -- Machine learning / Bayesian optimization book -- */
main[data-pillar="ml"] {
  --pillar-color: var(--color-pillar-ml);
}

.book-eyebrow,
```

Without this block, chapter pages for the ml pillar render with the wrong (or no) accent color.

---

## 6. Structural files: exact code

### `site/app/writing/bayesian-optimization/chapters.ts`

Copy the CHAPTERS data from Section 2 exactly. File starts with `export type Chapter = { ... }` followed by `export const CHAPTERS: Chapter[] = [ ... ]`. No other exports.

### `site/app/writing/bayesian-optimization/page.tsx`

Exact structure, following `site/app/writing/photonics/page.tsx`:

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import { CHAPTERS } from './chapters';

export const metadata: Metadata = {
  title: 'Bayesian optimization | Shubham Kaushal',
  description:
    'A working notebook on Bayesian optimization: surrogate models, acquisition functions, and the feedback loop that makes each expensive evaluation count. Covers GPs, EI, GP-UCB, Thompson sampling, and worked examples in ML hyperparameter tuning and qubit gate calibration.',
};

export default function BayesianOptimizationBookPage() {
  return (
    <main id="main" data-pillar="ml">
      <Hero variant="compact" />
      <p className="book-eyebrow">machine learning · book</p>
      <h1>Bayesian optimization</h1>
      <p>
        {/* Insert intro paragraph from Section 4 here as JSX text. */}
      </p>
      <ol className="chapter-toc">
        {CHAPTERS.map((c) => (
          <li key={c.slug} className="chapter-toc__item">
            <Link href={`/writing/bayesian-optimization/${c.slug}/`} className="chapter-toc__link">
              <span className="chapter-toc__num">{`[ ${c.number} ]`}</span>
              <span className="chapter-toc__body">
                <span className="chapter-toc__title">{c.title}</span>
                <span className="chapter-toc__summary">{c.summary}</span>
                <span className="chapter-toc__reading">{c.reading}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <FooterSignature />
    </main>
  );
}
```

### `site/app/writing/bayesian-optimization/[slug]/page.tsx`

Exact structure, following `site/app/writing/photonics/[slug]/page.tsx`. Key differences from photonics:

- `data-pillar="ml"` on `<main>`
- `bookLabel="Bayesian opt"`
- `bookHref="/writing/bayesian-optimization/"`
- `basePath="/writing/bayesian-optimization/"`
- Link in eyebrow: `<Link href="/writing/bayesian-optimization/">Bayesian optimization</Link>`
- Metadata fallback title: `'Bayesian optimization | Shubham Kaushal'`
- Chapter page title format: `` `${chapter.title} | Bayesian optimization | Shubham Kaushal` ``
- Function name: `BayesianOptimizationChapterPage`
- prev/next links use `/writing/bayesian-optimization/${slug}/`

MDX imports:

```ts
import Ch01 from '@/content/bayesian-optimization/ch01-why-bayesian-optimization.mdx';
import Ch02 from '@/content/bayesian-optimization/ch02-gaussian-processes.mdx';
import Ch03 from '@/content/bayesian-optimization/ch03-acquisition-functions.mdx';
import Ch04 from '@/content/bayesian-optimization/ch04-the-loop-in-practice.mdx';
import Ch05 from '@/content/bayesian-optimization/ch05-bo-in-the-wild.mdx';
```

COMPONENTS map:

```ts
const COMPONENTS: Record<string, ChapterComponent> = {
  'why-bayesian-optimization': Ch01 as ChapterComponent,
  'gaussian-processes': Ch02 as ChapterComponent,
  'acquisition-functions': Ch03 as ChapterComponent,
  'the-loop-in-practice': Ch04 as ChapterComponent,
  'bo-in-the-wild': Ch05 as ChapterComponent,
};
```

---

## 7. Voice and hard-rules reminder for coders

### Mandatory checks before submitting any file

1. **No emoji.** Search the file for any Unicode character outside the ASCII range in prose or JSX text. Remove all of them.
2. **No em dashes (`--` is fine; `--` in CSS is fine; the Unicode em dash character U+2014 is banned).** Search for `—` or the literal character. Use a comma, period, or " -- " (space-hyphen-hyphen-space) instead.
3. **No rhetorical questions.** No sentence ending in `?` in prose.
4. **No "In this chapter / post / section we will explore / cover / look at."** Open declaratively.
5. **No empty enthusiasm.** No "exciting," "fascinating," "powerful" (without a specific technical claim attached).
6. **Paragraphs: 2-4 sentences, 6 sentences maximum before a structural break.**
7. **Citations: footnote format only.** Inline `<sup className="fn-ref"><a href="#fn-N">[N]</a></sup>` in prose; `<ol className="footnotes"><li id="fn-N">...</li></ol>` in `## Notes`. Format: `[N] Author et al. "Title." Venue Year. https://...`
8. **No fabricated citations.** If a URL cannot be verified at the stated address, remove the URL and note the uncertainty, or drop the citation entirely. The qubit calibration citation in Chapter 05 has a specific note -- read it.
9. **SVG ids must be globally unique per file AND unique across the whole book.** Use the prefix pattern `bo-chNN-` for every id and marker in SVG elements, where NN is the two-digit chapter number (e.g., `bo-ch01-loop`, `bo-ch01-arrow`, `bo-ch02-posterior`).
10. **`style={{color: 'currentColor'}}` on every SVG root element.** Accent colors use `var(--pillar-color, currentColor)` not hardcoded hex. Stroke widths 1.5 minimum. Geometric primitives only (no raster embeds, no foreignObject).
11. **Tables use `<table className="encoding-table">` with `<thead>` and `<tbody>`.** Not markdown tables.
12. **`reading` in chapters.ts matches the reading time estimate in the meta export of the corresponding MDX file.**

### Citation policy summary

- Primary source = arXiv permalink or publisher DOI. Not a blog. Not a tweet.
- Format: `[N] Author et al. "Title." Venue Year. https://...`
- If the paper is only in a proceedings (no arXiv), use the DOI or stable URL.
- Rasmussen and Williams 2006 GPML is freely available at https://gaussianprocess.org/gpml/ -- use that URL.

---

## 8. SVG figure id prefix table

Each chapter has its own namespace prefix. Use exactly these prefixes for all SVG element ids within each chapter's MDX file:

| Chapter | MDX file prefix  | SVG id prefix |
|---------|-----------------|---------------|
| 01      | ch01            | `bo-ch01-`    |
| 02      | ch02            | `bo-ch02-`    |
| 03      | ch03            | `bo-ch03-`    |
| 04      | ch04            | `bo-ch04-`    |
| 05      | ch05            | `bo-ch05-`    |

Marker `id` attributes must also follow this prefix (e.g., `bo-ch01-arrow`). References to markers use `url(#bo-ch01-arrow)`. Do not reuse any id across chapters.

---

## 9. Parallel implementation guide

The following files are fully independent and can be implemented by separate coders simultaneously without conflicts:

- Coder A: `chapters.ts` + `page.tsx` (book index)
- Coder B: `[slug]/page.tsx` (chapter renderer)
- Coder C: `ch01-why-bayesian-optimization.mdx`
- Coder D: `ch02-gaussian-processes.mdx`
- Coder E: `ch03-acquisition-functions.mdx`
- Coder F: `ch04-the-loop-in-practice.mdx`
- Coder G: `ch05-bo-in-the-wild.mdx`
- Coder H: `site/app/writing/page.tsx` (add import + POSTS entry)
- Coder I: `site/styles/globals.css` (add CSS block)

The only ordering constraint: `[slug]/page.tsx` (Coder B) depends on the MDX files existing on disk before the Next.js build runs (not before the coder writes the file). The import paths must match the filenames exactly.
