# Design Quality Plugin

A Claude Code plugin that enforces project-specific aesthetic standards across the AI design workflow. Works with Web, iOS, macOS, Android, and cross-platform projects. Capture your taste once, apply it everywhere.

## Install

```bash
claude plugin add https://github.com/SeanSmithDesign/design-quality-plugin
```

## What's Included

### Commands (3)

| Command | Description |
|---------|-------------|
| `/design-brief` | Generate a style brief from the active preset before coding |
| `/design-guard` | Quick guard check on files — flags violations before committing |
| `/design-review` | Full pipeline: guard + score + fix. Catches violations, rates 6 categories (0-100), and offers to auto-fix |

### Skill (1)

| Skill | Description |
|-------|-------------|
| `design-quality` | Auto-activates on design keywords. Enforces preset rules during UI work and proactively recommends the right command at each workflow stage. |

### Presets (3)

| Preset | Aesthetic | Best For |
|--------|-----------|----------|
| `linear-mercury` | Clean, functional, minimal | SaaS dashboards, dev tools, productivity apps |
| `stripe-vercel` | Premium, polished, depth | Marketing sites, fintech, developer platforms |
| `apple-notion` | Refined simplicity | Consumer apps, content tools, native Mac/iOS apps |

## Supported Platforms

| Platform | Tech | What's Checked |
|----------|------|---------------|
| **Web** | React, Next.js, Tailwind, CSS | Semantic tokens, CSS variables, Tailwind classes |
| **iOS/macOS** | SwiftUI, UIKit, AppKit | Asset catalog colors, `.font()` modifiers, spacing |
| **Android** | Jetpack Compose | MaterialTheme tokens, `dp` spacing, elevation |
| **Cross-platform** | Flutter | ThemeData tokens, `EdgeInsets`, widget styling |

Presets define aesthetic principles (typography, color, spacing, elevation, motion) — the guard and review adapt checks to your project's platform automatically.

## Setup

After installing, add a `## Design Quality` section to your project's `CLAUDE.md`:

```markdown
## Design Quality

**Active Preset:** `linear-mercury`

**Reference URLs:**
- https://linear.app
- https://mercury.com

**Project Overrides:**
- Accent color: Blue (not default neutral)
- Hero headings: Instrument Serif allowed
```

### Configuration Options

| Field | Required | Description |
|-------|----------|-------------|
| **Active Preset** | Yes | Which built-in or custom preset to use |
| **Reference URLs** | No | Sites to study for aesthetic reference. Claude will analyze these for visual patterns. |
| **Project Overrides** | No | Override any preset value for this project (e.g., accent color, allowed fonts) |

If no `## Design Quality` section exists, the plugin defaults to the `linear-mercury` preset.

## Usage

### Smart Recommendations

When the design-quality skill is active, Claude proactively recommends the right command at each stage of your workflow:

| Context | What Claude Suggests | Why |
|---------|---------------------|-----|
| You start planning a UI feature | "Run `/design-brief` to set style constraints before coding" | Prevents design drift |
| You ask Claude to build/modify a component | Brief reminder of active preset rules inline | Keeps code on-brand |
| You finish implementing UI changes | "Run `/design-review` to score quality and auto-fix issues" | Catches violations before PR |
| You're about to commit UI files | "Consider `/design-guard` for a quick check" | Last line of defense |
| You ask for a code review on UI | Includes design quality scoring in the review | Holistic feedback |

You don't need to memorize the workflow — Claude will suggest the next step.

### Before coding: Generate a style brief

```
/design-brief
```

Outputs typography, color, spacing, elevation, motion, and component pattern constraints from your active preset. Includes Do/Don't code examples.

Override the project preset for one brief:
```
/design-brief stripe-vercel
```

### During coding: Guard checks

```
/design-guard src/components/Hero.tsx
```

Flags errors (hardcoded colors, wrong fonts), warnings (off-grid spacing), and suggestions (missing hover states).

Without arguments, checks all staged files:
```
/design-guard
```

### After coding: Review, score, and fix

```
/design-review src/components/
```

Runs the full pipeline — guard checks, quality scoring, and auto-fix:

1. **Guard** — Catches violations (hardcoded colors, wrong fonts, off-grid spacing)
2. **Score** — Rates quality across 6 categories:

| Category | What's Checked |
|----------|---------------|
| Hierarchy | Visual weight, semantic HTML, heading order |
| Typography | Font compliance, weight consistency, tracking |
| Color | Semantic tokens, contrast ratios, dark mode |
| Spacing | Grid adherence, touch targets, breathing room |
| Accessibility | ARIA labels, focus indicators, reduced-motion |
| Polish | Elevation, hover states, transitions, loading/error states |

3. **Fix** — Offers to auto-fix errors and warnings, then re-scores to show improvement

Each category gets a **Pass**, **Needs Work**, or **Fail** rating. The overall score (0-100) is a qualitative judgment — directional, not precise.

Review a single file, a directory, or the whole project:
```
/design-review src/components/Hero.tsx
/design-review src/components/
/design-review all
```

> `/design-guard` is available as a lightweight alternative when you just want a quick check without scoring.

## Preset Details

### `linear-mercury` — Clean, Functional, Minimal

**Philosophy:** Eliminate everything non-essential. Every pixel of ornamentation must earn its place through function.

