# Next.js Site + README Personality Refresh — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a Next.js 15 static-export site at `shubhamkaushal765.github.io` with four pages (Home, About, Writing, Now) + 404; delete legacy Jekyll content; refresh the profile README and `.agent/` docs with the personality-motif system defined in the spec.

**Architecture:** Next.js 15 App Router with `output: 'export'`. Source lives in `site/`, built artifacts land in `docs/` via a post-build script that moves Next's `out/` directory. GitHub Pages serves from `main` branch `/docs` folder. MDX content lives in `site/content/` and is imported as a component by TSX route handlers (NOT as Next page files). One shared visual motif — an ASCII pillar diagram — appears in both the README hero and the site Home/About heroes.

**Tech Stack:** Next.js 15, React 19, TypeScript 5.6 (strict + `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes`), Tailwind CSS v4, MDX 3, ESLint 9. Node 20. No Shiki, no Framer Motion, no KaTeX, no icons in v1.

**Spec reference:** [docs/superpowers/specs/2026-05-17-nextjs-site-design.md](../specs/2026-05-17-nextjs-site-design.md) — this plan implements every locked decision in §1, the architecture in §2, the page content in §3, the motifs in §4, and the verification checklist in §11. Read the spec first; the plan does not duplicate spec content.

**Parent spec:** [docs/superpowers/specs/2026-05-17-github-profile-design.md](../specs/2026-05-17-github-profile-design.md) — locks identity, voice, hard rules.

**Note on TDD:** A static personal site has no behavior to unit-test in the traditional sense. The plan uses a "build + assert" pattern instead: after each phase that produces artifacts, a verification step greps the built HTML for required strings (e.g., `parsers -> qubits.` in `docs/index.html`). This catches regressions cheaply without a Playwright/Vitest harness for v1.

**Commit cadence:** Frequent small commits within each phase (one per task where it makes sense), then **two synthesizing commits at the very end** per spec §1: `feat(site): scaffold next.js site + delete jekyll legacy + relocate specs` and `feat(profile): refresh readme with personality motifs + update agent docs`. The per-task commits during implementation use `wip:` or scoped Conventional Commits and may be squashed at the end via interactive rebase if desired. No Claude co-author tags on any commit.

---

## File Structure

### Files to create

| Path | Responsibility |
|---|---|
| `site/package.json` | npm scripts (`dev`, `build`, `lint`), dependency pins |
| `site/tsconfig.json` | strict TS with `noUncheckedIndexedAccess` + `exactOptionalPropertyTypes` |
| `site/next.config.mjs` | static export, `pageExtensions: ['ts','tsx']`, MDX loader |
| `site/.eslintrc.cjs` | `next/core-web-vitals` config |
| `site/.gitignore` | `node_modules/`, `.next/`, `out/` |
| `site/scripts/publish-to-docs.mjs` | post-build: move `out/` → `../docs`, write `.nojekyll` |
| `site/styles/globals.css` | Tailwind v4 directives + design tokens as CSS variables |
| `site/app/layout.tsx` | HTML shell, font imports, metadata defaults |
| `site/app/page.tsx` | Home route — imports `content/home.mdx` |
| `site/app/not-found.tsx` | 404 route |
| `site/app/about/page.tsx` | About route — imports `content/about.mdx` |
| `site/app/writing/page.tsx` | Writing index — inline content, no MDX |
| `site/app/now/page.tsx` | Now route — imports `content/now.mdx` |
| `site/components/Hero.tsx` | Wraps PillarDiagram with optional `variant="full" \| "compact"` |
| `site/components/PillarDiagram.tsx` | The canonical ASCII pillar diagram |
| `site/components/SectionRule.tsx` | 1px top-rule + small-caps H2 wrapper |
| `site/components/FootnoteList.tsx` | Numbered citations block |
| `site/components/FooterSignature.tsx` | `~/lab · asia/kolkata · pgp ...` line |
| `site/content/home.mdx` | Home prose (everything below the hero) |
| `site/content/about.mdx` | About prose with inline footnote refs |
| `site/content/now.mdx` | Three dated Q2 entries |
| `site/public/.nojekyll` | Empty file — disables Jekyll on Pages |
| `.github/workflows/site.yml` | Rebuilds `docs/` on push to `main` when `site/**` changes |

### Files to delete (Jekyll legacy, spec §8)

- `index.html`, `404.html`, `images/`, `2018/`, `about/`, `tag/`, `styleguide/`, `js/`, `favicon.ico`, `robots.txt`, `search.json`, `sitemap.xml`, `zolanREADME.md`

### Files to modify

- `README.md` — apply personality motifs per spec §5.1
- `AGENTS.md` — update per spec §7
- `.agent/profile-system.md` — add Personality motifs section + amend `<sub>` rule per spec §6.1
- `.agent/visual-system.md` — add Hero diagram section per spec §6.2

### Files to relocate (`git mv`)

- `docs/superpowers/` → `superpowers/`

---

## Phase 1: Specs relocation

### Task 1.1: Move spec directory out of /docs

**Files:**
- Move: `docs/superpowers/` → `superpowers/`

- [ ] **Step 1: Verify destination does not exist**

```bash
test ! -e superpowers && echo OK || echo "FAIL: superpowers/ already exists"
```

Expected: `OK`

- [ ] **Step 2: Move with git**

```bash
git mv docs/superpowers superpowers
```

- [ ] **Step 3: Verify**

```bash
test -d superpowers/specs && test -f superpowers/specs/2026-05-17-nextjs-site-design.md && test -f superpowers/specs/2026-05-17-github-profile-design.md && test ! -e docs/superpowers && echo OK
```

Expected: `OK`

- [ ] **Step 4: Note the spec moved itself**

This plan and the spec it implements now live at `superpowers/specs/` and `superpowers/plans/`. All subsequent task references use the new path. Any external bookmarks pointing at `docs/superpowers/` are now stale.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: relocate specs from docs/superpowers to superpowers/"
```

---

## Phase 2: Delete Jekyll legacy

### Task 2.1: Remove all 13 legacy paths

**Files:** see spec §8.

- [ ] **Step 1: Verify the 13 paths exist before removal**

```bash
for f in index.html 404.html images 2018 about tag styleguide js favicon.ico robots.txt search.json sitemap.xml zolanREADME.md; do
  test -e "$f" && echo "$f: present" || echo "$f: MISSING"
