# Run notes: theme polish

Delete at merge. Stacked on sk/parse-to-qubits-home (PR #23).

Owner review: accent is rose #f472b6 / #be185d (rationale in `.agent/visual-system.md` Accent section). One token pair in `site/styles/globals.css`, plus `site/scripts/verify-contrast.mjs`, to swap.

Accepted, not fixed (low):
- Theme does not follow a system scheme change after load when no choice is saved (boot reads matchMedia once).
- No cross-tab sync: an open deck or second tab updates on reload, not live (no `storage` listener).
- Rose light on surface-hover is 4.46:1; no rose text sits on hover surfaces today.

Gotchas:
- Theme toggle needs `white-space: nowrap`; bracket label wraps on phones otherwise. 340px breakpoint in `site/styles/globals.css` uses `!important` to beat the toggle's inline padding.
- Deck token blocks are copies of globals.css values (decks are self-contained); keep in sync by hand.
