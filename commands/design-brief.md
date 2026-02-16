---
name: design-brief
description: "Generate a style brief from the active design preset. Use before coding UI to set aesthetic constraints."
argument-hint: "[optional: preset name to override project default]"
---

# Design Brief

Generate a style brief that constrains upcoming UI work.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the `design-quality` skill from `.claude/skills/design/design-quality/SKILL.md`
3. Load the preset from `presets/<name>.md`

## Preset Override

<preset_override> #$ARGUMENTS </preset_override>

**If an argument is provided:** Use that preset name instead of the project default (e.g., `/design-brief stripe-vercel`).

**If no argument:** Use the active preset from CLAUDE.md.

## Execution

Based on the loaded preset, generate a style brief covering:

1. **Typography** — Allowed fonts, weight hierarchy, tracking, line-height
2. **Color** — Palette boundaries, semantic token usage, accent rules
3. **Spacing** — Grid system, component padding, section spacing
4. **Elevation** — Shadow hierarchy, border usage rules
5. **Motion** — Animation approach, timing, easing
6. **Component Patterns** — Card, button, navigation, form treatments

Include the Do/Don't code examples from the preset.

## Output

```markdown
## Style Brief (Preset: [name])

### Typography
[Rules]

### Color
[Rules]

### Spacing
[Rules]

### Elevation
[Rules]

### Motion
[Rules]

### Component Patterns
[Rules]

### Do / Don't
[Code examples from preset]
```

After generating, ask if the user wants to proceed with coding or adjust any constraints.