done
```

Expected: all 13 print `present`.

- [ ] **Step 2: Remove with git**

```bash
git rm -rf index.html 404.html images 2018 about tag styleguide js favicon.ico robots.txt search.json sitemap.xml zolanREADME.md
```

- [ ] **Step 3: Verify the removals**

```bash
for f in index.html 404.html images 2018 about tag styleguide js favicon.ico robots.txt search.json sitemap.xml zolanREADME.md; do
  test ! -e "$f" || echo "FAIL: $f still present"
done; echo "done"
```

Expected: only `done` is printed.

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: delete jekyll legacy (zolan theme)"
```

---

## Phase 3: Next.js scaffold

### Task 3.1: Create site/ directory and core configs

**Files:**
- Create: `site/package.json`
- Create: `site/.gitignore`
- Create: `site/tsconfig.json`
- Create: `site/next.config.mjs`
- Create: `site/.eslintrc.cjs`
- Create: `site/public/.nojekyll`

- [ ] **Step 1: Create `site/package.json`**

```json
{
  "name": "shubhamkaushal765-site",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build && node ./scripts/publish-to-docs.mjs",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@next/mdx": "^15.0.0",
    "@mdx-js/loader": "^3.0.0",
    "@mdx-js/react": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/node": "^22.0.0",
    "@types/mdx": "^2.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0"
  }
}
```

- [ ] **Step 2: Create `site/.gitignore`**

```
node_modules/
.next/
out/
*.tsbuildinfo
.DS_Store
```

- [ ] **Step 3: Create `site/tsconfig.json`**

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "noEmit": true,
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out", "scripts"]
}
```

- [ ] **Step 4: Create `site/next.config.mjs`**

```js
import createMDX from '@next/mdx';

const withMDX = createMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx'],
};

