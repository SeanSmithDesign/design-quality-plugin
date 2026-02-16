---
name: design-quality
description: Enforces project-specific aesthetic standards across the design workflow. Use when generating UI, reviewing components, planning features, or when user mentions design quality, taste, polish, aesthetic, style consistency, or design review.
license: MIT
metadata:
  version: 1.0.0
  category: design
  domain: design-quality
  platforms: Web
  techStack: React, Tailwind CSS, Next.js
keywords:
  - design quality
  - aesthetic
  - taste
  - polish
  - style guide
  - design review
  - visual consistency
  - design brief
  - guard
---

# Design Quality

Taste is the bottleneck, not execution. This skill captures project-specific aesthetic decisions so every AI-generated component inherits them automatically.

## How It Works

This skill operates in three modes across the compound-engineering workflow:

| Mode | When | Trigger | Output |
|------|------|---------|--------|
| **Brief** | Before coding | User says "style brief" or during `/workflows:plan` for UI tasks | Style constraints section in plan doc |
| **Guard** | During coding | Self-check before writing any `.tsx` or `.css` file | Inline warnings in response |
| **Review** | After coding | User says "design review" or during `/workflows:review` | Scored report (0-100) with fixes |

## Step 1: Load Project Config

Before any mode, read the project's `CLAUDE.md` for a `## Design Quality` section. Extract:

- **Active Preset** — Which preset to load (e.g., `linear-mercury`)
- **Reference URLs** — Sites to study for aesthetic reference
- **Project Overrides** — Any preset values to customize

Then load the preset file from `presets/<name>.md` in this skill directory.

If no config exists, default to `linear-mercury` preset.

## Step 2: Skill Precedence

**When this skill is active with a project preset, its rules take precedence over the generic `frontend-design` skill.** The `frontend-design` skill's generic aesthetic guidance ("avoid Inter," "make unexpected choices") does NOT apply when a preset is configured. The preset defines the project's aesthetic — follow it.

Other design skills (`interface-design`, `accessibility-a11y`, `ui-design-system`) remain complementary.

---

## Brief Mode

Generate a style brief that constrains upcoming UI work. Output as a markdown section.

### What to Include

Based on the active preset, generate constraints for:

1. **Typography** — Allowed fonts, weight hierarchy, tracking, line-height
2. **Color** — Palette boundaries, semantic token usage, accent rules
3. **Spacing** — Grid system, component padding, section spacing
4. **Elevation** — Shadow hierarchy, border usage rules
5. **Motion** — Animation approach, timing, easing
6. **Component Patterns** — Card, button, navigation, form treatments

### Output Format

```markdown
## Style Brief (Preset: [name])

### Typography
[Specific rules from preset]

### Color
[Specific rules from preset]

### Spacing
[Specific rules from preset]

### Elevation
[Specific rules from preset]

### Motion
[Specific rules from preset]

### Component Patterns
[Specific rules from preset]
```

---

## Guard Mode

Before writing any component code (`.tsx`, `.css`, `.module.css`), self-check against these rules from the active preset. This is advisory — flag issues in your response before writing code.

### Check List

Read `references/guard-checks.md` for the full list. Core checks:

1. **Semantic tokens** — No hardcoded hex colors or Tailwind palette colors (e.g., `bg-blue-500`). Use semantic tokens: `bg-background`, `text-foreground`, `bg-primary`.
2. **Font families** — Only fonts specified in preset. No unauthorized font imports.
3. **Spacing grid** — Padding and margins align to the preset's grid system (typically 8px base).
4. **Elevation** — Shadow usage matches preset hierarchy. No mixing borders and shadows for the same purpose.
5. **Dark mode** — No `bg-white`, `text-black`, or other hardcoded light/dark values. Use CSS variables.
6. **Touch targets** — Interactive elements >= 44px minimum dimension.

### Severity Levels

| Level | Examples | Action |
|-------|----------|--------|
| **Error** | Hardcoded hex color, wrong font family, `bg-white` | Must fix before writing |
| **Warning** | Suboptimal spacing (not on grid), inconsistent elevation | Flag and suggest fix |
| **Suggestion** | Missing hover state, no transition, could improve hierarchy | Note for polish pass |