- **Typography:** Single font family (e.g., Inter). Hierarchy through weight and size, not multiple fonts.
- **Color:** 2-color max (neutral + one accent). Semantic tokens only.
- **Elevation:** Shadows over borders. Subtle, functional depth.
- **Spacing:** 8px grid, generous whitespace, breathing room.
- **Motion:** Functional only — no decorative animation. Fast (150-200ms).

**Best for:** SaaS dashboards, dev tools, productivity apps, admin panels.

### `stripe-vercel` — Premium, Polished, Depth

**Philosophy:** Invest in the details that signal quality. Deep layered surfaces, confident typography, controlled drama.

- **Typography:** Distinctive display font for headings, clean sans-serif for body.
- **Color:** Rich palette with gradients. Dark themes with luminous accents.
- **Elevation:** Deep layered shadows, glass/blur effects, pronounced depth.
- **Spacing:** Generous hero sections, tight component spacing, strong rhythm.
- **Motion:** Staggered reveals, smooth parallax, entrance choreography.

**Best for:** Marketing sites, fintech, developer platforms, landing pages.

### `apple-notion` — Refined Simplicity

**Philosophy:** Let content breathe. The best interface is the one you forget is there.

- **Typography:** Weight-based hierarchy (no size jumps). System fonts or refined sans-serif.
- **Color:** Near-monochrome with one accent. Subtle, purposeful color.
- **Elevation:** Hairline borders preferred over shadows. Flat, content-first.
- **Spacing:** Whitespace-first. Generous padding, unhurried layouts.
- **Motion:** Organic, spring-based. Feels physical, not digital.

**Best for:** Consumer apps, content tools, note-taking, native Mac/iOS apps.

### Custom Presets

Create a `.md` file in `skills/design-quality/presets/` following the same structure as built-in presets:

1. **Philosophy** — One paragraph defining the aesthetic
2. **Typography** — Fonts, weights, sizes, tracking
3. **Color** — Palette, semantic tokens, accent rules
4. **Spacing** — Grid system, padding conventions
5. **Elevation** — Shadow/border hierarchy
6. **Motion** — Animation approach, timing
7. **Do/Don't** — Code examples for each platform you target

Reference it in your `CLAUDE.md`:
```markdown
## Design Quality
**Active Preset:** `my-custom-preset`
```

### Per-Session Override

Temporarily switch presets without changing CLAUDE.md:
```
Use the stripe-vercel preset for this session
```

## Scoring

### How Scoring Works

Each of the 6 categories contributes up to ~17 points:

| Rating | Points | Meaning |
|--------|--------|---------|
| **Pass** | ~17 | Meets preset standards, no issues |
| **Needs Work** | ~8-12 | Minor violations or inconsistencies |
| **Fail** | 0 | Major violations or missing entirely |

**Score ranges:**

| Score | Quality Level | Example |
|-------|--------------|---------|
| **90-100** | Production-ready | All categories pass, polished details |
| **70-89** | Good with minor issues | 1-2 categories need work, no fails |
| **50-69** | Needs attention | Multiple categories need work |
| **< 50** | Significant rework | Multiple fails, off-preset |

### Auto-Fix Capabilities

After scoring, `/design-review` offers to fix issues automatically:

| Fixable | Examples |
|---------|---------|
| **Errors** (auto-fixable) | Replace hardcoded colors with tokens, fix font families, add ARIA labels |
| **Warnings** (auto-fixable) | Align spacing to grid, add transitions, fix elevation order |
| **Suggestions** (manual) | Require judgment — flagged but not auto-applied |

You choose: fix all, fix errors only, or handle manually.

## Guard Checks

The full guard checklist covers 15 items in three tiers:

### Errors (must fix)
1. No hardcoded colors (hex, rgb, platform color literals)
2. No generic palette colors (e.g., `bg-blue-500`, `Color.blue`)
3. No hardcoded light/dark values
4. Font family matches preset
5. Touch targets >= 44pt
6. Accessible names on icon-only buttons

### Warnings (should fix)
7. Spacing aligns to 8pt grid
8. Elevation hierarchy matches preset
9. Typography weight consistency
10. Transitions on interactive state changes

### Suggestions (nice to have)
11. Visual hierarchy clarity
12. Color accent restraint
13. Hover/press state presence
14. Empty/loading/error states
15. Semantic markup usage

## Philosophy

> "AI amplified the one skill which I ignored: developing taste."

This plugin doesn't replace taste — it captures and enforces taste decisions so every AI-generated component inherits them automatically.

The approach is inspired by the **Zoom-In Method**: start at 50% (brief sets constraints), push to 99% (guard catches violations during coding), then reach 100% (review scores and polishes the final result).

## Workflow Integration

Designed to complement the [Compound Engineering Plugin](https://github.com/EveryInc/compound-engineering-plugin).

### Full Pipeline

```
/workflows:brainstorm     <- explore what to build
       |
/workflows:plan           <- plan implementation
       |
/design-brief             <- style constraints before coding
       |
/workflows:work           <- implement (skill auto-activates for inline guidance)
       |
/design-review            <- guard + score + fix
       |
/workflows:review         <- code review (design is already polished)
       |
/workflows:compound       <- document learnings
```

### Minimal Pipeline

For smaller tasks, the essentials:

```
/design-brief -> code -> /design-review
```

### Without Compound Engineering

This plugin works standalone. Use the three commands directly:

```
/design-brief                          <- before coding
... write code ...
/design-review src/components/         <- after coding
```

The skill auto-activates on design keywords regardless of whether the compound-engineering plugin is installed.

## License

MIT
