---
name: design-review
description: "Guard + score + fix UI quality against the active design preset. Catches violations, scores 6 categories, and offers to auto-fix."
argument-hint: "[file path, component name, or 'all' for full project]"
---

# Design Quality Review

Run a design quality review on UI components.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the `design-quality` skill from `.claude/skills/design/design-quality/SKILL.md`
3. Load the active preset from `presets/<name>.md`
4. Load the review rubric from `references/review-rubric.md`

## Target

<review_target> #$ARGUMENTS </review_target>

**If no target specified:** Ask the user which files or components to review.

**If target is a file path:** Review that specific file.

**If target is "all":** Review all `.tsx` files in `components/` and `app/`.

**If target is a component name:** Search for matching files and review them.

## Execution

For each file in scope:

### Phase 1: Guard (catch violations)

Run through the guard checklist from `references/guard-checks.md`:

- **Errors** — Hardcoded colors, wrong fonts, missing accessible names
- **Warnings** — Off-grid spacing, missing transitions, inconsistent elevation
- **Suggestions** — Missing hover states, empty/loading states, semantic HTML

### Phase 2: Score (rate quality)

Score against the 6 categories from the review rubric:

- **Hierarchy** — Visual weight, semantic HTML, heading order
- **Typography** — Font compliance, weight consistency, tracking
- **Color** — Semantic tokens, contrast ratios, dark mode
- **Spacing** — Grid adherence, consistent padding, touch targets
- **Accessibility** — ARIA labels, focus indicators, reduced-motion
- **Polish** — Elevation, hover states, transitions, loading/error states

### Phase 3: Fix (apply corrections)

After presenting the report, offer to auto-fix issues:

1. **Auto-fix errors** — Replace hardcoded colors with tokens, fix font families, add missing ARIA labels
2. **Auto-fix warnings** — Align spacing to grid, add transitions, fix elevation order
3. **Skip suggestions** — These require judgment; flag them but don't auto-apply

Use **AskUserQuestion** to confirm before applying fixes:
- "Fix all errors and warnings (N issues)?"
- "Fix errors only (N issues)?"
- "Don't fix — I'll handle it"

After fixing, re-score and show the before/after comparison.

## Output

```markdown
## Design Quality Review

**Score: XX/100** (Preset: [name])

### Category Breakdown
| Category | Rating | Key Finding |
|----------|--------|-------------|
| ... | Pass / Needs Work / Fail | ... |

### Strengths
- ...

### Issues Found (N)
- **Error** `file:line` — Issue → Fix
- **Warning** `file:line` — Issue → Fix
- **Suggestion** `file:line` — Opportunity → Improvement

### Auto-Fixable (N of M issues)
Errors and warnings that can be automatically corrected.
```

After presenting the report, offer to fix issues. After fixing, re-run the score and show improvement.