export default withMDX(nextConfig);
```

- [ ] **Step 5: Create `site/.eslintrc.cjs`**

```js
module.exports = {
  root: true,
  extends: ['next/core-web-vitals'],
};
```

- [ ] **Step 6: Create empty `site/public/.nojekyll`**

```bash
mkdir -p site/public && touch site/public/.nojekyll
```

- [ ] **Step 7: Create `site/scripts/publish-to-docs.mjs`**

```js
// Post-build: relocate Next's static export from site/out to repo-root docs/,
// and recreate the .nojekyll marker that disables Jekyll on GitHub Pages.
// Invoked by `npm run build` in package.json.
import { rm, rename, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteRoot = resolve(__dirname, '..');           // site/
const outDir = resolve(siteRoot, 'out');             // site/out/
const docsDir = resolve(siteRoot, '..', 'docs');     // <repo>/docs/

await rm(docsDir, { recursive: true, force: true });
await mkdir(dirname(docsDir), { recursive: true });
await rename(outDir, docsDir);
await writeFile(resolve(docsDir, '.nojekyll'), '');

console.log(`published static export to ${docsDir}`);
```

- [ ] **Step 8: Install dependencies**

```bash
cd site && npm install
```

Expected: `node_modules/` populates, no peer-dep errors. (Some `Warning: ...` lines from npm are acceptable. Any `ERESOLVE` is a failure.)

- [ ] **Step 9: Commit (WIP — will be squashed)**

```bash
cd .. && git add site/.gitignore site/package.json site/package-lock.json site/tsconfig.json site/next.config.mjs site/.eslintrc.cjs site/public/.nojekyll site/scripts/publish-to-docs.mjs && git commit -m "wip(site): scaffold next.js configs"
```

### Task 3.2: Verify scaffold builds with empty app

**Files:**
- Create: `site/app/layout.tsx` (minimal)
- Create: `site/app/page.tsx` (minimal)

- [ ] **Step 1: Create minimal `site/app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Shubham Kaushal',
  description: 'Parsers to qubits.',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Create minimal `site/app/page.tsx`**

```tsx
export default function HomePage() {
  return <main>scaffold ok</main>;
}
```

- [ ] **Step 3: Build**

```bash
cd site && npm run build
```

Expected: build succeeds; the publish script logs `published static export to <path>/docs`; `../docs/index.html` exists; `../docs/.nojekyll` exists.

- [ ] **Step 4: Verify build artifacts**

```bash
test -f ../docs/index.html && test -f ../docs/.nojekyll && grep -q "scaffold ok" ../docs/index.html && echo OK
```

Expected: `OK`

- [ ] **Step 5: Commit (WIP)**

```bash
cd .. && git add site/app docs && git commit -m "wip(site): minimal layout + home + verify build pipeline"
```

---

## Phase 4: Design tokens + Tailwind globals

### Task 4.1: Wire Tailwind v4 + design tokens

**Files:**
- Create: `site/postcss.config.mjs`
- Create: `site/styles/globals.css`
- Modify: `site/app/layout.tsx` — import globals.css

Reference: design tokens come verbatim from `.agent/visual-system.md` §spacing, §typography, §color.

- [ ] **Step 1: Create `site/postcss.config.mjs`**

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 2: Create `site/styles/globals.css`**

```css
@import "tailwindcss";

@theme {
  /* spacing — fibonacci on 0.25rem (see .agent/visual-system.md §spacing) */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-5: 1.25rem;
  --spacing-8: 2rem;
  --spacing-13: 3.25rem;

  /* surfaces */
  --color-surface-base: #0a0a0a;
  --color-surface-card: #111111;
  --color-surface-hover: #161616;

  /* text */
  --color-text-body: #ededed;
  --color-text-muted: #a3a3a3;
  --color-text-footnote: #737373;

  /* accent — single use only */
  --color-accent: #7dd3fc;

  /* typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Inter Display", "Inter", system-ui, sans-serif;
  --font-mono: "Berkeley Mono", "JetBrains Mono", "Geist Mono", ui-monospace, monospace;
}

@layer base {
  html {
    background: var(--color-surface-base);
    color: var(--color-text-body);
    font-family: var(--font-sans);
    line-height: 1.75;
  }

  body {
    margin: 0;
    padding: 0;
  }

  main {
    max-width: 68ch;
    margin: 0 auto;
    padding: var(--spacing-13) var(--spacing-5);
  }

  /* h2 carries the section-rule motif; SectionRule.tsx renders the line + small-caps */
  h2 {
    font-family: var(--font-display);
    font-weight: 600;
    font-variant: small-caps;
    letter-spacing: -0.02em;
    margin-top: var(--spacing-13);
    margin-bottom: var(--spacing-5);
  }

  h3 {
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-top: var(--spacing-8);
    margin-bottom: var(--spacing-3);
  }

  a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: color-mix(in oklab, currentColor 50%, transparent);
    text-underline-offset: 2px;
    text-decoration-thickness: 1px;
    transition: text-decoration-color 120ms ease-out;
  }
  a:hover {
    text-decoration-color: currentColor;
  }

  code {
    font-family: var(--font-mono);
    color: var(--color-accent);
    background: var(--color-surface-card);
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 0.95em;
  }

  pre {
    font-family: var(--font-mono);
    line-height: 1.2;
    overflow-x: auto;
    max-width: 82ch;
  }

  pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
}

/* one-time accent reveal for the home hero tagline */
@keyframes accent-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-tagline {
  color: var(--color-accent);
  animation: accent-fade-in 200ms ease-out;
}
```

- [ ] **Step 3: Import globals in layout**

Modify `site/app/layout.tsx` — add `import '@/styles/globals.css';` at the top (after the type imports).

- [ ] **Step 4: Build and verify CSS lands**

```bash
cd site && npm run build && cd .. && test -d docs/_next/static/css && echo OK
```

Expected: `OK` and at least one `.css` file exists under `docs/_next/static/css/`.

- [ ] **Step 5: Commit (WIP)**

```bash
git add site/postcss.config.mjs site/styles site/app/layout.tsx docs && git commit -m "wip(site): tailwind v4 + design tokens"
```

---

## Phase 5: Layout-level components

### Task 5.1: PillarDiagram (the canonical ASCII art)

**Files:**
- Create: `site/components/PillarDiagram.tsx`

- [ ] **Step 1: Create `site/components/PillarDiagram.tsx`**

The diagram is the verbatim ASCII from spec §4.1.

```tsx
// Spec: 2026-05-17-nextjs-site-design.md §4.1 — canonical, do not modify.
const DIAGRAM = `+----------------------------------------------------------+
|  shubham kaushal // shubhamkaushal765                    |
|                                                          |
|  parsers -> qubits.                                      |
|                                                          |
|     code intelligence ---bridge--- machine learning      |
|              \\                          /                |
|               \\                        /                 |
|                +------ bridge ------> quantum computing  |
|                                                          |
|  rust at the bottom. python at the top.                  |
+----------------------------------------------------------+`;

export default function PillarDiagram() {
  return <pre aria-label="Three pillars: code intelligence, machine learning, quantum computing, connected by bridges">{DIAGRAM}</pre>;
}
```

- [ ] **Step 2: Typecheck (do not build yet — component is unused)**

```bash
cd site && npx tsc --noEmit
```

Expected: no errors. The diagram is not wired into any page yet; that happens in Phase 6. A build-and-grep here would intentionally fail and confuse a strict-mode executor.

### Task 5.2: Hero (wraps PillarDiagram)

**Files:**
- Create: `site/components/Hero.tsx`

- [ ] **Step 1: Create `site/components/Hero.tsx`**

```tsx
import PillarDiagram from './PillarDiagram';

type Variant = 'full' | 'compact';

export default function Hero({ variant = 'full' }: { variant?: Variant }) {
  if (variant === 'compact') {
    return (
      <header>
        <PillarDiagram />
      </header>
    );
  }
  return (
    <header>
      <PillarDiagram />
      <p className="hero-tagline" style={{ fontFamily: 'var(--font-mono)', marginTop: 'var(--spacing-3)' }}>
        parsers -&gt; qubits.
      </p>
    </header>
  );
}
```

### Task 5.3: SectionRule (1px top-rule wrapper)

**Files:**
- Create: `site/components/SectionRule.tsx`

- [ ] **Step 1: Create `site/components/SectionRule.tsx`**

```tsx
import type { ReactNode } from 'react';

export default function SectionRule({ children }: { children: ReactNode }) {
  return (
    <div>
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-text-footnote)', margin: 'var(--spacing-13) 0 var(--spacing-3) 0' }} />
      <h2>{children}</h2>
    </div>
  );
}
```

### Task 5.4: FootnoteList (numbered citations)

**Files:**
- Create: `site/components/FootnoteList.tsx`

- [ ] **Step 1: Create `site/components/FootnoteList.tsx`**

```tsx
type Footnote = { id: number; html: string };

export default function FootnoteList({ items }: { items: Footnote[] }) {
  return (
    <section>
      <SectionRuleInline>Footnotes</SectionRuleInline>
      <ol style={{ paddingLeft: 'var(--spacing-5)', color: 'var(--color-text-muted)', fontSize: '0.95em' }}>
        {items.map((fn) => (
          <li key={fn.id} id={`fn-${fn.id}`} dangerouslySetInnerHTML={{ __html: fn.html }} />
        ))}
      </ol>
    </section>
  );
}

function SectionRuleInline({ children }: { children: string }) {
  return (
    <>
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-text-footnote)', margin: 'var(--spacing-13) 0 var(--spacing-3) 0' }} />
      <h2>{children}</h2>
    </>
  );
}
```

### Task 5.5: FooterSignature

**Files:**
- Create: `site/components/FooterSignature.tsx`

- [ ] **Step 1: Create `site/components/FooterSignature.tsx`**

```tsx
export default function FooterSignature() {
  return (
    <footer
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-footnote)',
        textAlign: 'center',
        marginTop: 'var(--spacing-13)',
        fontSize: '0.9em',
      }}
    >
      ~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF
    </footer>
  );
}
```

### Task 5.6: Verify components typecheck

- [ ] **Step 1: Run typecheck**

```bash
cd site && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Commit (WIP)**

```bash
cd .. && git add site/components && git commit -m "wip(site): layout components (Hero, PillarDiagram, SectionRule, FootnoteList, FooterSignature)"
```

---

## Phase 6: Page content — Home

### Task 6.1: Create home.mdx with prose body

**Files:**
- Create: `site/content/home.mdx`

- [ ] **Step 1: Create `site/content/home.mdx`**

Content follows spec §3.1. The hero is rendered by TSX wrapper (Task 7), so the MDX starts at the H2 "What I work on".

````mdx
## What I work on

### Code intelligence

Multi-language static analysis in Rust. Structured findings across maintainability, security, complexity, and test-smell dimensions, emitted as SARIF 2.1.0 with CWE and OWASP anchors. Verified through a fixture corpus of vulnerable + safe pairs with `expected.json` contracts. Shipped: [zuit](https://github.com/shubhamkaushal765/zuit).

### Machine learning

Local-first RAG over source code. Models and embeddings stay on the operator's machine — Ollama inference, Chroma vector store, sentence-transformers encoding, six language parsers. Earlier ML fundamentals work (autoencoders, sentiment classification, image classification) established the applied baseline. Shipped: [tell-me-why](https://github.com/shubhamkaushal765/tell-me-why).

### Quantum computing

Transformer-based decoding for surface-code quantum error correction. Syndrome graphs encoded as sequences; a custom transformer encoder learns to correct bit-flip and phase-flip errors from Stim-simulated circuits, trained under PyTorch Lightning. QOSF Cohort 9 work covers QAOA and adiabatic quantum computing. Shipped: [TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC).

## Selected work

- **[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC)** — Transformer-based decoder for surface-code QEC. Stim simulation, PyTorch Lightning training, syndrome-graph encoding. Quantum · ML
- **[zuit](https://github.com/shubhamkaushal765/zuit)** — Multi-language static-analysis CLI in Rust. Structured findings across five quality dimensions. SARIF 2.1.0 + CWE/OWASP taxonomy. Rust · static analysis
- **[tell-me-why](https://github.com/shubhamkaushal765/tell-me-why)** — Local-first RAG over your codebase. Multi-language. Ollama + Chroma + sentence-transformers — code and embeddings never leave the machine. RAG · local-first
- **[qosf_excercises](https://github.com/shubhamkaushal765/qosf_excercises)** — QOSF Cohort 9, Task 4: QAOA and adiabatic quantum computing solutions. Variational ansatz, adiabatic-to-QAOA mapping. QAOA · quantum
- **[codestick](https://github.com/shubhamkaushal765/codestick)** — Programmatic stick-figure animation library for TypeScript. Angular-skeleton system, 22 human poses, 10 animation clips, SVG export. TypeScript · animation

## Bridges

[TransformerQEC](https://github.com/shubhamkaushal765/TransformerQEC) is the ML-to-Quantum bridge: it applies transformer sequence modeling — the same architecture that underlies code embeddings — to syndrome graph decoding, bringing ML methodology into quantum error correction directly.

[tell-me-why](https://github.com/shubhamkaushal765/tell-me-why) is the Code-to-ML bridge: source code as a structured corpus, multi-language parsing for structure extraction, local embedding and retrieval over the result.

## Engineering philosophy

- Structure first, syntax second — work on the AST, the syndrome graph, the embedding, not the surface form.
- Run local until proven otherwise — code, models, and quantum simulators belong on the operator's machine.
- Reproducibility is the deliverable — fixtures, seeds, SARIF, `expected.json` — the artifact is the contract.

## Current focus

### 2026-Q2

- Researching qubit calibration scheduling (RB / T1 / T2 / single-qubit gate tomography) as an orchestration problem. No public repo yet — research direction.
- `zuit` 0.x to 1.0: stabilizing the SARIF schema, adding the first three Python rules with paper-grade rationale, preparing a crates.io release.
- `TransformerQEC` reproduction on public datasets: releasing training weights and the full training script for independent verification.

## Connect

- Email: [kaushalshubham.ks@gmail.com](mailto:kaushalshubham.ks@gmail.com)
- GitHub: [shubhamkaushal765](https://github.com/shubhamkaushal765)
- LinkedIn: [kaushalshubham](https://linkedin.com/in/kaushalshubham)
````

### Task 6.2: Wire Home page to render MDX

**Files:**
- Modify: `site/app/page.tsx`

- [ ] **Step 1: Replace `site/app/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/home.mdx';

export const metadata: Metadata = {
  title: 'Shubham Kaushal — Parsers to qubits.',
  description:
    'Independent engineer and researcher across code intelligence, machine learning, and quantum computing.',
};

export default function HomePage() {
  return (
    <main>
      <Hero variant="full" />
      <Content />
      <FooterSignature />
    </main>
  );
}
```

- [ ] **Step 2: Add MDX types declaration**

Create `site/mdx.d.ts`:

```ts
declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}
```

- [ ] **Step 3: Build and verify diagram + content land in HTML**

```bash
cd site && npm run build && cd .. && grep -q "parsers -> qubits" docs/index.html && grep -q "What I work on" docs/index.html && grep -q "TransformerQEC" docs/index.html && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit (WIP)**

