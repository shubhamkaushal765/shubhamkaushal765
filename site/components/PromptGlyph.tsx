'use client';

import { useEffect, useState } from 'react';

const GLYPHS = ['$', '❯', 'λ', '→', '∂'] as const;

export default function PromptGlyph() {
  const [glyph, setGlyph] = useState<string>('$');

  useEffect(() => {
    setGlyph(GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? '$');
  }, []);

  return (
    <span className="prompt-glyph" aria-hidden="true">
      {glyph}
    </span>
  );
}
