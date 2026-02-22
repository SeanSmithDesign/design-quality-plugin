---
name: design-brief
description: "Generate a style brief from the active design preset. Use before coding UI to set aesthetic constraints."
argument-hint: "[optional: preset name to override project default]"
---

# Design Brief

This brief replaces AI defaults with intentional constraints. Every rule below is a deliberate choice, not a fallback. If you haven't chosen a preset yet, run `/design-direction` first.

## Setup

1. Read the project's `CLAUDE.md` for a `## Design Quality` section to find the active preset
2. Load the active preset from the design-quality skill's `presets/<name>.md`

## Preset Override

<preset_override> #$ARGUMENTS </preset_override>

**If an argument is provided:** Use that preset name instead of the project default (e.g., `/design-brief premium-depth`).

**If no argument:** Use the active preset from CLAUDE.md. If no preset is configured, suggest running `/design-direction` first, or default to `clean-functional`.

## Execution

Based on the loaded preset, generate a style brief covering all sections below. Pull rules directly from the preset file and enrich with the principles noted here.

### 1. Typography
- Allowed fonts, weight hierarchy, tracking, line-height rules from preset
- **Typescale ratio** — Include the preset's ratio and what it means:
  - `clean-functional`: ~1.25 (Major Third) — compact, functional rhythm
  - `premium-depth`: ~1.333 (Perfect Fourth) — confident, generous spacing
  - `refined-minimal`: ~1.25 (Major Third) — subtle, understated rhythm
- **Typographic levels** — Map preset's heading hierarchy to the 5 levels:
  - Display (hero only) → Heading → Subheading → Body → Caption
- **Responsive** — Headings scale down 1-2 steps on mobile (e.g., `text-4xl → text-2xl md:text-3xl lg:text-4xl`). Body stays at `text-base`.

### 2. Color
- Palette boundaries, semantic token usage, accent rules from preset
- **Color psychology** — One sentence on why the preset's color approach fits the project type (e.g., "Copper adds warmth to functional tools" or "Electric blue signals innovation on dark backgrounds")
- **Distribution** — Explicit 60-30-10 ratios for the preset:
  - `clean-functional`: 90% neutral / 8% accent / 2% status
  - `premium-depth`: 60% background / 30% text-icons / 10% accent-gradient
  - `refined-minimal`: 85% white-nearwhite / 12% text / 3% accent
- **Gradients** — For `premium-depth` only: 2-3 stops, colors adjacent on the wheel, linear direction. For others: no gradients.

### 3. Spacing
- Grid system, component padding, section spacing from preset
- Touch target minimums

### 4. Layout
- **Grid:** 12-column for web, `gap-6` gutters, `max-w-7xl` container (adjust per preset)
- **Responsive breakpoints:** `sm:640` / `md:768` / `lg:1024` / `xl:1280`
- **Card layout:** Column counts per breakpoint (e.g., `3-col lg → 2-col md → 1-col sm`)

### 5. Layout Proportions
- **Golden ratio applications** — Pull from the preset's Layout section:
  - `clean-functional`: Sidebar:content at ~38:62, readable text at ~65ch
  - `premium-depth`: Hero split at ~62:38 (text:visual), optional 1.618 typescale for hero
  - `refined-minimal`: Content containers at ~65ch, narrower is better
- **Intentional deviation** — If the layout breaks golden ratio, note why (e.g., equal-width comparison columns)

### 6. Elevation
- Shadow hierarchy, border usage rules from preset

### 7. Motion
- Animation approach, timing, easing from preset

### 8. Component Patterns
- Card, button, navigation, form treatments from preset
- **Multi-step flows:** Include progress indicator for onboarding, checkout, or wizard flows (users remember incomplete tasks — Zeigarnik Effect)

### 9. Content & Copy
- Pull from the preset's Content section for density and tone rules
- **Headlines:** 6-12 words, front-load the value
- **Subheadlines:** 15-25 words, expand on the headline
- **Body paragraphs:** 2-4 sentences per block, scannable
- **CTAs:** 2-5 words, action-oriented verb first ("Start building", not "Click here")
- **Section depth:** Each page section has one clear purpose
- **Density per preset:**
  - `clean-functional`: High density. Labels over sentences. Data over descriptions.
  - `premium-depth`: Low to moderate. Scannable marketing copy. Short paragraphs.
  - `refined-minimal`: Minimal. Every word earns its place.

### 10. Page Structure (marketing presets)
For `premium-depth` or marketing-oriented projects, include the proven conversion structure:
- Hero (headline + subhead + single CTA)
- Social Proof (logos, stats, or trust badges)
- Features/Benefits (features → what they enable for the user)
- Testimonials
- Final CTA

For `clean-functional` (dashboards): Sidebar + Content + Action patterns.
For `refined-minimal` (consumer): Content-first with minimal navigation.

### 11. Do / Don't
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

### Layout Proportions
[Golden ratio applications from preset + intentional deviation notes]

### Elevation
[Preset rules]

### Motion
[Preset rules]

### Component Patterns
[Preset patterns + multi-step flow note]

### Content & Copy
[Density, headline/CTA length, tone from preset Content section]

### Page Structure
[Narrative structure appropriate to preset/project type]

### Do / Don't
[Code examples from preset]
```

After generating, ask if the user wants to proceed with coding or adjust any constraints.
