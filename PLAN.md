# Comprehensive Plugin Plan

## Current State

The plugin (v1.1.0) has all core pieces built:
- 2 commands (`/design-brief`, `/design-review`)
- 1 skill (`design-quality`)
- 3 presets (`linear-mercury`, `stripe-vercel`, `apple-notion`)
- 2 reference files (`guard-checks.md` with 18 checks, `review-rubric.md` with 6 categories)
- Plugin manifest, README, LICENSE

The previous iteration added: TOCs, per-phase loading, ebook principles (line-height, weight hierarchy, 60-30-10, dark bg hierarchy), 3 new guard checks (em dashes, line-height ranges, dark bg text), "When to Break the Rules" section, and ecosystem positioning.

## What's Missing

### 1. No `/design-direction` Command

The workflow has a gap. `/design-brief` generates constraints from an *already-chosen* preset. But there's no step for **choosing the right aesthetic direction** in the first place.

**Current flow:** User picks a preset (somehow) → `/design-brief` → code → `/design-review`

**Complete flow:** `/design-direction` (choose/define aesthetic) → `/design-brief` (generate constraints) → code → `/design-review` (score + fix)

`/design-direction` should:
- Ask about the project type (SaaS dashboard? marketing site? consumer app?)
- Ask about the target audience and emotional tone
- Analyze reference URLs from CLAUDE.md (if provided)
- Recommend one of the 3 built-in presets with reasoning
- Or help define a custom preset if none fit
- Output: a recommendation + rationale, and optionally update CLAUDE.md with the chosen preset

**File:** `commands/design-direction.md`

---

### 2. Test Project Doesn't Prove the Flow

The test project has a pre-built component (weather-dashboard.tsx) and a REVIEW.md that documents what the output *should* look like, but was never run through the actual plugin flow. It's documentation of a simulated run.

**What a real test should demonstrate:**
1. Run `/design-direction` → choose preset
2. Run `/design-brief` → generate constraints from chosen preset
3. Build a component *from scratch* following the brief (with inline guard catching issues as you go)
4. Run `/design-review` on the built component → get real scores
5. Fix issues found → re-score → show improvement

The weather-dashboard.tsx was built "correctly" from the start, so it doesn't demonstrate the review-fix-rescore loop. We need a **before** version with intentional violations and an **after** version showing fixes.

---

### 3. SKILL.md Missing Proactive `/design-direction` Trigger

The Proactive Recommendations table in SKILL.md should include when to recommend `/design-direction`:

| You Detect | Recommend | How to Say It |
|------------|-----------|---------------|
| New project with no `## Design Quality` in CLAUDE.md | `/design-direction` | "No design preset configured. Run `/design-direction` to choose an aesthetic direction." |
| User asks "what style should I use?" or discusses aesthetic options | `/design-direction` | "Run `/design-direction` to explore preset options for your project." |

---

### 4. README Missing `/design-direction`

The README documents the full workflow and command table but doesn't include `/design-direction`. Needs:
- Add to command table
- Add to workflow diagrams (Full Pipeline and Minimal Pipeline)
- Add usage section explaining when and how to use it

---

### 5. plugin.json Version Bump

Adding a new command is a minor feature → bump to v1.2.0.

---

### 6. design-brief.md Needs Small Update

The design-brief.md says to "Load the `design-quality` skill from `.claude/skills/design/design-quality/SKILL.md`" in setup step 2. This path uses the old standalone skill path, not the plugin path. It should reference the skill as part of the plugin, or simply say "the design-quality skill" since it's already in context when invoked via the plugin.

Also, after generating the brief, it should reference the flow: "If you haven't chosen a preset yet, run `/design-direction` first."

---

## Implementation Plan

### Step 1: Create `/design-direction` command

**File:** `plugins/design-quality/commands/design-direction.md`

Structure:
```
---
name: design-direction
description: "Choose or define your project's aesthetic direction. Recommends a preset based on project type, audience, and reference sites."
argument-hint: "[optional: project type or reference URL]"
---

# Design Direction

## Setup
1. Read CLAUDE.md for existing Design Quality config
2. Load the design-quality skill

## Execution

### If Design Quality section already exists:
Show the current preset and ask if they want to change it.

### If no Design Quality section:
Walk through:
1. Project type (SaaS/dashboard, marketing/landing, consumer app, other)
2. Emotional tone (clean/functional, premium/polished, simple/refined)
3. Reference sites (analyze any URLs from user or CLAUDE.md)
4. Recommend a preset with rationale

### If argument provided:
Treat as project type or reference URL and skip to recommendation.

## Output
- Preset recommendation with 1-2 sentence rationale
- Side-by-side comparison if close call between presets
- Offer to update CLAUDE.md with the chosen preset
- Suggest running /design-brief next
```

### Step 2: Update SKILL.md

- Add `/design-direction` to the Related Skills table
- Add to Proactive Recommendations table (new project, no config, aesthetic questions)
- Update Workflow Integration table

### Step 3: Update design-brief.md

- Fix the skill path reference in Setup step 2
- Add note: "If you haven't chosen a preset yet, run `/design-direction` first."

### Step 4: Update README.md

- Add `/design-direction` to command table
- Add usage section for `/design-direction`
- Update workflow diagrams to include the direction step

### Step 5: Rebuild test project end-to-end

Replace the current test project contents with a real flow:

1. **test-project/CLAUDE.md** — Start empty (no Design Quality section)
2. Run `/design-direction` → document the interaction and preset choice → update CLAUDE.md
3. Run `/design-brief` → document the generated brief
4. **test-project/components/weather-dashboard-before.tsx** — Build with *intentional* violations (hardcoded colors, off-grid spacing, missing aria-labels, text-white everywhere, no transitions)
5. Run `/design-review` → document guard findings + score (should be ~45-55)
6. Apply fixes → create **test-project/components/weather-dashboard.tsx** (the fixed version)
7. Re-score → document improvement (should reach 90+)
8. **test-project/REVIEW.md** — Full documented run with before/after scores

### Step 6: Bump version

- `plugin.json` → version `1.2.0`
- Update description if needed to mention 3 commands

---

## Token Budget Check

| File | Current Lines | After Changes | Status |
|------|--------------|---------------|--------|
| `SKILL.md` | 146 | ~160 | Safe (limit 500) |
| `design-direction.md` (new) | 0 | ~60 | New command file |
| `design-brief.md` | 66 | ~68 | Minor edit |
| `design-review.md` | 93 | 93 | No change |
| `README.md` | 308 | ~340 | Minor additions |
| `plugin.json` | 23 | 23 | Version bump only |

---

## Files Changed

| File | Change |
|------|--------|
| `commands/design-direction.md` | **NEW** — Design direction command |
| `skills/design-quality/SKILL.md` | Add direction to Related Skills + Proactive Recommendations |
| `commands/design-brief.md` | Fix skill path, add direction reference |
| `README.md` | Add direction command, update workflow diagrams |
| `.claude-plugin/plugin.json` | Version 1.2.0 |
| `test-project/CLAUDE.md` | Rebuilt for full flow |
| `test-project/components/weather-dashboard-before.tsx` | **NEW** — Intentionally bad version |
| `test-project/components/weather-dashboard.tsx` | Existing fixed version |
| `test-project/REVIEW.md` | Full end-to-end documented run |

## Implementation Order

1. Create `design-direction.md` command
2. Update `SKILL.md` (related skills + proactive recommendations)
3. Update `design-brief.md` (path fix + direction reference)
4. Update `README.md` (command table + workflow + usage)
5. Bump `plugin.json` to v1.2.0
6. Rebuild test project with full end-to-end flow
7. Commit and push
