'use client';

import { useEffect, useState } from 'react';

const QUIPS = [
  'compiles on the first try about 12% of the time, a number that does not improve with seniority.',
  'thinks tabular numerals are a moral position.',
  'will explain the difference between an AST and a parse tree, unprompted, at parties.',
  'has strong opinions about SARIF, none of them load-bearing.',
  'measures decoherence in dog-years.',
  'reads stack traces top-down and PRs bottom-up.',
  'firmly believes a `--dry-run` flag is the highest form of love.',
];

function pickQuip(): string {
  const today = new Date();
  const dayIndex = Math.floor(
    (today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate()) % QUIPS.length,
  );
  return QUIPS[dayIndex] ?? QUIPS[0]!;
}

export default function FooterSignature() {
  const [quip, setQuip] = useState<string>(QUIPS[0]!);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setQuip(pickQuip());
    setMounted(true);
  }, []);

  return (
    <footer className="footer-signature" aria-label="Operator signature">
      <span>
        <span className="footer-signature__segment" title="working directory">~/lab</span>
        <span aria-hidden="true">·</span>
        <span className="footer-signature__segment" title="local timezone">asia/kolkata (utc+5:30)</span>
        <span aria-hidden="true">·</span>
        <span className="footer-signature__segment" title="not a real key, obviously">
          pgp 0xDEADBEEF
        </span>
        <span aria-hidden="true">·</span>
        <span className="footer-signature__segment" title="press ? to acknowledge the cursor blinking at you">
          <span className="kbd">?</span> for help
        </span>
      </span>
      {mounted ? (
        <span className="footer-signature__quip">
          {'> '}{quip}
        </span>
      ) : null}
    </footer>
  );
}
