# Brand audit: Shubham Kaushal (profile README + site)

Branch run notes. Delete at merge. Method: brand-intuition skill, Audit mode, format A.
Evidence: 3 read-only scouts, `npm run build` passed, screenshots 1280x800 + 390x844 (scratchpad, not committed).

## Verdict

Craft is high and voice is distinct, but the story has split: README says 3 pillars, site says 4, stat chip says 3, and the only published-looking content is overdue drafts. Fix the count, put proof above the fold, clear stale dates. No new design needed.

## Frame

- Category: independent research engineer, personal site + GitHub profile. Category codes: name as H1, role line, links to papers/repos/CV, project cards with results.
- Buyer: researcher or skeptical hiring manager (`.agent/profile-system.md:208`). Considered, high-stakes, System 2: wants proof, not delight. Brand job here is "safe to shortlist".
- Market: global English, owner in IST (`README.md:75`).
- Stage: unknown challenger. Needs one clear idea + recognisable name, not reach.
- Definition of good (proposed, no data): recruiter/researcher can state name, role, one proof point after 5 s; inbound contact rate.

## Promise vs product gap

Promise: "I ship them so they hold up when someone else runs them" (`README.md:16`), "Run local until proven otherwise" (`README.md:53`), blog "every code sample runs as written" (`site/app/writing/page.tsx`).
Reality: flagship TransformerQEC reproduction pending, weights not public (`README.md:62`); zuit pre-1.0 (`README.md:61`); blog has 0 published entries, 3 books "draft" dated 2026-Q2, 2 posts "upcoming" 2026-Q3 already past (`site/app/writing/page.tsx:39-111`); slides folder "draft" 2026-Q3 (`site/app/slides/decks.ts:96-98`); PGP `0xDEADBEEF` placeholder in README and site footer (`README.md:75`, `site/components/FooterSignature.tsx`). Reproducibility is the headline and the main thing not yet shown.

## Findings (ordered by impact on trust and recall)

| # | Touchpoint | Signal sent | Mechanism | Tier | Fix | Cost |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Pillar count across surfaces | Unsure what he does: README diagram 3 pillars (`README.md:7-10`), site diagram + "Four pillars" heading 4 (`site/content/home.mdx:3`), stat chip "3 pillars" (`site/lib/build-meta.ts:10`) on the same screen | Processing fluency; consistency | Supported | Decide: photonics is a pillar or a study topic. If pillar, update `.agent/profile-system.md` first, then README, build-meta, description. If not, drop it from hero diagram and lede, keep it under blog/slides | Locked diagram/doc edits; photonics is where most content lives, so dropping it hides real work |
| 2 | Home above fold | No proof: lede, aside, 5 chips, no repo/result/paper link in first viewport (screenshot); README first proof at line 24 | System 2 needs evidence for considered buy; halo can't substitute | Supported | Swap the mood chip (or "last build") for one proof chip linking a real artifact, e.g. zuit SARIF output or TransformerQEC repo | One fewer personality cue |
| 3 | Content freshness | Abandoned: README "Now 2026-Q2" (`README.md:58`), Q2 drafts, past-due Q3 "upcoming", while "last build 2026-11-05" chip claims freshness | Availability heuristic (vivid stale date); promise gap | Supported / expert judgement | Update Now; hide "upcoming" entries without links; drop dates from drafts or re-date honestly; drop or relabel "last build" chip | Blog index looks emptier; that is the honest state |
| 4 | Placeholder PGP key | `0xDEADBEEF` on a trust/reproducibility page reads as fake detail | Halo (negative); trust cue | Robust (halo) | Publish a real key fingerprint or remove the field | None |
| 5 | Name | Name never prominent: site nav "~/sk", name only at about 7 px in diagram caption; README name only inside codefence; email/LinkedIn reverse it (kaushalshubham) | Recognition heuristic; mere exposure needs the name to be seen | Supported / Robust | Put "Shubham Kaushal" as visible H1 or nav home label on site; keep "~/sk" as secondary motif | Slight loss of terminal aesthetic |
| 6 | Link preview / tab | No favicon, no OG/twitter tags, no image: generic globe + bare text card on LinkedIn/Slack/X (built HTML, `site/app/layout.tsx:36-39`) | Mere exposure; distinctive assets need a carrier | Robust (exposure) | Add favicon from the pillar mark; add og:title/description now; OG image can stay deferred per `.agent/visual-system.md:273-275` | Small build work; the doc deferral should be revisited, its trigger (quantum essay) has no date |
| 7 | Blog label | Nav "blog", route `/writing/`, 404 says "writing" (`site/app/not-found.tsx:195`), H1 "Blog" | Fluency; consistency | Supported | Pick one word everywhere (recommend "writing", matches URL, books, and that nothing is a dated post) | Nav label change only |
| 8 | Voice | Sober research claims next to "mood: caffeinated", party-AST quips, "strange shelf of interests"; "I" vs "the operator" (`README.md:22,53`) | Brand personality (vocabulary only); self-congruity for the reviewer | Working model | Keep quips in footer (low-stakes slot); move the mood chip out of the hero; settle on "I" | Some charm leaves first view; declared voice "enthusiastic, human" (`profile-system.md:110`) still met in footer/aside |
| 9 | Selected work | qosf_excercises (typo, cohort exercise) and codestick (off-pillar, "published" unproven) dilute "shipped tooling" | Halo (weakest item drags); fluency | Expert judgement | Lead with the 3 pillar repos; add npm link for codestick or demote; rename note for qosf or move to footnote | Pin slate change per AGENTS.md process |
| 10 | Mobile hero | Horizontal scroll (scrollWidth 405 vs 390), theme toggle clipped, diagram below fold, 4 chips take most of the screen | Aesthetic-usability | Supported | Hand to ui-ux-review; trim chips on mobile | Usability scope, listed for completeness |