```bash
git add site/app/page.tsx site/content/home.mdx site/mdx.d.ts docs && git commit -m "wip(site): home page with MDX content"
```

---

## Phase 7: Page content — About

### Task 7.1: Create about.mdx

**Files:**
- Create: `site/content/about.mdx`

- [ ] **Step 1: Create `site/content/about.mdx`**

Inline footnotes use `[1]`, `[2]` etc., linking to `#fn-1` etc. The `<FootnoteList>` component is rendered by the TSX wrapper (Task 7.2), not in MDX.

````mdx
## Identity

Independent engineer and researcher working across code intelligence, machine learning, and quantum computing — from Rust-based static analyzers at the bottom of the stack to transformer-based quantum error correction at the top.

The connecting thread is operating on *symbolic structure* — ASTs, code embeddings, syndrome graphs — and building tooling that respects the structure. Rust at the bottom for compiler-grade tooling. Python at the top for research code. The senior pattern, not a portfolio juxtaposition.

## Three pillars

### Code intelligence

`zuit` is a multi-language static-analysis CLI in Rust. The work centers on a five-dimension finding taxonomy (maintainability, security, complexity, documentation, test smells) emitted as SARIF 2.1.0 with CWE and OWASP anchors. Correctness is held to a contract: the `zuit-python-test-cases` fixture corpus pairs vulnerable and safe Python with `expected.json` files, so every Python rule has both a positive and negative example checked into git. SARIF [1] is the deliverable, not a logging side effect.

