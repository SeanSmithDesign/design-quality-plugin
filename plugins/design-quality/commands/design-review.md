---
name: design-review
description: "Guard + score + fix UI quality against the active design preset. Catches violations, scores 6 categories, and offers to auto-fix. Also runs whole-deliverable gate mode (cross-screen consistency + evidence bundle) before anything is reported done."
argument-hint: "[file path, component name, 'all' for full project, or 'gate'/'--ship' for whole-deliverable review]"
---

# Design Quality Review

Run a design quality review on UI components.

## Mode Detection

This command has two modes. Default to **Per-Surface mode** unless one of these triggers **Gate mode**:

- Explicit target/flag: `/design-review gate` or `/design-review --ship`
- Natural language asking whether UI work is complete: "is the UI done", "ready to ship this screen", "ready for review"

Gate mode runs the full Per-Surface review (Setup → Guard → Score → Fix) across every screen/state in scope, then adds the whole-deliverable checks in **Gate Mode Additions** below. Per-Surface mode is unchanged from today — single file, single component, or `all`.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the active preset from `presets/<name>.md`

## Target

<review_target> #$ARGUMENTS </review_target>

**If no target specified:** Ask the user which files or components to review.

**If target is a file path:** Review that specific file.

**If target is "all":** Review all `.tsx` files in `components/` and `app/`.

**If target is a component name:** Search for matching files and review them.

## Execution

For each file in scope:

### Phase 1: Guard (catch violations)

Load `references/guard-checks.md` and run through the checklist:

- **Errors** — Hardcoded colors, wrong fonts, missing accessible names, em dashes in copy
- **Warnings** — Off-grid spacing, missing transitions, inconsistent elevation, line-height mismatches, flat dark-bg text hierarchy
- **Suggestions** — Missing hover states, empty/loading states, semantic HTML, choice overload (Hick's Law), non-responsive headings, AI-default copy patterns, layout proportion balance

### Phase 2: Score (rate quality)

Load `references/review-rubric.md` and score against the 6 categories:

- **Hierarchy** — Visual weight, semantic HTML, heading order, narrative flow, copy quality, layout proportions
- **Typography** — Font compliance, weight consistency, tracking, line-height ranges
- **Color** — Semantic tokens, contrast ratios, dark mode, 60-30-10 distribution
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

## Gate Mode Additions (whole-deliverable review only)

Gate mode never certifies "done." Treat the deliverable as broken until proven otherwise — hunt for what's wrong, don't confirm what's right (Sean's rule: if an agent says done there's a 98% chance it isn't). Load `references/design-eye.md` as the taste lens for this pass. On top of the Per-Surface review above, run:

### Cross-Screen Consistency

- Screenshot every screen/state in the flow at an identical viewport size.
- Flip-test: page rapidly through the screenshots, watching shared chrome (headers, nav, tab bars, page margins) for drift.
- If anything seems to drift, opacity-overlay two screenshots and diff to confirm.
- Mobile: status bars must be staged/consistent (Apple's 9:41 convention) — never random real times across a sequence.
- Elements may not drift position between screens in a sequence. Consistency across the flow matters more than any single screen being pretty.

### Evidence Bundle

Claims without evidence are treated as false. Attach all of the following:

- Screenshots of every screen and key state, at a consistent viewport
- A short video/screen-recording walking the full flow
- A live build link: Vercel preview URL (web) or TestFlight build (iOS), when the project has one. Preview deploys are fine; prod deploys need explicit human authorization.
- A DESIGN.md token-conformance note: verify fonts/spacing/colors against the project's DESIGN.md and report conformance or name the deviations explicitly.

### Gate Verdict

End the gate report with a gate-results table, then the verdict line:

```markdown
| Gate                          | Result | Evidence pointer                  |
|--------------------------------|--------|------------------------------------|
| 1. Per-surface review          | pass   | score, path/link                  |
| 2. Cross-screen consistency    | pass   | flip-test + overlay diff, path/link|
| 3. Evidence bundle complete    | pass   | screenshots, video, build link, DESIGN.md conformance note |
```

Then one line, verbatim:

`Ready for Sean's eye` — or —
`NOT ready — <failed gate(s), named>`

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
