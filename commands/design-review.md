---
name: design-review
description: "Score UI quality against the active design preset. Produces a 0-100 score across 6 categories with actionable fixes."
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

1. Read the file completely
2. Score against the 6 categories from the review rubric:
   - **Hierarchy** — Visual weight, semantic HTML, heading order
   - **Typography** — Font compliance, weight consistency, tracking
   - **Color** — Semantic tokens, contrast ratios, dark mode
   - **Spacing** — Grid adherence, consistent padding, touch targets
   - **Accessibility** — ARIA labels, focus indicators, reduced-motion
   - **Polish** — Elevation, hover states, transitions, loading/error states

3. Produce the scored report in the format defined in the skill's Review Mode section

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
```

After the review, ask if the user wants to fix any issues or run the `design-iterator` agent for iterative visual refinement.