### Machine learning

`tell-me-why` is local-first RAG over source code. Multi-language parsing — Python, Rust, C#, Java, JS/TS, Go — extracts structural units before embedding. The model layer is Ollama; the vector store is Chroma; embeddings come from sentence-transformers. Nothing leaves the operator's machine. The earlier ML fundamentals (autoencoders, sentiment classification, MNIST, EDA) established the applied baseline; the current focus is benchmark methodology at fixed memory budget across embedding models.

### Quantum computing

`TransformerQEC` is a transformer-based decoder for surface-code quantum error correction. The architecture encodes syndrome graphs as sequences and trains a custom transformer encoder under PyTorch Lightning, with Stim providing the noisy-circuit simulation. The implementation follows the *Transformer-QEC* paper [2]. The adjacent `qosf_excercises` repo holds the QOSF Cohort 9 Task 4 solutions on QAOA and adiabatic-to-QAOA mapping [3].

## Bridge artifacts

`TransformerQEC` is the ML-to-Quantum bridge. The transformer architecture that underlies code embeddings turns out to be the right structural prior for syndrome graphs: both are sparse, both have local correlations, both reward learning a low-dimensional structural representation rather than a surface-form one.

`tell-me-why` is the Code-to-ML bridge. Source code is the structured corpus; multi-language parsing is the structure-extraction step; local embedding + retrieval is the model layer. The pipeline respects program structure — it does not flatten a function into a string of tokens before embedding.

## Engineering philosophy

- Structure first, syntax second — work on the AST, the syndrome graph, the embedding, not the surface form.
- Run local until proven otherwise — code, models, and quantum simulators belong on the operator's machine.
- Reproducibility is the deliverable — fixtures, seeds, SARIF, `expected.json` — the artifact is the contract.

## How I work

- Conventional Commits strict on every owned repository. Linear history on `main`. GPG-signed.
- No Claude co-author tags. Commits are authored by the human operator.
- Releases ship a `CHANGELOG.md`. Research repos (`TransformerQEC`) ship a `CITATION.cff`.
- Project READMEs follow a fixed skeleton: install, usage, architecture, **status**, license. The status section is mandatory.

## 12-month direction

### Q1

`zuit` to 1.0: SARIF schema stabilization, first three Python rules with paper-grade rationale, submission to `awesome-static-analysis`.

### Q2

`tell-me-why` benchmark suite vs. cursor / continue / claude-projects at fixed memory budget.

### Q3

`TransformerQEC` reproduction on public datasets; release of training weights and full training script.

### Q4

Synthesis writeup — *Three projects, one thesis* — formalizing the parsers-to-qubits framing as a single coherent research program.
````

### Task 7.2: Wire About page

**Files:**
- Create: `site/app/about/page.tsx`

- [ ] **Step 1: Create `site/app/about/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FootnoteList from '@/components/FootnoteList';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/about.mdx';

export const metadata: Metadata = {
  title: 'About — Shubham Kaushal',
  description:
    'Independent engineer and researcher across code intelligence, machine learning, and quantum computing.',
};

const FOOTNOTES = [
  {
    id: 1,
    html: 'OASIS. <em>Static Analysis Results Interchange Format (SARIF) Version 2.1.0.</em> OASIS Standard, 27 March 2020. <a href="https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html">https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html</a>',
  },
  {
    id: 2,
    html: 'Wang H. et al. <em>Transformer-QEC: Quantum Error Correction Code Decoding with Transferable Transformers.</em> ICCAD 2023. <a href="https://arxiv.org/abs/2311.16082">https://arxiv.org/abs/2311.16082</a>',
  },
  {
    id: 3,
    html: 'Quantum Open Source Foundation. <em>QOSF Mentorship Program Cohort 9, Task 4: QAOA and Adiabatic Quantum Computing.</em> 2024. <a href="https://github.com/qosf/qosf-mentorship">https://github.com/qosf/qosf-mentorship</a>',
  },
];

export default function AboutPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>About</h1>
      <Content />
      <FootnoteList items={FOOTNOTES} />
      <FooterSignature />
    </main>
  );
}
```

- [ ] **Step 2: Build + verify**

```bash
cd site && npm run build && cd .. && grep -q "About" docs/about/index.html && grep -q "Transformer-QEC" docs/about/index.html && grep -q "fn-1" docs/about/index.html && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit (WIP)**

```bash
git add site/app/about site/content/about.mdx docs && git commit -m "wip(site): about page with footnoted citations"
```

---

## Phase 8: Page content — Writing index

### Task 8.1: Create Writing page (inline, no MDX)

**Files:**
- Create: `site/app/writing/page.tsx`

- [ ] **Step 1: Create `site/app/writing/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';

export const metadata: Metadata = {
  title: 'Writing — Shubham Kaushal',
  description: 'Essay pipeline across code intelligence, machine learning, and quantum computing.',
};

