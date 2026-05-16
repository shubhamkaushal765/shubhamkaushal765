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