## Distinctive assets (expert judgement, unmeasured)

- Tagline "Parsers to qubits." / `parsers -> qubits.`: unique, short, memorable, used consistently. Fame: low (unknown challenger). Weakness: does not cover ML/CV or photonics, which the site now headlines.
- Pillar diagram + sky/violet/emerald hues: unique, consistent README to site. Amber photonics hue sits outside the declared family.
- `[ NN ]` bracket motif, mono chrome, `~/sk`, footer quips: consistent across site and decks. Good assets; none carries the name.
- Drift between docs and code (fonts, hex values, "sky" vs `#22d3ee`, Highlights not on home, deck count): invisible to visitors, but erodes the system that keeps assets consistent. See Not assessed.

## Positioning vs distinctiveness

Lean: own one clear idea. Unknown challenger, considered purchase, small audience. "Works the structure, not the surface" (`README.md:22`) is the idea; it explains why 3 or 4 fields belong together. Distinctive assets are already strong; the gap is the idea being stated with proof, not more assets.

## Ethics flags

None. No fabricated social proof or urgency. Closest: placeholder PGP key (tooltip admits it) and "upcoming" titles with no content; both are honesty-adjacent, fix under findings 3 and 4.

## Not assessed / assumptions

- Linked repos (zuit, TransformerQEC, tell-me-why, codestick) not checked on GitHub; their READMEs are part of the promise.
- Third-party mentions, search results for the name, LinkedIn: not checked.
- Book chapter quality and "A useful mental model" retention rule compliance not checked (scout grep found no hit in photonics ch01; unverified).
- Doc drift (internal, not brand-visible): `.agent/profile-system.md:24` says verbatim tagline in README (only arrow variant present); `:155` "No numbered headers" vs README `[ 01 ]`..`[ 06 ]`; `.agent/visual-system.md:48-56,96-103` fonts and hues differ from `site/styles/globals.css:31-41`; AGENTS.md says Highlights in home.mdx (absent) and 1 deck (3 on disk).
- Hard rules: 0 emoji, 0 em dashes, 0 badges across README, site/content, site/components, site/app, site/public/slides (scout grep).

## Proposed tests

- 5-second test: 5 people in target audience, home desktop + README; ask name, role, one project. Pass = 4/5 name a real project.
- Preview test: paste site URL into LinkedIn and Slack before and after finding 6.
- Name search: "Shubham Kaushal quantum" / "Shubham Kaushal zuit"; note rank of site and GitHub.
- Review mining: ask 2 to 3 recipients of past outreach what they remembered.
