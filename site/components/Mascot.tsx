// Line-art mascot: a loose likeness from owner-described features (no photo).
// Strokes use currentColor; the mug is the single accent detail.
type Variant = 'lg' | 'sm';

const HAIR =
  'M63 84 C 58 60, 64 42, 76 34 L 82 16 L 94 28 L 106 10 L 114 26 L 132 14 L 130 32 L 152 30 L 138 46 C 141 58, 140 72, 137 84 C 133 70, 126 62, 116 60 L 108 66 L 100 58 L 90 64 C 78 62, 68 70, 63 84 Z';

const FACE =
  'M63 80 C 63 50, 80 36, 100 36 C 120 36, 137 50, 137 80 C 137 102, 133 118, 121 127 C 112 133, 88 133, 79 127 C 67 118, 63 102, 63 80 Z';

export default function Mascot({ variant = 'lg', idSuffix }: { variant?: Variant; idSuffix: string }) {
  const decorative = variant === 'sm';
  const titleId = `mascot-title-${idSuffix}`;
  const descId = `mascot-desc-${idSuffix}`;
  const lensId = `mascot-lens-${idSuffix}`;
  const a11y = decorative
    ? { 'aria-hidden': true as const, focusable: 'false' as const }
    : { role: 'img', 'aria-labelledby': `${titleId} ${descId}` };

  return (
    <svg
      className={`mascot mascot--${variant}`}
      viewBox="0 0 200 230"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {!decorative && (
        <>
          <title id={titleId}>Line-art mascot of Shubham raising a coffee mug, smirking</title>
          <desc id={descId}>
            A bold line-art character with a long face, swept-back spiky hair,
            rectangular glasses, one raised eyebrow and a confident smirk, clean
            shaven, wearing a hoodie and raising a steaming mug in a quick cheers.
          </desc>
        </>
      )}
      <defs>
        <clipPath id={lensId}>
          <rect x="107" y="82" width="25" height="16" rx="3" />
        </clipPath>
      </defs>

      {/* hoodie: hood rim behind the neck, crew collar, drawstrings */}
      <path
        className="mascot__body"
        d="M24 230 C 26 186, 48 160, 82 152 L 118 152 C 152 160, 174 186, 176 230"
        fill="var(--color-surface-card)"
      />
      <path d="M60 160 C 56 142, 76 131, 100 131 C 124 131, 144 142, 140 160" />
      <path d="M80 153 C 90 162, 110 162, 120 153" />
      <path d="M86 160 L 84 180" />
      <path d="M114 160 L 116 180" />
      <circle cx="83.8" cy="184" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="116.2" cy="184" r="2.6" fill="currentColor" stroke="none" />
      <path d="M146 230 L 144 208" />

      <g transform="translate(0 8)">
        {/* speed lines trailing behind the head */}
        <g className="mascot__speed" strokeWidth="2.5">
          <path d="M154 40 L 176 36" />
          <path d="M152 54 L 184 50" />
          <path d="M152 68 L 172 66" />
        </g>
        <g className="mascot__head">
          {/* neck */}
          <path d="M91 122 L 91 146" />
          <path d="M109 122 L 109 146" />
          {/* ears */}
          <path d="M64 80 C 52 78, 52 102, 65 100" fill="var(--color-surface-card)" />
          <path d="M136 80 C 148 78, 148 102, 135 100" fill="var(--color-surface-card)" />
          {/* face: long and narrow, firm jaw */}
          <path d={FACE} fill="var(--color-surface-card)" />
          {/* hair: swept back and up, spiky */}
          <path d={HAIR} fill="var(--color-surface-card)" />
          <path d={HAIR} fill="currentColor" fillOpacity="0.45" />
          <path d="M84 46 L 100 34" opacity="0.7" />
          <path d="M102 48 L 120 36" opacity="0.7" />
          {/* brows: thick, left set and angled in, right raised */}
          <path d="M70 72 L 90 77" strokeWidth="4" />
          <g className="mascot__brow">
            <path d="M110 74 C 116 67, 124 66, 131 69" strokeWidth="4" />
          </g>
          {/* rectangular glasses, heavy frame */}
          <rect x="68" y="82" width="25" height="16" rx="3" strokeWidth="3.25" />
          <rect x="107" y="82" width="25" height="16" rx="3" strokeWidth="3.25" />
          <path d="M93 88 C 96 85, 104 85, 107 88" strokeWidth="3" />
          <path d="M68 86 L 63 84" strokeWidth="3" />
          <path d="M132 86 L 137 84" strokeWidth="3" />
          {/* lens glint */}
          <g clipPath={`url(#${lensId})`}>
            <path className="mascot__glint" d="M117 96 L 125 84" strokeWidth="2" opacity="0.85" />
          </g>
          {/* eyes, glancing toward the mug */}
          <g className="mascot__eyes" fill="currentColor" stroke="none">
            <circle cx="78.5" cy="90" r="3.2" />
            <circle cx="117.5" cy="90" r="3.2" />
          </g>
          {/* nose */}
          <path d="M100 98 C 98 103, 98 105, 102 106" opacity="0.75" />
          {/* smirk: one side up */}
          <path d="M91 114 C 97 117, 105 116, 111 109" />
          <path d="M111 109 L 114 110" />
        </g>
      </g>

      {/* raised arm, mug up at shoulder height */}
      <path d="M26 214 C 24 196, 28 178, 34 164 L 56 168 C 52 180, 50 196, 52 212" fill="var(--color-surface-card)" />
      <g className="mascot__steam" strokeWidth="2.25">
        <path className="mascot__steam-line" d="M38 120 C 35 116, 41 113, 38 108" />
        <path className="mascot__steam-line" d="M47 119 C 44 115, 50 112, 47 106" />
      </g>
      <g className="mascot__mug">
        <path d="M27 134 C 18 134, 18 148, 27 148" />
        <path d="M27 124 L 28 152 C 28 156, 30 158, 34 158 L 52 158 C 56 158, 58 156, 58 152 L 59 124 Z" fill="var(--color-surface-card)" />
      </g>
      <rect x="47" y="138" width="18" height="26" rx="9" fill="var(--color-surface-card)" />
    </svg>
  );
}
