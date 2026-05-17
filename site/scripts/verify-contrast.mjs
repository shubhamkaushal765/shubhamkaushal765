#!/usr/bin/env node
/**
 * WCAG 2.1 relative-luminance contrast verifier.
 * Source of truth for thresholds: superpowers/specs/2026-05-17-site-personality-refresh-design.md §3.3.
 * Fails the build if any (foreground, background, theme) triple falls below its threshold.
 */

const TOKENS = {
  dark: {
    'surface-base': '#0a0a0a',
    'surface-card': '#131318',
    'surface-rail': '#1b1b22',
    'text-body': '#ededed',
    'text-muted': '#a3a3a3',
    'text-footnote': '#737373',
    'accent': '#7dd3fc',
  },
  light: {
    'surface-base': '#fafafa',
    'surface-card': '#efeff3',
    'surface-rail': '#e6e6ec',
    'text-body': '#171717',
    'text-muted': '#525252',
    'text-footnote': '#737373',
    'accent': '#0284c7',
  },
};

const PAIRS = [
  { fg: 'text-body',     bg: 'surface-rail', threshold: 4.5, use: 'prose in rail asides' },
  { fg: 'text-muted',    bg: 'surface-rail', threshold: 4.5, use: 'chip labels' },
  { fg: 'text-footnote', bg: 'surface-rail', threshold: 3.0, use: 'section-num on rail' },
  { fg: 'accent',        bg: 'surface-rail', threshold: 3.0, use: 'accent edge on rail' },
  { fg: 'accent',        bg: 'surface-card', threshold: 3.0, use: 'links inside cards' },
  { fg: 'text-body',     bg: 'surface-card', threshold: 4.5, use: 'card body prose' },
  { fg: 'text-footnote', bg: 'surface-card', threshold: 3.0, use: 'section-num inside topic cards' },
];

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function relLum([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrast(fg, bg) {
  const a = relLum(hexToRgb(fg));
  const b = relLum(hexToRgb(bg));
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const theme of ['dark', 'light']) {
  for (const { fg, bg, threshold, use } of PAIRS) {
    const ratio = contrast(TOKENS[theme][fg], TOKENS[theme][bg]);
    const pass = ratio >= threshold;
    const status = pass ? 'PASS' : 'FAIL';
    const line = `${status}  ${theme.padEnd(5)}  ${fg.padEnd(14)} on ${bg.padEnd(14)}  ${ratio.toFixed(2).padStart(5)}  (>= ${threshold})  ${use}`;
    console.log(line);
    if (!pass) failed += 1;
  }
}
if (failed > 0) {
  console.error(`\n${failed} pair(s) below threshold.`);
  process.exit(1);
}
console.log('\nAll contrast pairs pass.');
