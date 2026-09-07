/**
 * Site-wide constants shared by server components.
 *
 * SITE_BASE_PATH mirrors `basePath` in next.config.mjs. Next.js prefixes it
 * automatically on <Link> and asset URLs, but plain <a href> links to files
 * under `public/` (the reveal.js decks) must prefix it by hand.
 */
export const SITE_BASE_PATH = '/shubhamkaushal765';

/** Public URL of a static deck: `/slides/<folder>/<deck>/` under public/. */
export function deckUrl(folder: string, deck: string): string {
  return `${SITE_BASE_PATH}/slides/${folder}/${deck}/`;
}
