// Line-art mascot: a loose likeness from owner-described features (no photo).
// Strokes use currentColor; the mug is the single accent detail.
type Variant = 'lg' | 'sm';

const HAIR =
  'M61 92 C 55 64, 62 42, 74 34 C 74 26, 84 22, 90 27 C 94 19, 104 18, 106 25 C 112 18, 122 21, 122 29 C 130 28, 136 34, 132 40 C 142 52, 144 72, 139 92 C 137 80, 133 70, 125 64 C 122 70, 117 72, 113 66 C 110 72, 104 72, 101 64 C 97 71, 91 71, 88 64 C 84 70, 78 70, 75 64 C 68 70, 63 80, 61 92 Z';

export default function Mascot({ variant = 'lg', idSuffix }: { variant?: Variant; idSuffix: string }) {
  const decorative = variant === 'sm';
  const titleId = `mascot-title-${idSuffix}`;
  const descId = `mascot-desc-${idSuffix}`;
  const a11y = decorative
    ? { 'aria-hidden': true as const, focusable: 'false' as const }
    : { role: 'img', 'aria-labelledby': `${titleId} ${descId}` };

  return (
    <svg
      className={`mascot mascot--${variant}`}
      viewBox="0 0 200 230"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...a11y}
    >
      {!decorative && (
        <>
          <title id={titleId}>Line-art mascot of Shubham holding a coffee mug</title>
          <desc id={descId}>
            A friendly character with a long face, short messy hair, rectangular
            glasses and a calm smile, clean shaven, wearing a hoodie and holding a steaming mug.
          </desc>
        </>
      )}

      {/* hoodie: hood rim behind the neck, crew collar, drawstrings */}
      <path
        className="mascot__body"
        d="M24 230 C 26 186, 48 160, 82 152 L 118 152 C 152 160, 174 186, 176 230"
        fill="var(--color-surface-card)"
      />
      <path d="M60 160 C 56 142, 76 131, 100 131 C 124 131, 144 142, 140 160" />
      <path d="M80 153 C 90 162, 110 162, 120 153" />
      <path d="M86 160 L 84 178" />
      <path d="M114 160 L 116 178" />
      <circle cx="83.8" cy="181" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="116.2" cy="181" r="2.4" fill="currentColor" stroke="none" />
      <path d="M54 230 L 56 208" />
      <path d="M146 230 L 144 208" />

      <g transform="translate(0 7)">
      <g className="mascot__head">
        {/* neck */}
        <path d="M91 126 L 91 146" />
        <path d="M109 126 L 109 146" />
        {/* ears */}
        <path d="M63 86 C 51 84, 51 108, 64 106" fill="var(--color-surface-card)" />
        <path d="M137 86 C 149 84, 149 108, 136 106" fill="var(--color-surface-card)" />
        {/* face: long, narrow oval */}
        <ellipse cx="100" cy="86" rx="38" ry="50" fill="var(--color-surface-card)" />
        {/* hair: short and messy, cover the crown, then a light tint */}
        <path d={HAIR} fill="var(--color-surface-card)" />
        <path d={HAIR} fill="currentColor" fillOpacity="0.2" />
        <path d="M97 20 C 96 15, 93 12, 89 11" />
        <path d="M108 21 C 110 15, 114 13, 119 13" />
        <path d="M78 31 C 75 27, 71 26, 67 27" />
        <path d="M80 44 C 86 40, 92 39, 97 40" opacity="0.6" />
        <path d="M106 40 C 113 39, 119 42, 123 46" opacity="0.6" />
        <path d="M90 52 C 94 49, 99 48, 104 49" opacity="0.6" />
        {/* brows */}
        <path d="M73 80 C 78 77, 85 77, 90 79" />
        <path d="M110 79 C 115 77, 122 77, 127 80" />
        {/* rectangular glasses */}
        <rect x="69" y="86" width="25" height="17" rx="3.5" />
        <rect x="106" y="86" width="25" height="17" rx="3.5" />
        <path d="M94 92 C 97 89, 103 89, 106 92" />
        <path d="M69 90 L 62 88" />
        <path d="M131 90 L 138 88" />
        {/* eyes */}
        <g className="mascot__eyes" fill="currentColor" stroke="none">
          <circle cx="81.5" cy="94.5" r="3" />
          <circle cx="118.5" cy="94.5" r="3" />
        </g>
        {/* nose */}
        <path d="M100 104 C 98 109, 98 111, 102 112" opacity="0.7" />
        {/* smile */}
        <path d="M93 121 C 97 125, 103 125, 107 121" />
      </g>
      </g>

      {/* steam */}
      <g className="mascot__steam" strokeWidth="2">
        <path className="mascot__steam-line" d="M92 186 C 88 180, 96 176, 92 168" />
        <path className="mascot__steam-line" d="M100 186 C 96 178, 104 174, 100 164" />
        <path className="mascot__steam-line" d="M108 186 C 104 180, 112 176, 108 168" />
      </g>
      {/* mug, the single accent detail, cupped in both hands */}
      <g className="mascot__mug">
        <path d="M82 190 L 84 220 C 84 224, 86 226, 90 226 L 110 226 C 114 226, 116 224, 116 220 L 118 190 Z" fill="var(--color-surface-card)" />
        <path d="M82 190 L 118 190" />
      </g>
      <rect x="71" y="202" width="17" height="21" rx="8.5" fill="var(--color-surface-card)" />
      <rect x="112" y="202" width="17" height="21" rx="8.5" fill="var(--color-surface-card)" />
    </svg>
  );
}
