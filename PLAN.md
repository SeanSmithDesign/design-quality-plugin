# Plugin Iteration Plan

## Context

Incorporating design principles from the "Web Design Mastery" ebook (Parts 1-4), ecosystem learnings from RAMS/ui-skills, and three user-requested additions into the existing design-quality plugin.

## Ecosystem Positioning

RAMS and ui-skills cover generic best-practices well (WCAG, performance, animation, code slop). Our plugin's unique value is **preset-driven taste enforcement** and **ebook-derived design principles**. This iteration leans into that differentiation rather than duplicating accessibility/performance checks.

## Token Budget Constraints

All changes must respect Anthropic's official skill/plugin guidelines:

| Constraint | Limit | Status |
|---|---|---|
| SKILL.md body | Under 500 lines / ~5,000 tokens | Currently 135 lines — safe |
| Skill description | Under 1,024 characters | Currently ~190 chars — safe |
| Reference files > 100 lines | Must include a table of contents | guard-checks, review-rubric, all presets need TOCs |
| Command files | Load references per-phase, not all at once | design-review.md needs restructuring |
| All content | Concise examples over verbose explanations | Trim wordiness in new additions |

**Writing principles for all additions:**
- Challenge each line: "Does Claude already know this?"
- Prefer a 3-line code example over a 3-paragraph explanation
- No introductory sentences that just restate the heading
- If a concept is widely known (WCAG ratios, semantic HTML), reference it, don't explain it

---

## Changes

### 1. Add Table of Contents to All Reference Files > 100 Lines

**Files:** `references/guard-checks.md`, `references/review-rubric.md`, `presets/linear-mercury.md`, `presets/stripe-vercel.md`, `presets/apple-notion.md`

Add a TOC after the title/intro of each file. Format:

```markdown
## Contents
- [Section Name](#section-name)
- [Section Name](#section-name)
```

This is an Anthropic requirement for reference files over 100 lines — helps Claude navigate to relevant sections without reading the entire file.

---

### 2. Restructure `/design-review` for Per-Phase Loading

**File:** `commands/design-review.md`

Current design-review loads ALL references at setup (skill + preset + rubric + guard-checks). Restructure to load per-phase:

**Before (current):**
```
## Setup
1. Load SKILL.md
2. Load preset
3. Load review rubric
4. Load guard checks
```

**After:**
```
## Setup
1. Read CLAUDE.md for active preset
2. Load the active preset from presets/<name>.md

## Phase 1: Guard
Load references/guard-checks.md
Run guard checks...

## Phase 2: Score
Load references/review-rubric.md
Score categories...

## Phase 3: Fix
(No additional files — use findings from phases 1-2)
```

This means each phase only loads what it needs. The skill itself (SKILL.md) doesn't need to be explicitly loaded by the command — it's already in context if the skill is active, and the command file contains everything needed for execution.

---

### 3. New Guard Check: No Em Dashes in Copy

**File:** `references/guard-checks.md`

Add as Static Check #7 (after Accessible Names, before Pattern Checks):

- **Severity:** Warning
- **Look for:** Em dashes (`—`) or en dashes (`–`) in string literals and JSX text
- **Fix:** Replace with comma, period, or restructure

```tsx
// Bad:  "Our platform — built for developers — ships faster."
// Good: "Our platform is built for developers. Ship faster."
```

Add to Quick Decision Tree:
```
├─ Contains em dash in copy? → WARNING. Rewrite without dash.
```

---

### 4. New Guard Check: Line-Height Ranges

**File:** `references/guard-checks.md`

Add as Pattern Check #11 (after Transition on Interactive States):

- **Severity:** Warning
- **Look for:** Body text with `leading-tight`/`leading-none`. Headings (32px+) with `leading-loose`/`leading-relaxed`.
- **Fix:** Body: `leading-normal` to `leading-relaxed` (1.4-1.6x). Headings: `leading-tight` to `leading-snug` (1.1-1.2x).

```tsx
// Bad:  <p className="text-base leading-tight">Body text</p>
// Bad:  <h1 className="text-4xl leading-loose">Heading</h1>
// Good: <p className="text-base leading-normal">Body text</p>
// Good: <h1 className="text-4xl leading-tight">Heading</h1>
```

---

### 5. New Guard Check: Dark Background Text Hierarchy

**File:** `references/guard-checks.md`

Add as Pattern Check #12 (after Line-Height Ranges):

- **Severity:** Warning
- **Look for:** On dark backgrounds, all text using identical foreground color/opacity
- **Fix:** Vary opacity — primary at 100%, secondary at 70%, tertiary at 50%

```tsx
// Bad:  all children use text-white
// Good: primary text-white, secondary text-white/70, tertiary text-white/50
```

---

### 6. "When to Break the Rules" Section

**File:** `references/review-rubric.md`

Add after the Score Examples section. Keep it concise — bullet points, no essays.

Content:

#### Typography
- Display type can break weight/size limits for hero compositions
- One serif accent phrase in a sans-serif system adds personality (ebook + linear-mercury preset endorse this)
- Exceeding 3 font weights is acceptable in rich typographic layouts (pricing pages, dashboards)

