# Run notes: parse-to-qubits home

Delete at merge. Stacked on sk/festive-feynman-qrjvsx (PR #22).

Owner review before merge (new copy, first-person or opinion):
- Step asides in `site/components/ParseStory.tsx`: "Prefers a parser error with a line number over a compliment.", "Trusts a boring baseline before an exciting leaderboard.", "Counts a syndrome graph as light reading.", "Still a little delighted that a beam splitter is a 2x2 matrix."
- Help panel in `site/components/HelpDialog.tsx`: whoami line and "mood: caffeinated, mildly curious (self-reported, no warranty)".

Gotchas:
- `.hero__teaser` must never share a selector that sets `display`; source order beat the mobile `display:none` once (`site/styles/globals.css`).
- `data-stage` on `.parse-story` is set only by `StageObserver.tsx` via setAttribute; never move it into React state.
- Stage can stay stale after a jump while the figure is off screen; self-corrects when a step enters the band. Accepted.
