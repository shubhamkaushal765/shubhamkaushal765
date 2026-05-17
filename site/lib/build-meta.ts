/**
 * Build-time constants for the Home hero stats line.
 *
 * MUST NOT be imported from any client component ('use client'). Doing so
 * would pull this module into the client bundle. The only allowed importer
 * is the server component StatsLine.tsx.
 */
export const BUILD_META = {
  pillars: 3,
  repos: 5,
  stack: ['rust', 'python', 'typescript'] as const,
  lastBuild: new Date().toISOString().slice(0, 10), // YYYY-MM-DD; resolves at static-export time
} as const;