const PIPELINE = [
  {
    title: 'Why your static analyzer should emit SARIF — and what most authors get wrong about it',
    summary: 'SARIF 2.1.0 schema, CWE/OWASP anchoring, and the implementation mistakes that make findings non-portable.',
    pillar: 'code intelligence',
  },
  {
    title: 'Local-first RAG over code: the embedding choice matters more than the LLM',
    summary: 'Benchmark methodology and results comparing embedding models at fixed memory budget.',
    pillar: 'machine learning',
  },
  {
    title: 'Transformers as quantum decoders: a Stim + Lightning walkthrough',
    summary: 'Syndrome graph encoding, transformer architecture, and training setup for surface-code QEC.',
    pillar: 'quantum',
  },
  {
    title: 'Five quality dimensions: a taxonomy for code-health analyzers',
    summary: 'RFC-style foundational post on the dimension model that other writing references.',
    pillar: 'code intelligence',
  },
  {
    title: 'Qubit calibration as an orchestration problem',
    summary: 'Framing RB / T1 / T2 / single-qubit gate tomography as resource allocation and dependency ordering.',
    pillar: 'quantum',
  },
];

export default function WritingPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>Writing</h1>
      <p>First essay shipping 2026-Q3. Pipeline:</p>
      <ol>
        {PIPELINE.map((post, i) => (
          <li key={i} style={{ marginBottom: 'var(--spacing-5)' }}>
            <strong>{post.title}</strong>
            <br />
            <span style={{ color: 'var(--color-text-muted)' }}>
              {post.summary} <em>· {post.pillar}</em>
            </span>
          </li>
        ))}
      </ol>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95em' }}>
        Every post cites primary sources directly (arXiv permalinks, not commentary). Every code sample runs as written. Pseudocode is labeled as pseudocode.
      </p>
      <FooterSignature />
    </main>
  );
}
```

- [ ] **Step 2: Build + verify**

```bash
cd site && npm run build && cd .. && test -f docs/writing/index.html && grep -q "2026-Q3" docs/writing/index.html && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit (WIP)**

```bash
git add site/app/writing docs && git commit -m "wip(site): writing index with essay pipeline"
```

---

## Phase 9: Page content — Now

### Task 9.1: Create now.mdx + page

**Files:**
- Create: `site/content/now.mdx`
- Create: `site/app/now/page.tsx`

- [ ] **Step 1: Create `site/content/now.mdx`**

````mdx
What I'm focused on right now, in research-diary form. This page follows the [/now-page convention](https://nownownow.com).

### 2026-05-17

Researching qubit calibration scheduling — RB, T1, T2, single-qubit gate tomography — as an orchestration problem. No public repo yet; the work is content-first until there is at least one runnable script.

### 2026-05

Pushing `zuit` from 0.x toward 1.0: stabilizing the SARIF schema, drafting the first three Python rules with paper-grade rationale, preparing a crates.io release path.

### 2026-04

`TransformerQEC` reproduction on public datasets. Releasing training weights and the full training script so independent verification is a `pip install` and a `python train.py`.

---

*Last updated 2026-05-17.*
````

- [ ] **Step 2: Create `site/app/now/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import FooterSignature from '@/components/FooterSignature';
import Content from '@/content/now.mdx';

export const metadata: Metadata = {
  title: 'Now — Shubham Kaushal',
  description: 'Current research focus, in research-diary form.',
};

export default function NowPage() {
  return (
    <main>
      <Hero variant="compact" />
      <h1>Now</h1>
      <Content />
      <FooterSignature />
    </main>
  );
}
```

- [ ] **Step 3: Build + verify**

```bash
cd site && npm run build && cd .. && test -f docs/now/index.html && grep -q "qubit calibration" docs/now/index.html && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit (WIP)**

```bash
git add site/app/now site/content/now.mdx docs && git commit -m "wip(site): now page"
```

---

## Phase 10: 404 page

### Task 10.1: Create not-found.tsx

**Files:**
- Create: `site/app/not-found.tsx`

- [ ] **Step 1: Create `site/app/not-found.tsx`**

```tsx
import FooterSignature from '@/components/FooterSignature';

export default function NotFound() {
  return (
    <main>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
        parsers -&gt; qubits.
      </p>
      <h1>404</h1>
      <p>
        That page does not exist. Try <a href="/">home</a> or <a href="/writing/">writing</a>.
      </p>
      <FooterSignature />
    </main>
  );
}
```

- [ ] **Step 2: Build + verify**

```bash
cd site && npm run build && cd .. && test -f docs/404.html && grep -q "404" docs/404.html && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit (WIP)**

```bash
git add site/app/not-found.tsx docs && git commit -m "wip(site): 404 page"
```

---

## Phase 11: CI workflow

### Task 11.1: GitHub Action to rebuild docs/ on push

**Files:**
- Create: `.github/workflows/site.yml`

- [ ] **Step 1: Create `.github/workflows/site.yml`**

```yaml
name: Build site

on:
  push:
    branches: [main]
    paths:
      - 'site/**'
      - '.github/workflows/site.yml'
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
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
            git pull --rebase origin main
            git push
          fi
```

- [ ] **Step 2: Verify YAML syntax**

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/site.yml'))" && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit (WIP)**

```bash
git add .github/workflows/site.yml && git commit -m "wip(ci): site rebuild workflow"
```

---

## Phase 12: README refresh

### Task 12.1: Replace README with personality-flavored version

**Files:**
- Modify: `README.md`

Reference: spec §5.1 (changes) and §5.2 (what does not change). Tagline, philosophy lines, and Selected-work descriptions are **locked verbatim**.

- [ ] **Step 1: Rewrite `README.md`**

Full file:

````markdown
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
````

- [ ] **Step 2: Verify locked elements survived verbatim**

```bash
grep -q "Parsers to qubits" README.md || true  # not present — tagline lives lowercase inside the diagram now (acceptable per spec)
grep -q "parsers -> qubits" README.md && echo "tagline ok"
grep -q "Structure first, syntax second" README.md && echo "philosophy line 1 ok"
grep -q "Run local until proven otherwise" README.md && echo "philosophy line 2 ok"
grep -q "Reproducibility is the deliverable" README.md && echo "philosophy line 3 ok"
grep -q "Transformer-based decoder for surface-code QEC" README.md && echo "TransformerQEC desc ok"
grep -q "Multi-language static-analysis CLI in Rust" README.md && echo "zuit desc ok"
grep -q "Local-first RAG over your codebase" README.md && echo "tell-me-why desc ok"
grep -q "QOSF Cohort 9, Task 4" README.md && echo "qosf desc ok"
grep -q "Programmatic stick-figure animation library" README.md && echo "codestick desc ok"
```