#### Color
- Third-party brand colors (Google blue, GitHub black) are exempt from hardcoded-color errors — flag but don't fail
- 60-30-10 is a guideline. A dark hero at 90/10/0 is fine if hierarchy works
- Saturated accent on a CTA banner is intentional emphasis, not a violation

#### Spacing
- Optical alignment (`-1px` nudge) beats grid alignment when visual alignment is off
- Breaking grid for dramatic effect (hero `py-40` in a `py-32` system) is valid if the visual weight demands it

#### General
- Breaking one rule to strengthen another is a net positive — weigh the tradeoff
- Marketing pages and dashboards have different standards — context matters

**Scoring impact:** Intentional rule-breaks that serve the design should be noted as "Intentional deviation — [reason]" rather than penalized.

---

### 7. Ebook Principles in Review Rubric Categories

**File:** `references/review-rubric.md`

Concise additions to existing categories (2-3 bullet points each, no verbose explanations):

#### Typography Category — Add to Pass Criteria:
- [ ] Line-height matches content type (body 1.4-1.6x, headings 1.1-1.2x)
- [ ] Hierarchy uses weight changes, not just size changes

#### Color Category — Add to Pass Criteria:
- [ ] Roughly follows 60-30-10 distribution (dominant/secondary/accent)
- [ ] Dark backgrounds use varied text opacity for hierarchy

#### Color Category — Add to Common Violations:
| All text same color on dark bg | Warning | Everything `text-white` with no hierarchy |

#### Hierarchy Category — Add to Pass Criteria:
- [ ] Page follows a narrative flow (Problem → Solution → Proof → CTA for marketing; Task → Content → Actions for dashboards)

---

### 8. Ebook Principles in Presets

Minor, concise additions. Each preset gets 2-4 lines max.

**`linear-mercury.md`:**
- Typography section: Add line-height spec — Body `leading-normal` (1.5x at 14px), headings `leading-tight` (1.1-1.2x)
- Typography section: Add note — "Prefer weight changes over size changes for sub-heading hierarchy"

**`stripe-vercel.md`:**
- Typography section: Add line-height spec — Body `leading-relaxed` (1.6x at 16px), headings `leading-tight`
- Color section: Add — "60-30-10 on dark: bg is 60%, text/icons 30%, gradient/accent 10%"
- Color section: Add — "Vary text opacity on dark backgrounds for hierarchy (100%/70%/50%)"

**`apple-notion.md`:**
- Typography section: Heading line-height already implied by generous body spacing. Add explicit — Headings: `leading-tight` (1.2x)
- Typography section: Add note — "Weight-based hierarchy is this preset's signature: regular → medium creates hierarchy without size change"

---

### 9. Ecosystem Positioning in SKILL.md

**File:** `SKILL.md`

Add a brief section (6-8 lines max) after "Skill Precedence":

```markdown
## Ecosystem

Complementary skills (not competitors):

| Skill | Their Focus | Our Focus |
|-------|------------|-----------|
| `rams` | WCAG compliance | Aesthetic taste |
| `baseline-ui` | Animation/typography minimums | Specific preset enforcement |
| `web-interface-guidelines` | Interaction/performance | Visual identity |
| `deslop` | Code style cleanup | Design style enforcement |
```

No verbose explanations — the table format is self-explanatory and token-efficient.

---

## Post-Change Token Budget Audit

Estimated line counts after all changes:

| File | Before | After | Limit | Status |
|---|---|---|---|---|
| `SKILL.md` | 135 | ~150 | 500 lines | Safe |
| `guard-checks.md` | 155 | ~200 | n/a (reference) | Add TOC |
| `review-rubric.md` | 180 | ~240 | n/a (reference) | Add TOC |
| `linear-mercury.md` | 163 | ~175 | n/a (reference) | Add TOC |
| `stripe-vercel.md` | 146 | ~160 | n/a (reference) | Add TOC |
| `apple-notion.md` | 164 | ~175 | n/a (reference) | Add TOC |
| `design-review.md` | 93 | ~85 | n/a (command) | Restructured |
| `design-brief.md` | 66 | 66 | n/a (command) | No change |

None of these files are close to the 500-line soft limit. All reference files over 100 lines will have TOCs.

---

## Implementation Order

1. **TOCs first** — Add table of contents to all 5 reference files (guard-checks, review-rubric, 3 presets)
2. **Restructure design-review.md** — Per-phase loading instead of all-at-once
3. **guard-checks.md** — Add checks #7 (em dashes), #11 (line-height), #12 (dark bg hierarchy), update decision tree
4. **review-rubric.md** — Add "When to Break the Rules" section, add ebook criteria to Typography/Color/Hierarchy
5. **Presets** — Add line-height specs and ebook notes to all 3 presets
6. **SKILL.md** — Add ecosystem positioning table

## Files Changed

- `commands/design-review.md` (restructured for per-phase loading)
- `references/guard-checks.md` (TOC + 3 new checks + decision tree update)
- `references/review-rubric.md` (TOC + rule-breaking section + ebook criteria)
- `presets/linear-mercury.md` (TOC + line-height + weight-hierarchy note)
- `presets/stripe-vercel.md` (TOC + line-height + 60-30-10 + dark bg hierarchy)
- `presets/apple-notion.md` (TOC + heading line-height + weight-hierarchy note)
- `skills/design-quality/SKILL.md` (ecosystem positioning table)
