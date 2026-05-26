# Repository Conventions

These conventions apply to all public repositories owned by `shubhamkaushal765`.
They are a standing contract, not a style preference. New repositories must
conform from the first commit. Existing repositories are brought into
conformance as they reach active-development status.

---

## Naming convention

- All repository names are lowercase and hyphenated. No underscores except in
  legacy names that predate this convention (`qosf_excercises` is
  grandfathered; new repos use hyphens).
- No version suffixes: not `zuit-v2`, not `tell-me-why-new`, not `final`.
- No codenames that obscure function: `tell-me-why` is acceptable because it
  is the product name; `ball-of-fire` is not acceptable for a new repo.
- Discipline prefixes for families:
  - `zuit-*`: static analysis tooling family (e.g., `zuit-python-test-cases`)
  - `qec-*`: quantum error correction research family (e.g., future `qec-surface-benchmarks`)
  - No prefix required for standalone flagship repos (`zuit`, `tell-me-why`,
    `TransformerQEC`, `codestick` are their own namespaces).

---

## Mandatory README skeleton

Every owned public repository must have a `README.md` that follows this
skeleton exactly, in this order:

```
# {repo-name}

One-sentence value proposition.

## Install / Quickstart
## Usage
## Architecture (1 paragraph + optional ASCII diagram)
## Status (alpha / beta / stable + roadmap link)
## License
```

The `## Status` section is mandatory and must contain one of three labels:
`alpha`, `beta`, or `stable`, plus a link to the roadmap or open milestone.
A missing `## Status` section is a defect, not an omission.

### Status section guidance

- **alpha**. API is unstable; breaking changes expected; not recommended for
  production use. Include a roadmap link (`ROADMAP.md` or a GitHub milestone).
- **beta**. API is mostly stable; breaking changes will be announced in
  `CHANGELOG.md`; suitable for early adopters.
- **stable**. Semver guarantees apply. Breaking changes require a major
  version bump. `CHANGELOG.md` is kept current.

---

## Commit hygiene

Conventional commits are required on all repositories with strict enforcement:

| Prefix | Use |
|--------|-----|
| `feat:` | New capability visible to users or consumers |
| `fix:` | Bug correction |
| `refactor:` | Internal restructuring with no behavior change |
| `docs:` | Documentation changes only |
| `chore:` | Build, CI, dependency updates |
| `test:` | Test additions or corrections |
| `perf:` | Performance improvement |

Rules:

- Squash-merge all pull requests into `main`. Linear history is mandatory.
- No WIP, asdf, lol, temp, or similar commits on `main`.
- Force-push is permitted only on feature branches, never on `main`.
- Commits on `main` must be GPG-signed (`gpgSign = true` in git config). The
  "Verified" badge on commits is a signal of operational discipline.
- No Claude co-author tags (`Co-Authored-By: Claude`). Commits are authored
  by the human operator.

---

## Release strategy by repository

### zuit

- Versioning: semver, currently `0.x.y`.
- `0.x.y` until the SARIF schema stabilizes and the full five quality
  dimensions are shipped; then `1.0.0`.
- Distribution: crates.io.
- Every release: tag `vX.Y.Z`, generate `CHANGELOG.md` via `release-please`
  or equivalent, review before merge.
- Required: `CHANGELOG.md` kept current.

### tell-me-why

- Versioning: semver.
- Distribution: npm (TypeScript interface/tooling layer) + PyPI (Python core).
- Dual-registry releases should be coordinated in a single tag.
- Required: `CHANGELOG.md`.

### codestick

- Versioning: semver.
- Distribution: npm.
- Release tooling: `changesets`.
- Required: `CHANGELOG.md`.

### TransformerQEC

- This is a research implementation, not a library.
- Versioning: date-tagged (`YYYY-MM-DD-v1`, `YYYY-MM-DD-v2`), not semver.
- Each tagged release must include: training weights, the training script, and
  a `CITATION.cff` at the repo root.
- Required: `CITATION.cff` from the first public release.

---

## GitHub Actions

### Required on every library repository

- CI matrix on every pull request: test + lint + typecheck (or clippy for
  Rust, ruff for Python).
- `release-please` or `changesets` workflow for changelog and release
  automation.
- Dependabot configured for security updates only (not every minor bump).

### Banned

- Welcome bots (auto-commenting on new contributors' issues or PRs).
- Auto-labelers.
- Stale-issue bots.
- Any workflow that creates commits or pushes to `main` outside of the release
  pipeline.

---

## Badge policy

- Profile `README.md`: zero badges. No exceptions.
- Project `README.md` files: maximum three badges. Permitted: build status,
  current version (crates.io / npm), license. No GitHub stats widgets, no
  wakatime, no visitor counters.
- Position: if badges are present, they appear immediately after the
  one-sentence value proposition, before any prose.