Expected: 9 "ok" lines.

> **Note on tagline:** The README places the tagline inside the ASCII diagram as `parsers -> qubits.` (lowercase, per the diagram aesthetic). The locked tagline `Parsers to qubits.` from the parent spec still appears in the spec docs and the `.agent/` operating manual; the visual representation in the diagram is the lowercase rendering, which the spec §4.1 explicitly approves. This is not a violation of the locked tagline rule.

- [ ] **Step 3: No emoji / no badges check**

```bash
rg --pcre2 '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' README.md && echo "FAIL: emoji found" || echo "no emoji ok"
grep -E 'shields\.io|img\.shields|github-readme-stats|streak-stats|top-langs|wakatime|skill-icons|profile-views' README.md && echo "FAIL: badge found" || echo "no badges ok"
```

Expected: `no emoji ok` and `no badges ok`.

- [ ] **Step 4: Commit (WIP)**

```bash
git add README.md && git commit -m "wip(profile): refresh readme with personality motifs"
```

---

## Phase 13: .agent/ doc updates

### Task 13.1: Update `.agent/profile-system.md`

**Files:**
- Modify: `.agent/profile-system.md`

Two changes per spec §6.1.

- [ ] **Step 1: Amend the hard rule about `<sub>`**

Find this line in `.agent/profile-system.md`:

```
- No HTML in `README.md` except `<sub>` for the forks footnote at the bottom.
```

Replace with:

```
- No HTML in `README.md` except `<sub>` tags. Two `<sub>` blocks are permitted: the footer signature (per `.agent/visual-system.md` § Hero diagram) and the forks footnote, in that order at the bottom of the file.
```

- [ ] **Step 2: Insert a new "Personality motifs" section between "Voice rules" and "Audience perception matrix"**

Add this section (verbatim) after the Voice rules section and before the Audience perception matrix section:

```markdown
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

### Single accent color

`#7dd3fc` (sky-300). Used for inline `<code>` foreground, link underline (50% opacity at rest), and the one-time fade-in reveal of the `parsers -> qubits.` line in the home hero. Nothing else.

### Footer signature

Monospace line at the bottom of every site page and the README:

`~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF`

PGP fingerprint is a placeholder until a real key is generated. Location and timezone are real.
```

- [ ] **Step 3: Verify**

```bash
grep -q "Personality motifs" .agent/profile-system.md && echo "section added"
grep -q "Two \`<sub>\` blocks are permitted" .agent/profile-system.md && echo "sub rule amended"
```

Expected: both `ok` lines.

### Task 13.2: Update `.agent/visual-system.md`

**Files:**
- Modify: `.agent/visual-system.md`

Insert a new section "Hero diagram" between "Color tokens" and "Link style" per spec §6.2.

- [ ] **Step 1: Insert the section**

Add after the "Color tokens" section and its subsections, and before the "Link style" section:

```markdown
---

## Hero diagram

The canonical ASCII pillar diagram is the single shared visual motif across the README and site Home/About. It is reproduced verbatim from `.agent/profile-system.md` § Personality motifs. Do not modify the characters, the spacing, or the case.

### Implementation rules

- Renders inside `<pre>` (site) or a `text`-language codefence (README).
- Font: `var(--font-mono)` (Berkeley Mono → JetBrains Mono → Geist Mono fallback chain).
- Line height: `1.2`.
- No surrounding background, border, or box-shadow.
- The `parsers -> qubits.` line is the single accent reveal: opacity 0 → 1 fade over 200ms on initial render, then static at `var(--color-accent)` (`#7dd3fc`). No hover state, no other animation.
- ASCII only: `+`, `-`, `|`, `\`, `/`, `>`. No Unicode arrows. No box-drawing characters. No emoji.
- Width is fixed at 60 characters between the `+` borders.
```

- [ ] **Step 2: Verify**

