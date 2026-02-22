---
name: design-brief
description: "Generate a style brief from the active design preset. Use before coding UI to set aesthetic constraints."
argument-hint: "[optional: preset name to override project default]"
---

# Design Brief

Generate a style brief that constrains upcoming UI work. If you haven't chosen a preset yet, run `/design-direction` first.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the active preset from the design-quality skill's `presets/<name>.md`

## Preset Override

<preset_override> #$ARGUMENTS </preset_override>

**If an argument is provided:** Use that preset name instead of the project default (e.g., `/design-brief stripe-vercel`).

**If no argument:** Use the active preset from CLAUDE.md. If no preset is configured, suggest running `/design-direction` first, or default to `linear-mercury`.

## Execution

Based on the loaded preset, generate a style brief covering all sections below. Pull rules directly from the preset file and enrich with the principles noted here.

### 1. Typography
- Allowed fonts, weight hierarchy, tracking, line-height rules from preset
- **Typescale ratio** — Include the preset's ratio and what it means:
  - `linear-mercury`: ~1.25 (Major Third) — compact, functional rhythm
  - `stripe-vercel`: ~1.333 (Perfect Fourth) — confident, generous spacing
  - `apple-notion`: ~1.25 (Major Third) — subtle, understated rhythm
- **Typographic levels** — Map preset's heading hierarchy to the 5 levels:
  - Display (hero only) → Heading → Subheading → Body → Caption
- **Responsive** — Headings scale down 1-2 steps on mobile (e.g., `text-4xl → text-2xl md:text-3xl lg:text-4xl`). Body stays at `text-base`.

### 2. Color
- Palette boundaries, semantic token usage, accent rules from preset
- **Color psychology** — One sentence on why the preset's color approach fits the project type (e.g., "Copper adds warmth to functional tools" or "Electric blue signals innovation on dark backgrounds")
- **Distribution** — Explicit 60-30-10 ratios for the preset:
  - `linear-mercury`: 90% neutral / 8% accent / 2% status
  - `stripe-vercel`: 60% background / 30% text-icons / 10% accent-gradient
  - `apple-notion`: 85% white-nearwhite / 12% text / 3% accent
- **Gradients** — For `stripe-vercel` only: 2-3 stops, colors adjacent on the wheel, linear direction. For others: no gradients.

### 3. Spacing
- Grid system, component padding, section spacing from preset
- Touch target minimums

### 4. Layout
- **Grid:** 12-column for web, `gap-6` gutters, `max-w-7xl` container (adjust per preset)
- **Responsive breakpoints:** `sm:640` / `md:768` / `lg:1024` / `xl:1280`
- **Card layout:** Column counts per breakpoint (e.g., `3-col lg → 2-col md → 1-col sm`)

### 5. Elevation
- Shadow hierarchy, border usage rules from preset

### 6. Motion
- Animation approach, timing, easing from preset

### 7. Component Patterns
- Card, button, navigation, form treatments from preset
- **Multi-step flows:** Include progress indicator for onboarding, checkout, or wizard flows (users remember incomplete tasks — Zeigarnik Effect)

### 8. Page Structure (marketing presets)
For `stripe-vercel` or marketing-oriented projects, include the proven conversion structure:
- Hero (headline + subhead + single CTA)
- Social Proof (logos, stats, or trust badges)
- Features/Benefits (features → what they enable for the user)
- Testimonials
- Final CTA

For `linear-mercury` (dashboards): Sidebar + Content + Action patterns.
For `apple-notion` (consumer): Content-first with minimal navigation.

### 9. Do / Don't
Include code examples from the preset.

## Output

```markdown
## Style Brief (Preset: [name])

### Typography
[Preset rules + typescale ratio + 5 levels + responsive note]

### Color
[Preset rules + psychology note + 60-30-10 distribution + gradient rules if applicable]

### Spacing
[Preset rules]

### Layout
[Grid + responsive breakpoints + card layout]

### Elevation
[Preset rules]

### Motion
[Preset rules]

### Component Patterns
[Preset patterns + multi-step flow note]

### Page Structure
[Narrative structure appropriate to preset/project type]

### Do / Don't
[Code examples from preset]
```

After generating, ask if the user wants to proceed with coding or adjust any constraints.
