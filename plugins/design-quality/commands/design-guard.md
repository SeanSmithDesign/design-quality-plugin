---
name: design-guard
description: "Run guard checks on a file or component against the active design preset. Flags violations before you commit."
argument-hint: "[file path or component name]"
---

# Design Guard

Run design guard checks on specific files to catch violations before committing.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the `design-quality` skill from `.claude/skills/design/design-quality/SKILL.md`
3. Load the active preset from `presets/<name>.md`
4. Load the guard checklist from `references/guard-checks.md`

## Target

<guard_target> #$ARGUMENTS </guard_target>

**If a file path is provided:** Check that specific file.

**If a component name is provided:** Search for matching files and check them.

**If no argument:** Check all staged files (`git diff --cached --name-only`) that are `.tsx` or `.css`.

## Execution

For each file in scope, run through the guard checklist:

### Static Checks (Errors)
1. No hardcoded hex colors (`text-[#...]`, `style={{ color: '#...' }}`)
2. No Tailwind palette colors (`bg-blue-500`, `text-red-400`)
3. No hardcoded light/dark values (`bg-white`, `text-black`)
4. Font family matches preset spec
5. Touch targets >= 44px on interactive elements
6. Accessible names on icon-only buttons

### Pattern Checks (Warnings)
7. Spacing aligns to 8px grid
8. Elevation hierarchy matches preset
9. Typography weight consistency
10. Transitions on interactive state changes

### Judgment Checks (Suggestions)
11. Visual hierarchy clarity
12. Color accent restraint
13. Hover state presence
14. Empty/loading/error states
15. Semantic HTML usage

## Output

```markdown
## Design Guard Report

**Files checked:** N
**Preset:** [name]

### Errors (must fix)
- `file.tsx:line` — [violation] → [fix]

### Warnings (should fix)
- `file.tsx:line` — [violation] → [fix]

### Suggestions (nice to have)
- `file.tsx:line` — [opportunity] → [improvement]

### Clean Files
- `file.tsx` — No violations found
```

**If errors found:** Recommend fixing before committing.

**If clean:** Confirm the files pass guard checks and are ready to commit.
