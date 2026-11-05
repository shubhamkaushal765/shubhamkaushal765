---
name: brand-intuition
description: Audit, build, name or decide brand and product perception using the psychology of fast, gut-level judgement, for any app, SaaS, dev tool, website or physical product. Use for "what does this brand, name, logo or landing page signal", naming a product, picking colours, logo or tone of voice, "why don't people trust our product", positioning, brand audits and comparing brand options (A or B). Trigger even when the user only shares a name, a logo, a screenshot, homepage copy or a competitor list. Produces graded findings, options comparisons and honest limits on what the evidence supports.
---

# Brand Intuition

**The job is to be the easy, instinctive choice, and intuition is built from experience, so the product must deliver what the brand promises.** Signals buy the first look; the product earns the second purchase. A brand that over-promises is a loan the product repays at interest.

**Scope.** This skill owns brand perception: what a name, look, tone and first experience make people feel before they reason. Usability, accessibility and flow problems belong to [ui-ux-review](https://github.com/shubhamkaushal765/NotableNotes/blob/master/.claude/skills/ui-ux-review/SKILL.md). Where the two collide (a distinctive look that hurts legibility), see [brand vs usability trade-offs](https://github.com/shubhamkaushal765/NotableNotes/blob/master/.claude/skills/ui-ux-review/references/tradeoffs.md) and cost both sides.

## Five rules

- **Be consistent across touchpoints.** Same marks, voice and promise everywhere.
- **Own one clear idea, and keep distinctive assets.** The two pull in different directions; see the tension under Sharp and Romaniuk below.
- **Design for ease.** Easy to say, find, understand and buy.
- **Deliver on the promise.** First and worst experiences write the gut feeling.
- **Tell stories.** True, specific ones (narrative transportation, Green and Brock 2000).

## Pick the mode

| Mode | Use when | Run |
| --- | --- | --- |
| Audit | Existing brand or product, user wants a full read | Frame, Touchpoint audit, Sharp/Romaniuk check, Ethics line, format A |
| Build or name | New product, naming, logo, colour, tone | Frame, Mechanisms table (name, shape, colour, personality rows), Sharp/Romaniuk, format B for the shortlist |
| Decide between options | Name A vs B, logo A vs B, palette A vs B | Frame (short), score each option against the mechanisms, propose a test, format B |
| Quick critique | One name, logo, screenshot or paragraph of copy | One-line verdict first, 150 to 300 words, format C. Say the one assumption that would flip it |

If the request is ambiguous, pick the closest mode and say which you picked. A shared artefact with no question is a Quick critique.

## Frame

**A signal is only good or bad against a buyer, a situation and a category.** Establish before judging; if you do not know, state the assumption and continue.

- **Category and its codes.** What do competitors all look and sound like (colours, names, metaphors)? Category codes are the cheap signal that says "this is a X". Break them knowingly, not by accident.
- **Buyer and buying situation.** Impulsive, low-stakes, repeat (a consumer app, a snack) leans on gut signals. Considered, high-stakes, committee (B2B, security, finance, health) leans on System 2: evidence, references, proof, risk reduction. Brand still matters there, but mostly as "safe to shortlist", not "delight".
- **Market and culture.** Colour, naming sounds and personality traits shift by language and country. Say which market the claim is for.
- **Stage.** Unknown challenger (needs recognition and a reason to try) vs incumbent (needs consistency and availability).
- **What the product really delivers.** Brand promise minus product reality is the gap. Find it first; no signal fixes it.
- **Definition of good.** Recognition, shortlist rate, trial, repeat, willingness to pay. If there is no data, propose the metric.

## Mechanisms

**Use these as lenses, not laws.** Tiers match [references/evidence.md](references/evidence.md); read the entry before quoting a mechanism to the user.

| Mechanism | What it predicts | How to use it on a product | Evidence tier |
| --- | --- | --- | --- |
| Dual-process (System 1 / System 2) | Fast, effortless judgement coexists with slow, deliberate judgement | Make the right choice easy for gut; give System 2 proof for high-stakes buys. "System 1 buys, System 2 justifies" is a slogan, not a finding | Supported (as a simplification); slogan is Working model |
| Mere exposure | Repeated neutral exposure raises liking, with limits | Repeat the same marks and phrases in the same places; do not expect it to rescue a bad product or survive over-exposure | Robust |
| Processing fluency | Easy-to-process names, text and layouts feel more true, safe, likeable | Pronounceable names, plain words, clean hierarchy, legible type | Supported (effect size varies; replicability of single studies varies) |
| Halo effect and aesthetic-usability | One good trait lifts judgement of others; attractive interfaces seem easier to use | Polish first-contact surfaces; never use polish to hide a broken flow | Robust (halo); Supported (aesthetic-usability) |
| Judgement heuristics (recognition, availability, affect, default) | Familiar reads as safe, popular as good, expensive as better; vivid recent stories drive perceived risk; defaults stick | A recognisable name wins a shortlist; set defaults deliberately; answer the vivid fear with a concrete story. "Familiar means safe" = recognition and mere exposure; "popular means good" = social proof; "expensive means better" = price-quality | Supported (recognition heuristic Contested) |
| Anchoring and decoy | A first number frames later judgement; a dominated option shifts choice toward its dominator | Show tiers with a deliberate reference price; see Ethics line before using a decoy | Anchoring Supported; decoy Contested (fails with experienced attributes) |
| Price-quality heuristic | Higher price reads as higher quality, and can change experienced quality | Treat price as a brand signal; cheap can read as risky in trust categories | Supported |
| Social proof | People copy what many others appear to choose | Real logos, real counts, real reviews, near the decision | Robust (field effects smaller than lab) |
| Associative memory | Brands are retrieved through linked cues (category, situation, feeling) | Link the brand to the buying cues, not only to a trait | Working model |
| Somatic markers | Remembered bodily feelings guide choice | Use only as a metaphor for "first experience leaves a feeling" | Contested |
| Shape and sound symbolism | Round vs angular shapes and vowel/consonant sounds carry weak, consistent connotations | Tiebreaker for names and logo shapes; test in the target language | Supported (shape); Working model (names in practice) |
| Colour | Colours carry context-dependent associations | Pick for category fit and contrast first; never assert "blue = trust" | Working model |
| Brand personality | People describe brands in human traits; five-factor US structure | Use as a vocabulary for tone, not a measurement; check it travels | Working model |
| Typeface personality | Typefaces are said to carry tone | Tiebreaker only; legibility first | Working model |
| Self-congruity | Choice rises when brand image matches self-image | Ask "who does the buyer become by using this?" | Supported |
| Narrative transportation | Absorbing stories shift beliefs | A real founding or customer story, short, specific, true | Supported |

## Touchpoint audit (software and products)

**First experience writes the gut feeling; consistency across touchpoints keeps it.** Walk each, in the order a stranger meets them. For each: signal sent, mechanism, fix.

1. **Name.** Pronounceable, spellable by ear, searchable, free of unfortunate meanings in target languages, fits category codes or breaks them on purpose. Say it aloud; spell it over the phone.
2. **Logo and icon.** Recognisable at 16 px and in monochrome, distinct from the category's clichés, shape matches intended personality.
3. **Colour and type.** Category fit, contrast (hand to ui-ux-review for WCAG), one palette used the same way everywhere. Typeface personality is a working model; legibility is not.
4. **Homepage, first 5 seconds.** Can a stranger say what it is, who it is for, and why it differs? Fluent headline, one idea, a proof point above the fold.
5. **Pricing page.** Price is a quality signal. Anchoring is Supported, decoys are Contested; both are easy to turn manipulative (see Ethics line). Cheap-looking pricing on a premium claim is a mismatch.
6. **Onboarding and first run.** The first experience is the strongest brand event. Does the product do what the homepage promised within minutes? Empty states and defaults carry tone.
7. **Error states and support.** Where promise is tested. Honest, human, fast responses build trust; blame, jargon and dead ends break it.
8. **Emails and notifications.** Same voice as the product? Frequency and relevance are brand signals too.
9. **Reviews and social proof.** Real, recent, specific, from people like the buyer. Check what third parties say, not only what you display.
10. **Consistency across all of them.** List contradictions (playful site, cold billing email). Inconsistency costs recognition and trust.

## Sharp and Romaniuk: availability and distinctiveness

**Growth mostly comes from reach and being easy to recall and easy to buy, not from deep loyalty or sharp differentiation.** (Supported; strongest in repeat-purchase categories.) From Sharp's How Brands Grow and Romaniuk's work with the Ehrenberg-Bass Institute:

- **Mental availability:** how easily the brand comes to mind in buying situations. Build many category entry points (situations, needs, cues), not one.
- **Physical availability:** how easy to find and buy (distribution, search, app store, trial, pricing clarity).
- **Distinctive brand assets:** colours, shapes, sounds, characters, taglines that identify the brand when the name is hidden. Test for fame (known by category buyers) and uniqueness (linked to this brand only); keep them consistent for years.

**Tension to state openly.** Sharp argues distinctiveness (being recognisable) over differentiation (being meaningfully different), and treats broad reach over niche targeting as the growth lever. Position-based branding ("own one clear idea") says the opposite emphasis. Present both:

| Lean | When it fits |
| --- | --- |
| Own one clear idea (positioning) | Unknown challenger, small budget, new category, considered purchase where the shortlist must understand you in a sentence |
| Distinctiveness and reach (Sharp) | Established brand in a repeat-purchase category, large buyer base, goal is mental availability at scale |
| Both | Use the idea to explain, assets to be recognised. They are not exclusive; the cost is attention and budget |

Sharp's evidence is strongest for repeat-purchase consumer categories. For B2B, infrequent or high-involvement purchases, treat it as a Supported hypothesis, not a rule.

## Ethics line

**Persuasion helps a buyer choose what suits them; manipulation exploits bias against their interests.** Test: would the buyer object if they saw exactly what you were doing?

- Never fabricate social proof, fake scarcity or urgency timers, fake reviews, confirm-shaming, hidden costs, hard-to-find cancel, or other dark patterns.
- **Decoys and reference prices:** show only tiers and prices a buyer can actually buy; never invent a "was" price. EU price-reduction rules (Omnibus Directive, Price Indication Directive 98/6/EC Art. 6a) apply; verify current text.
- **EU law (verify current text before advising on compliance):** fake consumer reviews are prohibited under Directive (EU) 2019/2161 (the Omnibus Directive) amending the Unfair Commercial Practices Directive 2005/29/EC; Digital Services Act Art. 25 bans dark patterns on online platforms. This is orientation, not legal advice.
- **Habit loops (Eyal, Hooked).** Apply his own manipulation matrix: would you use the product yourself, and does it materially improve users' lives? If either answer is no, do not build the loop.
- ui-ux-review treats dark patterns as non-negotiable; the same applies here.

## Output formats

**Each finding carries the same six fields:** touchpoint, signal sent, mechanism, evidence tier, fix, cost (who pays, what it risks).

### A. Brand audit report

````
# Brand audit: <name>
Verdict (1 to 2 lines):
Frame: category, buyer and situation, market, stage, assumptions
Promise vs product gap:
Findings (ordered by impact on trust and recall):
| # | Touchpoint | Signal sent | Mechanism | Tier | Fix | Cost |
Distinctive assets: fame, uniqueness, consistency (expert judgement if unmeasured)
Positioning vs distinctiveness: which lean fits and why
Ethics flags:
Not assessed / assumptions:
Proposed tests: 5-second test, name/preference test, A/B, review mining
````

### B. Options comparison (name, logo or colour, A vs B)

````
Decision: <A vs B>, for <buyer, market>
Tension: <e.g. distinct vs familiar>
| Criterion | A | B | Mechanism, tier |
(fluency, distinctiveness, category fit, meaning in target languages, searchability, personality fit, cost to change later)
Recommendation and default:
Cheapest test that would change it:
What would change my mind:
````

### C. Quick critique

````
Verdict (one line):
Top 3 findings: signal, mechanism (tier), fix
One assumption that flips it:
Suggested test:
````

## Evidence discipline

**Label working models as such and never invent numbers.** Brand writing is full of confident folklore.

- Tier every mechanism claim (Robust, Supported, Working model, Contested) and use the same tier as [references/evidence.md](references/evidence.md).
- No invented percentages, conversion lifts, or "research says" without a named source. If there is no source, say "expert judgement".
- Do not repeat the unsourced "ninety-five percent subconscious" figure attributed to Zaltman. Say instead that most judgement is fast and automatic, as a qualitative claim.
- Do not repeat the claim that stories are twenty-odd times more memorable; it is an unsourced statistic, often misattributed to Jerome Bruner. Cite narrative transportation (Green and Brock 2000) for what it actually tested.
- Colour meanings depend on context, category and culture. State the market; recommend testing over asserting.
- Dual-process is a useful simplification, not two literal systems.
- Prefer a test to an assertion: 5-second test, name or logo preference test, A/B on real traffic, interviews on recall and associations.

### Books, with honest caveats

| Book | Use it for | Caveat |
| --- | --- | --- |
| Kahneman, Thinking, Fast and Slow (2011) | Dual-process framing, heuristics | The chapter 4 priming studies failed to replicate, which Kahneman acknowledged; skip social-priming claims |
| Sharp, How Brands Grow (2010) | Mental and physical availability, reach | Evidence-led (Ehrenberg-Bass) but centred on repeat-purchase categories |
| Ariely, Predictably Irrational (2008) | Accessible tour of bias | A 2012 PNAS honesty study he co-authored was retracted in 2021 after the field data were shown to be invalid (who was responsible is disputed), and the sign-at-the-top effect failed a large replication (Kristal et al. 2020, PNAS); prefer findings independently replicated |
| Cialdini, Influence (1984) | Social proof, reciprocity, scarcity as a vocabulary | Durable, but some lab effects are smaller in the field |
| Eyal, Hooked (2014) | Habit-forming product design | Only for products meant to be habitual; apply his manipulation matrix |

## Reference files

| File | Read it when |
| --- | --- |
| [references/evidence.md](references/evidence.md) | Quoting a mechanism, checking its tier, or answering "what is the source for that?" |
| [ui-ux-review/SKILL.md](https://github.com/shubhamkaushal765/NotableNotes/blob/master/.claude/skills/ui-ux-review/SKILL.md) | The problem is usability, accessibility, flow or screen design rather than perception |
| [ui-ux-review/references/tradeoffs.md](https://github.com/shubhamkaushal765/NotableNotes/blob/master/.claude/skills/ui-ux-review/references/tradeoffs.md) | Brand and usability pull apart (distinctive vs legible, brand voice vs clarity), or you write a decision record |