### How Guard Works

Guard mode is advisory, not autonomous. When this skill is loaded during UI work:

1. Before writing a component, mentally check the code against the preset rules
2. If violations found, list them in your response BEFORE writing the code
3. Write the corrected code (not the violating version)
4. If unsure whether something violates the preset, check the Do/Don't examples in the preset file

---

## Review Mode

Score UI quality across 6 categories. Read `references/review-rubric.md` for detailed criteria.

### Scope

- **Default:** Review only files the user specifies or changed files in the current PR
- **Full project:** Only when user explicitly requests "review all components"
- **Existing code:** Score what's requested — don't grandfather

### Categories

| Category | What's Checked |
|----------|---------------|
| **Hierarchy** | Visual weight progression, semantic HTML, heading order, clear focal points |
| **Typography** | Font compliance with preset, weight/size/tracking consistency, line-height |
| **Color** | Semantic token usage, contrast ratios (4.5:1 AA), dark mode support, accent restraint |
| **Spacing** | Grid adherence, consistent padding/margins, breathing room, alignment |
| **Accessibility** | ARIA labels, touch targets, focus indicators, prefers-reduced-motion, keyboard nav |
| **Polish** | Elevation consistency, hover/active states, transitions, loading/empty/error states |

### Output Format

```markdown
## Design Quality Review

**Score: XX/100** (Preset: [name])

### Category Breakdown
| Category | Rating | Key Finding |
|----------|--------|-------------|
| Hierarchy | Pass / Needs Work / Fail | [one-line summary] |
| Typography | Pass / Needs Work / Fail | [one-line summary] |
| Color | Pass / Needs Work / Fail | [one-line summary] |
| Spacing | Pass / Needs Work / Fail | [one-line summary] |
| Accessibility | Pass / Needs Work / Fail | [one-line summary] |
| Polish | Pass / Needs Work / Fail | [one-line summary] |

### Strengths
- [What's working well — be specific]

### Issues Found (N)
- **Error** `file.tsx:line` — Issue description → Suggested fix
- **Warning** `file.tsx:line` — Issue description → Suggested fix
- **Suggestion** `file.tsx:line` — Polish opportunity → How to improve
```

**Scoring:** Each category contributes up to ~17 points. Pass = full points, Needs Work = partial (~8-12), Fail = 0. The score is a qualitative judgment — treat it as directional, not precise.

---

## Workflow Integration

| Workflow Stage | Design Quality Role |
|----------------|---------------------|
| `/workflows:brainstorm` | Suggest aesthetic direction based on project type and preset |
| `/workflows:plan` | Auto-generate style brief section for UI tasks |
| `/workflows:work` | Guard mode active — self-check before writing `.tsx`/`.css` |
| `/workflows:review` | Run design quality review when UI files in diff |
| `design-iterator` agent | Use after review flags issues — iterative screenshot-based refinement |
| `RAMS` | Complementary: RAMS focuses on accessibility, this skill covers holistic aesthetics |

---

## Preset System

### Built-in Presets

| Preset | Aesthetic | Best For |
|--------|-----------|----------|
| `linear-mercury` | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `stripe-vercel` | Premium, polished, depth | Marketing sites, developer platforms, fintech |
| `apple-notion` | Refined simplicity | Consumer apps, content tools, note-taking |

### Custom Presets

Create a new `.md` file in `presets/` following the same structure as built-in presets. Reference it in CLAUDE.md:

```markdown
## Design Quality
**Active Preset:** `my-custom-preset`
```

### Per-Session Override

To temporarily use a different preset:
> "Use the stripe-vercel preset for this session"

This overrides the project default until the session ends.

## When to Use This Skill

- Designing new screens or components (Brief + Guard)
- Reviewing UI work before PR (Review)
- Planning UI features (Brief as part of plan)
- Ensuring consistency across a design system
- When the user says: "design review", "check the design", "style brief", "how's the UI quality"