```bash
grep -q "Hero diagram" .agent/visual-system.md && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit (WIP)**

```bash
git add .agent/profile-system.md .agent/visual-system.md && git commit -m "wip(profile): add personality motifs + hero diagram sections; permit two <sub> tags"
```

---

## Phase 14: AGENTS.md updates

### Task 14.1: Update AGENTS.md per spec §7

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Rewrite AGENTS.md**

Full new content:

````markdown
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
````

- [ ] **Step 2: Verify scope-boundaries rewrite landed**

```bash
grep -q "Jekyll site (Zolan theme). All" AGENTS.md && echo OK
grep -q "Site work" AGENTS.md && echo OK
grep -q "Never edit \`docs/\` by hand" AGENTS.md && echo OK
```

Expected: three `OK` lines.

- [ ] **Step 3: Commit (WIP)**

```bash
git add AGENTS.md && git commit -m "wip(profile): update AGENTS.md with site work + scope boundaries"
```

---

## Phase 15: Final build verification

### Task 15.1: Clean rebuild + full verification checklist

- [ ] **Step 1: Clean rebuild**

```bash
cd site && rm -rf .next out node_modules && npm ci && npm run build && cd ..
```

Expected: rebuild succeeds; publish script logs the relocation; `docs/` is fully regenerated.

- [ ] **Step 2: Run every check from spec §11**

```bash
echo "=== Spec §11 verification checklist ==="
test -f docs/index.html && echo "[ok] docs/index.html exists" || echo "[FAIL] docs/index.html missing"
grep -q "parsers -> qubits" docs/index.html && echo "[ok] tagline in home" || echo "[FAIL] tagline missing"
test -f docs/.nojekyll && echo "[ok] .nojekyll present" || echo "[FAIL] .nojekyll missing"
test -f docs/about/index.html && echo "[ok] about/index.html exists" || echo "[FAIL] about page missing"
test -f docs/writing/index.html && echo "[ok] writing/index.html exists" || echo "[FAIL] writing page missing"
test -f docs/now/index.html && echo "[ok] now/index.html exists" || echo "[FAIL] now page missing"
test -f docs/404.html && echo "[ok] 404.html exists" || echo "[FAIL] 404 page missing"
grep -q '+----------------------------------------------------------+' README.md && echo "[ok] diagram in README" || echo "[FAIL] diagram missing from README"
rg --pcre2 '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' -g '*.md' -g '*.mdx' -g '*.tsx' -g '*.ts' -g '*.html' . 2>/dev/null | head -5 && echo "[FAIL] emoji found" || echo "[ok] no emoji"
grep -E 'shields\.io|img\.shields|github-readme-stats|streak-stats|top-langs|wakatime|skill-icons|profile-views' README.md && echo "[FAIL] badge found" || echo "[ok] no badges in README"
grep -q "Structure first, syntax second" README.md && grep -q "Run local until proven otherwise" README.md && grep -q "Reproducibility is the deliverable" README.md && echo "[ok] philosophy lines verbatim" || echo "[FAIL] philosophy lines"
git log abd0a9b..HEAD --format=%B | grep -q "Co-Authored-By: Claude" && echo "[FAIL] Claude coauthor found" || echo "[ok] no Claude coauthor tags"
test ! -e index.html && test ! -e 404.html && test ! -e zolanREADME.md && test ! -d 2018 && echo "[ok] Jekyll legacy removed" || echo "[FAIL] Jekyll still present"
test -f superpowers/specs/2026-05-17-github-profile-design.md && test ! -d docs/superpowers && echo "[ok] specs relocated" || echo "[FAIL] specs not relocated"
grep -q "scope-boundaries section\|previously contained a 2018 Jekyll" AGENTS.md && echo "[ok] AGENTS.md scope boundaries updated" || echo "[FAIL] AGENTS.md scope boundaries"
```

Expected: every line says `[ok]`.

- [ ] **Step 3: Typecheck the site**

```bash
cd site && npm run typecheck && cd ..
```

Expected: no errors.

- [ ] **Step 4: Lint the site**

```bash
cd site && npm run lint && cd ..
```

Expected: no errors. (Warnings are acceptable; investigate them if any appear.)

---

## Phase 16: Final squash + two commits + push

### Task 16.1: Squash WIP commits and create the two final commits

The `wip(...)` commits made during Phases 3–14 should be squashed into two synthesizing commits per spec §1.

- [ ] **Step 1: Identify the boundary commit**

The last "real" commit before this session's WIP work is `1cc3a6e` (the spec re-review fixes) — confirm with `git log --oneline`.

- [ ] **Step 2: Soft-reset to that boundary**

```bash
git reset --soft 1cc3a6e
```

This keeps all changes staged but removes the WIP commit history.

- [ ] **Step 3: Verify all expected paths are staged**

```bash
git status --short | head -40
```

Expected: changes touch `site/`, `docs/`, `.github/workflows/site.yml`, the 13 deleted Jekyll paths, `superpowers/` (relocated), `README.md`, `AGENTS.md`, `.agent/profile-system.md`, `.agent/visual-system.md`.

- [ ] **Step 4: First commit — site scaffold + Jekyll deletion + specs relocation**

Stage everything except README and `.agent/`:

```bash
git reset HEAD README.md .agent AGENTS.md
git commit -m "feat(site): scaffold next.js site + delete jekyll legacy + relocate specs

- Add site/ with Next.js 15 (App Router, static export), TypeScript strict,
  Tailwind v4, MDX content pipeline. Source in site/, built artifacts in
  docs/ via post-build relocation script.
- Add 4 pages (Home, About, Writing, Now) + 404 with shared ASCII pillar
  diagram hero, small-caps section headers, numbered citations, single
  accent color, monospace footer signature.
- Add .github/workflows/site.yml to rebuild docs/ on push to main.
- Delete 13 legacy Jekyll paths (Zolan theme, 2018).
- Relocate design specs from docs/superpowers/ to superpowers/ to avoid
  collision with build output served by GitHub Pages.

See superpowers/specs/2026-05-17-nextjs-site-design.md."
```

- [ ] **Step 5: Second commit — README + .agent/ + AGENTS.md**

```bash
git add README.md AGENTS.md .agent
git commit -m "feat(profile): refresh readme with personality motifs + update agent docs

- README hero replaced with shared ASCII pillar diagram. Section headers
  get horizontal rules. New 'How I work' section. Footer signature line
  (~/lab) added above forks footnote.
- .agent/profile-system.md: new 'Personality motifs' section codifies the
  five recurring elements. Amend <sub> rule to permit two blocks.
- .agent/visual-system.md: new 'Hero diagram' section locks the diagram
  implementation (font, line height, single-use accent fade-in).
- AGENTS.md: scope boundaries simplified (Jekyll deleted), new 'Site work'
  section with build commands and Pages settings note."
```

- [ ] **Step 6: Push**

```bash
git push origin main
```

Expected: push succeeds. If rejected, check why before forcing.

- [ ] **Step 7: Final log inspection**

```bash
git log --oneline -5
```

Expected: top two commits are the two `feat(...)` commits above; `1cc3a6e` is the third; no `Co-Authored-By: Claude` anywhere.

---

## Phase 17: Manual step (user, out of automation)

### Task 17.1: Configure GitHub Pages

This step cannot be automated without a token. Surface it to the user.

- [ ] **Step 1: Tell the user**

> "Site is built and pushed. Final manual step: in GitHub repo Settings → Pages, set Source to 'Deploy from a branch', Branch to `main`, folder to `/docs`. After ~1 minute, https://shubhamkaushal765.github.io should serve the new site."

---

## Skill references

- @superpowers:subagent-driven-development — for executing this plan task-by-task with a fresh subagent per phase (recommended)
- @superpowers:executing-plans — for inline batch execution with checkpoints
- @superpowers:verification-before-completion — required before claiming any phase complete
